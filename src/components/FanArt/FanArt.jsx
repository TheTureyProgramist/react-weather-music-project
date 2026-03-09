import React, { useState, useEffect } from "react";
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
  font-size: 10px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  margin-bottom: 35px;
  @media (min-width: 768px) {
    font-size: 15px;
    margin-bottom: 50px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
    margin-bottom: 80px;
  }
  @media (min-width: 1920px) {
    font-size: 25px;
    margin-bottom: 100px;
  }
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  width: 100%;
`;

const PlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const PlaylistImageWrapper = styled.div`
  position: relative;
  width: 312px;
  height: 208px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  @media (min-width: 768px) {
    
  }
`;

const PlaylistImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const PlaylistText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  text-transform: capitalize;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 30px;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  cursor: pointer;
  &:hover {
    color: #ffb36c;
  }
`;

const ModalTitle = styled.h2`
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
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
  padding: 8px 60px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  &:hover {
    background: #ffa04d;
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
    { src: dizel, category: "мультиплікація" },
    { src: turkeys, category: "тварини" },
    { src: nicerone, category: "мультиплікація" },
  ];

  const [playlistTick, setPlaylistTick] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const playlists = [
    "ікони",
    "хоррор",
    "мультиплікація",
    "давні часи",
    "тварини",
    "природа",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaylistTick((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const openPlaylistModal = (category) => {
    setSelectedPlaylist(category);
  };

  const closePlaylistModal = () => {
    setSelectedPlaylist(null);
  };

  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>Плейлисти фан-артів(натисніть на список, отриматийте базу картин і скачуйте, друкуйте їх)</FanArtTitle>
      <PlaylistContainer>
        {playlists.map((category) => {
          const catImages = allImagesData.filter(
            (img) => img.category === category
          );
          if (catImages.length === 0) return null; 
          
          return (
            <PlaylistItem
              key={category}
              onClick={() => openPlaylistModal(category)}
            >
              <PlaylistImageWrapper>
                {catImages.map((img, index) => {
                  const isActive = index === playlistTick % catImages.length;
                  return (
                    <PlaylistImage
                      key={index}
                      src={img.src}
                      alt={category}
                      $isActive={isActive}
                    />
                  );
                })}
              </PlaylistImageWrapper>
              <PlaylistText $isDarkMode={isDarkMode}>{category}</PlaylistText>
            </PlaylistItem>
          );
        })}
      </PlaylistContainer>

      {selectedPlaylist && (
        <ModalOverlay onClick={closePlaylistModal}>
          <ModalContent
            $isDarkMode={isDarkMode}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton $isDarkMode={isDarkMode} onClick={closePlaylistModal}>
              &times;
            </CloseButton>
            <ModalTitle $isDarkMode={isDarkMode}>
              Плейлист: {selectedPlaylist}
            </ModalTitle>
            <FanBlock>
              {allImagesData
                .filter((img) => img.category === selectedPlaylist)
                .map((imgData, index) => (
                  <FanArtCard key={index}>
                    <BenefitImage
                      src={imgData.src}
                      alt={`Fan art - ${imgData.category}`}
                    />
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
          </ModalContent>
        </ModalOverlay>
      )}
    </FanArtDiv>
  );
};

export default FanArt;