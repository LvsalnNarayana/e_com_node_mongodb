import { Router } from "express";

const router = Router();
//* Route to update order status
router.post("/update-order-status", (req, res) => {
  res.send("Update order status");
});

//* Route to update Payment Status
router.post("/update-payment-status", (req, res) => {
  res.send("Update payment status");
});

//* Route to find orders by user
router.get("/find-orders-by-user", (req, res) => {
  res.send("Find orders by user");
});

export default router;
