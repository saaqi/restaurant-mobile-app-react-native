export const ValidatePhoneNumberField = (phoneNumber) => {
  return phoneNumber.match(/^(?:\+1\s?)?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/);
};