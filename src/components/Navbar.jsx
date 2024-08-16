import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import picture from "../"

// Keyframe für sanftes Einblenden des Navbars
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframe für Hover-Effekt auf Buttons
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const NavbarContainer = styled.nav`
  background-color: #1a1a1a; /* Sehr dunkler Hintergrund */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Dunklerer Schatten */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
`;

const NavLink = styled(Link)`
  color: #f0f0f0; /* Hellerer Text für besseren Kontrast */
  text-decoration: none;
  font-size: 1.2em;
  position: relative;

  &:hover {
    color: #ff9f43; /* Auffällige Akzentfarbe bei Hover */
    transition: color 0.3s ease-in-out;
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #ff9f43; /* Gleiche Akzentfarbe */
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover:before {
    visibility: visible;
    width: 100%;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 15px;
`;

const LanguageButton = styled.button`
  background-color: transparent;
  color: #f0f0f0; /* Heller Text */
  border: 1px solid #f0f0f0;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    animation: ${pulse} 0.5s ease-in-out;
    background-color: #ff9f43; /* Akzentfarbe */
    color: #1a1a1a; /* Text wird dunkel */
  }
`;

const Navbar = ({ currentLanguage, switchLanguage }) => {
  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink to="/">
          {currentLanguage === "hu" ? "Főoldal" : "Home"}
        </NavLink>
        <NavLink to="/products">
          {currentLanguage === "hu" ? "Termékek" : "Products"}
        </NavLink>
        <NavLink to="/contact">
          {currentLanguage === "hu" ? "Kapcsolat" : "Contact"}
        </NavLink>
      </NavLinks>
      <LanguageSwitcher>
        <LanguageButton onClick={() => switchLanguage("hu")}>HU</LanguageButton>
        <LanguageButton onClick={() => switchLanguage("en")}>EN</LanguageButton>
      </LanguageSwitcher>
    </NavbarContainer>
  );
};

export default Navbar;
