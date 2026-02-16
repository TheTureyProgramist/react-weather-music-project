import React from "react";
import styled from "styled-components";
// import turkeys from "./photos/vip-images/ultra-vip-turkeys.webp";
// import dragons from "./photos/vip-images/vip-dragons.jpg";
// import horrordog from "./photos/vip-images/horror.jpg";
 import horse from "../../photos/vip-images/horse.jpg";
// import lebid from "./photos/vip-images/vip-lebid.jpg";
// import rooster from "./photos/vip-images/vip-rooster.jpg";
// import nicerone from "./photos/vip-images/vip-dinofroz.webp";
// import soloveyko from "./photos/vip-images/vip-soloveyko.jpg";
// import monody from "./photos/vip-images/vip-forest.webp";
// import dizel from "./photos/vip-images/dizel.webp";
// import flame from "./photos/vip-images/flame.jpg";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #093500;
  color: #2eb813;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  font-size: 21px;
  border: 2px solid #2eb813;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: green;
`;

const AchivmentsTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: "Inter", sans-serif;
`;

const AchivmentItem = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  border-radius: 10px;
  padding: 10px;
  gap: 15px;
  border: 1px solid #a2ff6c;
`;

const AchivmentImagePlace = styled.div`
  width: 60px;
  height: 60px;
  background: rgb(123, 255, 83);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AchivmentInfo = styled.div`
  flex-grow: 1;
`;

const AchivmentName = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #ffb36c;
`;

const AchivmentGoal = styled.p`
  margin: 5px 0 0;
  font-size: 13px;
  opacity: 0.8;
`;

const RewardField = styled.div`
  width: 40px;
  height: 40px;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
`;

const AchivmentsModal = ({ onClose, isDarkMode }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent $isDarkMode={isDarkMode} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} $isDarkMode={isDarkMode}>&times;</CloseButton>
        <AchivmentsTitle>Досягнення</AchivmentsTitle>
        
        <AchivmentItem $isDarkMode={isDarkMode}>
          <AchivmentImagePlace src={horse}></AchivmentImagePlace>
          <AchivmentInfo>
            <AchivmentName>Спринтер</AchivmentName>
            <AchivmentGoal>Ціль: пройти головоломку за 40с</AchivmentGoal>
          </AchivmentInfo>
          
          <RewardField title="Нагорода">
            🎁
          </RewardField>
        </AchivmentItem>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AchivmentsModal;