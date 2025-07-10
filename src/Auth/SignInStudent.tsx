import React from "react";
import {RoleType} from "../types/Enums/roleEnum.types"
import { SignInForm } from "./SignInForm";
import { studentService } from "../services/student.service";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess, setUser } from "../redux/slices/authSlice";
import { extractUserFromToken } from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import { Paths } from "../routes/paths";

export const SignInStudent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const { email, password } = data;

      const token = await studentService.login({ email, password });
      dispatch(loginSuccess({ token }));

      const user = extractUserFromToken(token);
      if (!user) throw new Error("Invalid token");

      dispatch(setUser(user));
      

      if (user.role === RoleType.Master) {
        navigate("/master/dashboard"); // או כל מסך שתרצי בהמשך
      } else if (user.role === RoleType.Admin) {
        navigate(Paths.homeTeacher);
      } else if (
        user.role === RoleType.User ||
        user.role === RoleType.AuthorizedUser
      ) {
        navigate(Paths.homeStudent);
      } else {
        alert("Unrecognized role");
      }


      alert("Login successful!");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <SignInForm
      title="Student Login"
      submitText="Login"
      onSubmit={handleSubmit}
      footer={
        <p>
          Not registered? <a href="/signUpStudent">Sign up here</a>
        </p>
      }
    />
  );
};
