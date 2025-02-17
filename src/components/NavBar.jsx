// // import { Link } from "react-router-dom";
// // import PropTypes from "prop-types";
// // import "./NavBar.css"; // NavBar CSS file

// // const Navbar = ({ isAuthenticated }) => {
// //   return (
// //     <nav className="navbar">
// //       <Link to="/unfake" className="logo">Unfake</Link>

// //       <div className="nav-links">
// //         {!isAuthenticated ? (
// //           <>
// //             <Link to="/proximax">ProximaX</Link>
// //             <Link to="/signin">Sign In</Link>
// //             <Link to="/signup">Sign Up</Link>
// //           </>
// //         ) : (
// //           <>
// //             <Link to="/accounts">Accounts</Link>
// //             <Link to="/competition">Competition</Link>
// //             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
// //             <Link to="/proximax">ProximaX</Link>
// //             <Link to="/downloads">Downloads</Link>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // Navbar.propTypes = {
// //   isAuthenticated: PropTypes.bool.isRequired,
// // };

// // export default Navbar;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { auth, db } from "../firebaseConfig"; // Import Firebase and Firestore
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import "./NavBar.css"; // NavBar CSS file

// const Navbar = ({ setIsAuthenticated, setUserData }) => {
//   const [authState, setAuthState] = useState(false);
//   const [loading, setLoading] = useState(true); // Prevents UI flickering

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setAuthState(true);
//         setIsAuthenticated(true);
//         localStorage.setItem("isAuthenticated", "true");

//         // Fetch user data from Firestore
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             setUserData(userSnap.data());
//           } else {
//             console.warn("User data not found in Firestore");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setAuthState(false);
//         setIsAuthenticated(false);
//         setUserData(null);
//         localStorage.removeItem("isAuthenticated");
//       }
//       setLoading(false); // Stop loading after checking auth state
//     });

//     return () => unsubscribe();
//   }, [setIsAuthenticated, setUserData]);

//   const handleSignOut = async () => {
//     await signOut(auth);
//     setAuthState(false);
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   if (loading) {
//     return <div className="navbar">Loading...</div>; // Prevents incorrect rendering
//   }

//   return (
//     <nav className="navbar">
//       <Link to="/unfake" className="logo">Unfake</Link>

//       <div className="nav-links">
//         {!authState ? (
//           <>
//             <Link to="/proximax">ProximaX</Link>
//             <Link to="/signin">Sign In</Link>
//             <Link to="/signup">Sign Up</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/accounts">Accounts</Link>
//             <Link to="/competition">Competition</Link>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
//             <Link to="/proximax">ProximaX</Link>
//             <Link to="/downloads">Downloads</Link>
//             <button onClick={handleSignOut} className="nav-logout-btn">Log Out</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { auth, db } from "../firebaseConfig"; // Import Firebase and Firestore
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./NavBar.css"; // NavBar CSS file
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated, setUserData }) => {
  const [authState, setAuthState] = useState(isAuthenticated);
  const [loading, setLoading] = useState(true); // Prevents UI flickering
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthState(true);
        setIsAuthenticated(true);

        // Fetch user data from Firestore
        try {
          const userRef = doc(db, "user", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.warn("User data not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setAuthState(false);
        setIsAuthenticated(false);
        setUserData(null);
      }
      setLoading(false); // Stop loading after checking auth state
    });

    return () => unsubscribe();
  }, [setIsAuthenticated, setUserData]);

  const handleSignOut = async () => {
    await signOut(auth);
    setAuthState(false);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate ("/unfake");
  };

  if (loading) {
    return <div className="navbar">Loading...</div>; // Prevents incorrect rendering
  }

  return (
    <nav className="navbar">
      <Link to="/unfake" className="logo">Unfake</Link>

      <div className="nav-links">
        {!authState ? (
          <>
            <Link to="/proximax">ProximaX</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/accounts">Accounts</Link>
            <Link to="/competition">Competition</Link>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a>
            <Link to="/proximax">ProximaX</Link>
            <Link to="/downloads">Downloads</Link>
            <button onClick={handleSignOut} className="nav-logout-btn">Log Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default Navbar;
