import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../routes/paths";
import "./css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to HighClass</h1>
      <p>Please choose an action:</p>
      <div className="home-links">
        <Link to={`/${Paths.signInTeacher}`}>🔑 Login - Teacher</Link>
        <Link to={`/${Paths.signInStudent}`}>🔑 Login - Student</Link>
        <Link to={`/${Paths.signUpTeacher}`}>📝 Sign Up - Teacher</Link>
        <Link to={`/${Paths.signUpStudent}`}>📝 Sign Up - Student</Link>
      </div>
    </div>
  );
};

export default Home;

