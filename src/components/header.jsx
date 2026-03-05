import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/header.module.css";
import { ShoppingCart } from "lucide-react";

function Header({ cartItems }) {


  const totalItems = Object.values(cartItems).reduce(
    (sum, value) => sum + value.count,
    0,
  );
  const cartDisplay =
    totalItems === 0 ? null : totalItems > 9 ? "9+" : `${totalItems}`;
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      <nav className={styles.navigation}>
        <NavLink className={({ isActive }) => 
          isActive ? styles.active : ""
        } to="home" >
          <span>Home</span>
        </NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? styles.active : ""
        } 
        to="shop">
           <span>Shop</span>
        </NavLink>
        <NavLink className={({ isActive }) => 
          isActive ? `${styles.navThree} ${styles.active}` : `${styles.navThree}`
        }
         to="cart" aria-label={`${totalItems} items in cart`} aria-live="polite">
          <ShoppingCart width={32} height={32} />
          <span className={styles.number} >{cartDisplay}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;


Header.propTypes = {
  cartItems: PropTypes.object
}