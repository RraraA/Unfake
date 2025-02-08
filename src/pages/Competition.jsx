import "./Competition.css"; // Import CSS
import { useNavigate } from "react-router-dom";
import { useRef } from "react"; // For scrolling

const Competition = () => {
  const navigate = useNavigate();
  const gameExpRef = useRef(null); //Reference for GameExp section

  //Function to Scroll to GameExp
  const scrollToGameExp = () => {
    if (gameExpRef.current) {
      gameExpRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Function to Start Game & Pass Timer
  const startGame = () => {
    navigate("/compgame", { state: { duration: 3600 } }); // Pass 1-hour timer (3600 seconds)
  };

  return (
    <div className="CompContainer">
      <h1 className="CompTitle">Competition</h1>
      <p className="CompDes">
        Fact Checking requires Credibility to promote responsible voting.
      </p>

      <div className="CompBorder">
        <div className="CompStatus">
          <img src="/Logo.png" alt="Logo for Competition" className="CompLogo" />
          <h2 className="GameA">Game is Available</h2>
        </div>
        <div className="CompInfoBorder">
          <h2 className="UserCredDes">Your current Credibility Score:</h2>
          <div className="CompUserInfo">
            <div className="GradeBorder">
              <label className="UserGrade" htmlFor="UserGrade">A</label> 
              <h3 className="Grade">Grade</h3>
            </div>
            <div className="ScoreBorder">
              <label className="UserScore" htmlFor="UserScore">29</label>  
              <h3 className="Score30">Score/30</h3> 
            </div>
            <div className="CSBorder">
              <label className="UserCS" htmlFor="UserCS">1</label>
              <h3 className="Cred">Credibility</h3>
            </div>
          </div>

          {/*Game Start / Read More Buttons */}
          <p className="GainCS">Ready to Fact Check news and gain some</p>
          <h2 className="CSStyle">Credibility Scores?</h2>
          <div className="CompBtns">
            <button className="Rankings" onClick={() =>navigate ("/rankings")}>Rankings</button>
            <button className="CompStartBtn" onClick={startGame}>Start</button> {/* Pass the Timer */}
            <button className="CompRMBtn" onClick={scrollToGameExp}>Read More</button>
          </div>
        </div>
      </div>

      {/* Game Explanation Section */}
      <div ref={gameExpRef} className="CompExp">
        <h1 className="GameExp">How Does Our Game Work?</h1>
        <p className="GameDes">
          The Fact-Checking game happens 3 times a year (Jan, April, and Sep),
          where our users participate to increase their Credibility Scores.
        </p>
        <p className="GameDes">
          Each user will be given 1 hour to complete the test as they are ENCOURAGED to conduct 
          research before answering questions. Scores of each user will restart every competition 
          to promote fairness and allow users to have a chance to become the top ranker. When users 
          participate in the voting of news, their credibility scores will be determined by these 
          competitions and contribute to our Checked algorithm for determining the news.
        </p>
        <p className="GameDes">
          Users will only receive their results one week after the competition has ended.
        </p>
        <h1 className="CSTableIntro">Credibility Score</h1>
        <img src="/CSTable.png" alt="Credibility Score Table" className="CSTable" />
      </div>
      <button className="CompStartBtn" onClick={() => navigate("/compgame")}>Start Game</button>
    </div>
  );
};

export default Competition;
