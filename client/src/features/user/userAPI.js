import axios from "axios";
axios.defaults.withCredentials = true; // Include credentials in requests

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/orders/user`);
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

export function addAddressToUser(address) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/address",
        address,
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

export function updateAddress(updatedDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      const { updatedAddress, addressId } = updatedDetails;
      console.log("updatedAddress", updatedAddress, "addressId", addressId);
      const response = await axios.patch(
        `http://localhost:8000/users/address/${addressId}`,
        updatedAddress,
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

export function deleteAddress(addressId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/users/address/${addressId}`
      );
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}
