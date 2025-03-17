import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../database.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

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
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  //Allowed Email Domains
  const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

  //Function to check if email domain is allowed
  const isValidEmailDomain = (email) => {
    const emailParts = email.split("@");
    return emailParts.length === 2 && allowedDomains.includes(emailParts[1]);
  };

  //Password Strength Checker
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  };

  //Handle Password Input & Live Validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  //Handle Confirm Password Validation
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  //Check if Password Meets All Criteria
  const isPasswordValid = () => Object.values(passwordStrength).every((val) => val === true);

  //Handle Sign-Up Process
  const handleSignUp = async () => {
    setErrorMessage("");

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    //Validate Email Domain
    if (!isValidEmailDomain(email)) {
      setErrorMessage("Invalid email domain. Please use @gmail.com, @yahoo.com, etc.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isPasswordValid()) {
      setErrorMessage("Your password is not strong enough. Ensure it meets all requirements.");
      return;
    }

    if (!isChecked) {
      alert("You must agree to the Privacy Policy before signing up.");
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
      {/* Logo Section */}
      <div className="UnfakePromo">
        <div className="UnfakeLogo1">
          <img src="./Logo.png" alt="" />
        </div>
        <h2 className="Slogan"> To Simplify Truths</h2>
        <p className="SloDes">A fake news detection tool for X</p>
      </div>

      {/* Sign-Up Form */}
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
          />
          {!isValidEmailDomain(email) && email.length > 0 && (
            <p className="EmailErrorMsg">
              Invalid email domain. Please use @gmail.com, @yahoo.com, etc.
            </p>
          )}

          <label className="PassLabel">Password:</label>
          <div className="PassCon">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter a new password"
              required
              className="PassInput"
            />
            <button type="button" className="ShowPassBtn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <label className="ConPassLabel">Confirm Password:</label>
          <div className="PassCon">
            <input
              type={showConPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Re-enter your password"
              required
              className="ConPassPH"
            />
            <button type="button" className="ShowPassBtn" onClick={() => setShowConPassword(!showConPassword)}>
              {showConPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/*Live Password Strength Display */}
          <div className="PwStrength">
            <p style={{ color: passwordStrength.length ? "#90EE90" : "pink" }}>• 8 characters</p>
            <p style={{ color: passwordStrength.uppercase ? "#90EE90" : "pink" }}>• At least 1 uppercase letter (A-Z)</p>
            <p style={{ color: passwordStrength.lowercase ? "#90EE90" : "pink" }}>• At least 1 lowercase letter (a-z)</p>
            <p style={{ color: passwordStrength.number ? "#90EE90" : "pink" }}>• At least 1 number (0-9)</p>
            <p style={{ color: passwordStrength.special ? "#90EE90" : "pink" }}>• At least 1 special character (!@#$%^&*)</p>
          </div>

          {/* Display error messages */}
          {errorMessage && <p className="error-message" style={{ color: "pink" }}>{errorMessage}</p>}
          <hr className="Line"/>
          {/* Checkbox Section */}
          <div className="PPCon">
            <div className="CheckBoxCon">
            <input 
              type="checkbox" 
              id="agreeCheck" 
              className="CheckBox" 
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                console.log("Checkbox checked:", e.target.checked);
              }}
            />
            </div>
            <p className="PPLabel">
              You are agreeing to our  
              <a href="/privacy" className="PPLink">Privacy Policy</a> &
              <a href="/terms" className="TermsLink">Terms of Service</a>
            </p>
          </div>
          <button className="NextBtn" type="button" onClick={handleSignUp}>Next</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
