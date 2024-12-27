import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "./cartReducer";
import { UserContext } from "../Auth/AuthContext";

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
    }
    //if user is not logged In
    else {
      try {
        let updatedCart = [...state.cart];

        const index = updatedCart.findIndex((item) => item.product._id === id);
        if (index !== -1) {
          updatedCart[index].itemsCount += 1;
        } else {
          updatedCart = [
            ...updatedCart,
            { product: { ...product }, itemsCount: 1 },
          ];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch({ type: "ADD_TO_CART", payload: { id, product } });
      } catch (err) {
        console.log("Error in adding product in LocalStorage");
      }
    }
  };

  const deleteFromCart = ({ id }) => {
    try {
      let updatedCart = [...state.cart];
      updatedCart = updatedCart.filter((item) => item.product._id !== id);

      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({ type: "DELETE_FROM_CART", payload: { id } });
    } catch (err) {
      console.log("Error in deleting product from cart Local Storage");
    }
  };

  const updateCartItem = ({ id, itemsCount }) => {
    if (user) {
    } else {
      try {
        let updatedCart = [...state.cart];
        let index = updatedCart.findIndex((item) => item.product._id === id);
        updatedCart[index].itemsCount = itemsCount;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch({ type: "UPDATE_CART_ITEM", payload: { id, itemsCount } });
      } catch (err) {
        console.log("Error in updating data in LocalStorage");
      }
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
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
