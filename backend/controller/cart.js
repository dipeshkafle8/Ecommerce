const { Cart } = require("../model/cartSchema");

const getCartItems = async (req, res) => {
  console.log("Request recieving from frontend");
  res.status(200);
};
const addToCart = async (req, res) => {
  let { userId, productId, product } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }
    const cartItem = cart.cartItems.find(
      (item) => item.product._id === productId
    );
    if (cartItem) {
      cartItem.itemsCount += 1;
    } else {
      cart.cartItems.push({ product, itemsCount: 1 });
    }
    await cart.save();
    res.status(200).json({ status: 1, msg: "Items Added to Cart" });
  } catch (err) {
    res.status(500).json({ status: 0, msg: "Error adding to Cart" });
  }
};
const updateCartItem = async (req, res) => {};
const deleteFromCart = async (req, res) => {};

const clearCart = async (req, res) => {};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteFromCart,
  clearCart,
};
