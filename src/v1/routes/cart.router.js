import { Router } from "express";
import {
  addProductToCart,
  clearCart,
  getCartByUserId,
  removeProductFromCart,
  updateProductQuantity,
  checkoutCart,
} from "../controllers/cart.controller.js";

const router = Router();

//* Route to get cart by user id
router.get("/:userId", getCartByUserId);

//* Route to add product to cart by user id
router.post("/:userId", addProductToCart);

//* Route to remove product from cart by user id
router.post("/:userId", removeProductFromCart);

//* Route to update product quantity in cart by user id
router.post("/:userId", updateProductQuantity);

//* Route to clear cart by user id
router.delete("/:userId", clearCart);

//* Route to checkout cart by user id
router.post("/:userId", checkoutCart);

export default router;
