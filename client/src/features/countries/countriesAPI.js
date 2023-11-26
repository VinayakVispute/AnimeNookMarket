import axios from "axios";
axios.defaults.withCredentials = true; // Include credentials in requests

export function fetchAllCountries() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/countries");
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}
