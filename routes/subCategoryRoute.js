const express = require("express");

const {
  createSubCategoryController,
  getSubCategoryController,
  getSubCategoriesController,
  updateSubCategoryController,
  deleteSubCategoryController,
  setCategoryIdToBody,
  createFilterObject,
} = require("../controllers/subCategoryController");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

//mergeParams : Allow us to acces paramters on other routers
//example: We need to access categoryID from category router

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategoryController
  )
  .get(createFilterObject, getSubCategoriesController);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryController)
  .put(updateSubCategoryValidator, updateSubCategoryController)
  .delete(deleteSubCategoryValidator, deleteSubCategoryController);

module.exports = router;
