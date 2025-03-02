import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Challenge from "./components/Challenge";
import ProtectedRoute from "./components/ProtectedRoute";
import GamePage from "./pages/GamePage";
import CorrectPage from "./pages/CorrectPage";
import IncorrectPage from "./pages/IncorrectPage";
import SharePage from "./pages/SharePage.jsx";
import UpdatePassword from "./components/UpdatePassword";

const App = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/game"); // Redirect to /game if authenticated
    }
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/forgot-password" element={<UpdatePassword />} />
      <Route path="/share/:userId" element={<SharePage />} /> {/* Share Page */}
      {/* Protected Routes */}
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/correct"
        element={
          <ProtectedRoute>
            <CorrectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incorrect"
        element={
          <ProtectedRoute>
            <IncorrectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/challenge"
        element={
          <ProtectedRoute>
            <Challenge />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Login />} />

      {/* Default Route */}
    </Routes>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
