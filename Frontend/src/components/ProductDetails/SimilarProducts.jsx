import { useEffect, useState } from "react";
import axios from "axios";
const SimilarProducts = ({ category, productId }) => {
  //productId is taken because in similar products we want to exclude it
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "http://localhost:3000/api/v1/products/getSimilarProducts",
          {
            params: { category, productId },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log("Error in getting famous Products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isloading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <div>Similar Products</div>
    </>
  );
};

export default SimilarProducts;
