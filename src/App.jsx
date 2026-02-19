import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
import { getItems } from "./Api/fetchCart";
import { useState, useEffect } from "react";

function App() {
    const [items, setItems] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const loadProducts = async () =>{
            const products = await getItems();
            if (isMounted){
                setItems(products.products)
            };
        };
        loadProducts()
        return () =>{
            isMounted = false;
        };
    }, []);

  return (
    <>
      <Header />
      <Outlet context={[items]}/>
      <Footer />
    </>
  )
}

export default App
