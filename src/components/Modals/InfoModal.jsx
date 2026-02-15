import React from "react";
import styled, { keyframes } from "styled-components";
const slideIn = keyframes`
0% {
transform: translateY(100%) scale(0.5);
}
100% {
transform: translateY(0%)
scale(1);
}
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
  animation: ${slideIn} 1s linear forwards;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #000;
  }
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
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
        <h2
          style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}
        >
          Угода користувача
        </h2>
        <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#444" }}>
          <p>
            <strong>Ласкаво просимо до нашого проєкту!</strong>
          </p>
          <p>
            Використовуючи цей сайт, ви погоджуєтеся на обробку введених вами
            даних (ім'я, дата народження) для персоналізації контенту. Ми не
            передаємо ваші дані третім особам.
          </p>
          <SectionTitle>1. Заборона та обмеження</SectionTitle>
          <ul>
            <li>
              Реєстрація дозволена користувачам <strong>від 9 років</strong>.
            </li>
            <li>
              Деякий контент може мати вікові обмеження (наприклад,{" "}
              <strong>14+</strong>).
            </li>
            <li>Заборонено перепродавати музичні треки, розміщені на сайті.</li>
            <li>
              <strong>Дозволено:</strong> продавати фізичні (роздруковані)
              фан-арти, ваші відео, аудіофайли, текстові відповіді створені за
              допомогою нашого ШІ.
            </li>
          </ul>
          <SectionTitle>2. Відмова від відповідальності</SectionTitle>
          <p>
            Ми не даємо 100% гарантії точності прогнозів. Відповіді ШІ можуть
            бути помилковими. Уся інформація має виключно довідковий та
            прогностичний характер і не є офіційними метеорологічними даними.
          </p>
          <SectionTitle>3. Інтелектуальна власність</SectionTitle>
          <p>
            Усі матеріали (тексти, код, дизайн, музика, алгоритми тощо) є
            об’єктами авторського права Адміністрації або законних
            правовласників.
          </p>
          <p>
            <strong>Суворо заборонено:</strong>
          </p>
          <ul>
            <li>
              Автоматизований збір або скрапінг даних (боти, AI, ML-системи і
              т.д.).
            </li>
            <li>
              Використання елементів Сервісу для створення похідних комерційних
              продуктів.
            </li>
            <li>
              Використання в контекстах, що містять незаконний або
              дискримінаційний контент.
            </li>
          </ul>
          <SectionTitle>4. Інші умови</SectionTitle>
          <p>
            Адміністрація має право змінювати умови цієї Угоди в односторонньому
            порядку. Оновлена редакція набирає чинності з моменту її
            оприлюднення. Якщо ви не погоджуєтеся з положеннями, ви повинні
            припинити використання Сервісу.
          </p>
          <hr
            style={{
              border: "0",
              borderTop: "1px solid #eee",
              margin: "20px 0",
            }}
          />
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Приємного прослуховування та користування сервісом!
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
