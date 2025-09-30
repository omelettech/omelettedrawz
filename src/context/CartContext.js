import {createContext, useContext, useEffect, useState} from "react";

export const CartContext = createContext()


export const CartProvider = ({children}) => {
        const [cartContents, setCartContents] = useState([])

        useEffect(()=>{
            console.log(cartContents)
        },[cartContents])
        const addToCart = (item) => {
            if (!cartContents) {
                setCartContents([{item, quantity: 1}])
                return
            }

            console.log("Added to cart:", item)
            setCartContents((prevCart) => {
                console.log(cartContents)
                // if there is an existing product with the same id, increase its quantity
                const existing = prevCart.find((i) => i.id === item.id);


                if (existing) {

                    return prevCart.map((i) =>
                        i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                    );
                }
                return [...prevCart, {...item, quantity: 1}];
            });
        };

        const removeFromCart = (id) => {
            setCartContents((prevCart) => prevCart.filter((i) => i.id !== id));
        };
        const clearCart = () => {
            setCartContents([]);
        };
        const updateCartQuantity = (id, newQty) => {
            console.log("updating",id,newQty)
            setCartContents((prevCart) => {
                return prevCart.map(item =>
                    //loops through the list to find the item, then updates the quantity
                    item.id === id ? {...item, quantity: newQty} : item
                )
            })

        }
        return (
            <CartContext.Provider value={{cartContents, addToCart, removeFromCart, clearCart, updateCartQuantity}}>
                {children}
            </CartContext.Provider>
        );
    }
;
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside a CartProvider");
    return context;
};