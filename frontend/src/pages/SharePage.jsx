import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const SharePage = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [shareeScore, setShareeScore] = useState({ correct: 0, incorrect: 0 });
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch sharee's score
  useEffect(() => {
    const fetchShareeScore = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/sharee-score`,
          {
            params: { userId }, // Pass userId as a query parameter
          }
        );
        setShareeScore(response.data.score); // Update the sharee's score state
      } catch (error) {
        console.error("Error fetching sharee's score:", error);
      }
    };

    fetchShareeScore();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when the component mounts
      transition={{ duration: 0.5 }} // Animation duration
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
    >
      <motion.h1
        initial={{ scale: 0 }} // Initial animation state
        animate={{ scale: 1 }} // Animation when the component mounts
        transition={{ delay: 0.2, duration: 0.5 }} // Animation delay and duration
        className="text-3xl font-bold mb-6 text-orange-600"
      >
        Globetrotter Game Challenge
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} // Initial animation state
        animate={{ opacity: 1 }} // Animation when the component mounts
        transition={{ delay: 0.4, duration: 0.5 }} // Animation delay and duration
        className="text-lg mb-4 text-black"
      >
        Your friend scored{" "}
        <span className="text-green-500">{shareeScore.correct} correct</span>{" "}
        guesses and{" "}
        <span className="text-red-500">{shareeScore.incorrect} incorrect</span>{" "}
        guesses.
      </motion.p>
      <motion.button
        initial={{ scale: 0 }} // Initial animation state
        animate={{ scale: 1 }} // Animation when the component mounts
        transition={{ delay: 0.6, duration: 0.5 }} // Animation delay and duration
        onClick={() => navigate("/game")}
        className="bg-green-500 text-white p-2 rounded-[5px] py-1 hover:bg-green-600"
      >
        Play Now
      </motion.button>
    </motion.div>
  );
};

export default SharePage;
