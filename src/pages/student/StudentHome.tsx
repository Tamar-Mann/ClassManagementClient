import React, { useEffect, useState } from "react";
import "./css/StudentHome.css";
import { useAppSelector } from "../../redux/hooks";
import { studentService } from "../../services/student.service";
import { classService } from "../../services/class.service";
import { chairService } from "../../services/chair.service";
import { StudentType } from "../../types/student.types";
import { ClassType } from "../../types/class.types";
import { ChairType } from "../../types/chair.types";
import StudentNavBar from "./StudentNavBar";

const StudentHome = () => {
  const user = useAppSelector((state) => state.auth.user);
  const studentId = user?.id;

  const [student, setStudent] = useState<StudentType | null>(null);
  const [studentClass, setStudentClass] = useState<ClassType | null>(null);
  const [classStudents, setClassStudents] = useState<StudentType[]>([]);
  const [chairs, setChairs] = useState<ChairType[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"class" | "students" | "chairs">("class");

  useEffect(() => {
    if (!studentId) return;
    const fetchAll = async () => {
      try {
        const studentData = await studentService.getById(studentId);
        setStudent(studentData);

        const classData = await classService.getById(studentData.classId);
        setStudentClass(classData);

        const students = await studentService.getAllStudentsOfClass(studentData.classId);
        setClassStudents(students);

        const chairsData = await chairService.getChairsByClass(studentData.classId);
        setChairs(chairsData);
      } catch (error) {
        setStudent(null);
        setStudentClass(null);
        setClassStudents([]);
        setChairs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [studentId]);

  console.log("user:", user);
  console.log("studentId:", studentId);
  console.log("student:", student);
  console.log("studentClass:", studentClass);
  console.log("classStudents:", classStudents);
  console.log("chairs:", chairs);

  return (
    <div className="student-home">
<StudentNavBar
  tab={tab}
  setTab={setTab}
  onEdit={async () => {
    const newName = prompt("הכנס שם חדש:", student?.name);
    if (newName && newName !== student?.name && student) {
      await studentService.update(student.id, { name: newName });
      alert("השם עודכן!");
      window.location.reload();
    }
  }}
  onDelete={async () => {
    if (student && window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
      await studentService.delete(student.id);
      alert("המשתמש נמחק");
      window.location.href = "/";
    }
  }}
/>      <h2>🎓 Welcome, Student!</h2>
      {loading && <p>Loading...</p>}
      {!loading && student && studentClass && (
        <>
          {tab === "students" && (
            <section>
              <h3>All Students in Your Class</h3>
              <ul>
                {classStudents.map(s => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}
          {tab === "class" && (
        <section>
        <h3>Your Class</h3>
        <p><b>Name:</b> {studentClass.name}</p>
        {/* אפשר להוסיף כאן עוד מידע על הכיתה */}
        </section>
      )}
          {tab === "chairs" && (
            <section>
              <h3>Chairs in Your Class</h3>
              <table>
                <thead>
                  <tr>
                    <th>Chair #</th>
                    <th>Student ID</th>
                  </tr>
                </thead>
                <tbody>
                  {chairs.map(chair => (
                    <tr key={chair.id}>
                      <td>{chair.serialNumberByClass}</td>
                      <td>{chair.studentId || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
      {!loading && !student && <p>Could not load student data.</p>}
    </div>
  );
};

export default StudentHome;