import styled from "styled-components";
// import { useState } from "react";
import turkeys from "../../photos/vip-images/ultra-vip-turkeys.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import horse from "../../photos/vip-images/horse.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import rooster from "../../photos/vip-images/vip-rooster.jpg";
import nicerone from "../../photos/vip-images/vip-dinofroz.webp";
import soloveyko from "../../photos/vip-images/vip-soloveyko.jpg";
import monody from "../../photos/vip-images/vip-forest.webp";
import volcano from "../../photos/vip-images/fire.jpg";
const FanArtDiv = styled.div`
  margin-top: 35px;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;

const FanArtTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  margin-bottom: 35px;
  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 50px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
    margin-bottom: 80px;
  }
`;
const FanBlock = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding: 10px 10px 20px 10px;
  &::-webkit-scrollbar {
    height: 8px;
    display: block;
  }
  &::-webkit-scrollbar-track {
    background: rgba(128, 0, 128, 0.1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #8a2be2;
    border-radius: 10px;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7b1fa2;
  }
  scrollbar-width: auto;
  scrollbar-color: #8a2be2 rgba(128, 0, 128, 0.1);
`;

const BenefitImage = styled.img`
  flex: 0 0 85%;
  width: 85%;
  scroll-snap-align: center;
  border-radius: 15px;
  object-fit: cover;
  height: auto;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    flex: 0 0 45%;
    width: 45%;
    height: auto;
  }

  @media (min-width: 1200px) {
    flex: 0 0 30%;
    width: 20%;
    height: auto;
  }
`;
const FanArt = ({ isDarkMode, user, onOpenRegister }) => {
  const images = [
    turkeys,
    nicerone,
    dragons,
    horse,
    lebid,
    monody,
    rooster,
    soloveyko,
    volcano,
  ];

  const handleImageClick = (imgSrc) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Fan Art</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };
  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>
        Фан-арти(Клікніть на картинку, для друку)
      </FanArtTitle>
      <FanBlock>
        {images.map((img, index) => (
          <BenefitImage
            key={index}
            src={img}
            alt="Fan art"
            onClick={() => handleImageClick(img)}
            title={user ? "Клік для друку" : "Необхідна реєстрація для друку"}
          />
        ))}
      </FanBlock>
    </FanArtDiv>
  );
};
export default FanArt;
