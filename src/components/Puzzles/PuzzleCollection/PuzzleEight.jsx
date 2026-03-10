import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import asium from "../../../mp3/dragon.mp3";
// import lamp from "../../../photos/hero-header/lamp.jpeg";

// --- Animations ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const rotate = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const rotateRev = keyframes`from { transform: rotate(0deg); } to { transform: rotate(-360deg); }`;
const pulse = keyframes`0% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.1); } 100% { transform: translate(-50%, -50%) scale(1); }`;
const redFlash = keyframes`0% { background: rgba(255, 0, 0, 0); } 50% { background: rgba(255, 0, 0, 0.4); } 100% { background: rgba(255, 0, 0, 0); }`;
const greenFlash = keyframes`0% { background: rgba(0, 255, 0, 0); } 50% { background: rgba(76, 175, 80, 0.3); } 100% { background: rgba(0, 255, 0, 0); }`;

// --- Styled Components ---
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #111;
  color: white;
  overflow: hidden;
  position: relative;
  &.error-flash::after {
    content: "";
    position: absolute;
    inset: 0;
    animation: ${redFlash} 0.4s ease-in-out;
    pointer-events: none;
    z-index: 50;
  }
  &.heal-flash::after {
    content: "";
    position: absolute;
    inset: 0;
    animation: ${greenFlash} 0.4s ease-in-out;
    pointer-events: none;
    z-index: 50;
  }
`;

const BoardContainer = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  margin: 10px 0;
`;

const Hex = styled.div`
  position: absolute;
  width: 52px;
  height: 46px; /* Pointy-top hex proportions */
  background: ${(props) => {
    if (!props.$visited) return "#3e2723";
    if (props.$obstacle) return "#ff5252";
    if (props.$bonus === "health") return "#e91e63";
    if (props.$bonus === "tower") return "#4caf50";
    return "#ffb36c";
  }};
  border: 1px solid ${(props) => (props.$visited ? "transparent" : "#ffb36c")};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: ${(props) => (props.$visited && !props.$obstacle ? "0 0 10px #ffb36c" : "none")};
  z-index: ${(props) => (props.$visited ? 2 : 1)};
  opacity: ${(props) => (props.$visited ? 1 : 0.85)};
  
  /* Positioning based on center of hex */
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  transform: translate(-50%, -50%);
`;

const CurrentMarker = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  animation: ${pulse} 1.5s infinite;
  z-index: 10;
  box-shadow: 0 0 15px white;
  pointer-events: none;
`;

const MoveArrow = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(255, 179, 108, 0.9);
  color: #111;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  transition: transform 0.1s, background 0.2s;

  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  
  /* Translate outward in the direction of the angle */
  transform: translate(-50%, -50%) rotate(${(props) => props.$angle}deg) translateX(36px);

  &:hover {
    background: #fff;
    transform: translate(-50%, -50%) rotate(${(props) => props.$angle}deg) translateX(40px) scale(1.1);
  }
  
  /* Inner icon counter-rotation is not needed if we want the arrow to point outward naturally */
  .icon {
    display: inline-block;
  }
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px 15px;
  width: 95%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  z-index: 60;
`;

const StatsBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  line-height: 1.4;
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
  &:hover:not(:disabled) {
    background: rgba(255, 179, 108, 0.1);
    transform: scale(1.05);
  }
`;

const GearContainer = styled(GameButton)`
  position: relative;
  overflow: hidden;
  .g { position: absolute; font-size: 16px; transition: 0.3s; }
  .g1 { top: 4px; left: 14px; }
  .g2 { bottom: 6px; left: 6px; }
  .g3 { bottom: 6px; right: 6px; }
  &:hover:not(:disabled) .g1 { animation: ${rotate} 3s linear infinite; }
  &:hover:not(:disabled) .g2 { animation: ${rotateRev} 3s linear infinite; }
  &:hover:not(:disabled) .g3 { animation: ${rotate} 3s linear infinite; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Modal = styled.div`
  background: #2e1a16;
  border: 3px solid #ffb36c;
  padding: 20px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DifficultyBtn = styled.button`
  background: #3e2723;
  color: #ffb36c;
  border: 1px solid #ffb36c;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
`;

// --- Game Logic Constants ---
const R = 27; // Hex Radius
const CENTER_X = 180;
const CENTER_Y = 180;
const DIRS = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
];

const getHexCoords = (q, r) => {
  const x = CENTER_X + 1.5 * R * q;
  const y = CENTER_Y + Math.sqrt(3) * R * (r + q / 2);
  return { x, y };
};

// --- Component ---
const PuzzleEight = ({ onExit }) => {
  const [config, setConfig] = useState({ obstacles: 6, label: "Середня" });
  
  const [cells, setCells] = useState([]);
  const [pos, setPos] = useState({ q: 0, r: 0 });
  const [lives, setLives] = useState(3);
  const [shield, setShield] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [flashState, setFlashState] = useState(null); // 'error' or 'heal'

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(asium));

  const initGame = useCallback((currConfig) => {
    let newCells = [];
    let validCoords = [];

    // Generate Hex Grid (Radius 3 -> 37 cells)
    for (let q = -3; q <= 3; q++) {
      for (let r = -3; r <= 3; r++) {
        if (Math.abs(q + r) <= 3) {
          const { x, y } = getHexCoords(q, r);
          const isCenter = q === 0 && r === 0;
          newCells.push({
            q, r, x, y,
            isVisited: isCenter,
            isObstacle: false,
            bonus: null,
          });
          if (!isCenter) validCoords.push({ q, r });
        }
      }
    }

    // Shuffle coords to place entities
    validCoords.sort(() => Math.random() - 0.5);

    // Place Obstacles
    for (let i = 0; i < currConfig.obstacles; i++) {
      const coord = validCoords.pop();
      const cell = newCells.find((c) => c.q === coord.q && c.r === coord.r);
      if (cell) cell.isObstacle = true;
    }

    // Place 2 Health Bonuses
    for (let i = 0; i < 2; i++) {
      const coord = validCoords.pop();
      const cell = newCells.find((c) => c.q === coord.q && c.r === coord.r);
      if (cell) cell.bonus = "health";
    }

    // Place 1 Watchtower
    const towerCoord = validCoords.pop();
    const towerCell = newCells.find((c) => c.q === towerCoord.q && c.r === towerCoord.r);
    if (towerCell) towerCell.bonus = "tower";

    setCells(newCells);
    setPos({ q: 0, r: 0 });
    setLives(3);
    setShield(false);
    setIsWon(false);
    setFlashState(null);
  }, []);

  useEffect(() => {
    initGame(config);
  }, [initGame, config]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, [volume, isMuted]);

  const triggerFlash = (type) => {
    setFlashState(type);
    setTimeout(() => setFlashState(null), 400);
  };

  const handleMove = (dq, dr) => {
    if (isWon) return;

    const nq = pos.q + dq;
    const nr = pos.r + dr;
    const targetIdx = cells.findIndex((c) => c.q === nq && c.r === nr);
    
    if (targetIdx === -1) return; // invalid move out of bounds

    const targetCell = cells[targetIdx];
    let nextCells = [...cells];
    let nextLives = lives;
    let nextShield = shield;

    nextCells[targetIdx] = { ...targetCell, isVisited: true };

    if (!targetCell.isVisited) {
      if (targetCell.isObstacle) {
        triggerFlash("error");
        if (nextShield) {
          nextShield = false;
        } else {
          nextLives -= 1;
        }
      } else if (targetCell.bonus === "health") {
        triggerFlash("heal");
        if (nextLives === 3) nextShield = true;
        else nextLives = 3;
      } else if (targetCell.bonus === "tower") {
        triggerFlash("heal");
        // Watchtower: Fill all adjacent neighbors safely
        DIRS.forEach((dir) => {
          const adjIdx = nextCells.findIndex(
            (c) => c.q === nq + dir.q && c.r === nr + dir.r
          );
          if (adjIdx !== -1) {
            nextCells[adjIdx] = { ...nextCells[adjIdx], isVisited: true };
          }
        });
      }
    }

    // Check Auto-Restart
    if (nextLives <= 0) {
      initGame(config); // Без сповіщень перезапуск
      return;
    }

    // Update State
    setCells(nextCells);
    setPos({ q: nq, r: nr });
    setLives(nextLives);
    setShield(nextShield);

    // Check Win Condition (all non-obstacles visited)
    const won = nextCells.every((c) => c.isObstacle || c.isVisited);
    if (won) setIsWon(true);
  };

  const toggleVolume = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(1);
    } else if (volume === 1) setVolume(0.5);
    else if (volume === 0.5) setVolume(0.1);
    else setIsMuted(true);
  };

  const applyDifficulty = (type) => {
    const presets = {
      easy: { obstacles: 4, label: "Легка" },
      normal: { obstacles: 7, label: "Середня" },
      hard: { obstacles: 12, label: "Екстремальна" },
    };
    setConfig(presets[type]);
    setShowSettings(false);
  };

  // Get Safe Cells Progress
  const safeVisitedCount = cells.filter((c) => !c.isObstacle && c.isVisited).length;
  const totalSafeCount = cells.filter((c) => !c.isObstacle).length;

  const currentCell = cells.find((c) => c.q === pos.q && c.r === pos.r) || { x: CENTER_X, y: CENTER_Y };

  return (
    <GameWrapper className={flashState ? `${flashState}-flash` : ""}>
      <div style={{ height: "40px", zIndex: 60 }}>
        {isWon ? (
          <h2 style={{ color: "#4caf50", margin: 0 }}>Перемога! 🎉</h2>
        ) : (
          <h3 style={{ color: "#ffb36c", margin: 0 }}>Знайдіть безпечний шлях</h3>
        )}
      </div>

      <BoardContainer>
        {cells.map((cell, i) => (
          <Hex
            key={i}
            $x={cell.x}
            $y={cell.y}
            $visited={cell.isVisited}
            $obstacle={cell.isObstacle}
            $bonus={cell.bonus}
          >
            {cell.isVisited && cell.isObstacle && "💥"}
            {cell.isVisited && cell.bonus === "health" && "❤️"}
            {cell.isVisited && cell.bonus === "tower" && "🗼"}
          </Hex>
        ))}

        {/* Стрілки управління навколо поточної позиції */}
        {!isWon &&
          DIRS.map((dir, i) => {
            const target = cells.find((c) => c.q === pos.q + dir.q && c.r === pos.r + dir.r);
            if (!target) return null; // Розумні стрілки зникають на краю

            const dx = target.x - currentCell.x;
            const dy = target.y - currentCell.y;
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

            return (
              <MoveArrow
                key={i}
                $x={currentCell.x}
                $y={currentCell.y}
                $angle={angle}
                onClick={() => handleMove(dir.q, dir.r)}
              >
                <span className="icon">➤</span>
              </MoveArrow>
            );
          })}

        <CurrentMarker $x={currentCell.x} $y={currentCell.y} />
      </BoardContainer>

      <BottomPanel>
        <StatsBlock>
          <span style={{ fontSize: "16px", letterSpacing: "2px" }}>
            {"❤️".repeat(lives)}
            {"🖤".repeat(3 - lives)}
            {shield && " 🛡️"}
          </span>
          <span style={{ fontSize: "13px", marginTop: "4px" }}>
            <strong>Рівень:</strong> {config.label}. <strong>Прогрес:</strong> {safeVisitedCount} / {totalSafeCount || 37}
          </span>
        </StatsBlock>
        
        <Controls>
          <GameButton onClick={toggleVolume}>
            {isMuted ? "🔇" : volume === 0.1 ? "🔈" : volume === 0.5 ? "🔉" : "🎵"}
          </GameButton>
          <GearContainer onClick={() => setShowSettings(true)}>
            <span className="g g1">⚙</span>
            <span className="g g2">⚙</span>
            <span className="g g3">⚙</span>
          </GearContainer>
          <GameButton onClick={() => initGame(config)}>
            🔄
          </GameButton>
          <GameButton onClick={onExit}>
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
              <h3 style={{ color: "#ffb36c", textAlign: "center", margin: 0 }}>Налаштування</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px" }}>
                <DifficultyBtn onClick={() => applyDifficulty("easy")}>
                  Легка: 4 перешкоди
                </DifficultyBtn>
                <DifficultyBtn onClick={() => applyDifficulty("normal")}>
                  Середня: 7 перешкод
                </DifficultyBtn>
                <DifficultyBtn onClick={() => applyDifficulty("hard")}>
                  Екстремальна: 12 перешкод
                </DifficultyBtn>
              </div>
              <hr style={{ borderColor: "#ffb36c", width: "100%", margin: "10px 0" }} />
              <DifficultyBtn onClick={() => setShowSettings(false)} style={{ background: "#1b110f" }}>
                Закрити
              </DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleEight;