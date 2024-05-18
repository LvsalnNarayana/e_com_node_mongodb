import { Router } from "express";

const router = Router();

//* Create Product Review
router.get("/", (req, res) => {
  res.send("Hello World");
});

//* Get Product Reviews
router.get("/:productId", (req, res) => {
  res.send("Hello World");
});

//* Delete Product Review
router.delete("/:id", (req, res) => {
  res.send("Hello World");
});

//* Update Product Review by User
router.put("/:reviewId", (req, res) => {
  res.send("Hello World");
});
export default router;
