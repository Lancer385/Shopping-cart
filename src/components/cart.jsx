import { useOutletContext } from "react-router-dom";
import Item from "./item";

function Cart(){
    const {items, cart} = useOutletContext();
    const [cartItems, setCartItems] = cart

    function handleCartChanges(id){
        setCartItems(draft => {
            delete draft[id]
        })
    }

    return (
        !isEmpty(cartItems) &&
        <>
            {Object.keys(cartItems).map((key) => (
                <Item 
                    value = {items[key - 1]} // the cart object starts from 1 based on the id but the api structure starts from 0 so we just subtract 1
                    key={key}
                    initCount={cartItems[key].count}
                    handleCartChanges= {handleCartChanges}
                    cartItems={cartItems}
                    isCartItem={true}
                />
            ))}
        </> ||
        <>Looks like there's nothing here yet</>
    )
}

export default Cart

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0;
}