const express = require("express");

const {
  getProductsController,
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router
  .route("/")
  .get(getProductsController)
  .post(createProductValidator, createProductController);
router
  .route("/:id")
  .get(getProductValidator, getProductController)
  .put(updateProductValidator, updateProductController)
  .delete(deleteProductValidator, deleteProductController);

module.exports = router;
