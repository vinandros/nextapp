export default function loginValidations(values) {
  let errros = {};

  if (values.email === "") {
    errros.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errros.email = "Invalid email";
  }

  if (values.password === "") {
    errros.password = "Password is Required";
  } else if (values.password.length < 6) {
    errros.password = "Invalid password, add at least 6 caracters";
  }

  return errros;
}
