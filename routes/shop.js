const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", isAuth, shopController.getCart);
router.get("/checkout", isAuth, shopController.getCheckout);
router.get("/checkout/cancel", shopController.getCheckout);
router.get("/checkout/success", shopController.postOrder);
router.post("/cart", isAuth, shopController.postCart);
router.post("/cart-delete-item", isAuth, shopController.postDeleteCartItem);
router.get("/orders", isAuth, shopController.getOrders);
router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;
