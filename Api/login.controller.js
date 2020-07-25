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
                    console.log(user.email);
                    const sessionUser = {id: user.id, email: user.email};
                    req.session.user = sessionUser;
                    //console.log(req.session);
                    return res.status(200).json({ msg: " Logged In Successfully", sessionUser});
                      //  const payload = {id: user.id};
                        /*jwt.sign(payload, "keys", {expiresIn: "365d"}, (error, token) => {
                            return res.status(200)
                                .json(vm.ApiResponse(true, 200, "login successful", {
                                    user: user,
                                    token: "Bearer " + token
                                }));

                        }); */


                })
        })

};

exports.logout = (req, res, next) => {
 //   console.log('before');
  //  console.log(req.session);
    req.session.destroy((err) => {
        //delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie(process.env.SESS_NAME); // clears cookie containing expired sessionID
        console.log(req.session);
        res.send("Logged out successfully");
    });
}

exports.authCheck = (req, res, next) => {
    const sessUser = req.session.user;
    if (sessUser) {
        return res.json({ msg: " Authenticated Successfully", sessUser });
    }
    else {
        return res.status(401).json({ msg: "Unauthorized" });
    }

}