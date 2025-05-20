import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px #ff3333, 0 0 10px #ff3333, 0 0 15px #ff3333; }
  100% { text-shadow: 0 0 20px #ff3333, 0 0 30px #ff3333, 0 0 40px #ff3333; }
`;

// Hauptcontainer für die Landing Page (16:9 Verhältnis)
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1a1a1a;
  color: #e0e0e0;
  width: 100vw;
  height: calc(100vw * 9 / 16); // 16:9 Verhältnis
  padding: 0px 20px;
  box-sizing: border-box;
  overflow: visible;
  animation: ${fadeIn} 1.5s ease-in-out;

  & h1 {
    margin: 25px 10px;
  }

  @media (max-width: 1024px) {
    height: auto; // Falls das Bildschirmverhältnis abweicht
  }
`;

// Akzentfarbe für Call-to-Action (mit responsiver Schriftgröße)
const HighlightText = styled.span`
  color: #ff3333;
  font-size: clamp(
    1.5em,
    6vw,
    3em
  ); // Minimum: 1.5em, Dynamisch: 6vw, Maximum: 3em
  font-weight: bold;
  animation: ${glow} 2s infinite alternate;
`;

// InfoText Komponente für zusätzliche Infos (mit responsiver Schriftgröße)
const InfoText = styled.p`
  font-size: clamp(
    1em,
    4vw,
    1.5em
  ); // Dynamische Schriftgröße zwischen 1em und 1.5em
  margin: 10px 0;
`;

// QR-Code Container (kann Bild oder anderes sein)
const QRCodeContainer = styled.div`
  margin: 20px 0;
  animation: ${bounce} 2s infinite;

  img {
    width: 150px;
    height: 150px;
  }
`;

// Kontaktinformationen (auch responsive)
const ContactInfo = styled.div`
  font-size: clamp(
    0.8em,
    2.5vw,
    1.2em
  ); // Dynamische Schriftgröße für kleinere Infos
  margin-top: 20px;
  color: #bfbfbf;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Footer-Text (auch responsiv)
const FooterText = styled.p`
  font-size: clamp(0.8em, 1.5vw, 1em); // Dynamisch zwischen 0.8em und 1em
  margin-top: 10px;
  color: #666;
`;

// Logo Animation
const Logo = styled.img`
  width: 200px;
  height: auto;
  margin: 20px 0;
  scale: 2.5;

  animation: ${bounce} 4s infinite alternate;
  @media (min-width: 1024px) {
    scale: 5;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>
        HANGTECHNIKA <HighlightText>BÉRLÉS</HighlightText>
      </h1>
      <Logo src="/logo_favicon.webp" alt="Firmenlogo" />

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
