import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import "./PasswordReset.css";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handlePasswordResetRequest = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    setIsLoading(true); // Disable button during request

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "A password reset email has been sent. Please check your inbox!"
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email format. Please enter a valid email.");
      } else {
        setErrorMessage(
          "Failed to send password reset email. Please try again later."
        );
      }
    } finally {
      setIsLoading(false); // Re-enable button after request
    }
  };

  return (
    <div className="PRCon">
      <h1>Reset Password</h1>
      <div className="ResetInfo">
        <p className="ResetMessage">Enter your email to set a temporary password to access your account.</p>
        <input
          type="email"
          placeholder="Please enter your email"
          className="EmailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
        {successMessage && <p className="SuccessMessage">{successMessage}</p>}
        <button
          className="ResetBtn"
          onClick={handlePasswordResetRequest}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
      <p className="ResetMessage">For security reasons, please <span className="ResetBold">Reset Password Again</span> via the accounts page</p>
      <button className="BackBtn" onClick={() => navigate("/signin")}>
        Back to Sign In
      </button>
    </div>
  );
};

export default PasswordReset;
