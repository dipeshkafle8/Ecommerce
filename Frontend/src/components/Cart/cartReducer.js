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

      let updatedCart = [...state.cart];

      let index = updatedCart.findIndex((item) => item.product._id === id);
      if (index !== -1) {
        updatedCart[index].itemsCount += 1;
      } else {
        updatedCart = [
          ...updatedCart,
          { product: { ...product }, itemsCount: 1 },
        ];
      }
      return { ...state, cart: updatedCart };
      break;
    case "DELETE_FROM_CART":
      let newCart = [...state.cart];
      console.log(newCart);
      newCart = newCart.filter(
        (item) => action.payload.id !== item.product._id
      );
      console.log(newCart);
      return { ...state, cart: newCart };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product._id === action.payload.id
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
