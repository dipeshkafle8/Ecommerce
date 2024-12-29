import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import fetchDataFromAPI from "../fetchDataFromAPI";
import FilteredProducts from "./FilterProducts";
import { CartContext } from "../Cart/CartContext";
import ProductCard from "../ProductCard/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  const { cart } = useContext(CartContext);

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
      <div className="mt-24 flex flex-col md:flex-row">
        <FilteredProducts
          products={products}
          setProducts={setProducts}
          setIsLoading={setIsLoading}
        />
        <div className="ml-8 flex w-full flex-1 flex-wrap gap-x-4 gap-y-4 justify-evenly">
          {products.map((product) => {
            const cartItem = cart.find(
              (item) => item.product._id === product._id
            );
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
      </div>
    </>
  );
}
export default Products;
