import { Link } from "react-router-dom";
import Styles from "../styles/header.module.css"
import { ShoppingCart } from "lucide-react";

function Header({cartItems}) {
  const totalItems = Object.values(cartItems).reduce((sum, value) => sum + value.count, 0);
  const cartDisplay = totalItems === 0 ? null : totalItems > 9 ? '9+' : `${totalItems}`;
  return (
    <header className={Styles.header}>
      <h1 className={Styles.heading}>Shopping Cart</h1>
      <nav className={Styles.navigation}>
        <Link className={Styles.navOne} to="home">Home</Link>
        <Link className={Styles.navTwo} to="shop">Shop</Link>
        <Link className={Styles.navThree}to="cart" aria-label="Cart"> <ShoppingCart width={32} height={32} /><span className={Styles.number}>{cartDisplay}</span></Link>
      </nav>
    </header>
  );
}

export default Header;
