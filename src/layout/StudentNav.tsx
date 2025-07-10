import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";

const StudentNav = () => {
  return (
    <nav className="navbar">
      <h3 className="nav-title">🎓 Student Menu</h3>
      <ul>
        <li><Link to="/student/profile">My Profile</Link></li>
        <li><Link to="/student/class">Class Info</Link></li>
        <li><Link to="/student/friends">Favorite Friends</Link></li>
      </ul>
    </nav>
  );
};

export default StudentNav;
