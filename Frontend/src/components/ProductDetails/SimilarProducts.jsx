import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { CircleArrowDown } from "lucide-react";

const SimilarProducts = ({ category, productId }) => {
  //productId is taken because in similar products we want to exclude it
  const { cart } = useContext(CartContext);
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
        if (response.data.status === 1) {
          setProducts(response.data.products);
        } else {
          console.log(response.data.msg);
        }
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

  //for displaying similar products
  return (
    <>
      <div className="flex flex-col  p-2">
        <div className="w-full text-3xl font-semibold text-center border-y-2 p-2 text-[#7e7d7d]">
          <span>
            Similar Products{" "}
            <CircleArrowDown className="inline-block text-blue-800" size={35} />
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly">
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
                product={product}
                itemCount={itemCount}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
