import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/header.module.css";
import { ShoppingCart } from "lucide-react";

function Header({ cartItems }) {
   let location = useLocation()

    const active =  (curr) => {
      if(location.pathname === curr){
        return styles.active
      }
      return ''
    }

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
        <Link className={styles.navOne} to="home" >
          <span className={active('/home')}>Home</span>
        </Link>
        <Link className={styles.navTwo} to="shop">
           <span className={active('/shop')}>Shop</span>
        </Link>
        <Link className={styles.navThree} to="cart" aria-label="Cart">
      
          <ShoppingCart width={32} height={32} className={active('/cart')}/>
          <span className={`${styles.number} ${active('/cart')}`}>{cartDisplay}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;


Header.propTypes = {
  cartItems: PropTypes.object
}