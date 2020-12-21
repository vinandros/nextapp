import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

export default function Search() {
  const [result, setResult] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { loading, products } = useProducts("createdAt");

  useEffect(() => {
    if (q && products) {
      const search = q.toLowerCase();
      const filter = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      });
      if (filter.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setResult(filter);
      }
    }
  }, [q, products]);

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

  if (noResults) {
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
          No results ;(
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="list-products">
        <div className="container">
          <ul className="bg-white">
            {result && !loading
              ? result.map((product) => {
                  return <ProductDetails key={product.id} product={product} />;
                })
              : null}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
