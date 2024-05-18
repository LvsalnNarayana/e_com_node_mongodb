import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to Add Product to inventory
export const addProduct = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "product added successfully",
    });
  } catch (error) {}
});

//* Controller to Remove Product from inventory
export const removeProduct = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "product removed successfully",
    });
  } catch (error) {}
});

//* Controller to get inventory by location
export const getInventoryByLocation = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "inventory found successfully",
    });
  } catch (error) {}
});

//* Controller to adjust inventory quantity
export const adjustInventoryQuantity = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "inventory adjusted successfully",
    });
  } catch (error) {}
});
