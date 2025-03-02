import React, { useState } from "react";
import axios from "axios";

const Challenge = () => {
  const [challengeLink, setChallengeLink] = useState("");
  const [inviterScore, setInviterScore] = useState(null);
  const userId = localStorage.getItem("userId");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const generateChallenge = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/challenge`, {
        inviterId: userId,
      });
      setChallengeLink(response.data.challengeLink);
    } catch (err) {
      console.error("Failed to generate challenge:", err);
    }
  };

  const viewChallenge = async (challengeId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/challenge/${challengeId}`
      );
      setInviterScore(response.data.challenge.inviterId.score);
    } catch (err) {
      console.error("Failed to view challenge:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Challenge a Friend</h1>
      <button
        onClick={generateChallenge}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        Generate Challenge Link
      </button>
      {challengeLink && (
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <p>Share this link with your friend:</p>
          <a
            href={challengeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {challengeLink}
          </a>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-8">View Challenge</h2>
      <input
        type="text"
        placeholder="Enter Challenge ID"
        onChange={(e) => viewChallenge(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      {inviterScore && (
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <p>Inviter's Score:</p>
          <p>Correct: {inviterScore.correct}</p>
          <p>Incorrect: {inviterScore.incorrect}</p>
        </div>
      )}
    </div>
  );
};

export default Challenge;
