export type ChairType = {
    id: string;
    classId: number;
    serialNumberByClass: number;
    isNearTheDoor: boolean;
    isNearTheWindow: boolean;
    studentId?: string;      // optional: the student sitting on the chair
    // nearbyChairs?: ChairType[];

};
