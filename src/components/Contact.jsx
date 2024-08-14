// src/components/Contact.jsx
import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #e0e0e0;
`;

const Contact = ({ currentLanguage }) => {
  return (
    <ContactContainer>
      <h1>{currentLanguage === "hu" ? "Kapcsolat" : "Contact"}</h1>
      <p>
        {currentLanguage === "hu"
          ? "Lépj kapcsolatba velünk!"
          : "Get in touch with us!"}
      </p>
    </ContactContainer>
  );
};

export default Contact;
