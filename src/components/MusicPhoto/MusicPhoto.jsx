import { musicCards, songAiKnowledge, dinofrozVideo } from "./MusicPhoto.assets";
import authorsData from "./authors.json";
import { SeekIndicator, LongPressBadge, AihelpTitle, MusicPhotoDiv, ActButton, MusicPhotoFix, ControlsContainer, SearchInput, SortSelect, AuthorCardWrapper, AuthorInfoOverlay, CardWrapper, LyricsModalImage, MusicImageContainer, MusicImage, HeartButton, MusicText, SliderRow, VolumeSlider, LoadMoreButton, FilterOverlay, StyledSymbol, SeekBar, StereoSeekBar, StereoChannel, SpeedSlider, UnlockContainer, SeekAmountSlider, LoopButton, ActionButtonsContainer, ActionButton, ModalOverlay, LyricsModalContent, PlaylistModalContent, LyricsCloseButton, FullScreenOverlay, MiniPlayerContainer, MiniPlayerHeader, MiniControlBtn, MiniResizeHandle, AudioBarContainer, AudioBarBtn, FSHeader, FSContent, FSVisualWrapper, FSVideo, FSImage, FSControls, FSSliderContainer, FSSliderImage, FSTitle, GearModal, SubtitleOverlay, DownloadModal, PlaylistCloseButton, LyricsContainer, LyricsLine, InputGroup, StorageIndicatorContainer, StorageBar, StorageBarFill, SliderItemWrapper, CheckpointBadge, CheckpointMarker, SliderOverlay, SliderBtn, PlaylistOverlay, SeekBarWrapper, SeekTooltip, LoadingContainer, ProgressBar, ProgressBarFill, AiChatContainer, MessageList, Message, ChatInputRow, AuthorPreviewCard, AuthorPreviewImage, AuthorPreviewName, AuthorPreviewBody, AuthorPreviewSection, AuthorPreviewActions, AuthorPreviewBtn } from "./MusicPhoto.styled";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import localforage from "localforage";
import { motion, AnimatePresence } from "framer-motion";
import { pipeline } from "@huggingface/transformers";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, signInWithPopup, googleProvider } from "../../firebase";
import {
  buildCommentPayload,
  getDailyCommentQuotaLeft,
  getInitialCommentStats,
  MAX_DAILY_COMMENTS,
  MAX_TOTAL_COMMENTS,
  MAX_VISIBLE_COMMENTS,
  normalizeLikeValue,
  toSocialTarget,
  getAvatarSrc,
  canCommentUser,
} from "./socialUtils";
//Desert
// import christmas from "../../photos/vip-images/christmas.webp";
//Horses
//Turkeys
//Asium
//Swamp
//Horror
//Динофроз
//Mia and me
//import christmasAudio from "../../mp3/kolada.mp3";
// ... решта стилів ... (без змін)
/* Changed for dark mode */
/* Changed for dark mode */
const musicSymbols = ["♫"];

const SymbolOverlay = ({
  count = 50,
  volume = 1,
  speed = 0,
  blur = 0,
  isExiting = false,
  variation = "default",
  customSymbols,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const symbols = useMemo(() => {
    const isFirework = variation === "firework";
    let multiplier = 1;
    if (windowWidth < 480) {
      multiplier = 0.3;
    } else if (windowWidth < 1024) {
      multiplier = 0.6;
    }
    const realCount = isFirework
      ? 6
      : Math.max(1, Math.floor(count * multiplier));
    const list =
      Array.isArray(customSymbols) && customSymbols.length > 0
        ? customSymbols
        : musicSymbols;
    return Array.from({ length: realCount }).map((_, i) => {
      const r1 = Math.random();
      const r2 = Math.random();
      let top = r2 * 100;
      let left = r1 * 100;
      let moveX = speed > 0 ? (r1 - 0.5) * 200 * speed : 0;
      let moveY = speed > 0 ? (r2 - 0.5) * 200 * speed : 0;
      let duration = 2 + Math.random() * 4;
      if (isFirework) {
        top = 50;
        left = 50;
        const angle = i * (360 / 6) * (Math.PI / 180);
        const dist = 120 + Math.random() * 60;
        moveX = Math.cos(angle) * dist;
        moveY = Math.sin(angle) * dist;
        duration = 1.8 + Math.random() * 0.4;
      }

      return {
        key: i,
        char: list[Math.floor(Math.random() * list.length)],
        top,
        left,
        size: isFirework ? 40 : 30 + Math.random() * 30,
        opacity: isFirework ? 1 : 0.2 + Math.random() * 0.3,
        duration,
        moveX,
        moveY,
        blur: blur > 0 ? Math.random() * blur : 0,
      };
    });
  }, [count, speed, blur, variation, windowWidth, customSymbols]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: isExiting ? 0 : isMounted ? 1 : 0,
        transition: "opacity 1s ease-out",
        zIndex: 20 /* Вище за фільтри для стійкості */,
      }}
    >
      {symbols.map((s) => (
        <StyledSymbol
          key={s.key}
          $top={s.top}
          $left={s.left}
          $size={s.size}
          $opacity={s.opacity}
          $duration={s.duration}
          $moveX={s.moveX}
          $moveY={s.moveY}
          $volume={volume}
          $blur={blur}
          $variation={variation}
        >
          {s.char}
        </StyledSymbol>
      ))}
    </div>
  );
};
const AudioBar = ({
  track,
  initialTime,
  isPlaying: startPlaying,
  volume: startVolume,
  speed: startSpeed,
  onClose,
  onRestore,
  onOpenAi = () => {},
  checkpoint,
  checkpointsEnabled,
  onSaveCheckpoint,
  onClearCheckpoint,
}) => {
  const [isPlaying, setIsPlaying] = useState(startPlaying);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(startVolume);
  const [speed, setSpeed] = useState(startSpeed);
  const [mode, setMode] = useState("linear"); // "linear" або "stereo"
  const [waveform, setWaveform] = useState([]);
  const [isGeneratingWave, setIsGeneratingWave] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pipWindow, setPipWindow] = useState(null);
  const mediaRef = useRef(null);
  const containerRef = useRef(null);

  const progRef = useRef(currentTime);
  const durRef = useRef(duration);
  useEffect(() => {
    progRef.current = currentTime;
  }, [currentTime]);
  useEffect(() => {
    durRef.current = duration;
  }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (
        onSaveCheckpoint &&
        progRef.current > 5 &&
        progRef.current < durRef.current - 5
      ) {
        onSaveCheckpoint(track.id, progRef.current);
      }
    };

    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (
      checkpointsEnabled &&
      checkpoint &&
      Math.abs(currentTime - checkpoint) < 1.5
    ) {
      onClearCheckpoint(track.id);
    }
  }, [
    currentTime,
    checkpoint,
    track.id,
    checkpointsEnabled,
    onClearCheckpoint,
  ]);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const toggleDocumentPiP = async () => {
    if (pipWindow) {
      pipWindow.close();
      return;
    }

    if ("documentPictureInPicture" in window) {
      try {
        const pip = await window.documentPictureInPicture.requestWindow({
          width: 800,
          height: 100,
        });
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules]
              .map((rule) => rule.cssText)
              .join("");
            const style = document.createElement("style");
            style.textContent = cssRules;
            pip.document.head.appendChild(style);
          } catch (e) {}
        });
        pip.document.body.appendChild(containerRef.current);
        setPipWindow(pip);

        pip.addEventListener("pagehide", () => {
          setPipWindow(null);
          document.body.appendChild(containerRef.current);
        });
      } catch (err) {
        console.error("PiP failed", err);
      }
    } else {
      alert("Ваш браузер не підтримує винесення інтерфейсу на робочий стіл.");
    }
  };

  const isVideo = !!track.video;

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = initialTime;
      mediaRef.current.volume = volume;
      mediaRef.current.playbackRate = speed;
    }
  }, [track.id, initialTime, volume, speed]);

  useEffect(() => {
    if (mode !== "stereo") return;
    let isCancelled = false;
    const generateWave = async () => {
      setIsGeneratingWave(true);
      try {
        const url = isVideo ? track.video : track.audio;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        if (isCancelled) return;
        const rawData = audioBuffer.getChannelData(0);
        const samples = 150;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        setWaveform(filteredData.map((n) => n * multiplier));
      } catch (e) {
        console.error("Waveform error:", e);
      } finally {
        setIsGeneratingWave(false);
      }
    };
    generateWave();
    return () => {
      isCancelled = true;
    };
  }, [mode, track.audio, track.video, isVideo]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleStereoSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    if (mediaRef.current) {
      mediaRef.current.currentTime = p * duration;
    }
  };

  return (
    <AudioBarContainer
      ref={containerRef}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <span
          style={{
            fontSize: "9.5px",
            fontWeight: "bold",
            color: "orange",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {track.author}
        </span>
        <span style={{ fontSize: "8px", color: "#888" }}>
          {track.text?.slice(0, 190)}.
        </span>
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        <AudioBarBtn
          onClick={() => {
            if (mediaRef.current) mediaRef.current.currentTime = 0;
          }}
          title="На початок"
        >
          ⇤
        </AudioBarBtn>
        <AudioBarBtn
          onClick={() => (mediaRef.current.currentTime -= 10)}
          title="Назад 10с"
          style={{ fontSize: "8px" }}
        >
          ◀◀
        </AudioBarBtn>
        <AudioBarBtn
          onClick={() => {
            if (isPlaying) {
              mediaRef.current.pause();
              setIsPlaying(false);
            } else {
              mediaRef.current.play();
              setIsPlaying(true);
            }
          }}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </AudioBarBtn>
        <AudioBarBtn
          onClick={() => (mediaRef.current.currentTime += 10)}
          title="Вперед 10с"
          style={{ fontSize: "8px" }}
        >
          ▶▶
        </AudioBarBtn>
        <AudioBarBtn
          onClick={() => {
            if (mediaRef.current) mediaRef.current.currentTime = duration - 1;
          }}
          title="В самий кінець"
        >
          ⇥
        </AudioBarBtn>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: "rgba(255,255,255,0.1)",
          padding: "2px 8px",
          borderRadius: "10px",
        }}
      >
        <SpeedSlider
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          style={{ width: "40px" }}
        />
        <span style={{ fontSize: "10px", width: "22px" }}>{speed}x</span>
      </div>

      <div
        style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          {checkpointsEnabled && checkpoint > 0 && (
            <AudioBarBtn
              onClick={() => (mediaRef.current.currentTime = checkpoint)}
              title="До чекпоінту"
            >
              🚩
            </AudioBarBtn>
          )}
        </div>
        <span style={{ fontSize: "11px", minWidth: "35px" }}>
          {formatTime(currentTime)}
        </span>
        {mode === "linear" ? (
          <SeekBarWrapper style={{ flex: 1 }}>
            {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
              <CheckpointMarker
                $left={(checkpoint / duration) * 100}
                title="Ви тут зупинилися"
                style={{ fontSize: "10px" }}
              >
                🚩
              </CheckpointMarker>
            )}
            <SeekBar
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => (mediaRef.current.currentTime = e.target.value)}
              style={{ width: "100%" }}
            />
          </SeekBarWrapper>
        ) : (
          <StereoSeekBar onClick={handleStereoSeek} style={{ height: "30px" }}>
            {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
              <CheckpointMarker
                $left={(checkpoint / duration) * 100}
              style={{ bottom: "auto", top: "0px", fontSize: "10px" }}
                title="Ви тут зупинилися"
              >
                🚩
              </CheckpointMarker>
            )}
            {isGeneratingWave ? (
              <span
                style={{ color: "white", fontSize: "10px", margin: "auto" }}
              >
                Обробка...
              </span>
            ) : (
              waveform.map((height, i) => (
                <StereoChannel
                  key={i}
                  $height={height}
                  $active={
                    (currentTime / duration) * 100 > (i / waveform.length) * 100
                  }
                />
              ))
            )}
          </StereoSeekBar>
        )}
        <span style={{ fontSize: "11px", minWidth: "35px" }}>
          {formatTime(duration)}
        </span>
        <AudioBarBtn
          title="Перемикач на стереограму"
          onClick={() => setMode(mode === "linear" ? "stereo" : "linear")}
        >
          📊
        </AudioBarBtn>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ fontSize: "12px" }}>🔊</span>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <AudioBarBtn
          onClick={() => onRestore(currentTime, isPlaying, volume, speed)}
          title="Розгорнути"
        >
          ⏶
        </AudioBarBtn>
        <AudioBarBtn onClick={() => onOpenAi(track)} title="ШІ Помічник">
          ✨
        </AudioBarBtn>
        {!isMobile && "documentPictureInPicture" in window && (
          <AudioBarBtn
            onClick={toggleDocumentPiP}
            title="Винести на робочий стіл"
          >
            🖼️
          </AudioBarBtn>
        )}
        <AudioBarBtn onClick={onClose} title="Закрити">
          ✕
        </AudioBarBtn>
      </div>

      {track.video ? (
        <video
          ref={mediaRef}
          src={track.video}
          autoPlay={isPlaying}
          hidden
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => setIsPlaying(false)}
        />
      ) : (
        <audio
          ref={mediaRef}
          src={track.audio}
          autoPlay={isPlaying}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </AudioBarContainer>
  );
};

const MiniPlayer = ({
  track,
  initialTime,
  isPlaying: initialPlaying,
  speed: startSpeed,
  volume: startVolume,
  checkpoint,
  checkpointsEnabled,
  onSaveCheckpoint,
  onClearCheckpoint,
  onClose,
  onRestore,
}) => {
  const getDefaultPos = () => ({
    x: Math.max(0, window.innerWidth - 320),
    y: Math.max(0, window.innerHeight - 220),
  });
  const [pos, setPos] = useState(getDefaultPos());
  const [size, setSize] = useState({ width: 300, height: 180 });
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(startVolume);
  const [speed] = useState(startSpeed);
  const mediaRef = useRef(null);
  const isDinofroz = !!track.video;

  const progRef = useRef(currentTime);
  const durRef = useRef(duration);
  useEffect(() => {
    progRef.current = currentTime;
  }, [currentTime]);
  useEffect(() => {
    durRef.current = duration;
  }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (
        onSaveCheckpoint &&
        progRef.current > 5 &&
        progRef.current < durRef.current - 5
      ) {
        onSaveCheckpoint(track.id, progRef.current);
      }
    };
    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (
      checkpointsEnabled &&
      checkpoint &&
      Math.abs(currentTime - checkpoint) < 1.5
    ) {
      onClearCheckpoint(track.id);
    }
  }, [
    currentTime,
    checkpoint,
    track.id,
    checkpointsEnabled,
    onClearCheckpoint,
  ]);

  const handleError = useCallback(() => {
    alert("Помилка завантаження медіа в міні-плеєрі. Спробуйте ще раз.");
    setIsPlaying(false);
    mediaRef.current?.pause();
  }, []);

  const handleRestore = useCallback(() => {
    onRestore?.(currentTime, isPlaying, volume, speed);
  }, [currentTime, isPlaying, onRestore, speed, volume]);

  useEffect(() => {
    setPos(getDefaultPos());
  }, [track.id]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "q" || e.key === "Q")) {
        e.preventDefault();
        setPos(getDefaultPos());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = initialTime;
      mediaRef.current.playbackRate = speed;
      mediaRef.current.volume = volume;
      if (isPlaying) {
        mediaRef.current.play().catch(() => {});
      } else {
        mediaRef.current.pause();
      }
    }
  }, [initialTime, isPlaying, speed, volume, track.id]);
  useEffect(() => {
    if ("mediaSession" in navigator && track) {
      const artwork = track.image ? [{ src: track.image, sizes: "512x512", type: "image/webp" }] : [];
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: track.text || track.author || "Стихія",
        artist: track.author || "Stykhiya",
        album: track.category || "Music",
        artwork: artwork,
      });

      navigator.mediaSession.setActionHandler("play", () => {
        mediaRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        mediaRef.current?.pause();
        setIsPlaying(false);
      });
    }
  }, [track]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  const sliderImages = useMemo(() => {
    if (track.images && track.images.length > 0) {
      if (
        track.images[0] &&
        typeof track.images[0] === "object" &&
        "image" in track.images[0]
      ) {
        return track.images.map((item) => item.image);
      }
      return track.images;
    }
    return [track.image];
  }, [track]);

  const currentImgIdx = useMemo(() => {
    if (!sliderImages || sliderImages.length === 0) return 0;
    const segment = (duration || 1) / sliderImages.length;
    return Math.min(Math.floor(currentTime / segment), sliderImages.length - 1);
  }, [sliderImages, currentTime, duration]);

  const getCurrentImageSrc = useCallback(
    (index) => {
      if (!sliderImages || !sliderImages[index]) return track.image;
      return sliderImages[index];
    },
    [sliderImages, track.image],
  );

  const canvasRef = useRef(null);
  const pipVideoRef = useRef(null);

  useEffect(() => {
    if (isDinofroz || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = getCurrentImageSrc(currentImgIdx);
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillText(track.author || "Стихія", 15, canvas.height - 20);
    };
  }, [track, currentImgIdx, isDinofroz, getCurrentImageSrc, sliderImages]);
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDur = () => setDuration(media.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleErrorEvent = () => handleError();

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("loadedmetadata", updateDur);
    media.addEventListener("ended", handleEnded);
    media.addEventListener("error", handleErrorEvent);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("loadedmetadata", updateDur);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("error", handleErrorEvent);
    };
  }, [track, handleError]);

  const activeFilters = useMemo(() => {
    if (!track.filters) return [];
    return track.filters.filter(
      (f) => currentTime >= f.start && currentTime <= f.end,
    );
  }, [track.filters, currentTime]);
  const mainFilter = activeFilters.find(
    (f) => !["symbols", "flicker"].includes(f.type),
  );
  const handleDrag = (e) => {
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;
    const move = (me) => {
      let newX = me.clientX - startX;
      let newY = me.clientY - startY;
      const minX = -size.width + 50;
      const maxX = window.innerWidth - 50;
      const minY = 0;
      const maxY = window.innerHeight - 30;
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));
      setPos({ x: newX, y: newY });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const handleResize = (e) => {
    e.stopPropagation();
    const startW = size.width;
    const startH = size.height;
    const startX = e.clientX;
    const startY = e.clientY;
    const move = (me) => {
      setSize({
        width: Math.max(100, startW + (me.clientX - startX)),
        height: Math.max(80, startH + (me.clientY - startY)),
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const handlePiP = async () => {
    try {
      let elementToPip;
      if (isDinofroz && mediaRef.current) {
        elementToPip = mediaRef.current;
      } else if (canvasRef.current && pipVideoRef.current) {
        const stream = canvasRef.current.captureStream(30);
        pipVideoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          if (pipVideoRef.current.readyState >= 2) {
            resolve();
          } else {
            const handler = () => {
              if (pipVideoRef.current.readyState >= 2) {
                pipVideoRef.current.removeEventListener("canplay", handler);
                resolve();
              }
            };
            pipVideoRef.current.addEventListener("canplay", handler);
            setTimeout(resolve, 500);
          }
        });
        await pipVideoRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
        elementToPip = pipVideoRef.current;
      }
      if (!elementToPip) {
        alert(
          "⚠️ Помилка: не можу знайти джерело для PiP. Переконайтеся, що медіа завантажено.",
        );
        return;
      }
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (elementToPip.requestPictureInPicture) {
        try {
          await elementToPip.requestPictureInPicture();
          console.log("✅ PiP активований успішно!");
        } catch (pipErr) {
          console.error("Помилка PiP:", pipErr);
          alert(`❌ Помилка PiP: ${pipErr.message || pipErr}`);
        }
      } else {
        alert(
          "⚠️ Ваш браузер не підтримує Picture-in-Picture режим. Спробуйте Chrome, Edge або Firefox.",
        );
      }
    } catch (err) {
      console.error("Загальна помилка режиму PiP:", err);
      alert(`❌ Помилка: ${err.message}`);
    }
  };

  return track ? (
    <MiniPlayerContainer
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }} /* Changed for dark mode */
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      transition={{ duration: 0.3 }}
      onDoubleClick={handleRestore}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.width,
        height: size.height,
      }}
    >
      <MiniPlayerHeader onMouseDown={handleDrag} onDoubleClick={handleRestore}>
        <MiniControlBtn
          onClick={handleRestore}
          title="Повернутися на сайт / у повний перегляд"
        >
          ⛶ Відновити
        </MiniControlBtn>
        <MiniControlBtn
          onClick={handlePiP}
          title="Винести поверх усіх вікон (PiP)"
        >
          🖼️ PiP
        </MiniControlBtn>
        <MiniControlBtn onClick={onClose} title="Закрити плеєр">
          ✕
        </MiniControlBtn>
      </MiniPlayerHeader>
      <canvas
        ref={canvasRef}
        width="400"
        height="250"
        style={{ display: "none" }}
      />
      <video
        ref={pipVideoRef}
        muted
        playsInline
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "1px",
          height: "1px",
        }}
      />
      {/* Main content area for media */}
      <div
        style={{ flex: 1, position: "relative", overflow: "hidden" }}
        onClick={() => {
          setIsPlaying(!isPlaying);
          isPlaying ? mediaRef.current?.pause() : mediaRef.current?.play();
        }}
      >
        <FilterOverlay
          $active={!!mainFilter}
          $type={mainFilter?.type}
          $opacity={mainFilter?.opacity}
          $blur={mainFilter?.blur}
          $imageUrl={mainFilter?.imageUrl}
        />
        {isDinofroz ? (
          <video
            ref={mediaRef}
            src={track.video}
            autoPlay={isPlaying}
            muted={volume === 0}
            onError={handleError}
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          />
        ) : (
          <>
            <img
              src={getCurrentImageSrc(currentImgIdx)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
            <audio
              ref={mediaRef}
              src={track.audio}
              autoPlay={isPlaying}
              loop
              onError={handleError} // Pass handleError to audio
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            />
          </>
        )}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 17,
            color: "white",
            opacity: isPlaying ? 0 : 0.8,
          }}
        >
          ▶
        </div>
        {activeFilters.some((f) => f.type === "symbols") && (
          <SymbolOverlay
            count={9}
            volume={0.5}
            speed={1.5}
            variation={
              activeFilters.find((f) => f.type === "symbols")?.variation
            }
            customSymbols={
              activeFilters.find((f) => f.type === "symbols")?.symbols ||
              track.symbols
            }
          />
        )}
      </div>
      <MiniResizeHandle onMouseDown={handleResize} />
    </MiniPlayerContainer>
  ) : null;
};
const SongAiModal = ({ track, onClose, isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false); // Keep this to disable input during processing
  const [selectedModel, setSelectedModel] = useState("gemini-personal");
  const [status, setStatus] = useState("");
  const [personalApiKey, setPersonalApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [groqApiKey, setGroqApiKey] = useState("");
  const [groqKeyStatus, setGroqKeyStatus] = useState("idle"); // idle, loading, valid, invalid
  const [geminiModel, setGeminiModel] = useState("gemini-2.5-flash");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [responseLength, setResponseLength] = useState("concise"); // 'concise' або 'detailed'
  const [streamingText, setStreamingText] = useState("");
  const generator = useRef(null);
  const currentModelRef = useRef(null);
  const scrollRef = useRef(null);
  const abortRef = useRef(false);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await localforage.getItem(`song_ai_history_${track.id}`);
      const savedModel = await localforage.getItem(`song_ai_hf_model`);
      const savedKey = await localforage.getItem("gemini_api_key");
      const savedOaiKey = await localforage.getItem("openai_api_key");
      const savedGroqKey = await localforage.getItem("groq_api_key");
      const savedGeminiModel = await localforage.getItem("gemini_model");
      
      if (savedModel && !savedModel.includes("meta-llama")) setSelectedModel(savedModel);
      if (savedKey) setPersonalApiKey(savedKey);
      if (savedOaiKey) setOpenaiApiKey(savedOaiKey);
      if (savedGroqKey) {
        setGroqApiKey(savedGroqKey);
        verifyGroqKey(savedGroqKey);
      }
      if (savedGeminiModel) setGeminiModel(savedGeminiModel);
      if (history) setMessages(history);
      else
        setMessages((prev) => prev.length > 0 ? prev : [
          { text: `Привіт, мене звати Домініц(робот Доміно). Я можу відповісти на деякі ваші запитання "${track.author}"?`, isBot: true },
        ]);
    };
    loadHistory();
  }, [track.id, track.author]);

  // Scroll to bottom when messages or streaming text updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]); // streamingText is removed

  const saveHistory = async (newMessages) => {
    await localforage.setItem(
      `song_ai_history_${track.id}`,
      newMessages.slice(-25),
    );
  };

  const changeModel = async (model) => {
    setSelectedModel(model);
    await localforage.setItem(`song_ai_hf_model`, model);
  };

  const verifyGroqKey = async (key) => {
    if (!key || key.length < 10) { setGroqKeyStatus("idle"); return; }
    setGroqKeyStatus("loading");
    try {
      const res = await fetch("https://api.groq.com/openai/v1/models", {
        headers: { "Authorization": `Bearer ${key}` }
      });
      setGroqKeyStatus(res.ok ? "valid" : "invalid");
    } catch {
      setGroqKeyStatus("invalid");
    }
  };

  const saveGeminiModel = async (val) => {
    setGeminiModel(val);
    await localforage.setItem("gemini_model", val);
  };

  const saveKeys = async (type, key) => {
    if (type === "gemini") { setPersonalApiKey(key); await localforage.setItem("gemini_api_key", key); }
    if (type === "openai") { setOpenaiApiKey(key); await localforage.setItem("openai_api_key", key); }
    if (type === "groq") { 
      setGroqApiKey(key); 
      await localforage.setItem("groq_api_key", key);
      verifyGroqKey(key);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isAiLoading) return;
    abortRef.current = false;

    const query = input.trim();
    setInput("");
    const newMessages = [...messages, { text: query, isBot: false }];
    setMessages(newMessages);
    await saveHistory(newMessages);
    const blocked = ["пароль", "хак", "адмін", "казино"];
    if (blocked.some((word) => query.toLowerCase().includes(word))) {
      const final = [
        ...newMessages,
        { text: "Запит заблоковано з міркувань безпеки.", isBot: true },
      ];
      setMessages(final);
      await saveHistory(final);
      setIsAiLoading(false); // Reset loading state here too
      setStatus(""); // Clear status here too
      return;
    }

    setIsAiLoading(true);
    // 2. Пошук у JSON базі знань (Пошук по всьому файлу)
    let answer = null;
    const lowerQuery = query.toLowerCase();

    // Спеціальна обробка запиту про список пісень
    if (lowerQuery.includes("які пісні") || lowerQuery.includes("список пісень") || lowerQuery.includes("що тут є") || lowerQuery.includes("які є пісні")) {
      answer = "У проекті 'Стихія' зараз розміщені такі пісні: " + songAiKnowledge.map(s => s.author).join(", ") + ".";
    } else if (lowerQuery.includes("скільки пісень") || lowerQuery.includes("яка кількість") || lowerQuery.includes("кількість пісень")) {
      answer = `Зараз у моїй локальній базі знань (файл songAiKnowledge.json) є інформація про ${songAiKnowledge.length} пісень.`;
    }

    if (!answer) {
      // Шукаємо відповідь по ключах у всіх записах бази знань
      for (const entry of songAiKnowledge) {
        const matchKey = Object.keys(entry).find((k) =>
          lowerQuery.includes(k.toLowerCase()) && 
          typeof entry[k] === 'string' && 
          entry[k].length > 0
        );
        if (matchKey) {
          answer = `(Інформація про ${entry.author}): ${entry[matchKey]}`;
          if (entry.YouTube) answer += `\n\nВи можете переглянути це на YouTube: ${entry.YouTube}`;
          break;
        }

        // Пошук у текстах пісень (lyrics)
        if (entry.lyrics && Array.isArray(entry.lyrics)) {
          const foundLine = entry.lyrics.find(line => 
            line.text && (line.text.toLowerCase().includes(lowerQuery) || lowerQuery.includes(line.text.toLowerCase()))
          );
          if (foundLine) {
            answer = `У пісні "${entry.author}" є такі рядки: "${foundLine.text}"`;
            break;
          }
        }

        // Пошук у фільтрах
        if (entry.filters && Array.isArray(entry.filters)) {
          const foundFilter = entry.filters.find(f => 
            f.type && lowerQuery.includes(f.type.toLowerCase()) && (lowerQuery.includes("коли") || lowerQuery.includes("фільтр") || lowerQuery.includes("ефект"))
          );
          if (foundFilter) {
            answer = `У пісні "${entry.author}" ефект "${foundFilter.type}" активується на проміжку від ${foundFilter.start} до ${foundFilter.end} секунди.`;
            break;
          }
        }
      }
    }

    if (answer) {
      const final = [...newMessages, { text: answer, isBot: true }];
      setMessages(final);
      await saveHistory(final);
      setIsAiLoading(false);
    } else if (selectedModel === "gemini-personal") {
      if (!personalApiKey) {
        const errFinal = [...newMessages, { text: "Будь ласка, введіть ваш API-ключ Gemini у налаштуваннях чату (кнопка 🔑).", isBot: true }];
        setMessages(errFinal);
        setIsAiLoading(false);
        return;
      }

      try {
        setStatus("З'єднання з Gemini...");
        const genAI = new GoogleGenerativeAI(personalApiKey);
        const model = genAI.getGenerativeModel({ model: geminiModel });
        
        const allSongs = songAiKnowledge.map(s => s.author).join(", ");
        const durationText = track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : "невідома";
        const lyricsInfo = track.lyrics && Array.isArray(track.lyrics) ? track.lyrics.map(l => `${l.time}с: ${l.text || ''}`).join("; ") : "відсутній";
        const filtersInfo = track.filters && Array.isArray(track.filters) ? track.filters.map(f => `${f.start}-${f.end}с: ${f.type}`).join("; ") : "відсутні";
        
        const lengthInstruction = responseLength === "detailed" ? "Відповідай максимально докладно, розгорнуто та з деталями." : "Відповідай максимально стисло, коротко та лаконічно.";

        const systemContext = `Ти - Домініц, помічник проекту "Стихія". У базі знань є такі пісні: ${allSongs}. Поточна пісня: ${track.author}, тривалість: ${durationText}. Таймінги тексту: ${lyricsInfo}. Ефекти (фільтри): ${filtersInfo}. Якщо питають "коли" або "який ефект" — використовуй ці дані.
Правила роботи:
1. ВИКОРИСТАННЯ ДАНИХ: Для запитань про пісні, тексти та ефекти використовуй надані дані:
   - База пісень: ${allSongs}
   - Поточний трек: ${track.author}, тривалість: ${durationText}
   - Таймінги та ефекти: ${lyricsInfo}, ${filtersInfo}
2. ЗАГАЛЬНІ ЗНАННЯ: Якщо користувач запитує про щось поза межами цих даних, відповідай, спираючись на свої загальні знання, але вказуй, що це загальна інформація.
3. ${lengthInstruction}
4. СТИЛЬ: Будь ввічливим, чітким і конструктивним. Не обмежуйся лише даними зі змінних, якщо питання виходить за їх рамки.`;
        const prompt = `${systemContext}\nЗапитання: ${query}\nВідповідай українською коротко:`;

        const result = await model.generateContent(prompt);
        const botText = result.response.text();

        const final = [...newMessages, { text: botText || "Я не зміг отримати відповідь від Gemini.", isBot: true }];
        setMessages(final);
        await saveHistory(final);
      } catch (e) {
        const final = [...newMessages, { text: `Помилка Gemini: ${e.message}. Перевірте ключ або підключення.`, isBot: true }];
        setMessages(final);
        await saveHistory(final);
      } finally {
        setIsAiLoading(false);
        setStatus("");
      }
    } else if (selectedModel === "openai-personal" || selectedModel === "groq-personal") {
      const isOAI = selectedModel === "openai-personal";
      const key = isOAI ? openaiApiKey : groqApiKey;
      const endpoint = isOAI ? "https://api.openai.com/v1/chat/completions" : "https://api.groq.com/openai/v1/chat/completions";
      const modelName = isOAI ? "gpt-4o-mini" : "llama-3.3-70b-versatile";

      if (!key) {
        const errFinal = [...newMessages, { text: `Будь ласка, введіть ваш API-ключ ${isOAI ? 'OpenAI' : 'Groq'} у налаштуваннях (кнопка 🔑).`, isBot: true }];
        setMessages(errFinal);
        setIsAiLoading(false);
        return;
      }

      try {
        setStatus(`З'єднання з ${isOAI ? 'OpenAI' : 'Groq'}...`);
        const total = songAiKnowledge.length;
        const songsSummary = songAiKnowledge.map(s => {
          const dur = s.duration ? `${Math.floor(s.duration / 60)}:${(s.duration % 60).toString().padStart(2, '0')}` : "невідома";
          const yt = s.YouTube ? ` [YouTube: ${s.YouTube}]` : "";
          return `${s.author} (${dur})${yt}`;
        }).join(", ");

        const durationText = track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : "невідома";
        const lyricsInfo = track.lyrics && Array.isArray(track.lyrics) ? track.lyrics.map(l => `${l.time}с: ${l.text || ''}`).join("; ") : "відсутній";
        const filtersInfo = track.filters && Array.isArray(track.filters) ? track.filters.map(f => `${f.start}-${f.end}с: ${f.type}`).join("; ") : "відсутні";

        const lengthInstruction = responseLength === "detailed" ? "Відповідай максимально докладно." : "Відповідай максимально стисло.";
        const systemContext = `Ти помічник проекту "Стихія". Всього пісень: ${total}. Список: ${songsSummary}. Користувач слухає: ${track.author}, тривалість: ${durationText}. Текст: ${lyricsInfo}. Ефекти: ${filtersInfo}. ${lengthInstruction} Відповідай українською.`;

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: "system", content: systemContext },
              { role: "user", content: query }
            ],
            temperature: 0.7
          })
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error?.message || "API Error");
        }

        const data = await res.json();
        const botText = data.choices[0]?.message?.content;

        const final = [...newMessages, { text: botText || "Я не зміг отримати відповідь.", isBot: true }];
        setMessages(final);
        await saveHistory(final);
      } catch (e) {
        const final = [...newMessages, { text: `Помилка ${isOAI ? 'OpenAI' : 'Groq'}: ${e.message}`, isBot: true }];
        setMessages(final);
        await saveHistory(final);
      } finally {
        setIsAiLoading(false);
        setStatus("");
      }
    } else {
      // 3. Генерація через Transformers (запасний план)
      try {
        setStatus("Завантаження інтелекту...");
        if (!generator.current || currentModelRef.current !== selectedModel) {
          const isWebGPUSupported = "gpu" in navigator;
          generator.current = await pipeline("text-generation", selectedModel, {
            device: isWebGPUSupported ? "webgpu" : "cpu",
            dtype: isWebGPUSupported ? "q4" : "fp32",
          });
          currentModelRef.current = selectedModel;
        }
        setStatus(navigator.gpu ? "Обробка (WebGPU)..." : "Обробка запиту...");
        const durationText = track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : "unknown";
        const prompt = `Context: Author is ${track.author}, category ${track.category}, duration ${durationText}. Question: ${query}. Answer in Ukrainian briefly:`; // Define prompt here

        const result = await generator.current(prompt, {
          max_new_tokens: 60,
          do_sample: true,
          temperature: 0.1,
          callback_function: (beams) => {
            if (abortRef.current) return; // Stop streaming if aborted
            const decoded = generator.current.tokenizer.decode( // Define `decoded` here
              beams[0].output_token_ids,
              { skip_special_tokens: true },
            );
            const content = decoded.replace(prompt, "").trim();
            setStreamingText(content);
          },
        });
        
        if (!abortRef.current) { // Only update if not aborted
          setStreamingText(""); // Clear streaming text once generation is complete
          const generatedText = result[0].generated_text.replace(prompt, "").trim();
          const final = [
            ...newMessages,
            {
              text: generatedText || "Я не знаю відповіді на це питання.",
              isBot: true,
            },
          ];
          setMessages(final);
            await saveHistory(final);
        }
      } catch (e) {
        if (!abortRef.current) { // Only update if not aborted
          setStreamingText(""); // Clear streaming text on error
          
          let errorMessage = "Помилка ШІ. Спробуйте пізніше або змініть модель.";
          const errorStr = e.message?.toLowerCase() || "";

          if (errorStr.includes("webgpu")) {
            errorMessage = "Помилка WebGPU. Спробуйте обрати CPU версію моделі або оновити драйвери.";
          } else if (errorStr.includes("fetch") || errorStr.includes("network")) {
            errorMessage = "Помилка завантаження моделі. Перевірте з'єднання з інтернетом.";
          } else if (errorStr.includes("memory") || errorStr.includes("vram")) {
            errorMessage = "Недостатньо оперативної пам'яті для роботи цієї моделі. Спробуйте Qwen 1.5.";
          }

          const errMsgs = [
            ...newMessages,
          {
            text: errorMessage,
            isBot: true,
          },
          ];
          setMessages(errMsgs);
          await saveHistory(errMsgs);
        }
      } finally {
        setIsAiLoading(false);
        setStatus("");
      }
    }
  };

  const handleStop = () => {
    abortRef.current = true;
    setIsAiLoading(false);
    setStatus("Генерацію зупинено.");
    if (messages[messages.length - 1]?.text !== "Генерацію зупинено.") { // Avoid duplicate messages
      setMessages((prev) => [...prev, { text: "Генерацію зупинено.", isBot: true }]);
      saveHistory([...messages, { text: "Генерацію зупинено.", isBot: true }]);
    }
  };

  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <LyricsModalContent
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "400px", padding: 0, background: isDarkMode ? '#1e1e1e' : '#fff' }}
      >
        <div
          style={{
            padding: "15px",
            borderBottom: "1px solid #eee",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          // Add a class or id here if needed for styling or specific targeting
        > {/* Changed for dark mode */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ margin: 0, color: "black" }}>
              ✨ Помічник {track.author}
            </h4>
            <select 
              value={selectedModel} 
              onChange={(e) => changeModel(e.target.value)}
              style={{ fontSize: '10px', marginTop: '4px', border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`, borderRadius: '4px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#333' }}
            >
              <option value="gemini-personal">Google Gemini (Free)</option>
              <option value="groq-personal">Groq Llama 3 (Fast & Free)</option>
              <option value="openai-personal">OpenAI GPT-4o mini</option>
              <option value="meta-llama/Llama-3.2-3B-Instruct">Offline (Local)</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
              title="Налаштування ключа Gemini"
            >
              🔑
            </button>
            <button
              onClick={async () => {
                if (window.confirm("Очистити історію чату для цієї пісні?")) {
                  abortRef.current = true; // Abort any ongoing generation
                  setIsAiLoading(false);
                  setStatus("");
                  // setStreamingText(""); // Removed as streamingText is no longer used
                  setMessages([{ text: "Історію очищено.", isBot: true }]);
                  await localforage.removeItem(`song_ai_history_${track.id}`);
                }
              }}
              style={{ color: isDarkMode ? '#aaa' : '#333', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
              title="Очистити чат"
            >
              🗑️
            </button>
            {isAiLoading && (
              <button
                onClick={handleStop}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                title="Зупинити генерацію"
              >
                🛑
              </button>
            )}
            <LyricsCloseButton style={{ color: isDarkMode ? '#fff' : '#333' }} onClick={onClose}>&times;</LyricsCloseButton>
          </div>
        </div>
        
        <AnimatePresence>
          {showKeyInput && (
            <motion.div 
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              style={{ padding: '10px', background: isDarkMode ? '#252525' : '#fff9e6', borderBottom: `1px solid ${isDarkMode ? '#444' : '#eee'}`, overflow: 'hidden' }}
            > {/* Changed for dark mode */}
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: isDarkMode ? '#aaa' : '#666' }}>Gemini Key:</label>
                <input type="password" value={personalApiKey} onChange={(e) => saveKeys("gemini", e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '11px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: '1px solid #555' }} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: isDarkMode ? '#aaa' : '#666' }}>Модель Gemini:</label>
                <select
                  value={geminiModel}
                  onChange={(e) => saveGeminiModel(e.target.value)}
                  style={{ width: '100%', padding: '4px', fontSize: '11px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: `1px solid ${isDarkMode ? '#555' : '#ccc'}` }}
                >
                  <option value="gemini-2.5-flash">1.5 Flash (Швидка)</option>
                  <option value="gemini-2.5-pro">1.5 Pro (Розумна)</option>
                </select>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: isDarkMode ? '#aaa' : '#666' }}>
                  Groq Key: {groqKeyStatus === "valid" ? "✅" : groqKeyStatus === "invalid" ? "❌" : ""}
                </label>
                <input type="password" value={groqApiKey} onChange={(e) => saveKeys("groq", e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '11px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: groqKeyStatus === 'invalid' ? '1px solid red' : `1px solid ${isDarkMode ? '#555' : '#ccc'}` }} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '10px', color: isDarkMode ? '#aaa' : '#666' }}>OpenAI Key:</label>
                <input type="password" value={openaiApiKey} onChange={(e) => saveKeys("openai", e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '11px', background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: `1px solid ${isDarkMode ? '#555' : '#ccc'}` }} />
              </div>
              <p style={{ fontSize: '8px', color: '#888', textAlign: 'center' }}>
                ℹ️ Ключі зберігаються лише у вашому браузері.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px', justifyContent: 'center' }}>
                <label style={{ fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <input type="radio" name="length" checked={responseLength === 'concise'} onChange={() => setResponseLength('concise')} />
                  Стисло
                </label>
                <label style={{ fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <input type="radio" name="length" checked={responseLength === 'detailed'} onChange={() => setResponseLength('detailed')} />
                  Докладно
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AiChatContainer $isDarkMode={isDarkMode}>
          <MessageList ref={scrollRef} $isDarkMode={isDarkMode}>
            {messages.map((m, i) => (
              <Message key={i} $isUser={!m.isBot} $isDarkMode={isDarkMode}>
                {renderTextWithLinks(m.text)}
              </Message>
            ))}
            {streamingText && (
              <Message $isUser={false}>{renderTextWithLinks(streamingText)}</Message>
            )}
            {isAiLoading && (
              <div style={{ fontSize: "10px", color: "#999" }}>{status}</div>
            )}
          </MessageList>
          <ChatInputRow $isDarkMode={isDarkMode}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Напишіть запитання..."
              $isDarkMode={isDarkMode}
              disabled={isAiLoading}
            />
            <button onClick={handleSend} disabled={isAiLoading}>
              ➤
            </button>
          </ChatInputRow>
        </AiChatContainer>
      </LyricsModalContent>
    </ModalOverlay>
  );
};

const LyricsViewer = ({ lyrics, currentTime, voiceActingMode, trackText }) => {
  const activeLineIndex = useMemo(() => {
    if (!Array.isArray(lyrics)) return -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return -1;
  }, [lyrics, currentTime]);

  if (!Array.isArray(lyrics)) {
    return <>{lyrics || trackText || "Текст відсутній."}</>;
  }
/* Changed for dark mode */
  return (
    <div>
      {lyrics.map((line, index) => (
        <LyricsLine key={index} $active={index === activeLineIndex}>
          {voiceActingMode === "bbkids" && line.text_bbkids
            ? line.text_bbkids
            : line.text}
        </LyricsLine>
      ))}
    </div>
  );
};

const FullScreenPlayer = ({
  track,
  onClose,
  onNext,
  onPrev,
  rating,
  onRate,
  isShuffle,
  onSetShuffle,
  onAudioBar,
  onMiniPlayer,
  onOpenAi,
  onOpenSocial,
  user,
  playlist,
  onSelectTrack,
  checkpoint,
  onSaveCheckpoint,
  onClearCheckpoint,
  checkpointsEnabled,
  onToggleCheckpoints,
  backgroundMode,
  onToggleBackgroundMode,
  onUpdateUser,
  isDarkMode, // Added isDarkMode prop
}) => {
  const isDinofroz = !!track.video;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(track.initialTime || 0);
  const [buffered, setBuffered] = useState(0);
  const [videoFrames, setVideoFrames] = useState([]);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [showFramesGallery, setShowFramesGallery] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [framesCount, setFramesCount] = useState(60);

  const [duration, setDuration] = useState(0);

  const timeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(":");
    if (parts.length === 2) {
      const m = parseInt(parts[0], 10) || 0;
      const s = parseInt(parts[1], 10) || 0;
      return m * 60 + s;
    }
    return parseInt(timeStr, 10) || 0;
  };

  const secondsToTime = (secs) => {
    const m = Math.floor(secs / 60) || 0;
    const s = Math.floor(secs % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const [frameStartStr, setFrameStartStr] = useState("0:00");
  const [frameEndStr, setFrameEndStr] = useState("0:00");

  const isStartInvalid = useMemo(() => timeToSeconds(frameStartStr) > duration, [frameStartStr, duration]);
  const isEndInvalid = useMemo(() => timeToSeconds(frameEndStr) > duration, [frameEndStr, duration]);

  const handleResetFrames = () => {
    setFrameStartStr("0:00");
    setFrameEndStr(secondsToTime(duration));
  };

  const [isFullscreenNative, setIsFullscreenNative] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [seekForwardAmount, setSeekForwardAmount] = useState(10);
  const [seekBackwardAmount, setSeekBackwardAmount] = useState(10);
  const [activeSeekIndicator, setActiveSeekIndicator] = useState(null);

  const handleError = useCallback(() => {
    alert("Помилка завантаження медіа. Спробуйте ще раз.");
    setIsPlaying(false);
    mediaRef.current?.pause();
  }, []);

  const updateProgress = useCallback(() => {
    const media = mediaRef.current;
    if (media && media.buffered.length > 0) {
      setBuffered(media.buffered.end(media.buffered.length - 1));
    }
  }, []);

  const [isSeekLoaded, setIsSeekLoaded] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadVolume = async () => {
      try {
        const savedVolume = await localforage.getItem("player_volume");
        if (savedVolume !== null) setVolume(savedVolume);
      } catch (e) {
        console.error("Error loading volume:", e);
      }
    };
    loadVolume();
  }, []);

  useEffect(() => {
    if (isAssetsLoaded) {
      localforage.setItem("player_volume", volume);
    }
  }, [volume, isAssetsLoaded]);

  // Функція для перемикання системного повноекранного режиму
  const toggleFullscreen = useCallback(() => {
    const elem = overlayRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }, []);

  // Слідкуємо за зміною стану повноекранного режиму (наприклад, при натисканні F11)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreenNative(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const [longPressSpeedIndicator, setLongPressSpeedIndicator] = useState(null); // Changed from dynamicSpeed to longPressSpeedIndicator
  const longPressTimerRef = useRef(null);
  const originalSpeedRef = useRef(null);
  const lastClickRef = useRef({ time: 0, side: null });
  const currentInteractionSideRef = useRef(null); // Додано для зберігання сторони взаємодії

  useEffect(() => {
    const loadSeekSettings = async () => {
      try {
        const fwd = await localforage.getItem("seekForwardAmount");
        const bwd = await localforage.getItem("seekBackwardAmount");
        if (fwd !== null) setSeekForwardAmount(fwd);
        if (bwd !== null) setSeekBackwardAmount(bwd);
        setIsSeekLoaded(true);
      } catch (e) {
        console.error(e);
        setIsSeekLoaded(true);
      }
    };
    loadSeekSettings();
  }, []);

  useEffect(() => {
    if (isSeekLoaded) {
      localforage.setItem("seekForwardAmount", seekForwardAmount);
      localforage.setItem("seekBackwardAmount", seekBackwardAmount);
    }
  }, [seekForwardAmount, seekBackwardAmount, isSeekLoaded]);

  const triggerIndicator = useCallback((side, amount) => {
    setActiveSeekIndicator({ side, amount, key: Date.now() });
    setTimeout(() => setActiveSeekIndicator(null), 800);
  }, []);

  const [showSettings, setShowSettings] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showScreenshotMenu, setShowScreenshotMenu] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialTargetTrack, setSocialTargetTrack] = useState(null);
  const [socialStats, setSocialStats] = useState(getInitialCommentStats());
  const [socialComments, setSocialComments] = useState([]);
  const [socialGlobalComments, setSocialGlobalComments] = useState([]);
  const [socialGlobalCommentCount, setSocialGlobalCommentCount] = useState(0);
  const [socialCommentText, setSocialCommentText] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialAuthUser, setSocialAuthUser] = useState(null);
  const [socialCommentQuotaUsed, setSocialCommentQuotaUsed] = useState(0);
  const [socialCommentError, setSocialCommentError] = useState("");
  const [socialReactionState, setSocialReactionState] = useState(0);
  const [socialCommentCount, setSocialCommentCount] = useState(0);
  const activeSocialTrack = socialTargetTrack || track;
    // Normalize various shapes into a consistent social target object
    const toSocialTarget = (t) => {
      if (!t) return null;
      if (typeof t === "string") return { id: String(t), author: "", text: "", isGeneral: String(t) === "general" };
      const id = t.id || t.trackId || (t && t.id === 0 ? 0 : undefined);
      if (id !== undefined) return { ...t, id: String(id), isGeneral: t.isGeneral || String(id) === "general" };
      return { id: String(t), author: t.author || "", text: t.text || "", isGeneral: false };
    };

    const getAvatarSrc = (a) => {
      if (!a) return null;
      if (typeof a === "string") return a;
      if (typeof a === "object") return a.default || a.url || null;
      return null;
    };


  const getSocialQuotaKey = useCallback((trackId, currentUser) => {
    const day = new Date().toISOString().slice(0, 10);
    const uid = currentUser?.uid || currentUser?.id || currentUser?.account || "guest";
    return `music_comment_quota_${trackId}_${uid}_${day}`;
  }, []);
  const [loop, setLoop] = useState(false);
  const [progressMode, setProgressMode] = useState("linear");
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [downloadRange, setDownloadRange] = useState({ start: 0, end: 0 });
  const [showControls, setShowControls] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [playMode, setPlayMode] = useState(0); // 0: Linear, 1: Shuffle, 2: Loop, 3: None
  const [hoverTime, setHoverTime] = useState(null);
  const [pendingScreenshotAction, setPendingScreenshotAction] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeFilterKey, setActiveFilterKey] = useState(null);
  const [filtersEnabled, setFiltersEnabled] = useState(true); // Режим вимкнення фільтрів
  const [dynamicOpacity, setDynamicOpacity] = useState(null);
  const [dynamicBlur, setDynamicBlur] = useState(null);
  const [dynamicColor, setDynamicColor] = useState(null);
  const [dynamicIntensity, setDynamicIntensity] = useState(null); // Changed from dynamicIntensity to dynamicSymbolIntensity
  const mediaRef = useRef(null);
  const [waveform, setWaveform] = useState([]);
  const [videoQuality, setVideoQuality] = useState("768з");

  useEffect(() => {
    const loadQuality = async () => {
      try {
        const q = await localforage.getItem("video_quality");
        if (q) setVideoQuality(q);
      } catch (e) {
        console.error(e);
      }
    };
    loadQuality();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setSocialAuthUser({
          uid: firebaseUser.uid,
          account: firebaseUser.email || "",
          firstName: firebaseUser.displayName || firebaseUser.email || "Користувач",
          avatar: firebaseUser.photoURL || "",
          email: firebaseUser.email || "",
        });
      } else {
        setSocialAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showSocialModal || !activeSocialTrack?.id) return undefined;

    const statsRef = doc(db, "music_social_stats", String(activeSocialTrack.id));
    const commentsRef = query(
      collection(db, "music_social_comments"),
      where("trackId", "==", String(activeSocialTrack.id)),
      orderBy("createdAt", "desc"),
      limit(MAX_TOTAL_COMMENTS),
    );
    const globalCommentsRef = query(
      collection(db, "music_social_comments"),
      orderBy("createdAt", "desc"),
      limit(MAX_TOTAL_COMMENTS * 10),
    );

    const unsubscribeStats = onSnapshot(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSocialStats({
          views: data.views || 0,
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          comments: data.comments || 0,
        });
      } else {
        setSocialStats(getInitialCommentStats());
      }
    });

    const unsubscribeComments = onSnapshot(commentsRef, (snapshot) => {
      const next = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setSocialComments(next);
      setSocialCommentCount(next.length);
    });

    const unsubscribeGlobalComments = onSnapshot(globalCommentsRef, (snapshot) => {
      const next = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setSocialGlobalComments(next.slice(0, MAX_TOTAL_COMMENTS));
      setSocialGlobalCommentCount(next.length);
    });

    const updateView = async () => {
      try {
        const current = await getDoc(statsRef);
        const data = current.exists() ? current.data() : getInitialCommentStats();
        await setDoc(statsRef, { ...data, views: (data.views || 0) + 1 }, { merge: true });
      } catch (error) {
        console.error("Social view update failed", error);
      }
    };

    updateView();
    return () => {
      unsubscribeStats();
      unsubscribeComments();
      unsubscribeGlobalComments();
    };
  }, [showSocialModal, activeSocialTrack?.id]);

  useEffect(() => {
    if (!showSocialModal || !activeSocialTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentQuotaUsed(0);
      return;
    }
    const quotaKey = getSocialQuotaKey(String(activeSocialTrack.id), currentUser);
    localforage.getItem(quotaKey).then((value) => {
      setSocialCommentQuotaUsed(Number(value) || 0);
    }).catch(() => {
      setSocialCommentQuotaUsed(0);
    });
  }, [activeSocialTrack?.id, getSocialQuotaKey, showSocialModal, socialAuthUser, user]);

  useEffect(() => {
    if (!user?.uid && !socialAuthUser?.uid) return;
    const key = `${activeSocialTrack?.id || "track"}:${user?.uid || socialAuthUser?.uid}`;
    const savedState = localforage.getItem(key).then((value) => {
      if (value !== null) setSocialReactionState(normalizeLikeValue(value));
    }).catch(() => {});
    return () => {
      savedState.catch(() => {});
    };
  }, [socialAuthUser, activeSocialTrack?.id, user]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      setSocialAuthUser({
        uid: firebaseUser.uid,
        account: firebaseUser.email || "",
        firstName: firebaseUser.displayName || firebaseUser.email || "Користувач",
        avatar: firebaseUser.photoURL || "",
        email: firebaseUser.email || "",
      });
      setSocialCommentError("");
    } catch (error) {
      setSocialCommentError("Не вдалося увійти через Google");
      console.error(error);
    }
  }, []);

  const handleSocialCommentSubmit = useCallback(async () => {
    if (!activeSocialTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentError("Спочатку увійдіть, щоб залишити коментар");
      return;
    }

    const text = socialCommentText.trim();
    if (!text) {
      setSocialCommentError("Коментар не може бути порожнім");
      return;
    }
    if (text.length > 1000) {
      setSocialCommentError("Коментар не може перевищувати 1000 символів");
      return;
    }

    setSocialLoading(true);
    setSocialCommentError("");

    try {
      const quotaKey = getSocialQuotaKey(String(activeSocialTrack.id), currentUser);
      const storedQuota = (await localforage.getItem(quotaKey)) || 0;
      if (storedQuota >= MAX_DAILY_COMMENTS) {
        setSocialCommentError("Сьогодні ви вже використали 4 коментарі");
        setSocialLoading(false);
        return;
      }

      const payload = buildCommentPayload({
        trackId: String(activeSocialTrack.id),
        user: currentUser,
        text,
        avatar: currentUser.avatar || currentUser.photoURL || "",
        color: currentUser.borderColor || currentUser.textColor || currentUser.color || "#ffb36c",
        supporterName: currentUser.firstName || currentUser.name || currentUser.displayName || currentUser.account,
      });
      await setDoc(doc(db, "music_social_comments", payload.id), payload);
      await updateDoc(doc(db, "music_social_stats", String(activeSocialTrack.id)), {
        comments: (socialStats.comments || 0) + 1,
        updatedAt: serverTimestamp(),
      }).catch(async () => {
        await setDoc(doc(db, "music_social_stats", String(activeSocialTrack.id)), { comments: 1, likes: 0, dislikes: 0, views: 0 }, { merge: true });
      });
      await localforage.setItem(quotaKey, storedQuota + 1);
      setSocialCommentQuotaUsed(storedQuota + 1);
      setSocialCommentText("");
    } catch (error) {
      console.error("Comment submit failed", error);
      setSocialCommentError("Не вдалося зберегти коментар");
    } finally {
      setSocialLoading(false);
    }
  }, [activeSocialTrack?.id, getSocialQuotaKey, socialAuthUser, socialCommentText, socialStats.comments, user]);

  const handleSocialReaction = useCallback(async (nextValue) => {
    if (!activeSocialTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentError("Увійдіть, щоб ставити реакції");
      return;
    }

    const normalized = normalizeLikeValue(nextValue);
    const reactionKey = `${String(activeSocialTrack.id)}:${currentUser.uid || currentUser.id || currentUser.account}`;
    const previous = socialReactionState;
    const statsRef = doc(db, "music_social_stats", String(activeSocialTrack.id));
    const currentState = previous === normalized ? 0 : normalized;
    setSocialReactionState(currentState);
    await localforage.setItem(reactionKey, currentState);

    try {
      const snapshot = await getDoc(statsRef);
      const data = snapshot.exists() ? snapshot.data() : getInitialCommentStats();
      const likes = (data.likes || 0) + (currentState === 1 ? 1 : previous === 1 ? -1 : 0);
      const dislikes = (data.dislikes || 0) + (currentState === -1 ? 1 : previous === -1 ? -1 : 0);
      await setDoc(statsRef, { ...data, likes, dislikes }, { merge: true });
      setSocialStats((prev) => ({ ...prev, likes, dislikes }));
    } catch (error) {
      console.error("Reaction update failed", error);
    }
  }, [activeSocialTrack?.id, socialAuthUser, socialReactionState, user]);

  useEffect(() => {
    localforage.setItem("video_quality", videoQuality);
  }, [videoQuality]);

  const handleQualityChange = (q) => {
    const currentPos = mediaRef.current
      ? mediaRef.current.currentTime
      : progress;
    setVideoQuality(q);
    // Логіка для перемикання джерела, якщо воно з'явиться в об'єкті track
    if (mediaRef.current) {
      mediaRef.current.load();
      mediaRef.current.currentTime = currentPos;
      if (isPlaying) mediaRef.current.play().catch(() => {});
    }
  };

  const [isGeneratingWave, setIsGeneratingWave] = useState(false);
  const [isAutoSlideshow, setIsAutoSlideshow] = useState(false);
  const [autoSlideshowInterval, setAutoSlideshowInterval] = useState(3);
  //  const [selectedVoiceNarration, setSelectedVoiceNarration] = useState("off");
  const fsCanvasRef = useRef(null);
  const fsPipVideoRef = useRef(null);
  const lastActionRef = useRef(0);
  const ACTION_COOLDOWN = 300;
  const canPerformAction = useCallback(() => {
    const now = Date.now();
    if (now - lastActionRef.current < ACTION_COOLDOWN) return false;
    lastActionRef.current = now;
    return true;
  }, []);
  const togglePiP = useCallback(async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (mediaRef.current && isDinofroz) {
        await mediaRef.current.requestPictureInPicture();
        return;
      }

      let elementToPip;
      if (isDinofroz && mediaRef.current) {
        elementToPip = mediaRef.current;
      } else if (fsCanvasRef.current && fsPipVideoRef.current) {
        const stream = fsCanvasRef.current.captureStream(30);
        fsPipVideoRef.current.srcObject = stream;
        await fsPipVideoRef.current.play();
        elementToPip = fsPipVideoRef.current;
      }

      if (elementToPip && elementToPip.requestPictureInPicture) {
        await elementToPip.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP failed", error);
    }
  }, [isDinofroz]);
  const previewVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const activeFilters = useMemo(() => {
    if (!track.filters || !Array.isArray(track.filters)) return [];
    return track.filters.filter(
      (f) => progress >= f.start && progress <= f.end,
    );
  }, [track.filters, progress]);
  const mainFilter = useMemo(
    () => activeFilters.find((f) => !["symbols", "flicker"].includes(f.type)),
    [activeFilters],
  );
  const flickerFilter = useMemo(
    () => activeFilters.find((f) => f.type === "flicker"),
    [activeFilters],
  ); // Added filtersEnabled to dependencies
  const hasSymbols = useMemo(
    () => activeFilters.some((f) => f.type === "symbols"),
    [activeFilters],
  );
  useEffect(() => {
    if (filtersEnabled && mainFilter) {
      const key = `${mainFilter.start}-${mainFilter.end}`;
      if (key !== activeFilterKey) {
        setActiveFilterKey(key);
        if (mainFilter.isRandom) {
          const min = mainFilter.minOpacity || 0.15;
          const max = mainFilter.maxOpacity || 0.45;
          setDynamicOpacity(Math.random() * (max - min) + min);
        } else {
          setDynamicOpacity(null);
        }

        if (mainFilter.isRandomBlur) {
          const min = mainFilter.minBlur || 0;
          const max = mainFilter.maxBlur || 10;
          setDynamicBlur(Math.random() * (max - min) + min);
        } else {
          setDynamicBlur(null);
        }
        if (mainFilter.randomColor && mainFilter.colorOptions?.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * mainFilter.colorOptions.length,
          );
          setDynamicColor(mainFilter.colorOptions[randomIndex]);
        } else {
          setDynamicColor(null);
        }
      }
    } else {
      setActiveFilterKey(null);
      setDynamicOpacity(null);
      setDynamicBlur(null);
      setDynamicColor(null);
    }
  }, [mainFilter, activeFilterKey, filtersEnabled]);
  const [dynamicBlurSymbols] = useState(0);
  useEffect(() => {
    if (!filtersEnabled || progressMode !== "stereogram" || !isAssetsLoaded)
      return; // Added filtersEnabled
    if (!filtersEnabled || progressMode !== "stereogram" || !isAssetsLoaded)
      return; // Added filtersEnabled to dependencies
    let isCancelled = false;
    const generateWave = async () => {
      setIsGeneratingWave(true);
      try {
        const url = isDinofroz ? track.video || dinofrozVideo : track.audio;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        if (isCancelled) return;
        const rawData = audioBuffer.getChannelData(0);
        const samples = 280;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];

        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }

        const multiplier = Math.pow(Math.max(...filteredData), -1);
        setWaveform(filteredData.map((n) => n * multiplier));
      } catch (err) {
        console.error("Waveform generation failed", err);
      } finally {
        setIsGeneratingWave(false);
      }
    };

    generateWave();
    return () => {
      isCancelled = true;
    };
  }, [
    track.id,
    track.audio,
    track.video,
    progressMode,
    isAssetsLoaded,
    isDinofroz,
    filtersEnabled,
  ]);

  // Обчислення фільтра (перенесено нижче оголошення mainFilter для уникнення ReferenceError)
  const mediaFilter = useMemo(() => {
    if (!filtersEnabled || !mainFilter) return "none";
    let filters = [];

    if (mainFilter.type === "grayscale" || mainFilter.grayscale)
      filters.push("grayscale(100%)");

    const blurVal =
      dynamicBlur !== null
        ? dynamicBlur
        : mainFilter.type === "blur"
          ? mainFilter.opacity * 10
          : mainFilter.blur || 0;
    if (blurVal > 0) filters.push(`blur(${blurVal}px)`);

    if (mainFilter.type === "contrast") {
      const contrastVal =
        (dynamicOpacity !== null ? dynamicOpacity : mainFilter.opacity) * 2;
      filters.push(`contrast(${contrastVal})`);
    }

    if (mainFilter.type === "negative") filters.push("invert(100%)");
    if (mainFilter.type === "vintage") filters.push("sepia(0.8) contrast(1.2)");

    return filters.join(" ") || "none";
  }, [mainFilter, filtersEnabled, dynamicBlur, dynamicOpacity]);

  const lastSymbolFilter = useMemo(
    () =>
      filtersEnabled
        ? [...activeFilters].reverse().find((f) => f.type === "symbols")
        : null, // Added filtersEnabled
    [activeFilters, filtersEnabled],
  );
  const [activeSymbols, setActiveSymbols] = useState(null);
  const [shouldRenderSymbols, setShouldRenderSymbols] = useState(false);
  const [isSymbolsExiting, setIsSymbolsExiting] = useState(false);
  const [activeSymbolKey, setActiveSymbolKey] = useState(0);
  const [dynamicSpeed, setDynamicSpeed] = useState(5); // Changed from dynamicSpeed to dynamicSymbolSpeed
  useEffect(() => {
    // This useEffect will be modified to respect filtersEnabled
    if (filtersEnabled && lastSymbolFilter) {
      const key = `${lastSymbolFilter.start}-${lastSymbolFilter.end}`;
      if (key !== activeSymbolKey || isSymbolsExiting) {
        setActiveSymbolKey(key);
        setActiveSymbols(lastSymbolFilter);
        setShouldRenderSymbols(true);
        setIsSymbolsExiting(false);

        if (lastSymbolFilter.isRandomIntensity) {
          const min = lastSymbolFilter.minIntensity || 50;
          const max = lastSymbolFilter.maxIntensity || 200;
          setDynamicIntensity(
            Math.floor(Math.random() * (max - min + 1)) + min,
          );
        } else {
          setDynamicIntensity(null);
        } // Changed from dynamicIntensity to dynamicSymbolIntensity

        if (lastSymbolFilter.isRandomSpeed) {
          const min = lastSymbolFilter.minSpeed || 1;
          const max = lastSymbolFilter.maxSpeed || 5;
          setDynamicSpeed(Math.random() * (max - min) + min);
        } else {
          setDynamicSpeed(null);
        } // Changed from dynamicSpeed to dynamicSymbolSpeed
      }
    } else if (shouldRenderSymbols && !isSymbolsExiting) {
      setIsSymbolsExiting(true);
      const timer = setTimeout(() => {
        setShouldRenderSymbols(false);
        setIsSymbolsExiting(false);
        setActiveSymbols(null);
        setActiveSymbolKey(null);
        setDynamicIntensity(null); // Changed from dynamicIntensity to dynamicSymbolIntensity
        setDynamicSpeed(null);
      }, 1000);
      return () => clearTimeout(timer);
    } // Removed the activeSymbolKey check, filtersEnabled is the main gate
  }, [
    lastSymbolFilter,
    filtersEnabled,
    shouldRenderSymbols,
    isSymbolsExiting,
    activeSymbolKey,
  ]); // Added filtersEnabled to dependencies

  const sliderImages = useMemo(() => {
    // This useMemo will be modified to respect filtersEnabled
    if (track.images && track.images.length > 0) {
      if (
        track.images[0] &&
        typeof track.images[0] === "object" &&
        "image" in track.images[0]
      ) {
        return track.images.map((item) => item.image);
      }
      return track.images;
    }
    return [track.image];
  }, [track]); // No direct change needed here, but its usage will be conditional

  const handleClose = useCallback(() => {
    if (onSaveCheckpoint && progress > 5 && progress < duration - 5) {
      onSaveCheckpoint(track.id, progress);
    }
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, onSaveCheckpoint, track.id, progress, duration]);

  const progressRef = useRef(progress);
  const durationRef = useRef(duration);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (
        onSaveCheckpoint &&
        progressRef.current > 5 &&
        progressRef.current < durationRef.current - 5
      ) {
        onSaveCheckpoint(track.id, progressRef.current);
      }
    };

    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (
      checkpointsEnabled &&
      checkpoint &&
      Math.abs(progress - checkpoint) < 1.5
    ) {
      onClearCheckpoint(track.id);
    }
  }, [progress, checkpoint, track.id, checkpointsEnabled, onClearCheckpoint]);

  const togglePlay = useCallback(() => {
    if (!mediaRef.current) return;
    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setIsPlaying(true);
    } else {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    setIsAssetsLoaded(false);
    setLoadingProgress(0);
    setIsPlaying(false);
    setFrameStartStr("0:00");

    const preloadAssets = async () => {
      const urlsToLoad = new Set();

      if (isDinofroz) {
        if (track.video) urlsToLoad.add(track.video);
        if (track.image) urlsToLoad.add(track.image);
      } else {
        if (track.audio) urlsToLoad.add(track.audio);
        sliderImages.forEach((img) => urlsToLoad.add(img));
      }

      const urlsArray = Array.from(urlsToLoad);
      if (urlsArray.length === 0) {
        setIsAssetsLoaded(true);
        return;
      }

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
            updateProgress();
          }),
      );

      await Promise.all(promises);

      setTimeout(() => {
        setIsAssetsLoaded(true);
      }, 500);
    };

    preloadAssets();
  }, [track, isDinofroz, sliderImages, track.audio, track.video]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setProgress(media.currentTime);
    const updateDur = () => {
      if (!mediaRef.current) return;
      const dur = mediaRef.current.duration;
      setDuration(dur);
      setDownloadRange((prev) => ({
        ...prev,
        end: Math.floor(dur),
      }));
      setFrameEndStr(secondsToTime(dur));
    };

    const handleEnded = () => {
      if (playMode === 2) return; // Браузер сам зациклить через атрибут loop
      if (playMode === 0 || playMode === 1) {
        if (canPerformAction()) onNext();
      } else {
        // Режим 3: "Без режиму" - зупиняємось
        setIsPlaying(false);
        if (mediaRef.current) mediaRef.current.currentTime = 0;
      }
    };
    const handleErrorEvent = () => handleError();

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("progress", updateProgress);
    media.addEventListener("loadedmetadata", updateDur);
    media.addEventListener("ended", handleEnded);
    media.addEventListener("error", handleErrorEvent);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("progress", updateProgress);
      media.removeEventListener("loadedmetadata", updateDur);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("error", handleErrorEvent);
    };
  }, [
    track,
    loop,
    handleError,
    updateProgress,
    playMode,
    onNext,
    canPerformAction,
  ]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      mediaRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  useEffect(() => {
    if ("mediaSession" in navigator && track) {
      const artwork = track.image ? [{ src: track.image, sizes: "512x512", type: "image/webp" }] : [];
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: track.text || track.author || "Стихія",
        artist: track.author || "Stykhiya",
        album: track.category || "Music",
        artwork: artwork,
      });

      navigator.mediaSession.setActionHandler("play", togglePlay);
      navigator.mediaSession.setActionHandler("pause", togglePlay);
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (canPerformAction()) onPrev();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (canPerformAction()) onNext();
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        if (mediaRef.current) {
          mediaRef.current.currentTime = Math.max(
            0,
            mediaRef.current.currentTime - seekBackwardAmount,
          );
        }
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        if (mediaRef.current) {
          mediaRef.current.currentTime = Math.min(
            mediaRef.current.duration,
            mediaRef.current.currentTime + seekForwardAmount,
          );
        }
      });
    }
  }, [
    track,
    onNext,
    onPrev,
    togglePlay,
    seekForwardAmount,
    seekBackwardAmount,
    canPerformAction,
  ]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  const generateFrames = async () => {
    if (!track.video || isGeneratingFrames) return;
    setIsGeneratingFrames(true);
    setVideoFrames([]);
    const tempVideo = document.createElement("video");

    // Використовуємо той самий URL, що і в плеєрі
    tempVideo.src = track.video;
    tempVideo.muted = true;
    tempVideo.crossOrigin = "anonymous";
    tempVideo.preload = "auto";

    try {
      await new Promise((resolve, reject) => {
        tempVideo.onloadedmetadata = resolve;
        tempVideo.onerror = () => reject(new Error("Video load error"));
        setTimeout(() => reject(new Error("Timeout")), 15000);
      });

      const startTime = timeToSeconds(frameStartStr);
      const endTime = Math.min(timeToSeconds(frameEndStr), tempVideo.duration);
      const range = endTime - startTime;

      if (range <= 0) {
        alert("Помилка: Початковий час не може бути пізніше або дорівнювати кінцевому!");
        setIsGeneratingFrames(false);
        return;
      }

      const interval = range / framesCount;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const frames = [];

      for (let i = 0; i < framesCount; i++) {
        tempVideo.currentTime = startTime + i * interval;
        await new Promise((resolve) => {
          tempVideo.onseeked = resolve;
        });

        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL("image/jpeg", 0.7));
        setLoadingProgress(Math.round(((i + 1) / framesCount) * 100));
      }
      setVideoFrames(frames);
      setShowFramesGallery(true);
    } catch (err) {
      console.error("Frame generation failed", err);
      alert("Помилка при створенні кадрів. Перевірте з'єднання.");
    } finally {
      setIsGeneratingFrames(false);
      setLoadingProgress(0);
    }
  };

  const handleWheel = useCallback((e) => {
    const delta = Math.sign(e.deltaY) * -1;

    if (e.shiftKey) {
      setSpeed((prev) =>
        Math.max(0.2, Math.min(2.0, +(prev + delta * 0.1).toFixed(1))),
      );
    } else if (e.ctrlKey || e.altKey) {
      setSeekForwardAmount((prev) =>
        Math.max(5, Math.min(30, prev + delta * 5)),
      );
      setSeekBackwardAmount((prev) =>
        Math.max(5, Math.min(30, prev + delta * 5)),
      );
    } else {
      setVolume((prev) =>
        Math.max(0, Math.min(1, +(prev + delta * 0.05).toFixed(2))),
      );
    }
  }, []);
  const togglePlayMode = () => {
    const nextMode = (playMode + 1) % 4;
    setPlayMode(nextMode);
    if (nextMode === 0) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(false);
    } else if (nextMode === 1) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(true);
    } else if (nextMode === 2) {
      setLoop(true);
    } else if (nextMode === 3) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(false);
    }
  };
  useEffect(() => {
    if (playMode === 1 && !isShuffle && onSetShuffle) onSetShuffle(true);
  }, [playMode, isShuffle, onSetShuffle]);
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    window.addEventListener("mousemove", resetControlsTimeout);
    window.addEventListener("touchstart", resetControlsTimeout);
    window.addEventListener("touchmove", resetControlsTimeout);
    return () => {
      window.removeEventListener("mousemove", resetControlsTimeout);
      window.removeEventListener("touchstart", resetControlsTimeout);
      window.removeEventListener("touchmove", resetControlsTimeout);
    };
  }, [resetControlsTimeout]);
  const currentLyric = useMemo(() => {
    if (!Array.isArray(track.lyrics)) return null;
    let active = null;
    const mode = user?.voiceActingMode || "malyatko";
    if (mode === "off") return null;

    for (let i = 0; i < track.lyrics.length; i++) {
      if (progress >= track.lyrics[i].time) {
        const line = track.lyrics[i];
        active =
          mode === "bbkids" && line.text_bbkids ? line.text_bbkids : line.text;
      } else {
        break;
      }
    }
    return active;
  }, [track.lyrics, progress, user?.voiceActingMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ігнорувати гарячі клавіші, якщо користувач пише в полі введення
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }
      if (isLocked && e.code !== "Escape") return;

      resetControlsTimeout();
      if (e.code === "Escape") handleClose();

      if (e.code === "Space") {
        e.preventDefault();
      }

      if (!mediaRef.current) return;
      if (e.code === "Space" && canPerformAction()) {
        togglePlay();
      } else if (e.code === "ArrowRight") {
        const amount = seekForwardAmount;
        mediaRef.current.currentTime = Math.min(
          mediaRef.current.duration,
          mediaRef.current.currentTime + amount,
        );
        triggerIndicator("right", amount);
      } else if (e.code === "ArrowLeft") {
        const amount = seekBackwardAmount;
        mediaRef.current.currentTime = Math.max(
          0,
          mediaRef.current.currentTime - amount,
        );
        triggerIndicator("left", amount);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleClose,
    togglePlay,
    resetControlsTimeout,
    isLocked,
    canPerformAction,
    seekForwardAmount,
    seekBackwardAmount,
    triggerIndicator,
  ]);

  useEffect(() => {
    if (isDinofroz || !duration || sliderImages.length === 0) return;

    const segmentDuration = duration / sliderImages.length;
    if (segmentDuration <= 0) return;

    const idx = Math.min(
      Math.floor(progress / segmentDuration),
      sliderImages.length - 1,
    );
    if (idx !== currentImgIdx) setCurrentImgIdx(idx);
  }, [progress, duration, sliderImages.length, isDinofroz, currentImgIdx]);

  // Завантаження та збереження режиму слайд-шоу в localStorage
  useEffect(() => {
    const loadSlideshowMode = async () => {
      try {
        const saved = await localforage.getItem(`slideshow_${track.id}`);
        if (saved !== null) {
          setIsAutoSlideshow(saved.isEnabled || false);
          setAutoSlideshowInterval(saved.interval || 3);
        }
      } catch (e) {
        console.error("Помилка завантаження режиму слайд-шоу:", e);
      }
    };
    loadSlideshowMode();
  }, [track.id]);

  // Збереження режиму слайд-шоу в localStorage при зміні
  useEffect(() => {
    const saveSlideshowMode = async () => {
      try {
        await localforage.setItem(`slideshow_${track.id}`, {
          isEnabled: isAutoSlideshow,
          interval: autoSlideshowInterval,
        });
      } catch (e) {
        console.error("Помилка збереження режиму слайд-шоу:", e);
      }
    };
    saveSlideshowMode();
  }, [isAutoSlideshow, autoSlideshowInterval, track.id]);

  // Управління інтервалом для автоматичного переключення зображень
  useEffect(() => {
    if (!isAutoSlideshow || sliderImages.length === 0) return;

    const slideshowInterval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % sliderImages.length);
    }, autoSlideshowInterval * 1000);

    return () => clearInterval(slideshowInterval);
  }, [isAutoSlideshow, autoSlideshowInterval, sliderImages.length]);

  const getCroppedDataUrl = (source) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const process = (img) => {
        const w = img.videoWidth || img.naturalWidth || img.width;
        const h = img.videoHeight || img.naturalHeight || img.height;
        const cropX = w * 0.05;
        const cropY = h * 0.05;
        const cropW = w * 0.9;
        const cropH = h * 0.9;

        canvas.width = cropW;
        canvas.height = cropH;

        if (mainFilter) {
          let filterStr = "";
          if (mainFilter.type === "grayscale" || mainFilter.grayscale)
            filterStr += "grayscale(100%) ";
          if (mainFilter.type === "blur")
            filterStr += `blur(${dynamicBlur || mainFilter.opacity * 10}px) `;
          if (mainFilter.type === "contrast")
            filterStr += `contrast(${(dynamicOpacity || mainFilter.opacity) * 2}) `;
          if (mainFilter.type === "vintage")
            filterStr += "sepia(0.8) contrast(1.2) ";
          if (mainFilter.blur) filterStr += `blur(${mainFilter.blur}px) `;
          if (mainFilter.type === "negative") filterStr += "invert(100%) ";

          ctx.filter = filterStr.trim() || "none";
        }

        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        if (mainFilter) {
          const colors = {
            red: [255, 0, 0],
            purple: [128, 0, 128],
            green: [0, 255, 0],
            blue: [0, 0, 255],
            black: [0, 0, 0],
            orange: [230, 149, 0],
            cyan: [0, 255, 255],
            brown: [139, 69, 19],
            white: [255, 255, 255],
          };

          const colorType = dynamicColor || mainFilter.type;
          if (colors[colorType]) {
            const [r, g, b] = colors[colorType];
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity ?? mainFilter.opacity ?? 0.5})`;
            ctx.fillRect(0, 0, cropW, cropH);
          }
        }

        resolve(canvas.toDataURL("image/jpeg"));
      };

      if (typeof source === "string") {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => process(img);
        img.src = source;
      } else {
        process(source);
      }
    });
  };

  const downloadScreenshot = async (applyFilter = false) => {
    const source =
      isDinofroz && mediaRef.current
        ? mediaRef.current
        : sliderImages[currentImgIdx];
    const dataUrl = await getCroppedDataUrl(source, applyFilter);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `screenshot-${track.text.replace(/\s+/g, "_")}-${Date.now()}.jpg`;
    a.click();
    setShowScreenshotMenu(false);
  };

  const printScreenshot = async (applyFilter = false) => {
    const source =
      isDinofroz && mediaRef.current
        ? mediaRef.current
        : sliderImages[currentImgIdx];
    const dataUrl = await getCroppedDataUrl(source, applyFilter);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${dataUrl}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
    setShowScreenshotMenu(false);
  };

  // Функція для збереження скріншоту в базу зображень
  const saveScreenshotToGallery = async () => {
    try {
      const source =
        isDinofroz && mediaRef.current
          ? mediaRef.current
          : sliderImages[currentImgIdx];
      const dataUrl = await getCroppedDataUrl(source, false);

      // Отримуємо поточну колекцію збережених скріншотів
      let savedScreenshots =
        (await localforage.getItem("dinofroz_screenshots")) || [];

      // Додаємо новий скріншот
      const newScreenshot = {
        id: `screenshot-${Date.now()}`,
        image: dataUrl,
        trackName: track.text || "Unknown",
        timestamp: new Date().toISOString(),
      };

      savedScreenshots.push(newScreenshot);

      // Якщо перевищен ліміт 20 скріншотів, видаляємо найстаріший
      const MAX_SCREENSHOTS = 20;
      if (savedScreenshots.length > MAX_SCREENSHOTS) {
        savedScreenshots = savedScreenshots.slice(-MAX_SCREENSHOTS);
      }

      // Зберігаємо обновлену колекцію в localforage
      await localforage.setItem("dinofroz_screenshots", savedScreenshots);

      alert(
        "✅ Скріншот успішно збережено в галерею! (" +
          savedScreenshots.length +
          "/" +
          MAX_SCREENSHOTS +
          ")",
      );
      setShowScreenshotMenu(false);
    } catch (error) {
      console.error("Помилка збереження скріншоту:", error);
      alert("❌ Помилка при збереженні скріншоту");
    }
  };

  const handleDownloadImage = async (imgSrc) => {
    const dataUrl = await getCroppedDataUrl(imgSrc);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "image.jpg";
    a.click();
  };

  const handlePrintImage = async (imgSrc) => {
    const dataUrl = await getCroppedDataUrl(imgSrc);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${dataUrl}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  const handleSeekHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    setHoverTime(p * duration);

    if (isDinofroz && previewVideoRef.current && duration > 0) {
      previewVideoRef.current.currentTime = p * duration;
    }
  };
  const checkCache = useCallback(async () => {
    if ("caches" in window) {
      const cache = await caches.open("audio-cache");
      const match = await cache.match(isDinofroz ? track.video : track.audio);
      setIsCached(!!match);
    }
  }, [track, isDinofroz]);

  useEffect(() => {
    checkCache();
  }, [checkCache]);

  const toggleCache = async () => {
    if (!("caches" in window)) return;
    const cache = await caches.open("audio-cache");
    const url = isDinofroz ? track.video : track.audio;
    if (isCached) {
      await cache.delete(url);
      setIsCached(false);
    } else {
      await cache.add(url);
      setIsCached(true);
    }
  };

  const handlePrint = () => {
    const imgSrc = isDinofroz ? track.image : sliderImages[currentImgIdx];
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  const handleStereoSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    if (mediaRef.current) {
      mediaRef.current.currentTime = p * duration;
    }
  };

  const handleInteractionStart = useCallback(
    (x, width) => {
      const side =
        x < width * 0.2 ? "left" : x > width * 0.8 ? "right" : "center";
      const now = Date.now();

      // 1. Логіка подвійного кліку для перемотування
      if (
        side !== "center" &&
        side === lastClickRef.current.side &&
        now - lastClickRef.current.time < 350
      ) {
        if (mediaRef.current) {
          const amount =
            side === "left" ? seekBackwardAmount : seekForwardAmount;
          if (side === "left") {
            mediaRef.current.currentTime = Math.max(
              0,
              mediaRef.current.currentTime - amount,
            );
          } else {
            mediaRef.current.currentTime = Math.min(
              mediaRef.current.duration,
              mediaRef.current.currentTime + amount,
            );
          }
          triggerIndicator(side, amount);
        }
        // Очищуємо таймер затиснення, щоб подвійний клік не активував швидкість
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        lastClickRef.current = { time: 0, side: null };
        return;
      }

      lastClickRef.current = { time: now, side };

      // 2. Логіка тривалого затиснення для зміни швидкості
      if (side !== "center") {
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = setTimeout(() => {
          currentInteractionSideRef.current = side; // Зберігаємо сторону для довгого натискання
          if (!originalSpeedRef.current) {
            originalSpeedRef.current = speed;
          }
          const newSpeed = side === "right" ? 2 : 0.5;
          setSpeed(newSpeed);
          setLongPressSpeedIndicator(side === "right" ? "2x >>" : "<< 0.5x");
        }, 2000);
      }
      currentInteractionSideRef.current = side; // Зберігаємо сторону для будь-якої взаємодії
    },
    [speed, seekBackwardAmount, seekForwardAmount, triggerIndicator],
  );

  const handleInteractionEnd = useCallback(
    () => { // Тепер не приймає 'side' як параметр, а використовує ref
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      // Якщо було активне довге натискання, скидаємо швидкість та індикатор
      if (longPressSpeedIndicator) {
        if (originalSpeedRef.current !== null) {
          setSpeed(originalSpeedRef.current);
          originalSpeedRef.current = null;
        }
        setLongPressSpeedIndicator(null);
      } else { // Це означає, що це було коротке натискання (не довге)
        // Якщо це не було подвійне натискання для перемотування (бо handleInteractionStart повернув би раніше),
        // і не довге натискання, то це простий клік. Перемикаємо відтворення/паузу.
        togglePlay();
      }
      currentInteractionSideRef.current = null; // Очищаємо після завершення взаємодії
    },
    [longPressSpeedIndicator, togglePlay, setSpeed], // Додано setSpeed до залежностей
  );

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  useEffect(() => {
    if (isDinofroz || !fsCanvasRef.current) return;
    const canvas = fsCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sliderImages[currentImgIdx];
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillText(track.author || "Стихія", 10, canvas.height - 15);
    };
  }, [sliderImages, currentImgIdx, isDinofroz, track.author]);

  return (
    <FullScreenOverlay ref={overlayRef}
                       onMouseMove={resetControlsTimeout}
                       onClick={(e) => { /* Changed for dark mode */
                         e.stopPropagation();
                         resetControlsTimeout();
                       }}
                       $closing={isClosing}
                       onWheel={handleWheel}>
      <canvas
        ref={fsCanvasRef}
        width="640"
        height="360"
        style={{ display: "none" }}
      />
      <video
        ref={fsPipVideoRef}
        muted
        playsInline
        style={{ display: "none" }}
      />

      <FSHeader style={{ 
        opacity: (showControls && !isLocked) ? 1 : 0, 
        transition: "opacity 0.3s",
        pointerEvents: isLocked ? "none" : "auto" 
      }}>
        <div style={{ display: "flex", gap: "0px", alignItems: "center" }}> {/* Changed for dark mode */}
          <ActButton
            style={{ fontSize: "26px" }}
            onClick={() => {
              if (canPerformAction()) handleClose();
            }}
          >
            &times;
          </ActButton>
          <ActButton
            onClick={() => {
              if (canPerformAction())
                onMiniPlayer(progress, isPlaying, volume, speed);
            }}
            title="Згорнути в міні-плеєр"
          >
            🗗
          </ActButton>
          <ActButton
            onClick={() => {
              if (canPerformAction())
                onAudioBar(progress, isPlaying, volume, speed);
            }}
            title="Згорнути в аудіосмугу"
          >
            ▬
          </ActButton>
          <ActButton
            onClick={() => {
              if (canPerformAction()) togglePiP();
            }}
            title="Режим картинка в картинці"
          >
            🖼️
          </ActButton>
          <ActButton
            onClick={() => {
              if (canPerformAction()) toggleFullscreen();
            }}
            title={
              isFullscreenNative ? "Вийти з повного екрану" : "На весь екран"
            }
          >
            {isFullscreenNative ? "⏹" : "⛶"}
          </ActButton>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FSTitle>{track.author} - {track.text}</FSTitle>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <ActButton
            onClick={() => {
              if (canPerformAction()) onRate(track.id);
            }}
            title={(() => {
              if (rating === 2) return "2 бали — ❤️ Лайк";
              if (rating === 1) return "1 бал — ❤️ Лайк";
              if (rating === -1) return "💔 Дизлайк";
              return "🤍 Оцінити";
            })()}
          >
            {rating === 2 || rating === 1
              ? "❤️"
              : rating === -1
                ? "💔"
                : "🤍"}
          </ActButton>
          <ActButton
            onClick={() => setIsLocked(true)}
            title="Заблокувати екран"
          >
            🔓
          </ActButton>
          <ActButton
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("menu")
                : setShowScreenshotMenu(!showScreenshotMenu)
            }
            title="Скріншот"
          >
            📸
          </ActButton>
          <ActButton onClick={handlePrint} title="Друк">
            🖨️
          </ActButton>
          <ActButton
            onClick={() => setShowDownload(true)}
            title="Завантажити"
          >
            ⇩
          </ActButton>
          <ActButton
            onClick={() => setShowPlaylist(!showPlaylist)}
            title="Список відтворення"
          >
            📑
          </ActButton>
          <ActButton onClick={() => { setSocialTargetTrack(toSocialTarget(track)); setShowSocialModal(true); }} title="Чат та статистика">
            💬
          </ActButton>
          <ActButton onClick={() => onOpenAi(track)} title="ШІ Помічник">
            ✨
          </ActButton>
          <ActButton
            onClick={() => setShowSettings(!showSettings)}
            title="Налаштування"
          >
            ⚙️
          </ActButton>
        </div>
      </FSHeader>

      {!isAssetsLoaded && (
        <LoadingContainer>
          <div
            style={{ color: "#94fffa", fontSize: "14px", marginBottom: "5px" }}
          >
            Завантаження... {loadingProgress}%
          </div>
          <ProgressBar>
            <ProgressBarFill $progress={loadingProgress} />
          </ProgressBar>
        </LoadingContainer>
      )}

      <FSContent
        ref={containerRef}
        onMouseDown={(e) =>
          !isLocked && handleInteractionStart(e.clientX, containerRef.current.clientWidth)
        }
        onMouseUp={() => !isLocked && handleInteractionEnd()}
        onMouseLeave={() => handleInteractionEnd()}
        onTouchStart={(e) => {
          if (!isLocked) {
            resetControlsTimeout();
            handleInteractionStart(
              e.touches[0].clientX,
              containerRef.current.clientWidth,
            );
          }
        }}
        onTouchEnd={() => !isLocked && handleInteractionEnd()} // Тепер handleInteractionEnd використовує ref
      >
        <FSVisualWrapper style={{ position: "relative" }}>
          {longPressSpeedIndicator && (
            <LongPressBadge>Швидкість {longPressSpeedIndicator}</LongPressBadge>
          )}
          {activeSeekIndicator && (
            <SeekIndicator
              $side={activeSeekIndicator.side}
              key={activeSeekIndicator.key}
            >
              <div className="icon">
                {activeSeekIndicator.side === "left" ? "◀◀◀" : "▶▶▶"}
              </div>
              <div className="text">
                {activeSeekIndicator.side === "left" ? "-" : "+"}
                {activeSeekIndicator.amount}с
              </div>
            </SeekIndicator>
          )}
          <FilterOverlay
            $active={filtersEnabled && !!mainFilter}
            $type={dynamicColor || mainFilter?.type}
            $opacity={
              dynamicOpacity !== null
                ? dynamicOpacity
                : mainFilter?.opacity || 0.5
            }
            $blur={dynamicBlur !== null ? dynamicBlur : mainFilter?.blur}
            $grayscale={mainFilter?.grayscale}
            $imageUrl={mainFilter?.imageUrl}
            style={{ zIndex: 10 }}
          />

          <FilterOverlay
            $active={filtersEnabled && !!flickerFilter}
            $type="flicker"
            $opacity={flickerFilter?.opacity || 0.1}
            style={{ zIndex: 11 }}
          />
          {isDinofroz ? (
            <>
              <FSVideo
                ref={mediaRef}
                src={track.video || dinofrozVideo}
                playsInline
                loop={loop}
                onError={handleError}
                style={{
                  opacity: progress === 0 && !isPlaying ? 0 : 1,
                  filter: mediaFilter,
                }}
              />
              {progress === 0 && !isPlaying && (
                <FSImage
                  src={track.image}
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                />
              )}
            </>
          ) : (
            <>
              <FSImage
                key={currentImgIdx}
                src={sliderImages[currentImgIdx]}
                alt="Slide"
                $animate={true}
                onError={handleError}
                style={{ filter: mediaFilter }}
              />
            </>
          )}
          {shouldRenderSymbols && (
            <SymbolOverlay
              count={dynamicIntensity || activeSymbols?.intensity || 50}
              volume={volume}
              speed={dynamicSpeed || activeSymbols?.speed || 0} // Changed from dynamicSpeed to dynamicSymbolSpeed
              blur={dynamicBlurSymbols || activeSymbols?.blur || 0}
              isExiting={isSymbolsExiting}
              variation={activeSymbols?.variation}
              customSymbols={activeSymbols?.symbols || track.symbols}
            />
          )}
        </FSVisualWrapper>

        {isLocked && (
          <UnlockContainer onClick={(e) => { e.stopPropagation(); setIsLocked(false); }}>
            <span style={{ fontSize: "18px" }}>🔒</span> Натисніть для доступу
          </UnlockContainer>
        )}

        {!isPlaying && !isLocked && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 20,
              transform: "translate(-50%, -50%)",
              fontSize: "45px",
              color: "rgba(255,255,255,1)",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.7)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ▶
          </div>
        )}
      </FSContent>
      <SubtitleOverlay $show={!!currentLyric && !isLocked} $controlsVisible={showControls}>
        {currentLyric}
      </SubtitleOverlay>
      {!isDinofroz && <audio ref={mediaRef} src={track.audio} loop={loop} />}
      <FSControls
        $visible={showControls && !isLocked}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "white",
            fontSize: "12px",
          }}
        >
          <span>{formatTime(progress)}</span>
          {progressMode === "linear" ? (
            <SeekBarWrapper
              onMouseMove={handleSeekHover} /* Changed for dark mode */
              onMouseLeave={() => setHoverTime(null)}
            >
              {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
                <CheckpointMarker
                  $left={(checkpoint / duration) * 100}
                  title="Минулого разу ви зупинилися тут"
                >
                  🚩
                </CheckpointMarker>
              )}
              {hoverTime !== null && duration > 0 && (
                <SeekTooltip
                  $left={(hoverTime / duration) * 100}
                  className="seek-tooltip"
                >
                  {isDinofroz ? (
                    <video
                      ref={previewVideoRef}
                      src={track.video || dinofrozVideo}
                      muted
                      preload="auto"
                      style={{ filter: mediaFilter }} /* Apply filter to video preview */ /* Changed for dark mode */
                    />
                  ) : (
                    sliderImages.length > 0 && (
                      <img
                        src={
                          sliderImages[
                            Math.min(
                              Math.floor(
                                hoverTime / (duration / sliderImages.length),
                              ),
                              sliderImages.length - 1,
                            )
                          ]
                        } /* Changed for dark mode */
                        style={{ filter: mediaFilter }} /* Apply filter to image preview */
                        alt="preview"
                      />
                    )
                  )}
                  <span>{formatTime(hoverTime)}</span>
                  {checkpoint > 0 && Math.abs(hoverTime - checkpoint) < 5 && (
                    <span
                      style={{
                        fontSize: "9px",
                        color: "orange",
                        marginTop: "2px",
                      }}
                    >
                      Ви зупинилися тут
                    </span>
                  )}
                </SeekTooltip>
              )}
              <SeekBar
                type="range"
                min="0"
                max={duration || 0}
                $buffered={0}
                value={progress}
                onChange={(e) =>
                  (mediaRef.current.currentTime = e.target.value)
                }
              />
            </SeekBarWrapper>
          ) : (
            <StereoSeekBar
              onClick={handleStereoSeek} /* Changed for dark mode */
              onMouseMove={handleSeekHover}
              onMouseLeave={() => setHoverTime(null)}
            >
              {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
                <CheckpointMarker
                  $left={(checkpoint / duration) * 100}
                  style={{ bottom: "auto", top: "-15px" }}
                  title="Минулого разу ви зупинилися тут"
                >
                  🚩
                </CheckpointMarker>
              )}
              {hoverTime !== null && duration > 0 && (
                <SeekTooltip
                  $left={(hoverTime / duration) * 100}
                  className="seek-tooltip"
                >
                  {isDinofroz ? (
                    <video
                      ref={previewVideoRef}
                      src={track.video || dinofrozVideo}
                      muted
                      preload="auto"
                    />
                  ) : (
                    sliderImages.length > 0 && (
                      <img
                        src={
                          sliderImages[
                            Math.min(
                              Math.floor(
                                hoverTime / (duration / sliderImages.length),
                              ),
                              sliderImages.length - 1,
                            )
                          ]
                        }
                        alt="preview"
                      />
                    )
                  )}
                  <span>{formatTime(hoverTime)}</span>
                  {checkpoint > 0 && Math.abs(hoverTime - checkpoint) < 5 && (
                    <span
                      style={{
                        fontSize: "9px",
                        color: "orange",
                        marginTop: "2px",
                      }}
                    >
                      Ви зупинилися тут
                    </span>
                  )}
                </SeekTooltip>
              )}
              {isGeneratingWave ? (
                <span
                  style={{ color: "white", fontSize: "10px", margin: "auto" }}
                >
                  Обробка хвилі...
                </span>
              ) : (
                waveform.map((height, i) => (
                  <StereoChannel
                    key={i}
                    $height={height}
                    $active={
                      (progress / duration) * 100 > (i / waveform.length) * 100
                    }
                  />
                ))
              )}
            </StereoSeekBar>
          )}
          <span>{formatTime(duration)}</span>
          {isDinofroz && (
            <span style={{ fontSize: "10px", color: "#aaa" }}>
              ({formatTime(buffered)})
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {!isDinofroz && (
            <FSSliderContainer>
              {sliderImages.map((img, i) => (
                <SliderItemWrapper key={i}>
                  <FSSliderImage
                    src={img}
                    $active={i === currentImgIdx}
                    style={{ cursor: "default" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <SliderOverlay className="slider-overlay">
                    <SliderBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadImage(img);
                      }}
                    >
                      Скачати
                    </SliderBtn>
                    <SliderBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrintImage(img);
                      }}
                    >
                      Друкувати
                    </SliderBtn>
                  </SliderOverlay>
                </SliderItemWrapper>
              ))}
            </FSSliderContainer>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <div style={{ display: "flex", gap: "1px" }}>
            {checkpointsEnabled && checkpoint > 0 && (
              <ActButton
                onClick={() => {
                  if (mediaRef.current && canPerformAction()) {
                    mediaRef.current.currentTime = checkpoint;
                  }
                }}
                title="Повернутись до чекпоінту"
              >
                🚩
              </ActButton>
            )}
            <ActButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  mediaRef.current.currentTime = 0; /* Changed for dark mode */
                }
              }}
              title="На початок"
            >
              ⇤
            </ActButton>
            <ActButton
              onClick={() => {
                if (canPerformAction()) onPrev();
              }}
            >
              ⏮
            </ActButton>
            <ActButton onClick={togglePlay}>
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </ActButton>
            <ActButton
              onClick={() => {
                if (canPerformAction()) onNext();
              }}
              title="Наступна пісня"
            >
              ⏭
            </ActButton>
            <ActButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  mediaRef.current.currentTime = duration - 1.5;
                }
              }}
              title="В самий кінець (для перевірки зупинки)"
            >
              ⇥
            </ActButton>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ActButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  const amount = seekBackwardAmount;
                  mediaRef.current.currentTime = Math.max(
                    0,
                    mediaRef.current.currentTime - amount,
                  );
                  triggerIndicator("left", amount);
                }
              }}
            >
              -{seekBackwardAmount}s
            </ActButton>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                padding: "5px 10px",
                borderRadius: "20px",
              }}
            >
              <SpeedSlider
                type="range"
                min="0.2"
                max="2.1"
                step="0.1"
                $activeColor="#7afcff"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              /> {/* Changed for dark mode */}
              <span
                style={{
                  color: "white",
                  fontSize: "10px",
                  width: "25px",
                  textAlign: "right",
                }}
              >
                {speed.toFixed(1)}x
              </span>
            </div>
            <ActButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  const amount = seekForwardAmount;
                  mediaRef.current.currentTime = Math.min(
                    duration,
                    mediaRef.current.currentTime + amount,
                  );
                  triggerIndicator("right", amount);
                }
              }}
            >
              +{seekForwardAmount}s
            </ActButton>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ActButton onClick={() => onOpenSocial && onOpenSocial()} title="Чат і статистика">
              💬
            </ActButton>
            <LoopButton
              $active={isCached}
              onClick={() => {
                if (canPerformAction()) toggleCache();
              }}
              title={isCached ? "Збережено" : "Кешувати"}
            >
              {isCached ? "✓" : "⇩"}
            </LoopButton>
            {!isDinofroz && sliderImages.length > 1 && (
              <LoopButton
                $active={isAutoSlideshow}
                onClick={() => setIsAutoSlideshow(!isAutoSlideshow)}
                title={
                  isAutoSlideshow ? "Слайд-шоу ввімкнено" : "Слайд-шоу вимкнено" /* Changed for dark mode */
                }
              >
                📽️
              </LoopButton>
            )}
            {!isDinofroz && isAutoSlideshow && sliderImages.length > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: isDarkMode ? 'rgba(255,179,108,0.2)' : 'rgba(0,0,0,0.1)',
                  padding: "5px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,179,108,0.5)",
                }}
              >
                <span
                  style={{ color: "#ffb36c", fontSize: "12px", width: "20px" }}
                >
                  ⏱️
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={autoSlideshowInterval}
                  onChange={(e) =>
                    setAutoSlideshowInterval(parseInt(e.target.value))
                  }
                  style={{
                    width: "60px",
                    cursor: "pointer",
                    accentColor: "#ffb36c",
                  }}
                />
                <span
                  style={{
                    color: "#ffb36c",
                    fontSize: "10px",
                    width: "25px",
                    textAlign: "right",
                  }}
                >
                  {autoSlideshowInterval}s
                </span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "white", fontSize: "12px" }}>🔊</span>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              />
            </div>
            <LoopButton
              $active={true}
              onClick={() => {
                if (canPerformAction()) togglePlayMode();
              }}
              title={
                playMode === 0
                  ? "По порядку"
                  : playMode === 1
                    ? "Випадково"
                    : playMode === 2
                      ? "Автоповтор"
                      : "Без режиму"
              }
            >
              {playMode === 0
                ? "⏭"
                : playMode === 1
                  ? "⚄"
                  : playMode === 2
                    ? "↩"
                    : "⏵❘"}
            </LoopButton>
          </div>
        </div>
      </FSControls>

      {showSettings && (
        <GearModal>
          <h4>Налаштування</h4>
          <SliderRow> {/* Changed for dark mode */}
            <span style={{ color: "white" }}>
              Промотка назад ({seekBackwardAmount}с)
            </span>
            <SeekAmountSlider
              type="range"
              min="5"
              max="20"
              step="5"
              $activeColor="#7afcff"
              value={seekBackwardAmount}
              onChange={(e) =>
                setSeekBackwardAmount(parseInt(e.target.value, 10))
              }
            />
          </SliderRow>
          <SliderRow> {/* Changed for dark mode */}
            <span style={{ color: "white" }}>
              Промотка вперед ({seekForwardAmount}с)
            </span>
            <SeekAmountSlider
              type="range"
              min="5"
              max="20"
              step="5"
              $activeColor="#7afcff"
              value={seekForwardAmount}
              onChange={(e) =>
                setSeekForwardAmount(parseInt(e.target.value, 10))
              }
            />
          </SliderRow>
          {(track.lyrics || track.text) && ( /* Changed for dark mode */
            <SliderRow>
              <span style={{ color: "white" }}>Субтитри</span>
              {track.id === 1 && Array.isArray(track.lyrics) ? (
                <select
                  value={user?.voiceActingMode || "malyatko"}
                  onChange={(e) => {
                    if (onUpdateUser) {
                      onUpdateUser({
                        ...user,
                        voiceActingMode: e.target.value,
                      });
                    }
                  }} /* Changed for dark mode */
                  style={{
                    background: "#444",
                    color: "white",
                    border: "1px solid #666",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  <option value="malyatko">Малятко ТВ</option>
                  <option value="bbkids">BBKidsUA</option>
                  <option value="off">Вимкнути</option>
                </select>
              ) : (
                <button
                  onClick={() => {
                    const newMode =
                      user?.voiceActingMode === "off" ? "malyatko" : "off";
                    if (onUpdateUser)
                      onUpdateUser({ ...user, voiceActingMode: newMode });
                  }}
                  style={{
                    background:
                      (user?.voiceActingMode || "malyatko") === "off"
                        ? "#444"
                        : "orange",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  {(user?.voiceActingMode || "malyatko") === "off"
                    ? "Вимкнено"
                    : "Увімкнено"}
                </button>
              )}
            </SliderRow>
          )} {/* Changed for dark mode */}
          {track.filters && track.filters.length > 0 && (
            <SliderRow>
              <span style={{ color: "white" }}>Ефекти</span>
              <button
                onClick={() => setFiltersEnabled(!filtersEnabled)}
                style={{
                  background: filtersEnabled ? "#b000cf" : "#444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                {filtersEnabled ? "Увімкнено" : "Вимкнено"}
              </button>
            </SliderRow>
          )} {/* Changed for dark mode */}
          {isDinofroz && (
            <SliderRow>
              <span style={{ color: "white" }}>Якість відео</span>
              <select
                value={videoQuality}
                onChange={(e) => handleQualityChange(e.target.value)}
                style={{
                  background: "#444",
                  color: "white", /* Changed for dark mode */
                  border: "1px solid #666",
                  borderRadius: "4px",
                  padding: "3px 6px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                <option value="1080з">1080з</option>
                <option value="768з">768з</option>
                <option value="480р">480р</option>
              </select>
            </SliderRow> /* Changed for dark mode */
          )}
          {hasSymbols && (
            <SliderRow>
              <span style={{ color: "white" }}>
                Інтенсивність символів ({dynamicIntensity || 50})
              </span>
              <VolumeSlider
                type="range"
                min="10"
                max="200"
                step="10"
                $activeColor="#7afcff"
                value={dynamicIntensity || 50}
                onChange={(e) => setDynamicIntensity(parseInt(e.target.value))}
              />
            </SliderRow>
          )} {/* Changed for dark mode */}
          <SliderRow>
            <span style={{ color: "white" }}>Чекпоінти</span>
            <button
              onClick={onToggleCheckpoints}
              style={{
                background: checkpointsEnabled ? "#b000cf" : "#444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {checkpointsEnabled ? "Увімкнено" : "Вимкнено"}
            </button>
          </SliderRow>
          <SliderRow> {/* Changed for dark mode */}
            <span style={{ color: "white" }}>Фоновий режим</span>
            <button
              onClick={onToggleBackgroundMode}
              style={{
                background: backgroundMode ? "#00a405" : "#444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {backgroundMode ? "Увімкнено" : "Вимкнено"}
            </button>
          </SliderRow>
          <SliderRow> {/* Changed for dark mode */}
            <span style={{ color: "white" }}>Режим шкали</span>
            <button
              onClick={() =>
                setProgressMode((prev) =>
                  prev === "linear" ? "stereogram" : "linear",
                )
              }
              style={{
                background: progressMode === "linear" ? "#7300ff" : "#b000cf",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {progressMode === "linear" ? "Часова шкала" : "Стереограмa"}
            </button>
          </SliderRow>
          {isDinofroz && ( /* Changed for dark mode */
            <>
              <SliderRow>
                <span style={{ color: "white" }}>Кількість кадрів</span>
                <select
                  value={framesCount}
                  onChange={(e) => setFramesCount(parseInt(e.target.value))}
                  style={{
                    background: "#444",
                    color: "white", /* Changed for dark mode */
                    border: "1px solid #666",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  <option value={30}>30 кадрів</option>
                  <option value={60}>60 кадрів</option>
                  <option value={120}>120 кадрів</option>
                </select>
              </SliderRow> {/* Changed for dark mode */}
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  marginBottom: "8px",
                  padding: "0 5px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "9px", color: "#aaa", display: "block", marginBottom: "2px" }}>
                    Початок (хв:сс)
                  </label>
                  <div style={{ display: "flex", gap: "2px" }}>
                    <input
                      type="text"
                      value={frameStartStr}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9:]*$/.test(val)) setFrameStartStr(val);
                      }}
                      placeholder="0:59"
                      style={{ width: "100%", background: isDarkMode ? '#222' : '#fff', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isStartInvalid ? "#ff4d4d" : (isDarkMode ? '#555' : '#ccc')}`, borderRadius: "4px", padding: "2px", fontSize: "10px" }}
                    />
                    <button
                      onClick={() => setFrameStartStr(secondsToTime(progress))}
                      title="Вставити поточний час"
                      style={{ background: "#444", border: "1px solid #666", borderRadius: "4px", cursor: "pointer", color: "white", fontSize: "9px", padding: "0 2px" }}
                    >
                      ⏱️
                    </button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "9px", color: "#aaa", display: "block", marginBottom: "2px" }}>
                    Кінець (хв:сс)
                  </label>
                  <div style={{ display: "flex", gap: "2px" }}>
                    <input
                      type="text"
                      value={frameEndStr}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[0-9:]*$/.test(val)) setFrameEndStr(val);
                      }}
                      placeholder="2:33"
                      style={{ width: "100%", background: isDarkMode ? '#222' : '#fff', color: isDarkMode ? 'white' : 'black', border: `1px solid ${isEndInvalid ? "#ff4d4d" : (isDarkMode ? '#555' : '#ccc')}`, borderRadius: "4px", padding: "2px", fontSize: "10px" }}
                    />
                    <button
                      onClick={() => setFrameEndStr(secondsToTime(progress))}
                      title="Вставити поточний час"
                      style={{ background: "#444", border: "1px solid #666", borderRadius: "4px", cursor: "pointer", color: "white", fontSize: "9px", padding: "0 2px" }}
                    >
                      ⏱️
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleResetFrames}
                style={{
                  width: "100%",
                  background: isDarkMode ? '#333' : '#eee',
                  color: "#aaa",
                  border: "1px solid #444",
                  borderRadius: "4px",
                  padding: "2px",
                  fontSize: "9px",
                  cursor: "pointer",
                  marginBottom: "4px",
                }}
              >
                ↺ Скинути проміжок
              </button>
              <button
                onClick={generateFrames}
                disabled={isGeneratingFrames}
                style={{
                  marginTop: "2px",
                  width: "100%",
                    fontSize: "11px", /* Changed for dark mode */
                  background: isGeneratingFrames ? "#3f3f3f" : "#b12c00",
                  color: "white",
                  border: "none",
                  padding: "2px",
                  borderRadius: "5px",
                  cursor: isGeneratingFrames ? "default" : "pointer",
                  fontWeight: "bold",
                }}
              >
                {isGeneratingFrames
                  ? `Генерація ${loadingProgress}%...`
                  : `🎞️ Розділити на ${framesCount} кадрів`}
              </button> {/* Changed for dark mode */}
            </>
          )}
          <button
            onClick={async () => {
              for (const img of sliderImages) {
                const dataUrl = await getCroppedDataUrl(img);
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "image.jpg";
                a.click();
                await new Promise((res) => setTimeout(res, 200));
              }
            }}
            disabled={track.id === 2}
            style={{
              marginTop: "3px",
              width: "100%", /* Changed for dark mode */
              background: track.id === 2 ? "#626262" : "#00ae0f",
              color: "white",
              border: "none",
              fontSize: "11px",
              padding: "2px",
              borderRadius: "5px",
              cursor: track.id === 2 ? "not-allowed" : "pointer",
              opacity: track.id === 2 ? 0.6 : 1,
            }}
          >
            Скачати всі зображення
          </button>
          <button
            onClick={async () => {
              try {
                const screenshots =
                  (await localforage.getItem("dinofroz_screenshots")) || [];
                if (screenshots.length === 0) {
                  alert("📸 Галерея скріншотів пуста");
                  return;
                }
                let html = `<div style="max-height:400px;overflow-y:auto;"><h3>Збережені скріншоти (${screenshots.length}/20)</h3>`;
                screenshots.forEach((shot, idx) => {
                  html += `<div style="margin:10px 0;padding:10px;border:1px solid #ccc;border-radius:5px;background:#f5f5f5;">
                    <small style="color:#666;">${shot.trackName} - ${new Date(shot.timestamp).toLocaleString()}</small>
                    <br/><img src="${shot.image}" style="max-width:150px;margin-top:5px;border-radius:3px;cursor:pointer;" onclick="this.style.maxWidth='100%'" />
                    <br/><button onclick="this.parentElement.innerHTML='Видалення...'" style="margin-top:5px;padding:5px 10px;background:#ff6b6b;color:white;border:none;border-radius:3px;cursor:pointer;">🗑️ Видалити</button>
                  </div>`;
                });
                html += "</div>";
                const win = window.open("", "_blank", "width=400,height=600");
                win.document.write(
                  `<html><head><title>Галерея скріншотів</title><style>body{font-family:Arial;padding:10px;background:#fff;}</style></head><body>${html}</body></html>`,
                );
                win.document.close();
              } catch (error) {
                console.error("Помилка відкриття галереї:", error);
                alert("❌ Помилка при відкритті галереї");
              }
            }}
            style={{
              marginTop: "4px",
              width: "100%",
                background: isDarkMode ? '#7afcff' : '#00bcd4',
              color: "#333",
              border: "none",
              padding: "2px",
              fontSize: "11px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📸 Переглянути галерею скріншотів
          </button>
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "⚠️ Ви впевнені, що хочете очистити всі збережені скріншоти?",
                )
              ) {
                try {
                  await localforage.removeItem("dinofroz_screenshots");
                  alert("✅ Галерея скріншотів очищена");
                } catch (error) {
                  console.error("Помилка очищення галереї:", error);
                  alert("❌ Помилка при очищенні галереї");
                }
              }
            }}
            style={{
              marginTop: "3px",
              padding: "2px",
              width: "100%", /* Changed for dark mode */
              background: "#ae0000",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            🗑️ Очистити галерею
          </button>
          <button
            onClick={() => setShowSettings(false)}
            style={{
              marginTop: "4px",
              width: "100%", /* Changed for dark mode */
              background: "transparent",
              padding: "2px",
              border: "1px solid white",
              borderRadius: "5px",
              fontSize: "11px",
              color: "white",
            }}
          >
            Закрити
          </button>
        </GearModal>
      )}

      {showFramesGallery && (
        <ModalOverlay onClick={() => setShowFramesGallery(false)}>
          <PlaylistModalContent
            onClick={(e) => e.stopPropagation()}
            style={{ /* Changed for dark mode */
              maxWidth: "1200px",
              background: "#1a1a1a",
              border: "1px solid orange",
            }}
          >
            <PlaylistCloseButton
              onClick={() => setShowFramesGallery(false)}
              style={{ color: "white" }}
            > {/* Changed for dark mode */}
              &times;
            </PlaylistCloseButton>
            <h3
              style={{
                color: "orange",
                textAlign: "center",
                marginBottom: "20px",
              }} /* Changed for dark mode */
            >
              Кадри з відео ({videoFrames.length} зображень)
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "5px",
                padding: "10px",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              {videoFrames.map((frame, idx) => (
                <div
                  key={idx}
                  style={{
                    background: isDarkMode ? '#333' : '#eee',
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #444",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={frame}
                    alt={`Frame ${idx}`}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ display: "flex", gap: "2px", padding: "5px" }}>
                    <button
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = frame;
                        a.download = `frame-${idx + 1}.jpg`;
                        a.click();
                      }}
                      style={{
                        flex: 1,
                        padding: "4px",
                        fontSize: "10px",
                        background: isDarkMode ? 'orange' : '#ffb36c',
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Скачати
                    </button>
                    <button
                      onClick={() => {
                        const printWindow = window.open("", "_blank");
                        printWindow.document.write(
                          `<html><head><title>Print Frame</title></head><body style="text-align:center;"><img src="${frame}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
                        );
                        printWindow.document.close();
                      }}
                      style={{
                        flex: 1,
                        padding: "4px",
                        fontSize: "10px",
                        background: isDarkMode ? '#555' : '#ccc',
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Друк
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => setShowFramesGallery(false)}
                style={{
                  padding: "10px 30px",
                  borderRadius: "20px", /* Changed for dark mode */
                  background: "orange",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Закрити галерею
              </button>
            </div>
          </PlaylistModalContent>
        </ModalOverlay>
      )}

      {showScreenshotMenu && (
        <GearModal
          style={{ bottom: "auto", top: "70px", right: "80px", width: "150px" }}
        > {/* Changed for dark mode */}
          <button
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("download")
                : downloadScreenshot(false)
            }
            style={{
              background: "transparent",
              border: "none", /* Changed for dark mode */
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            📥 Скачати
          </button>
          <button
            onClick={saveScreenshotToGallery}
            style={{
              background: "transparent",
              border: "none", /* Changed for dark mode */
              color: "#ffb36c",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
              fontWeight: "bold",
            }}
            title="Зберегти скріншот у локальній галереї"
          >
            💾 У галерею
          </button>
          <button
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("print")
                : printScreenshot(false)
            }
            style={{
              background: "transparent",
              border: "none", /* Changed for dark mode */
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            🖨️ Друкувати
          </button>
        </GearModal>
      )}

      {pendingScreenshotAction && (
        <DownloadModal>
          <h3 style={{ color: isDarkMode ? 'white' : 'black' }}>Фільтр виявлено</h3>
          <p style={{ color: "black", fontSize: "14px" }}>
            Бажаєте накласти активний візуальний ефект на скріншот?
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() => {
                const action = pendingScreenshotAction;
                setPendingScreenshotAction(null);
                if (action === "menu") setShowScreenshotMenu(true);
                else if (action === "download") downloadScreenshot(true);
                else if (action === "print") printScreenshot(true);
              }}
              style={{
                background: isDarkMode ? 'orange' : '#ffb36c',
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Так
            </button>
            <button
              onClick={() => {
                const action = pendingScreenshotAction;
                setPendingScreenshotAction(null);
                if (action === "menu") setShowScreenshotMenu(true);
                else if (action === "download") downloadScreenshot(false);
                else if (action === "print") printScreenshot(false);
              }}
              style={{
                background: isDarkMode ? '#555' : '#ccc',
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ні
            </button>
          </div>
        </DownloadModal>
      )}

      {showSocialModal && (
        <ModalOverlay onClick={() => setShowSocialModal(false)}>
          <PlaylistModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: 760, width: "92%", padding: 20, maxHeight: "85vh", overflowY: "auto", background: isDarkMode ? "#1f2335" : "#fffaf4", color: isDarkMode ? "#f2f2f2" : "#111" }}>
            <PlaylistCloseButton onClick={() => setShowSocialModal(false)} style={{ color: isDarkMode ? "#fff" : "#111" }}>
              &times;
            </PlaylistCloseButton>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>
        {socialTargetTrack?.isGeneral ? "🌐 Загальний чат" : `🎵 ${socialTargetTrack?.author || ""} — ${socialTargetTrack?.text || ""}`}
      </h3>
            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,179,108,0.2)", padding: "6px 10px", borderRadius: 999 }}>Тривалість: {Math.floor(duration || 0)}с</span>
                <span style={{ background: "rgba(122,252,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Перегляди: {socialStats.views}</span>
                <span style={{ background: "rgba(255,107,107,0.15)", padding: "6px 10px", borderRadius: 999 }}>Лайки: {socialStats.likes}</span>
                <span style={{ background: "rgba(90,90,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Дизлайки: {socialStats.dislikes}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Коментарі: {socialCommentCount}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => handleSocialReaction(1)} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: socialReactionState === 1 ? "#ff4d6d" : "#e8e8e8", color: socialReactionState === 1 ? "#fff" : "#111" }}>❤ Лайк</button>
                <button onClick={() => handleSocialReaction(-1)} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: socialReactionState === -1 ? "#4c78ff" : "#e8e8e8", color: socialReactionState === -1 ? "#fff" : "#111" }}>👎 Дизлайк</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
              {!socialAuthUser && !user ? (
                <button onClick={handleGoogleSignIn} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: "#4285f4", color: "#fff" }}>🔑 Увійти з Google</button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {(socialAuthUser?.avatar || user?.avatar) && (
                    <img
                      src={socialAuthUser?.avatar || user?.avatar}
                      alt="avatar"
                      style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid #ffb36c" }}
                    />
                  )}
                  <span style={{ fontSize: 13, opacity: 0.8 }}>Увійшли як {socialAuthUser?.firstName || user?.firstName || user?.account || "користувач"}</span>
                </div>
              )}
              <span style={{ fontSize: 12, opacity: 0.7 }}>Залишилось коментарів сьогодні: {getDailyCommentQuotaLeft(MAX_DAILY_COMMENTS, socialCommentQuotaUsed)}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              {(socialAuthUser?.avatar || user?.avatar) && (
                <img
                  src={socialAuthUser?.avatar || user?.avatar}
                  alt="avatar"
                  style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #ffb36c", flexShrink: 0, marginTop: 2 }}
                />
              )}
              <textarea value={socialCommentText} onChange={(e) => setSocialCommentText(e.target.value)} maxLength={1000} placeholder={!socialAuthUser && !user ? "Увійдіть щоб написати коментар..." : "Залиште коментар..."} disabled={!socialAuthUser && !user} style={{ flex: 1, minHeight: 90, borderRadius: 12, padding: 10, border: "1px solid rgba(0,0,0,0.15)", resize: "vertical", opacity: !socialAuthUser && !user ? 0.6 : 1 }} />
            </div>
            {socialCommentError && <div style={{ color: "#ff4d6d", fontSize: 12, marginTop: 6 }}>{socialCommentError}</div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{socialCommentText.length}/1000</span>
              <button onClick={handleSocialCommentSubmit} disabled={socialLoading} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: "#ffb36c", color: "#111", opacity: socialLoading ? 0.6 : 1 }}>{socialLoading ? "Надсилаю..." : "Надіслати"}</button>
            </div>
            <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
              {!socialTargetTrack.isGeneral && (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Коментарі до цієї пісні</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {socialComments.slice(0, MAX_VISIBLE_COMMENTS).map((comment) => (
                      <div key={comment.id} style={{ background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)", borderRadius: 14, padding: 10, border: "1px solid rgba(255,179,108,0.2)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${comment.user?.color || "#ffb36c"}`, overflow: "hidden", background: "#fff" }}>
                            {getAvatarSrc(comment.user?.avatar) ? <img src={getAvatarSrc(comment.user?.avatar)} alt={comment.user?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{comment.user?.name || "Гість"}</div>
                            <div style={{ fontSize: 11, opacity: 0.7 }}>{new Date(comment.createdAt || Date.now()).toLocaleString("uk-UA")}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{comment.text}</div>
                      </div>
                    ))}
                    {!socialComments.length && <div style={{ opacity: 0.7, fontSize: 13 }}>Ще немає коментарів до цієї пісні.</div>}
                  </div>
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Загальні коментарі ({socialGlobalCommentCount})</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {socialGlobalComments.map((comment) => (
                    <div key={comment.id} style={{ background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", borderRadius: 14, padding: 10, border: "1px solid rgba(122,252,255,0.2)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${comment.user?.color || "#ffb36c"}`, overflow: "hidden", background: "#fff" }}>
                          {getAvatarSrc(comment.user?.avatar) ? <img src={getAvatarSrc(comment.user?.avatar)} alt={comment.user?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{comment.user?.name || "Гість"}</div>
                          <div style={{ fontSize: 11, opacity: 0.7 }}>{comment.trackId ? `Пісня #${comment.trackId}` : "Усі пісні"}</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{comment.text}</div>
                    </div>
                  ))}
                  {!socialGlobalComments.length && <div style={{ opacity: 0.7, fontSize: 13 }}>Ще немає загальних коментарів.</div>}
                </div>
              </div>
            </div>
          </PlaylistModalContent>
        </ModalOverlay>
      )}
      {showPlaylist && (
        <PlaylistOverlay>
          <div
            style={{ /* Changed for dark mode */
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #555",
              paddingBottom: "5px",
            }}
          >
            <h4 style={{ margin: 0 }}>Черга відтворення</h4>
            <button /* Changed for dark mode */
              onClick={() => setShowPlaylist(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          {playlist &&
            playlist.map((t, i) => (
              <div
                key={t.id}
                style={{
                  padding: "8px",
                  background:
                    t.id === track.id
                      ? isDarkMode ? "rgba(255, 165, 0, 0.3)" : "rgba(255, 165, 0, 0.1)"
                      : "transparent",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  onSelectTrack(t);
                }}
              >
                <img
                  src={t.image}
                  alt="art"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.author} {/* Changed for dark mode */}
                </div>
                <span style={{ fontSize: "11px", color: "#ccc" }}>
                  {formatTime(t.duration)}
                </span>
              </div>
            ))}
        </PlaylistOverlay>
      )}
      {showDownload && (
        <DownloadModal>
          <h3>Завантаження</h3>
          <div /* Changed for dark mode */
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = isDinofroz
                  ? track.video || dinofrozVideo
                  : track.audio;
                a.download = `full_track.${isDinofroz ? "mp4" : "mp3"}`;
                a.click();
              }}
              style={{
                padding: "10px", /* Changed for dark mode */
                background: "orange",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Скачати повністю
            </button>
            <hr style={{ width: "100%" }} />
            <label>Вибрати проміжок (сек):</label>
            <div
              style={{ display: "flex", gap: "5px", justifyContent: "center" }} /* Changed for dark mode */
            >
              <input
                type="number"
                value={downloadRange.start}
                onChange={(e) =>
                  setDownloadRange({
                    ...downloadRange,
                    start: parseInt(e.target.value, 10) || 0,
                  })
                }
                style={{ width: "60px", padding: "5px", background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: `1px solid ${isDarkMode ? '#555' : '#ccc'}` }}
              />
              <span>-</span>
              <input
                type="number"
                value={downloadRange.end}
                onChange={(e) =>
                  setDownloadRange({
                    ...downloadRange,
                    end: parseInt(e.target.value, 10) || 0,
                  })
                }
                style={{ width: "60px", padding: "5px", background: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000', border: `1px solid ${isDarkMode ? '#555' : '#ccc'}` }}
              />
            </div>
            <button
              onClick={() => {
                alert(
                  `Завантаження відрізку ${downloadRange.start}с - ${downloadRange.end}с розпочато! (Емуляція)`,
                );
                setShowDownload(false);
              }}
              style={{
                padding: "8px", /* Changed for dark mode */
                background: "#444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Скачати відрізок
            </button>
            {!isDinofroz && (
              <button
                onClick={async () => {
                  const src = sliderImages[currentImgIdx];
                  const dataUrl = await getCroppedDataUrl(src);
                  const a = document.createElement("a");
                  a.href = dataUrl;
                  a.download = "image.jpg";
                  a.click();
                }}
                style={{
                  marginTop: "5px", /* Changed for dark mode */
                  padding: "8px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Скачати поточне фото
              </button>
            )}
          </div>
          <button
            onClick={() => setShowDownload(false)}
            style={{
              background: "transparent", /* Changed for dark mode */
              border: "1px solid #333",
              padding: "5px 15px",
              borderRadius: "5px",
            }}
          >
            Закрити
          </button>
        </DownloadModal>
      )}
    </FullScreenOverlay>
  );
};

const MusicCard = ({
  cardData,
  onOpenModal,
  rating,
  onOpenPlayer,
  onRate,
  onOpenAi = () => {},
  onOpenSocial = () => {},
  onOpenInfo = () => {},
  checkpoint,
  checkpointsEnabled,
}) => {
  const { id, image, text, deezerLink } = cardData;
/* Changed for dark mode */
  const handleDownloadTrack = (e) => {
    e.stopPropagation();
    const a = document.createElement("a"); /* Changed for dark mode */
    a.href = cardData.audio;
    a.download = `${text || "track"}.mp3`;
    a.download = `${text || "track"}${cardData.author ? ` - ${cardData.author}` : ""}.mp3`;
    a.click();
  };
  const handlePrintCover = (e) => {
    e.stopPropagation();
    const printWindow = window.open("", "_blank"); /* Changed for dark mode */
    printWindow.document.write(
      `<html><head><title>Print Cover</title></head><body style="text-align:center;"><img src="${image}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };
  return (
    <CardWrapper $isFavorite={rating > 0} $rating={rating}>
      <MusicImageContainer>
        {checkpointsEnabled && checkpoint > 0 && (
          <CheckpointBadge
            className="card-checkpoint-badge"
            title="Ви зупинилися тут"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPlayer(id, checkpoint);
            }}
          >
            🚩 {Math.floor(checkpoint / 60)}:
            {Math.floor(checkpoint % 60)
              .toString()
              .padStart(2, "0")}
          </CheckpointBadge>
        )}
        <HeartButton
          $rating={rating}
          title={(() => {
            if (rating === 2) return "2 бали — ❤️ Лайк";
            if (rating === 1) return "1 бал — ❤️ Лайк";
            if (rating === -1) return "💔 Дизлайк";
            return "🤍 Оцінити";
          })()}
          onClick={(e) => {
            e.stopPropagation();
            onRate && onRate(id);
          }}
        >
          {rating === 2 || rating === 1
            ? "❤️"
            : rating === -1
              ? "💔"
              : "🤍"}
        </HeartButton>
        <MusicImage src={image} alt="Music" onClick={() => onOpenPlayer(id)} />

        {text && <MusicText title={text}>{text}</MusicText>}

        <ActionButtonsContainer className="card-overlay-buttons">
          {cardData.lyrics && (
            <ActionButton
              title="Текст пісні"
              onClick={(e) => { e.stopPropagation(); onOpenModal({ ...cardData }); }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </ActionButton>
          )}
          <ActionButton title="Відкрити плеєр" onClick={(e) => { e.stopPropagation(); onOpenPlayer(id); }}>
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </ActionButton>
          <ActionButton
            title="Запитати ШІ"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAi && onOpenAi(cardData);
            }}
          >
            ✨
          </ActionButton>
          <ActionButton
            title="Чат і статистика"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSocial && onOpenSocial(cardData);
            }}
          >
            💬
          </ActionButton>
          <ActionButton title="Завантажити" onClick={handleDownloadTrack}>
            ⇩
          </ActionButton>
          <ActionButton
            title="Роздрукувати обкладинку"
            onClick={handlePrintCover}
          >
            🖨️
          </ActionButton>
          {deezerLink && (
            <ActionButton
              title="Слухати на Deezer"
              onClick={(e) => { e.stopPropagation(); window.open(deezerLink, "_blank"); }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>
            </ActionButton>
          )}
        </ActionButtonsContainer>
      </MusicImageContainer>
    </CardWrapper>
  );
};
const CreatePlaylistModal = ({ onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [cover, setCover] = useState(initialData?.cover || "");
  const [tracks, setTracks] = useState(initialData?.tracks || []); // Added isDarkMode prop
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCooldown, setSearchCooldown] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [deezerOffset, setDeezerOffset] = useState(0);
  const [addCooldown, setAddCooldown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeProgressId, setActiveProgressId] = useState(null);
  const isDarkMode = false; // Placeholder, will be passed from MusicPhoto
  const [storageInfo, setStorageInfo] = useState({ usage: 0, quota: 0 });

  const updateStorageEstimate = useCallback(async () => {
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate();
        setStorageInfo({ usage: estimate.usage || 0, quota: estimate.quota || 0 });
      } catch (e) {
        console.error("Storage Manager error:", e);
      }
    }
  }, []);

  useEffect(() => {
    updateStorageEstimate();
  }, [updateStorageEstimate]);

  const handleFile = (e, callback, progressId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (progressId) {
      setActiveProgressId(progressId);
      setProgress(0);
    }

    // Замість FileReader просто повертаємо файл
    callback(file);
    if (progressId) {
      setProgress(0);
      setActiveProgressId(null);
    }
  };

  const handleAudio = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const progressId = `track-audio-${index}`;
    setActiveProgressId(progressId);
    setProgress(0);

    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      if (audio.duration > 300) {
        alert("Тривалість пісні не може перевищувати 5 хвилин!");
        e.target.value = "";
        setActiveProgressId(null);
        setProgress(0);
        return;
      }
      const newTracks = [...tracks];
      newTracks[index].audio = file; // Зберігаємо Blob
      newTracks[index].duration = audio.duration;
      setTracks(newTracks);
      setActiveProgressId(null);
      setProgress(0);
      URL.revokeObjectURL(audio.src);
    };
  };

  const updateTrack = (index, field, value) => {
    const newTracks = [...tracks];
    newTracks[index][field] = value;
    setTracks(newTracks);
  };
  const calculateTotalSize = () => {
    return (
      tracks.reduce(
        (acc, track) => acc + (track.audioSize || 0) + (track.imageSize || 0),
        0,
      ) + (coverSize || 0)
    );
  };
  const addTrack = () => {
    if (tracks.length >= 10) return;
    setTracks([
      ...tracks,
      {
        id: Date.now(),
        text: "",
        audio: "",
        video: "",
        image: "",
        duration: 0,
      },
    ]);
  };
  useEffect(() => {
    let interval;
    if (searchCooldown > 0) {
      interval = setInterval(() => setSearchCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [searchCooldown]);

  useEffect(() => {
    let interval;
    if (addCooldown > 0) {
      interval = setInterval(() => setAddCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [addCooldown]);
  const [artistQuery, setArtistQuery] = useState("");
  const [titleQuery, setTitleQuery] = useState("");
  const handleSearch = () => {
    if ((!artistQuery && !titleQuery) || searchCooldown > 0) return;
    setIsSearching(true);
    setDeezerOffset(0);
    fetchDeezerResults(0);
  };

  const fetchDeezerResults = (offset) => {
    const callbackName = `deezerJsonp_${Date.now()}`;
    const script = document.createElement("script");
    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(
      `${artistQuery} ${titleQuery}`,
    )}&output=jsonp&callback=${callbackName}`;

    window[callbackName] = (data) => {
      setSearchResults(data.data || []);
      setIsSearching(false);
      setSearchCooldown(40);
      delete window[callbackName];
      document.body.removeChild(script);
    };
    script.onerror = () => {
      setIsSearching(false);
      setError("Помилка пошуку");
      delete window[callbackName];
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  };
  const handleLoadMore = () => {
    if (searchCooldown > 0 || isSearching) return;
    setIsSearching(true);
    setSearchCooldown(40);
    const newOffset = deezerOffset + 25;
    setDeezerOffset(newOffset);
    fetchDeezerResults(newOffset);
  };

  const [coverSize, setCoverSize] = useState(0);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Обкладинка не може бути більшою за 10мб!");
      e.target.value = null;
      return;
    }

    setCoverSize(file.size);

    setActiveProgressId("playlist-cover");
    setProgress(0);

    // Зберігаємо файл (Blob) замість Base64 для економії місця та стабільності
    setCover(file);
    setProgress(100);
    setActiveProgressId(null);
  };
  const addDeezerTrack = (track) => {
    if (tracks.length >= 10) return setError("Максимум 10 пісень!");
    if (addCooldown > 0)
      return setError(`Зачекайте ${addCooldown}с перед додаванням.`);

    const trackName = `${track.artist.name} - ${track.title}`;
    if (tracks.some((t) => t.text === trackName))
      return setError("Ця пісня вже є в плейлисті!");

    const newTrack = {
      id: Date.now() + Math.random(),
      text: trackName,
      audio: track.preview,
      video: "",
      image: track.album.cover_medium,
      duration: track.duration,
      deezerLink: track.link,
    };
    setTracks([...tracks, newTrack]);
    setAddCooldown(40);
  };

  const removeTrack = (index) => {
    const newTracks = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
  };

  const handleSave = () => {
    if (name.length > 12)
      return setError("Назва плейлисту максимум 12 символів");
    if (!name) return setError("Введіть назву плейлисту");
    if (tracks.length === 0) return setError("Додайте хоча б одну пісню");
    if (calculateTotalSize() > 100 * 1024 * 1024)
      return setError("Перевищено ліміт 100мб!");
    if (tracks.some((t) => !t.audio || !t.text))
      return setError("Заповніть дані пісень");
    onSave({ name, cover, tracks });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <LyricsModalContent
        onClick={(e) => e.stopPropagation()} /* Changed for dark mode */
        style={{ maxWidth: "500px" }}
      >
        <h3 style={{ color: "black", textAlign: "center" }}>
          Створити плейлист
        </h3>

        {storageInfo.quota > 0 && (
          <StorageIndicatorContainer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Пам'ять (IndexedDB):</span>
              <span>
                {Math.round(storageInfo.usage / 1024 / 1024)} MB /{" "}
                {storageInfo.quota > 1024 * 1024 * 1024
                  ? (storageInfo.quota / (1024 * 1024 * 1024)).toFixed(1) + " GB"
                  : Math.round(storageInfo.quota / 1024 / 1024) + " MB"}
              </span>
            </div>
            <StorageBar>
              <StorageBarFill
                $percent={Math.min(
                  100,
                  (storageInfo.usage / storageInfo.quota) * 100
                )}
              />
            </StorageBar>
          </StorageIndicatorContainer>
        )}

        <InputGroup>
          <label>Назва (макс 12)</label>
          <input /* Changed for dark mode */
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={12}
          />
        </InputGroup>
        <InputGroup>
          <label>Обкладинка плейлисту (макс 10мб)</label>
          <input type="file" accept="image/*" onChange={handleCoverChange} />
          {activeProgressId === "playlist-cover" && (
            <div
              style={{
                width: "100%",
                height: "5px",
                background: "#ddd",
                marginTop: "5px",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "orange",
                  width: `${progress}%`,
                  transition: "width 0.2s",
                }}
              ></div>
            </div>
          )}
        </InputGroup>
        {cover && (
          <img
            src={typeof cover === "string" ? cover : URL.createObjectURL(cover)}
            alt="Cover"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}

        <div
          style={{ /* Changed for dark mode */
            margin: "15px 0",
            borderTop: "1px solid #ccc",
            paddingTop: "10px",
          }}
        >
          <h4 style={{ color: "black", margin: "0 0 10px 0" }}>
            Пошук пісень (Deezer)
          </h4>
          <p
            style={{ fontSize: "11px", color: "grey", margin: "-5px 0 10px 0" }}
          >
            Примітка: можна додати лише скорочену версію (30с), повна версія
            доступна на офіційному сайті Deezer.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <input
              value={artistQuery}
              onChange={(e) => setArtistQuery(e.target.value)}
              placeholder="Виконавець..."
              style={{ /* Changed for dark mode */
                flex: 1,
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
            />
            <input
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
              placeholder="Назва пісні..."
              style={{ /* Changed for dark mode */
                flex: 1,
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
            />
            <button
              onClick={handleSearch}
              disabled={searchCooldown > 0 || isSearching}
              style={{
                background: searchCooldown > 0 ? (isDarkMode ? '#555' : 'grey') : 'blue',
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: searchCooldown > 0 ? "default" : "pointer",
              }}
            >
              {isSearching
                ? "..."
                : searchCooldown > 0
                  ? `${searchCooldown}s`
                  : " ⌕"}
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}></div>
          {searchResults.length > 0 && (
            <div
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                marginTop: "10px",
                border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                borderRadius: "5px",
              }}
            >
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px", /* Changed for dark mode */
                    borderBottom: "1px solid #eee",
                    gap: "10px",
                  }}
                >
                  <img
                    src={track.album.cover_small}
                    alt="art"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "3px",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      fontSize: "12px",
                      color: isDarkMode ? '#eee' : '#333',
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.artist.name} - {track.title}
                  </div>
                  <button
                    onClick={() => addDeezerTrack(track)}
                    style={{
                      background: isDarkMode ? 'green' : '#4CAF50',
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      fontSize: "10px",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => window.open(track.link, "_blank")}
                    style={{
                      background: isDarkMode ? 'blue' : '#2196F3',
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                    title="Повна версія"
                  >
                    Full
                  </button>
                </div>
              ))}
            </div>
          )}
          {searchResults.length > 0 && (
            <button
              onClick={handleLoadMore}
              disabled={searchCooldown > 0 || isSearching}
              style={{
                background: searchCooldown > 0 ? (isDarkMode ? '#555' : 'grey') : 'green',
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: searchCooldown > 0 ? "default" : "pointer",
                marginTop: "10px",
              }}
            >
              {isSearching
                ? "..."
                : searchCooldown > 0
                  ? `${searchCooldown}s`
                  : "Завантажити ще"}
            </button>
          )}
        </div>

        <h4 style={{ color: isDarkMode ? '#fff' : 'black', margin: "10px 0" }}>
          Пісні ({tracks.length}/10)
        </h4>
        {tracks.map((track, i) => (
          <div
            key={track.id}
            style={{
              background: "#f0f0f0",
              padding: 10, /* Changed for dark mode */
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <InputGroup>
              <label>Назва</label>
              <input
                value={track.text}
                onChange={(e) => updateTrack(i, "text", e.target.value)}
              /> {/* Changed for dark mode */}
            </InputGroup>
            <InputGroup>
              <label>Аудіо (макс 5хв)</label>
              {track.audio &&
              (track.audio.startsWith("http") ||
                track.audio.startsWith("data:")) ? (
                <div>
                  <audio controls src={track.audio} style={{ width: "100%" }} />
                  <button
                    type="button" /* Changed for dark mode */
                    onClick={() => updateTrack(i, "audio", "")}
                    style={{ marginTop: "5px", cursor: "pointer" }}
                  >
                    Видалити аудіо
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleAudio(e, i)} /* Changed for dark mode */
                />
              )}
              {activeProgressId === `track-audio-${i}` && (
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "#ddd",
                    marginTop: "5px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "orange",
                      width: `${progress}%`,
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
              )}
            </InputGroup>
            <InputGroup>
              <label>Зображення пісні</label>
              {track.image &&
              (track.image.startsWith("http") ||
                track.image.startsWith("data:")) ? (
                <div>
                  <img
                    src={track.image}
                    alt="Обкладинка"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <button /* Changed for dark mode */
                    type="button"
                    onClick={() => updateTrack(i, "image", "")}
                    style={{
                      display: "block",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Видалити обкладинку
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFile(
                      e,
                      (res) => updateTrack(i, "image", res),
                      `track-image-${i}`,
                    )
                  }
                /> /* Changed for dark mode */
              )}
              {activeProgressId === `track-image-${i}` && (
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "#ddd",
                    marginTop: "5px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "orange",
                      width: `${progress}%`,
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
              )}
            </InputGroup>
            <button
              onClick={() => removeTrack(i)}
              style={{
                background: isDarkMode ? 'red' : '#F44336',
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: 5,
              }}
            >
              Видалити
            </button>
          </div>
        ))}
        {tracks.length < 10 && (
          <button
            onClick={addTrack}
            disabled={addCooldown > 0}
            style={{
              background: addCooldown > 0 ? (isDarkMode ? '#555' : 'grey') : 'orange',
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "5px 10px",
              marginBottom: 10,
            }}
          >
            {addCooldown > 0
              ? `Зачекайте ${addCooldown}s`
              : "+ Додати пісню вручну"}
          </button>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={handleSave}
            style={{ /* Changed for dark mode */
              background: "green",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "10px 20px",
            }}
          >
            Зберегти
          </button>
          <button
            onClick={onClose}
            style={{ /* Changed for dark mode */
              background: "grey",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "10px 20px",
            }}
          >
            Скасувати
          </button>
        </div>
      </LyricsModalContent>
    </ModalOverlay>
  );
};
const PlaylistModal = ({
  playlistKey,
  onClose,
  user,
  onOpenRegister,
  customTracks,
  onUpdateCustomPlaylist,
  onFsToggle,
  onEdit,
  onMiniPlayer,
  onAudioBar,
  onOpenAi,
  onDeleteTrack,
  customPlaylistName,
  initialFullScreenTrack,
  onUpdateUser,
  checkpoints,
  isDarkMode, // Added isDarkMode prop
  checkpointsEnabled,
  onSaveCheckpoint,
  onClearCheckpoint,
  onToggleCheckpoints,
}) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("favorites");
  const [isShuffle, setIsShuffle] = useState(false);
  const [playHistory, setPlayHistory] = useState([]); // Історія на 10 треків
  const [fullScreenTrack, setFullScreenTrack] = useState(null);
  const [isLyricsClosing, setIsLyricsClosing] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState(null); // Стан для вибраного автора
  const [authorModalInfo, setAuthorModalInfo] = useState(null);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialTargetTrack, setSocialTargetTrack] = useState(null);
  const [socialStats, setSocialStats] = useState(getInitialCommentStats());
  const [socialComments, setSocialComments] = useState([]);
  const [socialGlobalComments, setSocialGlobalComments] = useState([]);
  const [socialGlobalCommentCount, setSocialGlobalCommentCount] = useState(0);
  const [socialCommentText, setSocialCommentText] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialAuthUser, setSocialAuthUser] = useState(null);
  const [socialCommentQuotaUsed, setSocialCommentQuotaUsed] = useState(0);
  const [socialCommentError, setSocialCommentError] = useState("");
  const [socialReactionState, setSocialReactionState] = useState(0);
  const [socialCommentCount, setSocialCommentCount] = useState(0);

  useEffect(() => {
    setSelectedAuthor(null);
  }, [playlistKey]);

  useEffect(() => {
    const loadCheckpoints = async () => {
      try {
        const bgMode = await localforage.getItem("background_mode_enabled");
        if (bgMode !== null) setBackgroundMode(bgMode);
      } catch (e) {
        console.error(e);
      }
    };
    loadCheckpoints();
  }, []);

  const handleToggleBackgroundMode = useCallback(async () => {
    const val = !backgroundMode;
    setBackgroundMode(val);
    await localforage.setItem("background_mode_enabled", val);
  }, [backgroundMode]);

  const getSocialQuotaKey = useCallback((trackId, currentUser) => {
    const day = new Date().toISOString().slice(0, 10);
    const uid = currentUser?.uid || currentUser?.id || currentUser?.account || "guest";
    return `music_comment_quota_${trackId}_${uid}_${day}`;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setSocialAuthUser({
          uid: firebaseUser.uid,
          account: firebaseUser.email || "",
          firstName: firebaseUser.displayName || firebaseUser.email || "Користувач",
          avatar: firebaseUser.photoURL || "",
          email: firebaseUser.email || "",
        });
      } else {
        setSocialAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showSocialModal || !socialTargetTrack?.id) return undefined;

    const statsRef = doc(db, "music_social_stats", String(socialTargetTrack.id));
    const trackCommentsRef = query(
      collection(db, "music_social_comments"),
      where("trackId", "==", String(socialTargetTrack.id)),
      orderBy("createdAt", "desc"),
      limit(MAX_TOTAL_COMMENTS),
    );
    const globalCommentsRef = query(
      collection(db, "music_social_comments"),
      orderBy("createdAt", "desc"),
      limit(MAX_TOTAL_COMMENTS * 10),
    );

    const unsubscribeStats = onSnapshot(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSocialStats({
          views: data.views || 0,
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          comments: data.comments || 0,
        });
      } else {
        setSocialStats(getInitialCommentStats());
      }
    });

    const unsubscribeTrackComments = onSnapshot(trackCommentsRef, (snapshot) => {
      const next = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setSocialComments(next);
      setSocialCommentCount(next.length);
    });

    const unsubscribeGlobalComments = onSnapshot(globalCommentsRef, (snapshot) => {
      const next = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setSocialGlobalComments(next.slice(0, MAX_TOTAL_COMMENTS));
      setSocialGlobalCommentCount(next.length);
    });

    const updateView = async () => {
      try {
        const current = await getDoc(statsRef);
        const data = current.exists() ? current.data() : getInitialCommentStats();
        await setDoc(statsRef, { ...data, views: (data.views || 0) + 1 }, { merge: true });
      } catch (error) {
        console.error("Social view update failed", error);
      }
    };

    updateView();
    return () => {
      unsubscribeStats();
      unsubscribeTrackComments();
      unsubscribeGlobalComments();
    };
  }, [showSocialModal, socialTargetTrack?.id]);

  useEffect(() => {
    if (!showSocialModal || !socialTargetTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentQuotaUsed(0);
      return;
    }
    const quotaKey = getSocialQuotaKey(String(socialTargetTrack.id), currentUser);
    localforage.getItem(quotaKey).then((value) => {
      setSocialCommentQuotaUsed(Number(value) || 0);
    }).catch(() => {
      setSocialCommentQuotaUsed(0);
    });
  }, [getSocialQuotaKey, showSocialModal, socialAuthUser, socialTargetTrack?.id, user]);

  useEffect(() => {
    if (!user?.uid && !socialAuthUser?.uid) return;
    const key = `${socialTargetTrack?.id || "track"}:${user?.uid || socialAuthUser?.uid}`;
    const savedState = localforage.getItem(key).then((value) => {
      if (value !== null) setSocialReactionState(normalizeLikeValue(value));
    }).catch(() => {});
    return () => {
      savedState.catch(() => {});
    };
  }, [socialAuthUser, socialTargetTrack?.id, user]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      setSocialAuthUser({
        uid: firebaseUser.uid,
        account: firebaseUser.email || "",
        firstName: firebaseUser.displayName || firebaseUser.email || "Користувач",
        avatar: firebaseUser.photoURL || "",
        email: firebaseUser.email || "",
      });
      setSocialCommentError("");
    } catch (error) {
      setSocialCommentError("Не вдалося увійти через Google");
      console.error(error);
    }
  }, []);

  const handleSocialCommentSubmit = useCallback(async () => {
    if (!socialTargetTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentError("Спочатку увійдіть, щоб залишити коментар");
      return;
    }

    const text = socialCommentText.trim();
    if (!text) {
      setSocialCommentError("Коментар не може бути порожнім");
      return;
    }
    if (text.length > 1000) {
      setSocialCommentError("Коментар не може перевищувати 1000 символів");
      return;
    }

    setSocialLoading(true);
    setSocialCommentError("");

    try {
      const quotaKey = getSocialQuotaKey(String(socialTargetTrack.id), currentUser);
      const storedQuota = (await localforage.getItem(quotaKey)) || 0;
      if (storedQuota >= MAX_DAILY_COMMENTS) {
        setSocialCommentError("Сьогодні ви вже використали 4 коментарі");
        setSocialLoading(false);
        return;
      }

      const payload = buildCommentPayload({
        trackId: String(socialTargetTrack.id),
        user: currentUser,
        text,
        avatar: currentUser.avatar || currentUser.photoURL || "",
        color: currentUser.borderColor || currentUser.textColor || currentUser.color || "#ffb36c",
        supporterName: currentUser.firstName || currentUser.name || currentUser.displayName || currentUser.account,
      });
      await setDoc(doc(db, "music_social_comments", payload.id), payload);
      await updateDoc(doc(db, "music_social_stats", String(socialTargetTrack.id)), {
        comments: (socialStats.comments || 0) + 1,
        updatedAt: serverTimestamp(),
      }).catch(async () => {
        await setDoc(doc(db, "music_social_stats", String(socialTargetTrack.id)), { comments: 1, likes: 0, dislikes: 0, views: 0 }, { merge: true });
      });
      await localforage.setItem(quotaKey, storedQuota + 1);
      setSocialCommentQuotaUsed(storedQuota + 1);
      setSocialCommentText("");
    } catch (error) {
      console.error("Comment submit failed", error);
      setSocialCommentError("Не вдалося зберегти коментар");
    } finally {
      setSocialLoading(false);
    }
  }, [getSocialQuotaKey, socialCommentText, socialStats.comments, socialTargetTrack?.id, socialAuthUser, user]);

  const handleSocialReaction = useCallback(async (nextValue) => {
    if (!socialTargetTrack?.id) return;
    const currentUser = socialAuthUser || user;
    if (!currentUser) {
      setSocialCommentError("Увійдіть, щоб ставити реакції");
      return;
    }

    const normalized = normalizeLikeValue(nextValue);
    const reactionKey = `${String(socialTargetTrack.id)}:${currentUser.uid || currentUser.id || currentUser.account}`;
    const previous = socialReactionState;
    const statsRef = doc(db, "music_social_stats", String(socialTargetTrack.id));
    const currentState = previous === normalized ? 0 : normalized;
    setSocialReactionState(currentState);
    await localforage.setItem(reactionKey, currentState);

    try {
      const snapshot = await getDoc(statsRef);
      const data = snapshot.exists() ? snapshot.data() : getInitialCommentStats();
      const likes = (data.likes || 0) + (currentState === 1 ? 1 : previous === 1 ? -1 : 0);
      const dislikes = (data.dislikes || 0) + (currentState === -1 ? 1 : previous === -1 ? -1 : 0);
      await setDoc(statsRef, { ...data, likes, dislikes }, { merge: true });
      setSocialStats((prev) => ({ ...prev, likes, dislikes }));
    } catch (error) {
      console.error("Reaction update failed", error);
    }
  }, [socialAuthUser, socialReactionState, socialTargetTrack?.id, user]);

  const voiceActingMode = user?.voiceActingMode || "malyatko";

  useEffect(() => {
    if (initialFullScreenTrack) {
      setFullScreenTrack(initialFullScreenTrack);
    }
  }, [initialFullScreenTrack]);

  useEffect(() => {
    onFsToggle(!!fullScreenTrack);
  }, [fullScreenTrack, onFsToggle]);

  const [lyricsModalData, setLyricsModalData] = useState(null);
  const [lyricsCurrentTime, setLyricsCurrentTime] = useState(0);
  const [levelEditorTrack, setLevelEditorTrack] = useState(null);
  const handleCloseLevelEditor = () => setLevelEditorTrack(null);

  const handleSaveLevelEditor = async (updatedTrack) => { /* Changed for dark mode */
    if (!customTracks) return;
    const updatedTracks = customTracks.map((t) =>
      t.id === updatedTrack.id ? updatedTrack : t,
    );
    const currentCP = (await localforage.getItem("custom_playlist")) || {};

    const updatedPlaylist = { ...currentCP, tracks: updatedTracks };
    if (onUpdateCustomPlaylist) {
      onUpdateCustomPlaylist(updatedPlaylist);
    }
    try {
      await localforage.setItem("custom_playlist", updatedPlaylist);
      setLevelEditorTrack(null);
    } catch (e) {
      console.error("Save error:", e);
      if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
        alert("❌ Помилка: Перевищено ліміт пам'яті браузера! Спробуйте видалити частину пісень або зменшити розмір зображень.");
      } else {
        alert("❌ Помилка при збереженні змін.");
      }
    }
  };
  const [favorites, setFavorites] = useState([]); /* Changed for dark mode */
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setIsHydrated(true);
        return;
      }
      try {
        const saved = await localforage.getItem("music_favorites");
        if (saved) setFavorites(saved);
      } catch (e) {
        console.error("Помилка завантаження обраного:", e);
      } finally {
        setIsHydrated(true);
      }
    };
    loadFavorites();
  }, [user]);

  useEffect(() => {
    if (isHydrated && user) {
      localforage.setItem("music_favorites", favorites);
    }
  }, [favorites, isHydrated, user]);

  const getRating = useCallback(
    (id) => {
      if (Array.isArray(favorites)) return favorites.includes(id) ? 1 : 0;
      return favorites[id] || 0;
    },
    [favorites],
  );

  const handleToggleFavorite = (id) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const currentRating = getRating(id);
    let nextRating;
    // Цикл: 0 (біле) -> 1 (червоне) -> 2 (золоте) -> -1 (дизлайк) -> 0 (біле)
    if (currentRating === 0) nextRating = 1;
    else if (currentRating === 1) nextRating = 2;
    else if (currentRating === 2) nextRating = -1;
    else nextRating = 0;

    // Ліміт знятий — можна оцінювати скільки завгодно пісень
    setFavorites((prev) => {
      if (Array.isArray(prev)) {
        const newObj = {};
        prev.forEach((p) => (newObj[p] = 1));
        newObj[id] = nextRating;
        if (nextRating === 0) delete newObj[id];
        return newObj;
      }

      const newObj = { ...prev };
      if (nextRating === 0) delete newObj[id];
      else newObj[id] = nextRating;
      return newObj;
    });
  };

  const handleCloseLyricsModal = (e) => {
    if (e) e.stopPropagation();
    setIsLyricsClosing(true);
    setTimeout(() => { /* Changed for dark mode */
      setLyricsModalData(null);
      setIsLyricsClosing(false);
    }, 500);
  };
  useEffect(() => {
    if (
      lyricsModalData &&
      lyricsModalData.audioRef &&
      lyricsModalData.audioRef.current
    ) {
      const audioEl = lyricsModalData.audioRef.current;
      const handleTimeUpdate = () => {
        setLyricsCurrentTime(audioEl.currentTime);
      };
      audioEl.addEventListener("timeupdate", handleTimeUpdate);
      handleTimeUpdate();
      return () => {
        if (audioEl)
          audioEl.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [lyricsModalData]);
  const getAuthorGroupedCards = useMemo(() => {
    let cards = musicCards;
    if (customTracks) { /* Changed for dark mode */
      cards = [...cards, ...customTracks];
    }
    cards = cards.filter((card) =>
      (card.text || "").toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const grouped = {};
    cards.forEach((card) => {
      const author = card.author || "Невідомий автор";
      if (!grouped[author]) {
        grouped[author] = [];
      }
      grouped[author].push(card);
    });

    return Object.entries(grouped).map(([author, tracks]) => ({
      author,
      tracks,
      image: tracks[0].image, 
    }));
  }, [searchQuery, customTracks]);

  const processedCards = useMemo(() => {
    let filtered = musicCards;
    if (customTracks) {
      filtered = [...filtered, ...customTracks];
    }
    if (playlistKey !== "allSongs" && playlistKey !== "custom") {
      filtered = filtered.filter(card => card.category === playlistKey);
    }
    filtered = filtered.filter((card) =>
      (card.text || "").toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOption === "favorites") {
      return [...filtered].sort((a, b) => {
        const aR = getRating(a.id);
        const bR = getRating(b.id);
        return bR - aR;
      });
    } else if (sortOption === "name_asc") {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.author));
    } else if (sortOption === "name_desc") {
      return [...filtered].sort((a, b) => b.text.localeCompare(a.author));
    } else if (sortOption === "duration_asc") {
      return [...filtered].sort(
        (a, b) => (a.duration || 0) - (b.duration || 0),
      );
    } else if (sortOption === "duration_desc") {
      return [...filtered].sort(
        (a, b) => (b.duration || 0) - (a.duration || 0),
      );
    }
    return filtered; /* Changed for dark mode */
  }, [playlistKey, searchQuery, sortOption, customTracks, getRating]);
  const handleSetFullScreenTrack = useCallback(
    (newTrack) => {
      if (fullScreenTrack && newTrack && fullScreenTrack.id !== newTrack.id) {
        setPlayHistory((prev) => {
          const next = [...prev, fullScreenTrack];
          return next.slice(-10); 
        });
      }
      setFullScreenTrack(newTrack);
    },
    [fullScreenTrack],
  );

  const handleTrackEnd = (id) => {
    const currentTracks = selectedAuthor
      ? getAuthorGroupedCards.find((a) => a.author === selectedAuthor)?.tracks || []
      : processedCards;

    if (isShuffle) {
      const remaining = currentTracks.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        if (fullScreenTrack) handleSetFullScreenTrack(remaining[randomIndex]);
      } else {
        if (fullScreenTrack) setFullScreenTrack(null);
      }
      return;
    }
    const currentIndex = currentTracks.findIndex((c) => c.id === id);
    if (currentIndex !== -1 && currentIndex < currentTracks.length - 1) {
      if (fullScreenTrack)
        handleSetFullScreenTrack(currentTracks[currentIndex + 1]);
    } else {
      if (fullScreenTrack) setFullScreenTrack(null);
    }
  };
  const playNext = () => {
    if (!fullScreenTrack) return;
    handleTrackEnd(fullScreenTrack.id);
  };
  const playPrev = () => {
    if (playHistory.length > 0) {
      const prevTrack = playHistory[playHistory.length - 1];
      setPlayHistory((prev) => prev.slice(0, -1));
      setFullScreenTrack(prevTrack); // Назад без handleSet, щоб не зациклити історію
      return;
    }
    const currentTracks = selectedAuthor
      ? getAuthorGroupedCards.find((a) => a.author === selectedAuthor)?.tracks || []
      : processedCards;

    const idx = currentTracks.findIndex((c) => c.id === fullScreenTrack.id);
    if (idx > 0) {
      handleSetFullScreenTrack(currentTracks[idx - 1]);
    }
  };
  
  return (
    <div style={{ width: "100%" }}>
            <AihelpTitle $isDarkMode={isDarkMode}>Музика</AihelpTitle>
      <div 
        style={{
          background: "transparent",
          padding: "10px",
          width: "100%",
          position: "relative",
        }}
      >
        <ControlsContainer>
            <button 
            onClick={() => onEdit && onEdit()}
            style={{
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "5px 10px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Стати творцем
          </button>
          <button 
            onClick={() => {
              setSocialTargetTrack(toSocialTarget({ id: "general", text: "Усі пісні", isGeneral: true }));
              setShowSocialModal(true);
            }}
            style={{
              background: "#4c78ff",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "5px 10px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "13px",
              marginLeft: "10px",
            }}
          >
            Загальний Чат 💬
          </button>
          <SearchInput $isDarkMode={isDarkMode}
            type="text"
            placeholder="Пошук пісні за описом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} $isDarkMode={isDarkMode}
          >
            <option value="favorites">Улюблені</option>
            <option value="name_asc">Назва (А-Я)</option>
            <option value="name_desc">Назва (Я-А)</option>
            <option value="duration_asc">Тривалість (мін-макс)</option>
            <option value="duration_desc">Тривалість (макс-мін)</option>
          </SortSelect>
        </ControlsContainer>

        <MusicPhotoFix>
          {!selectedAuthor ? (
            // Показуємо авторів /* Changed for dark mode */
            getAuthorGroupedCards.slice(0, visibleCount).map((authorData) => (
              <div key={authorData.author} style={{ position: "relative", marginBottom: 5 }}>
                <AuthorCardWrapper onClick={() => setSelectedAuthor(authorData.author)}>
                  <img src={authorData.image} alt={authorData.author} />
                  <AuthorInfoOverlay>
                    <h3>{authorData.author}</h3>
                    <p>📚 {authorData.tracks.length} пісні</p>
                  </AuthorInfoOverlay>
                </AuthorCardWrapper>
              </div>
            ))
          ) : (
            // Показуємо пісні обраного автора /* Changed for dark mode */
            <>
              {(() => {
                const authorMeta = authorsData.find((a) => a.author === selectedAuthor);
                if (authorMeta) {
                  const links = parseAuthorLinks(authorMeta);
                  const authorGroup = getAuthorGroupedCards.find((a) => a.author === selectedAuthor);
                  const previewImage = authorGroup?.image;
                  return (
<AuthorPreviewCard>
  <AuthorPreviewImage>
    {previewImage && <img src={previewImage} alt={selectedAuthor} />}
    <AuthorPreviewActions style={{ position: 'absolute', bottom: 50, left: 24, zIndex: 4 }}>
      <AuthorPreviewBtn $variant="back" onClick={() => setSelectedAuthor(null)}>
        ← Назад до авторів
      </AuthorPreviewBtn>
      {links.map((linkObj, i) => (
        <RotatingLinkButton key={i} href={linkObj.url} names={linkObj.names} />
      ))}
    </AuthorPreviewActions>
    <AuthorPreviewName>{selectedAuthor}</AuthorPreviewName>
  </AuthorPreviewImage>
  <AuthorPreviewBody>
    {authorMeta.info && (
      <AuthorPreviewSection 
        $accent="#667eea"
        onClick={() => setAuthorModalInfo({ title: "Про автора", text: authorMeta.info, accent: "#667eea" })}
      >
        <span className="section-label" style={{ fontWeight: 'bold' }}>ℹ️ Про автора: </span>
        <span className="section-text">{authorMeta.info}</span>
      </AuthorPreviewSection>
    )}
    {authorMeta["Замітка"] && (
      <AuthorPreviewSection 
        $accent="#f59e0b"
        onClick={() => setAuthorModalInfo({ title: "Замітка", text: authorMeta["Замітка"], accent: "#f59e0b" })}
      >
        <span className="section-label" style={{ fontWeight: 'bold' }}>✍️ Замітка: </span>
        <span className="section-text">{authorMeta["Замітка"]}</span>
      </AuthorPreviewSection>
    )}
    {authorMeta["Примітка"] && (
      <AuthorPreviewSection 
        $accent="#10b981"
        onClick={() => setAuthorModalInfo({ title: "Примітка", text: authorMeta["Примітка"], accent: "#10b981" })}
      >
        <span className="section-label" style={{ fontWeight: 'bold' }}>📌 Примітка: </span>
        <span className="section-text">{authorMeta["Примітка"]}</span>
      </AuthorPreviewSection>
    )}
  </AuthorPreviewBody>
  
</AuthorPreviewCard>
                  );
                }
                return null;
              })()}
              {getAuthorGroupedCards
                .find((a) => a.author === selectedAuthor)
                ?.tracks.slice(0, visibleCount)
                .map((card) => (
                  <div
                    key={card.id}
                    style={{ position: "relative", marginBottom: 10 }}
                  >
                    <MusicCard
                      cardData={card}
                      user={user}
                      rating={getRating(card.id)} // Pass rating
                      onOpenModal={setLyricsModalData} // Pass lyrics modal handler
                      onOpenPlayer={(id, startTime) => { // Pass player open handler
                        const t = getAuthorGroupedCards
                          .find((a) => a.author === selectedAuthor)
                          ?.tracks.find((c) => c.id === id); /* Changed for dark mode */
                        handleSetFullScreenTrack({
                          ...t,
                          initialTime: startTime || 0,
                        });
                      }} // Pass player open handler
                      onRate={handleToggleFavorite} // Pass rating handler
                      onOpenAi={onOpenAi} // Pass AI handler
                      onOpenSocial={(selectedCard) => {
                        setSocialTargetTrack(toSocialTarget(selectedCard));
                        setShowSocialModal(true);
                      }}
                      onOpenInfo={(selectedCard) => {
                        setSocialTargetTrack(toSocialTarget(selectedCard));
                        setShowSocialModal(true);
                      }}
                      checkpoint={checkpoints[card.id]}
                      checkpointsEnabled={checkpointsEnabled}
                    />
                    {playlistKey === "custom" && (
                      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 2, display: 'flex', gap: 8 }}>
                        <button
                          style={{
                            background: "#7afcff",
                            color: "#222",
                            border: "none",
                            borderRadius: 8,
                            padding: "4px 10px",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => setLevelEditorTrack(card)}
                        >
                          Налаштувати
                        </button>
                        <button
                          title="Відкрити загальний чат"
                          style={{
                            background: "#4c78ff",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            padding: "4px 8px",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSocialTargetTrack(toSocialTarget({ id: "general", text: "Усі пісні", isGeneral: true }));
                            setShowSocialModal(true);
                          }}
                        >
                          💬
</button>
                      </div>
                    )}
                  </div>
                ))}   {}
            </>
          )}
                  </MusicPhotoFix>
        {levelEditorTrack && ( /* Changed for dark mode */
          <ModalOverlay onClick={handleCloseLevelEditor}>
            <PlaylistModalContent onClick={(e) => e.stopPropagation()}>
              <PlaylistCloseButton onClick={handleCloseLevelEditor}>
                &times;
              </PlaylistCloseButton>
              <h3>Level Editor</h3>
              <div style={{ marginBottom: 10 }}>
                <label>Текст для lyrics:</label>
                <input
                  type="text"
                  value={levelEditorTrack.lyrics?.[0]?.text || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      lyrics: [
                        {
                          time: levelEditorTrack.lyrics?.[0]?.time || 0,
                          text: val,
                        },
                      ], /* Changed for dark mode */
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Час появи тексту (сек):</label>
                <input
                  type="number"
                  value={levelEditorTrack.lyrics?.[0]?.time || 0}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      lyrics: [
                        {
                          time: val,
                          text: levelEditorTrack.lyrics?.[0]?.text || "",
                        },
                      ],
                    }); /* Changed for dark mode */
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Фільтри (JSON):</label>
                <textarea
                  value={JSON.stringify(
                    levelEditorTrack.filters || [],
                    null,
                    2,
                  )}
                  onChange={(e) => {
                    let val = e.target.value;
                    try {
                      setLevelEditorTrack({
                        ...levelEditorTrack,
                        filters: JSON.parse(val),
                      });
                    } catch {}
                  }}
                  rows={8} /* Changed for dark mode */
                  style={{ width: "100%", fontFamily: "monospace" }}
                />
                <button
                  style={{
                    marginTop: 5,
                    background: "#ffb36c",
                    border: "none",
                    borderRadius: 5,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      filters: [
                        {
                          start: 22,
                          end: 49,
                          type: "symbols",
                          isRandomIntensity: true,
                          minIntensity: 130,
                          maxIntensity: 300,
                          isRandomSpeed: true,
                          minSpeed: 0.5,
                          maxSpeed: 5,
                          isRandomBlurSymbols: true,
                          minBlurSymbols: 0,
                          maxBlurSymbols: 2.5,
                        },
                        { start: 0.1, end: 0.4, type: "flash", opacity: 1 },
                        { start: 7, end: 20, type: "black", opacity: 1 },
                        { start: 20, end: 23, type: "grayscale", opacity: 1 },
                        {
                          start: 21,
                          end: 37,
                          randomColor: true,
                          colorOptions: ["red", "green"],
                          isRandom: true,
                          minOpacity: 0.15,
                          maxOpacity: 0.45,
                          isRandomBlur: true,
                          minBlur: 0,
                          maxBlur: 3,
                        },
                        {
                          start: 37,
                          end: 49.7,
                          randomColor: true,
                          colorOptions: ["orange", "cyan"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 49.7, end: 50, type: "flash", opacity: 1 },
                        {
                          start: 50,
                          end: 55,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.4,
                          maxOpacity: 0.8,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 59,
                          end: 64,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.6,
                          maxOpacity: 0.9,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 68,
                          end: 72,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.7,
                          maxOpacity: 0.8,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 72,
                          end: 87,
                          randomColor: true,
                          colorOptions: ["purple", "blue"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 87,
                          end: 100,
                          randomColor: true,
                          colorOptions: ["brown", "orange"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 100, end: 103, type: "grayscale", opacity: 1 },
                        {
                          start: 103,
                          end: 133,
                          randomColor: true,
                          colorOptions: ["cyan", "chaos"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 133, end: 135, type: "grayscale", opacity: 1 },
                        {
                          start: 135,
                          end: 166,
                          type: "red",
                          minOpacity: 0.15,
                          isRandom: true,
                          maxOpacity: 0.45,
                        },
                      ],
                    });
                  }}
                >
                  Додати фільтри
                </button>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Зображення (до 7):</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(levelEditorTrack.images || []).map((img, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 5,
                        }}
                      />
                      <button
                        onClick={() => {
                          setLevelEditorTrack({
                            ...levelEditorTrack,
                            images: levelEditorTrack.images.filter(
                              (_, i) => i !== idx,
                            ),
                          });
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {levelEditorTrack.images &&
                    levelEditorTrack.images.length < 7 && (
                      <input
                        type="text"
                        placeholder="URL..."
                        style={{ width: 100 }}
                        onBlur={(e) => {
                          const val = e.target.value.trim();
                          if (val) {
                            setLevelEditorTrack({
                              ...levelEditorTrack,
                              images: [...(levelEditorTrack.images || []), val],
                            });
                            e.target.value = "";
                          }
                        }}
                      />
                    )}
                </div>
              </div>
              <button
                style={{
                  background: "#7afcff",
                  color: "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
                onClick={() => handleSaveLevelEditor(levelEditorTrack)}
              >
                Зберегти
              </button>
            </PlaylistModalContent>
          </ModalOverlay>
        )}

        {(() => {
          const maxCount = selectedAuthor
            ? getAuthorGroupedCards.find((a) => a.author === selectedAuthor)?.tracks.length || 0
            : getAuthorGroupedCards.length; // Total number of authors
          return visibleCount < maxCount ? (
            <LoadMoreButton
              onClick={() => {
                if (visibleCount === 10) {
                  setVisibleCount(20);
                } else {
                  setVisibleCount(maxCount);
                }
              }}
            >
              ︾
            </LoadMoreButton>
          ) : null;
        })()}

        {lyricsModalData && (
          <ModalOverlay
            $isClosing={isLyricsClosing}
            onClick={handleCloseLyricsModal}
          >
            <LyricsModalContent
              $isClosing={isLyricsClosing}
              onClick={handleCloseLyricsModal}
            >
              <LyricsCloseButton onClick={handleCloseLyricsModal}>
                &times;
              </LyricsCloseButton>
              <LyricsModalImage
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
                <LyricsViewer
                  lyrics={lyricsModalData.lyrics}
                  currentTime={lyricsCurrentTime}
                  voiceActingMode={voiceActingMode}
                  trackText={lyricsModalData.text}
                />
              </LyricsContainer>
            </LyricsModalContent>
          </ModalOverlay>
        )}
      </div>
      {showSocialModal && socialTargetTrack && (
        <ModalOverlay onClick={() => setShowSocialModal(false)}>
          <PlaylistModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: 760, width: "92%", padding: 20, maxHeight: "85vh", overflowY: "auto", background: isDarkMode ? "#1f2335" : "#fffaf4", color: isDarkMode ? "#f2f2f2" : "#111" }}>
            <PlaylistCloseButton onClick={() => setShowSocialModal(false)} style={{ color: isDarkMode ? "#fff" : "#111" }}>
              &times;
            </PlaylistCloseButton>
            <h3>
        {socialTargetTrack?.isGeneral ? "🌐 Загальний чат" : `🎵 ${socialTargetTrack?.author || ""} — ${socialTargetTrack?.text || ""}`}
      </h3>
            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(255,179,108,0.2)", padding: "6px 10px", borderRadius: 999 }}>Тривалість: {Math.floor(socialTargetTrack.duration || 0)}с</span>
                <span style={{ background: "rgba(122,252,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Перегляди: {socialStats.views}</span>
                <span style={{ background: "rgba(255,107,107,0.15)", padding: "6px 10px", borderRadius: 999 }}>Лайки: {socialStats.likes}</span>
                <span style={{ background: "rgba(90,90,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Дизлайки: {socialStats.dislikes}</span>
                <span style={{ background: "rgba(255,255,255,0.15)", padding: "6px 10px", borderRadius: 999 }}>Коментарі: {socialCommentCount}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => handleSocialReaction(1)} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: socialReactionState === 1 ? "#ff4d6d" : "#e8e8e8", color: socialReactionState === 1 ? "#fff" : "#111" }}>❤ Лайк</button>
                <button onClick={() => handleSocialReaction(-1)} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: socialReactionState === -1 ? "#4c78ff" : "#e8e8e8", color: socialReactionState === -1 ? "#fff" : "#111" }}>👎 Дизлайк</button>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
              {/* ТУТ ВИПРАВЛЕНО: Додано початок тернарного оператора перевірки юзера */}
              {!(socialAuthUser || user) ? (
                <button onClick={handleGoogleSignIn} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: "#4285f4", color: "#fff" }}>🔑 Увійти з Google</button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {(getAvatarSrc(socialAuthUser?.avatar) || getAvatarSrc(user?.avatar)) && (
                    <img
                      src={getAvatarSrc(socialAuthUser?.avatar) || getAvatarSrc(user?.avatar)}
                      alt="avatar"
                      style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid #ffb36c" }}
                    />
                  )}
                  <span style={{ fontSize: 13, opacity: 0.8 }}>Увійшли як {socialAuthUser?.firstName || user?.firstName || user?.account || "користувач"}</span>
                </div>
              )}
              <span style={{ fontSize: 12, opacity: 0.7 }}>Залишилось коментарів сьогодні: {getDailyCommentQuotaLeft(MAX_DAILY_COMMENTS, socialCommentQuotaUsed)}</span>
            </div>
            {socialTargetTrack?.isGeneral && (
              <div style={{ background: "rgba(76,120,255,0.12)", borderRadius: 12, padding: "8px 14px", fontSize: 13, color: isDarkMode ? "#aac4ff" : "#2244aa", border: "1px solid rgba(76,120,255,0.25)", marginBottom: 8 }}>
                💬 Повідомлення будуть видимі всім у загальному чаті
              </div>
            )}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              {(getAvatarSrc(socialAuthUser?.avatar) || getAvatarSrc(user?.avatar)) && (
                <img
                  src={getAvatarSrc(socialAuthUser?.avatar) || getAvatarSrc(user?.avatar)}
                  alt="avatar"
                  style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #ffb36c", flexShrink: 0, marginTop: 2 }}
                />
              )}
              {(() => {
                const currentUser = socialAuthUser || user;
                const canComment = canCommentUser(currentUser);
                return (
                  <textarea
                    value={socialCommentText}
                    onChange={(e) => setSocialCommentText(e.target.value)}
                    maxLength={1000}
                    placeholder={!currentUser ? "Увійдіть щоб написати коментар..." : !canComment ? "Вам заборонено залишати коментарі" : "Залиште коментар..."}
                    disabled={!canComment}
                    style={{ flex: 1, minHeight: 90, borderRadius: 12, padding: 10, border: "1px solid rgba(0,0,0,0.15)", resize: "vertical", opacity: !canComment ? 0.6 : 1 }}
                  />
                );
              })()}
            </div>
            {socialCommentError && <div style={{ color: "#ff4d6d", fontSize: 12, marginTop: 6 }}>{socialCommentError}</div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{socialCommentText.length}/1000</span>
              <button onClick={handleSocialCommentSubmit} disabled={socialLoading} style={{ border: "none", borderRadius: 999, padding: "8px 12px", cursor: "pointer", background: "#ffb36c", color: "#111", opacity: socialLoading ? 0.6 : 1 }}>{socialLoading ? "Надсилаю..." : "Надіслати"}</button>
            </div>
            <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
              {!socialTargetTrack?.isGeneral && (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Коментарі до цієї пісні</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {socialComments.slice(0, MAX_VISIBLE_COMMENTS).map((comment) => (
                      <div key={comment.id} style={{ background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)", borderRadius: 14, padding: 10, border: "1px solid rgba(255,179,108,0.2)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${comment.user?.color || "#ffb36c"}`, overflow: "hidden", background: "#fff" }}>
                            {getAvatarSrc(comment.user?.avatar) ? <img src={getAvatarSrc(comment.user?.avatar)} alt={comment.user?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{comment.user?.name || "Гість"}</div>
                            <div style={{ fontSize: 11, opacity: 0.7 }}>{new Date(comment.createdAt || Date.now()).toLocaleString("uk-UA")}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{comment.text}</div>
                      </div>
                    ))}
                    {!socialComments.length && <div style={{ opacity: 0.7, fontSize: 13 }}>Ще немає коментарів до цієї пісні.</div>}
                  </div>
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Загальні коментарі ({socialGlobalCommentCount})</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {socialGlobalComments.map((comment) => (
                    <div key={comment.id} style={{ background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", borderRadius: 14, padding: 10, border: "1px solid rgba(122,252,255,0.2)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", border: `2px solid ${comment.user?.color || "#ffb36c"}`, overflow: "hidden", background: "#fff" }}>
                          {getAvatarSrc(comment.user?.avatar) ? <img src={getAvatarSrc(comment.user?.avatar)} alt={comment.user?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{comment.user?.name || "Гість"}</div>
                          <div style={{ fontSize: 11, opacity: 0.7 }}>{comment.trackId ? `Пісня #${comment.trackId}` : "Усі пісні"}</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{comment.text}</div>
                    </div>
                  ))}
                  {!socialGlobalComments.length && <div style={{ opacity: 0.7, fontSize: 13 }}>Ще немає загальних коментарів.</div>}
                </div>
              </div>
            </div>
          </PlaylistModalContent>
        </ModalOverlay>
      )}

      {fullScreenTrack && (
        <FullScreenPlayer
          track={fullScreenTrack}
          onClose={() => setFullScreenTrack(null)}
          onNext={playNext}
          onPrev={playPrev}
          user={user}
          rating={getRating(fullScreenTrack.id)}
          onRate={handleToggleFavorite}
          isShuffle={isShuffle}
          onSetShuffle={setIsShuffle}
          onMiniPlayer={(time, isPlaying, vol, spd) => {
            setFullScreenTrack(null);
            onMiniPlayer(fullScreenTrack, time, isPlaying, vol, spd);
          }}
          onAudioBar={(time, isPlaying, vol, spd) => {
            setFullScreenTrack(null);
            onAudioBar(fullScreenTrack, time, isPlaying, vol, spd);
          }}
          onOpenAi={onOpenAi}
          onOpenSocial={() => {
            setSocialTargetTrack(toSocialTarget(fullScreenTrack));
            setShowSocialModal(true);
          }}
          playlist={selectedAuthor
            ? processedCards : []} // Playlist should be the currently filtered songs
          onSelectTrack={setFullScreenTrack}
          onUpdateUser={onUpdateUser}
          checkpoint={checkpoints[fullScreenTrack.id]}
          onSaveCheckpoint={onSaveCheckpoint}
          onClearCheckpoint={onClearCheckpoint}
          checkpointsEnabled={checkpointsEnabled}
          onToggleCheckpoints={onToggleCheckpoints}
          backgroundMode={backgroundMode}
          onToggleBackgroundMode={handleToggleBackgroundMode}
        />
      )}

      <AnimatePresence>
        {authorModalInfo && (
          <ModalOverlay 
            onClick={() => setAuthorModalInfo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlaylistModalContent 
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                borderRadius: '16px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto',
                zIndex: 1000
              }}
            >
              <PlaylistCloseButton onClick={() => setAuthorModalInfo(null)} style={{ color: 'white' }}>
                &times;
              </PlaylistCloseButton>
              <h3 style={{ color: authorModalInfo.accent, marginBottom: '15px', borderBottom: `2px solid ${authorModalInfo.accent}40`, paddingBottom: '10px' }}>
                {authorModalInfo.title}
              </h3>
              <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', wordBreak: 'break-word', margin: 0 }}>
                {authorModalInfo.text}
              </p>
            </PlaylistModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

    </div>
  );
};

const parseAuthorLinks = (authorMeta) => {
  const links = [];
  if (authorMeta.link) {
    if (Array.isArray(authorMeta.link)) {
      authorMeta.link.forEach((l, i) => links.push({ url: l, names: [`Посилання ${i + 1}`] }));
    } else {
      links.push({ url: authorMeta.link, names: ["Посилання"] });
    }
  }

  const linkKeys = Object.keys(authorMeta).filter(k => k.startsWith('linkk'));
  linkKeys.forEach(key => {
    const suffix = key.replace('linkk', ''); 
    const url = authorMeta[key];
    const nameKeys = Object.keys(authorMeta).filter(k => k.startsWith(`linkname${suffix}`));
    nameKeys.sort();
    const names = nameKeys.map(nk => authorMeta[nk]);
    if (names.length === 0) names.push("Посилання");
    links.push({ url, names });
  });

  return links;
};

const RotatingLinkButton = ({ href, names }) => {
  const [index, setIndex] = useState(0);
  const namesStr = JSON.stringify(names);

  useEffect(() => {
    if (!names || names.length <= 1) return;
    const len = names.length;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % len);
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namesStr]);

  const currentName = names && names.length > 0 ? names[index] : "Посилання";

  return (
    <AuthorPreviewBtn
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      🔗 {currentName}
    </AuthorPreviewBtn>
  );
};

const MusicPhoto = ({ user, onOpenRegister, isAnyModalOpen, onUpdateUser, onFsToggle }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState("allSongs"); // Default to showing all songs/authors
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [miniPlayerTrack, setMiniPlayerTrack] = useState(null);
  const [miniPlayerInitialTime, setMiniPlayerInitialTime] = useState(0);
  const [miniPlayerInitialIsPlaying, setMiniPlayerInitialIsPlaying] =
    useState(false);
  const [miniPlayerInitialVolume, setMiniPlayerInitialVolume] = useState(1);
  const [miniPlayerInitialSpeed, setMiniPlayerInitialSpeed] = useState(1);
  const [audioBarTrack, setAudioBarTrack] = useState(null);
  const [activeAiTrack, setActiveAiTrack] = useState(null);
  const [restoreTrack, setRestoreTrack] = useState(null);

  const [checkpoints, setCheckpoints] = useState({});
  const [checkpointsEnabled, setCheckpointsEnabled] = useState(true);

  useEffect(() => {
    const loadCheckpoints = async () => {
      try {
        const saved = await localforage.getItem("music_checkpoints");
        if (saved) setCheckpoints(saved);
        const enabled = await localforage.getItem("checkpoints_enabled");
        if (enabled !== null) setCheckpointsEnabled(enabled);
      } catch (e) {
        console.error(e);
      }
    };
    loadCheckpoints();
  }, []);

  const handleSaveCheckpoint = useCallback(
    async (id, time) => {
      if (!checkpointsEnabled) return;
      setCheckpoints((prev) => {
        const next = { ...prev, [id]: time };
        localforage.setItem("music_checkpoints", next);
        return next;
      });
    },
    [checkpointsEnabled],
  );

  const handleClearCheckpoint = useCallback(async (id) => {
    setCheckpoints((prev) => {
      const next = { ...prev };
      delete next[id];
      localforage.setItem("music_checkpoints", next);
      return next;
    });
  }, []);

  const [customPlaylist, setCustomPlaylist] = useState(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const saved = await localforage.getItem("custom_playlist");
        if (saved) setCustomPlaylist(saved);
      } catch (e) {
        console.error("Помилка завантаження плейлиста:", e);
      }
    };
    loadPlaylist();
  }, []);

  useEffect(() => {
    if (isAnyModalOpen) {
      setMiniPlayerTrack(null);
      setAudioBarTrack(null);
    }
  }, [isAnyModalOpen, miniPlayerTrack]);

  const deleteTrackFromCustomPlaylist = async (trackId) => {
    if (!customPlaylist) {
      console.error("Custom playlist is null, cannot delete track.");
      return;
    }
    if (!Array.isArray(customPlaylist.tracks)) {
      console.error(
        "Custom playlist tracks is not an array, cannot delete track.",
      );
      return;
    }
    const updatedTracks = customPlaylist.tracks.filter((t) => t.id !== trackId);
    const updatedPlaylist = { ...customPlaylist, tracks: updatedTracks };
    setCustomPlaylist(updatedPlaylist);
    await localforage.setItem("custom_playlist", updatedPlaylist);
  };


  const saveCustomPlaylist = async (data) => {
    try {
      setCustomPlaylist(data);
      await localforage.setItem("custom_playlist", data);
      setShowCreateModal(false);
    } catch (e) {
      console.error("Save error:", e);
      if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
        alert("❌ Помилка: Недостатньо місця для збереження плейлиста. Спробуйте використати менше пісень або стиснути зображення.");
      } else {
        alert("Помилка збереження! Можливо, файли занадто великі.");
      }
    }
  };

  return (
    <MusicPhotoDiv $isAudioBarActive={!!audioBarTrack}>
      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSave={saveCustomPlaylist}
          initialData={customPlaylist}
        />
      )}

      <PlaylistModal
          playlistKey="allSongs"
          user={user}
          onOpenRegister={onOpenRegister}
          customTracks={customPlaylist?.tracks}
          onUpdateCustomPlaylist={setCustomPlaylist}
          onEdit={() => setShowCreateModal(true)}
          onMiniPlayer={(track, time, isPlaying, volume, speed) => {
            onFsToggle(false);
            setMiniPlayerTrack(track);
            setMiniPlayerInitialTime(time);
            setMiniPlayerInitialIsPlaying(isPlaying);
            setMiniPlayerInitialVolume(volume);
            setMiniPlayerInitialSpeed(speed);
            setCurrentPlaylist(null);
            setAudioBarTrack(null);
            setRestoreTrack(null);
          }}
          onAudioBar={(track, time, isPlaying, volume, speed) => {
            onFsToggle(false);
            setAudioBarTrack(track);
            setMiniPlayerInitialTime(time);
            setMiniPlayerInitialIsPlaying(isPlaying);
            setMiniPlayerInitialVolume(volume);
            setMiniPlayerInitialSpeed(speed);
            setCurrentPlaylist(null);
            setMiniPlayerTrack(null);
            setRestoreTrack(null);
          }}
          onOpenAi={setActiveAiTrack}
          onDeleteTrack={deleteTrackFromCustomPlaylist}
          onFsToggle={onFsToggle}
          customPlaylistName={
            currentPlaylist === "custom" ? customPlaylist?.name : null
          }
          initialFullScreenTrack={restoreTrack}
          onUpdateUser={onUpdateUser}
          checkpoints={checkpoints}
          checkpointsEnabled={checkpointsEnabled}
          onSaveCheckpoint={handleSaveCheckpoint}
          onClearCheckpoint={handleClearCheckpoint}
          onToggleCheckpoints={async () => {
            const val = !checkpointsEnabled;
            setCheckpointsEnabled(val);
            await localforage.setItem("checkpoints_enabled", val);
          }}
        />
      <AnimatePresence>
        {miniPlayerTrack && (
          <MiniPlayer
            track={miniPlayerTrack}
            initialTime={miniPlayerInitialTime}
            isPlaying={miniPlayerInitialIsPlaying}
            speed={miniPlayerInitialSpeed}
            volume={miniPlayerInitialVolume}
            checkpoint={checkpoints[miniPlayerTrack.id]}
            checkpointsEnabled={checkpointsEnabled}
            onSaveCheckpoint={handleSaveCheckpoint}
            onClearCheckpoint={handleClearCheckpoint}
            onClose={() => setMiniPlayerTrack(null)}
            onRestore={(time, isPlaying, volume, speed) => {
              const track = miniPlayerTrack;
              setMiniPlayerInitialTime(time);
              setMiniPlayerInitialIsPlaying(isPlaying);
              setMiniPlayerInitialVolume(volume);
              setMiniPlayerInitialSpeed(speed);
              setRestoreTrack(track);
              setMiniPlayerTrack(null);
              setCurrentPlaylist(
                track.category === "custom" ? "custom" : track.category,
              );
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {audioBarTrack && (
          <AudioBar
            track={audioBarTrack}
            initialTime={miniPlayerInitialTime}
            isPlaying={miniPlayerInitialIsPlaying}
            speed={miniPlayerInitialSpeed}
            volume={miniPlayerInitialVolume}
            onClose={() => setAudioBarTrack(null)}
            onRestore={(time, isPlaying, volume, speed) => {
              const track = audioBarTrack;
              setMiniPlayerInitialTime(time);
              setMiniPlayerInitialIsPlaying(isPlaying);
              setMiniPlayerInitialVolume(volume);
              setMiniPlayerInitialSpeed(speed);
              setRestoreTrack(track);
              setAudioBarTrack(null);
              setCurrentPlaylist(
                track.category === "custom" ? "custom" : track.category,
              );
            }}
            checkpoint={checkpoints[audioBarTrack.id]}
            checkpointsEnabled={checkpointsEnabled}
            onSaveCheckpoint={handleSaveCheckpoint}
            onClearCheckpoint={handleClearCheckpoint}
            onOpenAi={setActiveAiTrack}
          />
        )}
      </AnimatePresence>

      {activeAiTrack && (
        <SongAiModal
          track={activeAiTrack}
          onClose={() => setActiveAiTrack(null)}
        />
      )}
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;