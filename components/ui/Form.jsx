import styled from "@emotion/styled";

export const FormStyle = styled.form`
  max-width: 550px;
  width: 95%;
  margin: 5rem auto 0 auto;
  display: flex;
  flex-direction: column;
`;

export const InputStyles = styled.div`
  margin-bottom: ${(props) => (props.error ? "0.5rem" : "2rem")};
  display: flex;
  align-items: center;
  label {
    flex: 0 0 100px;
    font-size: 1.8rem;
  }

  input {
    flex: 1;
    padding: 1rem;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--orange);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  border: none;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background-color: var(--orange-hover);
  }
`;

export const Error = styled.p`
  /* background-color: red; */
  padding: 0rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #fff;
  text-align: right;
  color: red;
  /* text-transform: uppercase; */
  margin: 0 0 1rem 0;
  width: auto;
  align-self: flex-end;
`;
