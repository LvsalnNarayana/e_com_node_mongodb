import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to get cart by user id
export const getCartByUserId = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "User Cart Retrieved successfully",
    });
  } catch (error) {}
});

//* Controller to add product to cart by user id
export const addProductToCart = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Product added to cart successfully",
    });
  } catch (error) {}
});

//* Controller to remove product from cart by user id
export const removeProductFromCart = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Product removed from cart successfully",
    });
  } catch (error) {}
});

//* Controller to update product quantity in cart by user id
export const updateProductQuantity = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Product quantity updated in cart successfully",
    });
  } catch (error) {}
});

//* Controller to clear cart by user id
export const clearCart = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Cart cleared successfully",
    });
  } catch (error) {}
});

//* Controller to checkout cart by user id
export const checkoutCart = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Cart checked out successfully",
    });
  } catch (error) {}
});
