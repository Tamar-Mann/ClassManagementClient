import { RoleType } from "./Enums/roleEnum.types"
export type UserType  = {
    id: string,
    password: string,
    name: string,
    dateOfBirth: Date,
    address: string,
    email: string,
    phone: string,
    role: RoleType
}