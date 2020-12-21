import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

export default function Populars() {
  const { loading, products } = useProducts("likes");

  // Loading============================================================
  if (products.length === 0 && loading) {
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
  return (
    <Layout>
      <div className="list-products">
        <div className="container">
          <ul className="bg-white">
            {products && !loading
              ? products.map((product) => {
                  return <ProductDetails key={product.id} product={product} />;
                })
              : null}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
