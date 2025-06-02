const slugify = require("slugify");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// Get paginated list of categories
exports.getCategories = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  return { categories, page };
};

// Get single category by ID
exports.getCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(`No category for this id: ${id}`, 404);
  return category;
};

// Create category
exports.createCategory = async (name) => {
  const category = await Category.create({ name, slug: slugify(name) });
  return category;
};

// Update category
exports.updateCategory = async (id, name) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) throw new ApiError(`No category for this id: ${id}`, 404);
  return category;
};

// Delete category
exports.deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(`No category for this id: ${id}`, 404);
};
