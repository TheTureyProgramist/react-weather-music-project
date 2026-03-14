import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const BurgerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: ${(props) => (props.$isRendered ? "block" : "none")};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const BurgerMenuPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  background: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  z-index: 1001;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.$isRendered ? "block" : "none")};
  animation: ${(props) => (props.$isOpen ? slideDown : slideUp)} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (min-width: 768px) { padding: 40px; }
  @media (min-width: 1920px) {
    padding: 60px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
`;

const BurgerCloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
  @media (min-width: 1920px) { font-size: 50px; top: 30px; right: 40px; }
`;

const BurgerContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;
  @media (min-width: 1024px) { grid-template-columns: 1fr 1fr; }
`;

const MenuSectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff005d;
  padding-bottom: 5px;
  display: inline-block;
  @media (min-width: 1920px) { font-size: 36px; margin-bottom: 25px; }
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 12px;
    font-size: 14px;
    @media (min-width: 1920px) { font-size: 26px; margin-bottom: 20px; gap: 25px; }
    span.icon { font-size: 20px; @media (min-width: 1920px) { font-size: 40px; } }
  }
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li { margin-bottom: 10px; @media (min-width: 1920px) { margin-bottom: 20px; } }
  a {
    text-decoration: none;
    color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#ff005d")};
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.2s;
    &:hover { opacity: 0.7; }
    @media (min-width: 1920px) { font-size: 30px; }
  }
`;

const SectionOrderContainer = styled.div`
  background: #ff005d;
  color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px #0001;
  margin-top: 10px;
  @media (min-width: 1920px) {
    padding: 24px;
    border-radius: 20px;
    div span { font-size: 22px !important; }
    button { font-size: 20px !important; padding: 10px 16px !important; }
  }
`;

const Menu = ({
  isOpen,
  onClose,
  isDarkMode,
  siteSections,
  moveSiteSection,
  resetSiteSections
}) => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <>
      <BurgerOverlay $isOpen={isOpen} $isRendered={isRendered} onClick={onClose} />
      <BurgerMenuPanel $isOpen={isOpen} $isRendered={isRendered} $isDarkMode={isDarkMode}>
        <BurgerCloseBtn onClick={onClose} $isDarkMode={isDarkMode}>✕</BurgerCloseBtn>
        
        <BurgerContentGrid>
          <div>
            <MenuSectionTitle>Навігація</MenuSectionTitle>
            <NavLinksList $isDarkMode={isDarkMode}>
              <li><Link to="/" onClick={onClose}>Погода (Головна)</Link></li>
              <li><Link to="/home" onClick={onClose}>Всі секції (Стрічка)</Link></li>
              <li><Link to="/news" onClick={onClose}>Новини</Link></li>
              <li><Link to="/music" onClick={onClose}>Музика</Link></li>
              <li><Link to="/climatemap" onClick={onClose}>Кліматична мапа</Link></li>
              <li><Link to="/puzzles" onClick={onClose}>Пазли</Link></li>
              <li><Link to="/photos" onClick={onClose}>Фото (Fan-Art)</Link></li>
              <li><Link to="/aihelp" onClick={onClose}>AI-допомога</Link></li>
            </NavLinksList>

            <MenuSectionTitle style={{ marginTop: "30px" }}>Порядок секцій</MenuSectionTitle>
            <SectionOrderContainer>
              {siteSections && siteSections.map((section, idx) => (
                <div key={section.key} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ minWidth: 140, fontWeight: 500, color: "white" }}>{section.label}</span>
                  <button
                    style={{ marginLeft: "auto", padding: "4px 8px" }}
                    disabled={idx === 0}
                    onClick={() => moveSiteSection(idx, -1)}
                  >↑</button>
                  <button
                    style={{ marginLeft: "4px", padding: "4px 8px" }}
                    disabled={idx === siteSections.length - 1}
                    onClick={() => moveSiteSection(idx, 1)}
                  >↓</button>
                </div>
              ))}
              <button 
                onClick={resetSiteSections}
                style={{ marginTop: "10px", width: "100%", cursor: "pointer", padding: "8px", borderRadius: "6px", border: "none", fontWeight: "bold" }}
              >
                Скинути порядок
              </button>
            </SectionOrderContainer>
          </div>

          <div>
            <MenuSectionTitle>Значки функціоналу</MenuSectionTitle>
            <LegendList>
              <li><span className="icon">☀️ / 🌑</span> Перемикач теми</li>
              <li><span className="icon">🧧</span> Магазин</li>
              <li><span className="icon">🏆</span> Досягнення</li>
              <li><span className="icon">⚙️</span> Налаштування профілю</li>
              <li><span className="icon">🚪</span> Вихід</li>
            </LegendList>
          </div>
        </BurgerContentGrid>
      </BurgerMenuPanel>
    </>
  );
};

export default Menu;