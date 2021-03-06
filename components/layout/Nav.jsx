import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { FireBaseContext } from "../../firebase";

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
  const { user } = useContext(FireBaseContext);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(false);
  }, []);
  return (
    <NavStyle>
      {loading ? null : (
        <>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/populars">
            <a>Populars</a>
          </Link>

          {user && (
            <Link href="/new-product">
              <a>New Product</a>
            </Link>
          )}
        </>
      )}
    </NavStyle>
  );
};

export default Nav;
