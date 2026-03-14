import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
export const DEFAULT_SITE_SECTIONS = [
  { key: "hero", label: "🏠 Головна", path: "hero" },
  { key: "weather", label: "🌤️ Погода", path: "weather" },
  { key: "map", label: "🗺️ Кліматична мапа", path: "map" },
  { key: "puzzles", label: "🧩 Пазли", path: "puzzles" },
  { key: "aihelp", label: "🤖 AI-допомога", path: "aihelp" },
  { key: "news", label: "📰 Новини", path: "news" },
  { key: "music", label: "🎵 Музика", path: "music" },
  { key: "fanart", label: "🎨 FanArt", path: "fanart" },
];

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const ModeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)")};
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")};
  }

  @media (min-width: 1920px) {
    padding: 15px 20px;
    gap: 20px;
  }
`;

const Switch = styled.div`
  position: relative;
  width: 36px;
  height: 20px;
  background: ${(props) => (props.$active ? "#ff005d" : "#ccc")};
  border-radius: 20px;
  transition: 0.3s;

  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${(props) => (props.$active ? "18px" : "2px")};
    transition: 0.3s;
  }
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
  animation: ${(props) => (props.$isOpen ? slideDown : slideUp)} 0.4s
    cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (min-width: 768px) {
    padding: 40px;
  }
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
  @media (min-width: 1920px) {
    font-size: 50px;
    top: 30px;
    right: 40px;
  }
`;

const BurgerContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MenuSectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff005d;
  padding-bottom: 5px;
  display: inline-block;
  @media (min-width: 1920px) {
    font-size: 36px;
    margin-bottom: 25px;
  }
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px 12px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.2s ease;
  text-align: left;

  &:hover {
    background: ${(props) =>
      props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
  }

  @media (min-width: 1920px) {
    font-size: 26px;
    margin-bottom: 15px;
    gap: 25px;
    padding: 15px 20px;
  }

  span.icon {
    font-size: 20px;
    @media (min-width: 1920px) {
      font-size: 40px;
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: ${(props) =>
    props.$isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
  border-radius: 10px;

  @media (min-width: 1920px) {
    padding: 15px 25px;
    margin-bottom: 15px;
    border-radius: 20px;
  }
`;
const NavButton = styled.button`
  background: transparent;
  border: none;
  text-align: left;
  color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#ff005d")};
  font-size: 16px;
  font-weight: 600;
  flex-grow: 1;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 15px;
`;

const OrderButton = styled.button`
  background: ${(props) => (props.$isDarkMode ? "#333" : "#eee")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  border-radius: 6px;
  padding: 4px 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  font-size: 14px;
  font-weight: bold;

  &:hover:not(:disabled) {
    background: #ff005d;
    color: white;
    border-color: #ff005d;
  }
  @media (min-width: 1920px) {
    padding: 8px 16px;
    font-size: 24px;
  }
`;

const Menu = ({
  isOpen,
  onClose,
  isDarkMode,
  siteSections,
  resetSiteSections,
  moveSiteSection,
  onToggleTheme,
  onOpenShop,
  onOpenAchievements,
  onOpenSettings,
  onLogout,
  isRoutingMode,
  setIsRoutingMode,
  currentPath,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setIsRendered(true);
    else {
      const timer = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNavClick = (sectionKey, path) => {
    onClose();
    if (isRoutingMode) {
      navigate("/" + path);
    } else {
      const element = document.getElementById(sectionKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (sectionKey === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  if (!isRendered) return null;

  return (
    <>
      <BurgerOverlay
        $isOpen={isOpen}
        $isRendered={isRendered}
        onClick={onClose}
      />
      <BurgerMenuPanel
        $isOpen={isOpen}
        $isRendered={isRendered}
        $isDarkMode={isDarkMode}
      >
        <BurgerCloseBtn onClick={onClose} $isDarkMode={isDarkMode}>
          ✕
        </BurgerCloseBtn>

        <BurgerContentGrid>
          <div>
            <MenuSectionTitle>Навігація та порядок</MenuSectionTitle>
            <div style={{ marginTop: "10px" }}>
              {siteSections &&
                siteSections.map((section, idx) => (
                  <NavItem key={section.key} $isDarkMode={isDarkMode}>
                    <NavButton
                      $isDarkMode={isDarkMode}
                      onClick={() => handleNavClick(section.key, section.path)}
                    >
                      {section.label}
                    </NavButton>
                    {section.key !== "hero" && (
                      <ControlButtons>
                        <OrderButton
                          $isDarkMode={isDarkMode}
                          disabled={idx <= 1}
                          onClick={() => moveSiteSection(idx, -1)}
                          title="Вище"
                        >
                          ↑
                        </OrderButton>
                        <OrderButton
                          $isDarkMode={isDarkMode}
                          disabled={idx === siteSections.length - 1}
                          onClick={() => moveSiteSection(idx, 1)}
                          title="Нижче"
                        >
                          ↓
                        </OrderButton>
                      </ControlButtons>
                    )}
                  </NavItem>
                ))}
            </div>

            <button
              onClick={resetSiteSections}
              style={{
                marginTop: "20px",
                width: "100%",
                cursor: "pointer",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "bold",
                background: "#ff005d",
                color: "white",
              }}
            >
              Скинути порядок секцій
            </button>
          </div>

          <div>
            <MenuSectionTitle>Керування</MenuSectionTitle>
            <LegendList>
              <li>
                <ModeToggle $isDarkMode={isDarkMode} onClick={() => setIsRoutingMode(!isRoutingMode)}>
                  <span className="icon">{isRoutingMode ? "🚀" : "⚓"}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {isRoutingMode ? "Маршрутизація" : "Навігація"}
                    </div>
                    <div style={{ fontSize: "10px", opacity: 0.7 }}>{isRoutingMode ? "Зміна URL" : "Плавний скрол"}</div>
                  </div>
                  <Switch $active={isRoutingMode} />
                </ModeToggle>
              </li>
              <li>
                <ActionButton $isDarkMode={isDarkMode} onClick={onToggleTheme}>
                  <span className="icon">{isDarkMode ? "☀️" : "🌑"}</span> Тема
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenShop();
                    onClose();
                  }}
                >
                  <span className="icon">🧧</span> Магазин
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenAchievements();
                    onClose();
                  }}
                >
                  <span className="icon">🏆</span> Досягнення
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenSettings();
                    onClose();
                  }}
                >
                  <span className="icon">⚙️</span> Налаштування
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  <span className="icon">🚪</span> Вихід
                </ActionButton>
              </li>
            </LegendList>
          </div>
        </BurgerContentGrid>
      </BurgerMenuPanel>
    </>
  );
};

export default Menu;
