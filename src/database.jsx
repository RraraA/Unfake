import { auth, db } from "./firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "firebase/firestore";

/**
 * Sign up a new user and add them to Firestore & Leaderboard.
 */
export const signUpUser = async (email, password) => {
  try {
    console.log(`Checking if email exists in Firestore: ${email}`);
    
    const userCollection = collection(db, "user");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.warn("Email already exists in Firestore!");
      throw new Error("Email already exists! Please use a different email.");
    }

    //Create user in Firebase Authentication
    console.log("Creating user in Firebase Authentication...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore (Ensuring No Overwrite)
    const userRef = doc(db, "user", user.uid);
    await setDoc(userRef, {
      email: user.email,
      uid: user.uid,
      username: "New User",
      birthdate: "",
      profilePic: ""
    });

    console.log("User successfully signed up and added to Firestore!");

    // Check if user exists in leaderboard
    const leaderboardRef = doc(db, "leaderboard", user.uid);
    const leaderboardSnap = await getDoc(leaderboardRef);

    if (!leaderboardSnap.exists()) {
      //  Add user to Leaderboard collection with default values
      await setDoc(leaderboardRef, {
        uid: user.uid,
        email: user.email,
        username: "New User",
        score: 0,  // Default score
        time: 0,   // Default time (in seconds)
        rank: 0    // Default rank (to be calculated later)
      });

      console.log("User added to leaderboard!");
    } else {
      console.log(" User already exists in leaderboard.");
    }

    return user;
  } catch (error) {
    console.error("Error in signUpUser:", error.message);
    throw new Error(error.message);
  }
};

export const getLeaderboard = async () => {
  try {
    console.log(" Fetching leaderboard data...");
    const leaderboardRef = collection(db, "leaderboard");
    const querySnapshot = await getDocs(leaderboardRef);

    const leaderboardData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(" Leaderboard data fetched successfully!", leaderboardData);
    return leaderboardData;
  } catch (error) {
    console.error(" Error fetching leaderboard data:", error.message);
    throw new Error(error.message);
  }
};

export const updateLeaderboardRank = async (uid, newRank) => {
  try {
    const leaderboardRef = doc(db, "leaderboard", uid);
    const leaderboardSnap = await getDoc(leaderboardRef);

    if (leaderboardSnap.exists()) {
      const leaderboardData = leaderboardSnap.data();

      // Only update rank if it changed
      if (leaderboardData.rank !== newRank) {
        console.log(`Updating rank for UID: ${uid} to Rank: ${newRank}`);
        await updateDoc(leaderboardRef, { rank: newRank });
        console.log("Rank updated successfully in Firestore!");
      } else {
        console.log(` No change in rank for UID: ${uid}, skipping update.`);
      }
    } else {
      console.warn(` User ${uid} not found in leaderboard!`);
    }
  } catch (error) {
    console.error("Error updating leaderboard rank:", error.message);
    throw new Error(error.message);
  }
};

export const updateUserProfile = async (uid, updatedData) => {
  try {
    console.log(` Checking if user document exists for UID: ${uid}`);

    // Reference to user document
    const userRef = doc(db, "user", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn("User document not found in Firestore!");
      throw new Error("User document does not exist in Firestore.");
    }

    console.log("User document exists, updating...");

    // Update Firestore user collection
    await updateDoc(userRef, updatedData);
    console.log("User profile updated in Firestore!");

    // If username was updated, update leaderboard as well
    if (updatedData.username) {
      const leaderboardRef = doc(db, "leaderboard", uid);
      const leaderboardSnap = await getDoc(leaderboardRef);

      if (leaderboardSnap.exists()) {
        await updateDoc(leaderboardRef, { username: updatedData.username });
        console.log("Username updated in leaderboard!");
      } else {
        console.warn("User not found in leaderboard, skipping leaderboard update.");
      }
    }
  } catch (error) {
    console.error(" Error updating user profile:", error.message);
    throw new Error(error.message);
  }
};


/**
 * Sign in user with Firebase Authentication.
 */
export const signInUser = async (email, password) => {
  try {
    console.log(`Signing in user: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in signInUser:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Sign out the current user.
 */
export const signOutUser = async () => {
  try {
    console.log("Signing out user...");
    await signOut(auth);
    localStorage.removeItem("isAuthenticated");
    console.log("User signed out successfully!");
  } catch (error) {
    console.error("Error in signOutUser:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Get user data from Firestore.
 */
export const getUserData = async (uid) => {
  try {
    console.log(`Fetching user data for UID: ${uid}`);
    const userRef = doc(db, "user", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("User data found:", userSnap.data());
      return userSnap.data();
    } else {
      console.warn("User data not found in Firestore!");
      throw new Error("User data not found!");
    }
  } catch (error) {
    console.error("Error in getUserData:", error.message);
    throw new Error(error.message);
  }
};

export const listenForAuthChanges = (setIsAuthenticated, setUser) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User logged in:", user.email);
      localStorage.setItem("isAuthenticated", "true");

      try {
        const userData = await getUserData(user.uid);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.warn("Could not fetch Firestore data for user.");
        setIsAuthenticated(false);
      }
    } else {
      console.log("No user signed in.");
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
    }
  });
};


