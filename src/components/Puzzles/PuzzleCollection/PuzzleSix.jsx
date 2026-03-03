import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import defaultImg from "../../../photos/hero-header/start-image.jpg";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

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
  color: #ffb36c;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
`;

const Viewport = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  background-image: url(${props => props.$img});
  background-size: 600px 400px;
  border: 4px solid #444;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  overflow: hidden;
  cursor: crosshair;
  animation: ${props => props.$isError ? shake : 'none'} 0.3s linear;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1;
  }
`;

const LensCircle = styled.div.attrs(props => ({
  style: {
    transform: `translate(-50%, -50%) rotate(${props.$rotation}deg)`,
    border: props.$locked ? '3px solid #4caf50' : 
            props.$disabled ? '3px solid #ff5252' : '2px solid #ffb36c',
    boxShadow: props.$locked ? '0 0 20px rgba(76, 175, 80, 0.6)' : 
               props.$disabled ? '0 0 20px rgba(255, 82, 82, 0.6)' : '0 4px 15px rgba(0,0,0,0.5)',
    filter: props.$disabled ? 'brightness(0.5)' : 'none',
    pointerEvents: props.$disabled || props.$locked ? 'none' : 'auto'
  }
}))`
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background-image: url(${props => props.$img});
  background-size: 600px 400px;
  background-position: ${props => -(props.$x - 55)}px ${props => -(props.$y - 55)}px;
  background-repeat: no-repeat;
  z-index: 5;
  cursor: pointer;
  transition: border 0.2s, box-shadow 0.2s, filter 0.2s;
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px 15px;
  width: 580px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  font-family: sans-serif;
`;

const StatsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
  line-height: 1.2;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const GameButton = styled.button`
  width: 45px;
  height: 45px;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid #ffb36c;
  background: transparent;
  color: #ffb36c;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { background: rgba(255,179,108,0.1); transform: scale(1.1); }
`;

const PuzzleSix = ({ imageUrl, onExit }) => {
  const finalImage = imageUrl || defaultImg;
  const [lenses, setLenses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [errors, setErrors] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [visualError, setVisualError] = useState(false);
  const requestRef = useRef();
  const MAX_ERRORS = 12;

  const initGame = useCallback(() => {
    const count = 7;
    const newLenses = [];
    const minDistance = 85; // Щоб кола не перекривалися більше ніж на 50%

    for (let i = 0; i < count; i++) {
      let lens;
      let collision;
      let attempts = 0;
      do {
        collision = false;
        lens = {
          id: i,
          x: 75 + Math.random() * 450,
          y: 75 + Math.random() * 250,
          rotation: Math.random() * 360,
          speed: (1.5 + Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
          locked: false,
          disabled: false
        };
        for (let other of newLenses) {
          const dist = Math.sqrt(Math.pow(lens.x - other.x, 2) + Math.pow(lens.y - other.y, 2));
          if (dist < minDistance) { collision = true; break; }
        }
        attempts++;
      } while (collision && attempts < 100);
      newLenses.push(lens);
    }
    setLenses(newLenses);
    setTimeLeft(90);
    setErrors(0);
    setIsWon(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const updateRotation = useCallback(() => {
    if (!isWon) {
      setLenses(prev => prev.map(lens => 
        (lens.locked || lens.disabled) ? lens : { ...lens, rotation: (lens.rotation + lens.speed) % 360 }
      ));
      requestRef.current = requestAnimationFrame(updateRotation);
    }
  }, [isWon]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateRotation]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isWon) initGame();
  }, [timeLeft, isWon, initGame]);

  const handleLensClick = (id) => {
    if (isWon || errors >= MAX_ERRORS) return;

    setLenses(prev => {
      const clickedLens = prev.find(l => l.id === id);
      if (!clickedLens || clickedLens.locked || clickedLens.disabled) return prev;

      const currentRot = Math.abs(clickedLens.rotation % 360);
      const isCorrect = currentRot < 12 || currentRot > 348;

      if (isCorrect) {
        const next = prev.map(l => l.id === id ? { ...l, rotation: 0, locked: true } : l);
        if (next.every(l => l.locked)) setIsWon(true);
        return next;
      } else {
        const nextErrors = errors + 1;
        setErrors(nextErrors);
        setVisualError(true);
        setTimeout(() => setVisualError(false), 300);

        if (nextErrors >= MAX_ERRORS) {
          setTimeout(() => { alert("Ліміт помилок вичерпано!"); initGame(); }, 100);
        }

        setTimeout(() => {
          setLenses(cur => cur.map(l => l.id === id ? { ...l, disabled: false } : l));
        }, 1000);

        return prev.map(l => l.id === id ? { ...l, disabled: true } : l);
      }
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <GameWrapper>
      <div style={{ height: '35px' }}>
         <h2 style={{ color: isWon ? "#4caf50" : "#ffb36c", margin: 0, fontSize: '20px', letterSpacing: '2px', textAlign: 'center' }}>
           {isWon ? "ОПТИЧНА СИНХРОНІЗАЦІЯ ЗАВЕРШЕНА" : "ОПТИЧНА СИНХРОНІЗАЦІЯ"}
         </h2>
      </div>

      <Viewport $img={finalImage} $isError={visualError}>
        {lenses.map(lens => (
          <LensCircle
            key={lens.id} $img={finalImage} $x={lens.x} $y={lens.y}
            $rotation={lens.rotation} $locked={lens.locked} $disabled={lens.disabled}
            onClick={() => handleLensClick(lens.id)}
          />
        ))}
        
        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
              }}
            >
              <button onClick={onExit} style={{ 
                background: "#ffb36c", border: "none", padding: "12px 30px", 
                cursor: "pointer", borderRadius: "4px", fontWeight: "bold" 
              }}>ПРОДОВЖИТИ</button>
            </motion.div>
          )}
        </AnimatePresence>
      </Viewport>

      <BottomPanel>
        <StatsBlock>
          <span style={{ fontSize: '14px' }}>
            <strong>Ціль:</strong> Синхронізуйте лінзи (макс {MAX_ERRORS} штрафів)
          </span>
          <span style={{ fontSize: '14px' }}>
            <strong>Час:</strong> <span style={{ color: timeLeft < 15 ? '#ff5252' : '#ffb36c' }}>{formatTime(timeLeft)}</span> / 1:30 
            <strong style={{ marginLeft: '15px' }}>Штрафи:</strong> <span style={{ color: errors > 9 ? '#ff5252' : '#ffb36c' }}>{errors} / {MAX_ERRORS}</span>
          </span>
        </StatsBlock>

        <Controls>
          <GameButton onClick={initGame}>⏭</GameButton>
          <GameButton onClick={onExit}>✖</GameButton>
        </Controls>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleSix;