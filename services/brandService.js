const { default: slugify } = require("slugify");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// get all brands
exports.getBrands = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  return brands;
};

//get brand by ID
exports.getBrand = async (id) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new ApiError(`No brand for this id: ${id}`, 404);
  return brand;
};
// create brand
exports.createBrand = async (name) => {
  const brand = await Brand.create({ name, slug: slugify(name) });
  return brand;
};

// update brand
exports.updateBrand = async (id, name) => {
  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) throw new ApiError(`No brand found for id: ${id}`, 404);
  return brand;
};
// delete brand
exports.deleteBrand = async (id) => {
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) throw new ApiError(`No brand found for id: ${id}`, 404);
};
