const express = require("express");

const {
  getBrandsController,
  createBrandController,
  getBrandController,
  updateBrandController,
  deleteBrandController,
} = require("../controllers/brandController");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator ");

const router = express.Router();

router
  .route("/")
  .get(getBrandsController)
  .post(createBrandValidator, createBrandController);
router
  .route("/:id")
  .get(getBrandValidator, getBrandController)
  .put(updateBrandValidator, updateBrandController)
  .delete(deleteBrandValidator, deleteBrandController);

module.exports = router;
