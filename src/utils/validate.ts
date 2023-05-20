import bcrypt from "bcryptjs"

export function validateEmail(email: any) {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-z]+\.?[a-z]*@[a-z]+\.ufcg+\.edu+\.br/
    );
}

export function validatePassword(email: any) {
    return String(email)
      .toLowerCase()
      .match(
        /^.{6,}$/
      );
}

export function encryptPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}