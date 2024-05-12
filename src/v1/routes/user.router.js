import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  toggleTwoFactorAuthentication,
  updateUser,
  updateUserPassword,
  updateUserProfilePicture,
  toggleUserBan,
  toggleUserLock,
  togglePassword,
} from "../controllers/user.controller.js";
const router = Router();

//* Create a new user
router.post("/", createUser);

//* Retrieve all users
router.get("/", getAllUsers);

//* Retrieve a single user by ID
router.get("/:userId", getUserById);

//* Update user details by ID
router.put("/:userId", updateUser);

//* Delete a user by ID
router.delete("/:userId", deleteUser);

//* Update user's profile picture
router.put("/:userId/profile-picture", updateUserProfilePicture);

//* Toggle password enable/disable
router.put("/:userId/password-toggle", togglePassword);

//* Toggle user ban
router.put("/:userId/ban", toggleUserBan);

//* Toggle User Lock
router.put("/:userId/lock", toggleUserLock);

//* Update user's password
router.put("/:userId/password", updateUserPassword);

//* Toggle two-factor authentication
router.put("/:userId/2fa", toggleTwoFactorAuthentication);

export default router;
