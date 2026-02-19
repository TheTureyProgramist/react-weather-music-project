import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.9); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.9); opacity: 0; }
`;

const appearAndShrink = keyframes`
  0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const getCascadeAnimation = ($index) => css`
  animation: ${appearAndShrink} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  animation-delay: ${0.2 + ($index || 0) * 0.07}s;
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
  background: #ffd001;
  padding: 40px;
  border-radius: 20px;
  max-width: 900px;
  width: 95%;
  position: relative;
  font-family: "Inter", -apple-system, sans-serif;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.$isClosing
      ? css`
          animation: ${slideOut} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
        `
      : css`
          animation: ${slideIn} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        `}

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
  &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
  &::-webkit-scrollbar-thumb:hover { background: #999; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 34px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
  &:hover {
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
  opacity: 0;
  ${(props) => getCascadeAnimation(props.$index)}
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 10px;
  opacity: 0;
  ${(props) => getCascadeAnimation(props.$index)}
`;

const HighlightBox = styled.div`
  background: #acacac;
  border: 1px dashed #8a2be2;
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
  opacity: 0;
  ${(props) => getCascadeAnimation(props.$index)}
`;

const ActionButton = styled.button`
  margin-top: 20px;
  padding: 12px 35px;
  background: #8a2be2;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  opacity: 0;
  animation: ${appearAndShrink} 0.6s forwards;
  animation-delay: 2.8s;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
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
        <h2
          style={{
            textAlign: "center",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#656",
            marginBottom: "30px",
            fontWeight: "normal",
          }}
        >
          Останнє оновлення: 15 лютого 2026 року
        </h2>

        <Section>
          <Text $index={1}>
            Ця Угода є юридично обов'язковим договором між Користувачем та
            Адміністрацією платформи. Натискаючи кнопку "Прийняти" або
            використовуючи будь-яку частину сервісу, ви підтверджуєте свою повну
            згоду з усіма пунктами.
          </Text>
        </Section>

        <SectionTitle $index={2}>
          1. Реєстрація та Вікові обмеження
        </SectionTitle>
        <Text $index={3}>
          1.1. Доступ до базових функцій надається особам, що досягли{" "}
          <strong>13-річного віку</strong>.
        </Text>
        <Text $index={4}>
          1.2. Контент з маркуванням <strong>14+</strong> (зокрема певні музичні
          треки або візуальні матеріали) рекомендовані виключно особам
          відповідного віку.
        </Text>

        <SectionTitle $index={5}>
          2. Використання Штучного Інтелекту (ШІ)
        </SectionTitle>
        <Text $index={6}>
          2.1. Сервіс використовує технології генеративного ШІ для надання
          допомоги та створення контенту.
        </Text>
        <HighlightBox $index={7}>
          <strong>Важливо:</strong> ШІ може генерувати фактично невірну або
          суб'єктивну інформацію. Адміністрація не несе відповідальності за
          поради ШІ.
        </HighlightBox>
        <Text $index={8}>
          2.2. Користувачеві заборонено використовувати ШІ для створення
          шкідливого коду, пропаганди ненависті, дискримінації або порушення
          законів України.
        </Text>
        <Text $index={9}>
          2.3. Ліміт безкоштовних повідомлень змінюється в залежності від
          активності користувачів.
        </Text>
        <Text $index={10}>
          2.4. Ви вносите гроші наперед перед генерацією ШІ. Гроші через помилки
          зв'язку/API не повертаються.
        </Text>

        <SectionTitle $index={11}>3. Авторські права та Комерція</SectionTitle>
        <Text $index={12}>
          3.1. Платформа надає технічний інструментарій для прослуховування
          аудіовізуального контенту. Адміністрація не є власником розміщених
          треків та використовує їх виключно в ознайомчих цілях. Усі права
          належать їх законним власникам.
        </Text>
        <Text $index={13}>
          3.2. <strong>Генерації користувача:</strong> Ви отримуєте право
          власності на результати своєї творчості, створені за допомогою
          інструментів сервісу (фан-арти, тексти), та маєте право на їх
          комерційне використання (продаж у розрукованому вигляді, а у
          віртуальному з умовою посилання на Стихію).
        </Text>
        <Text $index={14}>
          3.3. Для правовласників, я використовув їхні пісні з метою мотивації
          переглянути офіційний ресурс. У випадку якщо ви проти розміщення
          пишіть на емеіл theturkeyprogramist12@gmail.com. І обговорімо, за якої
          умови ви залишите пісню на сайті. Примітка: якщо не вийде домовитись
          ми видалимо пісню через 24год.
        </Text>

        <SectionTitle $index={15}>4. Конфіденційність та Дані</SectionTitle>
        <Text $index={16}>
          4.1. Ми збираємо: Ім'я, дату народження, IP-адресу, дані про
          активність, вибір аватара,{" "}
          <strong>
            історію отриманих досягнень та баланс внутрішньої валюти
          </strong>
          .
        </Text>
        <Text $index={17}>
          4.2. Мета збору: Персоналізація інтерфейсу, контроль вікового доступу,
          нарахування ігрових бонусів та покращення роботи ШІ.
        </Text>
        <Text $index={18}>
          4.3. Ми не передаємо ваші персональні дані третім особам, окрім
          випадків, передбачених чинним законодавством України.
        </Text>
        <Text $index={19}>
          4.4.Ми розміщую на сайті головоломки(деякі власні, а інші у власному
          стилі) + у вікнах зображень головоломок(деяких) компанії 5-bn
          games(взяв з PlayMarket), з метою мотивації зіграти в їхні ігри.
        </Text>

        <SectionTitle $index={20}>
          5. Правила поведінки (Анти-спам)
        </SectionTitle>
        <Text $index={21}>
          Забороняється:
          <ul>
            <li>
              Використання ботів для накрутки прослуховувань треків або штучного
              отримання досягнень.
            </li>
            <li>Завантаження зображень, що порушують моральні норми (18+).</li>
            <li>
              Спроби злому системи, маніпуляції з балансом "Конвертів" або
              несанкціонованого доступу до чужих акаунтів.
            </li>
          </ul>
        </Text>

        <SectionTitle $index={22}>6. Відмова від гарантій</SectionTitle>
        <Text $index={23}>
          Сервіс надається за принципом "як е" (as is). Ми не гарантуємо
          безперебійну роботу сайту у разі технічних збоїв на стороні
          провайдерів або форс-мажорних обставин.
        </Text>

        <SectionTitle $index={24}>7. Зміни та розірвання</SectionTitle>
        <Text $index={25}>
          7.1. Адміністрація залишає за собою право змінювати цю Угоду в
          будь-який час. Продовження користування сайтом після змін означає вашу
          згоду з новою редакцією.
        </Text>
        <Text $index={26}>
          7.2. У разі порушення правил, акаунт користувача може бути
          заблокований без попередження. При блокуванні всі досягнення та
          внутрішня валюта анулюються без права на компенсацію.
        </Text>

        <SectionTitle $index={27}>8. Ціни</SectionTitle>
        <Text $index={28}>
          8.1. Активаційний платіж є оплатою за надання технічного доступу до
          преміум-функцій сервісу. Оскільки послуга вважається наданою в момент
          активації функцій, кошти за використаний період не повертаються, за
          винятком випадків повної технічної непрацездатності сервісу з вини
          Адміністрації.
        </Text>

        <SectionTitle $index={29}>
          9. Досягнення та Внутрішня валюта (Конверти)
        </SectionTitle>
        <Text $index={30}>
          9.1. <strong>Конверти</strong> — це внутрішня віртуальна валюта
          сервісу, яка не є грошовим засобом у розумінні законодавства та не
          може бути обміняна на реальні кошти.
        </Text>
        <Text $index={31}>
          9.2. Конверти та досягнення нараховуються за активність на сайті.
        </Text>
        <Text $index={32}>
          9.3. Адміністрація має право в односторонньому порядку змінювати
          вартість послув у Конвертах або правила нарахування досягнень та
          додавати і прибирати їх.
        </Text>
        <Text $index={33}>
          9.4. Передача Конвертів між акаунтами можлива лише через офіційні
          інструменти сервісу. Будь-яка "торгівля" валютою поза сервісом
          заборонена.
        </Text>

        <hr
          style={{ border: "0", borderTop: "1px solid #eee", margin: "30px 0" }}
        />
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          <Text $index={34} style={{ fontWeight: "600", color: "#333" }}>
            Дякуємо, що ви з нами! Ваша безпека та творчість — наш пріоритет.
          </Text>
          <ActionButton onClick={handleClose}>
            Я погоджуюсь з умовами
          </ActionButton>
        </div>
      </Content>
    </Overlay>
  );
};

export default InfoModal;
