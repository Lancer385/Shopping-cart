import { useOutletContext } from "react-router-dom";
import Item from "./item";

function Shop(){
    const {items, cart} = useOutletContext();
    const [cartItems, setCartItems] = cart

    function handleCartChanges(arr){
        const id = arr[0]
        const count = arr[1]
        
        setCartItems(draft => {
            draft[id] = {count: count};
        })
    }

    return (
        items && /* if there are items, render them */
        <>
            {items.map((value) => (
                <Item 
                    value = {value}
                    key={value.id}
                    handleCartChanges= {handleCartChanges}
                />
            ))}
        </> || /* otherwise, show loading state if they are taking too long (items = null) */
        <>
            Loading...
        </>
    )
}

export default Shop;