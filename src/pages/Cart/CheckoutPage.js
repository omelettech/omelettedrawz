import React, {useState} from 'react';
import './CheckoutPage.css';
import {useCart} from "../../context/CartContext";

export const Checkout = () => {
    const [checkoutOption, setCheckoutOption] = useState('guest');
    const {cartContents} = useCart()

    const handleCreateAccount = () => {
        // TODO: Implement account creation logic
        console.log('Creating account with cart...');
    };

    const handleGuestCheckout = async (cartItems) => {
        try {
            console.log('Processing guest payment with Stripe...');

            // Your Cloud Function URL
            const functionUrl = process.env.REACT_APP_FIREBASE_CREATE_CHECKOUT_URL;

            // Call your Cloud Function
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: cartItems,
                    successUrl: window.location.origin + '/success',
                    cancelUrl: window.location.origin + '/cancel',
                }),
            });

            const data = await response.json();

            console.log(data)

            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to initiate payment. Please try again.');
        }
    };


    return (
        <div className="cart-container">
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-options">
                <button
                    onClick={() => setCheckoutOption('guest')}
                    className={`checkout-option-btn ${checkoutOption === 'guest' ? 'active' : ''}`}
                >
                    Guest Checkout
                </button>
                <button
                    onClick={() => setCheckoutOption('account')}
                    className={`checkout-option-btn ${checkoutOption === 'account' ? 'active' : ''}`}
                >
                    Create Account
                </button>
            </div>

            {checkoutOption === 'account' && (
                <div className="cart-item checkout-card">
                    <h2 className="checkout-section-title">Create Account & Save Cart</h2>
                    <p className="checkout-description">
                        Create an account to save your cart and enjoy faster checkout in the future.
                    </p>
                    <button onClick={handleCreateAccount} className="checkout-submit-btn">
                        Proceed to Account Creation
                    </button>
                </div>
            )}

            {checkoutOption === 'guest' && (
                <div className="cart-item checkout-card">
                    <h2 className="checkout-section-title">Guest Checkout</h2>
                    <p className="checkout-description">
                        Complete your purchase as a guest. Payment will be processed securely through Stripe.
                    </p>
                    <button onClick={()=>handleGuestCheckout(cartContents)} className="checkout-submit-btn">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}