import { StudentType } from "./student.types"
import { SubjectType } from "./subject.types"
export type MarkType  = {
    subjectId: number,
    subject?: SubjectType,
    studentId: string,
    student?: StudentType,
    markPercent: number,
    DateOfTest: Date
}