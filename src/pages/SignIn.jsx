import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../database.jsx"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!isChecked) {
      alert("You must agree to the Privacy Policy before signing in.");
      return;
    }

    try {
      const user = await signInUser(email, password);
      alert("Sign in successful!");

      setIsAuthenticated(true);
      navigate("/unfake");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Logo on the left */}
      <div className="UnfakePromo">
        <div className="UnfakeLogo1">
          <img src="./Logo.png" alt="" /> 
        </div>
        <h2 className="Slogan">To Simplify Truths</h2>
        <p className="SloDes">A fake news detection tool for X</p>
      </div>

      {/* Sign In Box */}
      <div className="auth-box">
        <h2 className="Sign">Sign In</h2>
        <div className="SRL">
          <p className="SRec"> Don't have an account?</p>
          <p className="SULink" onClick={() => navigate("/signup")}>Sign Up</p>
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

          <label className="PassLabel">Password:</label>
          <div className="PassCon">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
              className="PassInput"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="ShowPassBtn"> 
              {showPassword ? <FaEye  /> : <FaEyeSlash  />}
            </button>
          </div>

          <div className="ResetPass">
            <p className="ForgotPass">Forgot your Password?</p>
            <p className="Reset" onClick={() => navigate ("/passwordReset")}>Reset Now</p>
          </div>
          <hr className="Line"/>

          {/* Checkbox Section */}
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

          <button className="NextBtn" type="button" onClick={handleSignIn}>Next</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
