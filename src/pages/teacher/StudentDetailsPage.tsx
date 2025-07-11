import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { studentService } from "../../services/student.service";
import { StudentType } from "../../types/student.types";

const StudentDetailsPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState<StudentType | null>(null);

  useEffect(() => {
    if (!studentId) return;
    studentService.getById(studentId)
      .then(setStudent)
      .catch(console.error);
  }, [studentId]);

  if (!student) return <p>Loading student...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{student.name}</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Chair:</strong> {student.chairId ?? "Not assigned"}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      {/* אפשרויות עריכה/מחיקה בהמשך */}
    </div>
  );
};

export default StudentDetailsPage;
