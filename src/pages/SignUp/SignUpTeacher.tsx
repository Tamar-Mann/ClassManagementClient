import React, { useState } from "react";
import { AuthForm, FieldType } from "../../components/AuthForm";
import { PasswordInputChecklist } from "../../components/PasswordInputChecklist";
import { TeacherType } from "../../types/teacher.types";
import { RoleType } from "../../types/Enums/roleEnum.types";
import { validateIsraeliID, validateEmail, validatePhone, validatePassword } from "../../utils/validators";

export const TeacherSignUpPage = () => {
  const [password, setPassword] = useState("");

  const teacherFields: FieldType[] = [
    { name: "id", label: "תעודת זהות", required: true },
    {
      name: "password",
      label: "סיסמה",
      required: true,
      customInput: <PasswordInputChecklist value={password} onChange={setPassword} />,
    },
    { name: "name", label: "שם מלא", required: true },
    { name: "dateOfBirth", label: "תאריך לידה", type: "date", required: true },
    { name: "address", label: "כתובת", required: true },
    { name: "email", label: "אימייל", type: "email", required: true },
    { name: "phone", label: "טלפון", required: true },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    data.password = password;

        // בדיקת תאריך לידה תקין
        const date = new Date(data.dateOfBirth || "");
        const now = new Date();
        const earliestDate = new Date("1900-01-01");
        if (isNaN(date.getTime()) || date < earliestDate || date > now) {
          alert("תאריך לידה לא תקין");
          return;
        }
    
    if (!validateIsraeliID(data.id)) {
      alert("תעודת זהות לא תקינה");
      return;
    }
    if (!validatePassword(password)) {
      alert("הסיסמה לא עומדת בדרישות האבטחה.");
      return;
    }
    if (!validateEmail(data.email)) {
      alert("אימייל לא תקין");
      return;
    }
    if (!validatePhone(data.phone)) {
      alert("מספר טלפון לא תקין");
      return;
    }

    const teacher: TeacherType = {
      id: data.id,
      password: data.password,
      name: data.name,
      dateOfBirth: new Date(data.dateOfBirth),
      address: data.address,
      email: data.email,
      phone: data.phone,
      role: RoleType.Admin,
    };

    console.log("Teacher object:", teacher);
    // TODO: קריאה ל-API למשלוח הנתונים
  };

  return (
    <AuthForm
      title="הרשמת מורה"
      fields={teacherFields}
      onSubmit={handleSubmit}
      submitText="הרשם"
      footer={<p>כבר רשום? <a href="/auth/login">התחבר כאן</a></p>}
    />
  );
};