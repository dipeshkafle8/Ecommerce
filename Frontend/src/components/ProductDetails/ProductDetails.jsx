import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";
import axios from "axios";
import { Button } from "../ui/button";
import SimilarProducts from "./SimilarProducts";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import ProductDescription from "./ProductDescription";

const ProductDetails = () => {
  const { slug } = useParams();
  const { cart, addToCart, updateCartItem, deleteFromCart } =
    useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await axios.get(
          `https://ecommerce-xw87.onrender.com/api/v1/products/getParticularProduct/${slug}`
        );

        if (response.data.status === 1) {
          setProduct(response.data.product);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log("Error in fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  const handleAddToCart = (id, product) => {
    addToCart({ id, product });
  };
  const handleOnDecrement = (id, itemsInCart) => {
    let itemsCount = itemsInCart - 1;
    if (itemsCount === 0) {
      deleteFromCart({ id });
      return;
    }
    updateCartItem({ id, itemsCount });
  };

  const handleOnIncrement = (id, itemsInCart) => {
    let itemsCount = itemsInCart + 1;
    updateCartItem({ id, itemsCount });
  };

  if (isLoading) {
    return <div className="mt-32">Product fetching from backend....</div>;
  }

  const cartItem = cart.find((item) => item.product._id === product._id);

  const itemCount = cartItem ? cartItem.itemsCount : 0;

  return (
    <>
      <div className="mt-14 flex flex-col p-8 gap-y-4 md:flex-row md:justify-evenly">
        <div className="flex flex-col gap-y-8">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-[25rem]"
          />
          {itemCount > 0 ? (
            <div className="flex w-full p-2 mr-4 border-2 justify-center gap-x-4">
              <button
                onClick={(e) => {
                  handleOnDecrement(product._id, itemCount);
                }}
              >
                <Minus className="w-[1.30rem] mr-2 " />
              </button>
              <span className="font-semibold text-xl">{` ${itemCount} `} </span>
              <button
                onClick={(e) => {
                  handleOnIncrement(product._id, itemCount);
                }}
              >
                <Plus className="w-[1.30rem] ml-2 " />
              </button>
            </div>
          ) : (
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                handleAddToCart(product._id, product);
              }}
            >
              <ShoppingCart /> Add to Cart
            </Button>
          )}
        </div>
        <ProductDescription product={product} />
      </div>
      <SimilarProducts
        category={product.category._id}
        productId={product._id}
      />
    </>
  );
};

export default ProductDetails;
