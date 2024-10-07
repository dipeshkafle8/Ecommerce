import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchDataFromAPI from "./fetchDataFromAPI";

function Products() {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromAPI(
          "https://fakestoreapi.com/products"
        );
        console.log(data);
        setproducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);
  console.log(products);

  if (isLoading) {
    console.log("Inside loading");
    return <div className="mt-28 text-center">Loading ...</div>;
  }

  return (
    <>
      <div className="mt-24 flex flex-col md:flex-row">
        {/* <div className=" h-[5rem] w-[19rem] md:w-[20rem] md:h-[40rem] border-2 border-blue-500">
          This is filtering section
        </div> */}
        <div className="ml-8 flex w-full flex-1 flex-wrap gap-x-4 gap-y-4 justify-evenly">
          {products.map((product) => {
            return (
              <div
                key="product.id"
                className=" flex flex-col justify-center items-center shadow-lg max-w-sm p-4 hover:shadow-2xl hover:cursor-pointer rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-60 h-64"
                />
                <h1 className="text-xl font-semibold text-center">
                  {product.title}
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
export default Products;
