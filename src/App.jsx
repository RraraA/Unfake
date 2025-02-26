import { useState, useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import UnfakeExplanation from "./pages/Unfake";
import ProximaX from "./pages/ProximaX";
import Rankings from "./pages/Rankings";
import Accounts from "./pages/Accounts";
import Competition from "./pages/Competition";
import CompGame from "./pages/CompGame";
import Downloads from "./pages/Downloads";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
       <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} />
      <Routes>
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/unfake" element={<UnfakeExplanation />} />
        <Route path="/proximax" element={<ProximaX />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/accounts" element={<Accounts setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/compgame" element={<CompGame />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/accounts" element={<Accounts userData={userData} />} />
      </Routes>
    </div>
  );
}

export default App;
