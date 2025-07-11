import React, { useEffect, useState } from "react";
import { ChairType } from "../types/chair.types";
import { studentService } from "../services/student.service";
import "./css/ClassroomVisual.css";

interface Props {
  chairs: ChairType[];
}

interface StudentInfo {
  id: string;
  name: string;
  imageUrl?: string;
}

const ROW_SIZE = 5;

const getInitial = (name?: string) =>
  name ? name.trim().charAt(0).toUpperCase() : "?";

const ClassroomVisual: React.FC<Props> = ({ chairs }) => {
  const [studentsMap, setStudentsMap] = useState<Record<string, StudentInfo>>({});

  useEffect(() => {
    const fetchStudents = async () => {
      const ids = chairs
        .map((c) => c.studentId)
        .filter((id): id is string => !!id);
      const uniqueIds = Array.from(new Set(ids));
      const studentsArr = await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const student = await studentService.getById(id);
            console.log("🧠 student.arrImage =", student.arrImage);
            return {
              id,
              name: student?.name,
              imageUrl: student.arrImage || undefined,
            };
          } catch {
            return { id, name: "לא ידוע" };
          }
        })
      );
      const map: Record<string, StudentInfo> = {};
      studentsArr.forEach((s) => (map[s.id] = s));
      setStudentsMap(map);
    };

    fetchStudents();
  }, [chairs]);

  return (
    <div className="classroom-grid-wrapper">
      <div className="classroom-grid">
        {chairs.map((chair) => {
          const student = chair.studentId ? studentsMap[chair.studentId] : undefined;
          return (
            <div className="chair-visual-grid" key={chair.id}>
              <div className="chair-icon">🪑</div>
              {student && student.imageUrl ? (
                <img
                  src={`data:image/JPG;base64,${student.imageUrl}`}
                  alt={student.name}
                  className="student-img"
                />
                
              ) : student ? (
                <div className="student-initial">{getInitial(student.name)}</div>
              ) : (
                <div className="student-initial">-</div>
              )}
              <div className="student-name">{student?.name ?? "-"}</div>
              {chair.isNearTheDoor && <div className="door-label">🚪</div>}
              {chair.isNearTheWindow && <div className="window-label">🪟</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassroomVisual;