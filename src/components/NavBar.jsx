import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavBar.css"; // NavBar CSS file

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar">
      <Link to="/unfake" className="logo">Unfake</Link>

      <div className="nav-links">
        {!isAuthenticated ? (
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
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
