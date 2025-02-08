import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordReset from "./PasswordReset";

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setIsAuthenticated(true);
    navigate("/unfake");
  };

  return (
    <div className="auth-container">
      <div className="UnfakePromo">
        <div className="UnfakeLogo1"></div>
        <h2 className="Slogan">To Simplify Truths</h2>
        <p className="SloDes">A fake new detection tool for X</p>
      </div>

      {/* Sign In Box */}
      <div className="auth-box">
        <h2 className="Sign">Sign In</h2>
        {/* Link to Sign Up */}
        <div className="SRL">
          <p className="SRec"> Don't have an account?</p>
          <p className="SULink" onClick={() => navigate("/signup")}>Sign Up</p>
        </div>
        <form>
          <label className="EmailLabel">Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="EmailPH"/>

          <label className="PassLabel">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="PassPH"/>
          <div className="ResetPass">
            <p className="ForgotPass">Forgot your Password?</p>
            <p className="Reset" onClick={() => navigate ("/passwordReset")}>Reset Now</p>
          </div>
          <button className="NextBtn" type="button" onClick={handleNext}>Next</button>
          <button className="SWXBtn"> Login with X</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
