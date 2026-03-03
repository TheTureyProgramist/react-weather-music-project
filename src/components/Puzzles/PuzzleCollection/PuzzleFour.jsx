import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const bonusAnim = keyframes`0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; }`;
const shake = keyframes`0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); }`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  ${(props) =>
    (props.$isHit || props.$isPhase3) &&
    css`
      animation: ${shake} 0.2s ease-in-out infinite;
      animation-play-state: ${props.$isHit ? "running" : props.$isPhase3 ? "running" : "paused"};
    `}
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 1px;
  width: 85vw;
  max-width: 380px;
  aspect-ratio: 1 / 1;
  background: #222;
  border: 3px solid ${(props) => (props.$isPhase3 ? "#ff0000" : "#444")};
  padding: 2px;
  position: relative;
  box-shadow: ${(props) => (props.$isPhase3 ? "0 0 20px #ff0000" : "none")};
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => {
    if (props.$type === "wall") return "#333";
    if (props.$isEvacPoint) return "#003366";
    if (props.$isStart && props.$isPhase3) return "#7b1fa2"; 
    if (props.$isStart && props.$canFinish) return "#1b5e20";
    return "#1a1a1a";
  }};
  border: ${(props) => {
    if (props.$isActiveTarget) return "1.5px dashed #ffb36c";
    if (props.$isEvacPoint) return "2px solid #00e5ff";
    return "none";
  }};
  box-sizing: border-box;
  transition: background 0.3s;
`;

const MovingObject = styled.div.attrs((props) => ({
  style: { 
    transform: `translate(${props.$x * 100}%, ${props.$y * 100}%)`,
    opacity: props.$invisible ? 0 : 1,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 12.5%;
  height: 12.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  z-index: 10;
`;

const PlayerIcon = styled.div`
  width: 70%;
  height: 70%;
  background: ${(props) => (props.$isPhase3 ? "#e91e63" : "#ffb36c")};
  border-radius: 50%;
  box-shadow: 0 0 15px ${(props) => (props.$isPhase3 ? "#e91e63" : "#ffb36c")};
`;

const BoxIcon = styled.div`
  width: 75%;
  height: 75%;
  background: ${(props) => (props.$locked ? "#4caf50" : "#795548")};
  border: 2px solid ${(props) => (props.$locked ? "#1b5e20" : "#3e2723")};
  border-radius: 4px;
  opacity: ${(props) => (props.$isGhosting ? 0.4 : 1)};
  position: relative;
  &::after {
    content: "${(props) => (props.$locked ? "🔒" : "")}";
    font-size: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SawIcon = styled.div`
  width: 80%;
  height: 80%;
  background: ${(props) =>
    props.$safe ? "#4caf50" : props.$isPhase3 ? "#ff0000" : "#f44336"};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "⚙️";
    font-size: 12px;
  }
`;

const FloatingText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.$color || "#ffb36c"};
  font-weight: bold;
  font-size: 18px;
  pointer-events: none;
  animation: ${bonusAnim} 1.5s forwards;
  z-index: 100;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 10px;
  width: 90vw;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameButton = styled.button`
  width: 44px;
  height: 44px;
  border: 2px solid #ffb36c;
  background: transparent;
  color: #ffb36c;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.1;
  }
  &:active:not(:disabled) {
    background: #ffb36c;
    color: #222;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #3e2723;
  border: 2px solid #ffb36c;
  border-radius: 15px;
  padding: 20px;
  max-width: 400px;
  color: #eee;
  line-height: 1.5;
`;

const PuzzleFour = ({ onExit }) => {
  // Додано діагональні напрямки для пил
  const directions = useMemo(() => ["up", "down", "left", "right"], []);
  const sawDirections = useMemo(() => [
    "up", "down", "left", "right", 
    "up-left", "up-right", "down-left", "down-right"
  ], []);

  const levelMap = useMemo(() => [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 2, 1],
    [1, 2, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ], []);

  const targets = useMemo(() => [{ x: 6, y: 1 }, { x: 6, y: 5 }, { x: 1, y: 6 }], []);

  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [boxes, setBoxes] = useState([{ x: 3, y: 1, locked: false }, { x: 5, y: 2, locked: false }, { x: 3, y: 4, locked: false }]);
  const [saws, setSaws] = useState([{ x: 6, y: 1 }, { x: 1, y: 6 }, { x: 6, y: 6 }]);
  const [activeTargetIdx, setActiveTargetIdx] = useState(0);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(9); // Змінено на 9 життів
  const [timeLeft, setTimeLeft] = useState(250);
  const [bonusTime, setBonusTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blockedDir, setBlockedDir] = useState("up");
  const [statusMsg, setStatusMsg] = useState(null);
  const [isHit, setIsHit] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [evacPoints, setEvacPoints] = useState([]);
  const [isEvacuating, setIsEvacuating] = useState(false);
  const [evacStepsDone, setEvacStepsDone] = useState(0);
  const [ghostModeTime, setGhostModeTime] = useState(0);
  const [sawsVisibleFlash, setSawsVisibleFlash] = useState(false);
  
  const [isPhase3, setIsPhase3] = useState(false);
  const [phase3StepsLeft, setPhase3StepsLeft] = useState(33);
  const [spontaneousButtons, setSpontaneousButtons] = useState(["up", "down", "left", "right"]);
  const [finalWin, setFinalWin] = useState(false);

  const playerRef = useRef(player);
  useEffect(() => { playerRef.current = player; }, [player]);

  const resetGame = useCallback(() => {
    setPlayer({ x: 1, y: 1 });
    setBoxes([{ x: 3, y: 1, locked: false }, { x: 5, y: 2, locked: false }, { x: 3, y: 4, locked: false }]);
    setSaws([{ x: 6, y: 1 }, { x: 1, y: 6 }, { x: 6, y: 6 }]);
    setActiveTargetIdx(Math.floor(Math.random() * targets.length));
    setMoves(0); setLives(9); setTimeLeft(250); setBonusTime(0);
    setIsProcessing(false); setBlockedDir("up"); setStatusMsg(null);
    setIsEvacuating(false); setEvacPoints([]); setEvacStepsDone(0);
    setGhostModeTime(0); setFinalWin(false); setIsPhase3(false); setPhase3StepsLeft(33);
  }, [targets]);

  const handleHit = useCallback(() => {
    if (bonusTime > 0) return;
    setIsHit(true);
    setTimeout(() => setIsHit(false), 400);
    if (lives <= 1) { alert("КРИТИЧНА ПОМИЛКА: СИСТЕМА ЗНИЩЕНА"); resetGame(); }
    else { setLives((l) => l - 1); setPlayer({ x: 1, y: 1 }); }
  }, [lives, resetGame, bonusTime]);

  const moveSaws = useCallback(async () => {
    setIsProcessing(true);
    let currentSaws = [...saws];
    for (let step = 0; step < 3; step++) {
      await new Promise((r) => setTimeout(r, 350));
      currentSaws = currentSaws.map((saw) => {
        const valid = sawDirections.filter((d) => {
          let dx = 0, dy = 0;
          if (d.includes("up")) dy = -1;
          if (d.includes("down")) dy = 1;
          if (d.includes("left")) dx = -1;
          if (d.includes("right")) dx = 1;
          const nx = saw.x + dx, ny = saw.y + dy;
          const hasBox = boxes.some((b) => b.x === nx && b.y === ny);
          return levelMap[ny]?.[nx] === 0 && (ghostModeTime > 0 ? true : !hasBox);
        });
        const move = valid[Math.floor(Math.random() * valid.length)];
        if (!move) return saw;
        let dx = 0, dy = 0;
        if (move.includes("up")) dy = -1;
        if (move.includes("down")) dy = 1;
        if (move.includes("left")) dx = -1;
        if (move.includes("right")) dx = 1;
        return { x: saw.x + dx, y: saw.y + dy };
      });
      setSaws([...currentSaws]);
      if (currentSaws.find((s) => s.x === playerRef.current.x && s.y === playerRef.current.y)) {
        handleHit(); setIsProcessing(false); return;
      }
    }
    setBlockedDir(directions[Math.floor(Math.random() * 4)]);
    if (isPhase3) {
      const count = Math.floor(Math.random() * 3) + 2;
      setSpontaneousButtons([...directions].sort(() => 0.5 - Math.random()).slice(0, count));
    }
    setIsProcessing(false);
  }, [saws, boxes, levelMap, directions, sawDirections, handleHit, isPhase3, ghostModeTime]);

  // Функція телепортації при застряганні
  const emergencyEscape = useCallback(() => {
    const emptyCells = [];
    levelMap.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0 && !boxes.some(b => b.x === x && b.y === y)) {
          // Розраховуємо відстань до найближчої пили
          let minDist = 100;
          saws.forEach(s => {
            const d = Math.abs(s.x - x) + Math.abs(s.y - y);
            if (d < minDist) minDist = d;
          });
          emptyCells.push({ x, y, dist: minDist });
        }
      });
    });
    // Вибираємо клітинку найдалі від пил
    const bestCell = emptyCells.sort((a, b) => b.dist - a.dist)[0];
    if (bestCell) {
      setPlayer({ x: bestCell.x, y: bestCell.y });
      setStatusMsg("КВАНТОВИЙ СУНУВ 🌀");
    }
  }, [levelMap, boxes, saws]);

  const completeStep = useCallback((nx, ny, newBoxes) => {
    setPlayer({ x: nx, y: ny });
    
    if (isEvacuating && !isPhase3) {
      const atEvac = evacPoints.findIndex(p => p.x === nx && p.y === ny && !p.active);
      if (atEvac !== -1) {
        const updatedEvac = [...evacPoints];
        updatedEvac[atEvac].active = true;
        setEvacPoints(updatedEvac);
        setStatusMsg("СИГНАЛ ПРИЙНЯТО");
        setSawsVisibleFlash(true);
        setTimeout(() => setSawsVisibleFlash(false), 300);
      }
      if (nx === 1 && ny === 1 && evacPoints.every(p => p.active)) {
        setIsPhase3(true);
        setStatusMsg("ФАЗА 3: СТАБІЛІЗАЦІЯ");
        setGhostModeTime(3);
        return;
      }
    }

    if (isPhase3) {
      setPhase3StepsLeft(prev => {
        const next = prev - 1;
        if (next <= 0 && nx === 1 && ny === 1) setFinalWin(true);
        return next;
      });
    }

    const currentTarget = targets[activeTargetIdx];
    const boxOnActiveIdx = newBoxes.findIndex((b) => b.x === currentTarget.x && b.y === currentTarget.y && !b.locked);

    if (boxOnActiveIdx !== -1 && !isEvacuating) {
      const updatedBoxes = [...newBoxes];
      updatedBoxes[boxOnActiveIdx].locked = true;
      setBoxes(updatedBoxes);
      const lockedCount = updatedBoxes.filter((b) => b.locked).length;
      
      if (lockedCount === 1) { 
        setBonusTime(6); // Бонус змінено на 6 секунд
        setStatusMsg("НЕВРАЗЛИВІСТЬ! 🛡️"); 
      }
      if (lockedCount === 3) {
        setIsEvacuating(true); setGhostModeTime(3); setEvacStepsDone(0); setStatusMsg("ЕВАКУАЦІЯ!");
        const points = [];
        while(points.length < 2) {
          const rx = Math.floor(Math.random() * 6) + 1, ry = Math.floor(Math.random() * 6) + 1;
          if (levelMap[ry][rx] === 0 && !points.some(p => p.x === rx && p.y === ry)) points.push({ x: rx, y: ry, active: false });
        }
        setEvacPoints(points);
      } else {
        const rem = targets.map((_, i) => i).filter(i => !updatedBoxes.some(b => b.locked && b.x === targets[i].x && b.y === targets[i].y));
        if (rem.length > 0) setActiveTargetIdx(rem[Math.floor(Math.random() * rem.length)]);
      }
    }

    if (saws.some((s) => s.x === nx && s.y === ny)) handleHit();
    else {
      setMoves((m) => {
        const nextMoves = m + 1;
        if (nextMoves >= 200) { alert("ЕНЕРГІЯ ВИЧЕРПАНА"); resetGame(); return 0; }
        if (nextMoves % 3 === 0) setTimeout(() => moveSaws(), 200);
        return nextMoves;
      });
      if (isEvacuating) setEvacStepsDone(prev => prev + 1);
    }
  }, [saws, handleHit, moveSaws, activeTargetIdx, targets, isEvacuating, evacPoints, levelMap, resetGame, isPhase3]);

  const movePlayer = useCallback((dir) => {
    const isAnomalyDisabled = (isEvacuating && evacStepsDone < 3) || (isPhase3 && evacStepsDone < 3);
    const isButtonAvailable = isPhase3 ? spontaneousButtons.includes(dir) : true;

    // Перевірка на застрягання: якщо аномалія блокує хід і це єдина можливість
    if (!isAnomalyDisabled && dir === blockedDir && !isProcessing) {
        emergencyEscape();
        return;
    }

    if (finalWin || isProcessing || (!isAnomalyDisabled && !isButtonAvailable)) return;
    
    const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
    const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
    const nx = player.x + dx, ny = player.y + dy;

    if (levelMap[ny]?.[nx] === 1) return;

    const boxIdx = boxes.findIndex((b) => b.x === nx && b.y === ny);
    if (boxIdx !== -1) {
      if (ghostModeTime > 0) { completeStep(nx, ny, boxes); return; }
      if (boxes[boxIdx].locked) return;
      const bnx = nx + dx, bny = ny + dy;
      if (levelMap[bny]?.[bnx] === 0 && !boxes.some((b) => b.x === bnx && b.y === bny)) {
        const nextBoxes = [...boxes];
        nextBoxes[boxIdx] = { ...nextBoxes[boxIdx], x: bnx, y: bny };
        setBoxes(nextBoxes); completeStep(nx, ny, nextBoxes);
      }
    } else completeStep(nx, ny, boxes);
  }, [finalWin, isProcessing, blockedDir, player, levelMap, boxes, completeStep, isEvacuating, evacStepsDone, ghostModeTime, isPhase3, spontaneousButtons, emergencyEscape]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!finalWin && timeLeft > 0) setTimeLeft((prev) => prev - 1);
      if (bonusTime > 0) setBonusTime((prev) => prev - 1);
      if (ghostModeTime > 0) setGhostModeTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [finalWin, timeLeft, bonusTime, ghostModeTime]);

  return (
    <GameWrapper $isHit={isHit} $isPhase3={isPhase3}>
      <div style={{ textAlign: "center", color: "#ffb36c" }}>
        <h4 style={{ margin: 0 }}>{isPhase3 ? "ФАЗА 3: СТАБІЛІЗАЦІЯ" : isEvacuating ? "ФАЗА 2: ЕВАКУАЦІЯ" : "ФАЗА 1: ЗАХОПЛЕННЯ"}</h4>
        <small style={{ color: (bonusTime > 0 || (evacStepsDone < 3)) ? "#4caf50" : "#f44336", fontWeight: "bold" }}>
          {isPhase3 ? `🌀 КРОКІВ ДО ЗЛАМУ: ${Math.max(0, phase3StepsLeft)}` : 
           ghostModeTime > 0 ? `👻 КВАНТОВИЙ СТРИБОК: ${ghostModeTime}с` : 
           `🚫 АНОМАЛІЯ: ${blockedDir.toUpperCase()}`}
        </small>
      </div>

      <GameBoard $isPhase3={isPhase3}>
        {levelMap.map((row, y) => row.map((cell, x) => (
          <Cell key={`${x}-${y}`} $type={cell === 1 ? "wall" : "empty"} 
                $isActiveTarget={!isEvacuating && targets[activeTargetIdx].x === x && targets[activeTargetIdx].y === y}
                $isEvacPoint={evacPoints.find(p => p.x === x && p.y === y && !p.active)} 
                $isStart={x === 1 && y === 1} 
                $canFinish={isEvacuating && evacPoints.every(p => p.active)} />
        )))}

        <MovingObject $x={player.x} $y={player.y} style={{ zIndex: 20 }}><PlayerIcon $isPhase3={isPhase3} /></MovingObject>
        {boxes.map((b, i) => (<MovingObject key={`box-${i}`} $x={b.x} $y={b.y}><BoxIcon $locked={b.locked} $isGhosting={ghostModeTime > 0} /></MovingObject>))}
        {saws.map((s, i) => (<MovingObject key={`saw-${i}`} $x={s.x} $y={s.y} $invisible={isEvacuating && !sawsVisibleFlash && bonusTime <= 0}><SawIcon $safe={bonusTime > 0} $isPhase3={isPhase3}/></MovingObject>))}

        {statusMsg && <FloatingText $color={isPhase3 ? "#e91e63" : "#00e5ff"}>{statusMsg}</FloatingText>}
        {finalWin && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.9)", color: "#4caf50", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 50, textAlign: "center" }}>
            <h2>🏆 СИСТЕМУ ЗЛАМАНО</h2>
            <p>Ви врятували ядро!</p>
            <GameButton onClick={resetGame} style={{width: "auto", padding: "0 20px"}}>ПОВТОРИТИ</GameButton>
          </div>
        )}
      </GameBoard>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 44px)", gap: "4px" }}>
        <div />
        <GameButton disabled={isProcessing || (isPhase3 && !spontaneousButtons.includes("up"))} onClick={() => movePlayer("up")}>▲</GameButton>
        <div />
        <GameButton disabled={isProcessing || (isPhase3 && !spontaneousButtons.includes("left"))} onClick={() => movePlayer("left")}>◀</GameButton>
        <div />
        <GameButton disabled={isProcessing || (isPhase3 && !spontaneousButtons.includes("right"))} onClick={() => movePlayer("right")}>▶</GameButton>
        <div />
        <GameButton disabled={isProcessing || (isPhase3 && !spontaneousButtons.includes("down"))} onClick={() => movePlayer("down")}>▼</GameButton>
      </div>

      <BottomPanel>
        <div style={{ fontSize: "11px", fontWeight: "bold" }}>
          ❤️{lives}/9 | ⏳{timeLeft}с | 👣{moves}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <GameButton onClick={() => setShowHelp(true)} style={{ width: 36, height: 36, fontSize: 16 }}>?</GameButton>
          <GameButton onClick={resetGame} style={{ width: 36, height: 36, fontSize: 16 }}>⏭</GameButton>
          <GameButton onClick={onExit} style={{ width: 36, height: 36, fontSize: 16, borderColor: "#f44336", color: "#f44336" }}>✖</GameButton>
        </div>
      </BottomPanel>

      {showHelp && (
        <ModalOverlay onClick={() => setShowHelp(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#ffb36c", marginTop: 0 }}>Протокол Виживання</h3>
            <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#ffb36c" }}>
              <li><b>Діагональні Пили:</b> Тепер вороги рухаються у 8 напрямках!</li>
              <li><b>Застрягання:</b> Якщо аномалія закрила хід — тисність на заблоковану кнопку для телепортації.</li>
              <li><b>9 Життів:</b> Тепер ви маєте більше шансів на помилку.</li>
              <li><b>Бонус:</b> Перший ящик дає 6с невразливості.</li>
              <li><b>Фаза 3:</b> Зробіть 33 ходи і поверніться у (1,1) при нестабільному керуванні.</li>
            </ul>
            <button onClick={() => setShowHelp(false)} style={{ width: "100%", padding: "10px", background: "#ffb36c", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>ЗРОЗУМІЛО</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </GameWrapper>
  );
};

export default PuzzleFour;