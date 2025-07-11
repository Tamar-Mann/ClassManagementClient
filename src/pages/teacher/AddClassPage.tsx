import React from "react";
import "../../components/css/AddClassForm.css";
import "./css/AddClassPage.css";
import AddClassForm from "../../components/AddClassForm";

const AddClassPage = () => {
  return (
    <div className="add-class-page">
      <h1>Add a New Class</h1>
      <AddClassForm />
    </div>
  );
};

export default AddClassPage;
