const Order = require("../models/OrderModel");

const createOrder = async (req, res) => {
  try {
    const orderDetails = req.body;
    const order = new Order(orderDetails);
    order.user = req.user.id;
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const user = req.user.id;
    const { _sort, _order, _page, _limit = 10, filter } = req.query;

    // Handle sorting
    const sortObj =
      _sort && _order ? { [_sort]: _order === "asc" ? 1 : -1 } : {};

    // Handle pagination
    const limitValue = parseInt(_limit);
    const skipValue = (_page - 1) * limitValue;

    // Handle filtering
    const filterObj = filter ? { status: filter } : {};
    console.log("filterObj", { ...filterObj });
    console.log("sortObj", sortObj);
    const orders = await Order.find({ ...filterObj })
      .sort(sortObj)
      .skip(skipValue)
      .limit(limitValue);

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No orders found",
        data: { orders: [], totalOrders: 0 },
      });
    }

    // Get the total count of documents
    const totalItems = await Order.countDocuments({ ...filterObj });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: { orders, totalOrders: totalItems },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: { orders: null, totalOrders: 0 },
    });
  }
};

const getAllOrdersOfUser = async (req, res) => {
  try {
    const user = req.user.id;

    // Handle filtering
    const orders = await Order.find({ user: user });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No orders found",
        data: { orders: [], totalOrders: 0 },
      });
    }

    // Get the total count of documents
    const totalItems = await Order.countDocuments({ user: user });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: { orders, totalOrders: totalItems },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: { orders: null, totalOrders: 0 },
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log("orderId", orderId, "status", status);
    const order = await Order.findByIdAndUpdate(
      { _id: orderId },
      { status: status },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  updateOrderStatus,
  getAllOrders,
  createOrder,
  getAllOrdersOfUser,
};
