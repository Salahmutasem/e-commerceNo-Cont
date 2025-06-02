const asyncHandler = require("express-async-handler");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategoriesController = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const { categories } = await getCategories(page, limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get category by ID
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategoryController = asyncHandler(async (req, res) => {
  const category = await getCategory(req.params.id);
  res.status(200).json({ data: category });
});

// @desc Create new category
// @route POST /api/v1/categories
// @access Private
exports.createCategoryController = asyncHandler(async (req, res) => {
  const category = await createCategory(req.body.name);
  res.status(201).json({ data: category });
});

// @desc Update category by ID
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategoryController = asyncHandler(async (req, res) => {
  const category = await updateCategory(req.params.id, req.body.name);
  res.status(200).json({ data: category });
});

// @desc Delete category by ID
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategoryController = asyncHandler(async (req, res) => {
  await deleteCategory(req.params.id);
  res.status(204).send();
});
