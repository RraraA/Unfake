import { useState, useEffect } from "react";
import "./Rankings.css";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../database";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const Rankings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard();
  
        // Sort users by score (descending) and time (ascending)
        const sortedUsers = leaderboardData.sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          return a.time - b.time; // Lower time is better
        });
  
        // Assign ranks while handling ties
        let previousRank = 0;
        let previousScore = null;
        let previousTime = null;
  
        sortedUsers.forEach((user, index) => {
          if (user.score === previousScore && user.time === previousTime) {
            user.rank = previousRank; // Same rank for tied users
          } else {
            user.rank = index + 1; // Rank starts at 1
            previousRank = user.rank;
            previousScore = user.score;
            previousTime = user.time;
          }
        });
  
        setUsers(sortedUsers);
  
        // Find the logged-in user
        const authUser = auth.currentUser;
        if (authUser) {
          const foundUser = sortedUsers.find((user) => user.email === authUser.email);
          setCurrentUser(foundUser || null);
        }
  
        await updateRanks(sortedUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaderboard();
  }, []);

  const updateRanks = async (sortedUsers) => {
    try {
      for (let i = 0; i < sortedUsers.length; i++) {
        const user = sortedUsers[i];
        const userRef = doc(db, "leaderboard", user.id);

        // Assign rank based on position in sorted list (rank starts from 1)
        const rank = i + 1; // Rank starts at 1

        // Update the rank in Firestore
        await updateDoc(userRef, { rank: rank });

        console.log(`Updated rank for ${user.username}: ${rank}`);
      }
    } catch (error) {
      console.error("Error updating ranks:", error);
    }
  };

  //Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  //Limit to top 5 users
  const topUsers = users.slice(0, 5);

  //Check if current user is in the top 5
  const isCurrentUserInTop5 = topUsers.some((user) => currentUser && user.uid === currentUser.uid);

  return (
    <div className="RankingsCon">
      <div className="RankingsIntro">
        <img src="./Logo3.png" alt="Unfake Logo" className="RankUnfakeLogo" />
        <h1 className="IntroDes">In the Rankings?</h1>
      </div>

      <div className="RankTableBg">
        {loading ? (
          <p className="LoadingText">Loading leaderboard...</p>
        ) : (
          <table className="RankingsTable">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/*Show Top 5 Players */}
              {topUsers.map((user) => (
                <tr
                  key={user.id}
                  className={
                    currentUser && currentUser.uid === user.uid
                      ? "CurrentUserRow"
                      : ""
                  }
                >
                  <td>#{user.rank}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                  <td>{formatTime(user.time)}</td>
                </tr>
              ))}

              {/*Show current user’s rank if they’re not in the top 5 */}
              {!isCurrentUserInTop5 && currentUser && currentUser.rank > 0 && (
                <tr key={currentUser.id} className="CurrentUserRow">
                  <td>#{currentUser.rank}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.score}</td>
                  <td>{formatTime(currentUser.time)}</td>
                </tr>
              )}

              {/*Show logged-in user (rank 0) ONLY if they are the logged-in user */}
              {currentUser && (!currentUser.rank || currentUser.rank === 0) && (
                <tr key={currentUser.id} className="CurrentUserRow">
                  <td>-</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.score}</td>
                  <td>{formatTime(currentUser.time)}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <button className="RankBackBtn" onClick={() => navigate("/competition")}>
        Back
      </button>
    </div>
  );
};

export default Rankings;
