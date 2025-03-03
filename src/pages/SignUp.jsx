/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../database.jsx"; // Import the signup function
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { signUpWithX } from "../firebaseConfig"; // Import Twitter Sign-up function

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For general errors
  const [isChecked, setIsChecked] = useState(false); // Track checkbox state
  const navigate = useNavigate();
  
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSignUp = async () => {
    setErrorMessage("");

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { length, uppercase, lowercase, number, special } = passwordStrength;
    if (!length || !uppercase || !lowercase || !number || !special) {
      setErrorMessage("Your password is not strong enough. Ensure it meets all requirements.");
      return;
    }

    if (!isChecked) {
      setErrorMessage("You must agree to the Privacy Policy before signing up.");
      return;
    }

    try {
      const user = await signUpUser(email, password);
      alert("User signed up successfully!");

      setIsAuthenticated(true);
      navigate("/unfake");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Logo on the left */}
      <div className="UnfakePromo">
        <div className="UnfakeLogo1">
          <img src="./Logo.png" alt="" />
        </div>
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="EmailPH"
            id="signUp_email"
          />

          <label className="PassLabel">Password:</label>
          <div className="PassCon">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter a new password"
              required
              className="PassInput"
              id="signUp_password"
            />
            <button
              type="button"
              className="ShowPassBtn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <label className="ConPassLabel">Confirm Password:</label>
          <div className="PassCon">
            <input
              type={showConPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="ConPassPH"
              id="confirm_password"
            />
            <button
              type="button"
              className="ShowPassBtn"
              onClick={() => setShowConPassword(!showConPassword)}
            >
              {showConPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="PwStrength">
            <p className="PwRec" style={{ color: passwordStrength.length ? "#90EE90" : "pink" }}> • 8 characters</p>
            <p className="PwRec" style={{ color: passwordStrength.uppercase ? "#90EE90" : "pink" }}> • At least 1 uppercase letter (A-Z)</p>
            <p className="PwRec" style={{ color: passwordStrength.lowercase ? "#90EE90" : "pink" }}> • At least 1 lowercase letter (a-z)</p>
            <p className="PwRec" style={{ color: passwordStrength.number ? "#90EE90" : "pink" }}> • At least 1 number (0-9)</p>
            <p className="PwRec" style={{ color: passwordStrength.special ? "#90EE90" : "pink" }}> • At least 1 special character (!@#$%^&*)</p>
          </div>

          {/* Display error messages */}
          {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
          <hr className="Line"/>

          <div className="PPCon">
            <div className="CheckBoxCon">
              <input
                type="checkbox"
                id="agreeCheck"
                className="CheckBox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
            <p className="PPLabel">
              You are agreeing to our  
              <a href="/privacy" className="PPLink">Privacy Policy</a> &
              <a href="/terms" className="TermsLink">Terms of Service</a>
            </p>
          </div>

          <button
            className="NextBtn"
            type="button"
            onClick={handleSignUp}
            disabled={
              !passwordStrength.length ||
              !passwordStrength.uppercase ||
              !passwordStrength.lowercase ||
              !passwordStrength.number ||
              !passwordStrength.special ||
              !isChecked
            }
          >Next</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
