import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import router from "next/router";

const Form = styled.form``;

const InputText = styled.input`
  border: 1px solid var(--gray-optional);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/search.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() == "") {
      return;
    }

    router.push({
      pathname: "/search",
      query: { q: searchTerm },
    });
  };
  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={handleSubmit}
    >
      <InputText
        type="text"
        name="searchTerm"
        id="searchTerm"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products"
      />
      <InputSubmit type="submit">Search</InputSubmit>
    </form>
  );
};

export default Search;
