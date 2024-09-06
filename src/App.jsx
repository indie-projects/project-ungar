import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { CartProvider } from "./CartProvider";
import Cart from "./components/Cart";   

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #1a1a1a;
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px; /* Anpassen an die Höhe Ihres Footers */
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("hu");

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <>
      <GlobalStyle />
      <CartProvider>
        <Router>
          <ContentWrapper>
            <Navbar
              currentLanguage={currentLanguage}
              switchLanguage={switchLanguage}
            />
            <main>
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
                <Route
                  path="/cart"
                  element={<Cart currentLanguage={currentLanguage} />}
                />
              </Routes>
            </main>
          </ContentWrapper>
          <Footer />
        </Router>
      </CartProvider>
    </>
  );
}

export default App;