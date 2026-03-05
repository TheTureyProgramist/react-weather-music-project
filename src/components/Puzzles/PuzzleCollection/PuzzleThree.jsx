import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import mechanic from "../../../mp3/mechanik-kindom.mp3";

// --- Animations ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

// --- Styled Components ---
const GameWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 20px; animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh; width: 100vw; background: #111; color: #ffb36c;
`;

const SafeContainer = styled.div`
  display: flex; gap: 20px; background: #222; padding: 40px;
  border: 4px solid #444; border-radius: 20px;
  box-shadow: inset 0 0 20px #000;
`;

const DigitColumn = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 10px;
`;

const ArrowButton = styled.button`
  background: transparent; border: 2px solid #ffb36c; color: #ffb36c;
  width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
  font-size: 20px; display: flex; align-items: center; justify-content: center;
  &:hover { background: rgba(255, 179, 108, 0.1); }
`;

const DigitDisplay = styled.div`
  font-size: 64px; font-family: 'Courier New', Courier, monospace;
  background: #111; padding: 10px; border-radius: 10px;
  border: 2px solid ${props => props.$color || "#333"}; 
  width: 65px; text-align: center;
  color: ${props => props.$color || "#ffb36c"};
  text-shadow: 0 0 10px ${props => props.$color || "transparent"};
  transition: all 0.3s ease;
`;

const BottomPanel = styled.div`
  background-color: #3e2723; color: #ffb36c; border: 2px solid #ffb36c;
  padding: 12px 18px; width: 95vw; max-width: 600px;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5); font-family: sans-serif;
`;

const GameButton = styled.button`
  width: 45px; height: 45px; border: 2px solid #ffb36c;
  background: transparent; color: #ffb36c; font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: 0.2s;
  &:hover { background: rgba(255,179,108,0.1); transform: scale(1.1); }
`;

const DifficultySelect = styled.select`
  background: #111; color: #ffb36c; border: 1px solid #ffb36c;
  padding: 5px; cursor: pointer; font-size: 11px;
`;

const HintControl = styled.label`
  display: flex; align-items: center; gap: 8px; font-size: 12px; cursor: pointer;
  color: #ffb36c;
  input { accent-color: #ffb36c; cursor: pointer; }
  &:hover { filter: brightness(1.2); }
`;

const VolumeSlider = styled.div`
  display: flex; align-items: center; gap: 8px; font-size: 11px;
  input { accent-color: #ffb36c; width: 60px; cursor: pointer; }
`;

// --- Component ---
const PuzzleThree = ({ onExit }) => {
  const [mode, setMode] = useState("normal"); 
  const [targetCode, setTargetCode] = useState([]);
  const [currentCode, setCurrentCode] = useState([]);
  const [isWon, setIsWon] = useState(false);
  
  const [showGreenHint, setShowGreenHint] = useState(true);
  const [showYellowHint, setShowYellowHint] = useState(true);
  const [volume, setVolume] = useState(0.4); 
  
  const audioRef = useRef(new Audio(mechanic));

  const generateCode = useCallback(() => {
    let length, maxDigit;
    if (mode === "easy") { length = 2; maxDigit = 9; }
    else if (mode === "normal") { length = 3; maxDigit = 5; }
    else { length = 3; maxDigit = 9; }

    const code = [];
    while (code.length < length) {
      const r = Math.floor(Math.random() * (maxDigit + 1));
      if (!code.includes(r)) code.push(r);
    }
    return code;
  }, [mode]);

  const initGame = useCallback(() => {
    const code = generateCode();
    setTargetCode(code);
    setCurrentCode(new Array(code.length).fill(0));
    setIsWon(false);
  }, [generateCode]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volume;
    if (volume > 0) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [volume]);

  const changeDigit = (index, delta) => {
    if (isWon) return;
    const maxDigit = mode === "normal" ? 5 : 9;
    const newCode = [...currentCode];
    newCode[index] = (newCode[index] + delta + (maxDigit + 1)) % (maxDigit + 1);
    setCurrentCode(newCode);

    if (newCode.every((val, i) => val === targetCode[i])) {
      setIsWon(true);
    }
  };

  const getDigitColor = (digit, index) => {
    if (isWon) return "#4caf50";
    
    // Тепер колір залежить тільки від чекбоксів, незалежно від рівня складності
    if (showGreenHint && targetCode[index] === digit) {
      return "#4caf50";
    }
    if (showYellowHint && targetCode.includes(digit)) {
      return "#ffeb3b";
    }
    return null;
  };

  return (
    <GameWrapper>
      <h2 style={{ letterSpacing: '4px', margin: 0 }}>МЕХАНІЗМ СЕЙФУ</h2>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <HintControl>
          <input 
            type="checkbox" 
            checked={showGreenHint} 
            onChange={() => setShowGreenHint(!showGreenHint)} 
          />
          Зелена підказка
        </HintControl>
        <HintControl>
          <input 
            type="checkbox" 
            checked={showYellowHint} 
            onChange={() => setShowYellowHint(!showYellowHint)} 
          />
          Жовта підказка
        </HintControl>
      </div>

      <SafeContainer>
        {currentCode.map((digit, i) => (
          <DigitColumn key={i}>
            <ArrowButton onClick={() => changeDigit(i, 1)}>▲</ArrowButton>
            <DigitDisplay 
              $isCorrect={isWon} 
              $color={getDigitColor(digit, i)}
            >
              {digit}
            </DigitDisplay>
            <ArrowButton onClick={() => changeDigit(i, -1)}>▼</ArrowButton>
          </DigitColumn>
        ))}
      </SafeContainer>

      <div style={{ height: '40px' }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>ВІДКРИТО 🔓</h2>}
      </div>

      <BottomPanel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <span style={{ fontSize: '10px', fontWeight: 'bold' }}>РІВЕНЬ:</span>
             <DifficultySelect value={mode} onChange={(e) => setMode(e.target.value)}>
               <option value="easy">ЛЕГКИЙ</option>
               <option value="normal">СЕРЕДНІЙ</option>
               <option value="hard">СКЛАДНИЙ</option>
             </DifficultySelect>
          </div>
          
          <VolumeSlider>
            <span>Звук:</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))} 
            />
            <span>{Math.round(volume * 100)}%</span>
          </VolumeSlider>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <GameButton onClick={initGame} title="Скинути код">⏭</GameButton>
          <GameButton onClick={onExit} title="Вихід">✖</GameButton>
        </div>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleThree;