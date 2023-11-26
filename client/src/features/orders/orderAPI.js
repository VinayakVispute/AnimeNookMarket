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
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/orders", {
        params: sort,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const totalOrders = response.headers["x-total-count"];
      resolve({
        data: { orders: response.data, totalOrders: parseInt(totalOrders) },
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/orders/${order.id}`,
        order,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}
