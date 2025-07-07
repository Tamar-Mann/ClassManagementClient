// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { chairService } from "../services/chair.service";
// import { ChairType } from "../types/chair.types";
// import "../styles/pages/SeatingPage.css";

// const SeatingPage = () => {
//   const { id: classId } = useParams();
//   const [chairs, setChairs] = useState<ChairType[]>([]);

//   useEffect(() => {
//     if (classId) fetchChairs(classId);
//   }, [classId]);

//   const fetchChairs = async (classId: string) => {
//     try {
//       const result = await chairService.getAllChairsOfClass(+classId);
//       setChairs(result);
//     } catch (error) {
//       console.error("Failed to fetch chairs", error);
//     }
//   };

//   const renderGrid = () => {
//     const maxRow = Math.max(...chairs.map(c => c.row || 0));
//     const maxCol = Math.max(...chairs.map(c => c.column || 0));

//     const grid = [];
//     for (let row = 1; row <= maxRow; row++) {
//       const rowChairs = [];
//       for (let col = 1; col <= maxCol; col++) {
//         const chair = chairs.find(c => c.row === row && c.column === col);
//         rowChairs.push(
//           <td key={col} className="chair-cell">
//             {chair ? (
//               <div className="chair-box">
//                 <span className="chair-id">#{chair.id}</span>
//                 <div>{chair.studentId || "🔲 ריק"}</div>
//               </div>
//             ) : (
//               <div className="empty-box">🚫</div>
//             )}
//           </td>
//         );
//       }
//       grid.push(<tr key={row}>{rowChairs}</tr>);
//     }
//     return grid;
//   };

//   return (
//     <div className="seating-page">
//       <h2>שיבוץ כיתה מספר {classId}</h2>
//       <table className="seating-grid">
//         <tbody>{renderGrid()}</tbody>
//       </table>
//     </div>
//   );
// };

// export default SeatingPage;
export {};