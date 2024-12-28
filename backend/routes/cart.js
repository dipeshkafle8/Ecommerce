const express = require("express");
const { isValidUser } = require("../middelware/authenticateJWT");
const {
  getCartItems,
  addToCart,
  deleteFromCart,
  updateCartItem,
  clearCart,
} = require("../controller/cart");

const cartRouter = express.Router();
//to get cart Items
cartRouter.post("/getCartItems", isValidUser, getCartItems);
cartRouter.post("/addToCart", isValidUser, addToCart);
cartRouter.post("/deleteFromCart", isValidUser, deleteFromCart);
cartRouter.post("/clearCart", isValidUser, clearCart);

module.exports = { cartRouter };
