const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;

const validate = (input) => {
  let errors = {};

  if (input.email && !emailRegex.test(input.email)) {
    errors.email = true;
  }

  if (input.password && !passwordRegex.test(input.password)) {
    errors.password = true;
  }

  return errors;
};

function isButtonDisabled(errors, input) {
  return (
    Object.values(errors).some((value) => value === true) ||
    !input.email ||
    !input.password
  );
}

export { validate, isButtonDisabled };
