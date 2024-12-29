import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ShoppingBag } from "lucide-react";
const DisplayCartItem = () => {
  const { cart, updateCartItem, deleteFromCart, clearCart } =
    useContext(CartContext);
  const handleOnIncrement = (id, itemsInCart) => {
    let itemsCount = itemsInCart + 1;
    updateCartItem({ id, itemsCount });
  };
  const handleOnDecrement = (id, itemsInCart) => {
    let itemsCount = itemsInCart - 1;
    if (itemsCount === 0) {
      deleteFromCart({ id });
      return;
    }
    updateCartItem({ id, itemsCount });
  };

  const total_products = cart.length;
  const total_price = cart.reduce(
    (total, item) => total + item.product.price * item.itemsCount,
    0
  );

  return (
    <>
      <div className=" mt-12 container mx-auto px-4 py-8">
        <div className=" font-bold mb-8 flex items-center justify-between">
          <div className="flex">
            <ShoppingBag className="mr-2 h-8 w-8" />{" "}
            <span className="text-3xl">Your Shopping Cart</span>
          </div>
          <span className="mr-8">Total Products : {total_products}</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              {cart.map((item) => (
                <CartItem
                  key={item.product._id}
                  product={item.product}
                  itemsCount={item.itemsCount}
                  onIncrease={handleOnIncrement}
                  onDecrease={handleOnDecrement}
                  onDelete={deleteFromCart}
                />
              ))}
            </div>
            <div className="md:col-span-1">
              <CartSummary
                subtotal={total_price}
                tax={34}
                total={total_price + 34}
                onClearCart={clearCart}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayCartItem;
