import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CartContext from '../CartContext';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  flex-grow: 1;
  overflow-y: auto;
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

const RentalDuration = styled.input`
  width: 50px;
  margin-left: 10px;
`;

const CustomerForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Cart = ({ currentLanguage }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, updateRentalDuration } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bestellung gesendet:', { cart, customerInfo });
    // Hier können Sie die Logik zum Senden der Bestellung implementieren
  };

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
            <ItemPrice>{item.price} {currentLanguage === 'hu' ? 'Ft' : '€'} / day</ItemPrice>
          </ItemDetails>
          <QuantityControl>
            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QuantityButton>
            <span>{item.quantity}</span>
            <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
          </QuantityControl>
          <div>
            <label>{currentLanguage === 'hu' ? 'Napok:' : 'Days:'}</label>
            <RentalDuration
              type="number"
              min="1"
              value={item.rentalDuration || 1}
              onChange={(e) => updateRentalDuration(item.id, parseInt(e.target.value))}
            />
          </div>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            {currentLanguage === 'hu' ? 'Törlés' : 'Remove'}
          </RemoveButton>
        </CartItem>
      ))}
      <TotalPrice>
        {currentLanguage === 'hu' ? 'Összesen:' : 'Total:'} {cartTotal.toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'}
      </TotalPrice>
      <CustomerForm onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          placeholder={currentLanguage === 'hu' ? 'Keresztnév' : 'First Name'}
          value={customerInfo.firstName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="text"
          name="lastName"
          placeholder={currentLanguage === 'hu' ? 'Vezetéknév' : 'Last Name'}
          value={customerInfo.lastName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          placeholder={currentLanguage === 'hu' ? 'E-mail cím' : 'Email'}
          value={customerInfo.email}
          onChange={handleInputChange}
          required
        />
        <FormInput
          type="tel"
          name="phone"
          placeholder={currentLanguage === 'hu' ? 'Telefonszám' : 'Phone Number'}
          value={customerInfo.phone}
          onChange={handleInputChange}
          required
        />
        <SubmitButton type="submit">
          {currentLanguage === 'hu' ? 'Megrendelés küldése' : 'Submit Order'}
        </SubmitButton>
      </CustomerForm>
    </CartContainer>
  );
};

export default Cart;