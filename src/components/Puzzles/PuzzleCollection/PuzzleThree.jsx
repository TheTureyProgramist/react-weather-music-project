import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import mechanic from "../../../mp3/mechanik-kindom.mp3";
import lamp from "../../../photos/hero-header/lamp.jpeg";

// --- Animations ---
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
  background: #111;
  color: #ffb36c;
  font-family: "Courier New", Courier, monospace;
`;

const MainConsole = styled.div`
  background: #3e2723;
  padding: 30px;
  border: 4px solid #ffb36c;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(0,0,0,0.8), inset 0 0 20px #000;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

const SafeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 179, 108, 0.2);
`;

const DigitColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: 2px solid #ffb36c;
  color: #ffb36c;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  &:hover {
    background: rgba(255, 179, 108, 0.2);
    transform: scale(1.1);
  }
`;

const DigitDisplay = styled.div`
  font-size: 56px;
  background: #000;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.$color || "#444"};
  width: 60px;
  text-align: center;
  color: ${(props) => props.$color || "#ffb36c"};
  text-shadow: 0 0 10px ${(props) => props.$color || "transparent"};
  transition: all 0.3s ease;
`;

const SideControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  border-left: 2px solid rgba(255, 179, 108, 0.3);
  padding-left: 15px;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid #ffb36c;
  background: #1a110f;
  color: #ffb36c;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
`;

const HintButton = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid #ffb36c;
  background: #1a110f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 4px;
  transition: all 0.2s;
  &:hover {
    background: #ffb36c;
    transform: scale(1.05);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ConfigArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 179, 108, 0.2);
`;

const SmallControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  font-weight: bold;
  
  select, input[type="range"] {
    background: #111;
    color: #ffb36c;
    border: 1px solid #ffb36c;
    outline: none;
    accent-color: #ffb36c;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffb36c;
  font-size: 10px;
  cursor: pointer;
  input { accent-color: #ffb36c; }
`;

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
    if (volume > 0) audio.play().catch(() => {});
    else audio.pause();
    return () => audio.pause();
  }, [volume]);

  const changeDigit = (index, delta) => {
    if (isWon) return;
    const maxDigit = mode === "normal" ? 5 : 9;
    const newCode = [...currentCode];
    newCode[index] = (newCode[index] + delta + (maxDigit + 1)) % (maxDigit + 1);
    setCurrentCode(newCode);
    if (newCode.every((val, i) => val === targetCode[i])) setIsWon(true);
  };

  const handleHint = () => {
    if (isWon) return;
    const mismatchIdx = currentCode.findIndex((digit, i) => digit !== targetCode[i]);
    
    if (mismatchIdx !== -1) {
      const current = currentCode[mismatchIdx];
      const target = targetCode[mismatchIdx];
      const maxDigit = mode === "normal" ? 5 : 9;
      const range = maxDigit + 1;

      const distUp = (target - current + range) % range;
      const distDown = (current - target + range) % range;
      
      const delta = distUp <= distDown ? 1 : -1;
      changeDigit(mismatchIdx, delta);
    }
  };

  const getDigitColor = (digit, index) => {
    if (isWon) return "#4caf50";
    if (showGreenHint && targetCode[index] === digit) return "#4caf50";
    if (showYellowHint && targetCode.includes(digit)) return "#ffeb3b";
    return null;
  };

  return (
    <GameWrapper>
      <h2 style={{ letterSpacing: "6px", margin: "0 0 10px 0", textShadow: "2px 2px #000" }}>
        SAFE MECHANISM
      </h2>

      <MainConsole>
        <div style={{ display: "flex", gap: "20px" }}>
          <SafeContainer>
            {currentCode.map((digit, i) => (
              <DigitColumn key={i}>
                <ArrowButton onClick={() => changeDigit(i, 1)}>▲</ArrowButton>
                <DigitDisplay $color={getDigitColor(digit, i)}>
                  {digit}
                </DigitDisplay>
                <ArrowButton onClick={() => changeDigit(i, -1)}>▼</ArrowButton>
              </DigitColumn>
            ))}
          </SafeContainer>

          {/* Кнопки Дій */}
          <SideControls>
            <HintButton onClick={handleHint} title="Підказка">
              <img src={lamp} alt="Hint" />
            </HintButton>
            <ActionButton onClick={initGame} title="Скинути">⏭</ActionButton>
            <ActionButton onClick={onExit} title="Вихід">✖</ActionButton>
          </SideControls>
        </div>

        {/* Статус */}
        <div style={{ height: "20px", textAlign: "center" }}>
          {isWon ? 
            <span style={{ color: "#4caf50", fontWeight: "bold" }}>🔓 ACCESS GRANTED</span> : 
            <span style={{ opacity: 0.5, fontSize: "12px" }}>LOCKED</span>
          }
        </div>

        {/* Налаштування всередині консолі */}
        <ConfigArea>
          <SmallControl>
            <span>РІВЕНЬ:</span>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="easy">Easy (2)</option>
              <option value="normal">Mid (3, 0-5)</option>
              <option value="hard">Hard (3, 0-9)</option>
            </select>
          </SmallControl>

          <SmallControl>
            <span>ЗВУК: {Math.round(volume * 100)}%</span>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} 
            />
          </SmallControl>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <CheckboxLabel>
              <input type="checkbox" style={{color: "#ffb36c"} }checked={showGreenHint} onChange={() => setShowGreenHint(!showGreenHint)} />
              Зелена (Match)
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox"  style={{color: "#ffb36c"}} checked={showYellowHint} onChange={() => setShowYellowHint(!showYellowHint)} />
              Жовта (Exist)
            </CheckboxLabel>
          </div>
        </ConfigArea>
      </MainConsole>

      <p style={{ fontSize: "10px", opacity: 0.6 }}>
        *Кожен слот містить унікальну цифру
      </p>
    </GameWrapper>
  );
};

export default PuzzleThree;