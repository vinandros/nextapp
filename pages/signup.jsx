import { css } from "@emotion/react";
import Router from "next/router";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Error,
  FormStyle,
  InputStyles,
  InputSubmit,
} from "../components/ui/Form";
import firebase from "../firebase";
import useValidation from "../hooks/useValidation";
import signupValidations from "../validation/signupValidations";

const initialState = { name: "", email: "", password: "" };

export default function Signup() {
  const [error, setError] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setSubmitForm,
  } = useValidation(initialState, signupValidations, signupAccount);

  const { name, email, password } = values;
  async function signupAccount() {
    try {
      await firebase.signup(name, email, password);
      Router.push("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >
        Signup
      </h1>
      <FormStyle onSubmit={handleSubmit} noValidate>
        <InputStyles error={errors.name ? true : false}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            onChange={handleChange}
            value={name}
            onBlur={handleBlur}
          />
        </InputStyles>
        {errors.name && <Error>{errors.name}</Error>}

        <InputStyles error={errors.email ? true : false}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            onChange={handleChange}
            value={email}
            onBlur={handleBlur}
          />
        </InputStyles>
        {errors.email && <Error>{errors.email}</Error>}
        <InputStyles error={errors.password ? true : false}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            onChange={handleChange}
            value={password}
            onBlur={handleBlur}
          />
        </InputStyles>
        {errors.password && <Error>{errors.password}</Error>}
        {error && <Error>{error}</Error>}
        <InputSubmit onClick={setSubmitForm} type="submit" value="Signup" />
      </FormStyle>
    </Layout>
  );
}
