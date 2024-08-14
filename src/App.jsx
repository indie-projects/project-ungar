import EmailJs from "./components/EmailJs"
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Home from "./components/Home";
import Contact from "./components/Contact";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("hu");

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
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
       {/* Entfernte EmailJs-Komponente, die nicht verwendet wurde */}
      {/* <EmailJs/> */}
    </Router>
  );
}

export default App;
