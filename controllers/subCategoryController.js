const asyncHandler = require("express-async-handler");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");

// Inject categoryId into body if not present
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Inject category filter for nested route
exports.createFilterObject = (req, res, next) => {
  req.filterObj = req.params.categoryId
    ? { category: req.params.categoryId }
    : {};
  next();
};

// @desc Create subCategory
// @route POST /api/v1/subCategories
// @access Private
exports.createSubCategoryController = asyncHandler(async (req, res) => {
  const subCategory = await createSubCategory(req.body);
  res.status(201).json({ data: subCategory });
});

// @desc Get list of subCategories
// @route GET /api/v1/subCategories
// @access Public
exports.getSubCategoriesController = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const { subCategories } = await getSubCategories(req.filterObj, page, limit);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc Get subCategory by ID
// @route GET /api/v1/subCategories/:id
// @access Public
exports.getSubCategoryController = asyncHandler(async (req, res) => {
  const subCategory = await getSubCategory(req.params.id);
  res.status(200).json({ data: subCategory });
});

// @desc Update subCategory
// @route PUT /api/v1/subCategories/:id
// @access Private
exports.updateSubCategoryController = asyncHandler(async (req, res) => {
  const subCategory = await updateSubCategory(req.params.id, req.body);
  res.status(200).json({ data: subCategory });
});

// @desc Delete subCategory
// @route DELETE /api/v1/subCategories/:id
// @access Private
exports.deleteSubCategoryController = asyncHandler(async (req, res) => {
  await deleteSubCategory(req.params.id);
  res.status(204).send();
});
