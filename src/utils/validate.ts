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

export function validateMatricula(email: any) {
    return String(email)
      .toLowerCase()
      .match(
        /^.{9,}$/
      );
}