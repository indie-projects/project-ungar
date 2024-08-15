import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer"; // Importiere den Footer

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    min-height: 100vh; /* Körper auf volle Höhe setzen */
    display: flex;
    flex-direction: column; /* Ermöglicht Flexbox-Ausrichtung */
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1; /* Der Hauptinhalt wächst, um den restlichen Platz auszufüllen */
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
        <main> {/* Wrapper für Hauptinhalt */}
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
        </main>
        <Footer /> {/* Footer wird hier hinzugefügt */}
      </Router>
    </>
  );
}

export default App;
