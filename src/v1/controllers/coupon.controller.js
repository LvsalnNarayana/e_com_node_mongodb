import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to create coupon
export const createCoupon = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon created successfully",
    });
  } catch (error) {}
});

//* Controller to update coupon
export const updateCoupon = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon updated successfully",
    });
  } catch (error) {}
});

//* Controller to delete coupon
export const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon deleted successfully",
    });
  } catch (error) {}
});

//* Controller to get coupon by id
export const getCouponById = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon fetched successfully",
    });
  } catch (error) {}
});

//* Controller to get all coupons
export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupons fetched successfully",
    });
  } catch (error) {}
});

//* Controller to get coupon by code
export const getCouponByCode = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon fetched successfully",
    });
  } catch (error) {}
});

//* Controller to get coupons by codes
export const getCouponsByCodes = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupons fetched successfully",
    });
  } catch (error) {}
});

//* Check if coupon is valid
export const isValidCoupon = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon is valid",
    });
  } catch (error) {}
});

//* Controller to increment coupon usage count
export const incrementCouponUsageCount = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon usage count incremented",
    });
  } catch (error) {}
});

//* Controller to decrement coupon usage count
export const decrementCouponUsageCount = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon usage count decremented",
    });
  } catch (error) {}
});

//* Controller to reset coupon usage count
export const resetCouponUsageCount = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon usage count reset",
    });
  } catch (error) {}
});

//* Controller to reset coupon usage limit
export const resetCouponUsageLimit = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Coupon usage limit reset",
    });
  } catch (error) {}
});
