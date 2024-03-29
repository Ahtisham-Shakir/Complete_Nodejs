const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

//   /admin/add-product -> GET
router.get("/add-product", isAuth, adminController.getAddProduct);

//   /admin/add-product -> POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 3, max: 300 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

//   /admin/products -> GET
router.get("/products", isAuth, adminController.getProducts);

//  /admin/edit-product -> GET
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 3, max: 300 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/delete/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
