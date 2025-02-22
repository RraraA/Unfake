import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordReset.css";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Check password strength dynamically
  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8, // At least 8 characters
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    });
  };

  // Handle Password Input Change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleReset = () => {
    setErrorMessage(""); // Clear errors
    setSuccessMessage(""); // Clear success messages

    if (!email || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check if password meets all strength conditions
    const { length, uppercase, lowercase, number, special } = passwordStrength;
    if (!length || !uppercase || !lowercase || !number || !special) {
      setErrorMessage(
        "Your password is not strong enough. Ensure it meets all requirements."
      );
      return;
    }

    // Simulate Password Reset Success
    setSuccessMessage(" Password reset successful! Redirecting...");

    // Redirect to Sign In page after 2 seconds
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  return (
    <div className="PRCon">
      <h1>Reset Password</h1>
      <div className="ResetInfo">
        <p>Enter your email and set a new password.</p>

        <input
          type="email"
          placeholder="Please enter your email"
          className="EmailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="NewPassInput"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="ConfirmPassInput"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Password Strength Feedback */}
        <div className="PwStrength">
          <p className="PwRec" style={{ color: passwordStrength.length ? "#90EE90" : "pink" }}>
            • At least 8 characters
          </p>
          <p className="PwRec" style={{ color: passwordStrength.uppercase ? "#90EE90" : "pink" }}>
            • At least 1 uppercase letter (A-Z)
          </p>
          <p className="PwRec" style={{ color: passwordStrength.lowercase ? "#90EE90" : "pink" }}>
            • At least 1 lowercase letter (a-z)
          </p>
          <p className="PwRec" style={{ color: passwordStrength.number ? "#90EE90" : "pink" }}>
            • At least 1 number (0-9)
          </p>
          <p className="PwRec" style={{ color: passwordStrength.special ? "#90EE90" : "pink" }}>
            • At least 1 special character (!@#$%^&*)
          </p>
        </div>

        {/* Display error messages */}
        {errorMessage && <p className="ErrorMSg" style={{ color: "pink" }}>{errorMessage}</p>}

        {/* Display success message */}
        {successMessage && <p className="SuccMsg" style={{ color: "white" }}>{successMessage}</p>}

        <button className="ResetBtn" onClick={handleReset} disabled={
          !passwordStrength.length ||
          !passwordStrength.uppercase ||
          !passwordStrength.lowercase ||
          !passwordStrength.number ||
          !passwordStrength.special
        }>
          Reset Password
        </button>
      </div>

      <button className="BackBtn" onClick={() => navigate("/signin")}>Back to Sign In</button>
    </div>
  );
};

export default PasswordReset;
