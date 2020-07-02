//import RegisterModel from "../register/register.model";
//import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
//import vm from "v-response";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const vm = require("v-response");
const RegisterModel = require('./register.model');

exports.create = async (req, res, next) => {
    // checking if the email provided already exist in the DB
    //console.log(req.body.email);
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
                    //here we are updating the plain text to an hashed password
                    new_user.password = hash;
                    new_user.save()
                        .then((saved) => {
                            if (!saved) {
                                return res.status(400)
                                    .json(vm.ApiResponse(false, 400, "an error occur please try again"));
                            } else {
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
            .json(vm.ApiResponse(false, 500, "hoop internal server error", undefined, error));
    })

};*/

