import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";

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

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  margin-bottom: 30px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
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
    orange ${(props) => (props.value * 100) || 0}%,
    #ccc ${(props) => (props.value * 100) || 0}%,
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
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out forwards;
`;

const ModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  max-width: 310px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out forwards;
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
  onTrackToggle,
  forcePause,
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

  useEffect(() => {
    if (forcePause && isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [forcePause, isPlaying]);

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
    audioEl.addEventListener('progress', updateBuffered);
    audioEl.addEventListener('loadedmetadata', updateBuffered);
    return () => {
      audioEl.removeEventListener('progress', updateBuffered);
      audioEl.removeEventListener('loadedmetadata', updateBuffered);
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
          title={isFavorite ? "Прибрати з улюблених" : "Додати в улюблені (ліміт 3)"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </HeartButton>
        <MusicImage src={image} alt="Music" onClick={togglePlayPause} />
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
                <span style={{ color: '#aaa', marginLeft: 4 }} title="Завантажено">({formatTime(bufferedTime)})</span>
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
            <span className="icon" title="Швидкість">⚡</span>
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
        </ControlsContainer>
      )}
      
      {text && <MusicText title={text}>{text}</MusicText>}
      
      <ActionButtonsContainer>
        <ActionButton title="Скачати пісню" onClick={handleDownload}>⇩</ActionButton>
        <ActionButton title="Роздрукувати фан-арт" onClick={handlePrint}>⎙</ActionButton>
        <ActionButton title="Текст пісні" onClick={() => onOpenModal(cardData)}>✎</ActionButton>
      </ActionButtonsContainer>
    </CardWrapper>
  );
};

const musicCards = [
  {
    id: 1,
    image: require("../../photos/vip-images/christmas.jpg"),
    audio: require("../../mp3/kolada.mp3"),
    text: "'Україна колядує'. Озвучка І. Федишин.",
    lyrics: "Текст відсутній.",
  },
  {
    id: 2,
    image: require("../../photos/vip-images/vip-dinofroz.webp"),
    audio: require("../../mp3/dinofroz.mp3"),
    text: "Легендарний мультфільм на малятко ТВ(нажаль закритий) Mondo TV - Динофроз. Зображено Імператора дрaконів Ніцерона.",
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
    lyrics:
      "Текст трохи  змінено для рими: Літо в пагорбах. Ті туманні дні у мене в спогадах. Ми все ще бігали. Весь світ був біля наших ніг. Бачачи зміни сезону. Наші дороги були вкриті пригодами. Гори на шляху. Від моря не могли втримати нас. Ось ми стоїмо з розпростертими обіймами. Це наш дім. Завжди сильні у світі, який ми створили. Я все ще чую тебе у вітрі. Бачу твої тіні на деревах. Тримаючись, спогади ніколи не змінюються.",
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
    text: "І знову дракони, музика доісторичного світу. Картина взята з мультфільму Динофроз, а музика з гри (My Little Universe-Drаgonora). Звучить при комбінації.",
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
    audio: require("../../mp3/dizel.mp3"),
    text: "Пісня під питанням, бо на російській мові. Але вона, без політики + комедійна про Саню та Віку.",
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
  {
    id: 14,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "Зоотрополіс(Disney)-рекомендую. Shakira-Try Everything.",
    lyrics: "",
  },
  {
    id: 15,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "Продовження історої зоотрополісу(Disney). Чекатиму, через 5років продовження. Skakira, Ed Sheeran - Zoo.",
    lyrics: "",
  },
  {
    id: 16,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "Мія та я. Не пожалкуєте.",
    lyrics: "Мія та я. Не пожалкуєте",
  },
  {
    id: 17,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "My little universe. Спокійна і прекрасна музика в механічному стилі.",
    lyrics:
      "Динофроз, показували, з кількома, ще мульфільмами: Якарі, Анна з зелених дахів, Хайді, Острів іпаток, Пригоди в качиному порту, Марко, Лис Микита. Пісні розміщені в 3 частинах. Четверта під питанням.",
  },
  {
    id: 18,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "My little universe. Спокійна і прекрасна музика в механічному стилі.",
    lyrics: "Текст відсутній.",
  },
  {
    id: 19,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "My little universe. Спокійна і прекрасна музика в механічному стилі.",
    lyrics: "Текст відсутній.",
  },
  {
    id: 20,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "GeometryDash(MDK-Fingerdash) Гаряча мелодія I-ша в режимі анімованості. Ласково просимо в хаос!",
    lyrics: "Текст відсутній.",
  },
    {
    id: 21,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "GeometryDash(DJ-Nate - Theory of everything II). Ця пісня варта уваги!",
    lyrics: "Текст відсутній.",
  },  {
    id: 22,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    text: "GeometryDash(F-777 - Deadlocked). Моторошна, але епічна пісня. Друг фанат цього рівня :).",
    lyrics: "Текст відсутній.",
  },  
];
const MusicPhoto = ({ user, onOpenRegister }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [modalData, setModalData] = useState(null);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setModalData(null);
      setIsClosing(false);
    }, 500);
  };
  
  const processedCards = useMemo(() => {
    let filtered = musicCards.filter((card) =>
      card.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return [...filtered].sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [searchQuery, favorites]);

  const handleTrackToggle = useCallback((id, startPlaying) => {
    setPlayingTracks((prev) =>
      startPlaying ? [...prev, id].slice(-2) : prev.filter((t) => t !== id),
    );
  }, []);

  return (
    <MusicPhotoDiv>
      <MusicPhotoText>Насолоджуйтеся музикою</MusicPhotoText>

      <SearchInput
        type="text"
        placeholder="Пошук пісні за описом..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
     <MusicPhotoFix>
  {processedCards.slice(0, visibleCount).map((card) => (
    <MusicCard
      key={card.id}
      cardData={card}
      user={user}
      isFavorite={favorites.includes(card.id)}
      onToggleFavorite={handleToggleFavorite}
      onOpenModal={setModalData}
      onOpenRegister={onOpenRegister}
      onTrackToggle={handleTrackToggle}
      forcePause={!playingTracks.includes(card.id)}
    />
  ))}
</MusicPhotoFix>
      {visibleCount < processedCards.length && (
  <LoadMoreButton onClick={() => {
    if (visibleCount === 8) {
      setVisibleCount(16);
    } else {
      setVisibleCount(processedCards.length);
    }
  }}>
    {visibleCount === 8 ?  "︾" :  "︾"}
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