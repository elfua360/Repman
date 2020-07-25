const mongoose = require("mongoose");
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: String,
            amount: String

        }
    ],
    tags: [{type: String}],

    steps: [
        {
            number: Number,
            step: String,
        }
    ]
});

let recipe = mongoose.model('recipe', recipeSchema,"recipe");
module.exports = recipe;
