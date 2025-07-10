import React, { useState } from "react";
import { FieldType } from "../types/field.types";
import "./css/AuthForm.css";

type Props = {
  title: string;
  fields: FieldType[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  footer?: React.ReactNode;
};

export const AuthForm: React.FC<Props> = ({
  title,
  fields,
  onSubmit,
  submitText = "Submit",
  footer,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{title}</h2>
      {fields.map(({ name, label, type = "text", required, customInput }) => (
        <div key={name} className="form-group">
          <label htmlFor={name}>{label}:</label>
          {customInput ? (
            customInput
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              onChange={handleChange}
              value={type !== "file" ? formData[name] || "" : undefined}
            />
          )}
        </div>
      ))}
      <button type="submit">{submitText}</button>
      {footer && <div className="form-footer">{footer}</div>}
    </form>
  );
};
