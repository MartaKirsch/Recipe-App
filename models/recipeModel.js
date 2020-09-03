const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  "name": {
    type: String,
    required: true
  },
  "imgURL": {
    type: String,
    required: true
  },
  "meal": {
    type: String,
    required: true
  },
  "meatvege": {
    type: String,
    required: true
  },
  "author": {
    type: String,
    required: true
  },
  "createdOn": {
    type: Date,
    default: Date.now
  },
  "tastes": [{
    type: String
  }],
  "sumOfKcal": {
    type: Number,
    required: true
  },
  "ingredients": [{
    name: {type: String},
    amount: {type: String},
    kcal: {type: Number}
  }],
  "rates": {
    "rate": [{type:Number}],
    "author": [{type:String}],
    "average": {type:Number}
  },
  "howToPrepare": {
    type: String,
    required: true
  }
});

//create model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
