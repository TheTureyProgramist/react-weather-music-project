import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import turkeys from "../photos/vip-images/sirenhead/sirenhead.webp";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${(props) =>
    props.$isDarkMode
      ? `url(${turkeys}) center/cover no-repeat, linear-gradient(135deg, #000000 0%, #000000 100%)`
      : `url(${turkeys}) center/cover no-repeat, linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#333333")};
  font-family: var(--font-family, 'Inter', sans-serif);
  text-align: center;
  padding: 20px;
  overflow: hidden;
`;
const GlitchText = styled(motion.h1)`
  font-size: 8rem;
  margin: 0;
  font-weight: 900;
  background: ${(props) => (props.$isDarkMode ? "linear-gradient(90deg, #ffb36c, #94fffa)" : "linear-gradient(90deg, #ff7e5f, #feb47b)")};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.3));
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;
const Description = styled(motion.p)`
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 750px;
  background: #0000009b;
  margin-bottom: 40px;
  line-height: 1.5;
`;
const HomeButton = styled(Link)`
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};
  background: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#333")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "transparent" : "#333")};
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  
  &:hover {
    background: ${(props) => (props.$isDarkMode ? "#ffa149" : "#555")};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const NotFound = ({ isDarkMode = true }) => {
  return (
    <Container $isDarkMode={isDarkMode}>
      <GlitchText 
        $isDarkMode={isDarkMode}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        404
      </GlitchText>
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
       Уведіть правильну назву сторінки! Треба було Доміно поставити на фото, чи Ніцерона. А хоча воно ніби наказує що ти маєш не залишатися тут довго.
      </Description>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HomeButton to="/" $isDarkMode={isDarkMode}>
          Повернутися на головну
        </HomeButton>
      </motion.div>
    </Container>
  );
};

export default NotFound;
