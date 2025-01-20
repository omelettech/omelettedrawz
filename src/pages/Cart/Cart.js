import React, {useEffect, useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import {fetchCart} from "../../services/OrderServices";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import {test_auth} from "../../services/apiClient";
// Sample cart data

const CartPage = () => {
    const [cartItems, setCartItems] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [Error, setError] = useState(null)
    let updateTimer;

    const getCartData = async () => {
        try {
            const cart_data = await fetchCart()
            const [{cartitem_set}] = cart_data
            console.log(cartitem_set)
            setCartItems(cartitem_set)
        } catch (e) {
            console.error(e)
            setError("ASDKHASD")
        }
    }

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
        // Clear the existing timer if it exists
        if (updateTimer) {
            clearTimeout(updateTimer);
        }

        // Start a new timer for 2 seconds
        updateTimer = setTimeout(() => {
            // Call the backend API to update the quantity
            // updateQuantityOnBackend(id, newQuantity);
            console.log("Update qty request sent", newQuantity)
        }, 2000);
    };

    const handleRemoveItem = (id) => {
        setDisplayPopup(true);
    };

    const RemoveItem = (id) => {
        // return setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total,item) => total + (item.product_sku_price*item.quantity),
            0,
        )
    };

    useEffect(() => {
        getCartData()
    }, [])



    const navigate = useNavigate()
    if (!Error) {
        return (
            <div className={"cart-container"}>
                <h1>Your Cart</h1>
                <br/>
                <hr/>
                <br/>

                {!cartItems || cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>

                        {cartItems.map((item) => {
                            return (
                                <div key={item.id} className={'cart-item'}>
                                    {displayPopup && <Popup onClickBG={() => setDisplayPopup(false)}>
                                        <p>Are you sure</p>
                                        <button className={"btn secondary"} onClick={() => RemoveItem(item.id)}>Yes
                                        </button>
                                        <button className={"btn primary"} onClick={() => {
                                            setDisplayPopup(false)
                                        }}>No
                                        </button>

                                    </Popup>}
                                    <h2>{item.name}</h2>
                                    <p>Price: ${item.product_sku_price}</p>
                                    <label>
                                        Qty:
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </label>
                                    <p>Total: ${(item.product_sku_price * item.quantity)}</p>
                                    <button className="btn secondary" onClick={() => handleRemoveItem(item.id)}>Remove
                                    </button>
                                </div>
                            )

                        })}


                        <div align={"right"}>
                            <h3 style={{fontFamily: "sans-serif"}}>Total Price: ${getTotalPrice()}</h3>
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
    } else {
        return <div>
            <SectionHeading text={"Error"} align={"center"}/>
            <button onClick={test_auth}>TEST</button>

        </div>
    }
};

export default CartPage;
