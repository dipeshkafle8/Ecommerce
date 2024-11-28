import { useState, useEffect } from "react";

import fetchDataFromAPI from "../fetchDataFromAPI";
function DisplayFamousProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [allFamousProducts, setAllFamousProducts] = useState([]);
  useEffect(() => {
    let data = async () => {
      try {
        let result = await fetchDataFromAPI(
          "http://localhost:3000/api/v1/products/get-famousProducts"
        );

        if (result.status) {
          console.log(result.responseData.products);
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
            return (
              <div
                key={`${product._id} famous`}
                className=" flex flex-col justify-center items-center shadow-lg max-w-sm p-4 hover:shadow-2xl hover:cursor-pointer rounded-lg"
              >
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-60 h-64"
                />
                <h1 className="text-xl font-semibold text-center">
                  {product.name}
                </h1>
                <h2 className="text-lg m-2">INR: Rs{product.price}</h2>
                <div className="flex justify-between">
                  <button className="ml-2 mr-2 px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md">
                    Add to Cart
                  </button>
                  <button className="ml-2 mr-2 px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md">
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DisplayFamousProduct;
