import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StudentTable from "../../components/StudentTable/StudentTable";
import ChairTable from "../../components/ChairTable/ChairTable";
import "./css/ClassPage.css";
import { Paths } from "../../routes/paths";

const ClassPage = () => {
  const { classId } = useParams();
  const [showStudents, setShowStudents] = useState(false);
  const [showChairs, setShowChairs] = useState(false);

  if (!classId) return <p>Class not found</p>;

  return (
    <div className="class-page">
      <h1>Class {classId}</h1>
      <div className="button-group">
        <button onClick={() => setShowStudents(!showStudents)}>
          👨‍🎓 {showStudents ? "Hide" : "Manage Students"}
        </button>
        <button onClick={() => setShowChairs(!showChairs)}>
          💺 {showChairs ? "Hide" : "Manage Chairs"}
        </button>
        <a className="add-chair-btn" href={Paths.addChair}>
          ➕ Add Chair
        </a>
      </div>

      {showStudents && <StudentTable classId={parseInt(classId)} />}
      {showChairs && <ChairTable classId={parseInt(classId)} />}
    </div>
  );
};

export default ClassPage;
