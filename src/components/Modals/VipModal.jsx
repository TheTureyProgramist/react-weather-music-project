import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
// Імпорти фото
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
import monody from "../../photos/vip-images/vip-forest.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import vip from "../../photos/hero-header/vip.jpg";
import music from "../../photos/vip-modal/music.jpg";
import time from "../../photos/vip-images/mechannic.jpg";
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

const appearAndShrink = keyframes`
  0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
  50% { opacity: 0.5; transform: scale(1.1); filter: blur(2px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
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
    width: 500px;
    height: 500px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg 10deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 10deg 15deg,
      transparent 15deg 30deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 40deg 45deg,
      transparent 45deg 60deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 70deg 75deg,
      transparent 75deg 90deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 100deg 105deg,
      transparent 105deg 120deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 130deg 135deg,
      transparent 135deg 150deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 160deg 165deg,
      transparent 165deg 180deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 190deg 195deg,
      transparent 195deg 210deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 220deg 225deg,
      transparent 225deg 240deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 250deg 255deg,
      transparent 255deg 270deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 280deg 285deg,
      transparent 285deg 300deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 310deg 315deg,
      transparent 315deg 330deg,
      ${(props) => (props.$isUltra ? "rgba(122, 252, 255, 0.4)" : "rgba(255, 179, 108, 0.25)")} 340deg 345deg,
      transparent 345deg 360deg
    );
    animation: ${rotateRays} 20s linear infinite;
    z-index: -1; 
    pointer-events: none;
    mask-image: radial-gradient(circle, black 20%, transparent 70%); 
  }
  ${(props) => props.$isUltra && css`
    &::after {
      content: "";
      position: absolute;
      width: 500px;
      height: 500px;
      background: conic-gradient(
        from 0deg,
        transparent 20deg 30deg,
        rgba(139, 0, 255, 0.35) 30deg 35deg,
        transparent 35deg 50deg,
        rgba(139, 0, 255, 0.35) 60deg 65deg,
        transparent 65deg 80deg,
        rgba(139, 0, 255, 0.35) 90deg 95deg,
        transparent 95deg 110deg,
        rgba(139, 0, 255, 0.35) 120deg 125deg,
        transparent 125deg 140deg,
        rgba(139, 0, 255, 0.35) 150deg 155deg,
        transparent 155deg 170deg,
        rgba(139, 0, 255, 0.35) 180deg 185deg,
        transparent 185deg 200deg,
        rgba(139, 0, 255, 0.35) 210deg 215deg,
        transparent 215deg 230deg,
        rgba(139, 0, 255, 0.35) 240deg 245deg,
        transparent 245deg 260deg,
        rgba(139, 0, 255, 0.35) 270deg 275deg,
        transparent 275deg 290deg,
        rgba(139, 0, 255, 0.35) 300deg 305deg,
        transparent 305deg 320deg,
        rgba(139, 0, 255, 0.35) 330deg 335deg,
        transparent 335deg 350deg
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
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
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
  background: red;
  width: 100%;
  height: 1px;
  margin: 10px 0;
`;

const VipWarning = styled.p`
  color: red;
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
      { src: music, text: "mp3 3грн/хв, не 5грн/хв." },
      { src: puzzle2, text: "Пам'ять на 33дні, не на 21добу! Ліміт історії запитів 70, не 50" },
    ],
    music: [
      {
        src: monody,
        text: "Музичний файл та текст пісні Monody-TheFatRat, Зотрополіс(Дісей-пісні 2 частин) та VIP-аватари (Нічний ліс, Зоотрополіс 1 та 2) доступні через 3дн. після реєстрації, не через 7дн.",
      },
      {
        src: asium,
        text: "Можна взяти в обране 8 пісень, а не 4! І на 50% дешевше(5, не 2 безкоштовних кріплень, та 3(не 1) за 🧧)!А також поділ(необране, напівобране, обране)",
      },
      { src: dinofroz, text: "Пісні доступні без інтернету." },
      { src: horrordog, text: "Промотувачі 10с вперед/назад для муз. карток. Натискайте на зображення для цієї механіки." },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧.",
      },
      {
        src: dragons,
        text: "Автоповтор та доступ до пошуку пісні/добу дешевший на 25% в 🧧. А діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧.",
      },
    ],
    system: [
      {
        src: vip,
        text: "Оновлений стиль сайту (з перемикачем лого вгорі, в лівому кутку).",
      },
      { src: stars, text: "Плавніший регулятор темної теми." },
      {
        src: dragons,
        text: "Знижка 25% у магазині 🧧, 🏆 дають додатково до 20🧧, якщо їх к-сть у 🏆 < 40. У сумі вийде 40. Навіть, якщо ви вже виконали 🏆 вони будуть після оплати автоматично відправлені. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 50🧧. Ліміт покупок наборів 🧧*2. Можна зберігати 2500🧧, замість 1250. Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧).",
      },
      {
        src: buton,
        text: "Кнопки Додавання міста/Оновлення, Видалення картки має перезарядку 12с замість 1хв. Ліміт додаткових карток 4. Зайві картки видаляються коли підписка сплине в терміні.",
      },
      {
        src: rainbow,
        text: "Райдужне ім'я та рамка доступні через 3дні, не через 7дн після реєстрації.",
      },
      {
        src: document,
        text: "Доступно 8 останніх новин, а не 4.",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 у випадку невдачі 33год, не 42год. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 12дн., а не 21дн.",
      },
      { src: time, text: "Нові функції з'являться пізніше, в обох підписках!" },
    ],
  };

  const ultraBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 7 спроб. Далі за 0,7грн + 🧧(лише за обширні відповіді)",
      },
      { src: lebid, text: "3 зображення/міс по 3,99грн, далі 5,99грн." },
      { src: clip, text: "Відео 45грн/с." },
      { src: music, text: "mp3 2грн/хв." },
      { src: puzzle2, text: "Пам'ять на 42доби! Пам'ять запитів 100." },
    ],
    music: [
      {
        src: monody,
        text: "Музичний файл та текст пісні Monody-TheFatRat та Зоотрополіс(Дісней-пісні обидвох частин) та VIP-аватари (Нічний ліс, Зоотрополіс 1 та 2) доступні одразу після реєстрації.",
      },
      {
        src: asium,
        text: "Можна взяти в обране 12 пісень. І на 50% дешевше(8 безкоштовних кріплень, та 4 за 🧧)!",
      },
      { src: horrordog, text: "Потужність часу промотувача можна регулювати у катрці(5-25с)!" },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-25🧧",
      },
      {
        src: dragons,
        text: "Автоповтор та доступ до пошуку пісні/добу дешевший на 50% в 🧧. А діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧.",
      },
    ],
    system: [
      { src: vip, text: "Оновлений стиль сайту (з перемикачем лого)." },
      {
        src: dragons,
        text: "Знижка 50% у магазині 🧧. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 100🧧. Ліміт покупок наборів 🧧*3. Можна зберігати 5000🧧. Шанс 50% на джекпот(Ціна збільшена на 20🧧).",
      },
      {
        src: buton,
        text: "Кнопки Додавання міста/Оновлення, Видалення картки має перезарядку 3с. Ліміт додаткових карток 8.",
      },
      { src: rainbow, text: "Райдужне ім'я та рамка доступні зразу." },
      {
        src: document,
        text: "Досуп до 16 останніх новин.",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 21год у разі невдачі. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 7дн.",
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
            {tier === "plus" ? "Стихія+" : "Стихія+ Ультра"}
          </AnimatedText>
        </HeaderToggle>

 <SwitchBackText onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}>
  {tier === "plus" ? "Переглянути переваги Стихія+ Ультра" : "Повернутись до переваг Стихія+"}
</SwitchBackText>
        <VipBlock>
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
                  <BenefitCard key={`sy-${tier}-${i}`} $index={i + 10}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
              </>
            )}
          </VipFixScroll>

          <div style={{ display: "flex", gap: "6px", flexDirection: "column", alignItems: "center" }}>
            <SectionTitle $delay="0.4s" style={{ width: "100%" }}>
              {tier === "plus"
                ? "TurkeyStudio VIP!"
                : "TurkeyStudio Ultra VIP!"}
            </SectionTitle>
            
            <ImageContainer $isUltra={tier === "ultra"}>
              <VipImage
                src={tier === "plus" ? turkeys : ultra}
                key={`img-${tier}`}
                $isUltra={tier === "ultra"}
              />
            </ImageContainer>

            {tier === "plus" ? (
              <>
                <VipButton>0,99грн/місяць</VipButton>
                <VipButton>Членський платіж: 1,99грн/день</VipButton>
              </>
            ) : (
              <>
                <VipButton>2,99грн/декада</VipButton>
                <VipButton>Членський платіж: 3,99грн/тиждень</VipButton>
              </>
            )}
            <VipText>
              Місячний тариф доступний, після членського платіжу.
            </VipText>
                        <VipText>
              Друзі, набори 🧧 та підписки, допомагають як і мотиваційно, так і в плані утримування Стихії, ціни на підписки низькі, для мотивації, кожен це може зробити і нічого не втратить.
            </VipText>
          </div>
        </VipBlock>

        <RedLine />
        <VipWarning>
          Примітка: 1.Відмовишись від підписки, вам доведеться внести
          передоплату знову, якщо не передумаєте до кінця терміну тарифу. Членський платіж на місячний тариф перемкнуться автоматично!
        </VipWarning>
        <VipWarning>
          Примітка: 2.Ціни не будуть змінюватись, якщо економічний стан не
          зміниться. І коли підписка закінчиться привілегії(не всі) зникнуть.
        </VipWarning>
        <VipWarning>
          Примітка: 3.Переваги Стихії+ оптимізовані в Стихія+ Ультра, ті що не
          були вказані в Стихія+ Ультра(присутні, але ті самі як в Стихія+.).  Деякі функції в розробці.
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};

export default VipModal;