// component/TeacherNav.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { classService } from "../services/class.service";
import { ClassType } from "../types/class.types";
import { extractUserFromToken } from "../utils/jwt";
import "../layout/css/NavBar.css";

const TeacherNav = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token ? extractUserFromToken(token) : null;

    if (user?.id) {
      classService.getByTeacherId(user.id).then(setClasses).catch(console.error);
    }
  }, []);

  return (
    <ul>
      {classes.map((cls) => (
        <li key={cls.id}>
          <Link to={`/teacher/class/${cls.id}`}>Class {cls.name}</Link>
        </li>
      ))}
      <li>
        <Link to="/teacher/add-class">Add a class</Link>
      </li>
    </ul>
  );
};

export default TeacherNav;
