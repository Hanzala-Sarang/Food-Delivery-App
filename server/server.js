import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4500;

// Define the allowed origins
const allowedOrigins = [
  "https://food-delivery-app-admin-panel.onrender.com",
  "https://food-delivery-app-client-je3x.onrender.com",
];

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();

// api endpoint
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));
app.use(express.static("public"));

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
