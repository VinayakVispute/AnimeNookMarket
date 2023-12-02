import axios from "axios";
axios.defaults.withCredentials = true; // Include credentials in requests

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/orders", order, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
  P;
}

export function fetchAllOrders(sort, pagination, filter) {
  let params = { ...sort, ...pagination, ...filter };
  console.log(params);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/orders", {
        params,
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
      });
      resolve({ data: response.data });
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
}

export function updateOrderStatus(order) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("order", order);
      const { orderId, status } = order;
      console.log("orderId", orderId, "status", status);

      const response = await axios.patch(
        `http://localhost:8000/orders/${orderId}`,
        { status },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      resolve({ data: response.data });
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
}
