import React, {useEffect, useRef, useState} from 'react';
import "./Cart.css"
import {useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import {DeleteCartItem, fetchCart} from "../../services/OrderServices";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import {test_auth} from "../../services/apiClient";
// Sample cart data

const CartPage = () => {
    const [cartItems, setCartItems] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [selectedCartItemId, setSelectedCartItemId] = useState(null)
    const [Error, setError] = useState(null)
    const updateTimer=useRef(null);

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

    const updateQuantity=async (id,newQuantity)=>{
        try {
            const response = await PutCartItem(id,newQuantity)
            console.log(response.data)
        }catch (e){

        }
    }
    const handleQuantityChange = (id, newQuantity) => {
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
        }, 2000);
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
        }finally {
            setDisplayPopup(false)

        }
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item.product_sku_price * item.quantity),
            0,
        )
    };

    useEffect(() => {
        getCartData()
    }, [])



    useEffect(()=>{
        if(!displayPopup){
            setSelectedCartItemId(null)
        }else if (!selectedCartItemId){
            //this means that it was deleted
            getCartData()
        }
    },[displayPopup])

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
                                        <button className={"btn secondary"} onClick={() => RemoveItem(selectedCartItemId)}>
                                            Yes
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
                                    <button className="btn secondary" onClick={() => handleRemoveItem(item.id)}>
                                        Remove
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
