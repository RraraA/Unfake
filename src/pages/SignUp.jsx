import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsAuthenticated(true);
    navigate("/unfake");
  };

  return (
    <div className="auth-container">
      {/* Logo on the left */}
      <div className="UnfakePromo">
        <div className="UnfakeLogo1"></div>
        <h2 className="Slogan"> To Simplify Truths</h2>
        <p className="SloDes">A fake new detection tool for X</p>
      </div>

      {/* Sign Up Box */}
      <div className="auth-box">
        <h2 className="Sign">Sign Up</h2>
        <div className="SRL">
          <p className="SRec"> Already have an account?</p>
          <p className="SILink" onClick={() => navigate ("/signin")}>Sign In</p>
        </div>
        <form>
          <label className="EmailLabel">Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="EmailPH" />

          <label className="PassLabel">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a new password" required className="PassPH" />

          <label className="ConPassLabel">Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required className="ConPassPH" />

          <button className="NextBtn" type="button" onClick={handleNext}>Next</button>
          <button className="SWXBtn"> Login with X</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
