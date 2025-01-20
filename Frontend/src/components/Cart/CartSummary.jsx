import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const CartSummary = ({ subtotal, tax, total, onClearCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClearCart = async () => {
    setIsLoading(true);
    await onClearCart();
    setIsLoading(false);
  };
  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Button variant="default" className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleOnClearCart}
          >
            {isLoading ? <ClipLoader size={30} /> : <span>Clear Cart</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
