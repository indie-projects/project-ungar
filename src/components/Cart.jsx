import React, { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../CartContext';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #444;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const TotalPrice = styled.h2`
  text-align: right;
  margin-top: 20px;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
`;

const Cart = ({ currentLanguage }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <CartContainer>
        <h1>{currentLanguage === 'hu' ? 'Kosár' : 'Cart'}</h1>
        <EmptyCartMessage>
          {currentLanguage === 'hu' ? 'A kosár üres' : 'Your cart is empty'}
        </EmptyCartMessage>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <h1>{currentLanguage === 'hu' ? 'Kosár' : 'Cart'}</h1>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemDetails>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price} {currentLanguage === 'hu' ? 'Ft' : '€'}</ItemPrice>
          </ItemDetails>
          <QuantityControl>
            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QuantityButton>
            <span>{item.quantity}</span>
            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
          </QuantityControl>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            {currentLanguage === 'hu' ? 'Törlés' : 'Remove'}
          </RemoveButton>
        </CartItem>
      ))}
      <TotalPrice>
        {currentLanguage === 'hu' ? 'Összesen:' : 'Total:'} {cartTotal.toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'}
      </TotalPrice>
    </CartContainer>
  );
};

export default Cart;