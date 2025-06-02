const asyncHandler = require("express-async-handler");

const {
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  createBrand,
} = require("../services/brandService ");

//get all brands
// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
exports.getBrandsController = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const brands = await getBrands(page, limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// get brand by id
// @desc Get brand by ID
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrandController = asyncHandler(async (req, res, next) => {
  const brand = await getBrand(req.params.id);
  res.status(200).json({ data: brand });
});

// create  brand
// @desc Create a brand
// @route POST /api/v1/brands
// @access Private
exports.createBrandController = asyncHandler(async (req, res, next) => {
  const brand = await createBrand(req.body.name);
  res.status(201).json({ data: brand });
});

// update brand
// @desc Update brand by ID
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrandController = asyncHandler(async (req, res, next) => {
  const brand = await updateBrand(req.params.id, req.body.name);
  res.status(204).json({ date: brand });
});

// delete brand
// @desc Delete brand by ID
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrandController = asyncHandler(async (req, res, next) => {
  await deleteBrand(req.body.id);
  res.status(204).send();
});
