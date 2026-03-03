import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/item.module.css";

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
    // edge case to prevent typing 0000000, it's not really problematic but it's nice to have.
    if (e.target.value.length === 3 && e.target.value.startsWith("0")) {
      setCount(1); // since react won't trigger re-render since parsed zeros is just 0. we just set it to 1.
      if (isCartItem) {
        handleManualChange(id, 1);
      }
      return;
    }
    if (e.target.value === "") {
      setCount(e.target.value);
      return;
    }
    let input = parseInt(e.target.value);
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
    <div className="item" id={`item-${id}`}>
      <h2>{title}</h2>
      <p>${price}</p>
      <img src={images[0]} width="250px" height="250px" />
      <label for={`quantity-${id}`}>Quantity: </label>
      {count <= 1 && isCartItem ? (
        <button
          className="controlInput"
          onClick={decrement}
          aria-label="Delete item"
          disabled={count === 0}
        >
          del
        </button>
      ) : (
        <button
          className="controlInput"
          onClick={decrement}
          aria-label="Decrease quantity"
          disabled={count === 0}
        >
          -
        </button>
      )}
      <input
        id={`quantity-${id}`}
        type="number"
        min="0"
        max={stock}
        value={count}
        onChange={handleInputChange}
        className={styles.capacity}
      />
      <button
        className="controlInput"
        onClick={increment}
        aria-label="Increase quantity"
        disabled={stock <= count + cartItems[id]?.count}
      >
        +
      </button>
      {isCartItem ? (
        <button className="removeFromCart"  aria-label="Remove item" onClick={removeFromCart}>
          Remove
        </button>
      ) : (
        <button
          className="addToCart"
          onClick={addToCart}
          disabled={count <= 0 || stock < count + cartItems[id]?.count}
        >
          Add to Cart
        </button>
      )}
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
