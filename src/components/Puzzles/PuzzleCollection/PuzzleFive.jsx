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
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
`;

const GameArea = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  background: #151515;
  border: 3px solid #3e2723;
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(0,0,0,0.8);
  flex-shrink: 0;
`;

const DiscPath = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  border: 2px dashed rgba(255, 179, 108, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  pointer-events: none;
`;

const StaticText = styled.div`
  position: absolute;
  width: 60px;
  background: rgba(62, 39, 35, 0.95);
  border: 1px solid #ffb36c;
  border-radius: 4px;
  padding: 2px;
  text-align: center;
  font-size: 8px;
  font-weight: bold;
  z-index: 20;
  transform: translate(-50%, -50%);
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  pointer-events: none;
`;

const ImageCircle = styled(motion.div)`
  position: absolute;
  width: 48px;
  height: 48px;
  background: #252525;
  border: 2px solid ${props => props.$isCorrect ? "#4caf50" : "#ffb36c"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 10;
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  margin-left: -24px;
  margin-top: -24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
`;

const RotateBtn = styled.button`
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffb36c;
  border: 3px solid #3e2723;
  cursor: pointer;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #3e2723;
  transform: translate(-50%, -50%);
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  transition: all 0.2s;
  &:hover { background: #fff; transform: translate(-50%, -50%) scale(1.1); }
  &:active { transform: translate(-50%, -50%) scale(0.9) rotate(90deg); }
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px 10px;
  width: 43.2%;
  max-width: 1850px;
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  font-family: sans-serif;
`;

const InfoBox = styled.div`
  flex: 1;
  font-size: 10px;
  color: #a0a0a0;
  line-height: 1.2;
  border-right: 1px solid #3e2723;
  margin-right: 10px;
  padding-right: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100px;
  font-size: 12px;
  font-weight: bold;
`;

const PuzzleFive = ({ onExit }) => {
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isWon, setIsWon] = useState(false);
  const [showWinWindow, setShowWinWindow] = useState(false);
  const [imgPositions, setImgPositions] = useState([]);
  
  const MAX_MOVES = 200; 

  const images = ["🌲", "🌊", "⛰️", "🌾", "🌍", "💧", "🔥", "💨", "🌸", "🦋", "🍄", "🦠"];
  const texts = ["ЛІС", "ОКЕАН", "ГОРИ", "СТЕП", "ЗЕМЛЯ", "ВОДА", "ВОГОНЬ", "ПОВІТРЯ", "ФЛОРА", "ФАУНА", "ГРИБИ", "ВІРУСИ"];
  const slotCoords = [
    { x: 110, y: 40 }, { x: 250, y: 40 }, { x: 320, y: 110 }, { x: 320, y: 250 }, 
    { x: 250, y: 320 }, { x: 110, y: 320 }, { x: 40, y: 250 }, { x: 40, y: 110 },
    { x: 180, y: 110 }, { x: 250, y: 180 }, { x: 180, y: 250 }, { x: 110, y: 180 }
  ];
  const centers = [
    { x: 110, y: 110 }, { x: 250, y: 110 }, { x: 250, y: 250 }, { x: 110, y: 250 }
  ];

  const discGroups = [
    [0, 8, 11, 7], [1, 2, 9, 8], [9, 3, 4, 10], [11, 10, 5, 6] 
  ];

  const initGame = useCallback(() => {
    let shuffled;
    do {
      shuffled = Array.from({ length: 12 }, (_, i) => i).sort(() => Math.random() - 0.5);
    } while (shuffled.every((val, i) => val === i));
    setImgPositions(shuffled);
    setMoves(0);
    setTimeLeft(300);
    setIsWon(false);
    setShowWinWindow(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isWon) initGame();
  }, [timeLeft, isWon, initGame]);

  const rotate = (idx) => {
    if (isWon || moves >= MAX_MOVES) return;
    setMoves(m => m + 1);
    const newPos = [...imgPositions];
    const g = discGroups[idx];
    const temp = newPos[g[3]];
    newPos[g[3]] = newPos[g[2]];
    newPos[g[2]] = newPos[g[1]];
    newPos[g[1]] = newPos[g[0]];
    newPos[g[0]] = temp;
    setImgPositions(newPos);
    if (newPos.every((val, i) => val === i)) {
      setIsWon(true);
      setTimeout(() => setShowWinWindow(true), 800);
    }
  };

  return (
    <GameWrapper>
      <GameArea>
        {centers.map((c, i) => <DiscPath key={i} $x={c.x} $y={c.y} />)}
        {texts.map((txt, i) => (
          <StaticText key={i} $x={slotCoords[i].x} $y={slotCoords[i].y - 38}>
            {txt}
          </StaticText>
        ))}
        <AnimatePresence>
          {imgPositions.map((imgIdx, currentSlot) => (
            <ImageCircle 
              key={imgIdx} layout initial={false}
              transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.8 }}
              $x={slotCoords[currentSlot].x} $y={slotCoords[currentSlot].y}
              $isCorrect={imgIdx === currentSlot}
            >
              {images[imgIdx]}
            </ImageCircle>
          ))}
        </AnimatePresence>
        {centers.map((c, i) => (
          <RotateBtn key={i} $x={c.x} $y={c.y} onClick={() => rotate(i)}>↻</RotateBtn>
        ))}
        <AnimatePresence>
          {showWinWindow && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.92)",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", zIndex: 100, borderRadius: "22px"
            }}>
              <h2 style={{ color: "#4caf50", fontSize: "24px" }}>СИСТЕМА СТАБІЛЬНА</h2>
              <button onClick={onExit} style={{ background: "#ffb36c", border: "none", padding: "12px 30px", cursor: "pointer", borderRadius: "8px", fontWeight: "bold", marginTop: "15px" }}>ПРОДОВЖИТИ</button>
            </motion.div>
          )}
        </AnimatePresence>
      </GameArea>

      <BottomPanel>
        <StatsBox>
  
        </StatsBox>
        <StatsBox style={{textBottom: '4px'}}>
                    Обертай диски, щоб співставити значки із назвами зверху.
          <div>⏳ {Math.floor(timeLeft/60)}:{(timeLeft % 60).toString().padStart(2, '0')}/5:00 👣 {moves}/{MAX_MOVES}</div>
        </StatsBox>
        <div style={{ display: "flex", gap: "8px" }}>
          <button title="Скинути" onClick={initGame} style={{ background: "none", border: "2px solid #ffb36c", color: "white", cursor: "pointer", padding: "8px", fontSize: "16px"}}>⏭</button>
          <button title="Вихід" onClick={onExit} style={{ background: "none", border: "2px solid #ffb36c", color: "white", cursor: "pointer", padding: "8px", fontSize: "16px" }}>✖</button>
        </div>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleFive;