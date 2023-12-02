const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getAllOrdersOfUser,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders).get("/user", getAllOrdersOfUser);
router.patch("/:orderId", updateOrderStatus);

module.exports = router;
