import express from "express";
import {
  createEmailId,
  deleteEmailById,
  getAllEmailById,
  getUserEmailIDs,
  sendVerificationMail,
  updateEmailById,
  verifyEmail,
} from "../controllers/email.controller.js";

const router = express.Router();

//* Endpoint to create email
router.post("/", createEmailId);

//* Endpoint to update email Id
router.put("/:emailId", updateEmailById);

//* Endpoint to delete email Id
router.delete("/:emailId", deleteEmailById);

//* Endpoint to get email Id
router.get("/:emailId", getAllEmailById);

//* Endpoint to get all email Id by user
router.get("/user/:userId", getUserEmailIDs);

//* Endpoint to send verification to email Id
router.post("/request-verification/:emailId", sendVerificationMail);

//* Endpoint to verify email Id
router.post("/verify/:emailId", verifyEmail);

export default router;
