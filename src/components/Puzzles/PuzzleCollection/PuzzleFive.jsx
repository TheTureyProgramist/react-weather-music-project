import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  color: #ffb36c;
`;

const GameArea = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #3e2723;
  border: 2px solid #ffb36c;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 50;
`;

const SideButton = styled.button`
  background: none;
  border: 2px solid #ffb36c;
  color: #ffb36c;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 16px;
  &:hover {
    background: rgba(255, 179, 108, 0.2);
    border-color: #ffb36c;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ConnectionLines = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  stroke: rgba(255, 179, 108, 0.15);
  stroke-width: 2;
  stroke-dasharray: 4;
`;

const SlotLabel = styled.div`
  position: absolute;
  width: 60px;
  text-align: center;
  font-size: 9px;
  font-weight: bold;
  color: #ffb36c;
  transform: translate(-50%, -50%);
  top: ${(props) => props.$y - 35}px;
  left: ${(props) => props.$x}px;
  pointer-events: none;
`;

const ImageCircle = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #252525;
  border: 2px solid ${(props) => (props.$isCorrect ? "#4caf50" : "#ffb36c")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  z-index: 10;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  margin-left: -25px;
  margin-top: -25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
  color: initial; 
  text-shadow: none;
`;

const RotateBtn = styled.button`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${(props) => (props.$isCenter ? "#ffb36c" : "#3e2723")};
  border: 2px solid ${(props) => (props.$isCenter ? "#3e2723" : "#ffb36c")};
  cursor: pointer;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${(props) => (props.$isCenter ? "#3e2723" : "#ffb36c")};
  transform: translate(-50%, -50%);
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  transition: all 0.2s;
  &:hover {
    background: #fff;
    transform: translate(-50%, -50%) scale(1.1);
    color: #000;
  }
`;

const PuzzleTriangleFinal = ({ onExit }) => {
  const [isWon, setIsWon] = useState(false);
  const [positions, setPositions] = useState([]);

  const slotCoords = [
    { x: 200, y: 70 }, 
    { x: 125, y: 200 }, 
    { x: 275, y: 200 },
    { x: 50, y: 330 }, 
    { x: 200, y: 330 },
    { x: 350, y: 330 },
  ];

  const centers = [
    { x: 200, y: 156, isCenter: false, group: [0, 2, 1] },
    { x: 125, y: 286, isCenter: false, group: [1, 4, 3] },
    { x: 275, y: 286, isCenter: false, group: [2, 5, 4] },
    { x: 200, y: 243, isCenter: true, group: [1, 2, 4] },
  ];

  const symbols = ["⚛️", "💠", "🌀", "🔱", "🔆", "💎"];
  const labels = ["Атом", "Кристал", "Вихор", "Тризуб", "Сяйво", "Алмаз"];

  const initGame = useCallback(() => {
    let shuffled;
    do {
      shuffled = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    } while (shuffled.every((val, i) => val === i));
    setPositions(shuffled);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const checkWin = (pos) => {
    if (pos.every((val, i) => val === i)) setIsWon(true);
  };

  const rotate = (idx, currentPositions = positions) => {
    const newPos = [...currentPositions];
    const g = centers[idx].group;
    const temp = newPos[g[2]];
    newPos[g[2]] = newPos[g[1]];
    newPos[g[1]] = newPos[g[0]];
    newPos[g[0]] = temp;
    return newPos;
  };

  const rotateOuter = () => {
    if (isWon) return;
    const newPos = [...positions];
    const outerIndices = [0, 3, 5]; 
    const temp = newPos[outerIndices[2]];
    newPos[outerIndices[2]] = newPos[outerIndices[1]];
    newPos[outerIndices[1]] = newPos[outerIndices[0]];
    newPos[outerIndices[0]] = temp;
    setPositions(newPos);
    checkWin(newPos);
  };

  const handleRotate = (idx) => {
    if (isWon) return;
    const next = rotate(idx);
    setPositions(next);
    checkWin(next);
  };

  return (
    <GameWrapper >
      <h2 style={{ letterSpacing: "4px", margin: "0" }}>
        Синхронізатор
      </h2>

      <GameArea>
        <ControlsContainer>
          <SideButton onClick={onExit} title="Закрити">✖</SideButton>
          <SideButton onClick={initGame} title="Перезавантажити">⏭</SideButton>
          <SideButton onClick={rotateOuter} title="Зсув вершин" disabled={isWon}>△</SideButton>
        </ControlsContainer>

        <ConnectionLines>
          <line x1="200" y1="70" x2="50" y2="330" />
          <line x1="200" y1="70" x2="350" y2="330" />
          <line x1="50" y1="330" x2="350" y2="330" />
          <line x1="125" y1="200" x2="275" y2="200" />
          <line x1="125" y1="200" x2="200" y2="330" />
          <line x1="275" y1="200" x2="200" y2="330" />
        </ConnectionLines>

        {labels.map((lbl, i) => (
          <SlotLabel key={i} $x={slotCoords[i].x} $y={slotCoords[i].y}>
            {lbl}
          </SlotLabel>
        ))}

        <AnimatePresence>
          {positions.map((symbolIdx, currentSlot) => (
            <ImageCircle
              key={symbolIdx}
              layout
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              $x={slotCoords[currentSlot].x}
              $y={slotCoords[currentSlot].y}
              $isCorrect={symbolIdx === currentSlot}
            >
              {symbols[symbolIdx]}
            </ImageCircle>
          ))}
        </AnimatePresence>

        {centers.map((c, i) => (
          <RotateBtn
            key={i}
            $x={c.x}
            $y={c.y}
            $isCenter={c.isCenter}
            onClick={() => handleRotate(i)}
          >
            {c.isCenter ? "✦" : "↻"}
          </RotateBtn>
        ))}

        {isWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              borderRadius: "22px",
            }}
          >
            <h2 style={{ color: "#4caf50" }}>СИНХРОНІЗАЦІЯ ЗАВЕРШЕНА</h2>
            <button
              onClick={onExit}
              style={{
                background: "#ffb36c",
                border: "none",
                padding: "10px 30px",
                cursor: "pointer",
                borderRadius: "5px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              ПІДТВЕРДИТИ
            </button>
          </motion.div>
        )}
      </GameArea>
    </GameWrapper>
  );
};

export default PuzzleTriangleFinal;