import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import { FireBaseContext } from "../firebase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FireBaseContext);
  useEffect(() => {
    const requestProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("createdAt", "desc")
        .onSnapshot(handleSnapshot);
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
    console.log(products);
    setProducts(products);
  }
  return (
    <Layout>
      <div className="list-products">
        <div className="container">
          <ul className="bg-white">
            {products.map((product) => {
              return <ProductDetails key={product.id} product={product} />;
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
