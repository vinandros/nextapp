import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import Buttom from "../../components/ui/Buttom";
import { InputStyles, InputSubmit } from "../../components/ui/Form";
import { FireBaseContext } from "../../firebase";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  color: white;
  background-color: var(--orange);
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Product = () => {
  // routing ============================================================
  const router = useRouter();
  const {
    query: { id },
  } = router;
  // state ============================================================
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({
    msg: "",
  });
  const {
    comments,
    createdAt,
    company,
    description,
    image,
    url,
    likes,
    name,
    createdBy,
    likedBy,
  } = product;
  // firebase ============================================================
  const { user, firebase } = useContext(FireBaseContext);

  useEffect(() => {
    const requestProduct = async () => {
      const productQuery = await firebase.db.collection("products").doc(id);
      const product = await productQuery.get();
      if (product.exists) {
        setProduct(product.data());
        setError(false);
      } else {
        setError(true);
      }
    };
    if (id) {
      requestProduct();
    }
    return requestProduct();
  }, [id]);

  // Update Likes============================================================
  const handleClickLike = () => {
    if (!user) {
      router.push("/");
    }

    const newLikes = likes + 1;
    if (likedBy.includes(user.uid)) {
      return;
    }

    const newLikedBy = [...likedBy, user.uid];
    setProduct({
      ...product,
      likes: newLikes,
    });

    firebase.db
      .collection("products")
      .doc(id)
      .update({ likes: newLikes, likedBy: newLikedBy });
  };

  //Comments ============================================================
  const isCreator = (id) => {
    if (createdBy.id === id) {
      return true;
    }
    return false;
  };
  const handleChangeComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/");
    }
    if (!comment.msg) {
      return;
    }

    comment.userID = user.uid;
    comment.displayName = user.displayName;

    const newComments = [...comments, comment];
    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: newComments });
    setProduct({
      ...product,
      comments: newComments,
    });
    setComment({
      ...comment,
      msg: "",
    });
  };
  // Delete Product============================================================
  const canDelete = () => {
    if (!user) {
      return false;
    }
    if (createdBy.id === user.uid) {
      return true;
    }
    return false;
  };

  const handleClickDeleteProduct = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (createdBy.id !== user.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //Erros ============================================================
  if (error) {
    return (
      <Layout>
        <Error404 />
      </Layout>
    );
  }
  // Loading============================================================
  if (Object.keys(product).length === 0) {
    return (
      <Layout>
        <p
          css={css`
            margin-top: 5rem;
            text-align: center;
            font-weight: 700;
            font-size: 3rem;
          `}
        >
          loading...
        </p>
      </Layout>
    );
  }
  //Main commponent ============================================================
  return (
    <Layout>
      <div className="container">
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          {name}
        </h1>
        <ProductContainer>
          <div>
            <p>Published {formatDistanceToNow(new Date(createdAt))} ago. </p>
            <p>
              By {createdBy.name} from {company}
            </p>
            <img src={image} alt="alternative text" />
            <p>{description}</p>

            {user ? (
              <>
                <h2>Leave a comment</h2>
                <form onSubmit={handleSubmitComment}>
                  <InputStyles>
                    <input
                      onChange={handleChangeComment}
                      type="text"
                      name="msg"
                      id="msg"
                      value={comment.msg}
                    />
                  </InputStyles>
                  <InputSubmit type="submit" value="Add comment" />
                </form>
              </>
            ) : null}

            <h2
              css={css`
                margin: 2rem 0;
              `}
            >
              Comments
            </h2>
            {comments.length === 0 ? (
              "No comments"
            ) : (
              <ul>
                {comments.map((comment, i) => {
                  if (isCreator(comment.userID)) {
                    return (
                      <li
                        css={css`
                          border: 1px solid var(--gray-optional);
                          padding: 2rem;
                        `}
                        key={`${comment.userID}-${i}`}
                      >
                        <p>{comment.msg}</p>
                        <p>
                          By{" "}
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {comment.displayName}
                          </span>{" "}
                        </p>
                        <ProductCreator>The creator</ProductCreator>
                      </li>
                    );
                  } else {
                    null;
                  }
                })}

                {comments.length !== 0
                  ? comments.map((comment, i) => {
                      if (isCreator(comment.userID)) {
                        return null;
                      }
                      return (
                        <li
                          css={css`
                            border: 1px solid var(--gray-optional);
                            padding: 2rem;
                          `}
                          key={`${comment.userID}-${i}`}
                        >
                          <p>{comment.msg}</p>
                          <p>
                            By{" "}
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {comment.displayName}
                            </span>{" "}
                          </p>
                          {isCreator(comment.userID) && (
                            <ProductCreator>The creator</ProductCreator>
                          )}
                        </li>
                      );
                    })
                  : null}
              </ul>
            )}
          </div>
          <aside>
            <Buttom target="_blank" bgColor="true" href={url}>
              Visit url
            </Buttom>

            <div
              css={css`
                margin-top: 5rem;
              `}
            >
              <p
                css={css`
                  text-align: center;
                `}
              >
                {likes} likes
              </p>
              {user ? (
                <Buttom onClick={handleClickLike}>give a like</Buttom>
              ) : null}
            </div>
          </aside>
        </ProductContainer>
        {canDelete() ? (
          <Buttom onClick={handleClickDeleteProduct}>Delete product</Buttom>
        ) : null}
      </div>
    </Layout>
  );
};

export default Product;
