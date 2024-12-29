import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import './registerStyle.css'; // Create a new CSS file for styling
import { UserIcon, PasswordIcon, EmailIcon } from '../../resources/icons'; // Assuming you have these icons
import headerImage from '../../assets/header-image.jpg'; // Import your image file
import { register } from "../../services/api"; // Import the register service

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); // State for feedback message
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [isError, setIsError] = useState(false); // State for loading indicator


  // const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowPopup(false);
    setIsLoading(true);
    setIsError(false);

    // Validation for passwords matching
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setShowPopup(true);
      setIsLoading(false);
      setIsError(true);
      return;
    }

    try {
      const result = await register(formData);

      if (result.success) {
        setMessage(result.message); // Success message
        setIsError(false);
        setShowPopup(true);
      } else {
        setMessage(result.message); // Error message
        setIsError(true);
        setShowPopup(true);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="info-section">
          <h1>Virtual Learning Management System</h1>
          <p>
            Join the next generation of online learning. Register and get started with virtual classes seamlessly.
          </p>
          <div className="image-container">
            <img src={headerImage} alt="Header" />
          </div>
        </div>
        <div className="register-box">
          <h2>Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="icon">
                <UserIcon />
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <span className="icon">
                <EmailIcon />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="register-button">
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>

        {/* Popup for Error */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{isError ? "Error" : "Success"}</h3>
              <p>{message}</p>
              <button onClick={closePopup} className="popup-close">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
