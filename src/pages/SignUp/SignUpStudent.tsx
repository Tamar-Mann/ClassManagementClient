import React, { useState } from "react";
import { AuthForm } from "../../components/AuthForm";
import { PasswordInputChecklist } from "../../components/PasswordInputChecklist";
import { StudentType } from "../../types/student.types";
import {
  validateIsraeliID,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../utils/validators";

export const StudentSignUpPage = () => {
  const [password, setPassword] = useState("");

  const studentFields = [
    { name: "id", label: "ID Number", required: true },
    {
      name: "password",
      label: "Password",
      required: true,
      customInput: (
        <PasswordInputChecklist
          value={password}
          onChange={setPassword}
          name="password"
          id="password"
        />
      ),
    },
    { name: "name", label: "Full Name", required: true },
    { name: "classId", label: "Class Code", type: "number", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "address", label: "Address", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", required: true },
    { name: "fileImage", label: "Image", type: "file", required: true },
  ];

  const handleSubmit = (data: Partial<StudentType>) => {
    const pw = password || (data.password ?? "");

    // Validate date of birth
    const date = new Date(data.dateOfBirth || "");
    const now = new Date();
    const earliestDate = new Date("1900-01-01");
    if (isNaN(date.getTime()) || date < earliestDate || date > now) {
      alert("Invalid date of birth");
      return;
    }

    if (!validateIsraeliID(data.id || "")) {
      alert("Invalid ID number");
      return;
    }
    if (!validatePassword(pw)) {
      alert(
        "Password must include at least 8 characters, uppercase letter, lowercase letter, number, and special character"
      );
      return;
    }
    if (!validateEmail(data.email || "")) {
      alert("Invalid email");
      return;
    }
    if (!validatePhone(data.phone || "")) {
      alert("Invalid phone number");
      return;
    }
    if (!(data.fileImage instanceof File)) {
      alert("Please attach a valid image file");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;
      if (key === "dateOfBirth") {
        formData.append(key, new Date(value as string).toISOString());
      } else if (key === "fileImage" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as any);
      }
    });

    formData.append("password", pw);

    console.log("Sending to server:", Array.from(formData.entries()));
    // await axios.post("/api/student", formData);
  };

  return (
    <AuthForm
      title="Student Registration"
      fields={studentFields}
      onSubmit={handleSubmit}
      submitText="Register"
      footer={
        <p>
          Already registered? <a href="/auth/login">Login here</a>
        </p>
      }
    />
  );
};
