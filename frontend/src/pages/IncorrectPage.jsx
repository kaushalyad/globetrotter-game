import React from "react";
import Lottie from "lottie-react";
import sadAnimation from "../assets/sad.json"; // Replace with your Lottie animation
import { useNavigate } from "react-router-dom";
import { FaRedo, FaSync } from "react-icons/fa"; // Import the refresh icon

const IncorrectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center bg-red-100">
      <h1 className="text-3xl font-bold mb-10 text-red-500">
        Incorrect Answer!{" "}
      </h1>
      <Lottie
        animationData={sadAnimation}
        loop={true}
        style={{ height: 150 }}
      />
      <p className="mt-10 text-black">Oops! That's not the correct answer. Try again!</p>
      <button
        onClick={() => navigate("/game")} // Redirect to the home page
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <FaSync className="mr-2" />
        Play Again
        {/* Refresh icon on the right */}
      </button>
    </div>
  );
};

export default IncorrectPage;
