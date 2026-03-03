import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import image from "../../../photos/hero-header/start-image.jpg";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;
  background: #111;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  grid-template-rows: repeat(4, 1fr);    
  gap: 2px;
  height: 60vh;           
  max-height: 500px;      
  aspect-ratio: 6 / 4;   
  width: auto;            
  background: #222;
  border: 4px solid #444;
  padding: 2px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

const Tile = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.$image}");
  background-size: 600% 400%;
  background-position: ${(props) => props.$bgPosX}% ${(props) => props.$bgPosY}%;
  cursor: ${(props) => (props.$isCorrect ? "default" : (props.$disabled ? "not-allowed" : "pointer"))};
  filter: ${(props) => (props.$isCorrect ? "none" : "brightness(0.7) grayscale(0.2)")};
  border-radius: 2px;
  &:hover {
    filter: ${(props) => (props.$isCorrect ? "none" : "brightness(1)")};
  }
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
    color: #ffb36c;
  border: 2px solid #ffb36c;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
`;

const PuzzleOne = ({ imageUrl, onExit }) => {
  const finalImage = imageUrl || image;
  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(210);
  
  const COLS = 6;
  const ROWS = 4;
  const MAX_MOVES = 100;
  const timerRef = useRef(null);

  const initGame = useCallback(() => {
    const total = COLS * ROWS;
    const initial = Array.from({ length: total }, (_, i) => ({ id: i }));
    let shuffled;
    do {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
    } while (shuffled.every((tile, index) => tile.id === index));

    setTiles(shuffled);
    setIsWon(false);
    setIsProcessing(false);
    setMoves(0);
    setTimeLeft(240);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);
  useEffect(() => {
    if (moves >= MAX_MOVES) {
      alert("Ліміт ходів вичерпано! Спробуйте ще раз.");
      initGame();
    }
  }, [moves, initGame]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      initGame();
    }
    return () => clearInterval(timerRef.current);
  }, [timeLeft, isWon, initGame]);

  const handleTileClick = (index) => {
    if (isWon || isProcessing) return;
    if (tiles[index].id === index) return;

    const targetIdx = tiles.findIndex((t, idx) => t.id !== idx && idx !== index);
    if (targetIdx !== -1) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);
      const newTiles = [...tiles];
      [newTiles[index], newTiles[targetIdx]] = [newTiles[targetIdx], newTiles[index]];
      setTiles(newTiles);
      
      if (newTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
        clearInterval(timerRef.current);
      }
      setTimeout(() => setIsProcessing(false), 600); 
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <GameWrapper>
      <Board>
        {tiles.map((tile, index) => {
          const x = (tile.id % COLS) * (100 / (COLS - 1));
          const y = Math.floor(tile.id / COLS) * (100 / (ROWS - 1));
          return (
            <Tile
              key={tile.id}
              layout
              $image={finalImage}
              $bgPosX={x}
              $bgPosY={y}
              $isCorrect={tile.id === index}
              $disabled={isProcessing}
              onClick={() => handleTileClick(index)}
            />
          );
        })}
      </Board>

      <div style={{ height: '30px' }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>Перемога! 🎉</h2>}
      </div>

      <BottomPanel>
        <StatsBlock>
          <span style={{fontSize: '14px', textAlign: 'end'}}><strong>Ціль:</strong> Скласти фото (max {MAX_MOVES} ходів) Колекційна головоломка!</span>
          <span style={{fontSize: '14px', textAlign: 'center'}}><strong>Час:</strong> <span style={{color: timeLeft < 30 ? '#ff5252' : '#ffb36c'}}>{formatTime(timeLeft)}</span>/3:30<strong>  Ходи:</strong> <span style={{color: moves > 80 ? '#ff5252' : '#ffb36c'}}>{moves} / {MAX_MOVES}</span></span>
        </StatsBlock>

        <Controls>
          <GameButton $primary onClick={initGame} disabled={isProcessing}>⏭</GameButton>
          <GameButton onClick={onExit}>✖</GameButton>
        </Controls>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleOne;