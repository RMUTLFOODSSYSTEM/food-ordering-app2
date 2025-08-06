import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication methods
import { auth1 } from "../../firebaseConfig"; // นำเข้า auth1 จาก firebase.js
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ใช้ auth1 ในการลงชื่อเข้า
      await signInWithEmailAndPassword(auth1, email, password);
      navigate("/home"); // Redirect to the home page on successful login
    } catch (error) {
      setError("Error logging in: " + error.message); // Set the error message
    }
  };

  const navigateToRegister = () => {
    navigate("/register"); // Use navigate to go to the register page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {/* Show error message if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="extra-links">
          <button className="register-button" onClick={navigateToRegister}>Register</button>
          <button className="forgot-password-button">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
}

export default Login;