import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const NavStyle = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray-secondary);
    font-family: "PT Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      color: #494949;
    }
  }
`;

const Nav = () => {
  return (
    <NavStyle>
      <Link href="/">Home</Link>
      <Link href="/populars">Populars</Link>
      <Link href="/new-product">New Product</Link>
    </NavStyle>
  );
};

export default Nav;
