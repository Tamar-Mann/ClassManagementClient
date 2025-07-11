import React from "react";
import { StudentType } from "../../types/student.types";

const StudentRow: React.FC<{ student: StudentType }> = ({ student }) => {
  const getInitial = (name: string) =>
    name?.trim().charAt(0).toUpperCase() || "?";

  const imageSrc = student.arrImage
    ? `data:image/jpeg;base64,${student.arrImage}`
    : null;

  return (
    <tr>
      <td>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={student.name}
            className="student-img"
          />
        ) : (
          <div className="student-initial">
            {getInitial(student.name)}
          </div>
        )}
      </td>
      <td>{student.name}</td>
      <td>{student.chairId ?? "—"}</td>
    </tr>
  );
};

export default StudentRow;
