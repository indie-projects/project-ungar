import React from "react";
import styled from "styled-components";

// Hauptcontainer für die Landing Page
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1a1a1a;
  color: #e0e0e0;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
    min-height: 100vh; /* Stelle sicher, dass die Höhe des Containers mindestens so groß wie der Viewport ist */

  overflow: visible; /* Stelle sicher, dass die Überlaufbehandlung auf 'auto' oder 'scroll' gesetzt ist */
`;

// Akzentfarbe für Call-to-Action (rot für BÉRLÉS)
const HighlightText = styled.span`
  color: #ff3333; /* Roter Text für Akzente */
  font-size: 2.5em;
  font-weight: bold;
`;

// Container für zusätzliche Infos (Bars, Klubs etc.)
const InfoText = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
`;

// QR-Code Container (kann Bild oder anderes sein)
const QRCodeContainer = styled.div`
  margin: 20px 0;

  img {
    width: 150px;
    height: 150px;
  }
`;

// Kontaktinformationen
const ContactInfo = styled.div`
  font-size: 1em;
  margin-top: 20px;
  color: #bfbfbf;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Social Media Links
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;

  a {
    color: #ff9f43; /* Orange Akzentfarbe */
    font-size: 1.5em;
    transition: color 0.3s ease;

    &:hover {
      color: #ff3333;
    }
  }
`;

// Footer-Text (Schriftzug unten)
const FooterText = styled.p`
  font-size: 0.9em;
  margin-top: 10px;
  color: #666;
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>HANGTECHNIKA <HighlightText>BÉRLÉS</HighlightText></h1>
      <InfoText>
        BÁROK / KLUBOK / ESKÜVŐK<br />
        SZÜLETÉSNAPOK / RENDEZVÉNYEK
      </InfoText>
      
      <QRCodeContainer>
        {/* Platzhalter für den QR-Code */}
        <img src="/path-to-your-qr-code-image.png" alt="QR Code" />
        <p style={{ color: '#32CD32', marginTop: '10px', fontSize: '0.9em' }}>Termékeinkhez <strong>Olvassa be</strong> a QR Kódot!</p>
      </QRCodeContainer>
      
      <ContactInfo>
        <strong>BUDAPEST TERÜLETÉN INGYENES KISZÁLLÁS!</strong>
        <p>Profi szakértelem • Gyors telepítés • Megfizethető ár</p>
        <p>Telefon: +36 30 994 3215</p>
        <p>Email: nonamesound0@gmail.com</p>
      </ContactInfo>
      
      <SocialLinks>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">F</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">T</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">I</a>
      </SocialLinks>

      <FooterText>
        "Szóljon, hogy minőség szóljon!"
      </FooterText>
    </HomeContainer>
  );
};

export default Home;
