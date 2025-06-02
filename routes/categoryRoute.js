const express = require("express");

const {
  getCategoriesController,
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRoute);

router
  .route("/")
  .get(getCategoriesController)
  .post(createCategoryValidator, createCategoryController);
router
  .route("/:id")
  .get(getCategoryValidator, getCategoryController)
  .put(updateCategoryValidator, updateCategoryController)
  .delete(deleteCategoryValidator, deleteCategoryController);

module.exports = router;
