import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "./cartReducer";
import { UserContext } from "../Auth/AuthContext";
import axios from "axios";

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
    const fetchCartItems = async () => {
      if (user) {
        try {
          let token = localStorage.getItem("token");
          token = JSON.parse(token);
          if (token) {
            let response = await axios.post(
              "http://localhost:3000/api/v1/cart/getCartItems",
              {
                userId: user._id,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            //if response is successful
            if (response.data.status === 1) {
              const cartItems = response.data.cart;
              dispatch({ type: "LOAD_CART", payload: { cartItems } });
            } else {
              console.log(response.data.msg);
            }
          } else {
            console.log("token is not provided");
          }
        } catch (err) {
          console.log("Error in getting data");
        }
      } else {
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        if (cartItems) {
          dispatch({ type: "LOAD_CART", payload: { cartItems } });
        }
      }
    };
    fetchCartItems();
  }, [user]);

  const addToCart = async ({ id, product }) => {
    //if user is logged in
    if (user) {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      if (token) {
        try {
          let response = await axios.post(
            "http://localhost:3000/api/v1/cart/addToCart",
            {
              userId: user._id,
              productId: id,
              product: product,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.status === 1) {
            dispatch({ type: "ADD_TO_CART", payload: { id, product } });
          } else {
            console.log(response.data.msg);
          }
        } catch (err) {
          console.log("Error in adding to the Cart to Backend");
        }
      } else {
        console.log("Token is not provided while adding to Cart");
      }
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
