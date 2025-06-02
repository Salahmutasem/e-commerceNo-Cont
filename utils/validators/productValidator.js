const { check } = require("express-validator");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Must eb at least 3 chars")
    .notEmpty()
    .withMessage("Product required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quanityt is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quanityt is required"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .toFloat()
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAFterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of String"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product mest be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID fromate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category with this id ${categoryId}`)
          );
        }
      })
    ),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcatId) =>
      SubCategory.find({ _id: { $exists: true, $in: subcatId } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcatId.length) {
            return Promise.reject(
              new Error(`No subCategory with this id ${subcatId}`)
            );
          }
        }
      )
    )
    .custom((val, { req }) => {
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdInDb = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdInDb.push(subCategory._id.toString());
          });
          if (!val.every((v) => subCategoriesIdInDb.includes(v))) {
            return Promise.reject(
              new Error(`Subcategories not belong to category`)
            );
          }
        }
      );
    }),
  check("brand").optional().isMongoId().withMessage("Invalid ID formate"),
  check("brand").optional().isMongoId().withMessage("Invalid ID fromate"),
  check("ratingsAvarage")
    .optional()
    .isNumeric()
    .withMessage("ratingAvargae must be a number")
    .isLength({ min: 1 })
    .withMessage("rating rating must be above 1.0 be a number")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingQuanity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),
  validatorMiddleware,
];
exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID fromate"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID fromate")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID fromate"),
  validatorMiddleware,
];
