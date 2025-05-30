"use client"
import React, { useState, useContext, createContext } from 'react';
import { toast } from 'react-hot-toast';

const context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct, 
                        quantity: cartProduct.quantity + quantity
                    };
                }
                return cartProduct; // Important: return unchanged items
            });

            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
        toast.success(`${quantity} ${product.name} added to your cart`);
    };

const onRemove = (product) => {
    const foundProduct = cartItems.find((item)=> item._id === product._id);
    const newItems = cartItems.filter((item)=> item._id != product._id);
    setTotalPrice((prevTotalPrice)=>(prevTotalPrice)- foundProduct.price*foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities)=>(prevTotalQuantities - foundProduct.quantity));
    setCartItems(newItems);
}



    const ToggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const index = cartItems.findIndex((product) => product._id === id);
        
        if (index === -1) return; // Product not found
        
        if (value === 'inc') {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index] = {
                ...foundProduct,
                quantity: foundProduct.quantity + 1
            };
            
            setCartItems(updatedCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'desc') {
            if (foundProduct.quantity > 1) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[index] = {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1
                };
                
                setCartItems(updatedCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    return (
        <context.Provider
            value={{
                showCart,
                setShowCart, 
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                ToggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </context.Provider>
    );
};

export const useStateContext = () => {
    return useContext(context);
};