import React, {useEffect, useRef, useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import {DeleteCartItem, fetchCart, PutCartItem} from "../../services/OrderServices";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import {test_auth} from "../../services/apiClient";
import {useCart} from "../../context/CartContext";
// Sample cart data

const CartPage = () => {

    const {cartContents,removeFromCart,addToCart, updateCartQuantity} = useCart()

    const [displayPopup, setDisplayPopup] = useState(false);
    const [selectedCartItemId, setSelectedCartItemId] = useState(null)
    const [updatingCart, setUpdatingCart] = useState(false)
    const [Error, setError] = useState(null)


    const handleQuantityChange = (id,newQuantity) =>{
        setUpdatingCart(true)
        setSelectedCartItemId(id)
         updateCartQuantity(id,newQuantity)
        setUpdatingCart(false)
    }
    const handleRemoveItem = (id) => {
        // still didnt confirm
        setSelectedCartItemId(id)
        setDisplayPopup(true);
        
    };

    const RemoveItem = async (id) => {
        try {
            // const response = await DeleteCartItem(id)
            removeFromCart(selectedCartItemId)
            setSelectedCartItemId(null)

            // console.log(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setDisplayPopup(false)

        }
    }

    const getTotalPrice = () => {
        return cartContents.reduce(
            (total, item) => total + (item.price * item.quantity),
            0,
        )
    };




    useEffect(() => {
        if (!displayPopup) {
            setSelectedCartItemId(null)
        } else if (!selectedCartItemId) {
            //this means that it was deleted
            // getCartData()
        }
    }, [displayPopup])

    const navigate = useNavigate()

    function handleCheckout() {
        navigate("/checkout")
    }

    if (!Error) {
        return (
            <div className={"cart-container"}>
                <h1>Your Cart</h1>
                <br/>
                <hr/>
                <br/>

                {!cartContents || cartContents.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
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


                        {cartContents.map((item) => {
                            return (
                                <div key={item.id} className={'cart-item'}>

                                    <div className={"cart-item-image-container"}>
                                        <img src={item.src}
                                             alt={item.alt || "No image"}
                                             className={"cart-item-image"}

                                        />
                                    </div>
                                    <div style={{flexDirection: "column"}}>
                                        <h2>{item.name}</h2>
                                        <p>Price: ${item.price}</p>
                                        <p>Total: ${(item.price * item.quantity)}</p>
                                    </div>

                                    <label>
                                        Qty:
                                        <input
                                            className={"cart-number-input"}
                                            type="number"
                                            min="1"
                                            max={item.inventory}
                                            value={item.quantity}
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
