import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #e0e0e0;
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
