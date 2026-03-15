import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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

const FanArtCard = styled(motion.div)`
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

const SearchStatusText = styled.p`
  color: ${props => (props.$isDarkMode ? "#ccc" : "#555")};
  margin-top: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  background: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #ffb36c;
  }
`;

const SearchButton = styled(ActionButton)`
  padding: 10px 40px;
  width: auto;
`;

const SearchResultsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const SearchResultItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.1);
  }
`;

const FanArt = ({ isDarkMode, user, onOpenRegister }) => {
  const [customImages, setCustomImages] = useState(() => {
    try {
      const saved = localStorage.getItem('fanart_custom_images');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse custom images from localStorage", error);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchPage, setSearchPage] = useState(1);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

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

  // Combine static and custom images
  const combinedImages = [...allImagesData, ...customImages];

  useEffect(() => {
    localStorage.setItem('fanart_custom_images', JSON.stringify(customImages));
  }, [customImages]);

  const [playlistTick, setPlaylistTick] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const playlists = [
    "ваші картинки",
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

  useEffect(() => {
    const cooldownEndTime = localStorage.getItem('fanart_cooldown_end');
    if (cooldownEndTime) {
      const remainingTime = cooldownEndTime - Date.now();
      if (remainingTime > 0) {
        setIsCooldown(true);
        setCooldownTime(Math.ceil(remainingTime / 1000));
      } else {
        localStorage.removeItem('fanart_cooldown_end');
      }
    }
  }, []);

  useEffect(() => {
    if (!isCooldown) return;

    let timer;
    if (cooldownTime > 0) {
      timer = setTimeout(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
    } else {
      setIsCooldown(false);
      localStorage.removeItem('fanart_cooldown_end');
    }

    return () => clearTimeout(timer);
  }, [isCooldown, cooldownTime]);

  const startCooldown = () => {
    const endTime = Date.now() + 40 * 1000;
    localStorage.setItem('fanart_cooldown_end', endTime);
    setIsCooldown(true);
    setCooldownTime(40);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchStatus('loading');
    setSearchResults([]);
    try {
      const API_KEY = "50977795-feb18de71b048a02e0c824e54";
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo&per_page=12&lang=ru&page=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        setSearchResults(data.hits);
        setSearchPage(1);
        setSearchStatus('idle');
      } else {
        setSearchStatus('no-results');
      }
    } catch (error) {
      console.error("Error searching Pixabay:", error);
      setSearchStatus('error');
    } finally {
      startCooldown();
    }
  };

  const handleLoadMore = async () => {
    if (!searchQuery.trim() || isCooldown) return;

    setSearchStatus('loading');
    const nextPage = searchPage + 1;

    try {
      const API_KEY = "50977795-feb18de71b048a02e0c824e54";
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo&per_page=12&lang=ru&page=${nextPage}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        setSearchResults(prev => [...prev, ...data.hits]);
        setSearchPage(nextPage);
        setSearchStatus('idle');
      } else {
        alert("Більше зображень не знайдено.");
        setSearchStatus('idle');
      }
    } catch (error) {
      console.error("Error loading more from Pixabay:", error);
      setSearchStatus('error');
    } finally {
      startCooldown();
    }
  };

  const handleAddCustomImage = (hit) => {
    if (customImages.length >= 3) {
      alert("Можна додати не більше 3 картинок.");
      return;
    }
    if (customImages.some(img => img.id === hit.id)) {
      alert("Це зображення вже додано.");
      return;
    }
    const newImage = {
      id: hit.id,
      src: hit.webformatURL,
      largeSrc: hit.largeImageURL,
      category: "ваші картинки",
    };
    setCustomImages([...customImages, newImage]);
  };

  const openPlaylistModal = (category) => {
    setSelectedPlaylist(category);
  };

  const closePlaylistModal = () => {
    setSelectedPlaylist(null);
  };

  const handleRemoveCustomImage = (idToRemove) => {
    setCustomImages(prev => prev.filter(img => img.id !== idToRemove));
  };

  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>Плейлисти фан-артів(натисніть на список, отриматийте базу картин і скачуйте, друкуйте їх)</FanArtTitle>
      <PlaylistContainer>
        {playlists.map((category) => {
          const catImages = combinedImages.filter(
            (img) => img.category === category
          );
          if (catImages.length === 0 && category !== "ваші картинки") return null; 
          const displayImages = catImages.length > 0 ? catImages : [{ src: monody, category: "ваші картинки" }];
          
          return (
            <PlaylistItem
              key={category}
              onClick={() => openPlaylistModal(category)}
            >
              <PlaylistImageWrapper>
                {displayImages.map((img, index) => {
                  const isActive = index === playlistTick % displayImages.length;
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

            {selectedPlaylist === "ваші картинки" && (
              <SearchContainer>
                 <p style={{color: isDarkMode ? "#ccc" : "#555", marginBottom: "10px"}}>
                   Знайдіть та додайте до 3-х власних зображень (Pixabay API)
                 </p>
                <SearchInput 
                  $isDarkMode={isDarkMode}
                  type="text" 
                  placeholder="Пошук зображень. Англійською вводьте." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <SearchButton type="button" onClick={handleSearch} disabled={isCooldown}>
                  {isCooldown ? `Зачекайте ${cooldownTime}с` : 'Знайти'}
                </SearchButton>
                
                {searchStatus === 'loading' && <SearchStatusText $isDarkMode={isDarkMode}>Завантаження...</SearchStatusText>}
                {searchStatus === 'no-results' && <SearchStatusText $isDarkMode={isDarkMode}>Зображень за вашим запитом не знайдено.</SearchStatusText>}
                {searchStatus === 'error' && <SearchStatusText $isDarkMode={isDarkMode}>Помилка пошуку. Спробуйте пізніше.</SearchStatusText>}

                {searchResults.length > 0 && (
                  <SearchButton type="button" onClick={handleLoadMore} disabled={isCooldown} style={{marginTop: '10px'}}>
                    {isCooldown ? `Зачекайте ${cooldownTime}с` : 'Завантажити ще'}
                  </SearchButton>
                )}

                {searchResults.length > 0 && (
                   <SearchResultsGrid>
                     {searchResults.map((hit) => (
                       <SearchResultItem key={hit.id} onClick={() => handleAddCustomImage(hit)}>
                          <BenefitImage 
                            src={hit.previewURL} 
                            alt={hit.tags} 
                            style={{width: '100px', height: '100px'}}
                          />
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0, 
                            background: 'rgba(0,0,0,0.6)', color: '#fff', 
                            fontSize: '10px', textAlign: 'center', padding: '2px'
                          }}>+ Додати</div>
                       </SearchResultItem>
                     ))}
                   </SearchResultsGrid>
                )}
              </SearchContainer>
            )}

            <FanBlock>
              <AnimatePresence>
                {combinedImages
                  .filter((img) => img.category === selectedPlaylist)
                  .map((imgData) => (
                    <FanArtCard
                      key={imgData.id || imgData.src}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, y: 50 }}
                      transition={{ duration: 0.3 }}
                    >
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
                        {selectedPlaylist === "ваші картинки" && (
                          <ActionButton
                            onClick={() => handleRemoveCustomImage(imgData.id)}
                            title="Видалити"
                            style={{ background: '#ff6961' }}
                          >
                            🗑️
                          </ActionButton>
                        )}
                      </ActionButtonsContainer>
                    </FanArtCard>
                  ))}
              </AnimatePresence>
            </FanBlock>
          </ModalContent>
        </ModalOverlay>
      )}
    </FanArtDiv>
  );
};

export default FanArt;