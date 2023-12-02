const Cart = require("../models/CartModel");

const createCart = async (req, res) => {
  try {
    const user = req.user.id;
    const { quantity, product } = req.body;

    const CartItems = new Cart({ quantity, user, product });
    const newCartItems = await CartItems.save();
    const cart = await newCartItems.populate({
      path: "product",
      populate: {
        path: "category brand",
        select: "-__v -value -createdAt -updatedAt",
      },
    });

    // Populate the 'user' and 'product' fields
    // await newCartItems

    return res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      cart: null,
    });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const user = req.user.id;
    const cart = await Cart.find({ user }).populate({
      path: "product",
      populate: {
        path: "category brand",
        select: "-__v -value -createdAt -updatedAt",
      },
    });
    if (Array.isArray(cart) && cart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart Items not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const updatedCartData = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(cartId, updatedCartData, {
      new: true,
    }).populate({
      path: "product",
      populate: {
        path: "category brand",
        select: "-__v -value -createdAt -updatedAt",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId).populate({
      path: "product",
      populate: {
        path: "category brand",
        select: "-__v -value -createdAt -updatedAt",
      },
    });
    if (!deletedCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      data: deletedCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetCardByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Items not found",
      });
    }
    for (let item of cart) {
      await deleteCardById(item.id);
    }
    return res.status(200).json({
      success: true,
      message: "Cart reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCart,
  getCartByUserId,
  updateCartById,
  deleteCardById,
  resetCardByUserId,
};
