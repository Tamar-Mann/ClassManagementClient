import React, { useState } from "react";

type FieldType = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  customInput?: React.ReactNode;
};

export type { FieldType };

export const AuthForm: React.FC<{
  title: string;
  fields: FieldType[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  footer?: React.ReactNode;
}> = ({ title, fields, onSubmit, submitText = "שלח", footer }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{title}</h2>
      {fields.map(({ name, label, type = "text", required, customInput }) => (
        <div key={name} style={{ marginBottom: "1rem" }}>
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
              {...(type !== "file" ? { value: formData[name] || "" } : {})}
            />
          )}
        </div>
      ))}
      <button type="submit">{submitText}</button>
      {footer && <div style={{ marginTop: "1rem" }}>{footer}</div>}
    </form>
  );
};
