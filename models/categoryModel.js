const mongoose = require("mongoose");

// 1- create schema
const categroySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Categroy must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
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
const CategoryModel = mongoose.model("category", categroySchema);
module.exports = CategoryModel;
