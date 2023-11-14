export function fetchAllCountries() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/countries");
    const data = await response.json();
    resolve({ data });
  });
}
