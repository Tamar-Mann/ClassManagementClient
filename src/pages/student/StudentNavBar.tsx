import React from "react";
import "./css/StudentNavBar.css";

type TabType = "class" | "students" | "chairs";

interface StudentNavBarProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StudentNavBar: React.FC<StudentNavBarProps> = ({ tab, setTab, onEdit, onDelete }) => (
  <nav className="student-navbar">
    <ul>
      <li>
        <button className={`btn ${tab === "class" ? "active" : ""}`} onClick={() => setTab("class")}>
          🏠 My Class
        </button>
      </li>
      <li>
        <button className={`btn ${tab === "students" ? "active" : ""}`} onClick={() => setTab("students")}>
          👥 Classmates
        </button>
      </li>
      <li>
        <button className={`btn ${tab === "chairs" ? "active" : ""}`} onClick={() => setTab("chairs")}>
          💺 Chairs
        </button>
      </li>
      <li>
        <button className="btn" onClick={onEdit}>
          ✏️ עדכן פרטים
        </button>
      </li>
      <li>
        <button className="btn delete-btn" onClick={onDelete}>
          🗑️ מחק משתמש
        </button>
      </li>
    </ul>
  </nav>
);

export default StudentNavBar;