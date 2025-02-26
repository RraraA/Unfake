import "./CompGame.css"; // Import CSS
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Firebase imports
import { doc, updateDoc } from "firebase/firestore"; // Firestore functions

const CompGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTime = location.state?.duration ?? 3600; // If undefined, default to 1 hour
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  // Function to update the user's time in Firestore
  const updateUserTime = async (timeRemaining) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "leaderboard", user.uid); // Reference to user's document in Firestore
        await updateDoc(userRef, {
          time: timeRemaining, // Save the remaining time to Firestore
        });

        console.log(`✅ User's remaining time (${timeRemaining}) saved in Firestore.`);
      }
    } catch (error) {
      console.error("❌ Error updating user's time:", error);
    }
  };

  // When the user clicks "Back to Competition", save the time and navigate back
  const handleBackToCompetition = () => {
    updateUserTime(timeLeft); // Save remaining time
    navigate("/competition"); // Navigate back to the competition page
  };

  return (
    <div className="CompContainer">
      <div className="VideoCon2">
        <video autoPlay loop muted playsInline className="SSVideoBG2">
        <source src="/SSVid.mp4" type="video/mp4"/></video>
      </div>
      <div className="GameLogoBorder">
        <img src="/Logo.png" alt="Logo for Comp Game" className="GameLogo" />
        <div className="GameIntroP">
          <p className="GameIntroDes">Ready to Fact Check some news and gain some</p>
          <h1 className="GameIntroCS">Credibility Scores?</h1>
          <div className="GameIntroIcons">
            <button className="Cancel" onClick={() => navigate("/competition")}>Cancel</button>
            <div className="Timer">
              <p className="CountDown">Time left:</p>
              <p className="TimerText">{formatTime(timeLeft)}</p> {/* ✅ Countdown Display Fixed */}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Moved Google Form inside the same div */}
      <div className="google-form-container">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfmAwqDmOtag5CgvgJYyK4dua7kMj4qFdFfV9f4ycBsOhp7tg/viewform?embedded=true"
          width="100%" 
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          allowFullScreen
          title="Unfake Google Form">
          Loading...
        </iframe>
      </div>

      <button className="BackButton" onClick={handleBackToCompetition}>Back to Competition</button>
    </div>
  );
};

export default CompGame;
