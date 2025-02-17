// import { useState, useEffect, useMemo } from "react";
// import "./Rankings.css";
// import { useNavigate } from "react-router-dom";
// import { getLeaderboard } from "../database";

// const Rankings = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const leaderboardData = await getLeaderboard();
//         setUsers(leaderboardData);
//       } catch (error) {
//         console.error("❌ Error fetching leaderboard:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   // Sorting logic: Higher score is better, if same score -> lower time is better
//   const sortedUsers = useMemo(() => {
//     return [...users].sort((a, b) => {
//       if (b.score !== a.score) {
//         return b.score - a.score; 
//       }
//       return a.time - b.time;
//     });
//   }, [users]);

//   const topUsers = sortedUsers.slice(0, 5);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}m ${remainingSeconds}s`;
//   };

//   return (
//     <div className="RankingsCon">
//       <div className="RankingsIntro">
//         <img src="./Logo3.png" alt="Unfake Logo" className="RankUnfakeLogo" />
//         <h1 className="IntroDes">In the Rankings?</h1>
//       </div>
//       <div className="RankTableBg">
//         {loading ? (
//           <p className="LoadingText">Loading leaderboard...</p>
//         ) : (
//           <table className="RankingsTable">
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Name</th>
//                 <th>Score</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topUsers.map((user, index) => (
//                 <tr key={user.id}>
//                   <td>#{index + 1}</td>
//                   <td>{user.username}</td>
//                   <td>{user.score}</td>
//                   <td>{formatTime(user.time)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <button className="RankBackBtn" onClick={() => navigate("/competition")}>Back</button>
//     </div>
//   );
// };

// export default Rankings;

import { useState, useEffect } from "react";
import "./Rankings.css";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../database";
import { auth } from "../firebaseConfig";

const Rankings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard();

        // ✅ Sort users: prioritize ranked users first
        const sortedUsers = leaderboardData
          .filter((user) => user.rank > 0) // Remove rank 0 users from display
          .sort((a, b) => a.rank - b.rank);

        setUsers(sortedUsers);

        // ✅ Find the logged-in user
        const authUser = auth.currentUser;
        if (authUser) {
          const foundUser = leaderboardData.find((user) => user.uid === authUser.uid);
          setCurrentUser(foundUser || null);
        }
      } catch (error) {
        console.error("❌ Error fetching leaderboard:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // ✅ Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // ✅ Limit to top 5 users
  const topUsers = users.slice(0, 5);

  // ✅ Check if current user is in the top 5
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
              {/* 🏆 Show Top 5 Players */}
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

              {/* 👤 Show current user’s rank if they’re not in the top 5 */}
              {!isCurrentUserInTop5 && currentUser && currentUser.rank > 0 && (
                <tr key={currentUser.id} className="CurrentUserRow">
                  <td>#{currentUser.rank}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.score}</td>
                  <td>{formatTime(currentUser.time)}</td>
                </tr>
              )}

              {/* 🆕 Show logged-in user (rank 0) ONLY if they are the logged-in user */}
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
