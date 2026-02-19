import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
import monody from "../../photos/vip-images/vip-forest.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import vip from "../../photos/hero-header/vip.jpg";
import music from "../../photos/vip-modal/music.jpg";
import time from "../../photos/vip-images/mechannic.jpg";
import clip from "../../photos/vip-images/clip.png";
import stars from "../../photos/vip-images/stars.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import buton from "../../photos/vip-modal/buton.jpg";
import texts from "../../photos/vip-modal/texts.jpg";
import horrordog from "../../photos/vip-images/horror.jpg";
import asium from "../../photos/vip-images/asium.jpg";
import rainbow from "../../photos/fan-art/rainbow.webp";
import letters from "../../photos/fan-art/letters.webp";

const appearAndShrink = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.3); 
    filter: blur(10px);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1); 
    filter: blur(0);
  }
`;

const slideIn = keyframes`
0% {
transform: translateY(100%) scale(0.5);
}
100% {
transform: translateY(0%)
scale(1);
}
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(
    270deg,
    #ff7eb3,
    #ff758c,
    #7afcff,
    #feffb7,
    #58e2c2
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${flow} 5s ease infinite, ${appearAndShrink} 0.8s ease-out forwards;
  color: transparent;
  text-align: start;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(3px);
  bottom: 0;
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
  border: 2px solid #ffb36c;
  overflow-y: auto;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 35px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 22px;
  cursor: pointer;
  z-index: 1010;
  &:hover {
    color: #fff;
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
  animation: ${appearAndShrink} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  margin-bottom: 6px;
  transition: transform 1s;
  ${({ $index }) => css`
    animation-delay: ${0.3 + $index * 0.1}s;
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
  font-size: 9.9px;
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
  ${({ $delay }) => css`
    animation-delay: ${$delay || "1s"};
  `}
`;

const VipFix = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  animation: ${appearAndShrink} 0.8s ease-out forwards;
  animation-delay: 0.5s;
`;

const VipImage = styled.img`
  width: 260px;
  border-radius: 6px;
  border: 1px solid #ffb36c;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  @media (max-width: 768px) {
    justify-content: flex-end;
    max-width: 72%;
  }
  @media (max-width: 1200px) {
    justify-content: flex-end;
  }
`;

const VipFormater = styled.form`
  display: flex;
  gap: 6px;
  flex-direction: column;
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

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const aiBenefits = [
    { src: texts, text: "6 безкоштовних повідомлень/день + за 🧧 4спроби, замість 3 безкоштовних повідомлень/день + за 🧧 2. Після вичерпування ліміту ціна повідомлення 0,1грн, не 0,12грн + 🧧. Ліміт безкоштовних нестабільний через активність користувачів." },
    { src: lebid, text: "2 (не 1) зображення/міс по 3,99грн, далі 5,99грн." },
    { src: clip, text: "Відео 56грн/с (замість 70грн/с)." },
    { src: music, text: "mp3 2,5грн/хв, не 3,5грн/хв." }
  ];

  const musicBenefits = [
    { src: monody, text: "Музичний файл та текст пісні Monody-TheFatRat та VIP-аватар (Нічний ліс) доступні одразу після реєстрації, не через 7дн." },
    { src: asium, text: "Можна взяти в обране 8 пісень, а не 4! І на 50% дешевше(5, не 2 безкоштовних кріплень, та 3(не 1) за 🧧)!" },
    { src: dinofroz, text: "Розширений кеш для офлайн-прослуховування." },
    { src: horrordog, text: "Джойстики звуку та промотувачі 10с вперед/назад для муз. карток." },
    { src: letters, text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧:" },
    { src: dragons, text: "Автоповтор та доступ до пошуку пісні/добу дешевший на 25% в 🧧. А діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧." }
  ];

  const systemBenefits = [
    { src: vip, text: "Оновлений стиль сайту (з перемикачем лого вгорі, в лівому кутку)." },
    { src: stars, text: "Плавніший регулятор темної теми." },
    { src: dragons, text: "Знижка 50% у магазині конвертів, досягнення дають додатково до 20🧧, якщо їх к-сть у досягненнях < 40. У сумі вийде 40. Навіть, якщо ви вже виконали досягнення вони будуть після оплати автоматично відправлені. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 50🧧. Ліміт покупок наборів 🧧*2. Можна зберігати 1000🧧, замість 500. Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧)." },
    { src: buton, text: "Кнопки Пошук міста/Оновлення, видалення картки має перезарядку 12с замість 1хв. Прогноз на 21 день, не на 14 днів." },
    { src: rainbow, text: "Райдужне ім'я та рамка доступні зразу не через 7дн після реєстрації." },
    { src: time, text: "Нові функції з'являться пізніше." }
  ];

  return (
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <VipModalDiv $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <AnimatedText>Стихія+</AnimatedText>
        <VipBlock>
          <VipFixScroll>
            <SectionTitle $delay="0.2s">ШІ</SectionTitle>
            {aiBenefits.map((item, i) => (
              <BenefitCard key={i} $index={i}>
                <BenefitImage src={item.src} />
                <VipBonus>{item.text}</VipBonus>
              </BenefitCard>
            ))}

            <SectionTitle $delay="0.7s">Музика та Арт</SectionTitle>
            {musicBenefits.map((item, i) => (
              <BenefitCard key={i} $index={i + 4}>
                <BenefitImage src={item.src} />
                <VipBonus>{item.text}</VipBonus>
              </BenefitCard>
            ))}

            <SectionTitle $delay="1.2s">Система</SectionTitle>
            {systemBenefits.map((item, i) => (
              <BenefitCard key={i} $index={i + 10}>
                <BenefitImage src={item.src} />
                <VipBonus>{item.text}</VipBonus>
              </BenefitCard>
            ))}
          </VipFixScroll>

          <VipFix>
            <VipFormater onSubmit={(e) => e.preventDefault()}>
              <SectionTitle $delay="0.4s">TurkeyStudio VIP!</SectionTitle>
              <VipImage src={turkeys} />
              <VipButton>1,99грн/місяць</VipButton>
              <VipButton>Передоплата: 3,99грн/тиждень</VipButton>
              <VipText>Місячний тариф доступний, після передоплати.</VipText>
            </VipFormater>
          </VipFix>
        </VipBlock>
                <RedLine />
                <VipWarning>
          Примітка: 1.Відмовишись від підписки, вам доведеться внести
          передоплату знову, якщо не передумаєте до кінця терміну тарифу.
        </VipWarning>
        <VipWarning>
          Примітка: 2.Ціни не будуть змінюватись, якщо
          економічний стан не зміниться. І коли підписка закінчиться привілегії(не всі)
          зникнуть.
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};
export default VipModal;