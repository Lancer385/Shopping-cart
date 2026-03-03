import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "../../components/item";
import "@testing-library/jest-dom/vitest";

const product = {
  id: 1,
  title: "first product",
  price: "2",
  stock: "50",
  images: ["#"],
};

const cartItems = {
  1: { count: 48 },
};

describe("Shop Item", () => {
  it("shouldn't add to cart with out adding count", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0}
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const addToCart = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(addToCart);
    expect(handleCartChanges).not.toHaveBeenCalled();
  });

  it("should add to cart after adding count", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0}
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const addToCart = screen.getByRole("button", { name: "Add to Cart" });
    const increment = screen.getByRole("button", { name: "Increase quantity" });

    await user.click(increment);
    await user.click(addToCart);
    expect(handleCartChanges).toHaveBeenCalled();
  });

  it("shouldn't type more than what's available in stock ", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0}
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const input = screen.getByRole("spinbutton");

    await user.type(input, "999"); // the input will auto-cap based on stock value.
    expect(input).toHaveValue(parseInt(product.stock));
  });
  it("shouldn't decrement if the input value is 0", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0} // default value of the input
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const input = screen.getByRole("spinbutton");
    const decrement = screen.getByRole("button", { name: "Decrease quantity" });
    await user.click(decrement); // button should be disabled
    expect(input).toHaveValue(0);
  });

  it("shouldn't increment if the value hit the max stock", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0}
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const input = screen.getByRole("spinbutton");
    const increment = screen.getByRole("button", { name: "Increase quantity" });
    await user.type(input, "99"); // this will auto-cap, based on our third test!
    await user.click(increment); // thus this will be disabled
    expect(input).toHaveValue(parseInt(product.stock));
  });

  it("shouldn't add items to cart if the cart already reached the max stock of said item", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        initCount={0}
        cartItems={cartItems}
        isCartItem={false}
      />,
    );
    const input = screen.getByRole("spinbutton");
    const increment = screen.getByRole("button", { name: "Increase quantity" });
    const addToCart = screen.getByRole("button", { name: "Add to Cart" });
    // so the cart already has 48 items
    await user.click(increment); // should be fine to increment = 1
    await user.click(increment); // and again = 2
    await user.click(increment); // shouldn't be called here since the max stock is 50
    expect(input).toHaveValue(2);
    await user.click(addToCart);
    expect(handleCartChanges).toBeCalled();
    // now both increment and add to cart buttons are disabled
  });
});


describe("Cart Item", ()=> {
    
  it("should delete itself if it exists inside cart component", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges} // this function is handled differently between shop and cart component
        initCount={cartItems[1].count}
        cartItems={cartItems}
        isCartItem={true} // this tells the item component that it lives inside the cart
      />,
    );
    const remove = screen.getByRole("button", { name: "Remove item" });
    await user.click(remove);
    expect(handleCartChanges).toHaveBeenCalled();
  });
  it("should switch increment to a delete button", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    const handleManualChange = vi.fn()
    const handleDecrementing= vi.fn(); // the function that handles
    render(
        <Item
        value={product}
        handleCartChanges={handleCartChanges}
        handleDecrementing={handleDecrementing}
        handleManualChange={handleManualChange}
        initCount={2}
        cartItems={cartItems}
        isCartItem={true} 
        />,
    );
    const decrement = screen.getByRole("button", { name: "Decrease quantity" });
    await user.click(decrement);
    expect(screen.getByRole("button", {name: "Delete item"})).toBeInTheDocument()
  });

  it("should let decrement delete the item if the value of the input equal to 1", async () => {
    const user = userEvent.setup();
    const handleCartChanges = vi.fn();
    const handleManualChange = vi.fn()
    const handleDecrementing= vi.fn(); // the function that handles
    render(
      <Item
        value={product}
        handleCartChanges={handleCartChanges}
        handleDecrementing={handleDecrementing}
        handleManualChange={handleManualChange}
        initCount={1}
        cartItems={cartItems}
        isCartItem={true} 
      />,
    );
    const decrement = screen.getByRole("button", { name: "Delete item" });
    await user.click(decrement);
    expect(handleDecrementing).toHaveBeenCalled();
    expect(handleCartChanges).toHaveBeenCalled();
  });
  

})