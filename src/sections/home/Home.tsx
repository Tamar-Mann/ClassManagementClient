// File: src/sections/home/Home.tsx
import React from "react";
import "./Home.css";
import logo from "../../assets/logoClass.png";
import { Link } from "react-router-dom";
import { Paths } from "../../routes/paths";
//מחקתי את Main?!
const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-left">HighClass</div>
        <div className="nav-right">
          <Link to={`/${Paths.signInStudent}`}>Login</Link>
          <Link to={`/${Paths.signUpTeacher}`}>Sign Up - Teacher</Link>
          <Link to={`/${Paths.signUpStudent}`}>Sign Up - Student</Link>
        </div>
      </nav>
      <div className="home-content">
        <img src={logo} alt="HighClass Logo" className="home-logo" />
        <h1 className="welcome-title">Welcome to HighClass</h1>
      </div>
    </div>
  );
};

export default Home;
