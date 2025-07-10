import { RoleType } from "../types/Enums/roleEnum.types";

// טיפוס שמייצג את המידע שמוצא מתוך ה־JWT
export type DecodedUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: RoleType;
};

// מיפוי בין תפקידים טקסטואליים לבין enum מספרי
const roleMap: Record<string, RoleType> = {
  None: RoleType.None,
  Master: RoleType.Master,
  Admin: RoleType.Admin,
  AuthorizedUser: RoleType.AuthorizedUser,
  User: RoleType.User,
};

// חילוץ נתוני משתמש מתוך JWT
export const extractUserFromToken = (token: string): DecodedUser | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const roleText = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const role = roleMap[roleText] ?? RoleType.None;

    return {
      id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
      name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      password: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode"],
      role,
    };
  } catch (e) {
    console.error("Failed to extract user from token:", e);
    return null;
  }
};


// export type DecodedUser = {
//   id: string;
//   name: string;
//   email: string;
//   password?: string; 
//   role: number; // נניח שאת משתמשת ב־RoleType enum
// };

// export const extractUserFromToken = (token: string): DecodedUser | null => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return {
//       id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
//       name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
//       email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
//       password: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode"],
//       role: parseInt(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]),
//     };
//   } catch (e) {
//     console.error("Error decoding token:", e);
//     return null;
//   }
// };


// export const extractUserFromToken = (token: string): DecodedUser | null => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return {
//       id: payload["sid"],
//       name: payload["nameid"],
//       email: payload["email"],
//       password: payload["postalcode"], // זה מוזר אבל לפי השרת שלך
//       role: parseInt(payload["role"]),
//     };
//   } catch {
//     return null;
//   }
// };



// export const extractUserIdFromToken = (token: string): string | null => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload["nameid"] || payload["sub"] || null;
//   } catch {
//     return null;
//   }
// };
