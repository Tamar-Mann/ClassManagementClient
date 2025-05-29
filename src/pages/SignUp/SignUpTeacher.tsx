import React, { useState } from "react";
import { AuthForm } from "../../components/AuthForm";
import { PasswordInputChecklist } from "../../components/PasswordInputChecklist";
import { TeacherType } from "../../types/teacher.types";
import { RoleType } from "../../types/Enums/roleEnum.types";
import { validateIsraeliID, validateEmail, validatePhone, validatePassword } from "../../utils/validators";
import { FieldType } from "../../types/field.types";

// useState!
export const TeacherSignUpPage = () => {
  const [password, setPassword] = useState("");

  const teacherFields: FieldType[] = [
    { name: "id", label: "ID Number", required: true },
    {
      name: "password",
      label: "Password",
      required: true,
      customInput: <PasswordInputChecklist value={password} onChange={setPassword} />,
    },
    { name: "name", label: "Full Name", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "address", label: "Address", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", required: true },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    data.password = password;

    // Validate date of birth
    const date = new Date(data.dateOfBirth || "");
    const now = new Date();
    const earliestDate = new Date("1900-01-01");
    if (isNaN(date.getTime()) || date < earliestDate || date > now) {
      alert("Invalid date of birth");
      return;
    }

    if (!validateIsraeliID(data.id)) {
      alert("Invalid ID number");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password does not meet security requirements.");
      return;
    }
    if (!validateEmail(data.email)) {
      alert("Invalid email");
      return;
    }
    if (!validatePhone(data.phone)) {
      alert("Invalid phone number");
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
    // TODO: API call to send data
  };

  return (
    <AuthForm
      title="Teacher Registration"
      fields={teacherFields}
      onSubmit={handleSubmit}
      submitText="Register"
      footer={<p>Already registered? <a href="/auth/login">Login here</a></p>}
    />
  );
};
