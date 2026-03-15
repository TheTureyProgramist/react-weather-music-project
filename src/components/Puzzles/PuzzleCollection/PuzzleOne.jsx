import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import lamp from "../../../photos/hero-header/lamp.jpeg";
import decor from "../../../photos/fan-art/modaldecor.jpg";
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRev = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
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

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const SliderImage = styled.img`
  width: 150px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ffb36c;
`;

const SliderButton = styled.button`
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
  border-radius: 50%;
  &:hover {
    background: rgba(255, 179, 108, 0.1);
    transform: scale(1.05);
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

const Tile = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.$image}");
  background-size: ${(props) => props.$cols * 100}%
    ${(props) => props.$rows * 100}%;
  background-position: ${(props) => props.$bgPosX}% ${(props) => props.$bgPosY}%;
  cursor: ${(props) => (props.$isCorrect ? "default" : "pointer")};
  background-repeat: no-repeat;
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

const HintImage = styled.img`
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 2px solid #ffb36c;
  background-image: url("${(props) => props.$img}");
  background-size: cover;
  background-position: center;
`;
const PuzzleOne = ({ onExit }) => {
  const puzzleImages = useMemo(
    () => [
      {
        image: require("../../../photos/vip-images/vip-dinofroz.webp"),
        audio: require("../../../mp3/dinofroz.mp3"),
      },
      {
        image: require("../../../photos/fan-art/monody.jpg"),
        audio: require("../../../mp3/thefatrat-monody.mp3"),
      },
      {
        image: require("../../../photos/vip-images/asium.jpg"),
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
        image: require("../../../photos/vip-images/ultra-vip-turkeys.webp"),
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
        image: require("../../../photos/vip-images/horror.jpg"),
        audio: require("../../../mp3/horror.mp3"),
      },
      {
        image: require("../../../photos/vip-images/horse.jpg"),
        audio: require("../../../mp3/horse.mp3"),
      },
      {
        image: require("../../../photos/vip-images/vip-dragons.jpg"),
        audio: require("../../../mp3/dragon.mp3"),
      },
      {
        image: require("../../../photos/vip-images/vip-soloveyko.jpg"),
        audio: require("../../../mp3/soloveyko.mp3"),
      },
      {
        image: require("../../../photos/vip-images/asium.jpg"),
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
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/zootopiatwo.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/mia-and-me.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/malatkotv-chapterone.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/malatkotv-chaptertwo.mp3"),
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/malatkotv-chapterthree.mp3"),
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
        image: require("../../../photos/fan-art/deadlocked.jpg"),
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
      {
        image: require("../../../photos/vip-images/vip-forest.webp"),
        audio: require("../../../mp3/calling.mp3"),
      },
    ],
    [],
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const finalImage = puzzleImages[currentMediaIndex].image;

  const [config, setConfig] = useState({
    cols: 6,
    rows: 4,
    maxMoves: 150,
    maxTime: 180,
    label: "Нормальна",
  });

  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.maxTime);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  // On mount and unmount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    const audioEl = audioRef.current;
    return () => {
      audioEl.pause();
    };
  }, []);

  // On media change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = puzzleImages[currentMediaIndex].audio;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed", e));
    }
  }, [currentMediaIndex, puzzleImages]);

  // On volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const initGame = useCallback(() => {
    const total = config.cols * config.rows;
    const initial = Array.from({ length: total }, (_, i) => ({ id: i }));
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
      [newTiles[selectedIdx], newTiles[index]] = [
        newTiles[index],
        newTiles[selectedIdx],
      ];

      const newMoves = moves + 1;
      setTiles(newTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (newTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
      } else if (newMoves >= config.maxMoves) {
        alert("Ходи закінчились!");
        initGame();
      } else {
        checkAutoRestart(newTiles, newMoves);
      }
    }
  };

  const handleHint = () => {
    if (isWon) return;
    const incorrectIndices = tiles
      .map((tile, idx) => (tile.id !== idx ? idx : null))
      .filter((idx) => idx !== null);

    if (incorrectIndices.length > 0) {
      const targetIdx = incorrectIndices[0];
      const currentIdxOfCorrectTile = tiles.findIndex(
        (t) => t.id === targetIdx,
      );

      const newTiles = [...tiles];
      [newTiles[targetIdx], newTiles[currentIdxOfCorrectTile]] = [
        newTiles[currentIdxOfCorrectTile],
        newTiles[targetIdx],
      ];

      const newMoves = moves + 1;
      setTiles(newTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (newTiles.every((t, i) => t.id === i)) setIsWon(true);
      else checkAutoRestart(newTiles, newMoves);
    }
  };

  const setDifficulty = (type, customParams = null) => {
    if (customParams) {
      setConfig({ ...customParams, label: "Власна" });
    } else {
      const presets = {
        easy: { cols: 5, rows: 3, maxMoves: 200, maxTime: 240, label: "Легка" },
        normal: {
          cols: 6,
          rows: 4,
          maxMoves: 150,
          maxTime: 180,
          label: "Нормальна",
        },
        hard: {
          cols: 8,
          rows: 5,
          maxMoves: 100,
          maxTime: 120,
          label: "Екстремальна",
        },
      };
      setConfig(presets[type]);
    }
    setShowSettings(false);
  };

  const handlePrev = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + puzzleImages.length) % puzzleImages.length,
    );
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % puzzleImages.length);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

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
      <Board $cols={config.cols} $rows={config.rows}>
        {tiles.map((tile, index) => {
          const row = Math.floor(tile.id / config.cols);
          const col = tile.id % config.cols;
          const bgPosX = (col / (config.cols - 1)) * 100;
          const bgPosY = (row / (config.rows - 1)) * 100;

          return (
            <Tile
              key={tile.id}
              layout
              $cols={config.cols}
              $rows={config.rows}
              $image={finalImage}
              $bgPosX={isNaN(bgPosX) ? 0 : bgPosX}
              $bgPosY={isNaN(bgPosY) ? 0 : bgPosY}
              $isCorrect={tile.id === index}
              $isSelected={selectedIdx === index}
              onClick={() => handleTileClick(index)}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
          );
        })}
      </Board>

      <SliderContainer>
        <SliderButton onClick={handlePrev}>{"<"}</SliderButton>
        <SliderImage src={finalImage} alt="Тема пазлу" />
        <SliderButton onClick={handleNext}>{">"}</SliderButton>
      </SliderContainer>

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

          <HintImage src={lamp} onClick={handleHint} title="Підказка" />

          <GearContainer
            onClick={() => setShowSettings(true)}
            title="Налаштування"
          >
            <span className="g g1">⚙</span>
            <span className="g g2">⚙</span>
            <span className="g g3">⚙</span>
          </GearContainer>

          <GameButton onClick={initGame} title="Перезапустити">
            ⏭
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
                  Легка (5x3, 240с, 200ходів, 4хв)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("normal")}>
                  Нормальна (6x4, 180с, 150х, 3хв)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("hard")}>
                  Екстремальна (8x5, 120с, 100х, 2хв)
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
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleOne;
