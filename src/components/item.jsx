import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/item.module.css";
import { Minus, Plus, Trash } from "lucide-react";

function Item({
  value,
  initCount,
  handleCartChanges,
  cartItems,
  isCartItem,
  handleManualChange,
  handleIncrementing,
  handleDecrementing,
}) {
  const [count, setCount] = useState(initCount);
  const { title, price, images, stock, id } = value;

  function handleInputChange(e) {
    if (e.target.value === "") {
      setCount(e.target.value);
      return;
    }
    let input = parseInt(e.target.value);
    if (isNaN(input)){
      setCount(0)
       if (isCartItem) {
        handleManualChange(id, 0);
      }
      return;
    }
    if (input <= stock) {
      setCount(input);
      if (isCartItem) {
        handleManualChange(id, input);
      }
      return;
    } else {
      setCount(stock);
      if (isCartItem) {
        handleManualChange(id, stock);
      }
      return;
    }
  }
  function addToCart() {
    handleCartChanges([id, count]);
  }
  function removeFromCart() {
    handleCartChanges(id);
  }
  function increment() {
    setCount(count + 1);
    if (isCartItem) {
      handleIncrementing(id);
    }
  }
  function decrement() {
    setCount(count - 1);
    if (isCartItem) {
      handleDecrementing(id);
      if (count <= 1) {
        removeFromCart();
      }
    }
  }

  return (
    <div className={styles.item} id={`item-${id}`}>
      <img className={styles.itemImage} src={images[0]} width="250px" height="250px" />
      <h2 className={styles.itemTitle}>{title}</h2>
      <p className={styles.itemPrice}>${price}</p>
      <div className={styles.quantity}>
        <label htmlFor={`quantity-${id}`}>Quantity</label>
        <div className={styles.control}>

          {count <= 1 && isCartItem ? (
            <button
              className={styles.controlInput}
              onClick={decrement}
              aria-label="Delete item"
            >
              <Trash height={14} width={14}/>
            </button>
          ) : (
            <button
              className={styles.controlInput}
              onClick={decrement}
              aria-label="Decrease quantity"
              disabled={count === 0}
            >
              <Minus height={14} width={14}/>
            </button>
          )}
          <input
            id={`quantity-${id}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={count}
            onChange={handleInputChange}
            className={styles.capacity}
            aria-live="polite"
          />
          <button
            className={styles.controlInput}
            onClick={increment}
            aria-label="Increase quantity"
            disabled={stock <= count + cartItems[id]?.count}
          >
            <Plus height={14} width={14} />
          </button>
        </div>
        {isCartItem ? (
          <button className={styles.removeFromCart}  aria-label="Remove item" onClick={removeFromCart}>
            Remove
          </button>
        ) : (
          <button
            className={styles.addToCart}
            onClick={addToCart}
            disabled={count <= 0 || stock < count + cartItems[id]?.count}
          >
            Add to Cart
          </button>
        )}
      </div>
      <span>Stock: {cartItems[id] ? stock - cartItems[id].count : stock}</span>
    </div>
  );
}

Item.propTypes = {
  value: PropTypes.object,
  initCount: PropTypes.number,
  handleCartChanges: PropTypes.func,
  cartItems: PropTypes.object,
  isCartItem: PropTypes.bool,
  handleIncrementing: PropTypes.func,
  handleDecrementing: PropTypes.func,
  handleManualChange: PropTypes.func,
};
export default Item;
