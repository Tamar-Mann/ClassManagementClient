import React, { useState } from "react";
import { AuthForm } from "../../components/AuthForm";
import { UserType } from "../../types/userLogin.types";

export const StudentSignInPage = () => {

  const studentFields = [
    { name: "email", label: "email", required: true },
    { name: "password", label: "password", required: true },
  ];

  const handleSubmit = (data: Partial<UserType>) => { 
    //....
  }

  

  return (
    <AuthForm
      title="Student SignIn"
      fields={studentFields}
      onSubmit={handleSubmit}
      submitText="SignIn"
      footer={
        <p>
          Already registered? <a href="../SignUp/SignUpStudent">SignUp here</a>
        </p>
      }
    />
  );
};
