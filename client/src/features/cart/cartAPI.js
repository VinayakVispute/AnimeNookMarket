import axios from "axios";
axios.defaults.withCredentials = true; // Include credentials in requests

export function addTOCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:8000/cart", item, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // TODO: On Server, it will only return some of the relevant data only (Not Password)
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: We will not hard-code the server URL here
      const response = await axios.get("http://localhost:8000/cart");
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: We will not hard-code the server URL here
      const { id, ...updatedCart } = update;
      console.log("id", id, "updatedCart", updatedCart);
      const response = await axios.patch(
        `http://localhost:8000/cart/${update.id}`,
        updatedCart,
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

export function deleteItemsfromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: We will not hard-code the server URL here
      const response = await axios.delete(
        `http://localhost:8000/cart/${itemId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      resolve({ data: { id: itemId } });
    } catch (error) {
      reject(error);
    }
  });
}

export function resetCart() {
  return new Promise(async (resolve, reject) => {
    try {
      // TODO: We will not hard-code the server URL here
      const response = await fetchItemsByUserId();
      console.log("response", response);
      const userCartItems = response.data?.data;
      console.log("userCartItems", userCartItems);
      for (let item of userCartItems) {
        await deleteItemsfromCart(item.id);
      }

      resolve({ status: "success" });
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
}
