import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../../photos/hero-header/start-image.jpg";
import asium from "../../../mp3/harmonic-japan.mp3";
import lamp from "../../../photos/hero-header/lamp.jpeg";
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #111;
  color: white;
  overflow: hidden;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, 1fr); 
  grid-template-rows: repeat(${props => props.$rows}, 1fr);    
  gap: 2px;
  height: 60vh;           
  max-height: 500px;      
  aspect-ratio: 3 / 2;   
  background: #222;
  border: 4px solid #444;
  padding: 2px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

const Tile = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.$image}");
  background-size: ${(props) => props.$cols * 100}% ${(props) => props.$rows * 100}%;
  background-position: ${(props) => props.$bgPosX}% ${(props) => props.$bgPosY}%;
  cursor: ${(props) => (props.$isCorrect ? "default" : "pointer")};
  filter: ${(props) => (props.$isSelected ? "brightness(1.4) contrast(1.2)" : props.$isCorrect ? "none" : "brightness(0.7) grayscale(0.3)")};
  border: ${(props) => (props.$isSelected ? "2px solid #ffb36c" : "1px solid rgba(255,255,255,0.05)")};
  box-sizing: border-box;
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px 15px;
  width: 95%;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
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
  flex-shrink: 0;

  &:hover { background: rgba(255, 179, 108, 0.1); transform: scale(1.05); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const GearContainer = styled(GameButton)`
  position: relative;
  overflow: hidden;
  .g { position: absolute; font-size: 12px; transition: 0.3s; }
  .g1 { top: 4px; left: 14px; }
  .g2 { bottom: 6px; left: 6px; }
  .g3 { bottom: 6px; right: 6px; }

  &:hover .g1 { animation: ${rotate} 3s linear infinite; }
  &:hover .g2 { animation: ${rotateRev} 3s linear infinite; }
  &:hover .g3 { animation: ${rotate} 3s linear infinite; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top:0; left:0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85);
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

const CustomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #ffb36c;
  
  input {
    accent-color: #ffb36c;
    cursor: pointer;
  }
`;

const DifficultyBtn = styled.button`
  background: #3e2723;
  color: #ffb36c;
  border: 1px solid #ffb36c;
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  &:hover { background: #ffb36c; color: #3e2723; }
`;

const HintImage = styled.img`
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 2px solid #ffb36c;
   background-image: url("${props => props.$img}");
background-size: cover;
  background-position: center;
 `;

const PuzzleOne = ({ imageUrl, onExit }) => {
  const finalImage = imageUrl || image;
  
  const [config, setConfig] = useState({ 
    cols: 6, 
    rows: 4, 
    maxMoves: 150, 
    maxTime: 180, 
    label: "Нормальна" 
  });

  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.maxTime);
  const [showSettings, setShowSettings] = useState(false);
  
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(asium));
  const longPressTimer = useRef(null);

  const initGame = useCallback(() => {
    const total = config.cols * config.rows;
    const initial = Array.from({ length: total }, (_, i) => ({ id: i }));
    let shuffled;
    do {
      shuffled = [...initial].sort(() => Math.random() - 0.5);
    } while (shuffled.every((tile, index) => tile.id === index));
    setTiles(shuffled);
    setIsWon(false);
    setMoves(0);
    setTimeLeft(config.maxTime);
    setSelectedIdx(null);
  }, [config]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, [volume, isMuted]);

  const handleMusicDown = () => {
    longPressTimer.current = setTimeout(() => {
      setIsMuted(!isMuted);
      longPressTimer.current = null;
    }, 1000);
  };

  const handleMusicUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      if (volume === 1) setVolume(0.5);
      else if (volume === 0.5) setVolume(0.1);
      else setVolume(1);
    }
  };

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      alert("Час вичерпано!");
      initGame();
    }
  }, [timeLeft, isWon, initGame]);

  const checkAutoRestart = useCallback((currentTiles, currentMoves) => {
    const incorrectCount = currentTiles.reduce((acc, tile, idx) => tile.id !== idx ? acc + 1 : acc, 0);
    const movesLeft = config.maxMoves - currentMoves;
    
    if (incorrectCount > movesLeft && !isWon) {
      alert("Недостатньо ходів для завершення! Перезапуск...");
      initGame();
      return true;
    }
    return false;
  }, [config.maxMoves, isWon, initGame]);

  const handleTileClick = (index) => {
    if (isWon) return;
    if (selectedIdx === null) {
      if (tiles[index].id === index) return;
      setSelectedIdx(index);
    } else {
      if (selectedIdx === index) { setSelectedIdx(null); return; }
      const newTiles = [...tiles];
      [newTiles[selectedIdx], newTiles[index]] = [newTiles[index], newTiles[selectedIdx]];
      
      const newMoves = moves + 1;
      setTiles(newTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (newTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
      } else {
        if (newMoves >= config.maxMoves) {
          alert("Ходи закінчились!");
          initGame();
        } else {
          checkAutoRestart(newTiles, newMoves);
        }
      }
    }
  };

  const handleHint = () => {
    if (isWon) return;
    const incorrectIndices = tiles
      .map((tile, idx) => (tile.id !== idx ? idx : null))
      .filter(idx => idx !== null);

    if (incorrectIndices.length > 0) {
      const targetIdx = incorrectIndices[0];
      const currentIdxOfCorrectTile = tiles.findIndex(t => t.id === targetIdx);
      
      const newTiles = [...tiles];
      [newTiles[targetIdx], newTiles[currentIdxOfCorrectTile]] = [newTiles[currentIdxOfCorrectTile], newTiles[targetIdx]];
      
      const newMoves = moves + 1;
      setTiles(newTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (newTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
      } else {
        checkAutoRestart(newTiles, newMoves);
      }
    }
  };

  const setDifficulty = (type, customParams = null) => {
    if (customParams) {
      setConfig({ ...customParams, label: "Власна" });
    } else {
      if (type === 'easy') setConfig({ cols: 5, rows: 3, maxMoves: 200, maxTime: 240, label: "Легка" });
      else if (type === 'normal') setConfig({ cols: 6, rows: 4, maxMoves: 150, maxTime: 180, label: "Нормальна" });
      else if (type === 'hard') setConfig({ cols: 8, rows: 5, maxMoves: 100, maxTime: 120, label: "Екстремальна" });
    }
    setShowSettings(false);
  };

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <GameWrapper>
      <Board $cols={config.cols} $rows={config.rows}>
        {tiles.map((tile, index) => {
          const row = Math.floor(tile.id / config.cols);
          const col = tile.id % config.cols;
          const bgPosX = (col / (config.cols - 1)) * 100;
          const bgPosY = (row / (config.rows - 1)) * 100;

          return (
            <Tile
              key={tile.id}
              layout
              $cols={config.cols} $rows={config.rows}
              $image={finalImage}
              $bgPosX={isNaN(bgPosX) ? 0 : bgPosX}
              $bgPosY={isNaN(bgPosY) ? 0 : bgPosY}
              $isCorrect={tile.id === index}
              $isSelected={selectedIdx === index}
              onClick={() => handleTileClick(index)}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
          );
        })}
      </Board>

      <div style={{ height: '20px' }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>Перемога! 🏆</h2>}
      </div>

      <BottomPanel>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', lineHeight: '1.4' }}>
          <span><strong>Рівень:</strong> {config.label} ({config.cols}x{config.rows})</span>
          <span><strong>Час:</strong> <span style={{color: timeLeft < 30 ? '#ff5252' : '#ffb36c'}}>{formatTime(timeLeft)}</span> | <strong>Ходи:</strong> {moves}/{config.maxMoves}</span>
        </div>

        <Controls>
          <HintImage src={lamp} onClick={handleHint} disabled={isWon}></HintImage>
          <GameButton onMouseDown={handleMusicDown} onMouseUp={handleMusicUp}>
            {isMuted ? "🔇" : volume === 0.1 ? "🔈" : "🎵"}
          </GameButton>
          <GearContainer onClick={() => setShowSettings(true)}>
            <span className="g g1">⚙</span><span className="g g2">⚙</span><span className="g g3">⚙</span>
          </GearContainer>
          <GameButton onClick={initGame}>⏭</GameButton>
          <GameButton onClick={onExit}>✖</GameButton>
        </Controls>
      </BottomPanel>

      <AnimatePresence>
        {showSettings && (
          <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)}>
            <Modal onClick={e => e.stopPropagation()}>
              <h3 style={{margin: "0", color: '#ffb36c', textAlign: 'center'}}>Налаштування</h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <DifficultyBtn onClick={() => setDifficulty('easy')}>Легка (5x3, 240с)</DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty('normal')}>Нормальна (6x4, 180с)</DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty('hard')}>Екстремальна (8x5, 120с)</DifficultyBtn>
              </div>

              <hr style={{borderColor: '#ffb36c', width: '100%', margin: '5px 0'}}/>
              <span style={{fontSize: '14px', textAlign: 'center', color: '#ffb36c'}}>Регуляція параметрів:</span>
              <CustomRow>
                <span>Стовпці: {config.cols} (від 5 до 8)</span>
                <input type="range" min="5" max="8" value={config.cols} onChange={(e) => setConfig({...config, cols: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Ряди: {config.rows} (від 3 до 5)</span>
                <input type="range" min="3" max="5" value={config.rows} onChange={(e) => setConfig({...config, rows: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Ходи: {config.maxMoves} (100 - 200)</span>
                <input type="range" min="100" max="200" step="10" value={config.maxMoves} onChange={(e) => setConfig({...config, maxMoves: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Час: {formatTime(config.maxTime)} (120с - 240с)</span>
                <input type="range" min="120" max="240" step="10" value={config.maxTime} onChange={(e) => setConfig({...config, maxTime: parseInt(e.target.value)})}/>
              </CustomRow>

              <DifficultyBtn onClick={() => setDifficulty('custom', config)} style={{background: '#4e342e', marginTop: '5px'}}>Застосувати власні</DifficultyBtn>
              <DifficultyBtn onClick={() => setShowSettings(false)} style={{background: '#1b110f'}}>Закрити</DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleOne;