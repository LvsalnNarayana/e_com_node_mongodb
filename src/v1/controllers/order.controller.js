import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";


//* Controller to update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Order status updated successfully",
    });
  } catch (error) {}
});

//* Controller to update Payment Status
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Payment status updated successfully",
    });
  } catch (error) {}
});

//* ontroller to find orders by user
export const findOrdersByUser = asyncHandler(async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      message: "Orders found successfully",
    });
  } catch (error) {}
});
