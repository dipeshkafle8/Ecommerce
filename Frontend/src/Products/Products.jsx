import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchDataFromAPI from "./fetchDataFromAPI";

function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromAPI(
          "https://fakestoreapi.com/products"
        );
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex gap-x-4">
        <div className="filter-section">
          <h1>filtering section</h1>
          <select placeholder="Select">
            <input type="checkbox" />a
            <input type="checkbox" />b
          </select>
        </div>
        <div>
          <div>
            <h1>ALL Products</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default Products;
