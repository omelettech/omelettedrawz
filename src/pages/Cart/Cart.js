import React, {useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
// Sample cart data
const sampleCartItems = [
    {
        id: 1,
        name: "Sticker A",
        price: 2.5,
        quantity: 2,
    },
    {
        id: 2,
        name: "Patch B",
        price: 5.0,
        quantity: 1,
    },
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(sampleCartItems);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleItemOnclick=(id)=> {
        console.log(id)
        return navigate("/shop");
    }
    const navigate = useNavigate()

    return (
        <div className={"cart-container"}>
            <h1>Your Cart</h1>
            <br/>
            <hr/>
            <br/>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className={'cart-item'} onClick={handleItemOnclick(item.id)}>
                            <h2>{item.name}</h2>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                />
                            </label>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    ))}
                    <div>
                        <h3>Total Price: ${getTotalPrice()}</h3>
                        <button style={{padding: "10px 20px", marginTop: "20px"}}>
                            Checkout
                        </button>
                    </div>
                    <br/>
                    <hr/>

                </div>
            )}
        </div>
    );
};

export default CartPage;
