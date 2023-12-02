export const ITEMS_PER_PAGE = 10;

export function discountedPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}

export const formatOrderDate = (createdAt) => {
  const orderDate = new Date(createdAt);
  return orderDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
