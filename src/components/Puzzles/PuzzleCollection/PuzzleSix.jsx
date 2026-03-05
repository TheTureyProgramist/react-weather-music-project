import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import defaultImg from "../../../photos/hero-header/start-image.jpg";
import dinofroz from "../../../mp3/dinofroz.mp3";

// --- Анімації ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRev = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

// --- Стилі ---
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

const ResponsiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95vw;
  height: 55vh;
  max-height: 450px;
`;

const ViewportScaleWrapper = styled.div`
  transform: scale(${props => props.$scale});
  transform-origin: center;
  width: 600px;
  height: 400px;
  flex-shrink: 0;
`;

const Viewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  width: 95%;
  max-width: 700px;
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
  font-size: 13px;
  line-height: 1.4;
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
  .g { position: absolute; font-size: 14px; transition: 0.3s; }
  .g1 { top: 4px; left: 14px; }
  .g2 { bottom: 6px; left: 6px; }
  .g3 { bottom: 6px; right: 6px; }

  &:hover .g1 { animation: ${rotate} 3s linear infinite; }
  &:hover .g2 { animation: ${rotateRev} 3s linear infinite; }
  &:hover .g3 { animation: ${rotate} 3s linear infinite; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
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

// --- Компонент ---
const PuzzleSix = ({ imageUrl, onExit }) => {
  const finalImage = imageUrl || defaultImg;
  
  // Налаштування гри
  const [config, setConfig] = useState({
    disks: 7,
    tolerance: 20,
    maxErrors: 7,
    maxTime: 120,
    speedFactor: 1.0,
    uniformSpeed: false,
    variableBoost: false,
    label: "Середня"
  });

  const [lenses, setLenses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(config.maxTime);
  const [errors, setErrors] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [visualError, setVisualError] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const requestRef = useRef();
  
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(dinofroz));
  const longPressTimer = useRef(null);

  // Адаптивність для телефонів (ландшафтний і портретний режим)
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleW = clientWidth / 620; // 600 + padding
        const scaleH = clientHeight / 420; // 400 + padding
        setScale(Math.min(scaleW, scaleH, 1));
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Аудіо
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

  const initGame = useCallback(() => {
    const newLenses = [];
    const minDistance = 85;

    for (let i = 0; i < config.disks; i++) {
      let lens;
      let collision;
      let attempts = 0;
      do {
        collision = false;
        
        let speedVal = config.uniformSpeed ? 1 * config.speedFactor : (1.5 + Math.random() * 2) * config.speedFactor;
        let direction = Math.random() > 0.5 ? 1 : -1;

        lens = {
          id: i,
          x: 75 + Math.random() * 450,
          y: 75 + Math.random() * 250,
          rotation: Math.random() * 360,
          baseSpeed: speedVal * direction,
          speed: speedVal * direction,
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
    setTimeLeft(config.maxTime);
    setErrors(0);
    setIsWon(false);
  }, [config]);

  useEffect(() => { initGame(); }, [initGame]);

  const updateRotation = useCallback(() => {
    if (!isWon) {
      setLenses(prev => prev.map(lens => {
        if (lens.locked || lens.disabled) return lens;
        
        let currentSpeed = lens.baseSpeed;

        // Екстремальна важкість: диски пришвидшуються в моментах наближення до синхронізації
        if (config.variableBoost) {
          const absRot = Math.abs(lens.rotation % 360);
          if (absRot < 45 || absRot > 315) {
            currentSpeed *= 1.6; // Прискорення
          }
        }

        return { ...lens, speed: currentSpeed, rotation: (lens.rotation + currentSpeed) % 360 };
      }));
      requestRef.current = requestAnimationFrame(updateRotation);
    }
  }, [isWon, config.variableBoost]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateRotation]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isWon) {
      alert("Час вичерпано!");
      initGame();
    }
  }, [timeLeft, isWon, initGame]);

  const handleLensClick = (id) => {
    if (isWon || errors >= config.maxErrors) return;

    setLenses(prev => {
      const clickedLens = prev.find(l => l.id === id);
      if (!clickedLens || clickedLens.locked || clickedLens.disabled) return prev;

      const currentRot = Math.abs(clickedLens.rotation % 360);
      // Перевірка похибки
      const isCorrect = currentRot <= config.tolerance || currentRot >= (360 - config.tolerance);

      if (isCorrect) {
        const next = prev.map(l => l.id === id ? { ...l, rotation: 0, locked: true } : l);
        if (next.every(l => l.locked)) setIsWon(true);
        return next;
      } else {
        const nextErrors = errors + 1;
        setErrors(nextErrors);
        setVisualError(true);
        setTimeout(() => setVisualError(false), 300);

        if (nextErrors >= config.maxErrors) {
          setTimeout(() => { alert("Ліміт помилок вичерпано!"); initGame(); }, 100);
        }

        setTimeout(() => {
          setLenses(cur => cur.map(l => l.id === id ? { ...l, disabled: false } : l));
        }, 1000);

        return prev.map(l => l.id === id ? { ...l, disabled: true } : l);
      }
    });
  };

  const setDifficulty = (type, customParams = null) => {
    if (customParams) {
      setConfig({ ...customParams, label: "Власна" });
    } else {
      if (type === 'easy') setConfig({ disks: 5, tolerance: 30, maxErrors: 10, maxTime: 180, speedFactor: 0.5, uniformSpeed: true, variableBoost: false, label: "Легка" });
      else if (type === 'normal') setConfig({ disks: 7, tolerance: 20, maxErrors: 7, maxTime: 120, speedFactor: 1.0, uniformSpeed: false, variableBoost: false, label: "Середня" });
      else if (type === 'extreme') setConfig({ disks: 8, tolerance: 15, maxErrors: 6, maxTime: 60, speedFactor: 1.5, uniformSpeed: false, variableBoost: true, label: "Екстремальна" });
    }
    setShowSettings(false);
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

      <ResponsiveContainer ref={containerRef}>
        <ViewportScaleWrapper $scale={scale}>
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
        </ViewportScaleWrapper>
      </ResponsiveContainer>

      <BottomPanel>
        <StatsBlock>
          <span><strong>Рівень:</strong> {config.label} ({config.disks} лінз)</span>
          <span>
            <strong>Час:</strong> <span style={{ color: timeLeft < 15 ? '#ff5252' : '#ffb36c' }}>{formatTime(timeLeft)}</span> / {formatTime(config.maxTime)} | 
            <strong style={{ marginLeft: '10px' }}>Штрафи:</strong> <span style={{ color: errors >= config.maxErrors - 2 ? '#ff5252' : '#ffb36c' }}>{errors} / {config.maxErrors}</span>
          </span>
        </StatsBlock>

        <Controls>
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
                <DifficultyBtn onClick={() => setDifficulty('easy')}>Легка (5 лінз, ±30°, 3хв)</DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty('normal')}>Середня (7 лінз, ±20°, 2хв)</DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty('extreme')}>Екстремальна (8 лінз, ±15°, 1хв)</DifficultyBtn>
              </div>

              <hr style={{borderColor: '#ffb36c', width: '100%', margin: '5px 0'}}/>
              <span style={{fontSize: '14px', textAlign: 'center', color: '#ffb36c'}}>Регуляція параметрів:</span>
              
              <CustomRow>
                <span>Кількість лінз: {config.disks} (від 5 до 8)</span>
                <input type="range" min="5" max="8" value={config.disks} onChange={(e) => setConfig({...config, disks: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Похибка (±градуси): {config.tolerance}° (від 15 до 30)</span>
                <input type="range" min="15" max="30" value={config.tolerance} onChange={(e) => setConfig({...config, tolerance: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Штрафи: {config.maxErrors} (від 6 до 10)</span>
                <input type="range" min="6" max="10" value={config.maxErrors} onChange={(e) => setConfig({...config, maxErrors: parseInt(e.target.value)})}/>
              </CustomRow>
              <CustomRow>
                <span>Час: {formatTime(config.maxTime)} (60с - 180с)</span>
                <input type="range" min="60" max="180" step="10" value={config.maxTime} onChange={(e) => setConfig({...config, maxTime: parseInt(e.target.value)})}/>
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

export default PuzzleSix;