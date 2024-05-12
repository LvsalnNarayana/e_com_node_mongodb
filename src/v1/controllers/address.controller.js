import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to create new address
export const createAddress = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({
      message: "Address created successfully",
    });
  } catch (error) {}
});

//* Controller to get address BY ID
export const getAddressById = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Address retrieved successfully",
    });
  } catch (error) {}
});

//* Controller to update address BY ID
export const updateAddress = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Address updated successfully",
    });
  } catch (error) {}
});

//* Controller to delete address by ID
export const deleteAddress = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Address deleted successfully",
    });
  } catch (error) {}
});

//* Controller to get all addresses of a user
export const getUserAddresses = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "All addresses retrieved successfully",
    });
  } catch (error) {}
});
