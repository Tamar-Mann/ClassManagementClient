// utils/pdfExporter.ts
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ChairType } from "../types/chair.types";

export const exportSeatingPDF = async (
  chairs: ChairType[],
  studentsMap: Record<string, { name: string }>
) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Classroom Seating Report", 20, 20);
  doc.setFontSize(12);

  let y = 40;
  chairs.forEach((chair) => {
    const name = chair.studentId && studentsMap[chair.studentId]
      ? studentsMap[chair.studentId].name
      : "Unknown";
    doc.text(`Chair ${chair.serialNumberByClass}: ${name}`, 20, y);
    y += 10;
  });

  // Try to capture the visual layout
  const visual = document.querySelector(".classroom-grid-wrapper") as HTMLElement;
  if (visual) {
    const canvas = await html2canvas(visual);
    const imgData = canvas.toDataURL("image/png");
    doc.addPage();
    doc.addImage(imgData, "PNG", 15, 15, 180, 120);
  }

  doc.save("seating-report.pdf");
};
