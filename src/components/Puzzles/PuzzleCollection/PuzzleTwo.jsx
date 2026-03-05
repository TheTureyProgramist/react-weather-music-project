import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import asium from "../../../mp3/harmonic-japan.mp3";

// --- Animations ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const rotate = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const rotateRev = keyframes`from { transform: rotate(0deg); } to { transform: rotate(-360deg); }`;
const shake = keyframes`0% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } 100% { transform: translateX(0); }`;
const redFlash = keyframes`0% { background: rgba(255, 0, 0, 0); } 50% { background: rgba(255, 0, 0, 0.3); } 100% { background: rgba(255, 0, 0, 0); }`;

// --- Styled Components ---
const GameWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out; height: 100vh; width: 100vw; background: #111; color: white;
  overflow: hidden; position: relative;
  &.error-flash::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; animation: ${redFlash} 0.5s ease-in-out; pointer-events: none; z-index: 50; }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(${props => props.$grid}, 1fr); gap: 12px;
  width: 85vw; max-width: 400px; aspect-ratio: 1 / 1;
  &.shake { animation: ${shake} 0.4s ease-in-out; }
`;

const Cube = styled.div`
  background: ${props => props.$active ? "#ffb36c" : "#3e2723"};
  border: 2px solid #ffb36c; cursor: ${props => props.$disabled ? "default" : "pointer"};
  transition: all ${props => props.$speed / 1000}s ease;
  box-shadow: ${props => props.$active ? "0 0 30px #ffb36c" : "none"};
  &:hover { background: ${props => !props.$disabled && "#5d4037"}; }
  &:active { transform: ${props => !props.$disabled && "scale(0.92)"}; }
`;

const BottomPanel = styled.div`
  background-color: #3e2723; color: #ffb36c; border: 2px solid #ffb36c; padding: 10px 15px;
  width: 95%; max-width: 600px; display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 60;
`;

const StatsBlock = styled.div`display: flex; flex-direction: column; font-size: 13px; line-height: 1.4;`;
const Controls = styled.div`display: flex; gap: 8px; align-items: center;`;

const GameButton = styled.button`
  width: 40px; height: 40px; background: transparent; border: 2px solid #ffb36c; color: #ffb36c;
  cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;
  &:hover:not(:disabled) { background: rgba(255,179,108,0.1); transform: scale(1.05); }
  &:disabled { opacity: 0.2; cursor: not-allowed; filter: grayscale(1); }
  &.pending { border-color: #4caf50; color: #4caf50; animation: ${fadeIn} 0.5s infinite alternate; }
`;

const GearContainer = styled(GameButton)`
  position: relative; overflow: hidden;
  .g { position: absolute; font-size: 12px; transition: 0.3s; }
  .g1 { top: 4px; left: 14px; } .g2 { bottom: 6px; left: 6px; } .g3 { bottom: 6px; right: 6px; }
  &:hover:not(:disabled) .g1 { animation: ${rotate} 3s linear infinite; }
  &:hover:not(:disabled) .g2 { animation: ${rotateRev} 3s linear infinite; }
  &:hover:not(:disabled) .g3 { animation: ${rotate} 3s linear infinite; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed; top:0; left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.85);
  display: flex; justify-content: center; align-items: center; z-index: 100;
`;

const Modal = styled.div`
  background: #2e1a16; border: 3px solid #ffb36c; padding: 20px;
  width: 320px; max-height: 90vh; display: flex; flex-direction: column; gap: 10px;
`;

const DifficultyBtn = styled.button`
  background: #3e2723; color: #ffb36c; border: 1px solid #ffb36c; padding: 10px;
  cursor: pointer; font-weight: bold; font-size: 13px;
  &:hover:not(:disabled) { background: #ffb36c; color: #3e2723; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
  &.pending { background: #1b5e20; color: white; border-color: #4caf50; }
`;

const CustomRow = styled.div`
  display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #ffb36c;
  input { accent-color: #ffb36c; cursor: pointer; }
  &.disabled { opacity: 0.3; pointer-events: none; }
`;

// --- Component ---
const PuzzleTwo = ({ onExit }) => {
  const [config, setConfig] = useState({ grid: 3, seqLen: 7, speed: 700, label: "Середня" });
  const [tempConfig, setTempConfig] = useState({ ...config });
  
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeCube, setActiveCube] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [pendingRestart, setPendingRestart] = useState(null); 

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(asium));
  const timeoutsRef = useRef([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const startNewLevel = useCallback(() => {
    clearTimeouts();
    setIsShowing(true);
    setUserSequence([]);
    setIsWon(false);
    setIsError(false);
    setActiveCube(null);
    setPendingRestart(null);

    const newSeq = Array.from({ length: config.seqLen }, () => 
      Math.floor(Math.random() * (config.grid * config.grid))
    );
    setSequence(newSeq);

    newSeq.forEach((cubeIdx, i) => {
      const t = setTimeout(() => {
        setActiveCube(cubeIdx);
        const tInner = setTimeout(() => setActiveCube(null), config.speed - 100);
        timeoutsRef.current.push(tInner);
      }, i * (config.speed + 150));
      timeoutsRef.current.push(t);
    });

    const tEnd = setTimeout(() => {
      setIsShowing(false);
    }, newSeq.length * (config.speed + 150));
    timeoutsRef.current.push(tEnd);
  }, [config, clearTimeouts]);

  useEffect(() => {
    if (!isShowing && pendingRestart) {
      if (pendingRestart.config) {
        setConfig(pendingRestart.config);
      } else {
        startNewLevel();
      }
    }
  }, [isShowing, pendingRestart, startNewLevel]);

  useEffect(() => {
    startNewLevel();
    return () => clearTimeouts();
  }, [startNewLevel, clearTimeouts]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, [volume, isMuted]);

  const handleCubeClick = (index) => {
    if (isShowing || isWon || isError) return;
    if (sequence[userSequence.length] === index) {
      const nextUserSeq = [...userSequence, index];
      setUserSequence(nextUserSeq);
      if (nextUserSeq.length === sequence.length) setIsWon(true);
    } else {
      setIsError(true);
      setTimeout(startNewLevel, 600);
    }
  };

  const toggleVolume = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(1);
    } else if (volume === 1) {
      setVolume(0.5);
    } else if (volume === 0.5) {
      setVolume(0.1);
    } else {
      setIsMuted(true);
    }
  };

  const applyDifficulty = (type, custom = null) => {
    let newConf;
    if (custom) {
      newConf = { ...custom, label: "Власна" };
    } else {
      const presets = {
        easy: { grid: 2, seqLen: 5, speed: 1000, label: "Легка" },
        normal: { grid: 3, seqLen: 7, speed: 700, label: "Середня" },
        hard: { grid: 4, seqLen: 10, speed: 500, label: "Екстремальна" }
      };
      newConf = presets[type];
    }

    if (isShowing) {
      setPendingRestart({ config: newConf });
      setTempConfig(newConf);
      setShowSettings(false);
    } else {
      setConfig(newConf);
      setTempConfig(newConf);
      setShowSettings(false);
    }
  };

  return (
    <GameWrapper className={isError ? "error-flash" : ""}>
      <div style={{ height: '40px', zIndex: 60 }}>
        {isWon ? <h2 style={{ color: '#4caf50', margin: 0 }}>Перемога! 🎉</h2> : 
         isError ? <h2 style={{ color: '#ff5252', margin: 0 }}>Помилка!</h2> : 
         <h3 style={{ color: pendingRestart ? '#4caf50' : '#ffb36c', margin: 0 }}>
           {pendingRestart ? "Буде перезапущено..." : isShowing ? "Уважно стежте..." : "Ваш хід!"}
         </h3>}
      </div>
      
      <Grid $grid={config.grid} className={isError ? "shake" : ""}>
        {[...Array(config.grid * config.grid)].map((_, i) => (
          <Cube key={i} $active={activeCube === i} $disabled={isShowing || isError} $speed={config.speed} onClick={() => handleCubeClick(i)} />
        ))}
      </Grid>

      <BottomPanel>
        <StatsBlock>
          <span><strong>Рівень:</strong> {config.label}</span>
          <span><strong>Прогрес:</strong> {userSequence.length} / {sequence.length}</span>
        </StatsBlock>
        <Controls>
          <GameButton onClick={toggleVolume}>
            {isMuted ? "🔇" : volume === 0.1 ? "🔈" : volume === 0.5 ? "🔉" : "🎵"}
          </GameButton>
          <GearContainer onClick={() => setShowSettings(true)} disabled={isError}>
            <span className="g g1">⚙</span><span className="g g2">⚙</span><span className="g g3">⚙</span>
          </GearContainer>
          <GameButton 
            className={pendingRestart && !pendingRestart.config ? "pending" : ""}
            onClick={() => isShowing ? setPendingRestart({config: null}) : startNewLevel()} 
            disabled={isError}
          >
            {pendingRestart && !pendingRestart.config ? "⏳" : "⏭"}
          </GameButton>
          <GameButton onClick={onExit} disabled={isShowing || isError}>✖</GameButton>
        </Controls>
      </BottomPanel>

      <AnimatePresence>
        {showSettings && (
          <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSettings(false)}>
            <Modal onClick={e => e.stopPropagation()}>
              <h3 style={{color: '#ffb36c', textAlign: 'center', margin: 0}}>Налаштування</h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <DifficultyBtn onClick={() => applyDifficulty('easy')}>Легка: 2x2, 5 кроків</DifficultyBtn>
                <DifficultyBtn onClick={() => applyDifficulty('normal')}>Середня: 3x3, 7 кроків</DifficultyBtn>
                <DifficultyBtn onClick={() => applyDifficulty('hard')}>Екстремальна: 4x4, 10 кроків</DifficultyBtn>
              </div>

              <hr style={{borderColor: '#ffb36c', width: '100%', margin: '5px 0'}}/>
              
              <CustomRow>
                <span>Сітка: {tempConfig.grid}x{tempConfig.grid}</span>
                <input type="range" min="2" max="4" value={tempConfig.grid} onChange={(e) => setTempConfig({...tempConfig, grid: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Кроків: {tempConfig.seqLen}</span>
                <input type="range" min="3" max="12" value={tempConfig.seqLen} onChange={(e) => setTempConfig({...tempConfig, seqLen: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Швидкість: {tempConfig.speed}мс</span>
                <input type="range" min="300" max="1200" step="100" value={tempConfig.speed} onChange={(e) => setTempConfig({...tempConfig, speed: parseInt(e.target.value)})}/>
              </CustomRow>

              <DifficultyBtn 
                className={pendingRestart ? "pending" : ""}
                onClick={() => applyDifficulty('custom', tempConfig)} 
                style={{background: '#4e342e'}}
              >
                {pendingRestart ? "В черзі..." : "Застосувати власні"}
              </DifficultyBtn>
              
              <DifficultyBtn onClick={() => setShowSettings(false)} style={{background: '#1b110f'}}>Закрити</DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleTwo;