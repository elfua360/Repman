//import RegisterModel from "../register/register.model";
//import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
//import vm from "v-response";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const vm = require("v-response");
const RegisterModel = require('./register.model');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    RegisterModel.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "No such email found"))
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(400)
                            .json(vm.ApiResponse(false, 400, "incorrect password"))
                    }
                    if (isMatch) {
                        const payload = {id: user.id};
                        jwt.sign(payload, "keys", {expiresIn: "365d"}, (error, token) => {
                            return res.status(200)
                                .json(vm.ApiResponse(true, 200, "login successful", {
                                    user: user,
                                    token: "Bearer " + token
                                }));

                        });

                    }
                })
        })

};