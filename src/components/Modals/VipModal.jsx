import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
// Імпорти фото
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
// import monody from "../../photos/vip-images/vip-forest.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import vip from "../../photos/hero-header/vip.jpg";
import music from "../../photos/vip-modal/music.jpg";
import ultra from "../../photos/vip-modal/realultra.jpg";
import clip from "../../photos/vip-images/clip.png";
import stars from "../../photos/vip-images/stars.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import buton from "../../photos/vip-modal/buton.jpg";
import texts from "../../photos/vip-modal/texts.jpg";
import horrordog from "../../photos/vip-images/horror.jpg";
import asium from "../../photos/vip-images/asium.jpg";
import rainbow from "../../photos/fan-art/rainbow.webp";
import letters from "../../photos/fan-art/letters.webp";
import document from "../../photos/fan-art/document.webp";
import puzzle5 from "../../photos/fan-art/puzzle-5.webp";
import puzzle2 from "../../photos/fan-art/puzzle-2.webp";
import puzzle3 from "../../photos/fan-art/puzzle-3.webp";
import puzzle4 from "../../photos/fan-art/puzzle-4.webp";
import font from "../../photos/vip-images/flame.jpg";
import puzzle1 from "../../photos/fan-art/puzzle-1.webp";
// import fototwo from "../../photos/vip-images/vip-dragons.jpg";
const appearAndShrink = keyframes`
  0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
  50% { opacity: 0.5; transform: scale(1.1); filter: blur(2px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideInUltraLarge = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  70% { transform: translateY(-5%) scale(2.3); opacity: 1; }
  100% { transform: translateY(0%) scale(2.2); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;
const slideOutUltraLarge = keyframes`
  0% { transform: translateY(0%) scale(2.2); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const flowPlus = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const rotateRays = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRaysReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 5px;
`;

const VipModalDiv = styled.div`
  background-color: #3e2723;
  color: #fff;
  width: 98%;
  max-width: 950px;
  max-height: 95vh;
  padding: 15px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: border-color 0.5s ease;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 35px;
  }

  @media (min-width: 1900px) {
    max-width: 430px;
    max-height: 40vh;
    animation: ${(props) =>
        props.$isClosing ? slideOutUltraLarge : slideInUltraLarge}
      0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 7px;
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 16px;
  cursor: pointer;
  z-index: 1010;
  &:hover {
    color: #fff;
  }
  @media (max-width: 768px) {
    top: 10px;
    font-size: 19px;
    right: 10px;
  }
`;

const HeaderToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  display: block;
  width: fit-content;
  outline: none;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const AnimatedText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${(props) =>
    props.$variant === "ultra"
      ? css`
          background-image: linear-gradient(
            270deg,
            #ff7eb3,
            #ff758c,
            #7afcff,
            #feffb7,
            #58e2c2
          );
          background-size: 400% 400%;
          animation:
            ${flowPlus} 5s ease infinite,
            ${appearAndShrink} 0.8s ease-out forwards;
        `
      : css`
          background-image: linear-gradient(
            45deg,
            #ff0000,
            #ff7f00,
            #ffff00,
            #00ff00,
            #0000ff,
            #8b00ff
          );
          background-size: 100% 100%;
          animation: none !important;
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: blur(0) !important;
        `}

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SwitchBackText = styled.div`
  font-size: 10px;
  color: #7afcff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: -5px;
  margin-bottom: 10px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const VipBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const VipFixScroll = styled.div`
  flex: 1;
  height: 420px;
  min-width: 280px;
  overflow-y: auto;
  padding-right: 8px;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const BenefitCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 179, 108, 0.05);
  border: 1px solid rgba(255, 179, 108, 0.15);
  border-radius: 8px;
  padding: 6px;
  opacity: 0;
  animation: ${appearAndShrink} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  margin-bottom: 6px;
  transition: transform 1s;
  ${({ $index }) => css`
    animation-delay: ${0.1 + $index * 0.05}s;
  `}
  &:hover {
    border-color: #ffb36c;
    transform: translateX(3px);
  }
`;

const BenefitImage = styled.img`
  width: 45px;
  height: 35px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`;

const VipBonus = styled.div`
  font-size: 11.4px;
  line-height: 1.3;
  color: #ffb36c;
  flex: 1;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  color: #ffb36c;
  margin: 10px 0 6px 0;
  text-transform: uppercase;
  font-size: 12px;
  border-left: 2px solid #ffb36c;
  padding-left: 8px;
  opacity: 0;
  animation: ${appearAndShrink} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || "0.2s"};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 260px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  z-index: 5;

  @media (max-width: 768px) {
    width: 100%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg 8deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        8deg 18deg,
      transparent 18deg 30deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        38deg 48deg,
      transparent 48deg 60deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        68deg 78deg,
      transparent 78deg 90deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        98deg 108deg,
      transparent 108deg 120deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        128deg 138deg,
      transparent 138deg 150deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        158deg 168deg,
      transparent 168deg 180deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        188deg 198deg,
      transparent 198deg 210deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        218deg 228deg,
      transparent 228deg 240deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        248deg 258deg,
      transparent 258deg 270deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        278deg 288deg,
      transparent 288deg 300deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        308deg 318deg,
      transparent 318deg 330deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        338deg 348deg,
      transparent 348deg 360deg
    );
    animation: ${rotateRays} 20s linear infinite;
    z-index: -1;
    pointer-events: none;
    mask-image: radial-gradient(circle, black 20%, transparent 70%);
  }
  ${(props) =>
    props.$isUltra &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 400px;
        height: 400px;
        background: conic-gradient(
          from 0deg,
          transparent 0deg 8deg,
          rgba(139, 0, 255, 0.8) 8deg 18deg,
          transparent 20deg 28deg,
          rgba(139, 0, 255, 0.8) 28deg 37deg,
          transparent 37deg 50deg,
          rgba(139, 0, 255, 0.8) 58deg 67deg,
          transparent 67deg 80deg,
          rgba(139, 0, 255, 0.8) 88deg 97deg,
          transparent 97deg 110deg,
          rgba(139, 0, 255, 0.8) 118deg 127deg,
          transparent 127deg 140deg,
          rgba(139, 0, 255, 0.8) 148deg 157deg,
          transparent 157deg 170deg,
          rgba(139, 0, 255, 0.8) 178deg 187deg,
          transparent 187deg 200deg,
          rgba(139, 0, 255, 0.8) 208deg 217deg,
          transparent 217deg 230deg,
          rgba(139, 0, 255, 0.8) 238deg 247deg,
          transparent 247deg 260deg,
          rgba(139, 0, 255, 0.8) 268deg 277deg,
          transparent 277deg 290deg,
          rgba(139, 0, 255, 0.8) 298deg 307deg,
          transparent 307deg 320deg,
          rgba(139, 0, 255, 0.8) 328deg 337deg,
          transparent 337deg 350deg
        );
        animation: ${rotateRaysReverse} 25s linear infinite;
        z-index: -1;
        pointer-events: none;
        mask-image: radial-gradient(circle, black 20%, transparent 70%);
      }
    `}
`;

const VipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  position: relative;
  z-index: 2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
`;

const VipButton = styled.button`
  width: 260px;
  border: 1px solid #ffb36c;
  cursor: pointer;
  padding: 8px;
  background: transparent;
  color: #ffb36c;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 10;
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VipText = styled.p`
  width: 100%;
  max-width: 300px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  color: #ffb36c;
`;

const RedLine = styled.div`
  background: #ff8a80;
  width: 100%;
  height: 1px;
  margin: 10px 0;
`;

const VipWarning = styled.p`
  color: #ff8a80;
  font-size: 12px;
  word-wrap: break-word;
  margin-bottom: 2px;
`;

const VipModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [tier, setTier] = useState("plus");
  const [showContent, setShowContent] = useState(true);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleTierSwitch = (newTier) => {
    if (tier === newTier) return;
    setShowContent(false);
    setTimeout(() => {
      setTier(newTier);
      setShowContent(true);
    }, 100);
  };

  const plusBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 5 спроб, замість за 🧧 3. Після вичерпування ліміту ціна повідомлення 0,12грн, не 0,21грн + 🧧. Ліміт 🧧 спроб може змінюватися залежно від навантаження на систему.",
      },
      { src: lebid, text: "2 (не 1) зображення/міс по 4,99грн, далі 6,99грн." },
      { src: clip, text: "Відео 65грн/с (замість 75грн/с)." },
      { src: music, text: "mp3 4грн/хв, не 6грн/хв." },
      {
        src: puzzle2,
        text: "Пам'ять на 33дні, не на 21добу! Ліміт історії запитів 70, не 50. Ліміт паралельних чатів спілкування 5, не 3.",
      },
    ],
    music: [
      {
        src: asium,
        text: "Можна взяти в обране 7 пісень, а не 3! А також поділ 1-4, не 1-3. Назавжди!",
      },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧.",
      },
      {
        src: dinofroz,
        text: "Діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧.",
      },
      {
        src: font,
        text: "Станьте творцем! Розміщуйте індивідуальні 2 плейлисти(не 1), з лімітом у 2пісні(на ваш альбом), з обкладиками(в сумі не може бути більше 12мб(не 7мб).). Можете прив'язати відео з ютубу(до 3хв). Без монетизації(реклами), якщо ютуб. Назавжди!",
      },
    ],
    system: [
      {
        src: vip,
        text: "Оновлений стиль сайту (з перемикачем лого вгорі, в лівому кутку). Назавжди!",
      },
      { src: stars, text: "Плавніший регулятор темної теми. Назавжди!" },
      {
        src: dragons,
        text: "Знижка 5грн у магазині 🧧, 🏆 дають додатково до 20🧧, якщо їх к-сть у 🏆 < 40. У сумі вийде 40. Навіть, якщо ви вже виконали 🏆 вони будуть після оплати автоматично відправлені. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 50🧧. Ліміт покупок наборів 🧧*2. Можна зберігати 5000🧧, замість 2500(Після кінця зайві не анулюються, але ви не зможете отримувати наступну партію, доти доки к-сть буде >= ліміту). Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧). Отримуйте 600🧧 при сплаті тарифу.",
      },
      {
        src: buton,
        text: "Кнопки Додавання міста/Видалення картки має перезарядку 10с замість 80c. Ліміт додаткових карток 4. Зайві картки видаляються коли підписка сплине в терміні.",
      },
      {
        src: rainbow,
        text: "Райдужне(Неанімовані) ім'я та рамка доступні! Назавжди!",
      },
      {
        src: document,
        text: "Доступно 10 останніх новин, а не 5.",
      },
      {
        src: puzzle3,
        text: "Прив'язуйте до акаунту 3пристрої, не 2. Назавжди!",
      },
      {
        src: puzzle4,
        text: "Передавайте до 250🧧/добу, не 125. Втрата конвертів піля передачі 30%, не 50%.",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 у випадку невдачі 33год, не 42год. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 12дн., а не 21дн.",
      },
      {
        src: puzzle1,
        text: "Баффі(х2 конверти(з досягнень, головоломок). В наступні 3хв(не 1) після активації(в магазині в розділі наборів).",
      },
    ],
  };

  const ultraBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 7 спроб. Далі за 0,7грн + 🧧(лише за обширні відповіді). Ви маєте пріоритет у черзі при генерації. Лімітована акція!",
      },
      {
        src: lebid,
        text: "3 зображення/міс по 3,99грн, далі 5,99грн. Лімітована акція!",
      },
      { src: clip, text: "Відео 45грн/с. Лімітована акція!" },
      { src: music, text: "mp3 2грн/хв. Лімітована акція!" },
      {
        src: puzzle2,
        text: "Пам'ять на 42доби! Пам'ять запитів 100. Ліміт паралельних чатів 7. Лімітована акція!",
      },
    ],
    music: [
      {
        src: asium,
        text: "Можна взяти в обране 10 пісень. Поділ від 1-5 по оцінці. Назавжди!",
      },
      {
        src: horrordog,
        text: "Текст пісні підсвічується під час програвання(не всі пісні мають цю механіку)! Назавжди!",
      },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-25🧧. Та за 50🧧 поставити ваш аватар.",
      },
      {
        src: font,
        text: "Розміщуйте індивідуальні 3 плейлисти, з лімітом у 3пісні(на ваш альбом), з обкладиками(в сумі не може бути більше 30мб. Можете додавати фільтри(в інтервалах мелодії) та прив'язати відео з ютубу(до 4хв). Назавжди!",
      },
    ],
    system: [
            {
        src: document,
        text: "Знижка на Стихію+ 5грн, після придбання Ultrа. Лімітована акція!",
      },
      {
        src: vip,
        text: "Оновлений стиль сайту (з перемикачем лого). Назавжди!",
      },
      {
        src: dragons,
        text: "Знижка 15грн у магазині 🧧. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 750🧧. Ліміт покупок наборів 🧧*3. Можна зберігати 10000🧧. Шанс 50% на джекпот(Ціна збільшена на 20🧧). Отримуйте 800🧧 при сплаті тарифу.",
      },
      {
        src: buton,
        text: "Кнопки Додавання міста/Видалення картки має перезарядку 5с. Ліміт додаткових карток 8. Лімітована акція!",
      },
      { src: rainbow, text: "Райдужне(анімоване) ім'я та рамка доступні. Назавжди!" },
      {
        src: document,
        text: "Доступ до 20 останніх новин. Лімітована акція!",
      },
      {
        src: puzzle3,
        text: "Прив'язуйте до акаунту 4пристрої. Назавжди!",
      },
      {
        src: puzzle4,
        text: "Передавайте до 250🧧/добу, не 125. Втрата конвертів піля передачі 10%. Лімітована акція!",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 21год у разі невдачі. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 7дн. Лімітована акція!",
      },
      {
        src: puzzle1,
        text: "Баффі(х2 конверти(з досягнень, головоломок). В наступні 6хв після активації(в магазині в розділі наборів). Лімітована акція!",
      },
    ],
  };

  const current = tier === "plus" ? plusBenefits : ultraBenefits;

  return (
    <Overlay onClick={handleClose}>
      <VipModalDiv
        $isClosing={isClosing}
        $isUltra={tier === "ultra"}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>

        <HeaderToggle
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          <AnimatedText $variant={tier} key={`title-${tier}`}>
            {tier === "plus" ? "Стихія+" : "Стихія+ Ultra"}
          </AnimatedText>
        </HeaderToggle>

        <SwitchBackText
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          {tier === "plus"
            ? "Переглянути переваги Стихія+ Ultra"
            : "Повернутись до переваг Стихія+"}
        </SwitchBackText>
        <VipBlock>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageContainer $isUltra={tier === "ultra"}>
              <VipImage
                src={tier === "plus" ? turkeys : ultra}
                key={`img-${tier}`}
                $isUltra={tier === "ultra"}
              />
            </ImageContainer>

            {tier === "plus" ? (
              <>
                <VipButton>14,99грн/30днів</VipButton>
              </>
            ) : (
              <>
                <VipButton>19,99грн/30днів</VipButton>
              </>
            )}
            <VipText>
              Друзі, набори 🧧 та підписки, допомагають як і мотиваційно, так і
              в плані утримування Стихії, ціни на підписки низькі, для
              мотивації, кожен це може зробити і нічого не втратить. 
            </VipText>
          </div>
          <VipFixScroll key={`scroll-area-${tier}`}>
            {showContent && (
              <>
                <SectionTitle $delay="0.1s">ШІ</SectionTitle>
                {current.ai.map((item, i) => (
                  <BenefitCard key={`ai-${tier}-${i}`} $index={i}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}

                <SectionTitle $delay="0.3s">Музика та Арт</SectionTitle>
                {current.music.map((item, i) => (
                  <BenefitCard key={`mu-${tier}-${i}`} $index={i + 4}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
                <SectionTitle $delay="0.5s">Система</SectionTitle>
                {current.system.map((item, i) => (
                  <BenefitCard key={`sys-${tier}-${i}`} $index={i + 10}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
              </>
            )}
          </VipFixScroll>
        </VipBlock>
        <RedLine />
        <VipWarning>
          Примітка: 1.Mісячний тариф перемикається автоматично! При активній
          Стихія+ ви можете миттєво перейти на Ultra. Система дозволяє бронювати
          підписки до року вперед. Скасування броні повертає кошти на внутрішній
          баланс (або у 🧧). Деякі функції в розробці.
        </VipWarning>
        <VipWarning>
          2.Коли підписка закінчиться привілегії(не всі) зникнуть. Бонус
          лояльності: У тарифі Ultra діє лімітована акція, що активується після
          другої оплати поспіль. Якщо підписка Ultra буде перервана на термін
          понад 3 місяці, бонус анулюється(доступ лише при дії Ultra, при Plus
          таймер заморожується.), і для його відновлення знадобиться повторна
          серія оплат. Також доступна послуга «Швидкий старт» за 4,99 грн для
          миттєвої активації 1 акції.
        </VipWarning>
        <VipWarning>
          3.Переваги Стихії+ оптимізовані в Стихія+ Ultrа, ті що не були вказані
          в Стихія+ Ultra(присутні, але ті самі як в Стихія+.).
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};

export default VipModal;
