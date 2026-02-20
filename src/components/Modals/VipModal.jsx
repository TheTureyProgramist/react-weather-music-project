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

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
  border: 2px solid ${props => props.$isUltra ? "#00ff00" : "#ffb36c"};
  overflow-y: auto;
  transition: border-color 0.5s ease;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out forwards;

  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 35px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px; right: 10px;
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 22px;
  cursor: pointer;
  z-index: 1010;
  &:hover { color: #fff; }
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
  &:hover { transform: scale(1.02); }
`;

const AnimatedText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${props => props.$variant === 'ultra' ? css`
    background-image: linear-gradient(270deg, #ff7eb3, #ff758c, #7afcff, #feffb7, #58e2c2);
    background-size: 400% 400%;
    animation: ${flowPlus} 5s ease infinite, ${appearAndShrink} 0.8s ease-out forwards;
  ` : css`
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
  &:hover { opacity: 1; }
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
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #ffb36c; border-radius: 10px; }
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
  animation-delay: ${props => props.$delay || "0.2s"};
`;

const VipImage = styled.img`
  width: 260px;
  border-radius: 6px;
  border: 1px solid #ffb36c;
  @media (max-width: 768px) { width: 100%; }
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
  @media (max-width: 768px) { width: 100%; }
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
      { src: texts, text: "6 безкоштовних повідомлень/день + за 🧧 4 спроби, замість 3 безкоштовних повідомлень/день + за 🧧 2. Після вичерпування ліміту ціна повідомлення 0,11грн, не 0,13грн + 🧧. Ліміт безкоштовних спроб може змінюватися залежно від навантаження на систему." },
      { src: lebid, text: "2 (не 1) зображення/міс по 3,99грн, далі 5,99грн." },
      { src: clip, text: "Відео 65грн/с (замість 75грн/с)." },
      { src: music, text: "mp3 3грн/хв, не 5грн/хв." }
    ],
    music: [
      { src: monody, text: "Музичний файл та текст пісні Monody-TheFatRat та VIP-аватар (Нічний ліс) доступні через 3дн. після реєстрації, не через 7дн." },
      { src: asium, text: "Можна взяти в обране 8 пісень, а не 4! І на 50% дешевше(5, не 2 безкоштовних кріплень, та 3(не 1) за 🧧)!А також поділ(необране, напівобране, обране)" },
      { src: dinofroz, text: "Пісні доступні без інтернету." },
      { src: horrordog, text: "Джойстики швидкості для муз. карток." },
      { src: letters, text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧." },
      { src: dragons, text: "Автоповтор та доступ до пошуку пісні/добу дешевший на 25% в 🧧. А діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧." }
    ],
    system: [
      { src: vip, text: "Оновлений стиль сайту (з перемикачем лого вгорі, в лівому кутку)." },
      { src: stars, text: "Плавніший регулятор темної теми." },
      { src: dragons, text: "Знижка 25% у магазині конвертів, досягнення дають додатково до 20🧧, якщо їх к-сть у досягненнях < 40. У сумі вийде 40. Навіть, якщо ви вже виконали досягнення вони будуть після оплати автоматично відправлені. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 50🧧. Ліміт покупок наборів 🧧*2. Можна зберігати 2500🧧, замість 2000. Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧)." },
      { src: buton, text: "Кнопки Пошук міста/Оновлення, видалення картки має перезарядку 12с замість 1хв. Прогноз на 15 днів, не на 14 днів." },
      { src: rainbow, text: "Райдужне ім'я та рамка доступні через 3дні, не через 7дн після реєстрації." },
      { src: time, text: "Нові функції з'являться пізніше." }
    ]
  };

  const ultraBenefits = {
  ai: [
      { src: texts, text: "12 безкоштовних повідомлень/день + за 🧧 8 спроби. Далі за 0,1грн 🧧(лише за обширні відповіді)" },
      { src: lebid, text: "3 зображення/міс по 2,99грн, далі 4,99грн." },
      { src: clip, text: "Відео 45грн/с." },
      { src: music, text: "mp3 2грн/хв." }
    ],
    music: [
      { src: monody, text: "Музичний файл та текст пісні Monody-TheFatRat та VIP-аватар (Нічний ліс) доступні одразу після реєстрації." },
      { src: asium, text: "Можна взяти в обране 12 пісень. І на 50% дешевше(8 безкоштовних кріплень, та 4 за 🧧)!"},
      { src: horrordog, text: "Промотувачі 10с вперед/назад для муз. карток." },
      { src: letters, text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-25🧧" },
      { src: dragons, text: "Автоповтор та доступ до пошуку пісні/добу дешевший на 50% в 🧧. А діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧." }
    ],
    system: [
      { src: vip, text: "Оновлений стиль сайту (з перемикачем лого)." },
      { src: dragons, text: "Знижка 50% у магазині конвертів. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 100🧧. Ліміт покупок наборів 🧧*3. Можна зберігати 5000🧧. Шанс 50% на джекпот(Ціна збільшена на 20🧧)." },
      { src: buton, text: "Кнопки Пошук міста/Оновлення, видалення картки має перезарядку 3с. Прогноз на 17 днів." },
      { src: rainbow, text: "Райдужне ім'я та рамка доступні зразу." },
      { src: time, text: "Нові функції з'являться пізніше." }
    ]
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
        
        <HeaderToggle onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}>
          <AnimatedText $variant={tier} key={`title-${tier}`}>
            {tier === "plus" ? "Стихія+" : "Стихія+ Ультра"}
          </AnimatedText>
        </HeaderToggle>

        {tier === "ultra" && (
          <SwitchBackText onClick={() => handleTierSwitch("plus")}>
            Повернутись до переваг Стихія+
          </SwitchBackText>
        )}

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

          <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
            <SectionTitle $delay="0.4s">
              {tier === "plus" ? "TurkeyStudio VIP!" : "TurkeyStudio Ultra VIP!"}
            </SectionTitle>
            <VipImage src={tier === "plus" ? turkeys : stars} key={`img-${tier}`} />
            
            {tier === "plus" ? (
              <>
                <VipButton>1,99грн/місяць</VipButton>
                <VipButton>Членський платіж: 3,99грн/тиждень</VipButton>
              </>
            ) : (
              <>
                <VipButton>5,99грн/місяць</VipButton>
                <VipButton>Членський платіж: 7,99грн/декада</VipButton>
              </>
            )}
            <VipText>Місячний тариф доступний, після членського платіжу.</VipText>
          </div>
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
        <VipWarning>
          Переваги Стихії+ оптимізовані в Стихія+ Ультра, ті що не були вказані в  Стихія+ Ультра(присутні, але ті самі як в Стихія+.)
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};

export default VipModal;