import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import fetchDataFromAPI from "../fetchDataFromAPI";
import { CartContext } from "../Cart/CartContext";
import ProductCard from "../ProductCard/ProductCard";

function Products({ filterButton, filterData }) {
  //if came through search bar get the query from there
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (filterButton !== 0) {
      const fetchFilteredData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/products/filter",
            filterData
          );
          if (response.data.status) {
            setProducts(response.data.products);
          } else {
            console.log(response.data.msg);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchFilteredData();
    }
  }, [filterButton]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (!category) {
          data = await fetchDataFromAPI(
            "http://localhost:3000/api/v1/products/getProducts"
          );
        } else {
          data = await fetchDataFromAPI(
            `http://localhost:3000/api/v1/products/getProducts?category=${category}`
          );
        }

        if (data.status) {
          setProducts(data.responseData.products);
        }
      } catch (error) {
        console.log("Error in getting products from backend");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //first time addding to the cart

  if (isLoading) {
    return <div className="mt-28 text-center">Loading ...</div>;
  }

  return (
    <>
      <div className="ml-8 flex w-full flex-1 flex-wrap gap-x-4 gap-y-4 justify-evenly">
        {products.map((product) => {
          //if current product is present in cart or not
          const cartItem = cart.find(
            (item) => item.product._id === product._id
          );
          //if present get how many items are there
          const itemCount = cartItem ? cartItem.itemsCount : 0;
          return (
            <ProductCard
              key={product._id}
              itemCount={itemCount}
              product={product}
            />
          );
        })}
      </div>
    </>
  );
}
export default Products;
