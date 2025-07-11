// pages/teacher/AddChairPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import AddChairForm from "../../components/AddChairForm";
import "./css/AddChairPage.css";

const AddChairPage = () => {
  const { classId } = useParams();

  if (!classId) return <p>Class ID is missing</p>;

  return (
    <div className="add-chair-page">
      <h1>Add Chair to Class {classId}</h1>
      <AddChairForm classId={parseInt(classId)} />
    </div>
  );
};

export default AddChairPage;
