/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../database.jsx"; // Import the signup function

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Call signUpUser from database.js
      const user = await signUpUser(email, password);
      alert("User signed up successfully!");

      setIsAuthenticated(true);
      navigate("/unfake"); // Navigate to the next page after successful signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Logo on the left */}
      <div className="UnfakePromo">
        <div className="UnfakeLogo1"></div>
        <h2 className="Slogan"> To Simplify Truths</h2>
        <p className="SloDes">A fake news detection tool for X</p>
      </div>

      {/* Sign Up Box */}
      <div className="auth-box">
        <h2 className="Sign">Sign Up</h2>
        <div className="SRL">
          <p className="SRec"> Already have an account?</p>
          <p className="SILink" onClick={() => navigate("/signin")}>Sign In</p>
        </div>
        <form>
          <label className="EmailLabel">Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="EmailPH" id="signUp_email" />

          <label className="PassLabel">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a new password" required className="PassPH" id="signUp_password" />

          <label className="ConPassLabel">Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required className="ConPassPH" id="confirm_password" />

          <button className="NextBtn" type="button" onClick={handleSignUp}>Next</button>
          <button className="SWXBtn">Login with X</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
