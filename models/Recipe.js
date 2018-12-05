const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    minutes:{
        type: Number,
        required: true,
    },
    ingredients:{
        type: [String],
        required: true,
    },
    instructions:{
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    meal: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

