import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import music from "../../../mp3/theoty-of-everything-ll.mp3";

const LEVEL_CONFIG = {
  GRID_SIZE: 10,
  PLAYER_START: { x: 1, y: 1 },
  PORTAL_A: { x: 1, y: 8 },
  PORTAL_B: { x: 8, y: 1 },
  SAFE_ZONE: [
    { x: 3, y: 1 },
    { x: 1, y: 7 },
    { x: 5, y: 5 },
    { x: 4, y: 1 },
    { x: 2, y: 5 },
    { x: 4, y: 6 },
    { x: 1, y: 0 },
  ],
  KILL_ZONE: [
    { x: 5, y: 1 },
    { x: 2, y: 3 },
    { x: 5, y: 7 },
    { x: 2, y: 6 },
    { x: 8, y: 8 },
    { x: 2, y: 0 },
  ],
  BOXES_START: [
    { x: 2, y: 8 },
    { x: 7, y: 7 },
    { x: 4, y: 7 },
    { x: 4, y: 3 },
  ],
  BOX_TARGETS: [
    { x: 6, y: 1 },
    { x: 1, y: 7 },
    { x: 8, y: 8 },
    { x: 6, y: 7 },
  ],
  STEP_POINTS_MATRIX: [
    [
      { x: 0, y: 0 },
      { x: 9, y: 0 },
      { x: 5, y: 2 },
    ],
    [
      { x: 2, y: 7 },
      { x: 2, y: 6 },
      { x: 3, y: 7 },
    ],
    [
      { x: 5, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 9 },
    ],
    [
      { x: 0, y: 9 },
      { x: 0, y: 6 },
      { x: 9, y: 9 },
    ],
  ],
  EVAC_POINTS_MATRIX: [
    { x: 1, y: 1, hidden: false },
    { x: 8, y: 7, hidden: false },
    { x: 5, y: 0, hidden: false },
    { x: 0, y: 8, hidden: true },
    { x: 9, y: 1, hidden: true },
    { x: 4, y: 4, hidden: true },
    { x: 9, y: 5, hidden: true },
    { x: 3, y: 9, hidden: true },
  ],
  SAWS_START: [
    { x: 5, y: 7 },
    { x: 0, y: 4 },
    { x: 8, y: 3 },
    { x: 4, y: 9 },
    { x: 9, y: 5 },
  ],
};

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const shake = keyframes`0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); }`;
const pulseRed = keyframes`0% { background: #1a1a1a; } 50% { background: #420000; } 100% { background: #1a1a1a; }`;
const pulseKill = keyframes`0% { border-color: #ff0000; opacity: 0.8; } 50% { border-color: #ff8888; opacity: 1; } 100% { border-color: #ff0000; opacity: 0.8; }`;
const glowStep = keyframes`0% { box-shadow: 0 0 5px #fbc02d; } 50% { box-shadow: 0 0 15px #fbc02d; } 100% { box-shadow: 0 0 5px #fbc02d; }`;
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRev = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  color: #eee;
  font-family: "Segoe UI", sans-serif;
  overflow: hidden;
  ${(props) =>
    props.$isHit &&
    css`
      animation: ${shake} 0.2s ease-in-out;
    `}
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 1px;
  width: 85vw;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  background: #222;
  border: 3px solid #444;
  position: relative;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => {
    if (props.$isWall) return "#444";
    if (props.$isPortal) return "#1a237e";
    if (props.$isStepPoint) return props.$activated ? "#2e7d32" : "#fbc02d33";
    if (props.$isEvacPoint) {
      if (props.$isHiddenPoint && !props.$isNear && !props.$activated)
        return "#111";
      return props.$activated ? "#00e676" : "#003366";
    }
    if (props.$isSafeZone) return "#0d1424";
    return "#111";
  }};
  ${(props) =>
    props.$isActiveTarget &&
    css`
      animation: ${pulseRed} 1s infinite;
    `}
  ${(props) =>
    props.$isKillZone &&
    css`
      animation: ${pulseKill} 1.5s infinite;
      border: 2px dashed #ff0000;
      z-index: 1;
    `}
  ${(props) =>
    props.$isStepPoint &&
    !props.$activated &&
    css`
      animation: ${glowStep} 2s infinite;
    `}
  ${(props) =>
    props.$isSafeZone &&
    css`
      border: 1px dashed #3f51b588;
    `}
  border: ${(props) =>
    props.$isActiveTarget || props.$isKillZone || props.$isSafeZone
      ? ""
      : "1px solid #222"};
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "${(props) =>
      props.$isWall
        ? ""
        : props.$isPortal
          ? "🌀"
          : props.$isActiveTarget
            ? "⚡"
            : props.$isStepPoint
              ? props.$activated
                ? "✅"
                : "👣"
              : props.$isEvacPoint &&
                  (props.$isNear || !props.$isHiddenPoint || props.$activated)
                ? "📍"
                : props.$isKillZone
                  ? "💀"
                  : props.$isSafeZone
                    ? "🛡️"
                    : ""}";
    font-size: 9px;
  }
`;

const MovingObject = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.$x * 100}%, ${props.$y * 100}%)`,
    opacity: props.$invisible ? (props.$isNear ? 0.3 : 0) : 1,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 10%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s;
  z-index: 10;
`;

const PlayerIcon = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: #ffb36c;
  box-shadow: 0 0 15px #ffb36c;
  z-index: 25;
  position: relative;
`;

const NavArrow = styled.div`
  position: absolute;
  font-size: 18px;
  cursor: pointer;
  color: #ffb36c;
  opacity: ${(props) => (props.$isDeadEnd ? 0 : props.$isSmart ? 1 : 0.25)};
  filter: drop-shadow(
    0 0 5px ${(props) => (props.$isSmart ? "#ffb36c" : "transparent")}
  );
  pointer-events: ${(props) => (props.$isDeadEnd ? "none" : "auto")};
  transition: all 0.2s;
  z-index: 100;
  text-shadow: 0 0 5px black;
  ${(props) =>
    props.$pos === "u" && "top: -140%; left: 50%; transform: translateX(-50%);"}
  ${(props) =>
    props.$pos === "d" &&
    "bottom: -140%; left: 50%; transform: translateX(-50%);"}
  ${(props) =>
    props.$pos === "l" && "left: -140%; top: 50%; transform: translateY(-50%);"}
  ${(props) =>
    props.$pos === "r" &&
    "right: -140%; top: 50%; transform: translateY(-50%);"}
  ${(props) => props.$pos === "ul" && "top: -110%; left: -110%;"}
  ${(props) => props.$pos === "ur" && "top: -110%; right: -110%;"}
  ${(props) => props.$pos === "dl" && "bottom: -110%; left: -110%;"}
  ${(props) => props.$pos === "dr" && "bottom: -110%; right: -110%;"}
`;

const BoxIcon = styled.div`
  width: 75%;
  height: 75%;
  border-radius: 4px;
  position: relative;
  background: ${(props) => (props.$locked ? "#4caf50" : "#795548")};
  border: 2px solid ${(props) => (props.$locked ? "#1b5e20" : "#3e2723")};
  &::after {
    content: "${(props) => (props.$locked ? "🔒" : "")}";
    font-size: 8px;
    position: absolute;
  }
`;

const SawIcon = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$safe ? "#4caf50" : props.$hunting ? "#ff5722" : "#f44336"};
  box-shadow: ${(props) =>
    props.$hunting ? "0 0 12px #ff5722" : "none"};
  border: none;
  &::after {
    content: "⚙️";
    font-size: 10px;
    animation: rotate 2s linear infinite;
  }
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 8px 12px;
  width: 85vw;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 15px;
  flex: 1;
  font-size: 12px;
  font-weight: bold;
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

const HelpModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 300px;
  background: #1a1a1a;
  border: 2px solid #ffb36c;
  padding: 20px;
  color: #fff;
  z-index: 200;
  text-align: center;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  width: 340px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ffb36c #2e1a16;
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

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 179, 108, 0.3);

  input {
    width: 60px;
    accent-color: #ffb36c;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    min-width: 20px;
  }
`;

const CustomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #ffb36c;

  select,
  input {
    accent-color: #ffb36c;
    cursor: pointer;
    background: #3e2723;
    color: #ffb36c;
    border: 1px solid #ffb36c;
  }
`;

const PuzzleSeven = ({ onExit }) => {
  const {
    GRID_SIZE,
    PLAYER_START,
    PORTAL_A,
    PORTAL_B,
    BOXES_START,
    BOX_TARGETS,
    SAWS_START,
    KILL_ZONE,
    SAFE_ZONE,
    STEP_POINTS_MATRIX,
    EVAC_POINTS_MATRIX,
  } = LEVEL_CONFIG;

  const levelMap = useMemo(
    () => [
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    ],
    [],
  );

  const [config, setConfig] = useState({
    label: "Середня",
    time: 120,
    lives: 7,
    portalCooldown: 16,
    sawsCount: 5,
  });
  const [tempConfig, setTempConfig] = useState(config);
  const [showSettings, setShowSettings] = useState(false);

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioRef.current = new Audio(music);
    audioRef.current.loop = true;
    const playAudio = () => {
      audioRef.current.play().catch(() => {});
    };
    playAudio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const initialState = useMemo(
    () => ({
      player: PLAYER_START,
      boxes: BOXES_START.map((b) => ({ ...b, locked: false })),
      saws: SAWS_START.slice(0, config.sawsCount),
      stepPoints: [],
      activeBoxIdx: 0,
      lives: config.lives,
      portalCooldown: 0,
      timeLeft: config.time,
      phase: 1,
      bonusTime: 16,
      evacPoints: [],
      isHit: false,
      showHelp: true,
      huntTicks: 0,
      discoveredKillZones: [],
      sawRevealTimer: 0,
      isWinner: false,
    }),
    [BOXES_START, PLAYER_START, SAWS_START, config],
  );

  const [state, setState] = useState(initialState);

  const resetGame = useCallback(
    () => setState({ ...initialState, showHelp: false }),
    [initialState],
  );

  useEffect(() => {
    if ((state.lives <= 0 || state.timeLeft <= 0) && !state.isWinner) {
      resetGame();
    }
  }, [state.lives, state.timeLeft, state.isWinner, resetGame]);

  const isInSafeZone = useCallback(
    (x, y) => SAFE_ZONE.some((z) => z.x === x && z.y === y),
    [SAFE_ZONE],
  );

  const isWallAt = (x, y) => {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return true;
    return levelMap[y][x] === 1;
  };

  const isDiagonalBlocked = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      // Блокування діагоналі, якщо хоча б один сусід кута - стіна
      return isWallAt(x1 + dx, y1) || isWallAt(x1, y1 + dy);
    }
    return false;
  };

  const getSmartDir = useCallback(
    (dx, dy) => {
      const { phase, stepPoints, activeBoxIdx, evacPoints, player } = state;
      let target = null;
      if (phase === 1) {
        const nextStep = stepPoints.find((p) => !p.active);
        if (nextStep) target = nextStep;
        else if (activeBoxIdx < BOX_TARGETS.length)
          target = BOX_TARGETS[activeBoxIdx];
      } else {
        target = evacPoints.find((p) => !p.active);
      }
      if (!target) return false;
      const currentDist =
        Math.abs(player.x - target.x) + Math.abs(player.y - target.y);
      const nextDist =
        Math.abs(player.x + dx - target.x) + Math.abs(player.y + dy - target.y);
      return nextDist < currentDist;
    },
    [state, BOX_TARGETS],
  );

  const isDeadEnd = (dx, dy) => {
    const nx = state.player.x + dx,
      ny = state.player.y + dy;
    if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return true;
    if (levelMap[ny][nx] === 1) return true;
    if (isDiagonalBlocked(state.player.x, state.player.y, nx, ny)) return true;
    return false;
  };

  const moveAction = (dx, dy) => {
    if (state.showHelp || state.isWinner) return;
    let nx = state.player.x + dx,
      ny = state.player.y + dy;

    if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return;
    if (levelMap[ny][nx] === 1) return;
    if (isDiagonalBlocked(state.player.x, state.player.y, nx, ny)) return;

    let newCooldown = Math.max(0, state.portalCooldown - 1);
    if (newCooldown === 0) {
      if (nx === PORTAL_A.x && ny === PORTAL_A.y) {
        nx = PORTAL_B.x;
        ny = PORTAL_B.y;
        newCooldown = config.portalCooldown;
      } else if (nx === PORTAL_B.x && ny === PORTAL_B.y) {
        nx = PORTAL_A.x;
        ny = PORTAL_A.y;
        newCooldown = config.portalCooldown;
      }
    }

    let newHuntTicks = Math.max(0, state.huntTicks - 1);
    let newDiscoveredZones = [...state.discoveredKillZones];

    if (KILL_ZONE.some((kz) => kz.x === nx && kz.y === ny)) {
      newHuntTicks = 12;
      if (!newDiscoveredZones.some((dz) => dz.x === nx && dz.y === ny)) {
        newDiscoveredZones.push({ x: nx, y: ny });
      }
    }

    if (isInSafeZone(nx, ny)) newHuntTicks = 0;

    const boxIdx = state.boxes.findIndex((b) => b.x === nx && b.y === ny);
    let newBoxes = [...state.boxes];
    let newStepPoints = [...state.stepPoints];
    let newActiveIdx = state.activeBoxIdx;
    let newLives = state.lives;
    let newTimeLeft = state.timeLeft;
    let newSawReveal = state.sawRevealTimer;
    let newPhase = state.phase;
    let newEvac = [...state.evacPoints];
    let winner = false;

    if (boxIdx !== -1) {
      if (state.boxes[boxIdx].locked || state.stepPoints.some((p) => !p.active))
        return;
      const bnx = nx + dx,
        bny = ny + dy;
      if (
        bnx < 0 ||
        bnx >= GRID_SIZE ||
        bny < 0 ||
        bny >= GRID_SIZE ||
        levelMap[bny][bnx] === 1 ||
        state.boxes.some((b) => b.x === bnx && b.y === bny)
      )
        return;
      if (isDiagonalBlocked(nx, ny, bnx, bny)) return;
      newBoxes[boxIdx] = { ...newBoxes[boxIdx], x: bnx, y: bny };
      if (
        newActiveIdx < BOX_TARGETS.length &&
        bnx === BOX_TARGETS[newActiveIdx].x &&
        bny === BOX_TARGETS[newActiveIdx].y
      ) {
        newBoxes[boxIdx].locked = true;
        newLives = Math.min(10, newLives + 1);
        if (STEP_POINTS_MATRIX[newActiveIdx]) {
          newStepPoints = STEP_POINTS_MATRIX[newActiveIdx].map((p) => ({
            ...p,
            active: false,
          }));
        }
      }
    }

    if (newPhase === 1) {
      const stepIdx = newStepPoints.findIndex(
        (p) => p.x === nx && p.y === ny && !p.active,
      );
      if (stepIdx !== -1) {
        newStepPoints[stepIdx].active = true;
        newTimeLeft += 15;
        if (newStepPoints.every((p) => p.active)) {
          newStepPoints = [];
          if (newActiveIdx + 1 < BOX_TARGETS.length) newActiveIdx++;
          else {
            newActiveIdx++;
            newPhase = 2;
            newEvac = EVAC_POINTS_MATRIX.map((p) => ({ ...p, active: false }));
          }
        }
      }
    } else {
      if (newEvac.some((p) => p.x === nx && p.y === ny && !p.active))
        newSawReveal = 2;
      newEvac = newEvac.map((p) =>
        p.x === nx && p.y === ny ? { ...p, active: true } : p,
      );
      if (newEvac.every((p) => p.active)) winner = true;
    }

    const newSaws = state.saws.map((saw) => {
      let snx, sny;
      if (newHuntTicks > 0) {
        snx = saw.x + (nx > saw.x ? 1 : nx < saw.x ? -1 : 0);
        sny = saw.y + (ny > saw.y ? 1 : ny < saw.y ? -1 : 0);
        if (isDiagonalBlocked(saw.x, saw.y, snx, sny)) {
          // Якщо діагональ заблокована стіною, йдемо по одній осі
          snx = saw.x + (nx > saw.x ? 1 : nx < saw.x ? -1 : 0);
          sny = saw.y;
          if (isWallAt(snx, sny)) {
            snx = saw.x;
            sny = saw.y + (ny > saw.y ? 1 : ny < saw.y ? -1 : 0);
          }
        }
      } else {
        const moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1],
        ];
        const m = moves[Math.floor(Math.random() * moves.length)];
        snx = saw.x + m[0];
        sny = saw.y + m[1];
      }

      snx = Math.max(0, Math.min(GRID_SIZE - 1, snx));
      sny = Math.max(0, Math.min(GRID_SIZE - 1, sny));

      // Перевірка стін для звичайних пил
      if (isWallAt(snx, sny)) {
        snx = saw.x;
        sny = saw.y;
      }
      if (isDiagonalBlocked(saw.x, saw.y, snx, sny)) {
        snx = saw.x;
        sny = saw.y;
      }

      if (isInSafeZone(snx, sny)) return { x: 9, y: 9 };
      return { x: snx, y: sny };
    });

    let hit = false;
    newSaws.forEach((s) => {
      if (
        s.x === nx &&
        s.y === ny &&
        (newPhase === 1 || state.bonusTime <= 0)
      ) {
        newLives -= 1;
        hit = true;
      }
    });

    if (hit) {
      nx = PLAYER_START.x;
      ny = PLAYER_START.y;
      newHuntTicks = 0;
    }

    setState((prev) => ({
      ...prev,
      player: { x: nx, y: ny },
      portalCooldown: newCooldown,
      boxes: newBoxes,
      stepPoints: newStepPoints,
      activeBoxIdx: newActiveIdx,
      phase: newPhase,
      evacPoints: newEvac,
      timeLeft: newTimeLeft,
      saws: newSaws,
      lives: newLives,
      isHit: hit,
      huntTicks: newHuntTicks,
      discoveredKillZones: newDiscoveredZones,
      sawRevealTimer: newSawReveal,
      isWinner: winner,
    }));
    if (hit) setTimeout(() => setState((p) => ({ ...p, isHit: false })), 300);
  };

  useEffect(() => {
    const t = setInterval(() => {
      if (!state.showHelp && !state.isWinner) {
        setState((p) => ({
          ...p,
          timeLeft: p.timeLeft > 0 ? p.timeLeft - 1 : 0,
          bonusTime: p.bonusTime > 0 ? p.bonusTime - 1 : 0,
          sawRevealTimer: p.sawRevealTimer > 0 ? p.sawRevealTimer - 1 : 0,
        }));
      }
    }, 1000);
    return () => clearInterval(t);
  }, [state.showHelp, state.isWinner]);

  const setDifficulty = (type, customParams = null) => {
    let newConfig;
    if (customParams) {
      newConfig = { ...customParams, label: "Власна" };
    } else {
      const presets = {
        easy: {
          label: "Легка", time: 300, lives: 10, portalCooldown: 5, sawsCount: 3,
        },
        normal: {
          label: "Середня", time: 120, lives: 7, portalCooldown: 16, sawsCount: 5,
        },
        hard: {
          label: "Важка", time: 90, lives: 5, portalCooldown: 25, sawsCount: 5,
        },
      };
      newConfig = presets[type];
    }
    setConfig(newConfig);
    setTempConfig(newConfig);
    setShowSettings(false);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    setTempConfig(config);
  }, [config]);

  return (
    <GameWrapper $isHit={state.isHit}>
      <h4 style={{ margin: 0, color: state.isWinner ? "#00e676" : "#ffb36c" }}>
        {state.isWinner
          ? "Ви вижили!"
          : state.phase === 1
            ? "Пошук коробок"
            : "Втеча"}
      </h4>
      <GameBoard>
        {Array(100)
          .fill()
          .map((_, i) => {
            const x = i % 10,
              y = Math.floor(i / 10);
            const dist = Math.sqrt(
              (x - state.player.x) ** 2 + (y - state.player.y) ** 2,
            );
            const evacP = state.evacPoints.find((p) => p.x === x && p.y === y);
            const stepP = state.stepPoints.find((p) => p.x === x && p.y === y);
            const isWall = levelMap[y][x] === 1;
            const activeTarget =
              state.phase === 1 &&
              state.activeBoxIdx < BOX_TARGETS.length &&
              BOX_TARGETS[state.activeBoxIdx].x === x &&
              BOX_TARGETS[state.activeBoxIdx].y === y;
            const isKillZoneDiscovered = state.discoveredKillZones.some(
              (kz) => kz.x === x && kz.y === y,
            );
            const isSafeZone = isInSafeZone(x, y);
            return (
              <Cell
                key={i}
                $isWall={isWall}
                $isActiveTarget={activeTarget}
                $isStepPoint={!!stepP}
                $activated={stepP?.active || evacP?.active}
                $isEvacPoint={!!evacP}
                $isHiddenPoint={evacP?.hidden}
                $isNear={dist < 2.6}
                $isPortal={
                  (x === PORTAL_A.x && y === PORTAL_A.y) ||
                  (x === PORTAL_B.x && y === PORTAL_B.y)
                }
                $isSafeZone={isSafeZone}
                $isKillZone={isKillZoneDiscovered}
              />
            );
          })}
        {state.boxes.map((b, i) => (
          <MovingObject
            key={`b-${i}`}
            $x={b.x}
            $y={b.y}
            $invisible={state.phase === 2}
          >
            <BoxIcon $locked={b.locked} />
          </MovingObject>
        ))}
        {state.saws.map((s, i) => {
          const radarNear =
            Math.sqrt(
              (s.x - state.player.x) ** 2 + (s.y - state.player.y) ** 2,
            ) < 2.6;
          const shouldBeVisible =
            state.phase === 1 ||
            state.bonusTime > 0 ||
            radarNear ||
            state.sawRevealTimer > 0;
          return (
            <MovingObject
              key={`s-${i}`}
              $x={s.x}
              $y={s.y}
              $invisible={!shouldBeVisible}
              $isNear={radarNear}
            >
              <SawIcon
                $safe={state.bonusTime > 0}
                $hunting={state.huntTicks > 0}
              />
            </MovingObject>
          );
        })}
        <MovingObject
          $x={state.player.x}
          $y={state.player.y}
          style={{ zIndex: 30 }}
        >
          <PlayerIcon>
            <NavArrow
              $pos="u"
              $isSmart={getSmartDir(0, -1)}
              $isDeadEnd={isDeadEnd(0, -1)}
              onClick={() => moveAction(0, -1)}
            >
              ▲
            </NavArrow>
            <NavArrow
              $pos="d"
              $isSmart={getSmartDir(0, 1)}
              $isDeadEnd={isDeadEnd(0, 1)}
              onClick={() => moveAction(0, 1)}
            >
              ▼
            </NavArrow>
            <NavArrow
              $pos="l"
              $isSmart={getSmartDir(-1, 0)}
              $isDeadEnd={isDeadEnd(-1, 0)}
              onClick={() => moveAction(-1, 0)}
            >
              ◀
            </NavArrow>
            <NavArrow
              $pos="r"
              $isSmart={getSmartDir(1, 0)}
              $isDeadEnd={isDeadEnd(1, 0)}
              onClick={() => moveAction(1, 0)}
            >
              ▶
            </NavArrow>
            <NavArrow
              $pos="ul"
              $isSmart={getSmartDir(-1, -1)}
              $isDeadEnd={isDeadEnd(-1, -1)}
              onClick={() => moveAction(-1, -1)}
            >
              ◸
            </NavArrow>
            <NavArrow
              $pos="ur"
              $isSmart={getSmartDir(1, -1)}
              $isDeadEnd={isDeadEnd(1, -1)}
              onClick={() => moveAction(1, -1)}
            >
              ◹
            </NavArrow>
            <NavArrow
              $pos="dl"
              $isSmart={getSmartDir(-1, 1)}
              $isDeadEnd={isDeadEnd(-1, 1)}
              onClick={() => moveAction(-1, 1)}
            >
              ◺
            </NavArrow>
            <NavArrow
              $pos="dr"
              $isSmart={getSmartDir(1, 1)}
              $isDeadEnd={isDeadEnd(1, 1)}
              onClick={() => moveAction(1, 1)}
            >
              ◿
            </NavArrow>
          </PlayerIcon>
        </MovingObject>
      </GameBoard>
      <BottomPanel>
        <StatsGrid>
          <span style={{ color: state.lives < 3 ? "#ff0000" : "inherit" }}>
            ❤️ {state.lives}/{config.lives}
          </span>
          <span>
            ⏳ {formatTime(state.timeLeft)}
          </span>
          <span style={{ color: "#3f51b5" }}>
            🌀 {state.portalCooldown > 0 ? state.portalCooldown : "READY"}
          </span>
          {state.huntTicks > 0 && (
            <span style={{ color: "#ff0000" }}>⚠️ HUNT</span>
          )}
        </StatsGrid>
        <div style={{ display: "flex", gap: "5px" }}>
          <VolumeControl>
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
          <GameButton
            onClick={() => setState((p) => ({ ...p, showHelp: true }))}
          >
            ?
          </GameButton>
          <GearContainer onClick={() => setShowSettings(true)} title="Налаштування">
            <span className="g g1">⚙</span>
            <span className="g g2">⚙</span>
            <span className="g g3">⚙</span>
          </GearContainer>
          <GameButton onClick={resetGame}>⏭</GameButton>
          <GameButton
            onClick={onExit}
            style={{ borderColor: "#f44336", color: "#f44336" }}
          >
            ✕
          </GameButton>
        </div>
      </BottomPanel>
      {state.showHelp && (
        <HelpModal>
          <h3 style={{ color: "#ffb36c", fontSize: "16px" }}>
            2 кімната: Полювання
          </h3>
          <p style={{ fontSize: "10px", textAlign: "left", lineHeight: "1.4" }}>
            • <b>Пили ⚙️:</b> Завжди наносять <b>1 HP</b> шкоди.
            <br />• <b>Блокування 🧱:</b> Ви та пили не можете пройти по
            діагоналі крізь кут стіни.
            <br />• <b>Життя:</b> Ви починаєте з 7 ❤️.
            <br />• <b>Евакуація 📍:</b> 8 точок. Бонус безпеки 16с діє на
            всі пили.
            <br />• <b>Захист 🛡️:</b> Пили телепортуються при контакті з
            безпечною зоною.
            <br />• <b>Пастка 💀:</b> Активує режим HUNT (всі пили біжать до
            вас).
          </p>
          <GameButton
            style={{ width: "auto", padding: "0 20px" }}
            onClick={() => setState((p) => ({ ...p, showHelp: false }))}
          >
            START
          </GameButton>
        </HelpModal>
      )}
      <AnimatePresence>
        {showSettings && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <Modal onClick={(e) => e.stopPropagation()}>
              <h3 style={{ margin: "0", color: "#ffb36c", textAlign: "center" }}>
                Налаштування
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <DifficultyBtn onClick={() => setDifficulty("easy")}>
                  Легка (5хв, 10❤️, 3 пили, портал 5)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("normal")}>
                  Середня (2хв, 7❤️, 5 пил, портал 16)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("hard")}>
                  Важка (1.5хв, 5❤️, 5 пил, портал 25)
                </DifficultyBtn>
              </div>

              <hr style={{ borderColor: "#ffb36c", width: "100%", margin: "5px 0" }} />

              <span style={{ fontSize: "14px", textAlign: "center", color: "#ffb36c" }}>
                Власні параметри:
              </span>

              <CustomRow>
                <span>Час: {formatTime(tempConfig.time)}</span>
                <input type="range" min="60" max="300" step="10" value={tempConfig.time} onChange={(e) => setTempConfig({ ...tempConfig, time: parseInt(e.target.value) })} />
              </CustomRow>
              <CustomRow>
                <span>Пили: {tempConfig.sawsCount}</span>
                <input type="range" min="1" max="5" value={tempConfig.sawsCount} onChange={(e) => setTempConfig({ ...tempConfig, sawsCount: parseInt(e.target.value) })} />
              </CustomRow>
              <CustomRow>
                <span>Життя: {tempConfig.lives}</span>
                <input type="range" min="1" max="10" value={tempConfig.lives} onChange={(e) => setTempConfig({ ...tempConfig, lives: parseInt(e.target.value) })} />
              </CustomRow>
              <CustomRow>
                <span>Перезарядка порталу: {tempConfig.portalCooldown} ходів</span>
                <input type="range" min="1" max="30" value={tempConfig.portalCooldown} onChange={(e) => setTempConfig({ ...tempConfig, portalCooldown: parseInt(e.target.value) })} />
              </CustomRow>

              <DifficultyBtn onClick={() => setDifficulty("custom", tempConfig)} style={{ background: "#4e342e", marginTop: "10px" }}>
                Застосувати власні
              </DifficultyBtn>

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

export default PuzzleSeven;
