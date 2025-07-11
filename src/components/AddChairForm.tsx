// component/ChairForm/AddChairForm.tsx
import React, { useState } from "react";
import { chairService } from "../services/chair.service";
import "./css/AddChairForm.css";

type Props = {
  classId: number;
};

const AddChairForm: React.FC<Props> = ({ classId }) => {
  const [isFront, setIsFront] = useState(false);
  const [isCenteral, setIsCenteral] = useState(false);
  const [isNearTheDoor, setIsNearTheDoor] = useState(false);
  const [isNearTheWindow, setIsNearTheWindow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("classId", classId.toString());
    formData.append("isFront", isFront.toString());
    formData.append("isCenteral", isCenteral.toString());
    formData.append("isNearTheDoor", isNearTheDoor.toString());
    formData.append("isNearTheWindow", isNearTheWindow.toString());

    try {
      await chairService.create(formData);
      alert("Chair added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add chair");
    }
  };

  return (
    <form className="add-chair-form" onSubmit={handleSubmit}>
      <label>
        <input type="checkbox" checked={isFront} onChange={() => setIsFront(!isFront)} />
        Is Front
      </label>
      <label>
        <input type="checkbox" checked={isCenteral} onChange={() => setIsCenteral(!isCenteral)} />
        Is Centeral
      </label>
      <label>
        <input type="checkbox" checked={isNearTheDoor} onChange={() => setIsNearTheDoor(!isNearTheDoor)} />
        Is Near the Door
      </label>
      <label>
        <input type="checkbox" checked={isNearTheWindow} onChange={() => setIsNearTheWindow(!isNearTheWindow)} />
        Is Near the Window
      </label>
      <button type="submit">Add Chair</button>
    </form>
  );
};

export default AddChairForm;
