import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (!email || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successful!");
    navigate("/signin");
  };

  return (
    <div className="PRCon">
      <h1>Reset Password</h1>
      <div className="ResetInfo">
        <p>Enter your email and set a new password.</p>

        <input type="email" placeholder="Please enter your email" className="EmailInput" 
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="New Password" className="NewPassInput" 
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

        <input type="password" placeholder="Confirm New Password" className="ConfirmPassInput" 
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button className="ResetBtn" onClick={handleReset}>Reset Password</button>
      </div>

      <button className="BackBtn" onClick={() => navigate("/signin")}>Back to Sign In</button>
    </div>
  );
};

export default PasswordReset;
