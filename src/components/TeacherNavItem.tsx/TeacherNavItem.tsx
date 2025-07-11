// component/TeacherNav/TeacherNavItem.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ClassType } from "../../types/class.types";

type Props = {
  classItem: ClassType;
};

console.log("TeacherNavItem rendered with classItem:");


const TeacherNavItem: React.FC<Props> = ({ classItem }) => {
  return (
    <li>
      <Link to={`/teacher/class/${classItem.id}`}>Class {classItem.name}</Link>
    </li>
  );
};

export default TeacherNavItem;
