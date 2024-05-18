import { Router } from "express";

const router = Router();

//* Route to create coupon
router.post("/create", (req, res) => {
  res.json({
    message: "Coupon created successfully",
  });
});
//* Route to update coupon
router.post("/update/:id", (req, res) => {
  res.json({
    message: "Coupon updated successfully",
  });
});
//* Route to delete coupon
router.post("/delete/:id", (req, res) => {
  res.json({
    message: "Coupon deleted successfully",
  });
});
//* Route to get coupon by id
router.get("/:id", (req, res) => {
  res.json({
    message: "Coupon retrieved successfully",
  });
});
//* Route to get all coupons
router.get("/", (req, res) => {
  res.json({
    message: "Coupons retrieved successfully",
  });
});
//* Route to get coupon by code
router.get("/code/:code", (req, res) => {
  res.json({
    message: "Coupon retrieved successfully",
  });
});
//* Route to get coupons by codes
router.post("/codes", (req, res) => {
  res.json({
    message: "Coupons retrieved successfully",
  });
});
//* Check if coupon is valid
router.get("/check/:productIds", (req, res) => {
  res.json({
    message: "Coupon is valid",
  });
});
//* Route to increment coupon usage count
router.post("/increment/:id", (req, res) => {
  res.json({
    message: "Coupon usage count incremented",
  });
});
//* Route to decrement coupon usage count
router.post("/decrement/:id", (req, res) => {
  res.json({
    message: "Coupon usage count decremented",
  });
});
//* Route to reset coupon usage count
router.post("/reset/:id", (req, res) => {
  res.json({
    message: "Coupon usage count reset",
  });
});
//* Route to reset coupon usage limit
router.post("/reset-limit/:id", (req, res) => {
  res.json({
    message: "Coupon usage limit reset",
  });
});

export default router;
