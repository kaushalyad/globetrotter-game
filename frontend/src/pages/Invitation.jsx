import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Invitation = () => {
  const { userId } = useParams();
  const [invitee, setInvitee] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchInvitee = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/challenge/score/${userId}`);
        setInvitee(response.data);
      } catch (error) {
        console.error("Error fetching invitee:", error);
      }
    };
    fetchInvitee();
  }, [userId]);

  if (!invitee) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Challenge a Friend</h1>
      <p className="text-lg mb-4">
        {invitee.username} has a score of {invitee.score}. Can you beat it?
      </p>
      <button
        onClick={() => window.location.href = "/"}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Play Now
      </button>
    </div>
  );
};

export default Invitation;