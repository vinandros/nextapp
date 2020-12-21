import React, { useState, useEffect, useContext } from "react";
import { FireBaseContext } from "../firebase";

const useProducts = (order) => {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FireBaseContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const requestProducts = () => {
      firebase.db
        .collection("products")
        .orderBy(order, "desc")
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

  return {
    products,
    loading,
  };
};

export default useProducts;
