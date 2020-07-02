const mongoose = require("mongoose");
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

let register = mongoose.model('user', userSchema,"register");
module.exports = register;