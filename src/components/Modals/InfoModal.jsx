import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.$isClosing ? 0 : 1)};
`;

const Content = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 800px;
  width: 90%;
  position: relative;
  font-family: var(--font-family, sans-serif);
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: ${props => (props.$isClosing ? slideOut : slideIn)} 0.4s ease-out forwards;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #555;
  &:hover { color: #000; }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  color: #222;
  margin-top: 20px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
`;

const InfoModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <Content $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={handleClose}>&times;</CloseBtn>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
          Угода користувача
        </h2>
        <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
          <p><strong>Ласкаво просимо до нашого проєкту!</strong></p>
          <p>
            Використовуючи цей сайт, ви погоджуєтеся на обробку введених вами
            даних (ім'я, дата народження) для персоналізації контенту.
          </p>
          
          <SectionTitle>1. Заборона та обмеження</SectionTitle>
          <ul>
            <li>Реєстрація дозволена користувачам <strong>від 9 років</strong>.</li>
            <li>Деякий контент може мати обмеження <strong>14+</strong>.</li>
            <li>Заборонено перепродавати музичні треки.</li>
            <li><strong>Дозволено:</strong> продавати ваші роботи, створені за допомогою нашого ШІ.</li>
          </ul>

          <SectionTitle>2. Відмова від відповідальності</SectionTitle>
          <p>
            Відповіді ШІ можуть бути помилковими. Уся інформація має прогностичний характер.
          </p>

          <SectionTitle>3. Інтелектуальна власність</SectionTitle>
          <p>Усі матеріали є об’єктами авторського права Адміністрації.</p>
          
          <SectionTitle>4. Інші умови</SectionTitle>
          <p>Адміністрація має право змінювати умови в односторонньому порядку.</p>

          <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Приємного користування сервісом!
          </p>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#888" }}>
            Дата набрання чинності: 14 лютого 2026 року
          </p>
        </div>
      </Content>
    </Overlay>
  );
};

export default InfoModal;