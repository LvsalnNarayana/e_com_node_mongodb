import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller to create add email id
export const createEmailId = asyncHandler(async (req, res, next) => {
  try {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Email created successfully" });
  } catch (error) {}
});

//* Controller to get email by Id
export const getAllEmailById = asyncHandler(async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "EmailIds retrieved successfully" });
  } catch (error) {}
});

//* Controller to update email by ID
export const updateEmailById = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Email updated successfully" });
  } catch (error) {}
});

//* Controller to delete email by ID
export const deleteEmailById = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Email deleted successfully" });
  } catch (error) {}
});

//* Controller to send verification mail
export const sendVerificationMail = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Verification mail sent" });
  } catch (error) {}
});

//* Controller to verify email
export const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Email verified" });
  } catch (error) {}
});

//* Controller to get all email IDs of a user
export const getUserEmailIDs = asyncHandler(async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Email IDs retrieved" });
  } catch (error) {}
});
