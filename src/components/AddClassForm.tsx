// component/ClassForm/AddClassForm.tsx
import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { classService } from "../services/class.service";
import "./css/AddClassForm.css";

const AddClassForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [countOfStudents, setCount] = useState(0);

  const user = useAppSelector((state) => state.auth.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return alert("User not found.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("countOfStudents", countOfStudents.toString());
    formData.append("teacherId", user.id); // ✔️ מאחורי הקלעים

    try {
      console.log("class:", formData);
      await classService.create(formData);
      alert("Class added successfully!");
      setName("");
      setPassword("");
      setCount(0);
    } catch (err) {
      console.log("Error adding class:", formData);
      console.error(err);
      alert("Error adding class.");
    }
  };

  return (
    <form className="add-class-form" onSubmit={handleSubmit}>
      <label>
        Class Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Class Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Number of Students:
        <input
          type="number"
          value={countOfStudents}
          onChange={(e) => setCount(Number(e.target.value))}
          required
        />
      </label>

      <button type="submit">➕ Add Class</button>
    </form>
  );
};

export default AddClassForm;
