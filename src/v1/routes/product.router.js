import { Router } from "express";

const router = Router();

//* Route to create product
router.post("/create", (req, res) => {
  res.send("create product");
});

//* Route to search and filter products
router.get("/search", (req, res) => {
  res.send("search and filter products");
});

//* Route to get product details
router.get("/:id", (req, res) => {
  res.send("get product details");
});

//* Route to update product details
router.put("/:id", (req, res) => {
  res.send("update product details");
});

//* Route to delete product
router.delete("/:id", (req, res) => {
  res.send("delete product");
});
export default router;
