import React from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Search from "../ui/Search";
import Nav from "./Nav";
import Buttom from "../ui/Buttom";

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const user = false;
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray-optional);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Search />
          <Nav />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola Vin Andros
              </p>
              <Buttom bgColor="true">Logout</Buttom>
            </>
          ) : (
            <>
              <Link href="/login">
                <Buttom bgColor="true">Login</Buttom>
              </Link>
              <Link href="/signup">
                <Buttom> Signup</Buttom>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
