import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import time from "../../photos/vip-images/mechannic.jpg";
import dinofroz from "../../photos/vip-images/vip-dinofroz.webp";
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import ultra from "../../photos/vip-modal/realultra.jpg";
import turkey from "../../photos/vip-images/ultra-vip-turkeys.webp";
import VipModal from "./VipModal";
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
  width: 90%;
  max-width: 850px;
  max-height: 95vh;
  padding: 15px;
  border-radius: 20px;
  position: relative;
  border: 2px solid #ff6c6c;
  overflow-y: auto;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff6c6c;
    border-radius: 10px;
  }

  @media (min-width: 1900px) {
    max-width: 1300px;
    padding: 30px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  color: #ff6c6c;
  font-size: 36px;
  cursor: pointer;
  z-index: 20;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1) rotate(90deg);
    color: #fff;
  }
  @media (max-width: 768px) {
    top: 10px;
    font-size: 19px;
    right: 10px;
  }
  @media (min-width: 1900px) {
    font-size: 45px;
    top: 20px;
    right: 25px;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  .icon {
    font-size: 32px;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .text {
    font-size: 10px;
    color: #ff6c6c;
    margin-top: 4px;
    font-weight: bold;
    text-align: center;
    max-width: 90px;
    line-height: 1.2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }

  @media (min-width: 1900px) {
    top: 20px;
    left: 25px;
    .icon {
      font-size: 45px;
    }
    .text {
      font-size: 14px;
      max-width: 140px;
    }
  }
`;

const ShopTitle = styled.h2`
  color: #ff6c6c;
  letter-spacing: 2px;
  margin-bottom: 25px;
  margin-left: 60%;
  font-size: 13px;
  @media (min-width: 720px) {
    font-size: 24px;
    text-align: center;
    margin-left: 0px;
  }
  @media (min-width: 1900px) {
    font-size: 36px;
    margin-bottom: 40px;
    letter-spacing: 5px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #ffb36c 0%, #ff6c6c 100%);
  color: #3a1a1a;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 900;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  @media (min-width: 1900px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`;
const PackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1900px) {
    gap: 30px;
    margin-bottom: 40px;
  }
`;
const PackCard = styled.div`
  position: relative;
  background: #2a121215;
  border: 1px solid #ff6c6c;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  min-height: 220px;
  animation: ${(props) => (props.$isSpecial ? pulse : "none")} 2s infinite;
  transition: 0.3s;
  z-index: 1;
 &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url(${(props) => props.$bgImage});
    background-size: cover;
    background-position: center;
    opacity: 0.25;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  ${(props) =>
    props.$isSub &&
    css`
      &::before {
        opacity: ${(p) => (p.$activeImg === "turkeys" ? 0.4 : 0)};
        background-image: url(${turkeys}); 
        transition: opacity 1.5s ease-in-out;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: url(${ultra});
        background-size: cover;
        background-position: center;
        opacity: ${(p) => (p.$activeImg === "ultra" ? 0.4 : 0)};
        z-index: -1;
        transition: opacity 1.5s ease-in-out;
      }
    `}
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    &::before,
    &::after {
      opacity: ${(props) => (props.$isSub ? 0.6 : 0.4)};
    }
  }

  @media (min-width: 1900px) {
    padding: 25px;
    gap: 20px;
    min-height: 350px;
  }
`;

const PackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.13);
`;

const PackContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PackLabel = styled.div`
  font-size: 15px;
  color: #ff6c6c;
  font-weight: 900;
  @media (min-width: 1900px) {
    font-size: 20px;
  }
`;

const PackName = styled.div`
  font-weight: bold;
  font-size: 18px;
  @media (min-width: 1900px) {
    font-size: 24px;
  }
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff6c6c;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s;
  z-index: 2;

  .old-price {
    text-decoration: line-through;
    font-size: 11px;
    opacity: 0.8;
  }

  span {
    font-size: 14px;
  }

  &:hover {
    background: #ff8585;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 1900px) {
    padding: 18px;
    span {
      font-size: 18px;
    }
    .old-price {
      font-size: 13px;
    }
  }
`;

const InfoSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 1px dashed #ff6c6c;

  @media (min-width: 1900px) {
    margin-top: 40px;
    padding: 30px;
  }
`;

const InfoTitle = styled.h3`
  color: #ff6c6c;
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 108, 108, 0.2);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 1900px) {
    font-size: 24px;
    margin-bottom: 25px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1900px) {
    gap: 50px;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  font-size: 13px;
  margin-bottom: 15px;
  color: #e0e0e0;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 10px;
  line-height: 1.5;

  .price {
    color: #ff6c6c;
    font-weight: bold;
    background: rgba(255, 108, 108, 0.1);
    padding: 4px 10px;
    border-radius: 6px;
    white-space: nowrap;
    align-self: flex-start;
  }

  @media (min-width: 1900px) {
    font-size: 16px;
    margin-bottom: 20px;
    .price {
      font-size: 15px;
    }
  }
`;

const RainbowSpan = styled.span`
  font-weight: bold;
  font-size: inherit;
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

const AnimatedContent = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
`;

const ShopModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [activeSubImg, setActiveSubImg] = useState("turkeys");
  const [showVipModal, setShowVipModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubImg((prev) => (prev === "turkeys" ? "ultra" : "turkeys"));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const packs = [
    {
      name: "Механічний",
      count: 1250,
      img: time,
      buttonText: "29.99грн",
      badge: "2 рази/добу",
    },
    {
      name: "Бундючий",
      count: 1500,
      img: turkey,
      oldPrice: "70.00грн",
      buttonText: "39.99грн",
      badge: "≈-25% Популярний, ∞ в лімітах",
    },
    {
      name: "Драконячий",
      count: 2000,
      img: dinofroz,
      special: true,
      oldPrice: "90.00грн",
      buttonText: "49.99грн",
      badge: "≈-30%! Найвигідніший, Раз/добу",
    },
    {
      name: "Підписка",
      count: "Стихія+ та Стихія+ Ultra",
      img: null,
      special: true,
      buttonText: "Розблокувати",
      badge: "Преміум",
      isSub: true,
    },
  ];

  if (showVipModal) {
    return <VipModal onClose={() => setShowVipModal(false)} />;
  }

  return (
    <Overlay onClick={handleClose}>
      <ShopContainer
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <ToggleButton onClick={() => setShowInfo(!showInfo)}>
          <span className="icon">{showInfo ? "🎫" : "🧧"}</span>
          <span className="text">
            {showInfo
              ? "Повернутись до наборів"
              : "Джерела отримання та витрат"}
          </span>
        </ToggleButton>
        <ShopTitle>Магазин 🧧</ShopTitle>
        {!showInfo ? (
          <AnimatedContent key="packs">
            <PackGrid>
              {packs.map((pack) => (
               <PackCard
  key={pack.name}
  $isSpecial={pack.special}
  $bgImage={pack.img}
  $isSub={pack.isSub}
  $activeImg={activeSubImg}
>
                  {pack.badge && <Badge>{pack.badge}</Badge>}
                  <PackInfo>
                    <PackContent>
                      <PackLabel>{pack.name}</PackLabel>
                      <PackName>
                        {pack.isSub ? pack.count : `${pack.count} 🧧`}
                      </PackName>
                    </PackContent>
                  </PackInfo>
                  <BuyButton
                    onClick={() => pack.isSub && setShowVipModal(true)}
                  >
                    {pack.oldPrice && (
                      <span className="old-price">{pack.oldPrice}</span>
                    )}
                    <span>{pack.buttonText}</span>
                  </BuyButton>
                </PackCard>
              ))}
            </PackGrid>
          </AnimatedContent>
        ) : (
          <AnimatedContent key="info">
            <InfoSection>
              <InfoGrid>
                <div>
                  <InfoTitle>🎫 Як витратити:</InfoTitle>
                  <InfoList>
                    <InfoItem>
                      <span>
                        Створення, видалення погодної картки(окремо за кожний
                        процес).
                      </span>
                      <span className="price">1 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>Доступ до JPS/доба.</span>
                      <span className="price">2 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        3 Спец-аватари, кольори імені та автару (випадково в
                        ціні). Поліпшіть з <RainbowSpan>Підписками</RainbowSpan>
                        .
                      </span>
                      <span className="price">20-40 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>Зміни в налаштуваннях.</span>
                      <span className="price">4 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        Запит до ШІ (спроби за 🧧, далі 🧧 + гроші). Прискорення
                        перезарядки кнопок(регулюється к-сть) 1 🧧 = -12с.
                        Поліпшіть з <RainbowSpan>Підписками</RainbowSpan>.
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
                        головоломки. Поліпшіть{" "}
                        <RainbowSpan>Підписками</RainbowSpan>.
                      </span>
                      <span className="price">+10 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        Джекпот з шансом 20%(можливий на початку добу).
                        Покращіть <RainbowSpan>Підписками</RainbowSpan>.
                      </span>
                      <span className="price">+20 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        🏆 Поліпшіть з <RainbowSpan>Підписками</RainbowSpan>.
                      </span>
                      <span className="price">20-40 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        Стартовий набір, усі зібрані аватари, стилі імені та всі
                        пройдені головоломки. Поліпшіть доступність в
                        ціні/аватарів,
                        <RainbowSpan>Підписками</RainbowSpan>.
                      </span>
                      <span className="price">+40 🧧</span>
                    </InfoItem>
                    <InfoItem>
                      <span>
                        Оплата <RainbowSpan>Підписками</RainbowSpan>{" "}
                        передоплатою(разово) та місячним тарифом.
                      </span>
                      <span className="price">+50, 100 🧧</span>
                    </InfoItem>
                  </InfoList>
                </div>
              </InfoGrid>
            </InfoSection>
          </AnimatedContent>
        )}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "12px",
            color: "#ff5e5e",
            fontStyle: "italic",
            lineHeight: "1.6",
            opacity: 0.9,
          }}
        >
          * Для власників <RainbowSpan>Стихія+</RainbowSpan> ціна знижена на
          ≈20%, а <RainbowSpan>Стихія+ Ultra</RainbowSpan> на ≈50%. Знижка діє і
          для обмежених подій. Початок нової доби о 0:00 за Київським часом.
          Ліміт конвертів 2500, ті що перевищують ліміт, будуть
          анульовані(збільште ліміт з підписками).
        </div>
      </ShopContainer>
    </Overlay>
  );
};

export default ShopModal;
