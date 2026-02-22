import App from "../App";
import Home from "../components/home";
import Shop from "../components/shop";
import Cart from "../components/cart"
import ErrorPage from "../components/errorPage";

const routes = [
  {
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <Home /> },
    { path: 'home', element: <Home />},
    { path: 'shop', element: <Shop /> },
    { path: 'cart',element: <Cart /> }
  ]
}]


export default routes