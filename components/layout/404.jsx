import { css } from "@emotion/react";
import React from "react";

const Error404 = () => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      Page not Found
    </h1>
  );
};

export default Error404;
