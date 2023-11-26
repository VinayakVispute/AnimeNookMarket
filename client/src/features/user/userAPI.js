import axios from "axios";
axios.defaults.withCredentials = true; // Include credentials in requests

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/orders/?user.id=${userId}`
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/users/user");
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateUser(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/users/${update.id}`,
        update,
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
