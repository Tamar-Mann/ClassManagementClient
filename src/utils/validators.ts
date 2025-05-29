export const validateIsraeliID = (id: string): boolean => {
  if (!/^\d{9}$/.test(id)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = Number(id[i]) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    sum += num;
  }
  return sum % 10 === 0;
};

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone: string): boolean =>
  /^05\d{8}$/.test(phone);

export const validatePassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

