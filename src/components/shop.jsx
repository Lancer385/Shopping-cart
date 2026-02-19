import { useOutletContext } from "react-router-dom";
import Item from "./item";

function Shop(){
    const [items] = useOutletContext();

    return (
        items && /* if there are items, render them */
        <>
            {items.map((value) => (
                <Item 
                    value = {value}
                    key={value.id}
                />
            ))}
        </> || /* otherwise, show loading state if they are taking too long (items = null) */
        <>
            Loading...
        </>
    )
}

export default Shop;