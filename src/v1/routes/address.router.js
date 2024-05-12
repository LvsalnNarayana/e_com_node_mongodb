import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getUserAddresses,
  updateAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

//* Endpoint to add adress
router.post("/", createAddress);

//* Endpoint to update adress by ID
router.put("/:addressId", updateAddress);

//* Endpoint to delete address by ID
router.delete("/:addressId", deleteAddress);

//* Endpoint to get address by ID
router.get("/:addressId", getAddressById);

//* Endpoint to get all address by user
router.get("/user/:userId", getUserAddresses);

export default router;
