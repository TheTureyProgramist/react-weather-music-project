import styled from 'styled-components';
import { useState, useRef } from 'react';

const MusicPhotoDiv = styled.div`
  background: #e8e8e8;
  border-radius: 20px;
  margin-top: 80px;
  padding: 20px;
  text-align: center;
`;

const MusicPhotoFix = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MusicPhotoText = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  margin-bottom: 80px;
      @media (min-width: 768px) {
    font-size: 20px;
  }
    @media (min-width: 1200px) {
    font-size: 40px;
  } 
`;

const MusicImageContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 280px;
  height: 168px;
  border-radius: 15px;
  background-color: #a5a5a5;
  overflow: hidden;
`;

const MusicImage = styled.img`
  width: 280px;
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

const MusicCard = ({ image, audio, id }) => {
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
    <MusicImageContainer>
      <MusicImage src={image} alt="Music" onClick={handleImageClick} />
      <audio ref={audioRef} src={audio} onEnded={handleAudioEnd} />
    </MusicImageContainer>
  );
};

const MusicPhoto = () => {
  const musicCards = [
    {
      id: 1,
      image: require('../../photos/vip-images/vip-dinofroz.webp'),
      audio: require('../../mp3/dinofroz-mondo-tv.mp3'),
    },
    {
      id: 2,
      image: require('../../photos/vip-images/ultra-vip-turkeys.webp'),
      audio: require('../../mp3/turkeys.mp3'),
    },
    {
      id: 3,
      image: require('../../photos/vip-images/vip-forest.webp'),
      audio: require('../../mp3/thefatrat-monody.mp3'),
    },
    {
      id: 4,
      image: require('../../photos/vip-images/vip-desert.webp'),
      audio: require('../../mp3/wind.mp3'),
    },
  ];

  return (
    <MusicPhotoDiv>
      <MusicPhotoText>Натисніть на картинку і насолоджуйтеся музикою</MusicPhotoText>
      <MusicPhotoFix>
        {musicCards.map((card) => (
          <MusicCard
            key={card.id}
            id={card.id}
            image={card.image}
            audio={card.audio}
          />
        ))}
      </MusicPhotoFix>
    </MusicPhotoDiv>
  );
};

export default MusicPhoto;
