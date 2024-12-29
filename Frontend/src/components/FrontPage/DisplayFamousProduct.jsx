import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import ProductCard from "../ProductCard/ProductCard";

import fetchDataFromAPI from "../fetchDataFromAPI";
function DisplayFamousProduct() {
  const { cart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allFamousProducts, setAllFamousProducts] = useState([]);
  useEffect(() => {
    let data = async () => {
      try {
        let result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/products/get-famousProducts"
        );

        if (result.status) {
          setAllFamousProducts(result.responseData.products);
        }
      } catch (err) {
        console.log("Error in getting products");
      } finally {
        setIsLoading(false);
      }
    };
    data();
  }, []);
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <div className="flex flex-col mt-8 text-center">
        <h1 className="text-[2rem] font-bold text-[#939191] m-4 mb-8">
          Trending Products
        </h1>

        <div className="ml-8 flex w-full flex-1 flex-wrap gap-x-4 gap-y-4 justify-evenly">
          {allFamousProducts.map((product) => {
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

export default DisplayFamousProduct;
