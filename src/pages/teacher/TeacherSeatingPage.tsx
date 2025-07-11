import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { classService } from "../../services/class.service";
import { chairService } from "../../services/chair.service";
import { studentService } from "../../services/student.service";
import { ChairType } from "../../types/chair.types";
import ClassroomVisual from "../../components/ClassroomVisual";
import "./css/TeacherSeatingPage.css";
import { exportSeatingPDF } from "../../utils/pdfExporter";

const TeacherSeatingPage = () => {
  const { classId } = useParams();
  const [chairs, setChairs] = useState<ChairType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showVisual, setShowVisual] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [studentsMap, setStudentsMap] = useState<Record<string, { name: string }>>({});

  const handleSolveSeating = async () => {
    setLoading(true);
    await classService.solveSeating(Number(classId));
    setLoading(false);
    alert("Student seating has been successfully generated!");
  };

  const handleFetchChairs = async () => {
    setLoading(true);
    const chairsData = await chairService.getChairsByClass(Number(classId));
    setChairs(chairsData);

    const ids = chairsData
      .map((c) => c.studentId)
      .filter((id): id is string => !!id);

    const uniqueIds = Array.from(new Set(ids));
    const studentsArr = await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const student = await studentService.getById(id);
          return {
            id,
            name: student.name,
          };
        } catch {
          return { id, name: "Unknown" };
        }
      })
    );

    const map: Record<string, { name: string }> = {};
    studentsArr.forEach((s) => (map[s.id] = s));
    setStudentsMap(map);

    setLoading(false);
  };

  const handleShowVisual = async () => {
    await handleFetchChairs();
    setShowVisual(true);
    setShowTable(false);
  };

  const handleShowTable = async () => {
    await handleFetchChairs();
    setShowTable(true);
    setShowVisual(false);
  };

  return (
    <div className="seating-page">
      <h2 className="center-text">Student Seating Arrangement</h2>

      <div className="button-group">
        <button className="btn" onClick={handleSolveSeating} disabled={loading}>
          Generate Seating
        </button>
        <button className="btn" onClick={handleShowVisual} disabled={loading}>
          View Visual Layout
        </button>
        <button className="btn" onClick={handleShowTable} disabled={loading}>
          View Table
        </button>
        <button className="btn" onClick={() => exportSeatingPDF(chairs, studentsMap)}>
          Export PDF
        </button>
      </div>

      {loading && <p className="center-text">Loading...</p>}

      {showVisual && (
        <>
          <h3 className="center-text">Classroom Visual Layout</h3>
          <ClassroomVisual chairs={chairs} />
        </>
      )}

      {showTable && (
        <>
          <h3 className="center-text" style={{ marginTop: "40px" }}>
            Seating Table
          </h3>
          <div className="table-wrapper">
            <table className="seating-table">
              <thead>
                <tr>
                  <th>Chair #</th>
                  <th>Student Name</th>
                </tr>
              </thead>
              <tbody>
                {chairs.map((chair) => (
                  <tr key={chair.id}>
                    <td>{chair.serialNumberByClass}</td>
                    <td>
                      {chair.studentId && studentsMap[chair.studentId]
                        ? studentsMap[chair.studentId].name
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherSeatingPage;
