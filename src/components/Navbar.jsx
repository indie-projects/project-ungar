import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/IMG_0106.png";

// Keyframes für sanftes Einblenden des Navbars
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

const NavbarContainer = styled.nav`
  background-color: #1a1a1a;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) =>
      isOpen
        ? "flex"
        : "none"}; // Csak akkor jelenik meg, ha a hamburger menü nyitva van
  }
`;

const NavLink = styled(Link)`
  color: #f0f0f0;
  text-decoration: none;
  font-size: 1.2em;
  position: relative;

  &:hover {
    color: #ff9f43;
    transition: color 0.3s ease-in-out;
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #ff9f43;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover:before {
    visibility: visible;
    width: 100%;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  font-size: 2em;
  cursor: pointer;
  color: #f0f0f0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const LanguageButton = styled.button`
  background-color: transparent;
  color: #f0f0f0;
  border: 1px solid #f0f0f0;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: #ff9f43;
    color: #1a1a1a;
  }
`;

const Navbar = ({ currentLanguage, switchLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <NavLink to="/">
        <Logo src={logo} alt="Logo" />
      </NavLink>
      <HamburgerMenu onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </HamburgerMenu>
      <NavLinks isOpen={menuOpen}>
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
