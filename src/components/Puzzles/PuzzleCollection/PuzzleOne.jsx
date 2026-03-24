import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import decor from "../../../photos/fan-art/modaldecor.jpg";
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const Im = styled.img`
  display: block;
  width: 100%;       
  height: 100%;      
  object-fit: cover; 
  object-position: center;
`;
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRev = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
  color: #ffb36c;
  font-family: var(--font-family);
`;

const ProgressBar = styled.div`
  width: 250px;
  height: 8px;
  background: #333;
  border: 1px solid #ffb36c;
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #ffb36c;
  width: ${props => props.$percent}%;
  transition: width 0.2s;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 179, 108, 0.3);

  input {
    width: 80px;
    accent-color: #ffb36c;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    min-width: 20px;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-image:
  //   linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${decor});
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #111;
  color: white;
  overflow: hidden;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  gap: 2px;
  height: 60vh;
  max-height: 500px;
  aspect-ratio: 3 / 2;
  background: #222;
  border: 4px solid #444;
  padding: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const TileContent = styled.div`
  width: ${(props) => props.$cols * 100}%;
  height: ${(props) => props.$rows * 100}%;
  position: absolute;
  top: ${(props) => -props.$row * 100}%;
  left: ${(props) => -props.$col * 100}%;
  background-image: ${(props) => `url("${props.$image}")`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;
`;

const Tile = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: ${(props) => (props.$isCorrect ? "default" : "pointer")};
  filter: ${(props) =>
    props.$isSelected
      ? "brightness(1.4) contrast(1.2)"
      : props.$isCorrect
        ? "none"
        : "brightness(0.7) grayscale(0.3)"};
  border: ${(props) =>
    props.$isSelected
      ? "2px solid #ffb36c"
      : "1px solid rgba(255,255,255,0.05)"};
  box-sizing: border-box;
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px 15px;
  width: 95%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const GameButton = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid #ffb36c;
  color: #ffb36c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 179, 108, 0.1);
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GearContainer = styled(GameButton)`
  position: relative;
  overflow: hidden;
  .g {
    position: absolute;
    font-size: 16px;
    transition: 0.3s;
  }
  .g1 {
    top: 4px;
    left: 14px;
  }
  .g2 {
    bottom: 6px;
    left: 6px;
  }
  .g3 {
    bottom: 6px;
    right: 6px;
  }

  &:hover .g1 {
    animation: ${rotate} 3s linear infinite;
  }
  &:hover .g2 {
    animation: ${rotateRev} 3s linear infinite;
  }
  &:hover .g3 {
    animation: ${rotate} 3s linear infinite;
  }
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Modal = styled.div`
  background: #2e1a16;
  border: 3px solid #ffb36c;
  padding: 20px;
  width: 340px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ffb36c #2e1a16;
`;

const CustomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #ffb36c;

  input {
    accent-color: #ffb36c;
    cursor: pointer;
  }
`;

const DifficultyBtn = styled.button`
  background: #3e2723;
  color: #ffb36c;
  border: 1px solid #ffb36c;
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
`;
const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 15px;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #ffb36c; border-radius: 3px; }
`;

const ThemeItem = styled.div`
  cursor: pointer;
  border: 3px solid ${(props) => (props.$isActive ? "#4caf50" : "transparent")};
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3/2;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  &:hover {
    border-color: #ffb36c;
    transform: scale(1.02);
  }
`;

const PuzzleOne = ({ onExit }) => {
  const puzzleImages = useMemo(
    () => [
      {
        image: require("../../../photos/vip-images/dinofroz/vip-dinofroz.webp"),
        audio: require("../../../mp3/dinofroz.mp3"),
      },
      {
        image: require("../../../photos/fan-art/monody.jpg"),
        audio: require("../../../mp3/thefatrat-monody.mp3"),
      },
      {
        image: require("../../../photos/vip-images/asium/asium.jpg"),
        audio: require("../../../mp3/harmonic-japan.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/mechanik-kindom.mp3"),
      },
      {
        image: require("../../../photos/vip-images/christmas.jpg"),
        audio: require("../../../mp3/kolada.mp3"),
      },
      {
        image: require("../../../photos/vip-images/turkeys/ultra-vip-turkeys.webp"),
        audio: require("../../../mp3/turkeys.mp3"),
      },
      {
        image: require("../../../photos/fan-art/monody.jpg"),
        audio: require("../../../mp3/thefatrat-monody.mp3"),
      },
      {
        image: require("../../../photos/vip-images/vip-desert.webp"),
        audio: require("../../../mp3/wind.mp3"),
      },
      {
        image: require("../../../photos/vip-images/horror/horror.jpg"),
        audio: require("../../../mp3/horror.mp3"),
      },
      {
        image: require("../../../photos/vip-images/horse/horse.jpg"),
        audio: require("../../../mp3/horse.mp3"),
      },
      {
        image: require("../../../photos/vip-images/dinofroz/vip-dragons.jpg"),
        audio: require("../../../mp3/dragon.mp3"),
      },
      {
        image: require("../../../photos/vip-images/vip-soloveyko.jpg"),
        audio: require("../../../mp3/soloveyko.mp3"),
      },
      {
        image: require("../../../photos/vip-images/asium/asium.jpg"),
        audio: require("../../../mp3/harmonic-japan.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/mechanik-kindom.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/zootopia.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mia/miaandme.webp"),
        audio: require("../../../mp3/mia-and-me.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/electrodynamix.mp3"),
      },
      {
        image: require("../../../photos/fan-art/clubstep.jpg"),
        audio: require("../../../mp3/clubstep.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/fingerdash.mp3"),
      },
      {
        image: require("../../../photos/fan-art/theorytwo.jpg"),
        audio: require("../../../mp3/theoty-of-everything-ll.mp3"),
      },
      {
        image: require("../../../photos/vip-images/swamp/deadlocked.jpg"),
        audio: require("../../../mp3/deadlocked.mp3"),
      },
      {
        image: require("../../../photos/fan-art/theory.jpg"),
        audio: require("../../../mp3/theory-of-everyting.mp3"),
      },
      {
        image: require("../../../photos/fan-art/unity.jpg"),
        audio: require("../../../mp3/unity.mp3"),
      },
    ],
    [],
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [config, setConfig] = useState({
    cols: 6,
    rows: 4,
    maxMoves: 150,
    maxTime: 180,
    rotationChance: 0.35,
    label: "Нормальна",
  });

  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.maxTime);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const audioRef = useRef(null);
  const previewAudioRef = useRef(new Audio());
  const previewTimeoutRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const handleThemeHover = (audioSrc) => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);

    previewAudioRef.current.src = audioSrc;
    previewAudioRef.current.volume = volume;
    previewAudioRef.current.currentTime = 0;
    previewAudioRef.current.play().catch(() => {});

    previewTimeoutRef.current = setTimeout(() => {
      let vol = previewAudioRef.current.volume;
      const stepTime = 100;
      const steps = 3000 / stepTime;
      const volStep = vol / steps;

      fadeIntervalRef.current = setInterval(() => {
        if (previewAudioRef.current.volume > volStep) {
          previewAudioRef.current.volume -= volStep;
        } else {
          previewAudioRef.current.volume = 0;
          previewAudioRef.current.pause();
          clearInterval(fadeIntervalRef.current);
        }
      }, stepTime);
    }, 12000);
  };

  const handleThemeLeave = (resumeMain = true) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    
    previewAudioRef.current.pause();
    previewAudioRef.current.currentTime = 0;
    previewAudioRef.current.volume = volume;

    if (resumeMain && audioRef.current && volume > 0 && !isWon) {
        audioRef.current.play().catch(() => {});
    }
  };

  // On mount and unmount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    const audioEl = audioRef.current;
    return () => {
      audioEl.pause();
    };
  }, []);

  // On media change - with Loading Logic
  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      setLoadProgress(0);
      
      const currentItem = puzzleImages[currentMediaIndex];
      
      // Load Audio
      if (audioRef.current) {
        audioRef.current.src = currentItem.audio;
        audioRef.current.load();
      }

      // Load Image
      const img = new Image();
      img.src = currentItem.image;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // proceed anyway
      });
      setLoadProgress(100);

      setIsLoading(false);
      
      // Try playing audio after load
      audioRef.current.play().catch(() => {});
    };

    loadMedia();
  }, [currentMediaIndex, puzzleImages]);

  // On volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const initGame = useCallback(() => {
    const total = config.cols * config.rows;
    const initial = Array.from({ length: total }, (_, i) => ({
      id: i,
      rotation: Math.random() < config.rotationChance ? 180 : 0,
    }));
    let shuffled;
    do {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
    } while (shuffled.every((tile, index) => tile.id === index));
    setTiles(shuffled);
    setIsWon(false);
    setMoves(0);
    setTimeLeft(config.maxTime);
    setSelectedIdx(null);
  }, [config]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      alert("Час вичерпано!");
      initGame();
    }
  }, [timeLeft, isWon, initGame]);

  const checkAutoRestart = useCallback(
    (currentTiles, currentMoves) => {
      const incorrectCount = currentTiles.reduce(
        (acc, tile, idx) => (tile.id !== idx ? acc + 1 : acc),
        0,
      );
      const movesLeft = config.maxMoves - currentMoves;

      if (incorrectCount > movesLeft && !isWon) {
        alert("Недостатньо ходів для завершення! Перезапуск...");
        initGame();
        return true;
      }
      return false;
    },
    [config.maxMoves, isWon, initGame],
  );

  const handleTileClick = (index) => {
    if (isWon) return;
    if (selectedIdx === null) {
      if (tiles[index].id === index) return;
      setSelectedIdx(index);
    } else {
      if (selectedIdx === index) {
        setSelectedIdx(null);
        return;
      }
      const newTiles = [...tiles];
      const idx1 = selectedIdx;
      const idx2 = index;

      // 1. Swap
      [newTiles[idx1], newTiles[idx2]] = [newTiles[idx2], newTiles[idx1]];

      // 2. Chaos Shuffle (except swapped & correct ones)
      const lockedIndices = new Set([idx1, idx2]);
      newTiles.forEach((t, i) => {
        if (t.id === i) lockedIndices.add(i);
      });

      const indicesToShuffle = [];
      const tilesToShuffle = [];
      newTiles.forEach((t, i) => {
        if (!lockedIndices.has(i)) {
          indicesToShuffle.push(i);
          tilesToShuffle.push(t);
        }
      });

      if (tilesToShuffle.length > 0) {
        for (let i = tilesToShuffle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tilesToShuffle[i], tilesToShuffle[j]] = [
            tilesToShuffle[j],
            tilesToShuffle[i],
          ];
        }
        indicesToShuffle.forEach((pos, i) => {
          newTiles[pos] = tilesToShuffle[i];
        });
      }

      // 3. Fix rotation if tile is in correct place
      const updatedTiles = newTiles.map((t, i) =>
        t.id === i ? { ...t, rotation: 0 } : t
      );

      const newMoves = moves + 1;
      setTiles(updatedTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (updatedTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
      } else if (newMoves >= config.maxMoves) {
        alert("Ходи закінчились!");
        initGame();
      } else {
        checkAutoRestart(updatedTiles, newMoves);
      }
    }
  };
 const setDifficulty = (type, customParams = null) => {
    let newConfig;
    if (customParams) {
      newConfig = { ...customParams, label: "Власна" };
    } else {
      const presets = {
        easy: { cols: 5, rows: 3, maxMoves: 200, maxTime: 240, rotationChance: 0, label: "Легка" },
        normal: { cols: 6, rows: 4, maxMoves: 150, maxTime: 180, rotationChance: 0.35, label: "Нормальна" },
        hard: { cols: 8, rows: 5, maxMoves: 100, maxTime: 120, rotationChance: 0.6, label: "Екстремальна" },
      };
      newConfig = presets[type];
    }
    
    setConfig(newConfig);
    setShowSettings(false);
    setSelectedIdx(null); // Важливо: скидаємо вибір при зміні сітки
  };

  const handleSelectTheme = (index) => {
    handleThemeLeave(false);
    setCurrentMediaIndex(index);
    setShowThemeModal(false);
    setTimeout(() => initGame(), 100);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const currentMedia = puzzleImages[currentMediaIndex];

  return (
    <GameWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowSettings(false)}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${decor})`,
      }}
    >
      {isLoading && (
        <LoadingOverlay>
          <div>Завантаження медіа... {loadProgress}%</div>
          <ProgressBar><ProgressFill $percent={loadProgress} /></ProgressBar>
        </LoadingOverlay>
      )}
      <Board $cols={config.cols} $rows={config.rows}>
        {tiles.map((tile, index) => {
          const row = Math.floor(tile.id / config.cols);
          const col = tile.id % config.cols;

          return (
            <Tile
              key={tile.id}
              layout
              animate={{ rotate: tile.rotation }}
              $cols={config.cols}
              $rows={config.rows}
              $isCorrect={tile.id === index}
              $isSelected={selectedIdx === index}
              onClick={() => handleTileClick(index)}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <TileContent
                $cols={config.cols}
                $rows={config.rows}
                $col={col}
                $row={row}
                $image={currentMedia.image}
              />
            </Tile>
          );
        })}
      </Board>
      <div style={{ height: "30px" }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>Перемога! 🏆</h2>}
      </div>

      <BottomPanel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "13px",
            lineHeight: "1.4",
          }}
        >
          <span>
            <strong>Рівень:</strong> {config.label} ({config.cols}x{config.rows}
            )
          </span>
          <span>
            <strong>Час:</strong>{" "}
            <span style={{ color: timeLeft < 30 ? "#ff5252" : "#ffb36c" }}>
              {formatTime(timeLeft)}
            </span>{" "}
            | <strong>Ходи:</strong> {moves}/{config.maxMoves}
          </span>
        </div>

        <Controls>
          <VolumeControl title="Гучність музики">
            <span>{volume === 0 ? "🔇" : "🎵"}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </VolumeControl>
          <GearContainer
            onClick={(e) => {
    e.stopPropagation(); 
    setShowSettings(true);
  }}
            title="Налаштування"
          >
            <span className="g g1">⚙</span>
            <span className="g g2">⚙</span>
            <span className="g g3">⚙</span>
          </GearContainer>
          <GameButton onClick={initGame} title="Перезапустити">
            ⏭
          </GameButton>
                <GameButton onClick={() => setShowThemeModal(true)} style={{ width: 'auto', padding: '0 20px', borderRadius: '5px' }}>
        Стиль гри
      </GameButton>
          <GameButton onClick={onExit} title="Вийти">
            ✖
          </GameButton>
        </Controls>
      </BottomPanel>
      <AnimatePresence>
        {showSettings && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <Modal onClick={(e) => e.stopPropagation()}>
              <h3
                style={{ margin: "0", color: "#ffb36c", textAlign: "center" }}
              >
                Налаштування
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <DifficultyBtn onClick={() => setDifficulty("easy")}>
                  Легка (5x3, 0% оберту)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("normal")}>
                  Нормальна (6x4, 35% оберту)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("hard")}>
                  Екстремальна (8x5, 60% оберту)
                </DifficultyBtn>
              </div>

              <hr
                style={{
                  borderColor: "#ffb36c",
                  width: "100%",
                  margin: "5px 0",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#ffb36c",
                }}
              >
                Власні параметри:
              </span>

              <CustomRow>
                <span>Стовпці: {config.cols}</span>
                <input
                  type="range"
                  min="5"
                  max="8"
                  value={config.cols}
                  onChange={(e) =>
                    setConfig({ ...config, cols: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <CustomRow>
                <span>Ряди: {config.rows}</span>
                <input
                  type="range"
                  min="3"
                  max="5"
                  value={config.rows}
                  onChange={(e) =>
                    setConfig({ ...config, rows: parseInt(e.target.value) })
                  }
                />
              </CustomRow>
              <CustomRow>
                <span>Шанс повороту: {Math.round(config.rotationChance * 100)}%</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.rotationChance}
                  onChange={(e) => setConfig({ ...config, rotationChance: parseFloat(e.target.value) })}
                />
              </CustomRow>
              <CustomRow>
                <span>Макс. ходів: {config.maxMoves}</span>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={config.maxMoves}
                  onChange={(e) =>
                    setConfig({ ...config, maxMoves: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <CustomRow>
                <span>Час: {formatTime(config.maxTime)}</span>
                <input
                  type="range"
                  min="60"
                  max="600"
                  step="10"
                  value={config.maxTime}
                  onChange={(e) =>
                    setConfig({ ...config, maxTime: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <DifficultyBtn
                onClick={() => setDifficulty("custom", config)}
                style={{ background: "#4e342e", marginTop: "10px" }}
              >
                Застосувати власні
              </DifficultyBtn>

              <DifficultyBtn
                onClick={() => setShowSettings(false)}
                style={{ background: "#1b110f" }}
              >
                Закрити
              </DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
        {showThemeModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowThemeModal(false)}
          >
            <Modal onClick={(e) => e.stopPropagation()} style={{ width: '800px', maxWidth: '95vw' }}>
              <h3 style={{ margin: "0", color: "#ffb36c", textAlign: "center" }}>Оберіть тему</h3>
              <ThemeGrid>
                {puzzleImages.map((item, idx) => (
                  <ThemeItem 
                    key={idx} 
                    $isActive={currentMediaIndex === idx} 
                    onClick={() => handleSelectTheme(idx)}
                    onMouseEnter={() => handleThemeHover(item.audio)}
                    onMouseLeave={() => handleThemeLeave(true)}
                  >
                    <Im src={item.image} alt={`theme-${idx}`} />
                  </ThemeItem>
                ))}
              </ThemeGrid>
              <DifficultyBtn onClick={() => setShowThemeModal(false)}>Закрити</DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleOne;
