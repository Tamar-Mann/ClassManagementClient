import React, { useState } from "react";
import { chairService } from "../services/chair.service";
import "./css/AddChairForm.css";

type Props = {
  classId: number;
};

const AddChairForm: React.FC<Props> = ({ classId }) => {
  const [serialNumberByClass, setSerialNumberByClass] = useState<number>(1);
  const [isNearTheDoor, setIsNearTheDoor] = useState(false);
  const [isNearTheWindow, setIsNearTheWindow] = useState(false);

  // הדפסת classId לבדיקה
  console.log("classId prop:", classId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const chairData = new FormData();
    chairData.append("classId", classId.toString());
    chairData.append("serialNumberByClass", serialNumberByClass.toString());
    chairData.append("isNearTheDoor", isNearTheDoor ? "true" : "false");
    chairData.append("isNearTheWindow", isNearTheWindow ? "true" : "false");

    // chairData.append("studentId", ""); // שלח תמיד studentId ריק

    // הדפסת כל הערכים שנשלחים
    console.log("Chair sent:", Object.fromEntries(chairData.entries()));
    Array.from(chairData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });



    try {
      await chairService.create(chairData);
      alert("Chair added successfully!");
    } catch (error: any) {
      console.error("Full error:", error);
      console.log("Response data:", error.response?.data);
      alert(error?.response?.data?.message || "Failed to add chair");
    }
  };

  return (
    <form className="add-chair-form" onSubmit={handleSubmit}>
      <label>
        Serial Number:
        <input
          type="number"
          min={1}
          value={serialNumberByClass}
          onChange={e => setSerialNumberByClass(Number(e.target.value))}
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isNearTheDoor}
          onChange={() => setIsNearTheDoor(!isNearTheDoor)}
        />
        Is Near the Door
      </label>
      <label>
        <input
          type="checkbox"
          checked={isNearTheWindow}
          onChange={() => setIsNearTheWindow(!isNearTheWindow)}
        />
        Is Near the Window
      </label>
      <button type="submit">Add Chair</button>
    </form>
  );
};

export default AddChairForm;