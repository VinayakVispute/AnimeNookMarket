export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
