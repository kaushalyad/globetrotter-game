import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login}`, {
        email,
        password,
      });

      // Store token and user ID in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      // Redirect to /game after successful login
      navigate("/game");
    } catch (error) {
      // Display a specific error message based on the server's response
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
