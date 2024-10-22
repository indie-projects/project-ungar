import React, { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import logo from "../assets/IMG_0106.png";
import CartContext from '../CartContext';
import { FaBars, FaTimes, FaShoppingCart, FaHome, FaBoxOpen, FaEnvelope } from "react-icons/fa";

// Keyframes for sanftes Einblenden des Navbars
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
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 4px 8px 4px rgba(200, 200, 200, 0.3);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 100px;
  transform: scale(2.8);
  position: relative;
  left: 30px;
  cursor: pointer;
  
  @media (min-width: 768px) {
    transform: scale(3.5);
    left: 40px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 60%;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: absolute;
    top: 100px;
    right: 0;
    background-color: #1a1a1a;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0px 10px 6px rgba(200, 200, 200, 0.3);
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: #f0f0f0;
  text-decoration: none;
  font-size: 1.2em;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;

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

  ${props => props.$isActive && css`
    color: #ff9f43;
    &:before {
      visibility: visible;
      width: 100%;
    }
  `}
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
    justify-content: center;
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

const CartItemCount = styled.span`
  background-color: #ff9f43;
  color: #1a1a1a;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
  margin-left: 5px;
`;

const Navbar = ({ currentLanguage, switchLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItemCount } = useContext(CartContext);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <NavbarContainer>
      <NavLinkStyled to="/">
        <Logo src={logo} alt="Logo" />
      </NavLinkStyled>
      <HamburgerMenu onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </HamburgerMenu>
      <NavLinks $isOpen={menuOpen}>
        <NavLinkStyled to="/" $isActive={isActive("/")}>
          <FaHome />
          {currentLanguage === "hu" ? "Főoldal" : "Home"}
        </NavLinkStyled>
        <NavLinkStyled to="/products" $isActive={isActive("/products")}>
          <FaBoxOpen />
          {currentLanguage === "hu" ? "Termékek" : "Products"}
        </NavLinkStyled>
        <NavLinkStyled to="/contact" $isActive={isActive("/contact")}>
          <FaEnvelope />
          {currentLanguage === "hu" ? "Kapcsolat" : "Contact"}
        </NavLinkStyled>
        <NavLinkStyled to="/cart" $isActive={isActive("/cart")}>
          <FaShoppingCart />
          {currentLanguage === "hu" ? "Kosár" : "Cart"}
          {cartItemCount > 0 && <CartItemCount>{cartItemCount}</CartItemCount>}
        </NavLinkStyled>
        <LanguageSwitcher>
          <LanguageButton onClick={() => switchLanguage("hu")}>
            HU
          </LanguageButton>
          <LanguageButton onClick={() => switchLanguage("en")}>
            EN
          </LanguageButton>
        </LanguageSwitcher>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;