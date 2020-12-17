import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import {
  Error,
  FormStyle,
  InputStyles,
  InputSubmit,
} from "../components/ui/Form";
import useValidation from "../hooks/useValidation";
import signupValidation from "../validation/signupRules";

const initialState = { name: "", email: "", password: "" };

export default function Signup() {
  const signupAccount = () => {
    console.log("registration");
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(initialState, signupValidation, signupAccount);

  const { name, email, password } = values;

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
        <InputSubmit type="submit" value="Signup" />
      </FormStyle>
    </Layout>
  );
}
