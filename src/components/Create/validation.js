const numberRegex = /^(?:[0-9]|[1-9][0-9]{1,2}|1000)/;
const wordRegex = /^[A-Za-z\u00C0-\u024F\s]+$/;

function validation(input) {
  let errors = {};

  if (input.name && (!wordRegex.test(input.name) || input.name.length < 2)) {
    errors.name = true;
  }

  if (
    input.description &&
    (input.description.length < 12 || input.description.length > 256)
  ) {
    errors.description = true;
  }

  if (
    input.country &&
    (!wordRegex.test(input.country) ||
      input.country.length < 2 ||
      input.country.length > 30)
  ) {
    errors.country = true;
  }

  if (
    input.price &&
    (!numberRegex.test(input.price) || parseFloat(input.price) <= 0)
  ) {
    errors.price = true;
  }

  if (
    input.stock &&
    (!numberRegex.test(input.stock) || input.stock <= 0 || input.stock > 1000)
  ) {
    errors.stock = true;
  }

  if (
    input.amountMl &&
    (!numberRegex.test(input.amountMl) ||
      input.amountMl <= 0 ||
      input.amountMl > 10000)
  ) {
    errors.amountMl = true;
  }

  if (
    input.alcoholContent &&
    (!numberRegex.test(input.alcoholContent) ||
      input.alcoholContent <= 0 ||
      input.alcoholContent > 10000)
  ) {
    errors.alcoholContent = true;
  }
  return errors;
}

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    !input.name ||
    !input.country ||
    !input.category ||
    !input.price ||
    !input.stock ||
    !input.amountMl ||
    !input.alcoholContent
  );
}

export { validation, isButtonDisabled };
