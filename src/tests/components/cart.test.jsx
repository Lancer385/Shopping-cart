import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Cart from "../../components/cart";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "first product",
    price: "2",
    stock: "50",
    images: ["#"],
  },
  {
    id: 2,
    title: "second product",
    price: "9.99",
    stock: "20",
    images: ["#"],
  },
  {
    id: 10,
    title: "third product",
    price: "15.99",
    stock: "99",
    images: ["#"],
  },
]
let cart = {};

function MockParent() {
  const [cartItems, setCartItems] = useState(cart);

  return (
    <Outlet
      context={{
        items: products,
        cart: [cartItems, setCartItems],
      }}
    />
  );
}

const routes = [
  {
    path: "/",
    element: <MockParent />,
    children: [{ path: "cart", element: <Cart /> }],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/cart"],
});

describe("cart", () => {
  it("should render a message if no cart item is shown", async () => {
    render(<RouterProvider router={router} />);
    const el = screen.getByText("Looks like there's nothing here yet");
    expect(el).toBeInTheDocument();
  });

  it("should render items put in the cart based on Cart items state", async () => {
    cart = {
      1: { count: 5 },
      2: { count: 2 },
      3: { count: 15 },
    };
    render(<RouterProvider router={router} />);
    const counts = screen.queryAllByRole("textbox"); // the quantity of each item is shown in the input of each of them upon opening the cart
    expect(counts[0]).toHaveValue('5');
    expect(counts[1]).toHaveValue('2');
    expect(counts[2]).toHaveValue('15');
  });
});
