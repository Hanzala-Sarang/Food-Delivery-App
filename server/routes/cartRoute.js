import express from "express";

import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartContoller.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authMiddleware, addToCart);
cartRouter.post("/remove-from-cart", authMiddleware, removeFromCart);
cartRouter.post("/get-cart", authMiddleware, getCart);

export default cartRouter;
