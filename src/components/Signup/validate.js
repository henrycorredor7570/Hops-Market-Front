const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
const numberRegex = /^[1-9]\d{9}$/;
const wordRegex = /^[A-Za-z\s]+$/;
const postalCodeRegex = /^\d{4,8}$/;

function validate(input) {
  const errors = {};

  if (input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
  }

  if (
    input.lastName &&
    (!wordRegex.test(input.lastName) || input.lastName.length < 2)
  ) {
    errors.lastName = true;
  }

  if (input.email && !emailRegex.test(input.email)) {
    errors.email = true;
  }

  if (
    input.phone &&
    (!numberRegex.test(input.phone) || input.phone.length != 10)
  ) {
    errors.phone = true;
  }

  if (input.password && !passwordRegex.test(input.password)) {
    errors.password = true;
  }

  if (input.address && input.address.length < 5) {
    errors.address = true;
  }

  if (
    input.country &&
    (!wordRegex.test(input.country) || input.country.length < 4)
  ) {
    errors.country = true;
  }

  if (input.city && (!wordRegex.test(input.city) || input.city.length < 4)) {
    errors.city = true;
  }

  if (input.postalCode && !postalCodeRegex.test(input.postalCode)) {
    errors.postalCode = true;
  }

  return errors;
}

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    !input.name ||
    !input.lastName ||
    !input.email ||
    !input.address ||
    !input.phone ||
    !input.password ||
    !input.country ||
    !input.city ||
    !input.postalCode
  );
}

export { validate, isButtonDisabled };
