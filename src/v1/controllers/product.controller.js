import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to create product
export const createProduct = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Created Product successfully",
    });
  } catch (error) {}
});
//* Controller to get product by id
export const getProductById = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Created Product successfully",
    });
  } catch (error) {}
});

//* controller to update product
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Updated Product successfully",
    });
  } catch (error) {}
});

//* Controller to get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Get all products successfully",
    });
  } catch (error) {}
});

//* Controller to delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Deleted Product successfully",
    });
  } catch (error) {}
});
