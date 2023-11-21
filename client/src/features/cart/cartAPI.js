export function addTOCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    //TODO: On Server it will only return some of the relevant data only  (Not Password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(`http://localhost:8000/cart?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(`http://localhost:8000/cart/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function deleteItemsfromCart(productId) {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(`http://localhost:8000/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: productId } });
  });
}

export function resetCart(userId) {
  //get all cart items of a user
  //delete all cart items of a user by for loop
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetchItemsByUserId(userId);
    const userCartItems = response.data;
    console.log("userCartItems", userCartItems);
    for (let item of userCartItems) {
      await deleteItemsfromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
