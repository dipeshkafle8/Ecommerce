import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchDataFromAPI from "../fetchDataFromAPI";
import FilteredProducts from "./FilterProducts";
import { CartContext } from "../Cart/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsInCart, setItemsInCart] = useState(0);
  const { category } = useParams();

  const { addToCart, cart } = useContext(CartContext);

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
  const handleAddToCart = async (id, product) => {
    await addToCart({ id, product });
    let index = cart.findIndex((item) => item._id == id);
    console.log(cart[index].quantity);
    setItemsInCart(() => cart[index].quantity);
  };

  if (isLoading) {
    console.log("Inside loading");
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
            return (
              <div
                key={product._id}
                className="flex flex-col justify-center items-center shadow-lg max-w-sm p-4 hover:shadow-2xl hover:cursor-pointer rounded-lg"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-[18rem]"
                />
                <h1 className="text-xl font-semibold text-center">
                  {product.name}
                </h1>
                <h2 className="text-lg m-2">INR: Rs{product.price}</h2>
                <div className="flex justify-between">
                  {itemsInCart ? (
                    <span>-{` ${itemsInCart} `} +</span>
                  ) : (
                    <button
                      onClick={() => {
                        handleAddToCart(product._id, product);
                      }}
                      className="ml-2 mr-2 px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md"
                    >
                      Add to Cart
                    </button>
                  )}

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
