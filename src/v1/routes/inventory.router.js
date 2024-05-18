import { Router } from "express";

const router = Router();

//* Route to Add Product to inventory
router.post("/add-product", (req, res) => {
  res.send("Create order");
});
//* Route to Remove Product from inventory
router.post("/remove-product", (req, res) => {
  res.send("Remove order");
});
//* Route to ge inventory by location
router.post("/get-inventory", (req, res) => {
  res.send("Get inventory");
});
//* Route to adjust inventory quantity
router.post("/adjust-inventory", (req, res) => {
  res.send("Adjust inventory");
});

export default router;
