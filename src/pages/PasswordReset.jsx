import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { sendPasswordResetEmail } from "firebase/auth";
import "./PasswordReset.css";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handlePasswordResetRequest = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "A password reset email has been sent. Please check your inbox!"
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setErrorMessage(
        "Failed to send password reset email. Please check your email and try again."
      );
    }
  };

  return (
    <div className="PRCon">
      <h1>Reset Password</h1>
      <div className="ResetInfo">
        <p className="ResetMessage">Enter your email and set a new password.</p>
        <input
          type="email"
          placeholder="Please enter your email"
          className="EmailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="ResetBtn" onClick={handlePasswordResetRequest}>
          Send Reset Link
        </button>
      </div>
      <button className="BackBtn" onClick={() => navigate("/signin")}>Back to Sign In</button>
    </div>
  );
};

export default PasswordReset;
