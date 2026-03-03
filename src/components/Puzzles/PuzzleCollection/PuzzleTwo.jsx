import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh; width: 100vw;
  background: #111;
  padding: 10px;
  box-sizing: border-box;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 80vw;
  max-width: 320px;
  aspect-ratio: 1 / 1;
`;

const Cube = styled.div`
  background: ${props => props.$active ? "#ffb36c" : "#3e2723"};
  border: 2px solid #ffb36c;
  cursor: ${props => props.$disabled ? "default" : "pointer"};
  transition: all 0.2s;
  box-shadow: ${props => props.$active ? "0 0 25px #ffb36c" : "none"};
  
  &:hover { 
    background: ${props => !props.$disabled && "#5d4037"}; 
  }
  &:active { 
    transform: ${props => !props.$disabled && "scale(0.95)"}; 
  }
`;
const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 12px 10px;
  width: 90vw; 
  max-width: 500px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  font-family: 'Montserrat', sans-serif;
`;

const StatsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 13px;
  line-height: 1.2;
  flex: 1;
  text-align: left;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  margin-left: 15px;
`;
const GameButton = styled.button`
  width: 48px; height: 48px;
  border: 2px solid #ffb36c;
  background: transparent;
  color: #ffb36c;
  font-size: 22px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s;
  
  &:hover:not(:disabled) { transform: scale(1.1); }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

const PuzzleTwo = ({ onExit }) => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeCube, setActiveCube] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); 
  const [isWon, setIsWon] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const startNewLevel = useCallback(() => {
    setBtnDisabled(true);
    setIsShowing(true);
    setUserSequence([]);
    setIsWon(false);
    const newSeq = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9));
    setSequence(newSeq);
    newSeq.forEach((cubeIdx, i) => {
      setTimeout(() => {
        setActiveCube(cubeIdx);
        setTimeout(() => setActiveCube(null), 400);
      }, i * 650);
    });
    setTimeout(() => {
      setIsShowing(false);
      setBtnDisabled(false);
    }, newSeq.length * 650);
  }, []);

  useEffect(() => {
    startNewLevel();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { 
            startNewLevel(); 
            return 210; 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [startNewLevel]);

  const handleCubeClick = (index) => {
    if (isShowing || isWon || btnDisabled) return;

    const currentStep = userSequence.length;

    if (sequence[currentStep] === index) {
      const nextUserSeq = [...userSequence, index];
      setUserSequence(nextUserSeq);

      if (nextUserSeq.length === sequence.length) {
        setIsWon(true);
      }
    } else {
      alert("Неправильно! Спробуйте запам'ятати ще раз.");
      startNewLevel();
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <GameWrapper>
      <div style={{ height: '40px' }}>
        {isWon ? (
          <h2 style={{ color: '#4caf50', margin: 0 }}>Чудово! Перемога 🎉</h2>
        ) : (
          <h3 style={{ color: '#ffb36c', margin: 0 }}>
            {isShowing ? "Уважно стежте..." : "Повторіть послідовність!"}
          </h3>
        )}
      </div>
      
      <Grid>
        {[...Array(9)].map((_, i) => (
          <Cube 
            key={i} 
            $active={activeCube === i} 
            $disabled={isShowing || btnDisabled}
            onClick={() => handleCubeClick(i)}
          />
        ))}
      </Grid>

      <BottomPanel>
        <StatsBlock>
          <span style={{fontSize: '14px', textAlign: 'center'}}><strong>Ціль:</strong> Повторіть порядок підсвічування кубів.</span>
          <span style={{fontSize: '14px', textAlign: 'center'}}><strong>Час:</strong> {formatTime(timeLeft)} / 3:00 <strong>Прогрес:</strong> {userSequence.length} / {sequence.length}</span>
        </StatsBlock>

        <Controls>
          <GameButton onClick={startNewLevel} disabled={btnDisabled} title="Перезавантажити">
            ⏭
          </GameButton>
          <GameButton onClick={onExit} title="Вихід">
            ✖
          </GameButton>
        </Controls>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleTwo;