const express = require("express");

const router = express.Router();

const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subCategoryRoute");
const brandRoute = require("./brandRoute");
const productRoute = require("./productRoute");

router.route("/api/v1/categories", categoryRoute);
router.route("/api/v1/subCategories", subCategoryRoute);
router.route("/api/v1/brands", brandRoute);
router.route("/api/v1/products", productRoute);

module.exports = router;
