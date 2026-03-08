import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect, useMemo } from "react";

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
  padding: 5px;
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
  gap: 9px;
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
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
  padding: 0 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;

const SortSelect = styled.select`
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 16px;
  font-family: var(--font-family);
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;

const PlayAllButton = styled.button`
  background: orange;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
  &:hover {
    background: #e69500;
    transform: scale(1.05);
  }
`;

const ShuffleButton = styled.button`
  background: ${(props) => (props.$active ? "orange" : "white")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: 2px solid ${(props) => (props.$active ? "orange" : "#ccc")};
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: ${(props) => (props.$active ? "#e69500" : "#f0f0f0")};
    border-color: ${(props) => (props.$active ? "#e69500" : "#bbb")};
    transform: scale(1.05);
  }
`;

const PlaylistGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const PlaylistCard = styled.div`
  width: 250px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlaylistImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const PlaylistTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 288px;
  height: 400px;
  background: #fff;
  border-radius: 15px;
  padding-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  border: ${(props) => (props.$isFavorite ? "2px solid orange" : "none")};
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
  width: 280px;
  height: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 20px;
  color: ${(props) => (props.$active ? "red" : "#ccc")};
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
    background: white;
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
  height: 68px;
  overflow: hidden;
  box-sizing: border-box;
`;

const LoadMoreButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 110px;
  font-size: 19px;
  cursor: pointer;
  margin-top: 15px;
`;

const ControlsContainerPlayer = styled.div`
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
  gap: 1px;
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
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => (props.value / props.max) * 100 || 0}%,
    #ccc ${(props) => (props.value / props.max) * 100 || 0}%,
    #ccc 100%
  );
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

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 5px;
  span {
    font-size: 10px;
    color: #777;
    display: inline-block;
  }
  .icon {
    min-width: 15px;
  }
  .value {
    min-width: 28px;
    text-align: right;
    font-weight: bold;
  }
`;

const VolumeSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => props.value * 100 || 0}%,
    #ccc ${(props) => props.value * 100 || 0}%,
    #ccc 100%
  );
  border-radius: 2px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }
`;

const SpeedSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => ((props.value - 0.2) / 2.0) * 100 || 0}%,
    #ccc ${(props) => ((props.value - 0.2) / 2.0) * 100 || 0}%,
    #ccc 100%
  );
  border-radius: 2px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
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
  margin-bottom: 5px;
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
  width: 80px;
  padding: 5px 30px;
  font-size: 19px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out
    forwards;
`;

const LyricsModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  max-width: 310px;
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

const PlaylistModalContent = styled.div`
  background: #e8e8e8;
  padding: 20px;
  border-radius: 15px;
  width: 95%;
  max-width: 1300px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #dcdcdc;
  }
`;

const LyricsCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #ffb36c;
  }
`;

const PlaylistCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  z-index: 10;
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
`;

const MusicCard = ({
  cardData,
  onOpenModal,
  activeTrackId,
  onPlay,
  onTrackEnd,
  user,
  onOpenRegister,
  isFavorite,
  onToggleFavorite,
}) => {
  const { id, image, audio, text } = cardData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [bufferedTime, setBufferedTime] = useState(0);

  const isCurrentTrack = activeTrackId === id;

  useEffect(() => {
    if (isCurrentTrack) {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((e) => {
              console.error("Playback failed", e);
              setIsPlaying(false);
              onPlay(null);
            });
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isCurrentTrack, onPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const updateBuffered = () => {
      if (audioEl.buffered.length > 0) {
        setBufferedTime(audioEl.buffered.end(audioEl.buffered.length - 1));
      }
    };
    audioEl.addEventListener("progress", updateBuffered);
    audioEl.addEventListener("loadedmetadata", updateBuffered);
    return () => {
      audioEl.removeEventListener("progress", updateBuffered);
      audioEl.removeEventListener("loadedmetadata", updateBuffered);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isCurrentTrack) {
        onPlay(null);
      } else {
        onPlay(id);
      }
    }
  };

  const handleImageClick = (e) => {
    if (!audioRef.current) {
      return;
    }
    if (!isPlaying) {
      onPlay(id);
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10,
      );
    } else {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 10,
      );
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
  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 1);
    }
  };

  return (
    <CardWrapper $isFavorite={isFavorite}>
      <MusicImageContainer>
        <HeartButton
          $active={isFavorite}
          onClick={() => onToggleFavorite(id)}
          title={
            isFavorite ? "Прибрати з улюблених" : "Додати в улюблені (ліміт 3)"
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </HeartButton>
        <MusicImage src={image} alt="Music" onClick={handleImageClick} />
        {audio && (
          <audio
            ref={audioRef}
            src={audio}
            onEnded={() => {
              setIsPlaying(false);
              onTrackEnd(id);
            }}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            loop={isLooping}
          />
        )}
      </MusicImageContainer>

      {audio && (
        <ControlsContainerPlayer>
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
              onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            />
            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
              {bufferedTime > currentTime && (
                <span
                  style={{ color: "#aaa", marginLeft: 4 }}
                  title="Завантажено"
                >
                  ({formatTime(bufferedTime)})
                </span>
              )}
            </TimeDisplay>
          </PlayerRow>
          <SliderRow>
            <span
              className="icon"
              title={volume === 0 ? "Увімкнути звук" : "Вимкнути звук"}
              onClick={toggleMute}
              style={{ cursor: "pointer" }}
            >
              {volume === 0 ? "🔇" : "🔈"}
            </span>
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                const newVol = parseFloat(e.target.value);
                setVolume(newVol);
                if (newVol > 0) setPrevVolume(newVol);
              }}
            />
            <span className="value">{Math.round(volume * 100)}%</span>
          </SliderRow>
          <SliderRow>
            <span className="icon" title="Швидкість">
              ⚡
            </span>
            <SpeedSlider
              type="range"
              min="0.2"
              max="2.2"
              step="0.1"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            />
            <span className="value">{playbackRate.toFixed(1)}x</span>
          </SliderRow>

          <LoopButton
            $active={isLooping}
            onClick={() => setIsLooping(!isLooping)}
          >
            {isLooping ? "Автоповтор увімкнено" : "Автоповтор вимкнено"}
          </LoopButton>
        </ControlsContainerPlayer>
      )}

      {text && <MusicText title={text}>{text}</MusicText>}

      <ActionButtonsContainer>
        <ActionButton title="Скачати пісню" onClick={handleDownload}>
          ⇩
        </ActionButton>
        <ActionButton title="Роздрукувати фан-арт" onClick={handlePrint}>
          ⎙
        </ActionButton>
        <ActionButton title="Текст пісні" onClick={() => onOpenModal(cardData)}>
          ✎
        </ActionButton>
      </ActionButtonsContainer>
    </CardWrapper>
  );
};

const musicCards = [
  {
    id: 1,
    image: require("../../photos/vip-images/christmas.jpg"),
    audio: require("../../mp3/kolada.mp3"),
    text: "'Україна колядує'. Озвучка І. Федишин. Хіт.",
    lyrics: "Текст відсутній.",
    category: "хіти",
    duration: 180,
  },
  {
    id: 2,
    image: require("../../photos/vip-images/vip-dinofroz.webp"),
    audio: require("../../mp3/dinofroz.mp3"),
    category: "мультфільми",
    text: "Легендарний мультфільм на малятко ТВ(нажаль закритий) Mondo TV - Динофроз. Зображено Імператора дрaконів Ніцерона. Мультфільми.",
    lyrics:
      "Dinofroze...dinofroze. Четверо друзів знайшли дивну гру. В доісторичну пішли давнину. Там динозаврами стали вони. В цьому карти їм допомогли. У давнині небезпечні дракони. Та з ними впорались наші герої. До бою готові всюди і завжди. І утілюють мірії свої в боротьбі. Dinofroze... Дружні, завзяті, зброя в руках. Dinofroze... Вони Ніцерону не по зубах. Dinofroze... Дружні, завзяті, зброя в руках. Вони Ніцерону не по зубах. Друзі б'ються завзято. Дракони тікають. Четверо друзів майбутнє спасають. До бою завжди готові вони. Ховайтеся, вороги! Dinofroze...",
    duration: 120,
  },
  {
    id: 3,
    image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
    audio: require("../../mp3/turkeys.mp3"),
    text: "Насолоджуйтеся звуками індиків. Авторське спостереження. Природа",
    category: "природа",
    lyrics: "Лише звуки природи.",
    duration: 60,
  },
  {
    id: 4,
    image: require("../../photos/vip-images/vip-forest.webp"),
    category: "хіти",
    audio: require("../../mp3/thefatrat-monody.mp3"),
    text: "Цей казковий нічний ліс наповнений сакурами. TheFatRat - Monody. Хіт.",
    lyrics:
      "Текст трохи  змінено для рими: Літо в пагорбах. Ті туманні дні у мене в спогадах. Ми все ще бігали. Весь світ був біля наших ніг. Бачачи зміни сезону. Наші дороги були вкриті пригодами. Гори на шляху. Від моря не могли втримати нас. Ось ми стоїмо з розпростертими обіймами. Це наш дім. Завжди сильні у світі, який ми створили. Я все ще чую тебе у вітрі. Бачу твої тіні на деревах. Тримаючись, спогади ніколи не змінюються.",
    duration: 240,
  },
  {
    id: 5,
    image: require("../../photos/vip-images/vip-desert.webp"),
    audio: require("../../mp3/wind.mp3"),
    category: "природа",
    text: "Пустеля розділенна вічно грозовою і сонячною зоною. Невідомий автор. Природа.",
    lyrics: "Звуки дощу, допомагають заснути",
    duration: 300,
  },
  {
    id: 6,
    image: require("../../photos/vip-images/horror.jpg"),
    audio: require("../../mp3/horror.mp3"),
    category: "хоррор",
    text: "Ви дивилися моторошне кіно... Хоррор.",
    lyrics: "Атмосферні звуки. Хто може страшніше зробити чекаю)",
    duration: 150,
  },
  {
    id: 7,
    image: require("../../photos/vip-images/horse.jpg"),
    audio: require("../../mp3/horse.mp3"),
    category: "природа",
    text: "Кінь друг людини. Телеканал мега(автор звуку). Природа.",
    lyrics: "Тут немає тексту.",
    duration: 45,
  },
  {
    id: 8,
    image: require("../../photos/vip-images/vip-dragons.jpg"),
    audio: require("../../mp3/dragon.mp3"),
    category: "ігри",
    text: "І знову дракони, музика доісторичного світу. Картина взята з мультфільму Динофроз, а музика з гри (My Little Universe-Drаgonora). Звучить при комбінації. Ігри.",
    lyrics: "Тут немає тексту.",
    duration: 180,
  },
  {
    id: 9,
    image: require("../../photos/vip-images/vip-soloveyko.jpg"),
    audio: require("../../mp3/soloveyko.mp3"),
    category: "природа",
    text: "Голосування хто кращий по звукам соловеко чи індик. Зроблено за ідеї сім'ї. Природа.",
    lyrics: "Спів соловейка.",
    duration: 90,
  },
  {
    id: 10,
    image: require("../../photos/vip-images/asium.jpg"),
    audio: require("../../mp3/harmonic-japan.mp3"),
    category: "ігри",
    text: "My little universe. Спокійна і прекрасна музика в японському стилі. Гра.",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 11,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    category: "ігри",
    text: "My little universe. Спокійна і прекрасна музика в механічному стилі. Гра.",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 12,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/zootopia.mp3"),
    category: "мультфільми",
    text: "Зоотрополіс(Disney)-рекомендую. Shakira-Try Everything. Мультфільм.",
    lyrics: "",
    duration: 200,
  },
  {
    id: 13,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    category: "мультфільми",
    text: "Продовження історої Зоотрополісу(Disney). Чекатиму, через 5років продовження. Skakira, Ed Sheeran - Zoo. Мультфільм.",
    lyrics: "../../mp3/zootopiatwo.mp3",
    duration: 200,
  },
  {
    id: 14,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mia-and-me.mp3"),
    category: "мультфільми",
    text: "Мія та я. Не пожалкуєте. Мультфільми.",
    lyrics: "Мія та я. Не пожалкуєте",
    duration: 180,
  },
  {
    id: 15,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    category: "мультфільми",
    text: "Динофроз, показували, з кількома, ще мульфільмами: Якарі, Анна з зелених дахів, Хайді, Острів іпаток, Пригоди в качиному порту, Марко, Лис Микита. Пісні розміщені в 3 частинах. Четверта під питанням. Мультфільми.",
    lyrics: "malatkotv-chapterone.mp3",
    duration: 180,
  },
  {
    id: 16,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/electrodynamix.mp3"),
    text: "Dj-Nate (Electrodynamix). Гра",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 17,
    image: require("../../photos/fan-art/clubstep.jpg"),
    audio: require("../../mp3/clubstep.mp3"),
    text: "Dj-Nate (Clubstep). Гра.",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 18,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/fingerdash.mp3"),
    text: "GeometryDash(MDK-Fingerdash) Гаряча мелодія I-ша в режимі анімованості. Ласково просимо в хаос! Гра.",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
  {
    id: 19,
    image: require("../../photos/fan-art/theorytwo.jpg"),
    audio: require("../../mp3/theoty-of-everything-ll.mp3"),
    text: "GeometryDash(DJ-Nate - Theory of everything II). Ця пісня варта уваги! Гра.",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
  {
    id: 20,
    image: require("../../photos/fan-art/deadlocked.jpg"),
    audio: require("../../mp3/deadlocked.mp3"),
    text: "GeometryDash(F-777 - Deadlocked). Моторошна, але епічна пісня. Друг фанат цього рівня :). Гра.",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
    {
    id: 21,
    image: require("../../photos/fan-art/theory.jpg"),
    audio: require("../../mp3/theory-of-everyting.mp3"),
    text: "GeometryDash(DJ-Nate - Theory of everything). Ця пісня варта уваги! Гра.",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
];

const PLAYLISTS = {
  хіти: {
    title: "Хіти",
    image: require("../../photos/vip-images/vip-forest.webp"),
  },
  мультфільми: {
    title: "Мультфільми",
    image: require("../../photos/vip-images/vip-dinofroz.webp"),
  },
  природа: {
    title: "Природа",
    image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
  },
  хоррор: {
    title: "Хоррор",
    image: require("../../photos/vip-images/horror.jpg"),
  },
  ігри: {
    title: "Ігри",
    image: require("../../photos/vip-images/mechannic.jpg"),
  },
};

const PlaylistModal = ({ playlistKey, onClose, user, onOpenRegister }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [lyricsModalData, setLyricsModalData] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLyricsClosing, setIsLyricsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("favorites");
  const [isShuffle, setIsShuffle] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("music_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("music_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      if (prev.length >= 3) {
        alert("Можна додати не більше 3-х улюблених пісень!");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCloseLyricsModal = (e) => {
    if (e) e.stopPropagation();
    setIsLyricsClosing(true);
    setTimeout(() => {
      setLyricsModalData(null);
      setIsLyricsClosing(false);
    }, 500);
  };

  const processedCards = useMemo(() => {
    let filtered = musicCards.filter(
      (card) =>
        card.category === playlistKey &&
        card.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOption === "favorites") {
      return [...filtered].sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });
    } else if (sortOption === "name") {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOption === "duration") {
      return [...filtered].sort(
        (a, b) => (a.duration || 0) - (b.duration || 0),
      );
    }
    return filtered;
  }, [playlistKey, searchQuery, favorites, sortOption]);

  const handleTrackEnd = (id) => {
    if (isShuffle) {
      const remaining = processedCards.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        setActiveTrackId(remaining[randomIndex].id);
      } else {
        setActiveTrackId(null);
      }
      return;
    }
    const currentIndex = processedCards.findIndex((c) => c.id === id);
    if (currentIndex !== -1 && currentIndex < processedCards.length - 1) {
      setActiveTrackId(processedCards[currentIndex + 1].id);
    } else {
      setActiveTrackId(null);
    }
  };

  const handlePlayAll = () => {
    if (processedCards.length > 0) {
      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * processedCards.length);
        setActiveTrackId(processedCards[randomIndex].id);
      } else {
        setActiveTrackId(processedCards[0].id);
      }
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <PlaylistModalContent
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <PlaylistCloseButton onClick={handleClose}>&times;</PlaylistCloseButton>
        <h2 style={{ textAlign: "center", color: "#333" }}>
          {PLAYLISTS[playlistKey].title}
        </h2>
        <ControlsContainer>
          <SearchInput
            type="text"
            placeholder="Пошук пісні за описом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="favorites">Улюблені</option>
            <option value="name">Назва</option>
            <option value="duration">Тривалість</option>
          </SortSelect>
          <ShuffleButton
            $active={isShuffle}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Випадковий порядок"
          >
            🔀
          </ShuffleButton>
          <PlayAllButton onClick={handlePlayAll}>Грати все</PlayAllButton>
        </ControlsContainer>

        <MusicPhotoFix>
          {processedCards.slice(0, visibleCount).map((card) => (
            <MusicCard
              key={card.id}
              cardData={card}
              user={user}
              isFavorite={favorites.includes(card.id)}
              onToggleFavorite={handleToggleFavorite}
              onOpenModal={setLyricsModalData}
              onOpenRegister={onOpenRegister}
              activeTrackId={activeTrackId}
              onPlay={setActiveTrackId}
              onTrackEnd={handleTrackEnd}
            />
          ))}
        </MusicPhotoFix>

        {visibleCount < processedCards.length && (
          <LoadMoreButton
            onClick={() => {
              if (visibleCount === 8) {
                setVisibleCount(16);
              } else {
                setVisibleCount(processedCards.length);
              }
            }}
          >
            {visibleCount === 8 ? "︾" : "︾"}
          </LoadMoreButton>
        )}

        {lyricsModalData && (
          <ModalOverlay
            $isClosing={isLyricsClosing}
            onClick={handleCloseLyricsModal}
          >
            <LyricsModalContent
              $isClosing={isLyricsClosing}
              onClick={(e) => e.stopPropagation()}
            >
              <LyricsCloseButton onClick={handleCloseLyricsModal}>
                &times;
              </LyricsCloseButton>
              <img
                src={lyricsModalData.image}
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
              <LyricsContainer>{lyricsModalData.lyrics}</LyricsContainer>
            </LyricsModalContent>
          </ModalOverlay>
        )}
      </PlaylistModalContent>
    </ModalOverlay>
  );
};

const MusicPhoto = ({ user, onOpenRegister }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const handleClosePlaylist = () => {
    setCurrentPlaylist(null);
  };
  return (
    <MusicPhotoDiv>
      <MusicPhotoText>Оберіть плейлист</MusicPhotoText>
      <PlaylistGrid>
        {Object.keys(PLAYLISTS).map((key) => (
          <PlaylistCard key={key} onClick={() => setCurrentPlaylist(key)}>
            <PlaylistImage
              src={PLAYLISTS[key].image}
              alt={PLAYLISTS[key].title}
            />
            <PlaylistTitle>{PLAYLISTS[key].title}</PlaylistTitle>
          </PlaylistCard>
        ))}
      </PlaylistGrid>

      {currentPlaylist && (
        <PlaylistModal
          playlistKey={currentPlaylist}
          onClose={handleClosePlaylist}
          user={user}
          onOpenRegister={onOpenRegister}
        />
      )}
    </MusicPhotoDiv>
  );
};

export default MusicPhoto;
//           />
//         ))}
//       </MusicPhotoFix>
//       {visibleCount < processedCards.length && (
//         <LoadMoreButton
//           onClick={() => {
//             if (visibleCount === 8) {
//               setVisibleCount(16);
//             } else {
//               setVisibleCount(processedCards.length);
//             }
//           }}
//         >
//           {visibleCount === 8 ? "︾" : "︾"}
//         </LoadMoreButton>
//       )}
//       {modalData && (
//         <ModalOverlay $isClosing={isClosing} onClick={handleCloseModal}>
//           <ModalContent
//             $isClosing={isClosing}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
//             <img
//               src={modalData.image}
//               style={{
//                 width: "100%",
//                 borderRadius: "15px",
//                 marginBottom: "15px",
//               }}
//               alt="Music"
//             />
//             <h4
//               style={{
//                 textAlign: "center",
//                 color: "#333",
//                 marginBottom: "10px",
//                 marginTop: 0,
//               }}
//             >
//               Текст пісні:
//             </h4>
//             <LyricsContainer>{modalData.lyrics}</LyricsContainer>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </MusicPhotoDiv>
//   );
// };

// export default MusicPhoto;
