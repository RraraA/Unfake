import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqZWRApBF5Kzna4EbHJQGJveUE9nEjjRo",
    authDomain: "unfake-d8d9c.firebaseapp.com",
    databaseURL: "https://unfake-d8d9c-default-rtdb.firebaseio.com",
    projectId: "unfake-d8d9c",
    storageBucket: "unfake-d8d9c.appspot.com",
    messagingSenderId: "332199381098",
    appId: "1:332199381098:web:5af91e85108de696602213",
    measurementId: "G-G0QHNLNMZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Twitter Auth Provider
const provider = new TwitterAuthProvider();

// Function to sign in with X (Twitter)
export const signInWithX = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user; // Returns user object after successful login
    } catch (error) {
        console.error("X Login Error:", error);
        throw error;
    }
};

export const signUpWithX = async () =>  {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user already exists in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email || "N/A", // Twitter sometimes doesn't provide email
            profileImage: user.photoURL,
            twitterHandle: user.reloadUserInfo.screenName
        }, { merge: true });

        return user; // Return user data
    } catch (error) {
        console.error("X Sign-Up Error:", error);
        throw error;
    }
};

// Export auth and db for use in other files
export { auth, db };
