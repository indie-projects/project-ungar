import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #e0e0e0;
  background: url("/images/IMG-20240802-WA0004.jpg") no-repeat center center;
  width: 100vw;
  height: 100vh;
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
