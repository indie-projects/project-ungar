import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const bounce = keyframes`
  0% { top: 0; left: 0; }
  25% { top: 0; left: calc(100% - 100px); }
  50% { top: calc(100% - 100px); left: calc(100% - 100px); }
  75% { top: calc(100% - 100px); left: 0; }
  100% { top: 0; left: 0; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #ff3333, 0 0 10px #ff3333, 0 0 15px #ff3333; }
  100% { text-shadow: 0 0 20px #ff3333, 0 0 30px #ff3333, 0 0 40px #ff3333; }
`;

// Hauptcontainer für die Landing Page (vollbild ohne scrollen)
const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  animation: ${fadeIn} 1.5s ease-in-out;
  overflow: hidden;
  margin: 0; /* Verhindert unerwünschte Abstände */

  @media (max-width: 768px) {
    padding: 10px;
    justify-content: flex-start;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    margin-top: 10px;
  }

  & h1 {
    margin: 25px 10px;
  }
`;

// Animiertes Hintergrundlogo
const BackgroundLogo = styled.img`
  position: absolute;
  width: 100px;
  height: auto;
  animation: ${bounce} 5s infinite linear;
  opacity: 0.15;
  pointer-events: none;
`;

// Akzentfarbe für Call-to-Action (mit responsiver Schriftgröße)
const HighlightText = styled.span`
  color: #ff3333;
  font-size: clamp(1.5em, 6vw, 3em);
  font-weight: bold;
  animation: ${glow} 2s infinite alternate;
`;

// InfoText Komponente für zusätzliche Infos (mit responsiver Schriftgröße)
const InfoText = styled.p`
  font-size: clamp(1em, 4vw, 1.5em);
  margin: 10px 0;
`;

// Kontaktinformationen (auch responsive)
const ContactInfo = styled.div`
  font-size: clamp(0.8em, 2.5vw, 1.2em);
  margin-top: 20px;
  color: #bfbfbf;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Footer-Text (auch responsiv)
const FooterText = styled.p`
  font-size: clamp(0.8em, 1.5vw, 1em);
  margin-top: 10px;
  color: #666;
`;

const Home = () => {
  return (
    <HomeContainer>
      {/* Das animierte Logo im Hintergrund */}
      {/* <BackgroundLogo src="/logo_favicon.webp" alt="Bouncing Logo" /> */}

      <h1>
        HANGTECHNIKA <HighlightText>BÉRLÉS</HighlightText>
      </h1>

      <InfoText>
        BÁROK / KLUBOK / ESKÜVŐK
        <br />
        SZÜLETÉSNAPOK / RENDEZVÉNYEK
      </InfoText>

      <ContactInfo>
        <strong>BUDAPEST TERÜLETÉN INGYENES KISZÁLLÁS!</strong>
        <p>Profi szakértelem • Gyors telepítés • Megfizethető ár</p>
        <p>Telefon: +36 30 994 3215</p>
        <p>Email: nonamesound0@gmail.com</p>
      </ContactInfo>

      <FooterText>"Szóljon, hogy minőség szóljon!"</FooterText>
    </HomeContainer>
  );
};

export default Home;
