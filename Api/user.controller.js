const RegisterModel = require('./register.model');
const VerificationModel = require('./verification.model');
const vm = require("v-response");
const sgMail = require('@sendgrid/mail');
const randomstring = require("randomstring");

// list of all successful registrations (user)
exports.find = (req, res, next) => {
    RegisterModel.find()
        .sort({createdAt: -1})
        .then((response) => {
            if (!response) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Unable to find users"))
            } else {

                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", response))
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "Oops an error occur", undefined, error));
    })
};

exports.resendVerification = (req, res, next) => {
    VerificationModel.findOne({user_id: req.params.id}, function(err, user) {
        if (err) {
            return res.status(500)
                .json(vm.ApiResponse(false, 500, "something went wrong"));
        }

        if (!user) {
            return res.status(500)
                .json(vm.ApiResponse(false, 400, "unable to find user"));
        }

        else {
            user.token = randomstring.generate({length:128})
            user.save(function(err) {
                if (err) {
                    return res.status(400)
                        .json(vm.ApiResponse(false, 400, "unable to resend verification"));
                }
                else {
                    RegisterModel.findOne({_id: user.user_id}, function(err, result) {
                        if (err) {
                            return res.status(500)
                                .json(vm.ApiResponse(false, 500, "unable to resend verification"));
                        }

                        if (!result) {
                            return res.status(400)
                                .json(vm.ApiResponse(false, 400, "unable to find user"));
                        }

                        else {
                            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                            const msg = {
                                to: result.email,
                                from: 'michaelortiz05@hotmail.com',
                                subject: 'Activate your account!',
                                text: 'Hi there! Thank you for making an account with Repman! Click this link to activate your account.\n' +
                                    'http://localhost:3001/api/verify/' + user.token,
                                html: '<strong>Hi there! Thank you for making an account with Repman! Click this link to activate your account</strong><br><br>' +
                                    '<a href="http://localhost:3001/api/verify/' + user.token + '">Activate my account!</a>'
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
                        }
                    });
                }
            });
        }
    });
};

exports.deleteOne = (req, res, next) => {
    RegisterModel.deleteOne({_id: req.params.id})
        .then(deleted => {
            if (!deleted) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Unable to delete user with provided id"))
            } else if (deleted) {
                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", deleted))
            }
        }).catch(error => {
        return  res.status(500)
            .json(vm.ApiResponse(false, 500, "server error", undefined, error));
    })
};

//find a user by id
/*exports.findOne = (req, res, next) => {
    RegisterModel.findOne({_id: req.params.id})
        .then(found => {
            if (!found) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "unable to find a user with provided id"))
            } else if (found) {
                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "success", found))
            }
        }).catch(error => {
        return res.status(500)
            .json(vm.ApiResponse(false, 500, "Server error", undefined, error));
    })

};*/
