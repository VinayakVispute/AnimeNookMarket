export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  //filter = {"category":["smartphone","laptop"]}
  //sort  ={_sort:"price","_order"="desc"}
  let queryString = "";
  for (let key in filter) {
    const categoriesValues = filter[key];
    if (categoriesValues.length > 0) {
      const lastCategoryValue = categoriesValues[categoriesValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(
      "http://localhost:8000/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data });
  });
}

// resolve({ data: { products: data, totalItems: totalItems } });
