const mongoose = require("mongoose");
const validator = require("validator");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide product name"],
    trim: true,
    maxlength: [120, "Product name should not be more than 120 characters"],
  },
  price: {
    type: Number,
    required: [true, "please provide product price"],
    maxlength: [3, "Product price should not be more than 3 digits"],
  },
  description : {
    type: String,
    required: [true, "please provide product description"],
  },
  noOfItem : {
    type : Number,
    default: 1
  },
  category : {
    type: String,
    required : [true, "please provide product category"],
  },
  photo:{
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    }
  },
  extraOptions: {
    type: [
      {
        text: { type: String },
        price: { type: Number, default: 0 },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Product", productSchema);