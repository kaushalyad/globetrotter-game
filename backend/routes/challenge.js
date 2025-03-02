import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Generate challenge link
router.post("/generate-link", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const challengeLink = `https://globetrotter-game.onrender.com/challenge/${user._id}`;
    res.json({ link: challengeLink });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch invitee's score
router.get("/score/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username: user.username, score: user.score });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
