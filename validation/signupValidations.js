export default function signupValidation(values) {
  let errors = {};

  if (values.name === "") {
    errors.name = "Name is required";
  }

  if (values.email === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (values.password === "") {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Invalid password, add at least 6 caracters";
  }

  return errors;
}
