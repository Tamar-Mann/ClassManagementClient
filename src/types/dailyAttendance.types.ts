import { StatuseType } from "./Enums/statusEnum.types" 
export type DailyAttendanceType  = {
    id: string,
    dateOfTime: Date,
    startTime: Date,
    endTime: Date,
    Statusee: StatuseType,
    notes: string
}