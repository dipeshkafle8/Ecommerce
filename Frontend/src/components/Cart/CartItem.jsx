import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
const CartItem = ({
  product,
  itemsCount,
  onDecrease,
  onIncrease,
  onDelete,
}) => {
  const { _id, name, price, images } = product;
  return (
    <>
      <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
        <div className="flex-shrink-0 w-16 h-16 relative">
          <img src={images[0]} alt={name} />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">INR:{price.toFixed(2)} each</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDecrease(_id, itemsCount)}
            disabled={itemsCount === 1}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{itemsCount}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onIncrease(_id, itemsCount)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <p className="font-semibold text-lg">
            {(price * itemsCount).toFixed(2)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete({ id: _id })}
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
