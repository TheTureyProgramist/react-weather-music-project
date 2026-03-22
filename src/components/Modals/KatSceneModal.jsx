import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import dinofrozVideo from "../../mp3/dinofroz.mp4";
import ultra from "../../photos/hero-header/start-image.jpg";

import ultraTurkeys from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
import turkeysAudio from "../../mp3/turkeys.mp3";
import horseImg from "../../photos/vip-images/horse/horse.jpg";
import horseAudio from "../../mp3/horse.mp3";
import monodyImg from "../../photos/fan-art/monody.jpg";
import monodyAudio from "../../mp3/thefatrat-monody.mp3";
import theoryImg from "../../photos/fan-art/theorytwo.jpg";
import theoryAudio from "../../mp3/theoty-of-everything-ll.mp3";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
`;

const UltraPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover button {
    opacity: 1;
  }

  /* Примусовий ландшафтний режим для телефонів у вертикальному положенні */
  @media screen and (orientation: portrait) {
    width: 100vh;
    height: 100vw;
    transform: rotate(90deg);
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    translate: -50% -50%;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  transform: scale(1.1);
  z-index: 10;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.$show ? "block" : "none")};
  transform: scale(1.1);
  position: absolute;
  top: 0;
  left: 0;
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  font-size: 14px;
  text-align: center;
  width: 90%;
  transition: opacity 0.35s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  z-index: 30;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 15px;
  border-radius: 8px;
  pointer-events: none;
`;

const TimeIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 40;
  pointer-events: none;
`;

const VolumeControlContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 80px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 20px;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(82, 249, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #94fffa;
  border: 1px solid rgba(0, 255, 255, 0.33);
  font-size: 14px;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 60;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

// Нова кнопка для повноекранного режиму
const FullscreenButton = styled.button`
  position: absolute;
  top: 10px;
  left: 140px; /* Відступ від кнопки "Пропустити" */
  background: rgba(82, 249, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #94fffa;
  border: 1px solid rgba(0, 255, 255, 0.33);
  font-size: 14px;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 60;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const CacheButton = styled.button`
  position: absolute;
  top: 10px;
  left: 280px;
  background: rgba(82, 249, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #94fffa;
  border: 1px solid rgba(0, 255, 255, 0.33);
  font-size: 14px;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 60;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const CheckboxContainer = styled.label`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 10px;
  border-radius: 20px;
  user-select: none;
`;

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: #94fffa;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px #94fffa;
`;

const ULTRA_CARDS_LIST = [
  {
    image: ultraTurkeys,
    audio: turkeysAudio,
  },
  {
    image: horseImg,
    audio: horseAudio,
  },
  {
    image: monodyImg,
    audio: monodyAudio,
  },
  {
    image: theoryImg,
    audio: theoryAudio,
  },
];

const SEQUENCE = [
  { type: "thematic", duration: 3000, text: "" },
  { type: "black", duration: 10000, text: "У нас надійна погода. Власний коментар: Я не хочу багато підписників чи користувачів, але я хочу людей, які з радістю використовуватимуть мій сайт, у різних цілях." },
  {
    type: "card",
    imgIdx: 0,
    duration: 6000,
    text: "Різноманітна та захоплива музика, яку можна додавати, шукати",
  },
  {
    type: "video",
    start: 10,
    end: 20,
    text: "Спец режим відео (динофроз) або плавне перегортання зображень під час програвання деяких музичних файлів",
  },
  {
    type: "card",
    imgIdx: 1,
    duration: 4000,
    text: "Зробіть красиву оселю, з принтером і нашими, пошуковими або власними фанартами!",
  },
  {
    type: "video",
    start: 20,
    end: 30,
    text: "Секрети, головоломки, історії, власні рівні, різні рівні складності, тексти.",
  },
  { type: "card", imgIdx: 3, duration: 12000, text: "Налаштуйте сайт під себе" },
  {
    type: "video",
    start: 30,
    end: 45,
    text: "Пишіть, підказуйте, що зробити для вас :)",
  },
  { type: "video", start: 45, end: 60, text: "Досягнення на будь-який смак. " },
  {
    type: "card",
    imgIdx: 2,
    duration: 10000,
    text: "Власна валюта. Скачуйте музику, зображення, відео, скріншоти.",
  },
  {
    type: "video",
    start: 60,
    end: 66,
    text: "Все можна поліпшити, зі Стихія+ та Стихія Ultra",
  },
  {
    type: "video",
    start: 66,
    end: 73,
    text: "Колись я не думав, що це може дійти до такого масштабу, проте фантазія робить дива :)",
  },
  {
    type: "video",
    start: 73,
    end: 83,
    text: "Велика подяка, API сайтам, які допомогли при створенні Стихії. Малятко ТВ, Пікселю за гарні роки дитинства. І найголовніше сім'ї та близьким. Дякую за користування сайтом!",
  },
];

const KatSceneModal = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLooping, setIsLooping] = useState(false);
  const [isCaching, setIsCaching] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null); // Ref для контейнера Fullscreen
  const volumeRef = useRef(volume);
  const isLoopingRef = useRef(isLooping);
  const handleCloseRef = useRef(null);

  const step = SEQUENCE[stepIndex];

  // Функція для керування повноекранним режимом
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Помилка при спробі увімкнути Fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Безпечне закриття з виходом з повноекранного режиму
  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    onClose();
  }, [onClose]);

  const handleCacheAll = async () => {
    if (isCaching) return;
    setIsCaching(true);

    try {
      const urlsToCache = new Set();
      urlsToCache.add(ultra);
      urlsToCache.add(dinofrozVideo);

      ULTRA_CARDS_LIST.forEach((item) => {
        if (item.image) urlsToCache.add(item.image);
        if (item.audio) urlsToCache.add(item.audio);
      });

      const promises = Array.from(urlsToCache).map((url) => fetch(url));
      await Promise.all(promises);
      alert("Успішно! Всі ресурси закешовані.");
    } catch (err) {
      console.error("Помилка кешування:", err);
      alert("Помилка кешування.");
    } finally {
      setIsCaching(false);
    }
  };

  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    // Логіка початкового завантаження (Preloading)
    const preloadAssets = async () => {
      const urlsToLoad = new Set();
      
      // Додаємо основні ресурси
      urlsToLoad.add(ultra);
      urlsToLoad.add(dinofrozVideo);

      // Додаємо ресурси карток
      ULTRA_CARDS_LIST.forEach((item) => {
        if (item.image) urlsToLoad.add(item.image);
        if (item.audio) urlsToLoad.add(item.audio);
      });

      const urlsArray = Array.from(urlsToLoad);
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / urlsArray.length) * 100);
        setLoadingProgress(progress);
      };

      const promises = urlsArray.map((url) => 
        fetch(url)
          .then((response) => {
            updateProgress();
            return response.blob(); 
          })
          .catch((err) => {
            console.error(`Failed to load ${url}`, err);
            updateProgress(); // Рахуємо як завершене навіть при помилці, щоб не зависло
          })
      );

      await Promise.all(promises);
      
      // Невелика затримка для плавності UI
      setTimeout(() => {
        setIsAssetsLoaded(true);
      }, 500);
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    // Таймер не стартує, поки ресурси не завантажені
    if (!isAssetsLoaded) return;

    let nextStepTimer;
    let textOutTimer;
    let textInTimer;
    let countdownInterval;
    
    setShowText(false);
    textOutTimer = setTimeout(() => {
      setText(step.text);
      if (step.text) {
        textInTimer = setTimeout(() => setShowText(true), 50);
      }
    }, 350);

    if (step.type !== "video") {
      setTimeLeft(Math.ceil(step.duration / 1000));
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    const handleNextStep = () => {
      if (stepIndex === SEQUENCE.length - 1 && !isLoopingRef.current) {
        if (handleCloseRef.current) handleCloseRef.current();
      } else {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    };

    if (step.type === "thematic") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current?.pause();
      nextStepTimer = setTimeout(handleNextStep, step.duration);
    } else if (step.type === "card") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.volume = volumeRef.current;
        audioRef.current.src = ULTRA_CARDS_LIST[step.imgIdx].audio;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      nextStepTimer = setTimeout(handleNextStep, step.duration);
    } else if (step.type === "video" || step.type === "black") {
      if (audioRef.current) audioRef.current.pause();
      if (videoRef.current) {
        const start = step.type === "black" ? 0 : step.start;
        if (Math.abs(videoRef.current.currentTime - start) > 0.2) {
          videoRef.current.currentTime = start;
        }
        videoRef.current.play().catch(() => {});
      }

      if (step.type === "video" && step.end !== "end") {
        const duration = (step.end - step.start) * 1000;
        nextStepTimer = setTimeout(handleNextStep, duration);
      } else if (step.type === "black") {
        nextStepTimer = setTimeout(handleNextStep, step.duration);
      }
    }

    return () => {
      clearTimeout(nextStepTimer);
      clearTimeout(textOutTimer);
      clearTimeout(textInTimer);
      clearInterval(countdownInterval);
    };
  }, [
    stepIndex,
    step.duration,
    step.text,
    step.type,
    step.imgIdx,
    step.start,
    step.end,
    isAssetsLoaded // Додаємо в залежності
  ]);

  useEffect(() => {
    volumeRef.current = volume;
    if (videoRef.current) videoRef.current.volume = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleVideoEnded = () => {
    if (step.type === "video" && step.end === "end") {
      if (stepIndex === SEQUENCE.length - 1 && !isLoopingRef.current) {
        handleClose();
      } else {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (step.type === "video" && videoRef.current) {
      const end = step.end === "end" ? videoRef.current.duration : step.end;
      const remaining = Math.max(0, end - videoRef.current.currentTime);
      setTimeLeft(Math.ceil(remaining));
    }
  };

  return (
    <Overlay ref={containerRef}>
      <UltraPlayerContainer>
        <SkipButton onClick={handleClose}>Skip</SkipButton>
        <FullscreenButton onClick={toggleFullscreen}>⛶ Bесь екран</FullscreenButton>
        <CacheButton onClick={handleCacheAll} disabled={isCaching}>
          {isCaching ? "⏳" : "📥 Кеш"}
        </CacheButton>

        <VolumeControlContainer>
          <span style={{ fontSize: "14px" }}>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{
              width: "80px",
              accentColor: "#710097",
              cursor: "pointer",
              height: "4px",
            }}
          />
        </VolumeControlContainer>

        <CheckboxContainer>
          <input
            type="checkbox"
            checked={isLooping}
            onChange={(e) => setIsLooping(e.target.checked)}
            style={{ accentColor: "#710097", cursor: "pointer" }}
          />
          Автоповтор
        </CheckboxContainer>

        {!isAssetsLoaded && (
          <LoadingContainer>
            <div style={{ color: "#94fffa", fontSize: "14px", marginBottom: "5px" }}>Завантаження сцени... {loadingProgress}%</div>
            <ProgressBar>
              <ProgressBarFill $progress={loadingProgress} />
            </ProgressBar>
          </LoadingContainer>
        )}

        <StyledImage src={ultra} $show={step.type === "thematic"} style={{ zIndex: 5 }} />
        
        <TimeIndicator>{timeLeft}</TimeIndicator>
        
        <StyledVideo
          ref={videoRef}
          src={dinofrozVideo}
          $show={step.type === "video"} 
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          playsInline
        />
        
        {step.type === "card" && (
          <>
            <StyledImage src={ULTRA_CARDS_LIST[step.imgIdx].image} $show={true} />
            <audio ref={audioRef} />
          </>
        )}
        
        <OverlayText $show={showText} $isFullscreen={true}>{text}</OverlayText>
      </UltraPlayerContainer>
    </Overlay>
  );
};

export default KatSceneModal;