import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// Get random destination
router.get("/random", async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);

    // Add incorrect answers
    const incorrectDestinations = await Destination.aggregate([{ $sample: { size: 3 } }]);
    const possibleAnswers = [destination.name, ...incorrectDestinations.map((d) => d.name)];

    res.json({ ...destination.toObject(), possibleAnswers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Validate guess
router.post("/validate", async (req, res) => {
  const { destinationId, userGuess } = req.body;
  try {
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const isCorrect = destination.name === userGuess;
    res.json({ isCorrect, funFact: destination.funFact });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;