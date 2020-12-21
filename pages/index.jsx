import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import { FireBaseContext } from "../firebase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FireBaseContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const requestProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("createdAt", "desc")
        .onSnapshot(handleSnapshot);
      setLoading(false);
    };

    requestProducts();
  }, []);

  function handleSnapshot(snapShot) {
    const products = snapShot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProducts(products);
  }

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
