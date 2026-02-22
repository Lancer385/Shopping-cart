import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
import { getItems } from "./Api/fetchCart";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer";

function App() {
    const [items, setItems] = useState(null);
    const [cartItems, setCartItems] = useImmer({});
    
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
      <Header cartItems = {cartItems}/>
      <Outlet context={{
        items: items,
        cart: [cartItems, setCartItems] /* since we need the state for both the shop and the cart, we pass it as context here */
      }}/>
      <Footer />
    </>
  )
}

export default App
