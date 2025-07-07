// // router/index.tsx
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "../pages/HomePage";
// import { TeacherSignUpPage } from "../pages/SignUp/SignUpTeacher";
// import { Paths } from "./paths";
// import { StudentSignUpPage } from "../pages/SignUp/SignUpStudent";
// import { StudentSignInPage } from "../pages/SignIn/SingInStudent";

// const router = createBrowserRouter([
//   {
//     path: Paths.home, 
//     element: <HomePage />,
//   },
//   {
//     path: Paths.signUpTeacher, 
//     element: <TeacherSignUpPage />,
//   },
//   {
//     path: Paths.signUpStudent, 
//     element: <StudentSignUpPage />,
//   },
//    {
//     path: Paths.signInStudent, 
//     element: <StudentSignInPage />,
//   },
// ]);

// const Router = () => {
//   return <RouterProvider router={router} />;
// };

// export default Router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { TeacherSignUpPage } from "../pages/SignUp/SignUpTeacher";
import { StudentSignUpPage } from "../pages/SignUp/SignUpStudent";
import { StudentSignInPage } from "../pages/SignIn/SingInStudent";
// import SeatingPage from "../pages/SeatingPage";
import { Paths } from "./paths";

const router = createBrowserRouter([
  { path: Paths.home, element: <HomePage /> },
  { path: Paths.signUpTeacher, element: <TeacherSignUpPage /> },
  { path: Paths.signUpStudent, element: <StudentSignUpPage /> },
  { path: Paths.signInStudent, element: <StudentSignInPage /> },
  // { path: Paths.seating, element: <SeatingPage /> },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
