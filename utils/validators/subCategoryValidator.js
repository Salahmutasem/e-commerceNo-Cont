const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must belong to category")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("Can not be empty")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("cannot be empty")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];
