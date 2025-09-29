import {createContext, useContext, useState} from "react";

export const CartContext = createContext()


export const CartProvider = ({children}) => {
    const [cartContents, setCartContents] = useState([])

    const addToCart = (item) => {
        setCartContents((prevCart) => {
            // if there is an existing product with the same id, increase its quantity
            const existing = prevCart.find((i) => i.id === item.id);
            if (existing) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartContents((prevCart) => prevCart.filter((i) => i.id !== id));
    };
    const clearCart = () => {
        setCart([]);
    };
    return (
        <CartContext.Provider value={{ cartContents, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside a CartProvider");
    return context;
};