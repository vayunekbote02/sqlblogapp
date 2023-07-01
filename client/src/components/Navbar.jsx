import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link to="?cat=art" className="link">
            ART
          </Link>
          <Link to="?cat=science" className="link">
            SCIENCE
          </Link>
          <Link to="?cat=technology" className="link">
            TECHNOLOGY
          </Link>
          <Link to="?cat=cinema" className="link">
            CINEMA
          </Link>
          <Link to="?cat=design" className="link">
            DESIGN
          </Link>
          <Link to="?cat=food" className="link">
            FOOD
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <span className="write">
            <Link to="/write" className="link">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
