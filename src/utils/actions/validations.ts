export const validatePassword =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const lowerCase = (value) => value.toLowerCase().trim();
