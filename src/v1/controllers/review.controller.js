import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to get all reviews
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "reviews retrieved successfully" });
  } catch (error) {}
});

//* Create Product Review
export const createReview = asyncHandler(async (req, res) => {
  try {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "review created successfully" });
  } catch (error) {}
});

//* Delete Product Review
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "review deleted successfully" });
  } catch (error) {}
});

//* Update Product Review by User
export const updateReview = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "review updated successfully" });
  } catch (error) {}
});
