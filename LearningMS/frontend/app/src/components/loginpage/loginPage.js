import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import './loginStyle.css';
import { UserIcon, PasswordIcon } from '../../resources/icons';
import headerImage from '../../assets/header-image.jpg'; // Import your image file
import { login } from "../../services/api"; // Import the login service

const LoginPage = () => {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [message, setMessage] = useState(""); // State for feedback message
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset popup state on new submission
    setMessage("");
    setShowPopup(false);
    setIsLoading(true); // Show loading indicator

    // Call the login service
    try {
      const result = await login(username, password);

      if (result.success) {
        setMessage(result.message); // Success message
        navigate('/dashboard/home'); // Navigate to the dashboard page
      } else {
        if( result.message & result.message !== '')
        {
          setMessage(result.message); // Error message
        }
        else
        {
          setMessage('Invalid User Name or Password. Please try again!');
        }
        setShowPopup(true); // Show popup for error
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setShowPopup(true); // Show popup for unexpected errors
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  // Navigate to the Register Page
  const navigateToRegister = () => {
    navigate('/register'); // Programmatic navigation to /register
  };

  return (
    <div className="login-container">
      <div className="info-section">
        <h1>Virtual Learning Management System</h1>
        <p>
          Welcome to the next generation of online learning. Access, manage, and
          participate in virtual classes seamlessly.
        </p>
        <div className="image-container">
          <img src={headerImage} alt="Header" />
        </div>
      </div>
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <PasswordIcon />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <span
            onClick={navigateToRegister}
            className="register-link"
            style={{ cursor: "pointer", color: "#6a11cb", textDecoration: "underline" }}
          >
            Register
          </span>
        </p>
      </div>

      {/* Popup for Error */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Error</h3>
            <p>{message}</p>
            <button onClick={closePopup} className="popup-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
