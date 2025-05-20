import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;
  animation: ${fadeIn} 1.5s ease-in-out;
  padding: 20px; /* Ensures content is not too close to the screen edges */
`;

const Form = styled.form`
  background-color: #1e1e1e;
  padding: 2.5rem; /* Adds consistent padding inside the form */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;
  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Ensure the input fields stretch evenly */

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  h2 {
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem; /* Provides spacing between form fields */

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #ccc;
  }

  input,
  textarea {
    width: 100%; /* Make inputs take the full width */
    padding: 0.75rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2a2a2a;
    color: #fff;
    transition: border-color 0.3s;
    box-sizing: border-box; /* Ensures padding is included in the width */

    &:focus {
      border-color: #1db954;
      outline: none;
    }
  }

  textarea {
    height: 120px;
  }
`;

const Button = styled.button`
  background-color: #1db954;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #17a547;
  }

  width: 100%;
  box-sizing: border-box; /* Ensures padding doesn't affect width */
`;

const StatusMessage = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  color: ${(props) => (props.error ? '#ff5252' : '#1db954')};
  text-align: center;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setStatus('Email sent successfully!');
        },
        (error) => {
          console.log(error.text);
          setStatus('Failed to send email.');
        }
      );
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Contact Me</h2>
        <InputGroup>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </InputGroup>
        <Button type="submit">Send</Button>
        {status && <StatusMessage error={status.includes('Failed')}>{status}</StatusMessage>}
      </Form>
    </StyledContainer>
  );
}

export default Contact;
