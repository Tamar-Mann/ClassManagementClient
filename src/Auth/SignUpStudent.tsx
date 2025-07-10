import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import { PasswordInputChecklist } from "./PasswordInputChecklist";
import { StudentType } from "../types/student.types";
import {
  validateIsraeliID,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../utils/validators";
import { FieldType } from "../types/field.types";
import { studentService } from "../services/student.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess, setUser } from "../redux/slices/authSlice";
import { extractUserFromToken } from "../utils/jwt";
import { Paths } from "../routes/paths";

export const SignUpStudent = () => {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const studentFields: FieldType[] = [
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

  const handleSubmit = async (data: Partial<StudentType>) => {
    try {
      const pw = password || data.password || "";

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
        alert("Password must meet security requirements");
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
          const formattedDate = new Date(value as string).toISOString().split("T")[0];
          formData.append("dateOfBirth", formattedDate);
        } else if (key === "fileImage" && value instanceof File) {
          formData.append("fileImage", value);
        } else {
          formData.append(key, value as any);
        }
      });

      formData.append("password", pw);

      console.log("FormData sending:");
      formData.forEach((v, k) => console.log(k, v));

      // שליחת הרשמה לשרת
      await studentService.create(formData);
      alert("Student registered successfully!");

      // התחברות מיידית
      const token = await studentService.login({
        email: data.email!,
        password: pw,
      });

      dispatch(loginSuccess({ token }));

      const user = extractUserFromToken(token);
      if (!user) throw new Error("Invalid token after registration");

      dispatch(setUser(user));

      navigate(Paths.homeStudent);
    } catch (error) {
      console.error("Student registration failed:", error);
      alert("Failed to register student");
    }
  };

  return (
    <AuthForm
      title="Student Registration"
      fields={studentFields}
      onSubmit={handleSubmit}
      submitText="Register"
      footer={
        <p>
          Already registered? <a href="/signInStudent">Login here</a>
        </p>
      }
    />
  );
};
