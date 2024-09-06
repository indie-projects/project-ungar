import { createContext } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateDateRange: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartItemCount: 0,
});

export default CartContext;