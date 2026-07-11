import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../photos/hero-header/logo.webp";
import { BsMoonStarsFill } from "react-icons/bs";
import BurgerMenu from "./Menu.jsx";
import { IoIosEye } from "react-icons/io";
import { GiShop, GiExitDoor, GiAchievement } from "react-icons/gi";
import { FaSun } from "react-icons/fa";
import { MdSettingsSuggest, MdMore } from "react-icons/md";
import bell from "../../mp3/modals/bell.mp3";
import logofix from "../../photos/hero-header/logo-fix.webp";
import { useVisualFilters } from "./useVisualFilters";
const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInHeader = keyframes`
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeaderDiv = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid #8f8f8f;
  position: fixed;
  background: ${(props) => (props.$isDarkMode ? "#000000" : "white")};
  color: ${(props) => (props.$isDarkMode ? "white" : "#000000")};
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  animation: ${fadeInHeader} 0.8s ease-out 5.3s both;
  margin: 0;
`;

const HeaderFix = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 5px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-shrink: 0;
  font-size: 9px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const EmojiWrapper = styled.span`
  display: inline-block;
  font-size: 18px;
`;

const UserName = styled.span`
  font-size: 7px;
  font-weight: bold;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 3px;
  flex-shrink: 2;

  @media (min-width: 400px) {
    max-width: 150px;
  }
  @media (min-width: 768px) {
    font-size: 13px;
    max-width: 450px;
  }

  ${(props) => {
    if (props.$uColor?.includes("linear")) {
      return css`
        background: ${props.$uColor};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 400% 400%;
        animation: ${flow} 5s ease infinite;
      `;
    }
    return `color: ${props.$uColor || "inherit"};`;
  }}
`;

const HeaderAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  min-width: 30px;
  margin-right: 0;
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid transparent;
  box-sizing: border-box;
  background-image: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? `linear-gradient(white, white), ${props.$bColor}`
      : "none"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? "transparent"
      : props.$bColor || "transparent"};
`;

const VipTextWrapper = styled.div`
  display: grid;
  cursor: pointer;
  align-items: center;
  margin-left: 5px;
  flex-shrink: 0;
`;

const RainbowText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 7px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.3px 0px;
  border: 2px solid;
  border-image-source: linear-gradient(
    45deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #8b00ff
  );
  border-image-slice: 1;
  margin: 0;
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #8b00ff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  grid-area: 1/1;
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const UltraText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 7px;
  border: 2px solid;
  border-image-source: linear-gradient(
    270deg,
    #ff7eb3,
    #ff758c,
    #7afcff,
    #feffb7,
    #58e2c2
  );
  border-image-slice: 1;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(
    270deg,
    #ff7eb3,
    #ff758c,
    #7afcff,
    #feffb7,
    #58e2c2
  );
  padding: 1px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${flow} 3s ease infinite;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  grid-area: 1/1;
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const HeaderLogo = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
    height: 38px;
    width: 38px;
`;
const Spa = styled.span`
  font-size: 9px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: -3px;

  @media (min-width: 768px) {
    gap: 5px;
  }
`;

const VisualSettingsPanel = styled.div`
  position: absolute;
  top: 52px;
  right: 10px;
  background: ${(props) =>
    props.$isDarkMode ? "rgba(18, 18, 18, 0.95)" : "rgba(255, 255, 255, 0.95)"};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
  backdrop-filter: blur(5px);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 2000;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    top: 85px;
    width: 280px;
    right: 20px;
  }
`;

const VisualLabel = styled.label`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const VisualRange = styled.input`
  width: 100%;
  cursor: pointer;
  accent-color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#007bff")};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) =>
    props.$active ? "#3e2723" : props.$isDarkMode ? "#ffb36c" : "#333"};
  border: 1px solid #ffb36c;
  border-radius: 6px;
  padding: 6px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: rgba(255, 179, 108, 0.3);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover .logo-action {
    opacity: 1;
    visibility: visible;
  }
`;

const LogoActionBtn = styled.button`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #ffb36c;
  border: 1px solid #ffb36c;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 20;
  padding: 2px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ffb36c;
    color: #1a1a1a;
  }
`;

const PrintBtn = styled(LogoActionBtn)`
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const DownloadBtn = styled(LogoActionBtn)`
  left: 2px;
  top: 70%;
  transform: translateY(-50%);
`;

const FullscreenBtn = styled(LogoActionBtn)`
  right: -6px;
  top: 70%;
  transform: translateY(-50%);
`;

const Header = ({
  onOpenLogin,
  onOpenRegister,
  onOpenSettings,
  onOpenVip,
  onOpenShop,
  onOpenHelp,
  onOpenOtherOptions,
  onOpenInfo,
  isInfoOpen,
  isDarkMode,
  toggleTheme,
  sectionThemes,
  hiddenSections,
  onToggleSectionVisibility,
  onToggleSectionTheme,
  onResetSectionThemes,
  onOpenAchievements,
  currentAvatar,
  onLogout,
  user,
  siteSections,
  moveSiteSection,
  resetSiteSections,
  isRoutingMode,
  setIsRoutingMode,
  currentPath,
  setIsFsActive,
  loadingStrategy,
  onSetLoadingStrategy,
}) => {
  const [showUltra, setShowUltra] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [showVisualSettings, setShowVisualSettings] = useState(false);
  const logoRef = useRef(null);

  const handleDownloadLogo = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = logo;
    link.download = "logo.webp";
    link.click();
  };

  const handlePrintLogo = (e) => {
    e.stopPropagation();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Logo</title></head><body style="margin:0; display:flex; align-items:center; justify-content:center; height:100vh; background:#1a1a1a;"><img src="${logo}" style="max-width:90%; max-height:90%; object-fit:contain;" onload="window.print();window.close();"/></body></html>`,
    );
    printWindow.document.close();
  };

  const handleFullscreenLogo = (e) => {
    e.stopPropagation();
    const elem = logoRef.current;
    if (!elem) return;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  const {
    visualConfig,
    setVisualConfig,
    resetFilters,
    FILTERS,
    PRESETS,
    customPresets,
    saveCustomPreset,
    deleteCustomPreset,
    updateCustomPresetName,
    reorderCustomPresets,
  } = useVisualFilters(user);

  useEffect(() => {
    const interval = setInterval(() => setShowUltra((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    new Audio(bell).play().catch(() => {});
    toggleTheme();
  };

  return (
    <>
      <HeaderDiv $isDarkMode={isDarkMode} data-decorator-ignore="true">
        <HeaderFix>
          <LogoContainer>
            <PrintBtn
              className="logo-action"
              onClick={handlePrintLogo}
              title="Друкувати"
            >
              ⎙
            </PrintBtn>
            <DownloadBtn
              className="logo-action"
              onClick={handleDownloadLogo}
              title="Скачати"
            >
              ⇩
            </DownloadBtn>
            <HeaderLogo
              ref={logoRef}
              src={logofix}
              alt="Logo"
              height="30px"
              width="30px"
            />
            <FullscreenBtn
              className="logo-action"
              onClick={handleFullscreenLogo}
              title="Повний екран"
            >
              ⛶
            </FullscreenBtn>
          </LogoContainer>

          {user && (
            <VipTextWrapper onClick={onOpenVip}>
              <RainbowText $show={!showUltra}>+</RainbowText>
              <UltraText $show={showUltra}>♔</UltraText>
            </VipTextWrapper>
          )}
        </HeaderFix>

        <HeaderFix>
          {user ? (
            <>
              <ButtonsGroup>
                <IconButton
                  onClick={handleThemeToggle}
                  $isDarkMode={isDarkMode}
                >
                  <EmojiWrapper>
                    {isDarkMode ? <FaSun /> : <BsMoonStarsFill />}
                  </EmojiWrapper>
                </IconButton>

                <IconButton
                  onClick={() => setShowVisualSettings(!showVisualSettings)}
                  $isDarkMode={isDarkMode}
                  title="Налаштування вигляду"
                >
                  <EmojiWrapper>
                    <IoIosEye />
                  </EmojiWrapper>
                </IconButton>

                <IconButton onClick={onOpenHelp} $isDarkMode={isDarkMode}>
                  <EmojiWrapper style={{ fontWeight: 900 }}>?</EmojiWrapper>
                </IconButton>

                <IconButton onClick={onOpenShop} $isDarkMode={isDarkMode}>
                  <Spa>
                    <GiShop />
                  </Spa>
                </IconButton>

                <IconButton
                  onClick={onOpenAchievements}
                  $isDarkMode={isDarkMode}
                >
                  <GiAchievement />
                </IconButton>

                <IconButton
                  onClick={onOpenOtherOptions}
                  $isDarkMode={isDarkMode}
                  title="Інші опції"
                >
                  <EmojiWrapper>
                    <MdMore />
                  </EmojiWrapper>
                </IconButton>

                <IconButton onClick={onOpenSettings} $isDarkMode={isDarkMode}>
                  <MdSettingsSuggest />
                </IconButton>

                <IconButton onClick={onLogout} $isDarkMode={isDarkMode}>
                  <GiExitDoor />
                </IconButton>

                <IconButton
                  onClick={() => setIsBurgerOpen(true)}
                  $isDarkMode={isDarkMode}
                >
                  <EmojiWrapper>☰</EmojiWrapper>
                </IconButton>
              </ButtonsGroup>
              <UserName $uColor={user.textColor}>{user.firstName}</UserName>
              <HeaderAvatar src={currentAvatar} $bColor={user.borderColor} />
            </>
          ) : (
            <>
              <IconButton onClick={handleThemeToggle} $isDarkMode={isDarkMode}>
                <EmojiWrapper>
                  {isDarkMode ? <FaSun /> : <BsMoonStarsFill />}
                </EmojiWrapper>
              </IconButton>
              <IconButton
                onClick={() => setShowVisualSettings(!showVisualSettings)}
                $isDarkMode={isDarkMode}
                title="Налаштування вигляду"
              >
                <EmojiWrapper>
                  <IoIosEye />
                </EmojiWrapper>
              </IconButton>
              <IconButton
                onClick={onOpenHelp}
                $isDarkMode={isDarkMode}
                title="Навчання"
              >
                <EmojiWrapper style={{ fontWeight: 900 }}>?</EmojiWrapper>
              </IconButton>
              <IconButton
                onClick={onOpenOtherOptions}
                $isDarkMode={isDarkMode}
                title="Інші опції"
              >
                <EmojiWrapper>
                  <MdMore />
                </EmojiWrapper>
              </IconButton>

              <button
                onClick={onOpenLogin}
                style={{
                  fontSize: "11px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                Увійти
              </button>
              <button
                onClick={onOpenRegister}
                style={{
                  fontSize: "11px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                Реєстрація
              </button>
            </>
          )}
        </HeaderFix>
        {showVisualSettings && (
          <VisualSettingsPanel $isDarkMode={isDarkMode}>
            <div>
              <VisualLabel $isDarkMode={isDarkMode}>
                Яскравість <span>{visualConfig.darkIntensity}%</span>
              </VisualLabel>
              <VisualRange
                type="range"
                min="0"
                max="100"
                value={visualConfig.darkIntensity}
                onChange={(e) =>
                  setVisualConfig((prev) => ({
                    ...prev,
                    darkIntensity: Number(e.target.value),
                  }))
                }
                $isDarkMode={isDarkMode}
              />
            </div>

            <FilterGrid>
              {FILTERS.map((f) => (
                <FilterButton
                  key={f.id}
                  $active={visualConfig.filterType === f.id}
                  $isDarkMode={isDarkMode}
                  onClick={() =>
                    setVisualConfig((prev) => ({ ...prev, filterType: f.id }))
                  }
                >
                  {f.label}
                </FilterButton>
              ))}
            </FilterGrid>

            {visualConfig.filterType !== "none" && (
              <div>
                <VisualLabel $isDarkMode={isDarkMode}>
                  Сила ефекту <span>{visualConfig.filterIntensity}%</span>
                </VisualLabel>
                <VisualRange
                  type="range"
                  min="0"
                  max="100"
                  value={visualConfig.filterIntensity}
                  onChange={(e) =>
                    setVisualConfig((prev) => ({
                      ...prev,
                      filterIntensity: Number(e.target.value),
                    }))
                  }
                  $isDarkMode={isDarkMode}
                />
              </div>
            )}

            <div style={{ marginTop: "5px" }}>
              <VisualLabel
                $isDarkMode={isDarkMode}
                style={{ marginBottom: "8px" }}
              >
                Стилі
              </VisualLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "5px",
                }}
              >
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    style={{
                      background: "transparent",
                      border: "1px solid #ffb36c",
                      color: isDarkMode ? "#ffb36c" : "#333",
                      borderRadius: "6px",
                      padding: "5px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => setVisualConfig(preset.config)}
                  >
                    {preset.label}
                  </button>
                ))}
                {customPresets.map((preset) => (
                  <button
                    key={preset.id}
                    style={{
                      background: "rgba(255, 179, 108, 0.1)",
                      border: "1px solid #7afcff",
                      color: isDarkMode ? "#7afcff" : "#006666",
                      borderRadius: "6px",
                      padding: "5px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => setVisualConfig(preset.config)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </VisualSettingsPanel>
        )}
      </HeaderDiv>

      <BurgerMenu
        isOpen={isBurgerOpen}
        onClose={() => setIsBurgerOpen(false)}
        isDarkMode={isDarkMode}
        siteSections={siteSections}
        moveSiteSection={moveSiteSection}
        resetSiteSections={resetSiteSections}
        sectionThemes={sectionThemes}
        hiddenSections={hiddenSections}
        onToggleSectionVisibility={onToggleSectionVisibility}
        onToggleSectionTheme={onToggleSectionTheme}
        onResetSectionThemes={onResetSectionThemes}
        onToggleTheme={handleThemeToggle}
        onOpenShop={onOpenShop}
        onDownloadLogo={handleDownloadLogo}
        onPrintLogo={handlePrintLogo}
        onFullscreenLogo={handleFullscreenLogo}
        onOpenVip={onOpenVip}
        onOpenAchievements={onOpenAchievements}
        showUltra={showUltra}
        onOpenSettings={onOpenSettings}
        onOpenHelp={onOpenHelp}
        onOpenInfo={onOpenInfo}
        onOpenOtherOptions={onOpenOtherOptions}
        onLogout={onLogout}
        isRoutingMode={isRoutingMode}
        setIsRoutingMode={setIsRoutingMode}
        currentPath={currentPath}
        visualConfig={visualConfig}
        setVisualConfig={setVisualConfig}
        onResetFilters={resetFilters}
        customPresets={customPresets}
        onSavePreset={saveCustomPreset}
        onDeletePreset={deleteCustomPreset}
        onUpdatePresetName={updateCustomPresetName}
        onReorderPresets={reorderCustomPresets}
        setIsFsActive={setIsFsActive}
        loadingStrategy={loadingStrategy}
        onSetLoadingStrategy={onSetLoadingStrategy}
      />
    </>
  );
};

export default Header;
