function Item({value}){
    return (
        <div className="item">
            <h2>{value.title}</h2>
            <p>${value.price}</p>
            <img src={value.images[0]} width='250px' height='250px'/>
        </div>
    )
}

export default Item;