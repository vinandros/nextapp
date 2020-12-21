import React, { useEffect, useState } from "react";

const useValidation = (initialState, validationFn, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length == 0;
      if (noErrors) {
        fn();
      }
      setSubmitForm(false);
    }
    return () => {};
  }, [errors]);

  // handleChange function
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationFn(values);
    setErrors(validationErrors);
  };

  const handleBlur = () => {
    const validationErrors = validationFn(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setSubmitForm,
  };
};

export default useValidation;
