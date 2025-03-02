import "./Accounts.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";



const Accounts = ({ setIsAuthenticated }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("example@email.com");
  const [birthdate, setBirthdate] = useState("2000-01-01");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("........");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [originalData, setOriginalData] = useState({});
  const [activeSection, setActiveSection] = useState("MyInfo");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);


  // 🔥 Fetch user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        try {
          const userCollection = collection(db, "user");
          const q = query(userCollection, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUsername(userData.username || "User");
            setEmail(userData.email || "example@email.com");
            setBirthdate(userData.birthdate || "2000-01-01");
            setProfilePic(userData.profilePic || null);

            setPassword(userData.password || "");

            // Store original data for comparison
            setOriginalData({
              username: userData.username || "User",
              birthdate: userData.birthdate || "2000-01-01",
            });
          } else {
            console.warn("User data not found in Firestore. Creating a new document...");
            const userRef = doc(collection(db, "user"));
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              username: email.split("@")[0], // Default username
              birthdate: "",
              profilePic: "",
            });

            alert("User profile created in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsAuthenticated(false);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [setIsAuthenticated, navigate]);

  const handlePicUpload = async (event) => {
    const file = event.target.files[0];

    const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
    if (!allowedFormats.includes(file.type)) {
        alert("Invalid file format! Please upload a JPG, PNG, GIF, or WEBP image.");
        return;
    }

    if (file) {
        try {
            // Get the current user's UID
            const user = auth.currentUser;
            if (user) {
                // Check if there's an existing profile picture to delete
                const existingPicRef = ref(storage, `profilePics/${user.uid}`);

                // Try to delete the old profile picture
                await deleteObject(existingPicRef).catch((error) => {
                    if (error.code !== "storage/object-not-found") {
                        console.error("Error deleting old profile picture:", error);
                        alert("Failed to delete old profile picture.");
                    }
                });

                // Upload new profile picture
                const storageRef = ref(storage, `profilePics/${user.uid}`);
                await uploadBytes(storageRef, file);

                // Get the download URL for the newly uploaded image
                const imageUrl = await getDownloadURL(storageRef);

                // Update the user's profile picture URL in Firestore
                const userRef = doc(db, "user", user.uid);
                await updateDoc(userRef, { profilePic: imageUrl });

                // Set the new profile picture URL in state to display it
                setProfilePic(imageUrl);
                alert("Profile picture uploaded successfully!");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Failed to upload profile picture.");
        }
    }
  };

  
  const handleSaveChanges = async () => {
    setIsEditing(false);
    const user = auth.currentUser;

    if (!user) {
        alert("No authenticated user found.");
        return;
    }

    // Check if there are actual changes
    if (
        username === originalData.username &&
        birthdate === originalData.birthdate &&
        (!newPassword || newPassword !== confirmNewPassword)
    ) {
        alert("No changes detected.");
        return;
    }

    try {
        const userRef = doc(db, "user", user.uid);
        const leaderboardRef = doc(db, "leaderboard", user.uid);
        let updates = {};

        if (username !== originalData.username) updates.username = username;
        if (birthdate !== originalData.birthdate) updates.birthdate = birthdate;

        // ✅ Update user profile info in Firestore
        if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
            if (updates.username) {
                await updateDoc(leaderboardRef, { username: updates.username });
            }
        }

        // ✅ **Update password only if user provides a new one**
        if (newPassword) {
            if (newPassword === password) {
                alert("New password cannot be the same as the old password.");
                return;
            }

            if (newPassword !== confirmNewPassword) {
                alert("New password and confirm password do not match.");
                return;
            }

            try {
                // 🔥 **Ensure old password is entered**
                if (!password || password === "........") {
                    alert("Please enter your current password before changing it.");
                    return;
                }

                // **Re-authenticate user before updating password**
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);

                // **Update password in Firebase Authentication**
                await updatePassword(user, newPassword);

                // **Update Firestore with a timestamp**
                await updateDoc(userRef, { passwordUpdatedAt: new Date() });

                alert("Password updated successfully! You will need to use your new password next time.");
                setNewPassword("");
                setConfirmNewPassword("");
                setPassword(""); // Clear old password field

            } catch (error) {
                console.error("Error updating password:", error);

                if (error.code === "auth/wrong-password") {
                    alert("Incorrect current password. Please try again.");
                } else if (error.code === "auth/too-many-requests") {
                    alert("Too many failed attempts. Please try again later.");
                } else {
                    alert("Failed to update password. Please log in again and try.");
                }
            }
        }

        alert("Changes Saved Successfully!");
        setOriginalData({ username, birthdate });
    } catch (error) {
        console.error("Error updating user info:", error);
        alert("Failed to save changes.");
    }
  };

  const handleEditInfo = () => {
    setIsEditing(true);
  };

  const handleLogOut = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <div className="AccountsCon">
      <div className="VideoCon2">
        <video autoPlay loop muted playsInline className="SSVideoBG2">
        <source src="/SSVid.mp4" type="video/mp4"/></video>
      </div>
      {/* Profile Section */}
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
        <input type="file" id="ProfileUpload" accept="image/*" onChange={handlePicUpload} className="InputFile" />

        <div className="UserInfoBorder">
          <p className="AccWelcome">Welcome</p>
          <h1 className="ProfileUsername">{username}</h1>
          <hr className="ProfileLine" />
          <div className="ProfileBtns">
            <button className={`ProfileBtn ${activeSection === "MyInfo" ? "ActiveBtn" : ""}`} onClick={() => setActiveSection("MyInfo")}>
              My Information
            </button>
            <button className={`ProfileBtn ${activeSection === "MyHistory" ? "ActiveBtn" : ""}`} onClick={() => setActiveSection("MyHistory")}>
              My History
            </button>
            <button className={`ProfileBtn ${activeSection === "LogOut" ? "ActiveBtn" : ""}`} onClick={() => setActiveSection("LogOut")}>
              Log Out
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
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="AccInput" disabled={!isEditing} />
            </div>
            <div className="Field">
              <label className="UserEditInfo">Email Address:</label>
              <input type="email" value={email} className="AccInput" disabled />
            </div>       

            {/* Password Fields Only Show When Editing */}
            {isEditing && (<>
                {/* Old Password Input */}
                <div className="Field">
                  <label className="UserEditInfo">Old Password:</label>
                  <div className="PasswordCon">
                    <input 
                      type={showOldPassword ? "text" : "password"} 
                      placeholder="Old Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      onFocus={() => setIsChangingPassword(true)} 
                      className="AccInput" 
                    />
                    <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="ShowAccPassBtn">
                      {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>

                {/* New Password Input */}
                <div className="Field">
                  <label className="UserEditInfo">New Password:</label>
                  <div className="PasswordCon">
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      placeholder="New Password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      onFocus={() => setIsChangingPassword(true)} 
                      className="AccInput" 
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="ShowAccPassBtn">
                      {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password Input */}
                {isChangingPassword && (
                  <div className="Field">
                    <label className="UserEditInfo">Confirm New Password:</label>
                    <div className="PasswordCon">
                      <input
                        type={showConPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="AccInput"
                      />
                      <button type="button" onClick={() => setShowConPassword(!showConPassword)} className="ShowAccPassBtn">
                        {showConPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="Field">
              <label className="UserEditInfo">Birthdate:</label>
              <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="AccInput" disabled={!isEditing} />
            </div>

            {!isEditing ? (
              <button className="EditBtn" onClick={handleEditInfo}>Edit</button>
            ) : (
              <button className="SaveBtn" onClick={handleSaveChanges}>Save</button>
            )}
          </div>
        )}

        {activeSection === "MyHistory" && 
        <div className="MyHistory">
          <h2>My History</h2>
          <p>No activity recorded yet.</p>
        </div>}

        {activeSection === "LogOut" && 
        <div className="LogOut">
          <h2>Log Out</h2>
          <button className="ConLOBtn" onClick={handleLogOut}>Confirm Log Out</button>
        </div>}
      </div>
    </div>
  );
};

export default Accounts;
