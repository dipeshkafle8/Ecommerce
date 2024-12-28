const { Cart } = require("../model/cartSchema");

//to get cartItems when application loads
const getCartItems = async (req, res) => {
  let { userId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ status: 0, msg: "Cart not found" });
    }
    res
      .status(200)
      .json({
        status: 1,
        msg: "Cart fetched Sucessfully",
        cart: cart.cartItems,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 0, msg: "Error in getting Cart Details" });
  }
};

// to add products to the cart
const addToCart = async (req, res) => {
  let { userId, productId, product } = req.body;
  try {
    let cart = await Cart.findOne({ user: userId });
    //if there doesn't exist cart for the user create it
    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }
    //if there already exists the product that we are adding
    const cartItem = cart.cartItems.find(
      (item) => item.product._id === productId
    );
    if (cartItem) {
      //it will modify to te cart as well because it is a reference
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
