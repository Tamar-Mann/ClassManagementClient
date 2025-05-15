import { LevelType } from "./Enums/levelEnum.types"
import { RoleType } from "./Enums/roleEnum.types"
export type StudentConfidentialInfoType  = {
    studentId: string,
    statusSocial: LevelType,
    attentionalLevel: LevelType,
    //role: RoleType
}