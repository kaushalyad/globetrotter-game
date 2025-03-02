import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShareAlt, FaSync } from "react-icons/fa"; // Import the share and sync icons
import ClueDisplay from "../components/ClueDisplay";
import GuessForm from "../components/GuessForm";
import ScoreDisplay from "../components/ScoreDisplay";

const GamePage = () => {
  const [destination, setDestination] = useState(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [options, setOptions] = useState([]); // Options for the dropdown
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user's score from the backend
  const fetchUserScore = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/score`, {
        params: { userId }, // Pass userId as a query parameter
      });
      setScore(response.data.score); // Update the score state
    } catch (error) {
      console.error("Error fetching user score:", error);
      setError("Failed to fetch your score. Please try again.");
    }
  };

  // Fetch a random destination
  const fetchDestination = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear previous errors
    try {
      const response = await axios.get(`${backendUrl}/api/destination`);
      setDestination(response.data);

      const allOptions = [...response.data.options];
      setOptions(allOptions.sort(() => Math.random() - 0.5)); // Shuffle options
    } catch (error) {
      console.error("Error fetching destination:", error);
      setError("Failed to fetch a destination. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle user's guess
  const handleGuess = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(`${backendUrl}/api/guess`, {
        guess,
        destinationId: destination._id,
        userId,
      });

      // Update score and show feedback
      if (response.data.correct) {
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        navigate("/correct", {
          state: {
            score: { correct: score.correct + 1, incorrect: score.incorrect },
          },
        });
      } else {
        setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        navigate("/incorrect", {
          state: {
            score: { correct: score.correct, incorrect: score.incorrect + 1 },
          },
        });
      }

      // Fetch a new destination and reset guess
      fetchDestination();
      setGuess(""); // Clear the guess input
    } catch (error) {
      console.error("Error validating guess:", error);
      setError("Failed to validate your guess. Please try again.");
    }
  };

  // Handle sharing
  const handleShare = () => {
    const shareData = {
      title: "Globetrotter Challenge",
      text: `I just scored ${score.correct} correct guesses in the Globetrotter Challenge! Can you beat me?`,
      url: `${window.location.origin}/share/${userId}`, // Shareable link with user ID
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  // Fetch user's score and a new destination when the page loads
  useEffect(() => {
    fetchUserScore(); // Fetch user's score
    fetchDestination(); // Fetch a new destination
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        Globetrotter Challenge
      </h1>
      <ScoreDisplay score={score} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-lg mb-4">Loading...</p>
      ) : (
        destination && (
          <>
            <ClueDisplay clues={destination.clues} />
            <GuessForm
              guess={guess}
              setGuess={setGuess}
              handleGuess={handleGuess}
              options={options} // Pass options to GuessForm
            />
          </>
        )
      )}
      {/* Sharing Button */}
      <button
        onClick={handleShare}
        className="mt-6 bg-blue-500 text-white p-2 rounded-[10px] hover:bg-blue-600 items-center min-w-35 flex justify-center"
      >
        <FaShareAlt className="mr-2" /> Share Score
      </button>
      {/* Play Again Button */}
    </div>
  );
};

export default GamePage;
