import React, { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useDecorator } from "./DecoratorContext";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Modal = styled.div`
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 16px;
  border: 2px solid #ffb36c;
  width: 90%;
  max-width: 480px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 0;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 179, 108, 0.2);
  position: sticky;
  top: 0;
  background: #1e1e2e;
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0;
  color: #ffb36c;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagBadge = styled.span`
  background: rgba(255, 179, 108, 0.15);
  color: #ffb36c;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-family: monospace;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #ffb36c;
  font-size: 22px;
  cursor: pointer;
  padding: 4px;
  &:hover { color: #fff; }
`;

const Body = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModeTabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 10px;
`;

const TabGroup = styled.div`
  display: flex;
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 179, 108, 0.3);
`;

const Tab = styled.button`
  flex: 1;
  background: ${props => props.$active ? 'rgba(255, 179, 108, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#ffb36c' : '#a6adc8'};
  border: none;
  padding: 6px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(255, 179, 108, 0.1); }
`;

const PropRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  transition: background 0.15s;
  &:hover { background: rgba(255, 255, 255, 0.08); }
`;

const PropLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #a6adc8;
  min-width: 100px;
  font-family: monospace;
`;

const PropInput = styled.input`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 179, 108, 0.3);
  color: #cdd6f4;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-family: monospace;
  outline: none;
  &:focus { border-color: #ffb36c; }
`;

const ColorInput = styled.input`
  width: 36px;
  height: 28px;
  border: 2px solid rgba(255, 179, 108, 0.4);
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  background: none;
  &::-webkit-color-swatch-wrapper { padding: 2px; }
  &::-webkit-color-swatch { border: none; border-radius: 4px; }
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid rgba(255, 179, 108, 0.2);
  position: sticky;
  bottom: 0;
  background: #1e1e2e;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }
  &:active { transform: translateY(0); }
`;

const ApplyBtn = styled(ActionBtn)`
  background: #ffb36c;
  color: #1e1e2e;
  &:hover { background: #ffa149; }
`;

const PassthroughBtn = styled(ActionBtn)`
  background: rgba(255, 255, 255, 0.1);
  color: #cdd6f4;
  &:hover { background: rgba(255, 255, 255, 0.15); }
`;

const EDITABLE_PROPS = [
  { key: "color", label: "color", type: "color" },
  { key: "backgroundColor", label: "background", type: "color" },
  { key: "border", label: "border", type: "text" },
  { key: "borderRadius", label: "border-radius", type: "text" },
  { key: "boxShadow", label: "box-shadow", type: "text" },
];

const rgbToHex = (rgb) => {
  if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") return "#000000";
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return "#000000";
  return "#" + match.slice(0, 3).map((n) => parseInt(n).toString(16).padStart(2, "0")).join("");
};

const DecoratorModal = ({ targetElement, onClose }) => {
  const { applyStyle, getOverridesForElement, isDarkMode } = useDecorator();

  const [activeTheme, setActiveTheme] = useState(isDarkMode ? "dark" : "light");
  const [activeState, setActiveState] = useState("default");
  
  const currentMode = `${activeTheme}_${activeState}`;

  const tagName = targetElement?.tagName?.toLowerCase() || "?";
  const elementId = targetElement
    ? (targetElement.getAttribute("data-decorator-id") || targetElement.id || tagName + "-" + Math.random().toString(36).slice(2, 7))
    : "";

  useEffect(() => {
    if (targetElement && !targetElement.getAttribute("data-decorator-id")) {
      targetElement.setAttribute("data-decorator-id", elementId);
    }
  }, [targetElement, elementId]);

  const [editedStyles, setEditedStyles] = useState({});

  useEffect(() => {
    if (elementId) {
      const existing = getOverridesForElement(elementId);
      setEditedStyles(JSON.parse(JSON.stringify(existing)));
    }
  }, [elementId, getOverridesForElement]);

  const handleChange = (key, value) => {
    setEditedStyles(prev => ({
      ...prev,
      [currentMode]: {
        ...(prev[currentMode] || {}),
        [key]: value
      }
    }));
  };

  const handleApply = () => {
    const existing = getOverridesForElement(elementId);
    
    ['light_default', 'light_hover', 'dark_default', 'dark_hover'].forEach(mode => {
      const modeStyles = editedStyles[mode] || {};
      const oldStyles = existing[mode] || {};
      
      EDITABLE_PROPS.forEach(({ key }) => {
        if (modeStyles[key] !== oldStyles[key]) {
          if (modeStyles[key]) {
            applyStyle(elementId, tagName, key, oldStyles[key], modeStyles[key], mode);
          } else if (oldStyles[key]) {
            applyStyle(elementId, tagName, key, oldStyles[key], "", mode);
          }
        }
      });
    });
    
    onClose();
  };

  const handlePassthrough = () => {
    onClose();
    setTimeout(() => {
      if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        targetElement.focus();
      } else {
        targetElement.click();
      }
    }, 10);
  };

  if (!targetElement) return null;

  const currentModeStyles = editedStyles[currentMode] || {};

  let previewCss = "";
  if (editedStyles) {
    if (editedStyles.light_default) {
      previewCss += `body:not(.decorator-dark-mode) [data-decorator-id="${elementId}"] { `;
      Object.entries(editedStyles.light_default).forEach(([prop, val]) => {
        previewCss += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
      });
      previewCss += `}\n`;
    }
    if (editedStyles.light_hover) {
      previewCss += `body:not(.decorator-dark-mode) [data-decorator-id="${elementId}"]:hover { `;
      Object.entries(editedStyles.light_hover).forEach(([prop, val]) => {
        previewCss += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
      });
      previewCss += `}\n`;
    }
    if (editedStyles.dark_default) {
      previewCss += `body.decorator-dark-mode [data-decorator-id="${elementId}"] { `;
      Object.entries(editedStyles.dark_default).forEach(([prop, val]) => {
        previewCss += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
      });
      previewCss += `}\n`;
    }
    if (editedStyles.dark_hover) {
      previewCss += `body.decorator-dark-mode [data-decorator-id="${elementId}"]:hover { `;
      Object.entries(editedStyles.dark_hover).forEach(([prop, val]) => {
        previewCss += `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val} !important; `;
      });
      previewCss += `}\n`;
    }
  }

  return (
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-decorator-ignore="true">
      <style>{previewCss}</style>

      <Modal data-decorator-ignore="true" onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            🎨 Декоратор <TagBadge>&lt;{tagName}&gt;</TagBadge>
          </Title>
          <CloseBtn onClick={onClose} data-decorator-ignore="true">
            &times;
          </CloseBtn>
        </ModalHeader>

        <Body>
          <ModeTabsContainer>
            <TabGroup>
              <Tab $active={activeTheme === "light"} onClick={() => setActiveTheme("light")}>🌞 Денна</Tab>
              <Tab $active={activeTheme === "dark"} onClick={() => setActiveTheme("dark")}>🌙 Темна</Tab>
            </TabGroup>
            <TabGroup>
              <Tab $active={activeState === "default"} onClick={() => setActiveState("default")}>Стандарт</Tab>
              <Tab $active={activeState === "hover"} onClick={() => setActiveState("hover")}>:hover</Tab>
            </TabGroup>
          </ModeTabsContainer>

          {EDITABLE_PROPS.map(({ key, label, type }) => (
            <PropRow key={key}>
              <PropLabel>{label}</PropLabel>
              {type === "color" ? (
                <>
                  <ColorInput
                    type="color"
                    value={rgbToHex(currentModeStyles[key])}
                    onChange={(e) => handleChange(key, e.target.value)}
                    data-decorator-ignore="true"
                  />
                  <PropInput
                    value={currentModeStyles[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="успадковується"
                    data-decorator-ignore="true"
                  />
                </>
              ) : (
                <PropInput
                  value={currentModeStyles[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder="успадковується"
                  data-decorator-ignore="true"
                />
              )}
            </PropRow>
          ))}
        </Body>

        <Footer>
          <PassthroughBtn onClick={handlePassthrough} data-decorator-ignore="true">
            ▶ Виконати дію
          </PassthroughBtn>
          <ApplyBtn onClick={handleApply} data-decorator-ignore="true">
            ✓ Застосувати
          </ApplyBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default DecoratorModal;
