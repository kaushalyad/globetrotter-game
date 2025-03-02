import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

// Generate a challenge link
export const generateChallengeLink = async (req, res) => {
  const { inviterId } = req.body;

  try {
    const inviter = await User.findById(inviterId);
    if (!inviter) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new challenge
    const challenge = new Challenge({
      inviterId,
      inviterScore: inviter.score,
    });
    await challenge.save();

    // Generate shareable link
    const challengeLink = `https://globetrotter-game.onrender.com/challenge/${challenge._id}`;

    res.status(201).json({ challengeLink });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// View a challenge
export const viewChallenge = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await Challenge.findById(id).populate("inviterId", "username score");
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json({ challenge });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};