const slugify = require("slugify");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

// Get all products with pagination
exports.getProducts = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  return { products, page };
};

// Get single product by ID
exports.getProduct = async (id) => {
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) throw new ApiError(`No product for this id: ${id}`, 404);
  return product;
};

// Create product
exports.createProduct = async (data) => {
  data.slug = slugify(data.title);
  const product = await Product.create(data);
  return product;
};

// Update product
exports.updateProduct = async (id, data) => {
  if (data.title) {
    data.slug = slugify(data.title);
  }
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) throw new ApiError(`No product for this id: ${id}`, 404);
  return product;
};

// Delete product
exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(`No product for this id: ${id}`, 404);
};
