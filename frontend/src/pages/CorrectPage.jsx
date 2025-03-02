import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import happyAnimation from "../assets/happy.json"; // Replace with your Lottie animation
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { FaSync } from "react-icons/fa"; // Import the refresh icon

const CorrectPage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 h-[100vh] bg-green-100">
      <div className="flex justify-center items-center w-[100%]">
        <Confetti
          width={windowSize.width} // Set width to the full window width
          height={windowSize.height} // Set height to the full window height
          recycle={false} // Stop confetti after one cycle
          style={{ position: "fixed", top: 0, left: 0 }} // Position confetti at the top-left corner
        />
      </div>
      <h1 className="text-3xl font-bold mb-10 text-green-700">
        Correct Answer! 🎉
      </h1>
      <Lottie
        animationData={happyAnimation}
        loop={true}
        style={{ height: 150 }}
      />
      <p className="mt-10">You guessed it right! Well done!</p>
      <button
        onClick={() => {
          navigate("/game");
        }} // Redirect to the game page
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <FaSync className="mr-2" />
        Play Again
      </button>
    </div>
  );
};

export default CorrectPage;