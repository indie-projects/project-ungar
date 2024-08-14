import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 10px;
`;

const LanguageButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #333;
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
