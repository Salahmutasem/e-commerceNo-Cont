const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

// Create subCategory
exports.createSubCategory = async ({ name, category }) => {
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  return subCategory;
};

// Get list of subCategories with optional category filter
exports.getSubCategories = async (filter = {}, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find(filter).skip(skip).limit(limit);
  return { subCategories, page };
};

// Get one subCategory by ID
exports.getSubCategory = async (id) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory)
    throw new ApiError(`No SubCategory for this id: ${id}`, 404);
  return subCategory;
};

// Update subCategory
exports.updateSubCategory = async (id, { name, category }) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory)
    throw new ApiError(`No SubCategory for this id: ${id}`, 404);
  return subCategory;
};

// Delete subCategory
exports.deleteSubCategory = async (id) => {
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory)
    throw new ApiError(`No SubCategory for this id: ${id}`, 404);
};
