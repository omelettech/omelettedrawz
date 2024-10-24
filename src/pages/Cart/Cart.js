import React, {useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
import BodyCard from "../../components/ProductCard/BodyCard";
import Popup from "../../components/Popup/Popup";
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
    {
        id: 3,
        name: "Patch B",
        price: 5.0,
        quantity: 1,
    },{
        id: 4,
        name: "Patch B",
        price: 5.0,
        quantity: 1,
    },
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(sampleCartItems);
    const [displayPopup, setDisplayPopup] = useState(false);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setDisplayPopup(true);
    };

    const RemoveItem = (id) => {
        return setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };


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
                        <div key={item.id} className={'cart-item'} >
                            {displayPopup && <Popup onClickBG={()=>setDisplayPopup(false)}>
                                <p>Are you sure</p>
                                <button className={"btn secondary"} onClick={()=>RemoveItem(item.id)}>Yes</button>
                                <button className={"btn primary"} onClick={() => {
                                    setDisplayPopup(false)
                                }}>No
                                </button>

                            </Popup>}
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
                            <button className="btn secondary" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>

                    ))}
                    <div align={"right"}>
                        <h3>Total Price: ${getTotalPrice()}</h3>
                        <button className="btn primary" style={{padding: "10px 20px", marginTop: "20px"}}>
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
