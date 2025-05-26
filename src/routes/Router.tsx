// router/index.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { TeacherSignUpPage } from "../pages/SignUp/SignUpTeacher";
import { Paths } from "./paths";
import { StudentSignUpPage } from "../pages/SignUp/SignUpStudent";

const router = createBrowserRouter([
  {
    path: Paths.home, 
    element: <HomePage />,
  },
  {
    path: Paths.signUpTeacher, 
    element: <TeacherSignUpPage />,
  },
  {
    path: Paths.signUpStudent, 
    element: <StudentSignUpPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
