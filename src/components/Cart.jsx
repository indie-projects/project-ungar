import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import CartContext from '../CartContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateDaysDifference } from './calculateDaysDifference';


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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #444;
  margin-bottom: 15px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`;

const ItemName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2em;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const DatePickerLabel = styled.label`
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #ccc;
`;

const DatePickerContainer = styled.div`
  display: flex;
  gap: 10px;

  .react-datepicker-wrapper {
    width: auto;
  }

  .react-datepicker__input-container input {
    background-color: #2a2a2a;
    color: #fff;
    border: 1px solid #444;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .react-datepicker {
    background-color: #2a2a2a;
    border: 1px solid #444;
  }

  .react-datepicker__header {
    background-color: #333;
    border-bottom: 1px solid #444;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    color: #fff;
  }

  .react-datepicker__day:hover {
    background-color: #444;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: #1db954;
    color: #fff;
  }

  .react-datepicker__day--disabled {
    color: #666;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const QuantityButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #222;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff3333;
  }
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

const CustomerForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1em;
  background-color: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #1db954;
  }
`;

const SubmitButton = styled.button`
  background-color: #1db954;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1ed760;
  }

  &:disabled {
    background-color: #165c2e;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  margin: 5px 0;
  font-size: 0.9em;
`;

const SubtotalInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
  color: #ccc;
`;

const Cart = ({ currentLanguage }) => {
  const { cart, removeFromCart, updateQuantity, updateDateRange, cartTotal, clearCart } = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      handleSubmitOrder();
    }
  }, [formErrors, isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleDateChange = (itemId, field, date) => {
    const item = cart.find(i => i.id === itemId);
    let startDate = field === 'startDate' ? date : item.startDate;
    let endDate = field === 'endDate' ? date : item.endDate;

    if (startDate && endDate && startDate > endDate) {
      if (field === 'startDate') {
        endDate = null;
      } else {
        startDate = null;
      }
      toast.warn(currentLanguage === 'hu' ? 'A kezdő dátum nem lehet későbbi, mint a befejező dátum' : 'Start date cannot be later than end date', {
        toastId: 'date-range-error'
      });
    }

    updateDateRange(itemId, startDate, endDate);

    if (startDate && endDate) {
      checkAvailability(itemId, startDate, endDate);
    }
  };

  const checkAvailability = (itemId, start, end) => {
    // Mock function for availability check
    // In a real application, this would make an API call to the backend
    const isAvailable = Math.random() > 0.2; // 80% chance of being available
    if (!isAvailable) {
      toast.error(currentLanguage === 'hu' ? 'A kiválasztott időszak nem elérhető' : 'The selected period is not available', {
        toastId: `availability-${itemId}`
      });
    }
    return isAvailable;
  };

  const validateForm = () => {
    let errors = {};
    if (!customerInfo.firstName.trim()) {
      errors.firstName = currentLanguage === 'hu' ? 'Keresztnév megadása kötelező' : 'First name is required';
    }
    if (!customerInfo.lastName.trim()) {
      errors.lastName = currentLanguage === 'hu' ? 'Vezetéknév megadása kötelező' : 'Last name is required';
    }
    if (!customerInfo.email.trim()) {
      errors.email = currentLanguage === 'hu' ? 'Email cím megadása kötelező' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = currentLanguage === 'hu' ? 'Érvénytelen email cím' : 'Invalid email address';
    }
    if (!customerInfo.phone.trim()) {
      errors.phone = currentLanguage === 'hu' ? 'Telefonszám megadása kötelező' : 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(customerInfo.phone)) {
      errors.phone = currentLanguage === 'hu' ? 'Érvénytelen telefonszám' : 'Invalid phone number'; 
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setIsSubmitting(Object.keys(errors).length === 0);
  };

  const handleSubmitOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Submitting order:', { cart, customerInfo });
    toast.success(currentLanguage === 'hu' ? 'Rendelés sikeresen elküldve!' : 'Order successfully submitted!');
    // Reset cart and form after successful submission  
    clearCart();
    setCustomerInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    setIsSubmitting(false);
  };

  const calculateSubtotal = (item) => {
    const days = calculateDaysDifference(item.startDate, item.endDate);
    return item.price * days * item.quantity;
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <h1>{currentLanguage === 'hu' ? 'Kosár' : 'Cart'}</h1>
        <EmptyCartMessage>
          {currentLanguage === 'hu' ? 'A kosár üres' : 'Your cart is empty'}
        </EmptyCartMessage>
        <TotalPrice>
        {currentLanguage === 'hu' ? 'Összesen:' : 'Total:'} {cartTotal.toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'}
      </TotalPrice>
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
            <ItemPrice>
              {item.price.toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'} / {currentLanguage === 'hu' ? 'nap' : 'day'}
            </ItemPrice>
            <DatePickerWrapper>
              <DatePickerLabel>
                {currentLanguage === 'hu' ? 'Bérlési időszak' : 'Rental Period'}
              </DatePickerLabel>
              <DatePickerContainer>
                <DatePicker
                  selected={item.startDate}
                  onChange={(date) => handleDateChange(item.id, 'startDate', date)}
                  selectsStart
                  startDate={item.startDate}
                  endDate={item.endDate}
                  minDate={new Date()}
                  placeholderText={currentLanguage === 'hu' ? 'Kezdő dátum' : 'Start Date'}
                  dateFormat="yyyy-MM-dd"
                  required
                  aria-label={currentLanguage === 'hu' ? 'Kezdő dátum' : 'Start Date'}
                />
                <DatePicker
                  selected={item.endDate}
                  onChange={(date) => handleDateChange(item.id, 'endDate', date)}
                  selectsEnd
                  startDate={item.startDate}
                  endDate={item.endDate}
                  minDate={item.startDate || new Date()}
                  placeholderText={currentLanguage === 'hu' ? 'Befejező dátum' : 'End Date'}
                  dateFormat="yyyy-MM-dd"
                  required  
                  aria-label={currentLanguage === 'hu' ? 'Befejező dátum' : 'End Date'}
                />
              </DatePickerContainer>
            </DatePickerWrapper>
            <SubtotalInfo>
              {item.startDate && item.endDate && (
                <>
                  <div>
                    {currentLanguage === 'hu' ? 'Napok száma:' : 'Number of days:'} {calculateDaysDifference(item.startDate, item.endDate)}
                  </div>
                  <div>
                    {currentLanguage === 'hu' ? 'Részösszeg:' : 'Subtotal:'} {calculateSubtotal(item).toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'}
                  </div>
                </>
              )}
            </SubtotalInfo>
          </ItemDetails>
          <QuantityControl>
            <QuantityButton 
              onClick={() => updateQuantity(item.id, item.quantity - 1)} 
              disabled={item.quantity <= 1}
              aria-label={currentLanguage === 'hu' ? 'Mennyiség csökkentése' : 'Decrease quantity'}  
            >-</QuantityButton>
            <span>{item.quantity}</span>
            <QuantityButton 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label={currentLanguage === 'hu' ? 'Mennyiség növelése' : 'Increase quantity'}
            >+</QuantityButton>
          </QuantityControl>
          <RemoveButton onClick={() => removeFromCart(item.id)}>
            {currentLanguage === 'hu' ? 'Törlés' : 'Remove'}
          </RemoveButton>
        </CartItem>
      ))}
      <TotalPrice>
        {currentLanguage === 'hu' ? 'Végösszeg:' : 'Total:'} {cartTotal.toFixed(2)} {currentLanguage === 'hu' ? 'Ft' : '€'}
      </TotalPrice>
      <CustomerForm onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          placeholder={currentLanguage === 'hu' ? 'Keresztnév*' : 'First Name*'}
          value={customerInfo.firstName}
          onChange={handleInputChange}
          required
          aria-invalid={formErrors.firstName ? 'true' : 'false'}
          aria-describedby="firstNameError"
        />
        {formErrors.firstName && <ErrorMessage id="firstNameError">{formErrors.firstName}</ErrorMessage>}
        <FormInput
          type="text"
          name="lastName"
          placeholder={currentLanguage === 'hu' ? 'Vezetéknév*' : 'Last Name*'}  
          value={customerInfo.lastName}
          onChange={handleInputChange}
          required
          aria-invalid={formErrors.lastName ? 'true' : 'false'} 
          aria-describedby="lastNameError"
        />
        {formErrors.lastName && <ErrorMessage id="lastNameError">{formErrors.lastName}</ErrorMessage>}
        <FormInput
          type="email"
          name="email"
          placeholder={currentLanguage === 'hu' ? 'E-mail cím*' : 'Email*'}
          value={customerInfo.email}
          onChange={handleInputChange}
          required
          aria-invalid={formErrors.email ? 'true' : 'false'}
          aria-describedby="emailError"  
        />
        {formErrors.email && <ErrorMessage id="emailError">{formErrors.email}</ErrorMessage>}
        <FormInput
          type="tel"
          name="phone"
          placeholder={currentLanguage === 'hu' ? 'Telefonszám*' : 'Phone Number*'}
          value={customerInfo.phone}
          onChange={handleInputChange}
          required
          aria-invalid={formErrors.phone ? 'true' : 'false'}
          aria-describedby="phoneError"
        />
        {formErrors.phone && <ErrorMessage id="phoneError">{formErrors.phone}</ErrorMessage>}
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? (currentLanguage === 'hu' ? 'Feldolgozás...' : 'Processing...')
            : (currentLanguage === 'hu' ? 'Megrendelés küldése' : 'Submit Order')}
        </SubmitButton>
      </CustomerForm>
    </CartContainer>
  );
};

export default Cart;