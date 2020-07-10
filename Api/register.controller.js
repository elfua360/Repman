const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const vm = require("v-response");
const RegisterModel = require('./register.model');
const VerificationModel = require('./verification.model');

exports.create = async (req, res, next) => {
    // checking if email already exists
    //  getDateFormatted();
    await RegisterModel.findOne({email: req.body.email})
        .then(email_exist => {
            //if it exist we are returning an error message
            if (email_exist) {
                return res.status(409)
                    .json(vm.ApiResponse(false, 409, "Another user already has this email"));
            }
            // else we are creating a new user
            let registration_body = req.body;
            //console.log(JSON.stringify(req.body))
            const new_user = new RegisterModel(registration_body);
            console.log(new_user.password);
            //console.log(new_user.email);
            bcrypt.genSalt(10, (err, salt) => {
                // here we are hashing the user password
                bcrypt.hash(new_user.password, salt, (err, hash) => {

                    new_user.password = hash;
                    new_user.date = getDateFormatted();
                    new_user.save()
                        .then((saved) => {
                            if (!saved) {
                                return res.status(400)
                                    .json(vm.ApiResponse(false, 400, "an error occurred please try again"));
                            } else {
                                let new_verify = VerificationModel ({user_id: new_user._id, token: randomstring.generate({length:128})});
                                new_verify.save(function(err) {
                                    if(err) {
                                        return res.status(400).json(vm.ApiResponse(false, 400, "an error occurred please try again"))
                                    }
                                   // console.log(process.env.SENDGRID_API_KEY);
                                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                                    const msg = {
                                        to: new_user.email,
                                        from: 'authentication@em3320.jd2f.aleccoder.space',
                                        subject: 'Activate your account!',
                                        text: 'Hi there! Thank you for making an account with Repman! Click this link to activate your account.\n' +
                                            'https://jd2f.aleccoder.space/api/verify/' + new_verify.token,
                                        html: '<strong>Hi there! Thank you for making an account with Repman! Click this link to activate your account</strong><br><br>' +
                                            '<a href="http://localhost:3001/api/verify/' + new_verify.token + '">Activate my account!</a>'
                                    };
                                    (async () => {
                                        try {
                                            await sgMail.send(msg);
                                        } catch (error) {
                                            console.error(error);

                                            if (error.response) {
                                                console.error(error.response.body)
                                            }
                                        }
                                    })();
                                    VerificationModel.deleteOne({user_id:new_verify._id});
                                });
                                return res.status(201)
                                    .json(vm.ApiResponse(true, 201, "registration successful", saved));
                            }
                        }).catch(error => {
                        return res.status(500)
                            .json(vm.ApiResponse(false, 500, "an error occur please try again", error));
                    })

                })

            })
        })

};

exports.verify = (req, res, next) => {
    VerificationModel.findOne({token: req.params.token}, function(err, result) {
        if (err) {
            return res.status(409)
                .json(vm.ApiResponse(false, 500, "something went wrong"));
        }
        else if (!result) {
            return res.status(409)
                .json(vm.ApiResponse(false, 409, "no unverified user found"));
        }

        else {
            let user_verify = result;
            RegisterModel.findOneAndUpdate({_id:user_verify.user_id}, {active: true}, function (err) {
                if (err) {
                    return res.status(500)
                        .json(vm.ApiResponse(false, 500, "unable to activate account", err));
                }

                else {
                    VerificationModel.deleteOne({user_id: user_verify.user_id}, function(err) {
                        if (err) {
                            return res.status(400)
                                .json(vm.ApiResponse(false, 400, "something went wrong"));
                        }
                        else {
                            return res.status(409)
                                .json(vm.ApiResponse(true, 409, "account activated"));
                        }
                    });
                }
            });
        }
    });
       /* .then(token_exist => {
            if (!token_exist) {
                return res.status(409)
                    .json(vm.ApiResponse(false, 409, "no unverified user found"));
            }
        }).catch(error => {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "an error occur please try again", error));
        });

    RegisterModel.findOneAndUpdate({_id:user_verify.user_id}, {active: true})
        .then(updated => {
            if (!updated) {
                return res.status(409)
                    .json(vm.ApiResponse(false, 409, "error activating account"));
            }
        }).catch(error => {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "an error occur please try again", error));
        });
    VerificationModel.deleteOne({user_id: user_verify.user_id})
        .then(deleted => {
            if (deleted) {
                return res.status(201)
                    .json(vm.ApiResponse(true, 201, "account activated"));
            }
            else if (!deleted) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "unable to activate account"));
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "an error occur please try again", error));
    });
        /*catch(error => {
        return  res.status(500)
            .json(vm.ApiResponse(false, 500, "server error", undefined, error));
    })*/
};

function getDateFormatted() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    month = month > 9 ? month : "0" + month.toString();
    day = day > 9 ? day : "0" + day.toString();
    return month + "/" + day + "/" + year;
}



