import { UserType } from "./user.types"
import { ClassType } from "./class.types"
export type StudentType  = UserType & {
    classId: number,
    classItem: ClassType,
    chairId?: number,
    arrImage?: string,
    fileImage: File | null
}

