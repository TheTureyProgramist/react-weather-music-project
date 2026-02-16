import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect, useCallback } from "react";

const slideIn = keyframes`
  0% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
  100% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
`;

const slideOut = keyframes`
  0% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
  100% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
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
  color: black;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
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
  cursor: pointer;
  margin-top: 20px;
`;
const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 5px;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
    fill: #333;
    transition: fill 0.2s;
  }

  &:hover svg {
    fill: orange;
  }
`;

const TimeDisplay = styled.span`
  font-size: 10px;
  color: #555;
  font-family: monospace;
  white-space: nowrap;
  min-width: 65px;
  text-align: right;
`;

const SeekBar = styled.input`
  flex-grow: 1; 
  height: 4px;
  -webkit-appearance: none;
  background: #ccc;
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #333;
  }
`;
const LoopButton = styled.button`
  background: orange;
  border: 1px solid #333;
  border-radius: 10px;
  color: ${(props) => (props.$active ? "white" : "#333")};
  background-color: ${(props) => (props.$active ? "#333" : "transparent")};
  font-size: 10px;
  padding: 4px 8px;
  cursor: pointer;
  align-self: center;
  margin-bottom: 10px;
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
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out
    forwards;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 550px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #ffb36c;
  }
`;
const LyricsContainer = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e0e0e0;
  text-align: left;
  color: #333;
  max-height: 300px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;
const MusicCard = ({
  cardData,
  onOpenModal,
  onTrackToggle,
  forcePause,
  userAge,
  user,
  onOpenRegister,
}) => {
  const { id, image, audio, text } = cardData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  useEffect(() => {
    if (forcePause && isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [forcePause, isPlaying]);
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const togglePlayPause = () => {
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
  const handleDownload = () => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const a = document.createElement("a");
    a.href = audio || image;
    a.download = "file";
    a.click();
  };
  const handlePrint = () => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align:center;"><img src="${image}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };
  return (
    <CardWrapper>
      <MusicImageContainer>
        <MusicImage src={image} alt="Music" />
        {audio && (
          <audio
            ref={audioRef}
            src={audio}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            loop={isLooping}
          />
        )}
      </MusicImageContainer>
      {audio && (
        <ControlsContainer>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(id) && (
            <PlayerRow>
              <PlayButton onClick={togglePlayPause}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </PlayButton>
              <SeekBar
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) =>
                  (audioRef.current.currentTime = e.target.value)
                }
              />

              <TimeDisplay>
                {formatTime(currentTime)} / {formatTime(duration)}
              </TimeDisplay>
            </PlayerRow>
          )}
          <LoopButton
            $active={isLooping}
            onClick={() => setIsLooping(!isLooping)}
          >
            {isLooping ? "Автоповтор увімкнено" : "Автоповтор вимкнено"}
          </LoopButton>
        </ControlsContainer>
      )}
      {text && <MusicText>{text}</MusicText>}
      <ActionButtonsContainer>
        <ActionButton onClick={handleDownload}>Скачати</ActionButton>
        <ActionButton onClick={handlePrint}>Роздрукувати</ActionButton>
        <ActionButton onClick={() => onOpenModal(cardData)}>
          Текст пісні
        </ActionButton>
      </ActionButtonsContainer>
    </CardWrapper>
  );
};
const MusicPhoto = ({ user, onOpenRegister }) => {
  const [showAll, setShowAll] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const calculateUserAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };
  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setModalData(null);
      setIsClosing(false);
    }, 500);
  };
  const userAge = calculateUserAge(user?.birthDate);
  const musicCards = [
    {
      id: 1,
      image: require("../../photos/vip-images/christmas.jpg"),
      text: "Колядка невизначена. Планую вставити 'Свята ніч'. Озвучка І. Федишин.",
      lyrics: "Текст відсутній.",
    },
    {
      id: 2,
      image: require("../../photos/vip-images/vip-dinofroz.webp"),
      audio: require("../../mp3/dinofroz-mondo-tv.mp3"),
      text: "Легендарний мультфільм на малятко ТВ(нажаль закритий) Mondo TV - Динофроз. Зображено Імператора дрконів Ніцерона.",
      lyrics:
        "Dinofroze...dinofroze. Четверо друзів знайшли дивну гру. В доісторичну пішли давнину. Там динозаврами стали вони. В цьому карти їм допомогли. У давнині небезпечні дракони. Та з ними впорались наші герої. До бою готові всюди і завжди. І утілюють мірії свої в боротьбі. Dinofroze... Дружні, завзяті, зброя в руках. Dinofroze... Вони Ніцерону не по зубах. Dinofroze... Дружні, завзяті, зброя в руках. Вони Ніцерону не по зубах. Друзі б'ються завзято. Дракони тікають. Четверо друзів майбутнє спасають. До бою завжди готові вони. Ховайтеся, вороги! Dinofroze...",
    },
    {
      id: 3,
      image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
      audio: require("../../mp3/turkeys.mp3"),
      text: "Насолоджуйтеся звуками індиків. Авторське спостереження.",
      lyrics: "Лише звуки природи.",
    },
    {
      id: 4,
      image: require("../../photos/vip-images/vip-forest.webp"),
      audio: require("../../mp3/thefatrat-monody.mp3"),
      text: "Цей казковий нічний ліс наповнений сакурами. TheFatRat - Monody.",
      lyrics: "Summer in the hills...",
    },
    {
      id: 5,
      image: require("../../photos/vip-images/vip-desert.webp"),
      audio: require("../../mp3/wind.mp3"),
      text: "Пустеля розділенна вічно грозовою і сонячною зоною. Невідомий автор. ",
      lyrics: "Звуки дощу, допомагають заснути",
    },
    {
      id: 6,
      image: require("../../photos/vip-images/horror.jpg"),
      audio: require("../../mp3/horror.mp3"),
      text: "Ви дивилися моторошне кіно...",
      lyrics: "Атмосферні звуки. Хто може страшніше зробити чекаю)",
    },
    {
      id: 7,
      image: require("../../photos/vip-images/horse.jpg"),
      audio: require("../../mp3/horse.mp3"),
      text: "Кінь друг людини. Телеканал мега(автор звуку).",
      lyrics: "Тут немає тексту.",
    },
    {
      id: 8,
      image: require("../../photos/vip-images/flame.jpg"),
      audio: require("../../mp3/darkness-and--flame.mp3"),
      text: "Епічна гра головоломка від 5-bn games 4 частини доступно - чекаємо на 5-ту.",
      lyrics: "Текст відсутній.",
    },
    {
      id: 9,
      image: require("../../photos/vip-images/vip-dragons.jpg"),
      audio: require("../../mp3/dragon.mp3"),
      text: "І знову дракони, музика доісторичного світу. Картина взята з мультфільму Динофроз, а музика з гри (My Little Universe-Drаgonora)",
      lyrics: "Тут немає тексту.",
    },
    {
      id: 10,
      image: require("../../photos/vip-images/vip-soloveyko.jpg"),
      audio: require("../../mp3/soloveyko.mp3"),
      text: "Голосування хто кращий по звукам соловеко чи індик. Зроблено за ідеї сім'ї.",
      lyrics: "Спів соловейка.",
    },
    {
      id: 11,
      image: require("../../photos/vip-images/dizel.webp"),
      text: "Пісня не визначена. Планую вставити '.....................'.",
      lyrics: "Текст відсутній.",
    },
    {
      id: 12,
      image: require("../../photos/vip-images/asium.jpg"),
      audio: require("../../mp3/harmonic-japan.mp3"),
      text: "My little universe. Спокійна і прекрасна музика в японському стилі.",
      lyrics: "Текст відсутній.",
    },
    {
      id: 13,
      image: require("../../photos/vip-images/mechannic.jpg"),
      audio: require("../../mp3/mechanik-kindom.mp3"),
      text: "My little universe. Спокійна і прекрасна музика в механічному стилі.",
      lyrics: "Текст відсутній.",
    },
  ];

  const handleTrackToggle = useCallback((id, startPlaying) => {
    setPlayingTracks((prev) =>
      startPlaying ? [...prev, id].slice(-2) : prev.filter((t) => t !== id),
    );
  }, []);

  return (
    <MusicPhotoDiv>
      <MusicPhotoText>
        Натисніть на картинку і насолоджуйтеся музикою
      </MusicPhotoText>
      <MusicPhotoFix>
        {(showAll ? musicCards : musicCards.slice(0, 8)).map((card) => (
          <MusicCard
            key={card.id}
            cardData={card}
            userAge={userAge}
            user={user}
            onOpenModal={setModalData}
            onOpenRegister={onOpenRegister}
            onTrackToggle={handleTrackToggle}
            forcePause={!playingTracks.includes(card.id)}
          />
        ))}
      </MusicPhotoFix>
      {!showAll && (
        <LoadMoreButton onClick={() => setShowAll(true)}>
          Завантажити ще
        </LoadMoreButton>
      )}
      {modalData && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModal}>
          <ModalContent
            $isClosing={isClosing}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <img
              src={modalData.image}
              style={{
                width: "100%",
                borderRadius: "15px",
                marginBottom: "15px",
              }}
              alt="Music"
            />
            <h4
              style={{
                textAlign: "center",
                color: "#333",
                marginBottom: "10px",
                marginTop: 0,
              }}
            >
              Текст пісні:
            </h4>
            <LyricsContainer>{modalData.lyrics}</LyricsContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;
