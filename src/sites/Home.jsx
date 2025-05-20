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

// Responsiver Hauptcontainer
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1a1a1a;
  color: #e0e0e0;
  width: 100%;
  min-height: 100vh; // Verwendet die volle Bildschirmhöhe
  height: 100%; // Passt sich dem Inhalt an
  padding: 20px;
  box-sizing: border-box;
  animation: ${fadeIn} 1.5s ease-in-out;
  position: relative;
  
  /* Sicherstellen, dass der Footer berücksichtigt wird */
  padding-bottom: 80px; 

  @media (max-height: 600px) {
    padding: 10px;
  }
`;

// Content Container für vertikale Zentrierung
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: 1200px;
`;

// Responsive Hauptüberschrift
const MainHeading = styled.h1`
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  margin: 0;
  padding: 10px 0;
  
  @media (max-height: 500px) {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin: 5px 0;
  }
`;

// Akzentfarbe für Call-to-Action
const HighlightText = styled.span`
  color: #ff3333;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: bold;
  animation: ${glow} 2s infinite alternate;
  
  @media (max-height: 500px) {
    font-size: clamp(1.6rem, 5vw, 3rem);
  }
`;

// InfoText Komponente für zusätzliche Infos
const InfoText = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin: 10px 0;
  
  @media (max-height: 500px) {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
    margin: 5px 0;
  }
`;

// Logo Animation mit besserer Responsivität
const Logo = styled.img`
  width: auto;
  height: clamp(80px, 15vh, 200px);
  margin: 15px 0;
  animation: ${bounce} 4s infinite alternate;
  
  @media (max-height: 500px) {
    height: clamp(60px, 12vh, 120px);
    margin: 8px 0;
  }
`;

// Kontaktinformationen
const ContactInfo = styled.div`
  font-size: clamp(0.8rem, 2.5vw, 1.2rem);
  margin-top: 15px;
  color: #bfbfbf;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  @media (max-height: 500px) {
    font-size: clamp(0.7rem, 2vw, 1rem);
    gap: 2px;
    margin-top: 8px;
  }
  
  & strong {
    font-size: clamp(0.9rem, 2.8vw, 1.3rem);
  }
  
  & p {
    margin: 3px 0;
  }
`;

// Footer-Text
const FooterText = styled.p`
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  margin-top: 15px;
  color: #666;
  font-style: italic;
  
  @media (max-height: 500px) {
    margin-top: 8px;
    font-size: clamp(0.7rem, 1.2vw, 0.9rem);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <ContentContainer>
        <MainHeading>
          HANGTECHNIKA <HighlightText>BÉRLÉS</HighlightText>
        </MainHeading>
        
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
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;