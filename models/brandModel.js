const mongoose = require("mongoose");

// 1- create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Categroy must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    // A and B ==> shopping.com/a-and-b
    slug: {
      type: String,
      lowerase: true,
    },
    image: String,
  },
  { timestamps: true }
);
// 2-create model

module.exports = mongoose.model("Brand", brandSchema);
