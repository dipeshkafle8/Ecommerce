import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProductCard = ({ product, itemCount }) => {
  const { addToCart, updateCartItem, deleteFromCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async (id, product) => {
    setIsLoading(true);
    setSelectedProduct(id);
    await addToCart({ id, product });
    setIsLoading(false);
  };
  const handleOnDecrement = async (id, itemsInCart) => {
    setIsLoading(true);
    setSelectedProduct(id);
    let itemsCount = itemsInCart - 1;
    if (itemsCount === 0) {
      await deleteFromCart({ id });
      setIsLoading(false);
      return;
    }
    await updateCartItem({ id, itemsCount });
    setIsLoading(false);
  };

  const handleOnIncrement = async (id, itemsInCart) => {
    setIsLoading(true);
    setSelectedProduct(id);
    let itemsCount = itemsInCart + 1;
    await updateCartItem({ id, itemsCount });
    setIsLoading(false);
  };

  return (
    <>
      <div
        key={product._id}
        className="flex flex-col justify-center items-center shadow-lg max-w-sm p-4 hover:shadow-2xl hover:cursor-pointer rounded-lg"
      >
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-[18rem]"
          />
        </Link>
        <h1 className="text-xl font-semibold text-center">{product.name}</h1>
        <h2 className="text-lg m-2">INR: Rs{product.price}</h2>
        <div className="flex justify-between">
          {/* if present in cart don't show add to Cart option instead show number of items along with inc dec buttons */}
          {itemCount > 0 ? (
            <span className="flex items-center justify-center  p-2 w-20 mr-4">
              <button
                onClick={(e) => {
                  handleOnDecrement(product._id, itemCount);
                }}
              >
                <Minus className="w-[1.12rem] mr-2 text-[#5d5b5b] hover:text-black" />
              </button>
              {isLoading && selectedProduct === product._id ? (
                <ClipLoader size={12} />
              ) : (
                <span className="font-semibold">{` ${itemCount} `} </span>
              )}
              <button
                onClick={(e) => {
                  handleOnIncrement(product._id, itemCount);
                }}
              >
                <Plus className="w-[1.12rem] ml-2 text-[#5d5b5b] hover:text-black" />
              </button>
            </span>
          ) : (
            <button
              onClick={(e) => {
                handleAddToCart(product._id, product);
              }}
              className="ml-2 mr-2 px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md"
            >
              {isLoading && selectedProduct === product._id ? (
                <ClipLoader color="white" size={20} />
              ) : (
                <span>
                  Add to <ShoppingCart className="inline-block" />
                </span>
              )}
            </button>
          )}

          <button className="ml-2 mr-2 px-6 py-2 bg-[#2424ed] text-white hover:bg-[#20204a] rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
