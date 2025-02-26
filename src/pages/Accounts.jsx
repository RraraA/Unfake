
import "./Accounts.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


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
  const [showPassword, setShowPassword] = useState(false);
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

  // 🔥 Handle Profile Picture Upload
  // const handlePicUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfilePic(imageUrl);
  //   }
  // };

  // const handlePicUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     try {
  //       // Create a reference to the location in Firebase Storage
  //       const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
  
  //       // Upload the image to Firebase Storage
  //       await uploadBytes(storageRef, file);
  
  //       // Get the download URL for the uploaded image
  //       const imageUrl = await getDownloadURL(storageRef);
  
  //       // Update the user's profile picture URL in Firestore
  //       const user = auth.currentUser;
  //       if (user) {
  //         const userRef = doc(db, "user", user.uid);
  //         await updateDoc(userRef, {
  //           profilePic: imageUrl, // Save the image URL to Firestore
  //         });
  
  //         // Set the image URL in state to display it
  //         setProfilePic(imageUrl);
  //         alert("Profile picture uploaded successfully!");
  //       }
  //     } catch (error) {
  //       console.error("Error uploading profile picture:", error);
  //       alert("Failed to upload profile picture.");
  //     }
  //   }
  // };

  const handlePicUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Get the current user's UID
        const user = auth.currentUser;
        if (user) {
          // Check if there's an existing profile picture to delete
          const existingPicRef = ref(storage, `profilePics/${user.uid}`);
  
          // Try to delete the old profile picture
          await deleteObject(existingPicRef).catch((error) => {
            // Handle error if no previous picture exists (it's okay if no file exists)
            if (error.code !== 'storage/object-not-found') {
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
          await updateDoc(userRef, {
            profilePic: imageUrl, // Save the image URL to Firestore
          });
  
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
  
    // ✅ Check if there are actual changes
    if (
      username === originalData.username &&
      birthdate === originalData.birthdate &&
      (!newPassword || newPassword !== confirmNewPassword)
    ) {
      alert("No changes detected.");
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (user) {
        // ✅ Directly reference the documents by UID
        const userRef = doc(db, "user", user.uid);
        const leaderboardRef = doc(db, "leaderboard", user.uid);
  
        // 🔥 Prepare update data
        let updates = {};
        if (username !== originalData.username) updates.username = username;
        if (birthdate !== originalData.birthdate) updates.birthdate = birthdate;
  
        // ✅ Update the Firestore user collection
        if (Object.keys(updates).length > 0) {
          await updateDoc(userRef, updates);
          console.log("✅ User profile updated in Firestore!");
        }
  
        // ✅ If username was updated, update the leaderboard as well
        if (updates.username) {
          await updateDoc(leaderboardRef, { username: updates.username });
          console.log("✅ Username updated in leaderboard!");
        }
  
        // 🔥 Update password only if changed
        if (newPassword && newPassword === confirmNewPassword) {
          await updatePassword(user, newPassword);
          alert("Password updated successfully!");
          setNewPassword("");
          setConfirmNewPassword("");
        }
  
        alert("Changes Saved Successfully!");
        setOriginalData({ username, birthdate });
      }
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
            {isEditing && (
              <>
                <div className="Field">
                  <label className="UserEditInfo">Password:</label>
                  <div className="PasswordCon">
                    <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    onFocus={() => setIsChangingPassword(true)} 
                    className="AccInput" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="ShowAccPassBtn">
                        {showPassword ? <FaEye  /> : <FaEyeSlash  />}
                    </button>
                  </div>
                </div>
                {isChangingPassword && (
                  <div className="Field">
                    <label className="UserEditInfo">Confirm Password:</label>
                    <div className="PasswordCon">
                      <input
                      type={showConPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="AccInput"
                      />
                      <button type="button" onClick={() => setShowConPassword(!showConPassword)} className="ShowAccPassBtn">
                          {showConPassword ? <FaEye  /> : <FaEyeSlash  />}
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




