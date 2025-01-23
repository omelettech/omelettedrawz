import React, {useEffect, useRef, useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import {DeleteCartItem, fetchCart, PutCartItem} from "../../services/OrderServices";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import {test_auth} from "../../services/apiClient";
// Sample cart data

const CartPage = () => {
    const [cartItems, setCartItems] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [selectedCartItemId, setSelectedCartItemId] = useState(null)
    const [newQty, setNewQty] = useState(null)
    const [updatingCart, setUpdatingCart] = useState(false)
    const [Error, setError] = useState(null)

    const updateTimer = useRef(null);

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

    const updateQuantity = async (id, newQuantity) => {
        try {
            const response = await PutCartItem(id, newQuantity)
            console.log(response.data)
        } catch (e) {

        }
    }
    const sendUpdateQuantityRequest = async (id, newQuantity) => {
        setUpdatingCart(true)
        try {
            const response = await PutCartItem(id, newQuantity)
            console.log("PUT request sent to backend", id, newQuantity)
        } catch (e) {
            console.error(e)
        } finally {
            setUpdatingCart(false)
        }
    };
    const handleQuantityChange = (id, newQuantity) => {
        setUpdatingCart(true)
        setSelectedCartItemId(id)
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
        // Clear the existing timer if it exists
        if (updateTimer.current) {
            clearTimeout(updateTimer.current);
        }

        // Start a new timer for 2 seconds
        updateTimer.current = setTimeout(() => {
            // Call the backend API to update the quantity
            // updateQuantityOnBackend(id, newQuantity);
            console.log("Update qty request sent", newQuantity)
            sendUpdateQuantityRequest(id, newQuantity)
            // sendUpdateQuantityRequest()
        }, 1500);
    };

    const handleRemoveItem = (id) => {
        // still didnt confirm
        setSelectedCartItemId(id)
        setDisplayPopup(true);
    };

    const RemoveItem = async (id) => {
        try {
            const response = await DeleteCartItem(id)
            setSelectedCartItemId(null)
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
            console.log(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setDisplayPopup(false)

        }
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item.product_sku.price * item.quantity),
            0,
        )
    };

    useEffect(() => {
        getCartData()
    }, [])

    useEffect(() => {
        console.log(selectedCartItemId)
    }, [selectedCartItemId])

    useEffect(() => {
        if (!displayPopup) {
            setSelectedCartItemId(null)
        } else if (!selectedCartItemId) {
            //this means that it was deleted
            getCartData()
        }
    }, [displayPopup])

    const navigate = useNavigate()

    function handleCheckout() {
        sendUpdateQuantityRequest()
        navigate()
    }

    const handleBlur = (id, newQuantity) => {
        if (updateTimer.current) {
            clearTimeout(updateTimer.current)
        }

        sendUpdateQuantityRequest(id, newQuantity)

    };
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
                                        <button className={"btn secondary"}
                                                onClick={() => RemoveItem(selectedCartItemId)}>
                                            Yes
                                        </button>
                                        <button className={"btn primary"} onClick={() => {
                                            setDisplayPopup(false)
                                        }}>No
                                        </button>

                                    </Popup>}
                                    <div className={"cart-item-image"}>
                                        <img src={"http://127.0.0.1:8000" + item.product_sku.associated_image?.image}
                                             alt={item.product_sku.associated_image?.alt || "No image"}

                                        />
                                    </div>
                                    <div style={{flexDirection: "column"}}>
                                        <h3>{item.product_sku.product.name}</h3>
                                        <p>Price: ${item.product_sku.price}</p>
                                        <p>Total: ${(item.product_sku.price * item.quantity)}</p>
                                    </div>

                                    <label>
                                        Qty:
                                        <input
                                            className={"cart-number-input"}
                                            type="number"
                                            min="1"
                                            max={item.product_sku.quantity}
                                            value={item.quantity}
                                            onBlur={(e) => handleBlur(item.id, parseInt(e.target.value))}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            onScroll={event => event.preventDefault()}
                                        />
                                    </label>
                                    <button className="btn secondary" onClick={() => handleRemoveItem(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            )

                        })}


                        <div align={"right"}>
                            <h3 style={{fontFamily: "sans-serif"}}>Total Price: ${getTotalPrice()}</h3>
                            <button className="btn primary" style={{padding: "10px 20px", marginTop: "20px"}}
                                    onClick={handleCheckout} disabled={updatingCart}>
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
