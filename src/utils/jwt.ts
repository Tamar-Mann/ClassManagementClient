export type DecodedUser = {
  id: string;
  name: string;
  email: string;
  password?: string; 
  role: number;
};

export const extractUserFromToken = (token: string): DecodedUser | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload["sid"],
      name: payload["nameid"],
      email: payload["email"],
      password: payload["postalcode"], // זה מוזר אבל לפי השרת שלך
      role: parseInt(payload["role"]),
    };
  } catch {
    return null;
  }
};



// export const extractUserIdFromToken = (token: string): string | null => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload["nameid"] || payload["sub"] || null;
//   } catch {
//     return null;
//   }
// };
