import styled from "styled-components";
import { useState, useRef, useEffect, useCallback } from "react";
const MusicPhotoDiv = styled.div`
  background: #e8e8e8;
  border-radius: 20px;
  margin-top: 35px;
  padding: 10px;
  text-align: center;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;
const MusicPhotoFix = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;
const MusicPhotoText = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${props => props.$isDarkMode ? 'black' : 'black'};
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
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 285px;
    height: 356px;
  background: #fff;
  border-radius: 15px;
  padding-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;
const MusicImageContainer = styled.div`
  position: relative;
  width: 285px;
  height: 168px;
  border-radius: 15px 15px 0 0;
  background-color: #a5a5a5;
  overflow: hidden;
  flex-shrink: 0;
`;
const MusicImage = styled.img`
  width: 285px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const MusicText = styled.div`
  color: #333;
  text-align: center;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
  line-height: 1.4;
  box-sizing: border-box;
`;
const LoadMoreButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  font-family: var(--font-family);
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
  &:hover {
    background-color: #555;
  }
`;
const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  padding: 0 10px;
  box-sizing: border-box;
`;
const SeekBar = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #ccc;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  margin-bottom: 5px; 
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }
`;
const LoopButton = styled.button`
  background: orange;
  border: 1px solid #333;
  border-radius: 10px;
  color: ${props => props.$active ? "white" : "#333"};
  background-color: ${props => props.$active ? "#333" : "transparent"};
  font-size: 10px;
  padding: 4px 8px;
  cursor: pointer;
  align-self: center; 
  transition: all 0.2s;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.8;
  }
`;
const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
  padding: 0 10px;
`;
const ActionButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 11px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #e0e0e0;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  text-align: center;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
const ModalInfo = styled.div`
  margin-top: 15px;
  text-align: left;
`;
const ModalLink = styled.a`
  display: block;
  color: #007bff;
  margin-bottom: 15px;
  text-decoration: none;
  word-break: break-all;
  &:hover {
    text-decoration: underline;
  }
`;
const LyricsContainer = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  white-space: pre-line; 
  border: 1px solid #eee;
`;
const MusicCard = ({ cardData, onOpenModal, onTrackToggle, forcePause }) => {
  const { id, image, audio, text } = cardData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const showSeekBar = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(id);
  const hasAudio = !!audio;
  useEffect(() => {
    if (forcePause && isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [forcePause, isPlaying]);
  const handleImageClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onTrackToggle(id, false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onTrackToggle(id, true);
      }
    }
  };
  const handleAudioEnd = () => {
    if (!isLooping) {
      setIsPlaying(false);
      onTrackToggle(id, false);
    }
  };
  const onTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  const toggleLoop = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (audioRef.current) audioRef.current.loop = newLoopState;
  };
  const handleDownload = () => {
    const fileUrl = audio || image;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = audio ? `audio-${id}.mp3` : `image-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Друк - ${id}</title></head>
        <body style="text-align: center; font-family: sans-serif;">
          <img src="${image}" style="max-width: 100%; height: auto; border-radius: 15px;" />
          <p style="margin-top: 20px; font-size: 18px;">${text}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };
  return (
    <CardWrapper>
      <MusicImageContainer>
        <MusicImage src={image} alt="Music" onClick={handleImageClick} />
        {hasAudio && (
          <audio 
            ref={audioRef} 
            src={audio} 
            onEnded={handleAudioEnd}        
            onTimeUpdate={onTimeUpdate}          
            onLoadedMetadata={onLoadedMetadata}
            loop={isLooping} 
          />
        )}
      </MusicImageContainer>
      {hasAudio && (
        <ControlsContainer>
          {showSeekBar && (
            <SeekBar 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime} 
              onChange={handleSeek} 
            />
          )}
          <LoopButton $active={isLooping} onClick={toggleLoop}>
              {isLooping ? "Автоповтор увімкнено" : "Автоповтор вимкнено"}
          </LoopButton>
        </ControlsContainer>
      )}
      {text && <MusicText>{text}</MusicText>}
      <ActionButtonsContainer>
        <ActionButton onClick={handleDownload}>Скачати</ActionButton>
        <ActionButton onClick={handlePrint}>Роздрукувати</ActionButton>
        <ActionButton onClick={() => onOpenModal(cardData)}>Текст пісні</ActionButton>
      </ActionButtonsContainer>
    </CardWrapper>
  );
};
const MusicPhoto = () => {
  const [showAll, setShowAll] = useState(false);
  const [modalData, setModalData] = useState(null); 
  const [playingTracks, setPlayingTracks] = useState([]); 
  const musicCards = [
    {
      id: 1,
      image: require("../../photos/hero-header/hiils.jpg"),
      text: "Це тематична картинка в честь виходу гри, епічної новини, або свята, без музики(Поки). Тут зображене бажання побувати в горах.",
      originalLink: "https://example.com/original-source-1",
      lyrics: "Тут немає тексту."
    },
    {
      id: 2,
      image: require("../../photos/vip-images/vip-dinofroz.webp"),
      audio: require("../../mp3/dinofroz-mondo-tv.mp3"),
      text: "Легендарний мультфільм на малятко ТВ(нажаль закритий) розповідає про боротьбу з драконами(Імператор Ніцерон) Mondo TV - Динофроз.",
      originalLink: "https://example.com/dinofroz-original",
      lyrics: "Dinofroze...dinofroze. Четверо друзів знайшли дивну гру. В доісторичну пішли давнину. Там динозаврами мтали вони"
    },
    {
      id: 3, 
      image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
      audio: require("../../mp3/turkeys.mp3"), 
      text: "Насолоджуйтеся звуками індиків. Авторське спостереження.",
      lyrics: "Тут немає тексту. Лише звуки природи."
    },
    {
      id: 4, 
      image: require("../../photos/vip-images/vip-forest.webp"), 
      audio: require("../../mp3/thefatrat-monody.mp3"),
      text: "Цей казковий нічний ліс наповнений сакурами, казковим туманом, світлячками,але хащами, тернами та соснами. TheFatRat - Monody.",
      lyrics: "Текст пісні TheFatRat - Monody:\n\nSummer in the hills\nThose hazy days I do remember\nWe were running still\nHad the whole world at our feet..."
    },
    {
      id: 5, 
      image: require("../../photos/vip-images/vip-desert.webp"), 
      audio: require("../../mp3/wind.mp3"), 
      text: "Пустеля розділенна вічно грозовою і сонячною зоною, на скелі позначені різні тварини та локації, місце загадкове. Невідомий автор.",
      lyrics: "Тут немає тексту. Звуки вітру."
    },
    {
      id: 6, 
      image: require("../../photos/vip-images/fire.jpg"), 
      audio: require("../../mp3/wind.mp3"), 
      text: "Виверження вулкана є небезпечною подією, хоча про синю лаву так не скажеш. Співзвучить з музикою динофроз. Мій друг прислав це з інстаграму",
      lyrics: "Текст відсутній."
    },
    {
      id: 7, 
      image: require("../../photos/vip-images/horror.jpg"), 
      audio: require("../../mp3/horror.mp3"), 
      text: "Ви дивилися моторошне кіно...",
      lyrics: "Текст відсутній. Атмосферні звуки."
    },
    {
      id: 8, 
      image: require("../../photos/vip-images/horse.jpg"), 
      audio: require("../../mp3/horse.mp3"),
      text: "Кінь друг людини. Можете послухати цю мужню тварину, обирайте наш сайт. Телеканал мега(автор звуку).", 
      lyrics: "Тут немає тексту."
    },
    {
      id: 9, 
      image: require("../../photos/vip-images/vip-lebid.jpg"), 
      audio: require("../../mp3/lebid.mp3"),
      text: "Лебеді символ кохання...", 
      lyrics: "Текст відсутній."
    },
    {
      id: 10, 
      image: require("../../photos/vip-images/vip-dragons.jpg"), 
      audio: require("../../mp3/dragon.mp3"),
      text: "І знову дракони, для дослідників це хороше джерело звуку, а для нас ще одна мелодія. Картина взята з мультфільму Динофроз.", 
      lyrics: "Тут немає тексту."
    },
    {
      id: 11, 
      image: require("../../photos/vip-images/vip-soloveyko.jpg"), 
      audio: require("../../mp3/soloveyko.mp3"),
      text: "Голосування хто кращий по звукам індик, соловейко чи лебеді. Зроблено за ідеї сім'ї(без поради тут було б щось інше).", 
      lyrics: "Тут немає тексту. Спів соловейка."
    },
    {
      id: 12, 
      image: require("../../photos/vip-images/vip-rooster.jpg"), 
      audio: require("../../mp3/rooster.mp3"),
      text: "Одвічна боротьба, добро-зло...",
      lyrics: "Текст відсутній."
    },
  ];

  const handleTrackToggle = useCallback((id, startPlaying) => {
    setPlayingTracks(prev => {
      if (startPlaying) {
        const newQueue = [...prev, id];
        if (newQueue.length > 2) {
          return newQueue.slice(1);
        }
        return newQueue;
      } else {
        return prev.filter(trackId => trackId !== id);
      }
    });
  }, []);
  const visibleCards = !showAll ? musicCards.slice(0, 8) : musicCards;
  return (
    <MusicPhotoDiv>
      <MusicPhotoText>
        Натисніть на картинку і насолоджуйтеся музикою
      </MusicPhotoText>
      <MusicPhotoFix>
        {visibleCards.map((card) => (
          <MusicCard
            key={card.id}
            cardData={card}
            onOpenModal={setModalData}
            onTrackToggle={handleTrackToggle}
            forcePause={!playingTracks.includes(card.id)}
          />
        ))}
      </MusicPhotoFix>
      
      {!showAll && musicCards.length > 8 && (
        <LoadMoreButton onClick={() => setShowAll(true)}>
          Завантажити ще
        </LoadMoreButton>
      )}
      {modalData && (
        <ModalOverlay onClick={() => setModalData(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setModalData(null)}>&times;</CloseButton>
            <MusicImageContainer style={{ margin: '0 auto' }}>
              <MusicImage src={modalData.image} alt="Modal Music" />
            </MusicImageContainer>
            {modalData.audio && (
              <audio src={modalData.audio} controls style={{ width: '100%', marginTop: '15px' }} />
            )}
            <ModalInfo>
              <p><strong>Оригінальне джерело:</strong></p>
              {modalData.originalLink ? (
                <ModalLink href={modalData.originalLink} target="_blank" rel="noopener noreferrer">
                  {modalData.originalLink}
                </ModalLink>
              ) : (
                <p>Посилання не вказано</p>
              )}
              <p><strong>Текст:</strong></p>
              <LyricsContainer>
                {modalData.lyrics ? modalData.lyrics : "Текст для цієї композиції ще не додано."}
              </LyricsContainer>
            </ModalInfo>
          </ModalContent>
        </ModalOverlay>
      )}
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;