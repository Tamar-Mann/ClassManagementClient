// File: src/services/auth.service.ts

import { studentService } from "./student.service";
import { teacherService } from "./teacher.service";

export const authService = {
  loginStudent: studentService.login,
  loginTeacher: teacherService.login,
};
