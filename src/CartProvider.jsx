// CartProvider.jsx
import React, { useState, useCallback, useMemo } from 'react';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};