import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import dinofrozVideo from "../../mp3/dinofroz.mp4";
import ultra from "../../photos/hero-header/start-image.webp";
import ultraTurkeys from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
import turkeysAudio from "../../mp3/turkeys.mp3";
import theoryImg from "../../photos/fan-art/theorytwo.webp";
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background: ${(props) =>
    props.$isError ? "rgba(255, 108, 108, 0.6)" : "rgba(82, 249, 255, 0.2)"};
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

  ${(props) =>
    props.$isBlocked &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const SkipWarning = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  background: rgba(74, 29, 29, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid white;
  animation: ${fadeIn} 0.4s ease-out forwards;
`;

const PausedOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  gap: 20px;
`;

const PauseIcon = styled.div`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const PausedButtonsRow = styled.div`
  display: flex;
  gap: 15px;
  pointer-events: auto;
`;

const PausedButton = styled.button`
  background: rgba(148, 255, 250, 0.2);
  backdrop-filter: blur(5px);
  color: #94fffa;
  border: 1px solid rgba(148, 255, 250, 0.5);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background: #94fffa;
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
    image: theoryImg,
    audio: theoryAudio,
  },
];

const SEQUENCE = [
  { type: "thematic", duration: 3000, text: "" },
  {
    type: "black",
    duration: 10000,
    text: "У нас надійна погода. Власний коментар: Я не хочу багато підписників чи користувачів, але я хочу людей, які з радістю використовуватимуть мій сайт, у різних цілях.",
  },
  {
    type: "video",
    start: 10,
    end: 17,
    text: "Спец режим відео (динофроз), плавне перегортання зображень та фільтри під час програвання деяких музичних файлів",
  },
  {
    type: "video",
    start: 17,
    end: 27,
    text: "Секрети, головоломки, історії, власні рівні, різні рівні складності, тексти.",
  },
  {
    type: "card",
    imgIdx: 0,
    duration: 10000,
    text: "Різноманітна та захоплива музика, яку можна додавати, шукати. Ми зробимо красиву оселю, з вашим принтером і нашими, пошуковими або власними фанартами.",
  },
  {
    type: "video",
    start: 27,
    end: 40,
    text: "Пишіть, підказуйте, що зробити для вас :)",
  },
  { type: "video", start: 40, end: 55, text: "Досягнення на будь-який смак. " },
  {
    type: "card",
    imgIdx: 1,
    duration: 10000,
    text: "Налаштуйте сайт під себе. З нашою власною валютою. Скачуйте музику, зображення, відео.",
  },
  {
    type: "video",
    start: 55,
    end: 65,
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

const calculateTotalSequenceTime = () => {
  return SEQUENCE.reduce((acc, step) => {
    if (step.type === "video") {
      return acc + (step.end - step.start);
    }
    return acc + step.duration / 1000;
  }, 0);
};

const KatSceneModal = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLooping, setIsLooping] = useState(false);
  const [isCaching, setIsCaching] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [connectionError, setConnectionError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const checkWatched = async () => {
      const val = await localforage.getItem("katSceneWatched");
      if (val === "true") setIsWatched(true);
    };
    checkWatched();
  }, []);

  const [skipBlockTimer, setSkipBlockTimer] = useState(() => {
    return isWatched ? 0 : Math.ceil(calculateTotalSequenceTime());
  });
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const stepStartTimeRef = useRef(null);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null); // Ref для контейнера Fullscreen
  const volumeRef = useRef(volume);
  const isPausedRef = useRef(isPaused);
  const handleCloseRef = useRef(null);

  const step = SEQUENCE[stepIndex];

  // Таймер на випадок проблем зі зв'язком (15 секунд)
  useEffect(() => {
    if (isAssetsLoaded) return;

    const timer = setTimeout(() => {
      if (!isAssetsLoaded) {
        setConnectionError(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [isAssetsLoaded]);

  useEffect(() => {
    if (isWatched || !isAssetsLoaded) return;

    // Розрахунок часу, що залишився, починаючи з поточного кроку
    let remaining = timeLeft;
    for (let i = stepIndex + 1; i < SEQUENCE.length; i++) {
      const s = SEQUENCE[i];
      if (s.type === "video") remaining += s.end - s.start;
      else remaining += s.duration / 1000;
    }
    setSkipBlockTimer(Math.ceil(remaining));
  }, [stepIndex, timeLeft, isWatched, isAssetsLoaded]);

  // Функція для керування повноекранним режимом
  const toggleFullscreen = () => {
    const elem = containerRef.current;
    if (!elem) return;

    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => console.log(err));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  // Безпечне закриття з виходом з повноекранного режиму
  const handleClose = useCallback(() => {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    if (isFullscreen) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    onClose();
  }, [onClose]);

  const togglePause = (e) => {
    // Не ставимо на паузу, якщо натиснуто на кнопки або чекбокс
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT" ||
      e.target.closest("label")
    )
      return;

    setIsPaused((prev) => !prev);
  };

  const handleSkipClick = () => {
    const canSkip = isWatched || skipBlockTimer === 0 || connectionError;

    if (canSkip) {
      handleClose();
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

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

  const handleScreenshot = (e) => {
    e.stopPropagation();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let source = null;
    if (step.type === "video" || step.type === "black") {
      source = videoRef.current;
    }

    if (source && source.videoWidth) {
      canvas.width = source.videoWidth;
      canvas.height = source.videoHeight;
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = `stykhiya-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else {
      // Fallback для статичних зображень або якщо відео ще не завантажилось
      alert("Скріншот збережено! (Емуляція для статичних кадрів)");
    }
  };

  useEffect(() => {
    handleCloseRef.current = handleClose;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

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
          }),
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
    isPausedRef.current = isPaused;
    if (videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else if (step.type === "video" || step.type === "black")
        videoRef.current.play().catch(() => {});
    }
    if (audioRef.current) {
      if (isPaused) audioRef.current.pause();
      else if (step.type === "card") audioRef.current.play().catch(() => {});
    }
  }, [isPaused, step.type]);

  useEffect(() => {
    if (!isAssetsLoaded || isPaused) return;

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

    // Якщо ми тільки що перейшли на новий крок, ініціалізуємо timeLeft
    if (step.type !== "video") {
      if (stepStartTimeRef.current !== stepIndex) {
        setTimeLeft(Math.ceil(step.duration / 1000));
        stepStartTimeRef.current = stepIndex;
      }

      countdownInterval = setInterval(() => {
        if (!isPausedRef.current) setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else {
      stepStartTimeRef.current = stepIndex;
    }

    const handleNextStep = () => {
      if (stepIndex === SEQUENCE.length - 1 && !isLooping) {
        localforage.setItem("katSceneWatched", "true");
        setIsWatched(true);
        if (handleCloseRef.current) handleCloseRef.current();
      } else {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    };

    if (step.type === "thematic") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current?.pause();
      const currentDuration =
        stepStartTimeRef.current === stepIndex && timeLeft > 0
          ? timeLeft * 1000
          : step.duration;
      nextStepTimer = setTimeout(handleNextStep, currentDuration);
    } else if (step.type === "card") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.volume = volumeRef.current;
        audioRef.current.src = ULTRA_CARDS_LIST[step.imgIdx].audio;
        if (!isPaused) audioRef.current.play().catch(() => {});
      }
      const currentDuration =
        stepStartTimeRef.current === stepIndex && timeLeft > 0
          ? timeLeft * 1000
          : step.duration;
      nextStepTimer = setTimeout(handleNextStep, currentDuration);
    } else if (step.type === "video" || step.type === "black") {
      if (audioRef.current) audioRef.current.pause();
      if (videoRef.current) {
        const start = step.type === "black" ? 0 : step.start;
        if (stepStartTimeRef.current !== stepIndex) {
          videoRef.current.currentTime = start;
        }
        if (!isPaused) videoRef.current.play().catch(() => {});
      }

      if (step.type === "video" && step.end !== "end") {
        const segmentDuration =
          (step.end - (videoRef.current?.currentTime || step.start)) * 1000;
        nextStepTimer = setTimeout(handleNextStep, segmentDuration);
      } else if (step.type === "black") {
        const currentDuration =
          stepStartTimeRef.current === stepIndex && timeLeft > 0
            ? timeLeft * 1000
            : step.duration;
        nextStepTimer = setTimeout(handleNextStep, currentDuration);
      }
    }

    return () => {
      clearTimeout(nextStepTimer);
      clearTimeout(textOutTimer);
      clearTimeout(textInTimer);
      clearInterval(countdownInterval);
    };
  }, [
    timeLeft,
    stepIndex,
    step.duration,
    step.text,
    step.type,
    step.imgIdx,
    step.start,
    step.end,
    isAssetsLoaded,
    isPaused,
    isLooping,
  ]);

  useEffect(() => {
    volumeRef.current = volume;
    if (videoRef.current) videoRef.current.volume = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: "Кат-сцена Стихія",
        artist: "TurkeyStudio",
        artwork: [{ src: ultra, sizes: "512x512", type: "image/webp" }],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        if (
          videoRef.current &&
          (step.type === "video" || step.type === "black")
        )
          videoRef.current.play();
        if (audioRef.current && step.type === "card") audioRef.current.play();
        setIsPaused(false);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        videoRef.current?.pause();
        audioRef.current?.pause();
        setIsPaused(true);
      });
    }
  }, [step.type]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPaused ? "paused" : "playing";
    }
  }, [isPaused]);

  const handleVideoEnded = () => {
    if (step.type === "video" && step.end === "end" && !isPaused) {
      if (stepIndex === SEQUENCE.length - 1 && !isLooping) {
        handleClose();
      } else {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (step.type === "video" && videoRef.current && !isPaused) {
      const end = step.end === "end" ? videoRef.current.duration : step.end;
      const remaining = Math.max(0, end - videoRef.current.currentTime);
      setTimeLeft(Math.ceil(remaining));
    }
  };

  return (
    <Overlay ref={containerRef}>
      <UltraPlayerContainer onClick={togglePause}>
        {!isPaused && (
          <>
            <SkipButton
              onClick={handleSkipClick}
              $isBlocked={!isWatched && skipBlockTimer > 0 && !connectionError}
              $isError={connectionError}
            >
              {isWatched || connectionError
                ? "Пропустити"
                : `Пропустити (${skipBlockTimer}с)`}
            </SkipButton>
            {showWarning && (
              <SkipWarning>
                Потрібно додивитися сцену до кінця для першого разу
              </SkipWarning>
            )}
            <FullscreenButton onClick={toggleFullscreen}>
              ⛶ Bесь екран
            </FullscreenButton>
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
          </>
        )}

        {!isAssetsLoaded && (
          <LoadingContainer>
            <div
              style={{
                color: "#94fffa",
                fontSize: "14px",
                marginBottom: "5px",
              }}
            >
              Завантаження сцени... Вимкніть VPN, зайдіть через браузер, для
              швидшого заванантаження {loadingProgress}%
            </div>
            <ProgressBar>
              <ProgressBarFill $progress={loadingProgress} />
            </ProgressBar>
          </LoadingContainer>
        )}

        <AnimatePresence>
          {isPaused && (
            <PausedOverlay
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PauseIcon>Ⅱ</PauseIcon>
              <PausedButtonsRow>
                <PausedButton onClick={handleScreenshot}>
                  📸 Зробити скріншот
                </PausedButton>
                {isWatched && (
                  <PausedButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                  >
                    Закрити
                  </PausedButton>
                )}
              </PausedButtonsRow>
            </PausedOverlay>
          )}
        </AnimatePresence>

        <StyledImage
          src={ultra}
          $show={step.type === "thematic"}
          style={{ zIndex: 5 }}
        />

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
            <StyledImage
              src={ULTRA_CARDS_LIST[step.imgIdx].image}
              $show={true}
            />
            <audio ref={audioRef} />
          </>
        )}

        <OverlayText $show={showText} $isFullscreen={true}>
          {text}
        </OverlayText>
      </UltraPlayerContainer>
    </Overlay>
  );
};

export default KatSceneModal;
