import { useOutletContext } from "react-router-dom";
import Item from "./item";
import styles from "../styles/shop.module.css"

function Shop() {
  const { items, cart } = useOutletContext();
  const [cartItems, setCartItems] = cart;

  function handleCartChanges(arr) {
    const id = arr[0];
    const count = arr[1];
  
    setCartItems((draft) => {
      if (draft[id] === undefined) {
        draft[id] = { count: count };
        return;
      }
      draft[id].count += count;
    });
  }

  return (
    
    (items /* if there are items, render them */ && (
      <main className={styles.products}>
        {items.map((value) => (
          <Item
            value={value}
            key={value.id}
            initCount={0}
            handleCartChanges={handleCartChanges}
            cartItems={cartItems}
            isCartItem={false}
          />
        ))}
      </main>
    )) /* otherwise, show loading state if they are taking too long (items = null) */ 
    || (
      <main className={styles.loading}>
        Loading...
      </main>
    )
  );
}

export default Shop;
