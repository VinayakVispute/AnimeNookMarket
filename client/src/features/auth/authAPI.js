import axios from "axios";

export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/Register",
        userData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // TODO: On Server, it will only return some of the relevant data only (Not Password)
      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = loginInfo;
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      resolve({ data: response.data });
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    // TODO: On Server, we will remove the session info

    resolve({ data: "success" });
  });
}
