import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import logo from "../assets/IMG_0106.png";
import CartContext from '../hooks/CartContext';
import { FaBars, FaTimes, FaShoppingCart, FaHome, FaBoxOpen, FaEnvelope } from "react-icons/fa";

// Keyframes für Animationen
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const NavbarContainer = styled.nav`
  background-color: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 4px 15px rgba(200, 200, 200, 0.15);
  transition: all 0.3s ease;

  @media (max-width: 992px) {
    padding: 12px 4%;
  }

  @media (max-width: 768px) {
    padding: 10px 3%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  &:hover img {
    animation: ${pulse} 0.5s ease-in-out;
  }
`;

const Logo = styled.img`
  height: auto;
  width: auto;
  max-height: 60px;
  transition: transform 0.3s ease;
  
  @media (max-width: 992px) {
    max-height: 50px;
  }
  
  @media (max-width: 768px) {
    max-height: 40px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 992px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    height: 100vh;
    width: 250px;
    background-color: rgba(26, 26, 26, 0.98);
    backdrop-filter: blur(15px);
    padding: 80px 30px 30px;
    gap: 25px;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    transition: right 0.4s cubic-bezier(0.77, 0.2, 0.05, 1.0);
    overflow-y: auto;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: #f0f0f0;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  transition: all 0.3s ease;

  &:hover {
    color: #ff9f43;
    transform: translateY(-2px);
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
    padding: 10px 0;
    
    &:hover {
      transform: translateX(5px);
    }
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #f0f0f0;
  z-index: 200;
  transition: all 0.3s ease;

  &:hover {
    color: #ff9f43;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: opacity 0.3s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 15px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 15px;
    width: 100%;
    justify-content: flex-start;
  }
`;

const LanguageButton = styled.button`
  background-color: ${({ $active }) => ($active ? "#ff9f43" : "transparent")};
  color: ${({ $active }) => ($active ? "#1a1a1a" : "#f0f0f0")};
  border: 1px solid ${({ $active }) => ($active ? "#ff9f43" : "#f0f0f0")};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: #ff9f43;
    color: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 159, 67, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 1rem;
  }
`;

const CartItemCount = styled.span`
  background-color: #ff9f43;
  color: #1a1a1a;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: 700;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  
  animation: ${props => props.$animate ? pulse : 'none'} 0.5s ease-in-out;
`;

const NavIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Navbar = ({ currentLanguage, switchLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);
  const { cartItemCount } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    // Schließe das Menü, wenn sich die Route ändert
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Animiere die Warenkorb-Zahl, wenn sich die Anzahl ändert
    if (cartItemCount > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  useEffect(() => {
    // Verhindere Scrollen des Hintergrunds, wenn Menü geöffnet ist
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <NavbarContainer>
        <NavLinkStyled to="/">
          <LogoContainer>
            <Logo src={logo} alt="Logo" />
          </LogoContainer>
        </NavLinkStyled>
        <HamburgerMenu onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </HamburgerMenu>
        <NavLinks $isOpen={menuOpen}>
          <NavLinkStyled to="/" $isActive={isActive("/")} onClick={() => setMenuOpen(false)}>
            <FaHome />
            {currentLanguage === "hu" ? "Főoldal" : "Home"}
          </NavLinkStyled>
          <NavLinkStyled to="/products" $isActive={isActive("/products")} onClick={() => setMenuOpen(false)}>
            <FaBoxOpen />
            {currentLanguage === "hu" ? "Termékek" : "Products"}
          </NavLinkStyled>
          <NavLinkStyled to="/contact" $isActive={isActive("/contact")} onClick={() => setMenuOpen(false)}>
            <FaEnvelope />
            {currentLanguage === "hu" ? "Kapcsolat" : "Contact"}
          </NavLinkStyled>
          <NavLinkStyled to="/cart" $isActive={isActive("/cart")} onClick={() => setMenuOpen(false)}>
            <NavIconWrapper>
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <CartItemCount $animate={cartAnimate}>
                  {cartItemCount}
                </CartItemCount>
              )}
            </NavIconWrapper>
            {currentLanguage === "hu" ? "Kosár" : "Cart"}
          </NavLinkStyled>
          <LanguageSwitcher>
            <LanguageButton 
              onClick={() => switchLanguage("hu")} 
              $active={currentLanguage === "hu"}
            >
              HU
            </LanguageButton>
            <LanguageButton 
              onClick={() => switchLanguage("en")} 
              $active={currentLanguage === "en"}
            >
              EN
            </LanguageButton>
          </LanguageSwitcher>
        </NavLinks>
      </NavbarContainer>
      <Overlay $isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;