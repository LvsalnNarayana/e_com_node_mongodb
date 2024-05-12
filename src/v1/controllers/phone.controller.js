import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

//* Controller for creating new phone number
export const createPhoneNumber = asyncHandler(async (req, res) => {
  try {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Phone number added successfully" });
  } catch (error) {}
});

//* Controller to update phone number
export const updatePhoneNumber = asyncHandler(async (req, res) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "Phone number updated successfully" });
  } catch (error) {}
});

//* Controller to delete phone number
export const deletePhoneNumber = asyncHandler(async (req, res) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "Phone number deleted successfully" });
  } catch (error) {}
});

//* Controller to get PhoneNumber by ID
export const getPhoneNumberById = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Phone number fetched" });
  } catch (error) {}
});

//* controller to get all phone numbers by user
export const getUserPhoneNumbers = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Phone numbers fetched" });
  } catch (error) {}
});

//* Controller to set phone number for 2fa
export const setPhoneNumberFor2fa = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Phone number set for 2fa" });
  } catch (error) {}
});

//* Controller to send verification to phone number
export const sendVerificationToPhoneNumber = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Verification sent" });
  } catch (error) {}
});

//* Controller to verify phone number
export const verifyPhoneNumber = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Phone number verified" });
  } catch (error) {}
});
