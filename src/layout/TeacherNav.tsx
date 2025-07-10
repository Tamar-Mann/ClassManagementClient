import React from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";

const TeacherNav = () => {
  const classList = ["A1", "B2"]; // בעתיד תבוא מהשרת

  return (
    <nav className="navbar">
      <h3 className="nav-title">📚 Teacher Menu</h3>
      <ul>
        {classList.map((cls) => (
          <li key={cls}>
            <Link to={`/teacher/class/${cls}`}>Class {cls}</Link>
          </li>
        ))}
        <li><Link to="/teacher/add-class">➕ Add Class</Link></li>
      </ul>
    </nav>
  );
};

export default TeacherNav;
