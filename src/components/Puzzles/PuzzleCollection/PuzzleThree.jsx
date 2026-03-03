import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh; width: 100vw;
  background: #111;
  color: #ffb36c;
`;

const SafeContainer = styled.div`
  display: flex;
  gap: 20px;
  background: #222;
  padding: 40px;
  border: 4px solid #444;
  border-radius: 20px;
  box-shadow: inset 0 0 20px #000;
`;

const DigitColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: 2px solid #ffb36c;
  color: #ffb36c;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: rgba(255, 179, 108, 0.1); }
`;

const DigitDisplay = styled.div`
  font-size: 64px;
  font-family: 'Courier New', Courier, monospace;
  background: #111;
  padding: 10px 10px;
  border-radius: 10px;
  border: 2px solid #333;
  width: 60px;
  text-align: center;
  color: ${props => props.$isCorrect ? "#4caf50" : "#ffb36c"};
  text-shadow: 0 0 10px ${props => props.$isCorrect ? "#4caf50" : "transparent"};
`;
const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 12px 18px;
  width: 90vw; 
  max-width: 500px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  font-family: 'Montserrat', sans-serif;
`;
const GameButton = styled.button`
  width: 45px; height: 45px;
  border: 2px solid #ffb36c;
  background: transparent;
  color: #ffb36c;
  font-size: 20px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  &:hover { transform: scale(1.1); }
`;

const PuzzleThree = ({ onExit }) => {
  const [targetCode, setTargetCode] = useState([]);
  const [currentCode, setCurrentCode] = useState([0, 0, 0]);
  const [attempts, setAttempts] = useState(333);
  const [isWon, setIsWon] = useState(false);

  const initGame = useCallback(() => {
    const newCode = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
    setTargetCode(newCode);
    setCurrentCode([0, 0, 0]);
    setAttempts(333);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const changeDigit = (index, delta) => {
    if (isWon || attempts <= 0) return;

    const newCode = [...currentCode];
    newCode[index] = (newCode[index] + delta + 10) % 10;
    setCurrentCode(newCode);
    setAttempts(prev => prev - 1);

    if (JSON.stringify(newCode) === JSON.stringify(targetCode)) {
      setIsWon(true);
    }
  };

  return (
    <GameWrapper>
      <h2 style={{ letterSpacing: '2px' }}>ЗЛАМАЙТЕ КОД</h2>
      
      <SafeContainer>
        {currentCode.map((digit, i) => (
          <DigitColumn key={i}>
            <ArrowButton onClick={() => changeDigit(i, 1)}>▲</ArrowButton>
            <DigitDisplay $isCorrect={isWon}>{digit}</DigitDisplay>
            <ArrowButton onClick={() => changeDigit(i, -1)}>▼</ArrowButton>
          </DigitColumn>
        ))}
      </SafeContainer>

      <div style={{ height: '30px' }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>СЕЙФ ВІДКРИТО! 🔓</h2>}
        {attempts <= 0 && !isWon && <h2 style={{ color: "#f44336", margin: 0 }}>СИСТЕМА ЗАБЛОКОВАНА</h2>}
      </div>

      <BottomPanel>
        <div style={{ fontSize: '14px' }}>
          <div><strong>Ціль:</strong> Підберіть 3 цифри.</div>
          <div><strong>Спроби:</strong> <span style={{ color: attempts < 50 ? '#f44336' : '#ffb36c' }}>{attempts} / 333</span></div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <GameButton onClick={initGame} title="Змінити код">⏭</GameButton>
          <GameButton onClick={onExit}>✖</GameButton>
        </div>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleThree;