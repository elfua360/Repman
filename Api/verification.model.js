const mongoose = require("mongoose");
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const verifySchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

let validate = mongoose.model('verify', verifySchema,"verification");
module.exports = validate;