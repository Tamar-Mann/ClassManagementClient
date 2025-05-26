import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
};

export const PasswordInputChecklist: React.FC<Props> = ({ value, onChange, id, name }) => {
  const requirements = [
    { label: "לפחות 8 תווים", test: (pw: string) => pw.length >= 8 },
    { label: "אות גדולה", test: (pw: string) => /[A-Z]/.test(pw) },
    { label: "אות קטנה", test: (pw: string) => /[a-z]/.test(pw) },
    { label: "מספר", test: (pw: string) => /\d/.test(pw) },
    { label: "תו מיוחד", test: (pw: string) => /[\W_]/.test(pw) },
  ];

  return (
    <div>
      <input
        type="password"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="הכנס סיסמה"
        style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
      />
      <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
        {requirements.map(({ label, test }) => {
          const passed = test(value);
          return (
            <li
              key={label}
              style={{
                color: passed ? "green" : "gray",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.9rem",
                userSelect: "none",
              }}
            >
              <span>{passed ? "✔️" : "❌"}</span> {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};