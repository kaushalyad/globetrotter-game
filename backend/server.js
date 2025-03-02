import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Routes
app.use("/api", routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
