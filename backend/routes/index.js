import express from "express";
import {
  register,
  login,
  forgotPassword,
} from "../controllers/authController.js";
import {
  getRandomDestination,
  getShareeScore,
  submitGuess,
  getUserScore,
} from "../controllers/gameController.js";
import {
  generateChallengeLink,
  viewChallenge,
} from "../controllers/challengeController.js";

const router = express.Router();

// Root route


// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Game routes
router.get("/destination", getRandomDestination);
router.post("/guess", submitGuess);
router.get("/user/score", getUserScore);
router.get("/user/sharee-score", getShareeScore);

// Challenge routes
router.post("/challenge", generateChallengeLink);
router.get("/challenge/:id", viewChallenge);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// 404 Not Found middleware
router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;