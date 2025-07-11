import React, { useEffect, useState } from "react";
import { studentService } from "../../services/student.service";
import { StudentType } from "../../types/student.types";
import StudentRow from "./StudentRow";
import "../css/StudentTable.css";

type Props = { classId: number };

const StudentTable: React.FC<Props> = ({ classId }) => {
  const [students, setStudents] = useState<StudentType[]>([]);

  useEffect(() => {
    studentService.getAllStudentsOfClass(classId)
      .then(setStudents)
      .catch(console.error);
  }, [classId]);

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Chair</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {students.map((s) => <StudentRow key={s.id} student={s} />)}
      </tbody>
    </table>
  );
};

export default StudentTable;
