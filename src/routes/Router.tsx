import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import { SignUpTeacher } from "../Auth/SignUpTeacher";
import { SignUpStudent } from "../Auth/SignUpStudent";
import { SignInTeacher } from "../Auth/SignInTeacher";
import { SignInStudent } from "../Auth/SignInStudent";
import StudentHome from "../pages/student/StudentHome";
import TeacherHome from "../pages/teacher/TeacherHome";
import AddClassPage from "../pages/teacher/AddClassPage";
import AddChairPage from "../pages/teacher/AddChairPage";
import ClassPage from "../pages/teacher/ClassPage";
import StudentDetailsPage from "../pages/teacher/StudentDetailsPage";
import ChairDetailsPage from "../pages/teacher/ChairDetailsPage";
import AppLayout from "../layout/AppLayout";
import { Paths } from "./paths";
import TeacherSeatingPage from "../pages/teacher/TeacherSeatingPage";


const router = createBrowserRouter([
  {
    path: Paths.home,
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: Paths.signUpTeacher,
    element: (
      <AppLayout>
        <SignUpTeacher />
      </AppLayout>
    ),
  },
  {
    path: Paths.signUpStudent,
    element: (
      <AppLayout>
        <SignUpStudent />
      </AppLayout>
    ),
  },
  {
    path: Paths.signInTeacher,
    element: (
      <AppLayout>
        <SignInTeacher />
      </AppLayout>
    ),
  },
  {
    path: Paths.signInStudent,
    element: (
      <AppLayout>
        <SignInStudent />
      </AppLayout>
    ),
  },
  {
    path: Paths.homeStudent,
    element: (
      <AppLayout>
        <StudentHome />
      </AppLayout>
    ),
  },
  {
    path: Paths.homeTeacher,
    element: (
      <AppLayout>
        <TeacherHome />
      </AppLayout>
    ),
  },
  {
    path: Paths.addClass,
    element: (
      <AppLayout>
        <AddClassPage />
      </AppLayout>
    ),
  },
  {
    path: Paths.addChair,
    element: (
      <AppLayout>
        <AddChairPage />
      </AppLayout>
    ),
  },
  {
    path: Paths.classDetails,
    element: (
      <AppLayout>
        <ClassPage />
      </AppLayout>
    ),
  },
  {
    path: Paths.studentDetails,
    element: (
      <AppLayout>
        <StudentDetailsPage />
      </AppLayout>
    ),
  },
  {
    path: Paths.chairDetails,
    element: (
      <AppLayout>
        <ChairDetailsPage />
      </AppLayout>
    ),
  },
    {
    path: Paths.seating,
    element: (
      <AppLayout>
        <TeacherSeatingPage />
      </AppLayout>
    ),
  },
  
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
