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
import christmas from "../../photos/vip-images/christmas.jpg";
import horror from "../../photos/vip-images/horror.jpg";
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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid #ffb36c;
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) =>
    props.$active ? "black" : props.$isDarkMode ? "white" : "black"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #ffa04d;
    color: black;
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

const FanArtCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
`;

const BenefitImage = styled.img`
  width: 140px;
  border-radius: 15px;
  object-fit: cover;
  height: auto;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
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

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const ActionButton = styled.button`
  background: #ffb36c;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  &:hover {
    background: #ffa04d;
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
  transition:
    background 0.2s,
    transform 0.2s;

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
  const allImagesData = [
    { src: turkeys, category: "тварини" },
    { src: nicerone, category: "мультиплікація" },
    { src: dragons, category: "давні часи" },
    { src: horse, category: "тварини" },
    { src: lebid, category: "тварини" },
    { src: monody, category: "природа" },
    { src: rooster, category: "тварини" },
    { src: soloveyko, category: "тварини" },
    { src: volcano, category: "природа" },
    { src: christmas, category: "ікони" },
    { src: horror, category: "хоррор" },
    { src: flame, category: "природа" },
    { src: dizel, category: "ікони" },
    { src: turkeys, category: "тварини" },
    { src: nicerone, category: "мультиплікація" },
  ];

  const [visibleCount, setVisibleCount] = useState(10);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    "all",
    "ікони",
    "хоррор",
    "мультиплікація",
    "давні часи",
    "тварини",
    "природа",
  ];

  const filteredImages =
    activeCategory === "all"
      ? allImagesData
      : allImagesData.filter((img) => img.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(10); // Скидаємо кількість видимих при зміні категорії
  };

  const showMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleDownload = (imgSrc) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = "fanart.jpg";
    a.click();
  };

  const handlePrint = (imgSrc) => {
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
        Фан-арти
      </FanArtTitle>

      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category}
            $active={activeCategory === category}
            $isDarkMode={isDarkMode}
            onClick={() => handleCategoryChange(category)}
          >
            {category === "all"
              ? "Всі"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>

      <FanBlock>
        {filteredImages.slice(0, visibleCount).map((imgData, index) => (
          <FanArtCard key={index}>
            <BenefitImage src={imgData.src} alt={`Fan art - ${imgData.category}`} />
            <ActionButtonsContainer>
              <ActionButton
                onClick={() => handleDownload(imgData.src)}
                title="Скачати"
              >
                ⇩
              </ActionButton>
              <ActionButton
                onClick={() => handlePrint(imgData.src)}
                title="Роздрукувати"
              >
                ⎙
              </ActionButton>
            </ActionButtonsContainer>
          </FanArtCard>
        ))}
      </FanBlock>
      {visibleCount < filteredImages.length && (
        <LoadMoreButton onClick={showMoreImages}>Показати ще</LoadMoreButton>
      )}
    </FanArtDiv>
  );
};

export default FanArt;
   
   
