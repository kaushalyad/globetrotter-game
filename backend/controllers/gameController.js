import Destination from "../models/Destination.js";
import User from "../models/User.js";

import { generateClueAndFact } from "../services/openaiService.js";

export const getDestinationDetails = async (req, res) => {
  const { destination } = req.query;

  if (!destination) {
    return res.status(400).json({ message: "Destination is required" });
  }

  try {
    const clueAndFact = await generateClueAndFact(destination);
    res.status(200).json({ clueAndFact });
  } catch (error) {
    res.status(500).json({ message: "Error generating destination details" });
  }
};

// Get a random destination
export const getShareeScore = async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ score: user.score });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
export const getUserScore = async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ score: user.score });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  export const getRandomDestination = async (req, res) => {
    try {
      // Get the total number of documents in the collection
      const count = await Destination.countDocuments();
  
      // If the collection is empty, return a 404 error
      if (count === 0) {
        return res.status(404).json({ message: "No destinations found" });
      }
  
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * count);
  
      // Find a random document using the random index
      const destination = await Destination.findOne().skip(randomIndex);
  
      // If no document is found (unlikely but possible), return a 404 error
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
  
      // Return the random destination
      res.json(destination);
    } catch (err) {
      console.error("Error fetching random destination:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

// Submit a guess
export const submitGuess = async (req, res) => {
  const { userId, destinationId, guess } = req.body;

  try {
    const destination = await Destination.findById(destinationId);
    const user = await User.findById(userId);

    if (!destination || !user) {
      return res.status(404).json({ message: "Destination or user not found" });
    }

    // Check if the guess is correct
    if (destination.city.toLowerCase() === guess.toLowerCase()) {
      user.score.correct += 1;
      res.json({ correct: true, funFact: destination.funFact });
    } else {
      user.score.incorrect += 1;
      res.json({ correct: false, funFact: destination.funFact });
    }

    // Save the updated user score
    await user.save();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};