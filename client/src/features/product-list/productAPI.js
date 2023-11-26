import axios from "axios";

export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/products", {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  let params = {};
  for (let key in filter) {
    const values = filter[key];

    if (values.length > 0) {
      params[key] = values;
    }
  }

  params = { ...params, ...sort, ...pagination };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/products", {
        params,
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/brands", {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/categories", {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost:8000/products/${id}`, {
        withCredentials: true,
      });
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createProduct(productData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/products",
        productData,
        {
          withCredentials: true,
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

export function updateProduct(updateProductData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/products/${updateProductData.id}`,
        updateProductData,
        {
          withCredentials: true,
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
