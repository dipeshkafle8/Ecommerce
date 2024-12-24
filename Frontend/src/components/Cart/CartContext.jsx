import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "./CartReducer";
import { UserContext } from "../Auth/AuthContext";
import { stringify } from "postcss";

export const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: 0,
  total_amount: 0,
};

export const CartProvider = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    if (user) {
    } else {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (cartItems) {
        dispatch({ type: "LOAD_CART", payload: { cartItems } });
      }
    }
  }, []);

  const addToCart = ({ id, product }) => {
    if (user) {
    } else {
      let cartItems = localStorage.getItem("cart");
      cartItems = JSON.parse(cartItems);
      if (cartItems) {
        cartItems = cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log(cartItems);
      } else {
        cartItems = [{ ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    dispatch({ type: "ADD_TO_CART", payload: { id, product } });
  };

  const deleteFromCart = ({ id }) => {
    dispatch({ type: "DELETE_FROM_CART", payload: { id } });
  };

  const updateCartItem = ({ id, quantity }) => {
    dispatch({ type: "UPDATE_CART_ITEM", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, deleteFromCart, updateCartItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
