import express from "express";
import userRouter from "./routes/user.router.js";
import emailRouter from "./routes/email.router.js";
import phoneRouter from "./routes/phone.router.js";
import addressRouter from "./routes/address.router.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/address", addressRouter);
router.use("/email", emailRouter);
router.use("/phone", phoneRouter);

export default router;
