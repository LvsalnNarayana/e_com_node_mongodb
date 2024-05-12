import express from "express";
import {
  createPhoneNumber,
  deletePhoneNumber,
  getPhoneNumberById,
  getUserPhoneNumbers,
  sendVerificationToPhoneNumber,
  setPhoneNumberFor2fa,
  updatePhoneNumber,
  verifyPhoneNumber,
} from "../controllers/phone.controller.js";

const router = express.Router();

//* Endpoint to add phone number
router.post("/", createPhoneNumber);

//* Endpoint to get phone number by ID
router.get("/:PhoneId", getPhoneNumberById);

//* Endpoint to update phone number
router.put("/:phoneId", updatePhoneNumber);

//* Endpoint to delete phone number
router.delete("/:phoneId", deletePhoneNumber);

//* Endpoint to set phone number for 2fa
router.put("/:phoneId/set-2fa", setPhoneNumberFor2fa);

//* Endpoint to verify phone number for 2fa
router.post("/:phoneId/verify-2fa", verifyPhoneNumber);

//* Endpoint to request verification code
router.post("/:phoneId/request-2fa-code", sendVerificationToPhoneNumber);

//* Endpoint to get users phone number
router.get("/user/:userId", getUserPhoneNumbers);

export default router;
