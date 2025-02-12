import "./Accounts.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accounts = ({setIsAuthenticated}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("example@email.com");
  const [birthdate, setBirthdate] = useState("2000-01-01");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("MyInfo");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  const handlePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    console.log("Updated Info:", { username, email, birthdate, password });
    alert("Changes Saved Successfully!");
  };

  const handleEditInfo = () => {
    setIsEditing(true);
  }

  const handleLogOut = () => {
    setIsAuthenticated(false);
    navigate("/signin");
  }

  return (
    <div className="AccountsCon">
      {/* Connect with Firebase: User's Profile Picture Upload */}
      <div className="ProfileCon">
        <label htmlFor="ProfileUpload" className="ProfileLabel">
          <div className="ProfilePicCon">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="UploadedPic" />
            ) : (
              <p className="UploadText">Upload</p>
            )}
          </div>
        </label>
        <input
          type="file"
          id="ProfileUpload"
          accept="image/*"
          onChange={handlePicUpload}
          className="Input"
        />
        <div className="UserInfoBorder">
          <p className="AccWelcome">Welcome</p>
          <h1 className="ProfileUsername">{username}</h1>
          <hr className="ProfileLine" />
          <div className="ProfileBtns">
            <button
              className={`ProfileBtn ${activeSection === "MyInfo" ? "ActiveBtn" : ""}`}
              onClick={() => setActiveSection("MyInfo")}
            >
              My Information
            </button>

            <button
              className={`ProfileBtn ${activeSection === "MyHistory" ? "ActiveBtn" : ""}`}
              onClick={() => setActiveSection("MyHistory")}
            >
              My History
            </button>

            <button
              className={`ProfileBtn ${activeSection === "LogOut" ? "ActiveBtn" : ""}`}
              onClick={() => setActiveSection("LogOut")}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content Display */}
      <div className="DisplayCon">
        {activeSection === "MyInfo" && (
          <div className="MyInfo">
            <div className="Field">
              <label className="UserEditInfo">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="AccInput"
                disabled={!isEditing}
              />
            </div>
            <div className="Field">
              <label className="UserEditInfo">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="AccInput"
                disabled={!isEditing}
              />
            </div>
            <div className="Field">
              <label className="UserEditInfo">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="AccInput"
                placeholder="........"
                disabled={!isEditing}
              />
            </div>
            <div className="Field">
              <label className="UserEditInfo">Birthdate:</label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="AccInput"
                disabled={!isEditing}
              />
            </div>
            {!isEditing ? (
              <button className="EditBtn" onClick={handleEditInfo}>
                Edit
              </button>
            ) : (
              <button className="SaveBtn" onClick={handleSaveChanges}>
                Save
              </button>
            )}
          </div>
        )}

        {activeSection === "MyHistory" && (
          <div className="MyHistory">
            <h2>My History</h2>
            <p>No activity recorded yet.</p>
          </div>
        )}

        {activeSection === "LogOut" && (
          <div className="LogOut">
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <button className="ConLOBtn" onClick={handleLogOut}>Confirm Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
