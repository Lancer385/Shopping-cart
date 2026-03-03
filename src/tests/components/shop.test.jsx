import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Shop from "../../components/shop";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

let products = null;
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
    children: [{ path: "shop", element: <Shop /> }],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/shop"],
});

describe("Shop", () => {
  // since the api call isn't inside the Shop, we just test how it behaves if nothing happens
  it("should render a message if no items are shown", async () => {
    render(<RouterProvider router={router} />);
    const el = screen.getByText("Loading...");
    expect(el).toBeInTheDocument();
  });

  it("should render items received via context", async () => {
    products = [
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
    render(<RouterProvider router={router} />);
    const items = screen.queryAllByRole("button", { name: "Add to Cart"});
    expect(items[0]).toBeInTheDocument()
  });
});
