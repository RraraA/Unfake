import "./Competition.css"; // Import CSS
import { useNavigate  } from "react-router-dom";
import { useRef, useState, useEffect } from "react"; // For scrolling
import { auth, db } from "../firebaseConfig"; // Firebase imports
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore"; // For fetching user details

const Competition = () => {
  const navigate = useNavigate();
  const gameExpRef = useRef(null); //Reference for GameExp section

  const [userDetails, setUserDetails] = useState(null); // Store user details
  const [grade, setGrade] = useState('');
  const [credibility, setCredibility] = useState('');
  const [score, setScore] = useState(0); // Store user score

  // Function to determine grade and credibility based on score
  const determineGradeAndCredibility = (score) => {
    if (score === null) return { grade: "-", credibility: "-" };

    let calculatedGrade = "-";
    let calculatedCredibility = "-";

    if (score >= 28) {
      calculatedGrade = "A";
      calculatedCredibility = 1;
    } else if (score >= 24) {
      calculatedGrade = "B";
      calculatedCredibility = 0.8;
    } else if (score >= 16) {
      calculatedGrade = "C";
      calculatedCredibility = 0.6;
    } else if (score >= 11) {
      calculatedGrade = "D";
      calculatedCredibility = 0.4;
    } else if (score >= 6) {
      calculatedGrade = "E";
      calculatedCredibility = 0.2;
    } else if (score >= 0) {
      calculatedGrade = "F";
      calculatedCredibility = 0;
    }

    return { grade: calculatedGrade, credibility: calculatedCredibility };
  };

    // Update grade & credibility when score is available
    useEffect(() => {
      if (score !== null) {
        const { grade, credibility } = determineGradeAndCredibility(score);
        setGrade(grade);
        setCredibility(credibility);

        if (auth.currentUser) {
          updateLeaderboardWithCredibility(auth.currentUser.uid, credibility);
        }

          // After updating the logged-in user's credibility, update all users' credibility
          updateCredibilityForAllUsers();
      }
    }, [score]);

    // Function to update leaderboard with credibility
    const updateLeaderboardWithCredibility = async (userId, credibility) => {
      try {
        const leaderboardRef = doc(db, "leaderboard", userId);
    
        // Merge new credibility without overwriting existing fields
        await updateDoc(leaderboardRef, { credibility: credibility }, { merge: true });
    
        console.log("✅ Credibility updated in leaderboard:", credibility);
      } catch (error) {
        console.error("❌ Error updating leaderboard:", error);
      }
    };

      // Function to update credibility for all users in the leaderboard
  const updateCredibilityForAllUsers = async () => {
    try {
      // Fetch all users from the leaderboard collection
      const leaderboardRef = collection(db, "leaderboard");
      const querySnapshot = await getDocs(leaderboardRef);

      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push({
          id: doc.id,
          score: userData.score,
          username: userData.username,
        });
      });

      // Calculate and update credibility for all users
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userRef = doc(db, "leaderboard", user.id);

        // Calculate credibility based on score
        let calculatedCredibility = 0;

        if (user.score >= 28) {
          calculatedCredibility = 1; // Grade A
        } else if (user.score >= 24) {
          calculatedCredibility = 0.8; // Grade B
        } else if (user.score >= 16) {
          calculatedCredibility = 0.6; // Grade C
        } else if (user.score >= 11) {
          calculatedCredibility = 0.4; // Grade D
        } else if (user.score >= 6) {
          calculatedCredibility = 0.2; // Grade E
        } else {
          calculatedCredibility = 0; // Grade F
        }

        // Update the credibility in Firestore for each user
        await updateDoc(userRef, { credibility: calculatedCredibility });

        console.log(`✅ Credibility updated for ${user.username}: ${calculatedCredibility}`);
      }
    } catch (error) {
      console.error("❌ Error updating credibility for all users:", error);
    }
  };

    // Fetch user details and score from Firestore
    useEffect(() => {
      const fetchUserDetails = async () => {
        const user = auth.currentUser;
        if (user) {
          // 🔥 Fetch from "leaderboard" collection instead of "user"
          const userRef = doc(db, "leaderboard", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userScore = userData.score || 0; // Default to 0 if no score exists
            console.log("✅ Fetched user score:", userScore);

            setScore(userScore);
          } else {
            console.warn("⚠️ User document not found in Firestore.");
            setScore(0); // Default if user is not found
          }
        }
      };

      fetchUserDetails();
    }, []);

    useEffect(() => {
      // Call the function to set grade and credibility based on the score
      if (score !== null) {
        determineGradeAndCredibility(score);
      }
    }, [score]);

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

//   return (
//     <div className="CompContainer">
//       <div className="VideoCon2">
//         <video autoPlay loop muted playsInline className="SSVideoBG2">
//         <source src="/SSVid.mp4" type="video/mp4"/></video>
//       </div>
//       <h1 className="CompTitle">Competition</h1>
//       <p className="CompDes">
//         Fact Checking requires Credibility to promote responsible voting.
//       </p>
//       <div className="CompBorder">
//         <div className="CompStatus">
//           <img src="/Logo.png" alt="Logo for Competition" className="CompLogo" />
//           <h2 className="GameA">Game is Available</h2>
//         </div>
//         <div className="CompInfoBorder">
//           <h2 className="UserCredDes">Your current Credibility Score:</h2>
//           <div className="CompUserInfo">
//             <div className="GradeBorder">
//               <label className="UserGrade" htmlFor="UserGrade">A</label> 
//               <h3 className="Grade">Grade</h3>
//             </div>
//             <div className="ScoreBorder">
//               <label className="UserScore" htmlFor="UserScore">29</label>  
//               <h3 className="Score30">Score/30</h3> 
//             </div>
//             <div className="CSBorder">
//               <label className="UserCS" htmlFor="UserCS">1</label>
//               <h3 className="Cred">Credibility</h3>
//             </div>
//           </div>

//           {/*Game Start / Read More Buttons */}
//           <p className="GainCS">Ready to Fact Check news and gain some</p>
//           <h2 className="CSStyle">Credibility Scores?</h2>
//           <div className="CompBtns">
//             <button className="Rankings" onClick={() =>navigate ("/rankings")}>Rankings</button>
//             <button className="CompStartBtn" onClick={startGame}>Start</button> {/* Pass the Timer */}
//             <button className="CompRMBtn" onClick={scrollToGameExp}>Read More</button>
//           </div>
//         </div>
//       </div>

//       {/* Game Explanation Section */}
//       <div ref={gameExpRef} className="CompExp">
//         <h1 className="GameExp">How Does Our Game Work?</h1>
//         <p className="GameDes">
//           The Fact-Checking game happens 3 times a year (Jan, April, and Sep),
//           where our users participate to increase their Credibility Scores.
//         </p>
//         <p className="GameDes">
//           Each user will be given 1 hour to complete the test as they are ENCOURAGED to conduct 
//           research before answering questions. Scores of each user will restart every competition 
//           to promote fairness and allow users to have a chance to become the top ranker. When users 
//           participate in the voting of news, their credibility scores will be determined by these 
//           competitions and contribute to our Checked algorithm for determining the news.
//         </p>
//         <p className="GameDes">
//           Users will only receive their results one week after the competition has ended.
//         </p>
//         <h1 className="CSTableIntro">Credibility Score</h1>
//         <img src="/CSTable.png" alt="Credibility Score Table" className="CSTable" />
//       </div>
//       < button className="CompStartBtn2" onClick={() => navigate("/compgame")}>Start Game</button>
//     </div>
//   );
// };

return (
  <div className="CompContainer">
    <div className="VideoCon2">
      <video autoPlay loop muted playsInline className="SSVideoBG2">
      <source src="/SSVid.mp4" type="video/mp4"/></video>
    </div>
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
            <label className="UserGrade" htmlFor="UserGrade">{grade}</label> 
            <h3 className="Grade">Grade</h3>
          </div>
          <div className="ScoreBorder">
            <label className="UserScore" htmlFor="UserScore">{score}</label>  
            <h3 className="Score30">Score/30</h3> 
          </div>
          <div className="CSBorder">
            <label className="UserCS" htmlFor="UserCS">{credibility}</label>
            <h3 className="Cred">Credibility</h3>
          </div>
        </div>

        {/* Game Start / Read More Buttons */}
        <p className="GainCS">Ready to Fact Check news and gain some</p>
        <h2 className="CSStyle">Credibility Scores?</h2>
        <div className="CompBtns">
          <button className="Rankings" onClick={() => navigate("/rankings")}>Rankings</button>
          <button className="CompStartBtn" onClick={startGame}>Start</button> {/* Pass the Timer */}
          <button className="CompRMBtn" onClick={scrollToGameExp}>Read More</button>
        </div>
      </div>
    </div>

    {/* Game Explanation Section */}
    <div className="CompExp">
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
  </div>
);
};

export default Competition;
