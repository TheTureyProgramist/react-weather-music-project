import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import time from "../../photos/vip-images/mechannic.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const rainbowText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 108, 108, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 108, 108, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 108, 108, 0); }
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
  backdrop-filter: blur(3px);
  align-items: center;
  z-index: 2000;
  padding: 10px;
`;

const ShopContainer = styled.div`
  background-color: #3a1a1a;
  color: #fff;
  width: 95%;
  max-width: 850px;
  max-height: 90vh;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  border: 2px solid #ff6c6c;
  overflow-y: auto;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff6c6c;
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #ff6c6c;
  font-size: 32px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    color: #fff;
  }
`;

const ShopTitle = styled.h2`
  text-align: center;
  color: #ff6c6c;
  letter-spacing: 2px;
  margin-bottom: 25px;
`;

const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #ffb36c 0%, #ff6c6c 100%);
  color: #3a1a1a;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const PackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const PackCard = styled.div`
  position: relative;
  background: ${(props) =>
    props.$isSpecial ? "rgba(255, 108, 108, 0.2)" : "rgba(255, 108, 108, 0.1)"};
  border: 1px solid #ff6c6c;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${(props) => (props.$isSpecial ? pulse : "none")} 2s infinite;
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 108, 108, 0.25);
  }
`;

const PackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PackImageFrame = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(255, 108, 108, 0.4);
`;

const PackContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PackLabel = styled.div`
  font-size: 12px;
  color: #ff6c6c;
  font-weight: 900;
`;

const PackName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 8px;
  background: #ff6c6c;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s;

  .old-price {
    text-decoration: line-through;
    font-size: 10px;
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.95);
  }
`;
const InfoSection = styled.div`
  margin-top: 25px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 1px dashed #ff6c6c;
`;
const InfoTitle = styled.h3`
  color: #ff6c6c;
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 108, 108, 0.2);
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const InfoItem = styled.li`
  font-size: 13px;
  margin-bottom: 12px;
  color: #e0e0e0;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
  .price {
    color: #ff6c6c;
    font-weight: bold;
    background: rgba(255, 108, 108, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    white-space: nowrap;
  }
`;
const RainbowSpan = styled.span`
  font-weight: bold;
  background: linear-gradient(
    to right,
    #ff7eb3,
    #ff758c,
    #7afcff,
    #feffb7,
    #58e2c2,
    #ff7eb3
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${rainbowText} 3s linear infinite;
`;
const ShopModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };
  const packs = [
    {
      name: "Механічний",
      count: 200,
      img: time,
      buttonText: "19.99грн",
      badge: "2 рази/добу",
    },
    {
      name: "Бундючий",
      count: 250,
      img: turkeys,
      oldPrice: "24.99грн",
      buttonText: "22.99грн",
      badge: "≈-10% Популярний, ∞ в лімітах",
    },
    {
      name: "Драконячий",
      count: 500,
      img: dinofroz,
      special: true,
      oldPrice: "29.99грн",
      buttonText: "24.99грн",
      badge: "≈-50%! Найвигідніший, Раз/добу",
    },
  ];
  return (
    <Overlay onClick={handleClose}>
      <ShopContainer
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <ShopTitle>🧧 Магазин Конвертів</ShopTitle>
        <PackGrid>
          {packs.map((pack) => (
            <PackCard key={pack.count} $isSpecial={pack.special}>
              {pack.badge && <Badge>{pack.badge}</Badge>}
              <PackInfo>
                <PackImageFrame src={pack.img} alt={pack.name} />
                <PackContent>
                  <PackLabel>{pack.name}</PackLabel>
                  <PackName>{pack.count} 🧧</PackName>
                </PackContent>
              </PackInfo>
              <BuyButton>
                {pack.oldPrice && (
                  <span className="old-price">{pack.oldPrice}</span>
                )}
                <span>{pack.buttonText}</span>
              </BuyButton>
            </PackCard>
          ))}
        </PackGrid>
        <InfoSection>
          <InfoGrid>
            <div>
              <InfoTitle>🎫 Як витратити:</InfoTitle>
              <InfoList>
                <InfoItem>
                  <span>Підказка в головоломці.</span>
                  <span className="price">1 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Створення, оновлення, видалення погодної картки(окремо за
                    всі процеси). Доступ до детальної інформації 1 картки(на
                    добу)
                  </span>
                  <span className="price">2 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    3 Спец-аватари та кольори імені (випадково). Поліпшіть з{" "}
                    <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">20-40 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Автоповтор всіх пісень(на добу). Поліпшіть з{" "}
                    <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">4 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Запит до ШІ (після 3 безкоштовних спроб, 2 спроби за
                    конверти, далі конверти + гроші). Прискорення перезарядки
                    кнопок(регулюється к-сть) 1 конверт до -12с перезарядки.
                    Поліпшіть з <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">5 🧧</span>
                </InfoItem>
              </InfoList>
            </div>
            <div>
              <InfoTitle>🎁 Як отримати:</InfoTitle>
              <InfoList>
                <InfoItem>
                  <span>
                    Щоденний безкоштовнй бонус за вхід, проходження 1
                    головоломки. Поліпшіть з <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">+10 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Джекпот з шансом 20%(можливий на початку добу)
                    <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">+20 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Досягнення. Поліпшіть з <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">20-40 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Стартовий набір, усі зібрані аватари, стилі імені та всі
                    пройдені головоломки. Поліпшіть доступність з{" "}
                    <RainbowSpan>Стихія+</RainbowSpan>.
                  </span>
                  <span className="price">+40 🧧</span>
                </InfoItem>
                <InfoItem>
                  <span>
                    Оплата тарифу <RainbowSpan>Стихія+</RainbowSpan>{" "}
                    передоплатою(разово) та місячним тарифом.
                  </span>
                  <span className="price">+50 🧧</span>
                </InfoItem>
              </InfoList>
            </div>
          </InfoGrid>
        </InfoSection>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "11px",
            color: "#ff5e5e",
            fontStyle: "italic",
            opacity: 0.9,
          }}
        >
          * Для власників <RainbowSpan>Стихія+</RainbowSpan> ціна знижена на
          ≈25%, а Стихія+ Ультра. Початок нової доби о 0:00 за Київським часом.
          Ліміт конвертів 1000, ті що перевищують ліміт, будуть анульовані.
        </div>
      </ShopContainer>
    </Overlay>
  );
};
export default ShopModal;
