import "./CompGame.css"; // Import CSS
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

  return (
    <div className="CompContainer">
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

      <button className="BackButton" onClick={() => navigate("/competition")}>Back to Competition</button>
    </div>
  );
};

export default CompGame;
