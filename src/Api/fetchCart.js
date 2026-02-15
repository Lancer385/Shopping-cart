async function fetchData(url){
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP Error, Status Code: ${response.status}`)
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch failed:", error.message)
    }
}


export const getItems =  () => fetchData('https://fakestoreapi.com/products');