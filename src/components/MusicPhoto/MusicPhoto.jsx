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
  font-size: 21px;
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
  width: 320px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  background: #fff;
  display: flex;
  flex-direction: column;

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
  color: #333;
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
  width: 308px;
  height: 456px;
  background: #fff;
  border-radius: 15px;
  padding-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  border: ${(props) => (props.$isFavorite ? "2px solid orange" : "none")};
`;

const MusicImageContainer = styled.div`
  position: relative;
  width: 308px;
  height: 183px;
  border-radius: 15px 15px 0 0;
  background-color: #a5a5a5;
  overflow: hidden;
  flex-shrink: 0;
`;

const MusicImage = styled.img`
  width: 308px;
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
  color: ${(props) => (props.$isFavorite ? "red" : "#ccc")};
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
  height: 108px;
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
  gap: 0px;
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
  width: 21px;
  height: 21px;
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

const SeekButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  color: #333;
  padding: 0 5px;
  font-weight: bold;
  &:hover {
    color: orange;
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

const SeekAmountSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => ((props.value - 5) / 20) * 100 || 0}%,
    #ccc ${(props) => ((props.value - 5) / 20) * 100 || 0}%,
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
  margin-bottom: 5px;
`;

const OfflineButton = styled.button`
  background: transparent;
  border: 1px solid #333;
  border-radius: 10px;
  color: #333;
  font-size: 10px;
  padding: 4px 8px;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 5px;
  transition: all 0.2s;

  ${(props) =>
    props.$cached &&
    `
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
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
  width: 67px;
  padding: 5px 16px;
  font-size: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #e0e0e0;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #333;
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
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} forwards;
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
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)}
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
  padding: 10px;
  border-radius: 15px;
  width: 95%;
  max-width: 1800px;
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

const LyricsLine = styled.p`
  margin: 5px 0;
  transition: color 0.3s, font-weight 0.3s;
  color: ${props => props.$active ? 'orange' : '#333'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  label { font-weight: bold; font-size: 12px; color: black; }
  input { padding: 8px; border-radius: 5px; border: 1px solid #ccc; color: black;}
`;

const LyricsViewer = ({ lyrics, currentTime }) => {
  const activeLineIndex = useMemo(() => {
    if (!Array.isArray(lyrics)) return -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return -1;
  }, [lyrics, currentTime]);

  if (!Array.isArray(lyrics)) {
    return <>{lyrics || "Текст відсутній."}</>;
  }

return <div>{lyrics.map((line, index) => <LyricsLine key={index} $active={index === activeLineIndex}>{line.text}</LyricsLine>)}</div>;
};

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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [seekAmount, setSeekAmount] = useState(10);
  const [isCached, setIsCached] = useState(false);
  const [isCaching, setIsCaching] = useState(false);
  const [audioSrc, setAudioSrc] = useState(audio);
  const objectUrlRef = useRef(null);

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
      if (videoRef.current) videoRef.current.play().catch(e => console.log(e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      if (videoRef.current) videoRef.current.pause();
    }
  }, [isCurrentTrack, onPlay]);

  useEffect(() => {
    const checkCache = async () => {
      if (!window.caches || !audio) return;
      try {
        const cache = await caches.open("audio-cache");
        const response = await cache.match(audio);
        if (response) {
          const blob = await response.blob();
          objectUrlRef.current = URL.createObjectURL(blob);
          setAudioSrc(objectUrlRef.current);
          setIsCached(true);
        }
      } catch (e) {
        console.error("Cache check failed", e);
      }
    };
    checkCache();

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [audio]);

  const handleCacheAudio = async () => {
    if (!window.caches || !audio) {
      alert("Кешування не підтримується у вашому браузері або для цього треку.");
      return;
    }
    if (!user) {
      onOpenRegister();
      return;
    }

    const cache = await caches.open("audio-cache");

    if (isCached) {
      const confirmed = window.confirm(
        "Видалити пісню з кешу? Вона не буде доступна офлайн.",
      );
      if (confirmed) {
        await cache.delete(audio);
        setIsCached(false);
        setAudioSrc(audio);
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
      }
    } else {
      setIsCaching(true);
      try {
        await cache.add(audio);
        const response = await cache.match(audio);
        const blob = await response.blob();
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }
        objectUrlRef.current = URL.createObjectURL(blob);
        setAudioSrc(objectUrlRef.current);
        setIsCached(true);
      } catch (error) {
        console.error("Помилка кешування аудіо:", error);
        alert("Не вдалося закешувати пісню.");
      }
      setIsCaching(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
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

    let newTime;
    if (x < rect.width / 2) {
      newTime = Math.max(0, audioRef.current.currentTime - seekAmount);
    } else {
      newTime = Math.min(duration, audioRef.current.currentTime + seekAmount);
    }
    audioRef.current.currentTime = newTime;
    if(videoRef.current) videoRef.current.currentTime = newTime;
  };

  const handleDownloadAudio = () => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const a = document.createElement("a");
    a.href = audio;
    a.download = "audio.mp3";
    a.click();
  };

  const handleDownloadImage = () => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const a = document.createElement("a");
    a.href = image;
    a.download = "image.jpg";
    a.click();
  };
  const handlePrint = () => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
  `<html><head><title>Print Image</title></head><body style="text-align:center;"><img src="${image}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`
);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 1);
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - seekAmount);
      audioRef.current.currentTime = newTime;
      if (videoRef.current) videoRef.current.currentTime = newTime;
    }
  };

  const forward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + seekAmount);
      audioRef.current.currentTime = newTime;
      if (videoRef.current) videoRef.current.currentTime = newTime;
    }
  };

  return (
    <CardWrapper $isFavorite={isFavorite}>
      <MusicImageContainer>
        <HeartButton
           $isFavorite={isFavorite} 
          onClick={() => onToggleFavorite(id)}
          title={
            isFavorite ? "Прибрати з улюблених" : "Додати в улюблені (ліміт 3)"
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </HeartButton>
        {cardData.video && (
          <video
            ref={videoRef}
            src={cardData.video}
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px 15px 0 0",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isPlaying ? 1 : 0,
              zIndex: isPlaying ? 5 : 0,
              pointerEvents: "none",
            }}
          />
        )}
        <MusicImage src={image} alt="Music" onClick={handleImageClick} />
        {audio && (
          <audio
            ref={audioRef}
            src={audioSrc}
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
            <SeekButton onClick={rewind} title={`Назад с`}>-{seekAmount}s</SeekButton>
            <SeekBar
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                const val = e.target.value;
                audioRef.current.currentTime = val;
                if(videoRef.current) videoRef.current.currentTime = val;
              }}
            />
            <SeekButton onClick={forward} title={`Вперед с`}>+{seekAmount}s</SeekButton>
            <TimeDisplay>
              {formatTime(currentTime)}/{formatTime(duration)}
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

          <SliderRow>
            <span className="icon" title="Промотування">
              ⏭️
            </span>
            <SeekAmountSlider
              type="range"
              min="5"
              max="25"
              step="1"
              value={seekAmount}
              onChange={(e) => setSeekAmount(parseInt(e.target.value, 10))}
            />
            <span className="value">{seekAmount}с</span>
          </SliderRow>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <LoopButton
              $active={isLooping}
              onClick={() => setIsLooping(!isLooping)}
            >
              {isLooping ? "Автоповтор увімкнено" : "Автоповтор вимкнено"}
            </LoopButton>
            {audio && (
              <OfflineButton
                onClick={handleCacheAudio}
                disabled={isCaching}
                $cached={isCached}
                title={isCached ? "Видалити з кешу" : "Зберегти для офлайн"}
              >
                {isCaching ? "..." : isCached ? "✓ Офлайн" : "↓ Доступ без Wi-Fi"}
              </OfflineButton>
            )}
          </div>
        </ControlsContainerPlayer>
      )}

      {text && <MusicText title={text}>{text}</MusicText>}

      <ActionButtonsContainer>
        {audio && (
          <ActionButton title="Скачати пісню" onClick={handleDownloadAudio}>
            <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </ActionButton>
        )}
        <ActionButton title="Скачати зображення" onClick={handleDownloadImage}>
          <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        </ActionButton>
        <ActionButton title="Роздрукувати фан-арт" onClick={handlePrint}>
          <svg viewBox="0 0 24 24"><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h3v4h14v-4h3v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/></svg>
        </ActionButton>
        <ActionButton title="Текст пісні" onClick={() => onOpenModal({ ...cardData, audioRef })}>
          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
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
    text: "'Україна колядує'. Озвучка І. Федишин.",
    lyrics: "Текст в розробці.",
    category: "хіти",
    duration: 180,
  },
  {
    id: 2,
    image: require("../../photos/vip-images/vip-dinofroz.webp"),
    audio: require("../../mp3/dinofroz.mp3"),
    category: "мультфільми",
    text: "Динофроз - Mondo TV. Легендарний мультфільм на малятко ТВ(нажаль закритий). Зображено Імператора дрaконів Ніцерона.",
    lyrics:
      "Варіант 1. Варіант 2. Dinofroze...dinofroze. Четверо друзів знайшли дивну гру. В доісторичну пішли давнину. Там динозаврами стали вони. В цьому карти їм допомогли. У давнині небезпечні дракони. Та з ними впорались наші герої. До бою готові всюди і завжди. І утілюють мірії свої в боротьбі. Dinofroze... Дружні, завзяті, зброя в руках. Dinofroze... Вони Ніцерону не по зубах. Dinofroze... Дружні, завзяті, зброя в руках. Вони Ніцерону не по зубах. Друзі б'ються завзято. Дракони тікають. Четверо друзів майбутнє спасають. До бою завжди готові вони. Ховайтеся, вороги! Dinofroze...",
    duration: 120,
  },
  {
    id: 3,
    image: require("../../photos/vip-images/ultra-vip-turkeys.webp"),
    audio: require("../../mp3/turkeys.mp3"),
    text: "Індики. Насолоджуйтеся звуками індиків. Авторське спостереження.",
    category: "природа",
    lyrics: "Лише звуки індиків.",
    duration: 60,
  },
  {
    id: 4,
    image: require("../../photos/fan-art/monody.jpg"),
    category: "хіти",
    audio: require("../../mp3/thefatrat-monody.mp3"),
    text: "Monody -  TheFatRat.",
    lyrics: [
      { time: 23, text: "Літо в пагорбах." },
      { time: 26, text: "Ті туманні дні у мене в спогадах." },
      { time: 30, text: "Ми все ще бігали." },
      { time: 32, text: "Весь світ був біля наших ніг." },
      { time: 38, text: "Бачачи зміни сезону." },
      { time: 40, text: "Наші дороги були вкриті пригодами." },
      { time: 45, text: "Гори на шляху." },
      { time: 47, text: "Від моря не могли втримати нас." },
      { time: 52, text: "Ось ми стоїмо з розпростертими обіймами." },
      { time: 58, text: "Це наш дім." },
      { time: 60, text: "Завжди сильні у світі, який ми створили." },
      { time: 66, text: "Я все ще чую тебе у вітрі." },
      { time: 69, text: "Бачу твої тіні на деревах." },
      { time: 72, text: "Тримаючись, спогади ніколи не змінюються." },
    ],
    duration: 240,
  },
  {
    id: 5,
    image: require("../../photos/vip-images/vip-desert.webp"),
    audio: require("../../mp3/wind.mp3"),
    category: "природа",
    text: "Звук дощу. Пустеля розділенна вічно грозовою і сонячною зоною. Невідомий автор.",
    lyrics: "Звуки дощу, допомагають заснути",
    duration: 300,
  },
  {
    id: 6,
    image: require("../../photos/vip-images/horror.jpg"),
    audio: require("../../mp3/horror.mp3"),
    category: "хоррор",
    text: "Ви дивилися моторошне кіно... Хоррор.",
    lyrics: "Жах ночі. Атмосферні звуки. Хто може страшніше зробити чекаю :) З мене актор ніякий, для такого :).",
    duration: 150,
  },
  {
    id: 7,
    image: require("../../photos/vip-images/horse.jpg"),
    audio: require("../../mp3/horse.mp3"),
    category: "природа",
    text: "Кінь друг людини. Телеканал мега(автор звуку). Природа.",
    lyrics: "Звуки коня.",
    duration: 45,
  },
  {
    id: 8,
    image: require("../../photos/vip-images/vip-dragons.jpg"),
    audio: require("../../mp3/dragon.mp3"),
    category: "ігри",
    text: "Dragonora - MyLittleUniverse(Estoty). І знову дракони, музика доісторичного світу. Картина взята з мультфільму Динофроз. Звучить при комбінації.",
    lyrics: "Атмосферна доісторична музика.",
    duration: 180,
  },
  {
    id: 9,
    image: require("../../photos/vip-images/vip-soloveyko.jpg"),
    audio: require("../../mp3/soloveyko.mp3"),
    category: "природа",
    text: "Соловейко. Голосування хто кращий по звукам соловеко чи індик. Зроблено за ідеї сім'ї.",
    lyrics: "Спів соловейка.",
    duration: 90,
  },
  {
    id: 10,
    image: require("../../photos/vip-images/asium.jpg"),
    audio: require("../../mp3/harmonic-japan.mp3"),
    category: "ігри",
    text: "Asium - My little universe(Estoty). Спокійна і прекрасна музика в японському стилі.",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 11,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    category: "ігри",
    text: "Factorium - My little universe(Estoty). Спокійна і прекрасна музика в механічному стилі.",
    lyrics: "Текст відсутній, для любителів стімпанку.",
    duration: 160,
  },
  {
    id: 12,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/zootopia.mp3"),
    category: "мультфільми",
    text: "Зоотрополіс(Disney)-рекомендую. Shakira-Try Everything.",
    lyrics: "Текст в розробці",
    duration: 200,
  },
  {
    id: 13,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/zootopiatwo.mp3"),
    category: "мультфільми",
    text: "Продовження історої Зоотрополісу(Disney). Чекатиму, через 5років продовження. Skakira, Ed Sheeran - Zoo.",
    lyrics: "Текст в розробці.",
    duration: 200,
  },
  {
    id: 14,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mia-and-me.mp3"),
    category: "мультфільми",
    text: "Мія та я. Не пожалкуєте.",
    lyrics: "Текст в розробці.",
    duration: 180,
  },
  {
    id: 15,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chapterone.mp3"),
    category: "мультфільми",
    text: "Динофроз, показували, з кількома, ще мульфільмами: Якарі, Анна з зелених дахів, Хайді, Острів іпаток, Пригоди в качиному порту, Марко, Лис Микита.",
    lyrics: "Не скоро.",
    duration: 180,
  },
    {
    id: 16,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chaptertwo.mp3"),
    category: "мультфільми",
    text: "Друга частина. Пісні розміщені в 3 частинах. Четверта під питанням.",
    lyrics: "Не скоро.",
    duration: 180,
  },
    {
    id: 17,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chapterthree.mp3"),
    category: "мультфільми",
    text: "Третя частина",
    lyrics: "Не скоро.",
    duration: 180,
  },
  {
    id: 18,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/electrodynamix.mp3"),
    text: "Electrodynamix - DJ-Nate (GeometryDash).",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 160,
  },
  {
    id: 19,
    image: require("../../photos/fan-art/clubstep.jpg"),
    audio: require("../../mp3/clubstep.mp3"),
    text: "Clubstep - DJ-Nate(GeometryDash).",
    category: "ігри",
    lyrics: "Текст присутній, але його не можливо розібрати + змісту його немає.",
    duration: 160,
  },
  {
    id: 20,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/fingerdash.mp3"),
    text: "Fingerdash-MDK(GeometryDash) Гаряча мелодія I-ша в режимі анімованості. Ласково просимо в хаос!",
    category: "ігри",
    lyrics: "Текст присутній, але змісту його немає.",
    duration: 140,
  },
  {
    id: 21,
    image: require("../../photos/fan-art/theorytwo.jpg"),
    audio: require("../../mp3/theoty-of-everything-ll.mp3"),
    text: "Theory of everything II - DJ-Nate(GeometryDash). Ця пісня варта уваги!",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
  {
    id: 22,
    image: require("../../photos/fan-art/deadlocked.jpg"),
    audio: require("../../mp3/deadlocked.mp3"),
    text: "Deadlocked - F77(GeometryDash). Моторошна, але епічна пісня. Друг фанат цього рівня :).",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
  },
    {
    id: 23,
    image: require("../../photos/fan-art/theory.jpg"),
    audio: require("../../mp3/theory-of-everyting.mp3"),
    text: "DJ-Nate - Theory of everything(GeometryDash). Ця пісня варта уваги!",
    category: "ігри",
    lyrics: "Текст присутній, але він для атмосфери: 'Say Down' періодично з відлунням.",
    duration: 140,
  },
    {
    id: 24,
    image: require("../../photos/fan-art/unity.jpg"),
    audio: require("../../mp3/unity.mp3"),
    text: "Unity-TheFatRat. Класний комп'ютерний хіт, не розумію чого його не поставили у фільм Матриця?",
    lyrics: "Текст присутній, але змісту його немає.",
    category: "хіти",
    duration: 180,
  },
    {
    id: 25,
    image: require("../../photos/vip-images/vip-forest.webp"),
    audio: require("../../mp3/calling.mp3"),
    text: "TheCalling-TheFatRat. ",
    lyrics: "Скоро.",
    category: "хіти",
    duration: 180,
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

const CreatePlaylistModal = ({ onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [cover, setCover] = useState(initialData?.cover || "");
  const [tracks, setTracks] = useState(initialData?.tracks || []);
  const [error, setError] = useState("");

  const handleFile = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => callback(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleAudio = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      if (audio.duration > 120) {
        alert("Тривалість пісні не може перевищувати 2 хвилин!");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newTracks = [...tracks];
        newTracks[index].audio = ev.target.result;
        newTracks[index].duration = audio.duration;
        setTracks(newTracks);
      };
      reader.readAsDataURL(file);
    };
  };

  const updateTrack = (index, field, value) => {
    const newTracks = [...tracks];
    newTracks[index][field] = value;
    setTracks(newTracks);
  };

  const addTrack = () => {
    if (tracks.length >= 2) return;
    setTracks([...tracks, { id: Date.now(), text: "", audio: "", video: "", image: "", duration: 0 }]);
  };

  const removeTrack = (index) => {
    const newTracks = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
  };

  const handleSave = () => {
    if (name.length > 12) return setError("Назва плейлисту максимум 12 символів");
    if (!name) return setError("Введіть назву плейлисту");
    if (tracks.length === 0) return setError("Додайте хоча б одну пісню");
    if (tracks.some(t => !t.audio || !t.text)) return setError("Заповніть дані пісень");
    onSave({ name, cover, tracks });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <LyricsModalContent onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <h3 style={{color: 'black', textAlign: 'center'}}>Створити плейлист</h3>
        <InputGroup>
            <label>Назва (макс 12)</label>
            <input value={name} onChange={e => setName(e.target.value)} maxLength={12} />
        </InputGroup>
        <InputGroup>
            <label>Обкладинка плейлисту</label>
            <input type="file" accept="image/*" onChange={e => handleFile(e, setCover)} />
        </InputGroup>
        {cover && <img src={cover} alt="Cover" style={{width: 100, height: 100, objectFit: 'cover'}} />}
        
        <h4 style={{color: 'black', margin: '10px 0'}}>Пісні ({tracks.length}/2)</h4>
        {tracks.map((track, i) => (
            <div key={track.id} style={{background: '#f0f0f0', padding: 10, borderRadius: 5, marginBottom: 10}}>
                <InputGroup>
                    <label>Назва</label>
                    <input value={track.text} onChange={e => updateTrack(i, 'text', e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <label>Аудіо (макс 2хв)</label>
                    <input type="file" accept="audio/*" onChange={e => handleAudio(e, i)} />
                </InputGroup>
                <InputGroup>
                    <label>Відео (для програвання)</label>
                    <input type="file" accept="video/*" onChange={e => handleFile(e, (res) => updateTrack(i, 'video', res))} />
                </InputGroup>
                <InputGroup>
                    <label>Зображення пісні</label>
                    <input type="file" accept="image/*" onChange={e => handleFile(e, (res) => updateTrack(i, 'image', res))} />
                </InputGroup>
                <button onClick={() => removeTrack(i)} style={{background: 'red', color: 'white', border: 'none', borderRadius: 5, padding: 5}}>Видалити</button>
            </div>
        ))}
        {tracks.length < 2 && <button onClick={addTrack} style={{background: 'orange', color: 'white', border: 'none', borderRadius: 5, padding: '5px 10px', marginBottom: 10}}>+ Додати пісню</button>}
        
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div style={{display: 'flex', gap: 10, justifyContent: 'center'}}>
            <button onClick={handleSave} style={{background: 'green', color: 'white', border: 'none', borderRadius: 5, padding: '10px 20px'}}>Зберегти</button>
            <button onClick={onClose} style={{background: 'grey', color: 'white', border: 'none', borderRadius: 5, padding: '10px 20px'}}>Скасувати</button>
        </div>
      </LyricsModalContent>
    </ModalOverlay>
  );
};

const PlaylistModal = ({ playlistKey, onClose, user, onOpenRegister, customTracks }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [lyricsModalData, setLyricsModalData] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLyricsClosing, setIsLyricsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("favorites");
  const [isShuffle, setIsShuffle] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    if (!user) return [];
    const saved = localStorage.getItem("music_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("music_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    if (!user) {
      onOpenRegister();
      return;
    }
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

  const [lyricsCurrentTime, setLyricsCurrentTime] = useState(0);

  useEffect(() => {
    if (lyricsModalData && lyricsModalData.audioRef && lyricsModalData.audioRef.current) {
      const audioEl = lyricsModalData.audioRef.current;
      const handleTimeUpdate = () => {
        setLyricsCurrentTime(audioEl.currentTime);
      };
      audioEl.addEventListener('timeupdate', handleTimeUpdate);
      handleTimeUpdate(); // Set initial time
      return () => {
        if (audioEl) audioEl.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [lyricsModalData]);

  const processedCards = useMemo(() => {
    let filtered;
    if (playlistKey === 'custom' && customTracks) {
        filtered = customTracks.filter(card => card.text.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
        filtered = musicCards.filter(
          (card) =>
            card.category === playlistKey &&
            card.text.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }

    if (sortOption === "favorites") {
      return [...filtered].sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });
    } else if (sortOption === "name_asc") {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOption === "name_desc") {
      return [...filtered].sort((a, b) => b.text.localeCompare(a.text));
    } else if (sortOption === "duration_asc") {
      return [...filtered].sort((a, b) => (a.duration || 0) - (b.duration || 0));
    } else if (sortOption === "duration_desc") {
      return [...filtered].sort((a, b) => (b.duration || 0) - (a.duration || 0));
    }
    return filtered;
  }, [playlistKey, searchQuery, favorites, sortOption, customTracks]);

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

  const playlistTitle = playlistKey === 'custom' ? 'Мій Плейлист' : PLAYLISTS[playlistKey].title;

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <PlaylistModalContent
        $isClosing={isClosing} onClick={(e) => e.stopPropagation()}
      >
        <PlaylistCloseButton onClick={handleClose}>&times;</PlaylistCloseButton>
        <h2 style={{ textAlign: "center", color: "#333" }}>
          {playlistTitle}
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
            <option value="name_asc">Назва (А-Я)</option>
            <option value="name_desc">Назва (Я-А)</option>
            <option value="duration_asc">Тривалість (мін-макс)</option>
            <option value="duration_desc">Тривалість (макс-мін)</option>
          </SortSelect>
          <ShuffleButton
            $active={isShuffle} onClick={() => setIsShuffle(!isShuffle)}
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
            $isClosing={isLyricsClosing} onClick={handleCloseLyricsModal}
          >
            <LyricsModalContent
              $isClosing={isLyricsClosing} onClick={handleCloseLyricsModal}
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
              <LyricsContainer>
                <LyricsViewer lyrics={lyricsModalData.lyrics} currentTime={lyricsCurrentTime} />
              </LyricsContainer>
            </LyricsModalContent>
          </ModalOverlay>
        )}
      </PlaylistModalContent>
    </ModalOverlay>
  );
};

const PlaylistCover = ({ playlistKey, defaultImage, customImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => {
    if (playlistKey === 'custom') {
        return [customImage || defaultImage];
    }
    const cards = musicCards.filter((c) => c.category === playlistKey);
    return cards.length > 0 ? cards.map((c) => c.image) : [defaultImage];
  }, [playlistKey, defaultImage, customImage]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ position: "relative", width: "100%", height: "150px" }}>
      {images.map((src, index) => (
        <PlaylistImage
          key={index}
          src={src}
          alt={playlistKey}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

const MusicPhoto = ({ user, onOpenRegister }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customPlaylist, setCustomPlaylist] = useState(() => {
    const saved = localStorage.getItem("custom_playlist");
    return saved ? JSON.parse(saved) : null;
  });

  const handleClosePlaylist = () => {
    setCurrentPlaylist(null);
  };

  const saveCustomPlaylist = (data) => {
      try {
        setCustomPlaylist(data);
        localStorage.setItem("custom_playlist", JSON.stringify(data));
        setShowCreateModal(false);
      } catch (e) {
          alert("Помилка збереження! Можливо, файли занадто великі.");
      }
  };

  const openCustomPlaylist = () => {
      setCurrentPlaylist('custom');
  };

  return (
    <MusicPhotoDiv>
      <MusicPhotoText>Оберіть плейлист</MusicPhotoText>
      <PlaylistGrid>
        {Object.keys(PLAYLISTS).map((key) => (
          <PlaylistCard key={key} onClick={() => setCurrentPlaylist(key)}>
            <PlaylistCover
              playlistKey={key}
              defaultImage={PLAYLISTS[key].image}
            />
            <PlaylistTitle>{PLAYLISTS[key].title}</PlaylistTitle>
          </PlaylistCard>
        ))}
        {customPlaylist ? (
            <PlaylistCard onClick={openCustomPlaylist}>
                <PlaylistCover playlistKey="custom" customImage={customPlaylist.cover} defaultImage={require("../../photos/vip-images/mechannic.jpg")} />
                <PlaylistTitle>{customPlaylist.name}</PlaylistTitle>
                <button onClick={(e) => { e.stopPropagation(); setShowCreateModal(true); }} style={{background: 'orange', border: 'none', padding: 5, borderRadius: 5, cursor: 'pointer', marginBottom: 5}}>Редагувати</button>
            </PlaylistCard>
        ) : (
            <PlaylistCard onClick={() => setShowCreateModal(true)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0'}}>
                <div style={{fontSize: 50, color: '#ccc'}}>+</div>
                <div style={{color: '#aaa'}}>Створити плейлист</div>
            </PlaylistCard>
        )}
      </PlaylistGrid>

      {showCreateModal && (
          <CreatePlaylistModal 
            onClose={() => setShowCreateModal(false)} 
            onSave={saveCustomPlaylist}
            initialData={customPlaylist}
          />
      )}

      {currentPlaylist && (
        <PlaylistModal
          playlistKey={currentPlaylist}
          onClose={handleClosePlaylist}
          user={user}
          onOpenRegister={onOpenRegister}
          customTracks={currentPlaylist === 'custom' ? customPlaylist?.tracks : null}
        />
      )}
    </MusicPhotoDiv>
  );
};

export default MusicPhoto;
