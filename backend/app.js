import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import destinationRoutes from "./routes/destinationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/destination", destinationRoutes);
app.use("/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Could not connect to MongoDB", err));

export default app; // Use ES Module export
