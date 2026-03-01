import { useState } from "react";
import styles from "../styles/item.module.css"
function Item({value, initCount, handleCartChanges, cartItems, isCartItem }){
    const [count, setCount] = useState(initCount);
    const { title, price, images, stock, id } = value;

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
        if (input <= stock){
            setCount(input)
            return;
        }
        else {
            setCount(stock);
            return;
        }
    }
    function addToCart(){
         handleCartChanges([id, count])
    }
    function removeFromCart(){
        handleCartChanges(id);
    }
    function increment(){
        setCount(count + 1);
    }
    function decrement(){
        setCount(count - 1)
    }

        return (
            <div className={"item " + (id)}>
                <h2>{title}</h2>
                <p>${price}</p>
                <img src={images[0]} width='250px' height='250px'/>
                <button className="controlInput" onClick={decrement} disabled={count === 0}>-</button>
                <input type="number"
                       min='0' 
                       max={stock} 
                       value={count} 
                       onChange={handleInputChange}
                       className={styles.capacity}/>
                <button className="controlInput" onClick={increment} disabled={stock <= count + cartItems[id]?.count}>+</button>
                {isCartItem ? 
                    <button className="removeFromCart" onClick={removeFromCart}>Remove</button> :
                    <button className="addToCart" onClick={addToCart} disabled={count <= 0 || stock < count + cartItems[id]?.count}>Add to Cart</button>
                }
            </div>
        )
        
}

export default Item;