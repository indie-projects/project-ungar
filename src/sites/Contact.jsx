import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styled, { keyframes } from 'styled-components';

// Keyframes für Animationen
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #fff;
  animation: ${fadeIn} 1.5s ease-in-out;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  background-color: #1e1e1e;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 600px;
  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #1db954, #1e6837);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 8px;
  }

  h2 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: #1db954;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.75rem;
  animation: ${slideIn} 0.5s ease-in-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #ccc;
    font-weight: 500;
    transition: color 0.3s;
  }

  &:focus-within label {
    color: #1db954;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid #444;
    border-radius: 6px;
    background-color: #2a2a2a;
    color: #fff;
    transition: all 0.3s;
    box-sizing: border-box;
    font-size: 1rem;

    &:focus {
      border-color: #1db954;
      box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
      outline: none;
    }
    
    &::placeholder {
      color: #666;
    }
  }

  textarea {
    height: 140px;
    resize: vertical;
    min-height: 100px;
    
    @media (max-width: 480px) {
      height: 120px;
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #1db954, #17a547);
  color: #fff;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(to right, #17a547, #1db954);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

const StatusMessage = styled.div`
  margin-top: 1.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: ${(props) => (props.error ? 'rgba(255, 82, 82, 0.1)' : 'rgba(29, 185, 84, 0.1)')};
  color: ${(props) => (props.error ? '#ff5252' : '#1db954')};
  border: 1px solid ${(props) => (props.error ? '#ff5252' : '#1db954')};
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus('Email wurde erfolgreich gesendet!');
          setFormData({ name: '', email: '', message: '' });
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
          setStatus('E-Mail konnte nicht gesendet werden.');
          setLoading(false);
        }
      );
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Kontaktiere Mich</h2>
        <InputGroup delay="0.1s">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Dein Name"
            required
          />
        </InputGroup>
        <InputGroup delay="0.2s">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="deine@email.com"
            required
          />
        </InputGroup>
        <InputGroup delay="0.3s">
          <label htmlFor="message">Nachricht:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Schreibe deine Nachricht hier..."
            required
          ></textarea>
        </InputGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Sendet...' : 'Senden'}
        </Button>
        {status && <StatusMessage error={status.includes('nicht')}>{status}</StatusMessage>}
      </Form>
    </StyledContainer>
  );
}

export default Contact;