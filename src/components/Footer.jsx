import React from "react";
import styled from "styled-components";
import { FaLinkedin } from "react-icons/fa";

// Footer Container Styling
const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #111;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  font-size: 14px;
  z-index: 1000;
  height: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    // height; 1px;
  }
`;

// Footer Links Styling
const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
  a {
    color: #8aaaff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

// Developer Credits Styling
const DeveloperCredits = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    margin-right: 5px;
  }
  a {
    display: flex;
    align-items: center;
    color: #8aaaff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

// LinkedIn Icon Styling
const LinkedInIcon = styled(FaLinkedin)`
  margin-left: 5px;
  color: #8aaaff;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #ffffff;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* Footer Links */}
      <FooterLinks>
        <a href="/impressum" target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
        <a href="/dsvgo" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung
        </a>
      </FooterLinks>

      {/* Developer Credits */}
      <DeveloperCredits>
        <span>Developed by:</span>
        <a
          href="https://github.com/Bratpfanne92"
          target="_blank"
          rel="noopener noreferrer"
        >
          Norbert Friedrich
          <LinkedInIcon size={18} />
        </a>
        <span>&</span>
        <a
          href="https://github.com/Oliverwebdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oliver Spörl
          <LinkedInIcon size={18} />
        </a>
      </DeveloperCredits>
    </FooterContainer>
  );
};

export default Footer;
