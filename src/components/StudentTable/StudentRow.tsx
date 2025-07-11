import React from "react";
import { StudentType } from "../../types/student.types";
import { Link } from "react-router-dom";

const StudentRow: React.FC<{ student: StudentType }> = ({ student }) => {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const hasImage = student.arrImage || student.fileImage;

  return (
    <tr>
      <td>
        {hasImage ? (
          <img src={student.arrImage} alt="student" className="student-img" />
        ) : (
          <div className="student-initial" style={{ backgroundColor: "#5271ff", color: "white" }}>
            {getInitial(student.name)}
          </div>
        )}
      </td>
      <td>{student.name}</td>
      <td>{student.chairId ?? "—"}</td>
      {/* <td>
        <Link to={`/student/${student.id}`} className="manage-btn">Manage Student</Link>
      </td> */}
    </tr>
  );
};

export default StudentRow;
