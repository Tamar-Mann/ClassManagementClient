// File: src/Auth/SignInForm.tsx
import React from "react";
import { AuthForm } from "../components/AuthForm";
import { FieldType } from "../types/field.types";


type Props = {
  title: string;
  submitText: string;
  onSubmit: (data: Record<string, any>) => void;
  footer?: React.ReactNode;
};

export const SignInForm: React.FC<Props> = ({ title, submitText, onSubmit, footer }) => {
  const fields: FieldType[] = [
    { name: "email", label: "Email", required: true },
    { name: "password", label: "Password", required: true },
  ];

  return (
    <AuthForm
      title={title}
      fields={fields}
      onSubmit={onSubmit}
      submitText={submitText}
      footer={footer}
    />
  );
};
