import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Link from "next/link";

const Product = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--gray-optional);
`;

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid var(--gray-optional);
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Img = styled.img`
  width: 200px;
`;

const Likes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid var(--gray-optional);
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ProductDetails = ({ product }) => {
  const { id, comments, createdAt, description, image, likes, name } = product;
  return (
    <Product>
      <ProductDescription>
        <div>
          <Img src={image} alt="" />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <Title>{name}</Title>
          </Link>
          <Description>{description}</Description>
          <Comments>
            <div>
              <img src="/static/img/comment.png" alt="alternative text" />
              <p>{comments.length} Comments</p>
            </div>
          </Comments>
          <p>Published {formatDistanceToNow(new Date(createdAt))} ago. </p>
        </div>
      </ProductDescription>
      <Likes>
        <div>&#9650;</div>
        <p>{likes}</p>
      </Likes>
    </Product>
  );
};

export default ProductDetails;
