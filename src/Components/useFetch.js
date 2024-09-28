import { useEffect, useState } from "react";

const useFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return [products, loading, error];
};

export default useFetch;
