// component/TeacherNav/TeacherNavContainer.tsx
import React, { useEffect, useState } from "react";
import { classService } from "../../services/class.service";
import { ClassType } from "../../types/class.types";
import { useAppSelector } from "../../redux/hooks";
import TeacherNavItem from "./TeacherNavItem";
import { Link } from "react-router-dom";
import {Paths} from "../../routes/paths";

const TeacherNavContainer = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.id) return;

    classService.getByTeacherId(user.id)
      .then(setClasses)
      .catch((err) => console.error("🥰Error fetching classes", err));
  }, [user?.id]); // useEffect יופעל רק כשהמשתמש קיים
  console.log("TeacherNavContainer rendered with classes:", classes);
  console.log("User classes:", classes);
  return (
    <ul>
      {classes.map((cls) => (
        <TeacherNavItem key={cls.id} classItem={cls} />
      ))}
      <li>
        <Link to={Paths.addClass}>Add Class</Link>
      </li>
    </ul>
  );
};

export default TeacherNavContainer;
