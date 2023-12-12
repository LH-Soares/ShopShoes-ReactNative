const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");

router.get("/find",verifyToken, cartController.getCart);

router.post("/", verifyToken, cartController.addCart);

router.delete("/:cartItem", cartController.deleteCartItem);

router.delete("/:id", cartController.resetCart);

module.exports = router
