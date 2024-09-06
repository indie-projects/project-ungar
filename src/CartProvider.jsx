import React, { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import CartContext from './CartContext';
import { calculateDaysDifference } from '../src/components/calculateDaysDifference';


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          toast.success(`${product.name} quantity increased in cart`);
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        toast.success(`${product.name} added to cart`);
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    try {
      setCart((prevCart) => {
        const removedItem = prevCart.find(item => item.id === productId);
        if (removedItem) {
          toast.info(`${removedItem.name} removed from cart`);
        }
        return prevCart.filter((item) => item.id !== productId);
      });
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product from cart. Please try again.");
    }
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    try {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter((item) => {
          if (item.quantity === 0) {
            toast.info(`${item.name} removed from cart`);
            return false;
          }
          return true;
        })
      );
    } catch (error) {
      console.error("Error updating product quantity:", error);
      toast.error("Failed to update product quantity. Please try again.");
    }
  }, []);

  const clearCart = useCallback(() => {
    try {
      setCart([]);
      toast.info('Cart cleared');
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.");
    }
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => {
      const days = calculateDaysDifference(item.startDate, item.endDate);
      return total + item.price * days * item.quantity;
    }, 0),
    [cart]
  );

  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  const updateDateRange = useCallback((productId, startDate, endDate) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, startDate, endDate }
          : item
      )
    );
  }, []);

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateDateRange,
    clearCart,
    cartTotal,
    cartItemCount
  }), [cart, addToCart, removeFromCart, updateQuantity, updateDateRange, clearCart, cartTotal, cartItemCount]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};