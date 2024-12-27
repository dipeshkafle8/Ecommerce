const initialState = {
  cart: [],
  total_item: 0,
  total_amount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload.cartItems,
      };
    case "ADD_TO_CART":
      //get id and product from payload
      const { id, product } = action.payload;
      //check if previously in cart or not
      const existingItem = state.cart.find((item) => item._id == id);
      if (existingItem) {
        const updatedCart = state.cart.map((item) => {
          return item._id == id
            ? { ...item, itemsCount: itemsCount.quantity + 1 }
            : item;
        });
        return { ...state, cart: updatedCart };
      } else {
        const newItem = { ...product, itemsCount: 1 };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case "DELETE_FROM_CART":
      return {
        ...state,
        cart: cart.filter((item) => action.payload.id != item._id),
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, itemsCount: action.payload.itemsCount }
            : item
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};
export default cartReducer;
