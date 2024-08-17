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

  html, body, #root {
    height: 100%; /* Stellt sicher, dass die Höhe des Bildschirms immer eingenommen wird */
  }

  body {
    font-family: Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    background-color: #1a1a1a;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
        overflow-y: auto; /* Ermöglicht Scrollen, wenn der Inhalt zu groß ist */
    max-width: 100%; 
  }

  footer {
    margin-top: auto;
  }

  @media (max-width: 768px) {
    main {
      padding: 10px;
      justify-content: flex-start;
      align-items: flex-start;
            flex-direction: column; /* Stellt sicher, dass der Inhalt bei kleineren Bildschirmen vertikal angeordnet wird */

    }
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
        <main style={{ flexGrow: 1, display: "flex" }}>
          <Routes>
            <Route
              path="/"
              element={<Home currentLanguage={currentLanguage} />}
            />
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
