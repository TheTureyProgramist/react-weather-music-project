import React, { useState } from "react";
import styled from "styled-components";
import turkeys from "../../photos/vip-images/ultra-vip-turkeys.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import horse from "../../photos/vip-images/horse.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import rooster from "../../photos/vip-images/vip-rooster.jpg";
import nicerone from "../../photos/vip-images/vip-dinofroz.webp";
import soloveyko from "../../photos/vip-images/vip-soloveyko.jpg";
import monody from "../../photos/vip-images/vip-forest.webp";
import volcano from "../../photos/vip-images/fire.jpg";
import flame from "../../photos/vip-images/flame.jpg";
import dizel from "../../photos/vip-images/dizel.webp";
const FanArtDiv = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (min-width: 1920px) {
    font-size: 45px;
    margin-bottom: 100px;
  }
`;
const FanBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 10px;
  width: 100%;
  max-width: 100%;

  @media (min-width: 1920px) {
    gap: 30px;
  }
`;
const BenefitImage = styled.img`
  width: 140px;
  border-radius: 15px;
  object-fit: cover;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
  @media (min-width: 768px) {
    width: 210px; 
  }
  @media (min-width: 1200px) {
    width: 270px; 
  }
  @media (min-width: 1920px) {
    width: 310px; 
    border-radius: 25px;
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 30px;
  background: #ffb36c;
  color: black;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: var(--font-family);
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #ffa04d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 1920px) {
    padding: 25px 60px;
    font-size: 28px;
    border-radius: 15px;
    margin-top: 60px;
  }
`;

const FanArt = ({ isDarkMode, user, onOpenRegister }) => {
  const allImages = [
    turkeys, nicerone, dragons, horse, lebid, monody, 
    rooster, soloveyko, volcano, flame, dizel,
    turkeys, nicerone, 
  ];

  const [visibleCount, setVisibleCount] = useState(10);

  const showMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleImageClick = (imgSrc) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Fan Art</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`
    );
    printWindow.document.close();
  };

  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>
        Фан-арти (Клікніть на картинку для друку)
      </FanArtTitle>
      
      <FanBlock>
        {allImages.slice(0, visibleCount).map((img, index) => (
          <BenefitImage
            key={index}
            src={img}
            alt="Fan art"
            onClick={() => handleImageClick(img)}
            title={user ? "Клік для друку" : "Необхідна реєстрація для друку"}
          />
        ))}
      </FanBlock>

      {visibleCount < allImages.length && (
        <LoadMoreButton onClick={showMoreImages}>
          Показати ще
        </LoadMoreButton>
      )}
    </FanArtDiv>
  );
};

export default FanArt;