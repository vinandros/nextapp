export default function newProductVaslidations(values) {
  let errors = {};

  if (values.name === "") {
    errors.name = "Name is required";
  }

  if (values.company === "") {
    errors.company = "Company name is required";
  }

  if (values.url === "") {
    errors.url = "Product's url is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Invalid url, please check format";
  }
  if (values.description === "") {
    errors.description = "Product's description is required";
  }

  return errors;
}
