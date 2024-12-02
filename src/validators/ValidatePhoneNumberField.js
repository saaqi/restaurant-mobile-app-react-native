export const ValidatePhoneNumberField = (phoneNumber) => {
  return phoneNumber.match(/(\+?1)?\s?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}\s*$/);
};