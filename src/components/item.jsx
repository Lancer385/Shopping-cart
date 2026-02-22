import { useState } from "react";
import styles from "../styles/item.module.css"
function Item({value, handleCartChanges}){

    const [count, setCount] = useState(0)

    function handleInputChange(e) {
        // edge case to prevent typing 0000000
        if (e.target.value.length === 2 && e.target.value.startsWith("0")){
            setCount(1);
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
        if (count > 0){
            handleCartChanges([value.id,count], value.stock)
        }
    }
    return (
        <div className={"item " + value.id }>
            <h2>{value.title}</h2>
            <p>${value.price}</p>
            <img src={value.images[0]} width='250px' height='250px'/>
            <input type="number" min='0' max={value.stock} value={count} onChange={handleInputChange} className={styles.capacity}/>
            <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Item;