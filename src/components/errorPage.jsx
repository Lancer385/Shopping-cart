import { Link } from "react-router-dom";
import styles from "../styles/error.module.css"
function ErrorPage() {
  return (
    <div className={styles.error}>
      <h1>404</h1>
      <p>It looks like you got lost. Fear not, just click on this link</p>
      <Link to="home">Go to home page</Link>
    </div>
  );
}

export default ErrorPage;
