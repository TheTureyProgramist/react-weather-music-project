import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.9); opacity: 0; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  transition: opacity 0.4s ease;
  opacity: ${(props) => (props.$isClosing ? 0 : 1)};
  backdrop-filter: blur(5px);
`;

const Content = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 900px;
  width: 95%;
  position: relative;
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.4s
    cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  /* Стилізація скроллбару */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f5f5f5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover {
    background: #e0e0e0;
    transform: rotate(90deg);
  }
`;

const Section = styled.section`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #111;
  margin-top: 30px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-left: 4px solid #8a2be2;
  padding-left: 15px;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 10px;
`;

const HighlightBox = styled.div`
  background: #acacac;
  border: 1px dashed #8a2be2;
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
`;

const InfoModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400);
  };

  return (
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <Content $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={handleClose}>&times;</CloseBtn>

        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "#222",
            marginBottom: "10px",
          }}
        >
          Публічна оферта та Політика конфіденційності
        </h1>
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "30px",
          }}
        >
          Останнє оновлення: 15 лютого 2026 року
        </Text>

        <Section>
          <Text>
            Ця Угода є юридично обов'язковим договором між Користувачем та
            Адміністрацією платформи. Натискаючи кнопку "Прийняти" або
            використовуючи будь-яку частину сервісу, ви підтверджуєте свою повну
            згоду з усіма пунктами.
          </Text>
        </Section>

        <SectionTitle>1. Реєстрація та Вікові обмеження</SectionTitle>
        <Text>
          1.1. Доступ до базових функцій надається особам, що досягли{" "}
          <strong>9-річного віку</strong>. Користувачі до 14 років
          підтверджують, що отримали дозвіл від батьків або опікунів.
        </Text>
        <Text>
          1.2. Контент з маркуванням <strong>14+</strong> (зокрема певні музичні
          треки або візуальні матеріали) рекомендовані виключно особам
          відповідного віку.
        </Text>
        <SectionTitle>2. Використання Штучного Інтелекту (ШІ)</SectionTitle>
        <Text>
          2.1. Сервіс використовує технології генеративного ШІ для надання
          допомоги та створення контенту.
        </Text>
        <HighlightBox>
          <strong>Важливо:</strong> ШІ може генерувати фактично невірну або
          суб'єктивну інформацію. Адміністрація не несе відповідальності за
          поради ШІ.
        </HighlightBox>
        <Text>
          2.2. Користувачеві заборонено використовувати ШІ для створення
          шкідливого коду, пропаганди ненависті, дискримінації або порушення
          законів України.
        </Text>
         <Text>
          2.3. Ліміт безкоштовних повідомлень змінюється в залежності від активності користувачів. 
        </Text>
        <Text>
          2.4. Ви вносите гроші наперед перед генерацією ШІ. Гроші через помилки зв'язку/API не повертаються. 
        </Text>
        <SectionTitle>3. Авторські права та Комерція</SectionTitle>
        <Text>
          3.1. <strong>Музика:</strong> Усі аудіофайли, розміщені на сайті,
          захищені авторським правом. Заборонено їх перепродаж, несанкціоноване
          тиражування або видачу за власні твори.
        </Text>
        <Text>
          3.2. <strong>Генерації користувача:</strong> Ви отримуєте право
          власності на результати своєї творчості, створені за допомогою
          інструментів сервісу (фан-арти, тексти), та маєте право на їх
          комерційне використання (продаж у розрукованому вигляді, а у
          віртуальному з умовою посилання на Стихію).
        </Text>

        <SectionTitle>4. Конфіденційність та Дані</SectionTitle>
        <Text>
          4.1. Ми збираємо: Ім'я, дату народження, IP-адресу, дані про
          активність та вибір аватара.
        </Text>
        <Text>
          4.2. Мета збору: Персоналізація інтерфейсу, контроль вікового доступу
          та покращення роботи ШІ.
        </Text>
        <Text>
          4.3. Ми не передаємо ваші персональні дані третім особам, окрім
          випадків, передбачених чинним законодавством України.
        </Text>

        <SectionTitle>5. Правила поведінки (Анти-спам)</SectionTitle>
        <Text>
          Забороняється:
          <ul>
            <li>Використання ботів для накрутки прослуховувань треків.</li>
            <li>Завантаження зображень, що порушують моральні норми (18+).</li>
            <li>
              Спроби злому системи або несанкціонованого доступу до чужих
              акаунтів.
            </li>
          </ul>
        </Text>
        <SectionTitle>6. Відмова від гарантій</SectionTitle>
        <Text>
          Сервіс надається за принципом "як є" (as is). Ми не гарантуємо
          безперебійну роботу сайту у разі технічних збоїв на стороні
          провайдерів або форс-мажорних обставин.
        </Text>
        <SectionTitle>7. Зміни та розірвання</SectionTitle>
        <Text>
          7.1. Адміністрація залишає за собою право змінювати цю Угоду в
          будь-який час. Продовження користування сайтом після змін означає вашу
          згоду з новою редакцією.
        </Text>
        <Text>
          7.2. У разі порушення правил, акаунт користувача може бути
          заблокований без попередження та права на відновлення.
        </Text>
                <SectionTitle>8. Ціни</SectionTitle>
        <Text>
          8.1. Передоплата - це 'активаційний платіж', який не повертається. 
        </Text>
        <hr
          style={{ border: "0", borderTop: "1px solid #eee", margin: "30px 0" }}
        />
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          <Text style={{ fontWeight: "600", color: "#333" }}>
            Дякуємо, що ви з нами! Ваша безпека та творчість — наш пріоритет.
          </Text>
          <button
            onClick={handleClose}
            style={{
              marginTop: "20px",
              padding: "12px 35px",
              background: "#8a2be2",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(138, 43, 226, 0.3)",
            }}
          >
            Я погоджуюсь з умовами
          </button>
        </div>
      </Content>
    </Overlay>
  );
};
export default InfoModal;
