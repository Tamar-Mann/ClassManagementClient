import { AuthForm } from "../../components/AuthForm";
import { PasswordInputChecklist } from "../../components/PasswordInputChecklist";
import { StudentType } from "../../types/student.types";
import {
  validateIsraeliID,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../../utils/validators";
import React, { useState } from "react";

export const StudentSignUpPage = () => {
  const [password, setPassword] = useState("");

  const studentFields = [
    { name: "id", label: "תעודת זהות", required: true },
    {
      name: "password",
      label: "סיסמה",
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
    { name: "name", label: "שם מלא", required: true },
    { name: "classId", label: "קוד כיתה", type: "number", required: true },
    { name: "dateOfBirth", label: "תאריך לידה", type: "date", required: true },
    { name: "address", label: "כתובת", required: true },
    { name: "email", label: "אימייל", type: "email", required: true },
    { name: "phone", label: "טלפון", required: true },
    { name: "fileImage", label: "תמונה", type: "file", required: true },
  ];

  const handleSubmit = (data: Partial<StudentType>) => {
    const pw = password || (data.password ?? "");
  
        // בדיקת תאריך לידה תקין
    const date = new Date(data.dateOfBirth || "");
    const now = new Date();
    const earliestDate = new Date("1900-01-01");
    if (isNaN(date.getTime()) || date < earliestDate || date > now) {
      alert("תאריך לידה לא תקין");
      return;
    }

    if (!validateIsraeliID(data.id || "")) {
      alert("תעודת זהות לא תקינה");
      return;
    }
    if (!validatePassword(pw)) {
      alert(
        "הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"
      );
      return;
    }
    if (!validateEmail(data.email || "")) {
      alert("אימייל לא תקין");
      return;
    }
    if (!validatePhone(data.phone || "")) {
      alert("מספר טלפון לא תקין");
      return;
    }
    if (!(data.fileImage instanceof File)) {
      alert("נא לצרף קובץ תמונה תקין");
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
  
    console.log("נשלח לשרת:", Array.from(formData.entries()));
    // await axios.post("/api/student", formData);
  };
  

  return (
    <AuthForm
      title="הרשמת תלמיד"
      fields={studentFields}
      onSubmit={handleSubmit}
      submitText="הרשם"
      footer={
        <p>
          כבר רשום? <a href="/auth/login">התחבר כאן</a>
        </p>
      }
    />
  );
};
