export const ValidatePasswordField = (password) => {
  return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
};
