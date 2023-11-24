export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    // TODO : Server will filter deleted products

    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  //filter = {"category":["smartphone","laptop"]}
  //sort  ={_sort:"price","_order"="desc"}
  //paginator = {_page:1,_limit:10}
  //TODO : Server will be supporting mutiple filters and values
  // TODO : Server will filter deleted products in case of non admin
  console.log(filter);
  let queryString = "";
  for (let key in filter) {
    const values = filter[key];

    if (values.length > 0) {
      values.forEach((value) => {
        queryString += `${key}=${value}&`;
      });
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(
      "http://localhost:8000/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(updateProductData) {
  return new Promise(async (resolve) => {
    //TODO :we will not hard-code server URL Here
    const response = await fetch(
      `http://localhost:8000/products/${updateProductData.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateProductData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
