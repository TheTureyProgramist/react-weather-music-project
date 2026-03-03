import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
    props.$isHit &&
    css`
      animation: ${shake} 0.2s ease-in-out 2;
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
  border: 3px solid #444;
  padding: 2px;
  position: relative;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.$type === "wall" ? "#333" : "#1a1a1a")};
  border: ${(props) =>
    props.$type === "target" ? "1.5px dashed #ffb36c" : "none"};
  box-sizing: border-box;
`;

const MovingObject = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.$x * 100}%, ${props.$y * 100}%)`,
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
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
`;

const PlayerIcon = styled.div`
  width: 70%;
  height: 70%;
  background: #ffb36c;
  border-radius: 50%;
  box-shadow: 0 0 15px #ffb36c;
`;

const BoxIcon = styled.div`
  width: 75%;
  height: 75%;
  background: ${(props) => (props.$onTarget ? "#4caf50" : "#795548")};
  border: 2px solid ${(props) => (props.$onTarget ? "#1b5e20" : "#3e2723")};
  border-radius: 4px;
`;

const SawIcon = styled.div`
  width: 80%;
  height: 80%;
  background: #f44336;
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
  const directions = useMemo(() => ["up", "down", "left", "right"], []);
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

  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [boxes, setBoxes] = useState([
    { x: 3, y: 1 },
    { x: 5, y: 2 },
    { x: 3, y: 4 },
  ]);
  const [saws, setSaws] = useState([
    { x: 6, y: 1 },
    { x: 1, y: 6 },
    { x: 6, y: 6 },
  ]);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(150);
  const [isProcessing, setIsProcessing] = useState(false);
  const [blockedDir, setBlockedDir] = useState("up");
  const [statusMsg, setStatusMsg] = useState(null);
  const [isHit, setIsHit] = useState(false);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Використовуємо ref для актуальної позиції гравця в асинхронних циклах пил
  const playerRef = useRef(player);
  useEffect(() => { playerRef.current = player; }, [player]);

  const isWon = boxes.every((box) => levelMap[box.y][box.x] === 2);

  const resetGame = useCallback(() => {
    setPlayer({ x: 1, y: 1 });
    setBoxes([{ x: 3, y: 1 }, { x: 5, y: 2 }, { x: 3, y: 4 }]);
    setSaws([{ x: 6, y: 1 }, { x: 1, y: 6 }, { x: 6, y: 6 }]);
    setMoves(0);
    setLives(3);
    setTimeLeft(150);
    setIsProcessing(false);
    setBlockedDir("up");
    setStatusMsg(null);
    setBonusClaimed(false);
  }, []);

  const handleHit = useCallback(() => {
    setIsHit(true);
    setTimeout(() => setIsHit(false), 400);
    if (lives <= 1) {
      alert("ГРУ ЗАКІНЧЕНО");
      resetGame();
    } else {
      setLives((l) => l - 1);
      setPlayer({ x: 1, y: 1 });
    }
  }, [lives, resetGame]);

  const moveSaws = useCallback(async () => {
    setIsProcessing(true);
    let currentSaws = [...saws];
    
    for (let step = 0; step < 3; step++) {
      // Чекаємо завершення анімації попереднього кроку
      await new Promise((r) => setTimeout(r, 350));
      
      currentSaws = currentSaws.map((saw) => {
        const valid = directions.filter((d) => {
          const nx = saw.x + (d === "left" ? -1 : d === "right" ? 1 : 0);
          const ny = saw.y + (d === "up" ? -1 : d === "down" ? 1 : 0);
          const hasBox = boxes.some((b) => b.x === nx && b.y === ny);
          return levelMap[ny]?.[nx] !== 1 && !hasBox;
        });
        const move = valid[Math.floor(Math.random() * valid.length)];
        if (!move) return saw;
        return {
          x: saw.x + (move === "left" ? -1 : move === "right" ? 1 : 0),
          y: saw.y + (move === "up" ? -1 : move === "down" ? 1 : 0),
        };
      });

      setSaws([...currentSaws]);

      // ПЕРЕВІРКА ПІСЛЯ КОЖНОГО КРОКУ:
      const hit = currentSaws.find(s => s.x === playerRef.current.x && s.y === playerRef.current.y);
      if (hit) {
        // Даємо 100мс, щоб око зафіксувало пилу на клітинці гравця
        await new Promise(r => setTimeout(r, 100));
        handleHit();
        setIsProcessing(false);
        return; // Зупиняємо цикл руху пил
      }
    }
    
    setBlockedDir(directions[Math.floor(Math.random() * 4)]);
    setIsProcessing(false);
  }, [saws, boxes, levelMap, directions, handleHit]);

  const completeStep = useCallback((nx, ny) => {
    setPlayer({ x: nx, y: ny });
    // Перевірка чи не став гравець на пилу сам
    if (saws.some((s) => s.x === nx && s.y === ny)) {
      handleHit();
    } else {
      setMoves((m) => {
        const nextMoves = m + 1;
        if (nextMoves % 3 === 0) {
          // Затримка перед початком руху пил, щоб гравець завершив свій хід
          setTimeout(() => moveSaws(), 200);
        }
        return nextMoves;
      });
    }
  }, [saws, handleHit, moveSaws]);

  const isPhysicallyBlocked = useCallback((x, y, dir) => {
    const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
    const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
    const nx = x + dx, ny = y + dy;
    if (levelMap[ny]?.[nx] === 1) return true;
    const boxIdx = boxes.findIndex((b) => b.x === nx && b.y === ny);
    if (boxIdx !== -1) {
      const bnx = nx + dx, bny = ny + dy;
      return (
        levelMap[bny]?.[bnx] === 1 ||
        boxes.some((b) => b.x === bnx && b.y === bny)
      );
    }
    return false;
  }, [boxes, levelMap]);

  const movePlayer = useCallback((dir, force = false) => {
    if (isWon || isProcessing || (!force && dir === blockedDir)) return;
    const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
    const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
    const nx = player.x + dx, ny = player.y + dy;

    if (levelMap[ny]?.[nx] === 1) return;

    const boxIdx = boxes.findIndex((b) => b.x === nx && b.y === ny);
    if (boxIdx !== -1) {
      const bnx = nx + dx, bny = ny + dy;
      if (
        levelMap[bny]?.[bnx] !== 1 &&
        !boxes.some((b) => b.x === bnx && b.y === bny)
      ) {
        setBoxes((prev) => {
          const newBoxes = [...prev];
          newBoxes[boxIdx] = { x: bnx, y: bny };
          return newBoxes;
        });
        completeStep(nx, ny);
      }
    } else {
      completeStep(nx, ny);
    }
  }, [isWon, isProcessing, blockedDir, player, levelMap, boxes, completeStep]);

  useEffect(() => {
    if (timeLeft <= 0 && !isWon) {
      resetGame();
      setStatusMsg("ЧАС ВИЧЕРПАНО! ⌛");
      setTimeout(() => setStatusMsg(null), 2000);
    }
  }, [timeLeft, isWon, resetGame]);

  useEffect(() => {
    if (!bonusClaimed) {
      const onTarget = boxes.filter((b) => levelMap[b.y][b.x] === 2).length;
      if (onTarget >= 2) {
        setBonusClaimed(true);
        setStatusMsg("БОНУС! 🎁 +30с | +1❤️");
        setTimeLeft((t) => t + 30);
        setLives((l) => Math.min(3, l + 1));
        setMoves((m) => Math.max(0, m - 10));
        setTimeout(() => setStatusMsg(null), 2000);
      }
    }
  }, [boxes, bonusClaimed, levelMap]);

  useEffect(() => {
    if (isProcessing || isWon) return;
    const possible = directions.filter(
      (d) => !isPhysicallyBlocked(player.x, player.y, d),
    );
    if (possible.length === 1 && possible[0] === blockedDir) {
      setStatusMsg("КВАНТОВИЙ СТРИБОК ⚡");
      const timer = setTimeout(() => {
        movePlayer(blockedDir, true);
        setTimeout(() => setStatusMsg(null), 1000);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [player, blockedDir, isPhysicallyBlocked, directions, isProcessing, isWon, movePlayer]);

  useEffect(() => {
    const t = setInterval(
      () => !isWon && timeLeft > 0 && setTimeLeft((prev) => prev - 1),
      1000,
    );
    return () => clearInterval(t);
  }, [isWon, timeLeft]);

  return (
    <GameWrapper $isHit={isHit}>
      <div style={{ textAlign: "center", color: "#ffb36c" }}>
        <h4 style={{ margin: 0 }}>МАГНІТНА ПАСТКА</h4>
        <small style={{ color: "#f44336" }}>
          🚫 АНОМАЛІЯ: {blockedDir.toUpperCase()}
        </small>
      </div>

      <GameBoard>
        {levelMap.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              $type={cell === 1 ? "wall" : cell === 2 ? "target" : "empty"}
            />
          )),
        )}

        <MovingObject $x={player.x} $y={player.y} style={{ zIndex: 20 }}>
          <PlayerIcon />
        </MovingObject>

        {boxes.map((b, i) => (
          <MovingObject key={`box-${i}`} $x={b.x} $y={b.y}>
            <BoxIcon $onTarget={levelMap[b.y][b.x] === 2} />
          </MovingObject>
        ))}

        {saws.map((s, i) => (
          <MovingObject key={`saw-${i}`} $x={s.x} $y={s.y} style={{ transition: 'transform 0.3s linear' }}>
            <SawIcon />
          </MovingObject>
        ))}

        {statusMsg && (
          <FloatingText $color={statusMsg.includes("⚡") ? "#00e5ff" : "#4caf50"}>
            {statusMsg}
          </FloatingText>
        )}
        
        {isWon && (
          <div style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)",
              color: "#4caf50", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "24px", zIndex: 50,
            }}>
            ПЕРЕМОГА!
          </div>
        )}
      </GameBoard>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 44px)", gap: "4px" }}>
        <div />
        <GameButton disabled={isProcessing || blockedDir === "up"} onClick={() => movePlayer("up")}>▲</GameButton>
        <div />
        <GameButton disabled={isProcessing || blockedDir === "left"} onClick={() => movePlayer("left")}>◀</GameButton>
        <GameButton disabled={isProcessing || blockedDir === "down"} onClick={() => movePlayer("down")}>▼</GameButton>
        <GameButton disabled={isProcessing || blockedDir === "right"} onClick={() => movePlayer("right")}>▶</GameButton>
      </div>

      <BottomPanel>
        <div style={{ fontSize: "11px", fontWeight: "bold" }}>
          ❤️{lives}/3 | ⏳{timeLeft}с/150с | 👣{moves}/90
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
            <h3 style={{ color: "#ffb36c", marginTop: 0 }}>Правила гри</h3>
            <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#ffb36c" }}>
              <li><b>Мета:</b> Розставити всі ящики на пунктирні цілі.</li>
              <li><b>Аномалія:</b> Один напрямок заблокований (зміна кожні 3 ходи).</li>
              <li><b>Пили:</b> Рухаються випадково кожні 3 ходи. Уникайте їх!</li>
              <li><b>Бонус:</b> 2 ящики на цілях дають +30с та +1❤️.</li>
              <li><b>Квантовий стрибок:</b> Авто-рух, якщо ви застрягли через аномалію.</li>
            </ul>
            <button onClick={() => setShowHelp(false)} style={{
                width: "100%", padding: "10px", background: "#ffb36c",
                border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer"
              }}>ЗРОЗУМІЛО</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </GameWrapper>
  );
};

export default PuzzleFour;