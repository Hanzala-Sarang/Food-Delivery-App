import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/user-orders", authMiddleware, userOrders);
orderRouter.get("/all-orders", allOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
