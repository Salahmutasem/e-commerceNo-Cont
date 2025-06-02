const asyncHandler = require("express-async-handler");
const {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../services/productService");

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
exports.getProductsController = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const { products } = await getProducts(page, limit);
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc Get product by ID
// @route GET /api/v1/products/:id
// @access Public
exports.getProductController = asyncHandler(async (req, res) => {
  const product = await getProduct(req.params.id);
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST /api/v1/products
// @access Private
exports.createProductController = asyncHandler(async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json({ data: product });
});

// @desc Update product by ID
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProductController = asyncHandler(async (req, res) => {
  const product = await updateProduct(req.params.id, req.body);
  res.status(200).json({ data: product });
});

// @desc Delete product by ID
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProductController = asyncHandler(async (req, res) => {
  await deleteProduct(req.params.id);
  res.status(204).send();
});
