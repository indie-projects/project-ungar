// CartContext.jsx
import { createContext } from 'react';

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartItemCount: 0,
});

export default CartContext;