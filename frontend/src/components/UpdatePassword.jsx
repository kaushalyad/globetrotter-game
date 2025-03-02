import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdatePasswordPage from "../pages/UpdatePassword";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/api/forgot-password`, {
        email,
      });
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
