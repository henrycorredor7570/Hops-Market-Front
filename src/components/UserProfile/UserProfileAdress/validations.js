const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const numberRegex = /^(?:[0-9]|[1-9][0-9]{1,2}|1000)/;
const wordRegex = /^[A-Za-z\u00C0-\u024F\s]+$/;

function validation(input) {
  let errors = {};

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

function isButtonDisabled(errors) {
    return Object.values(errors).some((value) => value === true);
  }

export { validation, isButtonDisabled };
