import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import { Link } from "react-router-dom";
const ProductCard = ({ product, itemCount }) => {
  const { addToCart, updateCartItem, deleteFromCart } = useContext(CartContext);

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
              <span className="font-semibold">{` ${itemCount} `} </span>
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
              Add to <ShoppingCart className="inline-block" />
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
