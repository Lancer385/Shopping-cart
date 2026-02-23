import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "../../components/item";
import '@testing-library/jest-dom/vitest'


const product = {
        id: 1,
        title: 'first product',
        price: '2',
        stock: '50',
        images: ['#']
}

const cartItems = {
    9: {count : 99}
}


describe( 'Shop Item', () =>{

    it("shouldn't add to cart with out adding count", async () =>{
        const user = userEvent.setup();
        const handleCartChanges = vi.fn();
        render(<Item
            value={product}            
            handleCartChanges={handleCartChanges}
            initCount={0}
            cartItems={cartItems}
            isCartItem={false}
        />) 
        const addToCart = screen.getByRole("button", { name: "Add to Cart" });
        await user.click(addToCart)
        expect(handleCartChanges).not.toHaveBeenCalled();
    })

    it("should add to cart after adding count", async () => {
        const user = userEvent.setup();
        const handleCartChanges = vi.fn();
        render(<Item
            value={product}            
            handleCartChanges={handleCartChanges}
            initCount={0}
            cartItems={cartItems}
            isCartItem={false}
        />) 
        const addToCart = screen.getByRole("button", { name: "Add to Cart" });
        const increment = screen.getByRole("button", {name: '+'});

        await user.click(increment);
        await user.click(addToCart);
         expect(handleCartChanges).toHaveBeenCalled();

    })

    it("shouldn't type more than what's available in stock ", async () => {
        const user = userEvent.setup();
        const handleCartChanges = vi.fn();
        render(<Item
            value={product}            
            handleCartChanges={handleCartChanges}
            initCount={0}
            cartItems={cartItems}
            isCartItem={false}
        />) 
        const input = screen.getByRole('spinbutton')

        await user.type(input, '999') // the input will auto-cap based on stock value.
        expect(input).toHaveValue(parseInt(product.stock));  
    })
    it("shouldn't decrement if the input value is 0 and shouldn't increment if the value is maximum", async () => {
        const user = userEvent.setup();
        const handleCartChanges = vi.fn();
        render(<Item
            value={product}            
            handleCartChanges={handleCartChanges}
            initCount={0}
            cartItems={cartItems}
            isCartItem={false}
        />) 
        const input = screen.getByRole('spinbutton')
        const increment = screen.getByRole("button", {name: '+'});
        const decrement = screen.getByRole("button", { name: '-' });
        await user.click(decrement); // button should be disabled
        expect(input).toHaveValue(0);
        await user.type(input, "99") // this will auto-cap, based on our third test!
        await user.click(increment) // thus this will be disabled
        expect(input).toHaveValue(parseInt(product.stock));

    })

    it("should itself if it exists inside cart component", async () =>{
        const user = userEvent.setup();
        const handleCartChanges = vi.fn();
        render(<Item
            value={product}            
            handleCartChanges={handleCartChanges} // this function is different between shop and cart component
            initCount={0}
            cartItems={cartItems}
            isCartItem={true} // this tells the component that it lives inside the cart
        />) 
        const remove = screen.getByRole("button", { name: "Remove" });
        await user.click(remove)
        expect(handleCartChanges).toHaveBeenCalled();
    })
}
)