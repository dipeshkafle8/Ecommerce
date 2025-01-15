const { Cart } = require("../model/cartSchema");

//to get cartItems when application loads
const getCartItems = async (req, res) => {
  let { userId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ status: 0, msg: "Cart not found" });
    }

    res.status(200).json({
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

//while updating cart Item
const updateCartItem = async (req, res) => {
  let { userId, productId, updatedCount } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ status: 0, msg: "Cart doesn't exist" });
    }

    const cartItems = cart.cartItems.find(
      (item) => item.product._id === productId
    );

    if (cartItems) {
      cartItems.itemsCount = updatedCount;
      await cart.save();
      res.status(200).json({ status: 1, msg: "Product updated Sucessfully" });
    } else {
      res.status(404).json({ status: 0, msg: "Product not found in Cart" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, msg: "Error in updating cart in db" });
  }
};
const deleteFromCart = async (req, res) => {
  let { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ status: 0, msg: "Cart doesn't exists" });
    }
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product._id !== productId
    );
    await cart.save();
    res
      .status(200)
      .json({ status: 1, msg: "Item Sucessfully deleted From Cart" });
  } catch (err) {
    res.staus(500).json({ status: 0, msg: "Error in deletion on cart" });
  }
};

const clearCart = async (req, res) => {
  let { userId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(400).json({ status: 0, msg: "Cart doesn't found" });
    }
    cart.cartItems = [];
    await cart.save();
    res
      .status(200)
      .json({ status: 1, msg: "Cart has been successfully cleared" });
  } catch (err) {
    res.status(500).json({ status: 1, msg: "Unable to Clear Cart" });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteFromCart,
  clearCart,
};
