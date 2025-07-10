import React from "react";
import "./css/PasswordInputChecklist.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
};

export const PasswordInputChecklist: React.FC<Props> = ({
  value,
  onChange,
  id,
  name,
}) => {
  const requirements = [
    { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
    { label: "Uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "Lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "Number", test: (pw: string) => /\d/.test(pw) },
    { label: "Special character", test: (pw: string) => /[\W_]/.test(pw) },
  ];

  return (
    <div className="password-checklist">
      <input
        type="password"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter password"
      />
      <ul>
        {requirements.map(({ label, test }) => {
          const passed = test(value);
          return (
            <li key={label} className={passed ? "passed" : "not-passed"}>
              <span>{passed ? "✅" : "❌"}</span> {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
