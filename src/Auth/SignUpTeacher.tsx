import React, { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { PasswordInputChecklist } from "../components/PasswordInputChecklist";
import {
  validateIsraeliID,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../utils/validators";
import { FieldType } from "../types/field.types";
import { teacherService } from "../services/teacher.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess, setUser } from "../redux/slices/authSlice";
import { extractUserFromToken } from "../utils/jwt";
import { Paths } from "../routes/paths";



export const SignUpTeacher = () => {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const teacherFields: FieldType[] = [
    { name: "id", label: "ID Number", required: true },
    {
      name: "password",
      label: "Password",
      required: true,
      customInput: (
        <PasswordInputChecklist value={password} onChange={setPassword} />
      ),
    },
    { name: "name", label: "Full Name", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "address", label: "Address", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", required: true },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const pw = password || data.password || "";

      // בדיקות תקינות
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
        alert("Password does not meet requirements.");
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

      // יצירת FormData
      const formData = new FormData();
      const keysToSkip = ["classId", "classItem", "chairId", "arrImage", "fileImage"];

      Object.entries(data).forEach(([key, value]) => {
        if (!value || keysToSkip.includes(key)) return;

        if (key === "dateOfBirth") {
          const formattedDate = date.toISOString().split("T")[0]; // נותן '2025-07-03'
          formData.append("dateOfBirth", formattedDate);
        } else {
          formData.append(key, value as any);
        }
      });

      formData.append("password", pw);

      // הדפסה לבדיקה
      console.log("FormData sending:");
        formData.forEach((value, key) => {
        console.log(key, value);
      });

      // שליחה לשרת
      await teacherService.create(formData);
      alert("Teacher registered successfully!");
      // 🔐 התחברות אוטומטית לאחר הרשמה
      const token = await teacherService.login({
        email: data.email,
        password: password,
      });

      // 🔁 שמירה ל־Redux או Context
      dispatch(loginSuccess({ token }));

      const user = extractUserFromToken(token);
      if (!user) throw new Error("Invalid token after registration");

      dispatch(setUser(user));

      //   ⏩ ניתוב לדף הבית של מורה
      navigate(Paths.homeTeacher);

    } catch (error) {
      console.error("Teacher registration failed:", error);
      alert("Failed to register teacher");
    }
  };

  return (
    <AuthForm
      title="Teacher Registration"
      fields={teacherFields}
      onSubmit={handleSubmit}
      submitText="Register"
      footer={
        <p>
          Already registered? <a href="/signInTeacher">Login here</a>
        </p>
      }
    />
  );
};
