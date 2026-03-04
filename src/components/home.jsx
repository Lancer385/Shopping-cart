import { Link } from "react-router-dom";
import styles from "../styles/home.module.css"
function Home() {
  return <main className={styles.home}>
    <h2> Welcome to our Shop!</h2>
    <p>there&apos;s a wide variety of products here for all your needs.</p>
    <Link to="/shop">
    <button className={styles.shopLink}>
      Shop Now
    </button>
    </Link>
    </main>
}

export default Home;
