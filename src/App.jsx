import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Contact from "./components/Contact";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // overflow: hidden;
  }
  
  body {
    font-family: Arial, sans-serif; /* Optional: Setze eine Standard-Schriftart */
    overflow: hidden; /* Verhindert das Scrollen des gesamten Körpers */
  }
`;

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("hu");

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <>
      <GlobalStyle /> {/* Fügt die globalen Stile hinzu */}
      <Router>
        <Navbar
          currentLanguage={currentLanguage}
          switchLanguage={switchLanguage}
        />
        <Routes>
          <Route path="/" element={<Home currentLanguage={currentLanguage} />} />
          <Route
            path="/products"
            element={<Products currentLanguage={currentLanguage} />}
          />
          <Route
            path="/contact"
            element={<Contact currentLanguage={currentLanguage} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
