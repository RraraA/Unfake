import { useState, useMemo } from "react";
import "./Rankings.css";
import { useNavigate } from "react-router-dom";

const Rankings = () => {
  // Dummy data (to be replaced with Firebase)
  const [users, setUsers] = useState([
    { id: 1, name: "Steven Universe", score: 30, time: 97 },
    { id: 2, name: "Bob", score: 30, time: 190 },
    { id: 3, name: "Charlie", score: 30, time: 140 },
    { id: 4, name: "David", score: 25, time: 100 },
    { id: 5, name: "Rocky", score: 25, time: 115 },
    { id: 6, name: "You", score: 26, time: 98 }, // Current user example
  ]);

  const currentUser = users.find((user) => user.id === 6);

  // Sorting logic: Higher score is better, if same score -> lower time is better
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; 
      }
      return a.time - b.time;
    });
  }, [users]);

  const topUsers = sortedUsers.slice(0, 5);

  const isCurrentUserInTop5 = topUsers.some((user) => user.id === currentUser?.id);

  const currentUserRank = sortedUsers.findIndex((user) => user.id === currentUser?.id) + 1;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const navigate = useNavigate();

  return (
    <div className="RankingsCon">
      <div className="RankingsIntro">
        <img src="./Logo3.png" alt="Unfake Logo" className="RankUnfakeLogo" />
        <h1 className="IntroDes">In the Rankings?</h1>
      </div>
      <div className="RankTableBg">
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
            {topUsers.map((user, index) => (
              <tr key={user.id}>
                <td>#{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
                <td>{formatTime(user.time)}</td>
              </tr>
            ))}
            {!isCurrentUserInTop5 && currentUser && (
              <tr key={currentUser.id} className="CurrentUserRow">
                <td>#{currentUserRank}</td>
                <td>{currentUser.name}</td>
                <td>{currentUser.score}</td>
                <td>{formatTime(currentUser.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="RankBackBtn" onClick={() => navigate("/competition")}>Back</button>
    </div>
  );
};

export default Rankings;
