const mongoose = require("mongoose");

const subCategroySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subcategory must be unique"],
      minlength: [2, "too short SbCategory name"],
      maxlength: [32, "too long SubCategroy name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "SubCategory must belong to parent category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subcategory", subCategroySchema);
