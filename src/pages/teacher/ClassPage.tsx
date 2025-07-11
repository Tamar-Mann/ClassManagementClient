import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentTable from "../../components/StudentTable/StudentTable";
import ChairTable from "../../components/ChairTable/ChairTable";
import "./css/ClassPage.css";
import { Paths } from "../../routes/paths";

const ClassPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const [showStudents, setShowStudents] = useState(false);
  const [showChairs, setShowChairs] = useState(false);

  if (!classId) return <p>Class not found</p>;

  const numericClassId = parseInt(classId, 10);
  if (isNaN(numericClassId)) return <p>Invalid class ID</p>;

  return (
    <div className="class-page">
      <h1>Class {classId}</h1>

      <div className="button-group">
        <button className="btn" onClick={() => setShowStudents(!showStudents)}>
          👨‍🎓 {showStudents ? "Hide" : "Manage Students"}
        </button>

        <button className="btn" onClick={() => setShowChairs(!showChairs)}>
          💺 {showChairs ? "Hide" : "Manage Chairs"}
        </button>

        {/* ✅ קישור נכון לדף הוספת כיסא עם classId */}
        <Link
          className="btn"
          to={Paths.addChair.replace(":classId", classId)}
        >
          ➕ Add Chair
        </Link>

        <Link
          className="btn"
          to={Paths.seating.replace(":classId", classId)}
        >
          🪑 שיבוץ תלמידים
        </Link>
      </div>

      {showStudents && <StudentTable classId={numericClassId} />}
      {showChairs && <ChairTable classId={numericClassId} />}
    </div>
  );
};

export default ClassPage;
