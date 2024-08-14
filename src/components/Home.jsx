import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #e0e0e0;
  background: url("/images/IMG-20240802-WA0004.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  width: 100%; /* Vermeide 100vw, damit der Scrollbalken nicht berücksichtigt wird */
  height: 100vh;
  box-sizing: border-box; /* Stellt sicher, dass Padding nicht zur Gesamtbreite addiert wird */
  overflow-x: hidden; /* Verhindert horizontales Scrollen */
  margin: 0; /* Entfernt Standard-Margin, die zu Überlauf führen kann */
`;

const Home = ({ currentLanguage }) => {
  return (
    <HomeContainer>
      <h1>{currentLanguage === "hu" ? "Főoldal" : "Home"}</h1>
      <p>
        {currentLanguage === "hu"
          ? "Üdvözlünk a weboldalunkon!"
          : "Welcome to our website!"}
      </p>
    </HomeContainer>
  );
};

export default Home;
