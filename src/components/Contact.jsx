import React, { useState } from "react";
import emailjs from "emailjs-com";
import styled, { keyframes } from "styled-components";

// Keyframes for animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #ff3333, 0 0 10px #ff3333, 0 0 15px #ff3333; }
  100% { text-shadow: 0 0 20px #ff3333, 0 0 30px #ff3333, 0 0 40px #ff3333; }
`;

// Hauptcontainer für das Kontaktformular
const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  color: #e0e0e0;
  animation: ${fadeIn} 1.5s ease-in-out;
  padding: 20px;
  text-align: center;
  

  @media (max-width: 768px) {
    padding: 15px;
    min-height: calc(100vh - 50px);
    display: flex;
    align-items: flex-start; /* Vertikal zentrieren */
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 10px;
    min-height: calc(100vh - 30px);
  }
`;

const Form = styled.form`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  // max-width: 100px;
  max-height: 500px; /* Mindesthöhe für das Formular */

  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriere den Inhalt im Formular */
  justify-content: center; /* Stelle sicher, dass der Inhalt auch vertikal zentriert ist */

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  h2 {
    margin-bottom: 1.5rem;
    color: #ff3333;
    font-size: clamp(1.5em, 5vw, 2.5em);
    font-weight: bold;
    animation: ${glow} 2s infinite alternate;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #ccc;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: #fff;
    transition: border-color 0.3s;
    box-sizing: border-box;

    &:focus {
      border-color: #ff3333;
      outline: none;
    }
  }

  textarea {
    height: 120px;
  }
`;

const Button = styled.button`
  background-color: #ff3333;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #cc2929;
  }

  width: 100%;
  box-sizing: border-box;
`;

const StatusMessage = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  color: ${(props) => (props.error ? "#ff5252" : "#1db954")};
  text-align: center;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

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
          setStatus("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send email.");
        }
      );
  };

  return (
    <ContactContainer>
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
        {status && (
          <StatusMessage error={status.includes("Failed")}>
            {status}
          </StatusMessage>
        )}
      </Form>
    </ContactContainer>
  );
}

export default Contact;
