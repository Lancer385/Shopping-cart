async function fetchItems(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error, Status Code: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}

export const getItems = () => fetchItems("https://dummyjson.com/products");
