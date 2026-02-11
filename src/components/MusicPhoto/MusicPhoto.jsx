import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
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
`;
const MusicImageContainer = styled.div`
  position: relative;
  width: 285px;
  height: 168px;
  border-radius: 15px;
  background-color: #a5a5a5;
  overflow: hidden;
  flex-shrink: 0;
`;
const MusicImage = styled.img`
  width: 285px;
  height: auto;
  border-radius: 15px;
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
  font-size: 9px;
  font-weight: 500;
  width: 100%;
  margin-top: 10px;
  line-height: 1.4;
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
  padding: 0 5px;
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
  margin-bottom: 5px; &::-webkit-slider-thumb {
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
  &:hover {
    opacity: 0.8;
  }
`;
const MusicCard = ({ image, audio, id, text }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const showSeekBar = [1, 3, 6].includes(id);
  const hasAudio = !!audio;
  const handleImageClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  const handleAudioEnd = () => {
    if (!isLooping) {
      setIsPlaying(false);
    }
  };
  const onTimeUpdate = () => {
    if (audioRef.current) { setCurrentTime(audioRef.current.currentTime);
    }
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) { setDuration(audioRef.current.duration);
    }
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
    if (audioRef.current) {
      audioRef.current.loop = newLoopState;
    }
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
             {isLooping ? "Автоповтор увімкнутий" : "Автоповтор вимкнений"}
          </LoopButton>
        </ControlsContainer>
      )}
      {text && <MusicText>{text}</MusicText>}
    </CardWrapper>
  );
};
const MusicPhoto = () => {
  const musicCards = [
    {
      id: 1,
      image: require("../../photos/vip-images/vip-dinofroz.webp"),
      audio: require("../../mp3/dinofroz-mondo-tv.mp3"),
      text: "Легендарний мультфільм на малятко ТВ(нажаль закритий) розповідає про боротьбу з драконами(Імператор Ніцерон) Mondo TV - Динофроз.",
    },
    {
      id: 2,
      image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
      audio: require("../../mp3/turkeys.mp3"),
      text: "Насолоджуйтеся звуками індиків, їхніх бундючих характерів, насолождуйтеся дитинства моментів. Авторське спостереження - звуки самців.",
    },
    {
      id: 3,
      image: require("../../photos/vip-images/vip-forest.webp"),
      audio: require("../../mp3/thefatrat-monody.mp3"),
      text: "Цей казковий нічний ліс наповнений сакурами, казковим туманом, світлячками,але хащами, тернами та соснами. TheFatRat - Monody.",
    },
    {
      id: 4,
      image: require("../../photos/vip-images/vip-desert.webp"),
      audio: require("../../mp3/wind.mp3"),
      text: "Пустеля розділенна вічно грозовою і сонячною зоною, на скелі позначені різні тварини та локації, місце загадкове. Невідомий автор - звуки пустелі.",
    },
    {
      id: 5,
      image: require("../../photos/vip-images/fire.jpg"),
      audio: require("../../mp3/wind.mp3"),
      text: "Виверження вулкана є небезпечною подією, хоча про синю лаву так не скажеш. Співзвучить з музикою динофроз(Дракони жили у вулкані). Мій друг прислав це з інстаграму.",
    },
    {
      id: 6,
      image: require("../../photos/vip-images/horror.jpg"),
      audio: require("../../mp3/horror.mp3"),
      text: "Ви дивилися моторошне кіно. І засинаєте. Прокинувись ви опиняєтеся в зруйнованому будинку. І чуєте моторошні звуки. В дім щось зайшло, ви тікаєте і це щось переслідує і ловить вас. Ніхто не знає де ви, і не дізнається. Склеювання кількох звукозаписів.",
    },
    {
      id: 7,
      image: require("../../photos/vip-images/horse.jpg"),
      audio: require("../../mp3/horse.mp3"),
      text: "Кінь друг людини(козаків, татаринів та армій). Можете послухати цю мужню тварину, обирайте наш сайт. Телеканал мега(автор звуку).",
    },
    {
      id: 8,
      image: require("../../photos/vip-images/vip-lebid.jpg"),
      audio: require("../../mp3/lebid.mp3"),
      text: "Лебеді символ кохання, на день Святого Валентика послуйте цю мелодію. Амурна стріла буде сильнішою. ",
    },
    {
      id: 9,
      image: require("../../photos/vip-images/vip-dragons.jpg"),
      audio: require("../../mp3/dragon.mp3"),
text: "І знову дракони, для дослідників це хороше джерело звуку, а для нас ще одна мелодія. Картина взята з мультфільму Динофроз.",
    },
    {
      id: 10,
      image: require("../../photos/vip-images/vip-soloveyko.jpg"),
      audio: require("../../mp3/soloveyko.mp3"),
      text: "Голосування хто кращий по звукам індик, соловейко чи лебеді. Зроблено за ідеї сім'ї(без поради тут було б щось інше).",
    },
    {
      id: 11,
      image: require("../../photos/vip-images/vip-rooster.jpg"),
      audio: require("../../mp3/rooster.mp3"),
      text: "Одвічна боротьба, добро-зло, коти та миші, проте індик-півень, це страшніше ніж Усик-Ф'юрі, ці бої у книжках конкурують з Доном Кіхoтом.",
    },
    {
      id: 12,
      image: require("../../photos/hero-header/hiils.jpg"),
      text: "Це тематична картинка в честь виходу гри, епічної новини, або свята, без музики(Поки). Тут зображене бажання побувати в горах.",
    },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {  setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const visibleCards = (isMobile && !showAll) ? musicCards.slice(0, 6) : musicCards;
  return (
    <MusicPhotoDiv>
      <MusicPhotoText>
        Натисніть на картинку і насолоджуйтеся музикою
      </MusicPhotoText>
      <MusicPhotoFix>
        {visibleCards.map((card) => (
          <MusicCard
            key={card.id}
            id={card.id}
            image={card.image}
            audio={card.audio}
            text={card.text}
          />
        ))}
      </MusicPhotoFix>
      {isMobile && !showAll && (
        <LoadMoreButton onClick={() => setShowAll(true)}>
          Завантажити ще
        </LoadMoreButton>
      )}
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;