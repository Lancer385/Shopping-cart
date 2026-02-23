import { useState } from "react";
import styles from "../styles/item.module.css"
function Item({value, id, initCount, handleCartChanges, cartItems, isCartItem}){

    const [count, setCount] = useState(initCount)

    function handleInputChange(e) {
        // edge case to prevent typing 0000000, it's not really problematic but it's nice to have.
        if (e.target.value.length === 2 && e.target.value.startsWith("0")){
            setCount(1); // since react won't trigger re-render since parsed zeros is just 0. we just set it to 1.
            return;
        }
        if (e.target.value === ''){
            setCount(e.target.value)
            return;
        }
        let input = parseInt(e.target.value)
        if (input <= value.stock){
            setCount(input)
            return;
        }
        else {
            setCount(value.stock);
            return;
        }
    }
    function addToCart(){
         handleCartChanges([id, count], value.stock)
    }
    function removeFromCart(){
        handleCartChanges(id);
    }

        return (
            <div className={"item " + (id)}>
                <h2>{value.title}</h2>
                <p>${value.price}</p>
                <img src={value.images[0]} width='250px' height='250px'/>
                <input type="number"
                       min='0' 
                       max={value.stock} 
                       value={count} 
                       onChange={handleInputChange} 
                       className={styles.capacity}/>
                {isCartItem ? 
                    <button className="removeFromCart" onClick={removeFromCart}>Remove</button> :
                    <button className="addToCart" onClick={addToCart} disabled={count <= 0 || value.stock === cartItems[id]?.count}>Add to Cart</button>
                }
            </div>
        )
        
}

export default Item;