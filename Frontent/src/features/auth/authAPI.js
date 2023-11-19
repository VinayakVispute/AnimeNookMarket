export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      body: JSON.stringify(userData),
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

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const { email, password } = loginInfo;
    const response = await fetch(`http://localhost:8000/user?email=${email}`);

    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Email or password is incorrect" });
      }
    } else {
      reject({ message: "Something went wrong" });
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    //TODO :On Server we will remove the session info

    resolve({ data: "success" });
  });
}
