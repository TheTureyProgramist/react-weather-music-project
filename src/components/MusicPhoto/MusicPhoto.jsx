import styled from "styled-components";
import { useState, useRef } from "react";
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
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
  @media (min-width: 768px) {
  }
`;
const MusicCard = ({ image, audio, id, text }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleImageClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };
  return (
    <CardWrapper>
      <MusicImageContainer>
        <MusicImage src={image} alt="Music" onClick={handleImageClick} />
        <audio ref={audioRef} src={audio} onEnded={handleAudioEnd} />
      </MusicImageContainer>
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
      text: "Цей казковий нічний ліс наповнений сакурами, казковим туманом, світлячками,але хащами, тернами та соснами. TheFatRat - Monody",
    },
    {
      id: 4,
      image: require("../../photos/vip-images/vip-desert.webp"),
      audio: require("../../mp3/wind.mp3"),
      text: "Пустеля розділенна вічно грозовою і сонячною зоною, на скелі позначені різні тварини та локації, місце загадкове. Невідомий автор - звуки пустелі",
    },
  ];
  return (
    <MusicPhotoDiv>
      <MusicPhotoText>
        Натисніть на картинку і насолоджуйтеся музикою
      </MusicPhotoText>
      <MusicPhotoFix>
        {musicCards.map((card) => (
          <MusicCard
            key={card.id}
            id={card.id}
            image={card.image}
            audio={card.audio}
            text={card.text}
          />
        ))}
      </MusicPhotoFix>
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;
