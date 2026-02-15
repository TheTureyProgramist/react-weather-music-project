import React, {useState} from "react";
import styled, { keyframes } from "styled-components";
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
import monody from "../../photos/vip-images/vip-forest.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import rooster from "../../photos/vip-images/vip-rooster.jpg";
import vip from "../../photos/hero-header/vip.jpg";
import music from "../../photos/vip-modal/music.jpg";
import time from "../../photos/vip-images/mechannic.jpg";
import clip from "../../photos/vip-images/clip.png";
import stars from "../../photos/vip-images/stars.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import buton from "../../photos/vip-modal/buton.jpg";
import texts from "../../photos/vip-modal/texts.jpg";
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
  animation: ${flow} 5s ease infinite;
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
  animation: ${props => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out forwards;
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
  margin-bottom: 6px;
  transition: transform 0.2s;

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
  font-size: 11px;
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
`;

const VipFix = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid #ffb36c;
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  width: 260px;
  font-size: 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
  &::placeholder {
    color: rgba(255, 179, 108, 0.5);
    font-size: 10px;
  }
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
const RedLine = styled.div`
  background: red;
  width: 100%;
  height: 1px;
  margin: 10px 0;
`;
const VipFormater = styled.form`
  display: flex;
  gap: 6px;
  flex-direction: column;
`;
const VipWarning = styled.p`
  color: red;
  font-size: 12px;
  word-wrap: break-word;
  margin-bottom: 2px;
`;
const InputBlock = styled.div`
display: flex;
gap: 10px;
flex-direction: column;
   @media (max-width: 768px) {
flex-direction: row;
  }
  @media (max-width: 1200px) {
flex-direction: column;
  }
`
const VipModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };
 return (
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <VipModalDiv 
        $isClosing={isClosing} 
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <AnimatedText>Стихія+</AnimatedText>
        <VipBlock>
          <VipFixScroll>
            <SectionTitle>ШІ</SectionTitle>
            <BenefitCard>
              <BenefitImage src={texts} />
              <VipBonus>15 безкоштовних повідомлень/день, замість 5. Після вичерпування ліміту ціна повідомлення 0,36грн, не 0,6грн</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={lebid} />
              <VipBonus>2 (не 1) зображення/міс по 3,99грн, далі 4,99грн.</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={clip} />
              <VipBonus>Відео 56грн/с (замість 70грн/с).</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={music} />
              <VipBonus>mp3 2,5грн/хв, не 3,5грн/хв</VipBonus>
            </BenefitCard>
            <SectionTitle>Музика та Арт</SectionTitle>
            <BenefitCard>
              <BenefitImage src={dinofroz} />
              <VipBonus>30 скачувань музики на добу, замість 7.</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={rooster} />
              <VipBonus>
                45 роздруківок фан-артів та муз. карток на добу, замість 9.
              </VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={dragons} />
              <VipBonus>Джойстики звуку, швидкості та промотовучі 10с вперед/назад для муз. карток.</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={monody} />
              <VipBonus>
                Музичний файл, фан-арт та текст пісні Monody-TheFatRat та
                VIP-аватар (Нічний ліс) доступні одразу після реєстрації, не
                через 24год.
              </VipBonus>
            </BenefitCard>
            <SectionTitle>Система</SectionTitle>
            <BenefitCard>
              <BenefitImage src={vip} />
              <VipBonus>
                Оновлений стиль сайту (з перемикачем лого вгорі, в лівому
                кутку).
              </VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={stars} />
              <VipBonus>Плавніший регулятор темної теми.</VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={buton} />
              <VipBonus>
                Пошук міста/Оновлення картки має перезарядку 5с замість 1хв.
              </VipBonus>
            </BenefitCard>
            <BenefitCard>
              <BenefitImage src={time} />
              <VipBonus>Нові функції з'являться пізніше.</VipBonus>
            </BenefitCard>
          </VipFixScroll>
          <VipFix>
            <VipFormater>
              <InputBlock>
              <Input placeholder="Номер картки"></Input>
              <Input placeholder="CVC2/CVV2 - 3 цифри позаду картки"></Input>
              <Input placeholder="Термін дії(Н-д: 05/29)"></Input>
              </InputBlock>
              <SectionTitle>TurkeyStudio VIP!</SectionTitle>
              <VipImage src={turkeys} />
              <VipButton>2,99грн/місяць</VipButton>
              <VipText>З передоплатою 7,99грн/тиждень</VipText>
            </VipFormater>
          </VipFix>
        </VipBlock>
        <RedLine />
        <VipWarning>
          Примітка: 1.Відмовишись від підписки, вам доведеться внести
          передоплату знову, якщо не передумаєте до кінця терміну тарифу.
        </VipWarning>
        <VipWarning>
          Примітка: 2.Доступно з 14років, ціни не будуть мінятись, якщо
          економічний стан не зміниться. І коли підписка закінчиться привілегії
          зникнуть.
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};
export default VipModal;