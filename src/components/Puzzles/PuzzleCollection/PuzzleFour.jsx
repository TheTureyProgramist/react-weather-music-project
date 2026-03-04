import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import styled, { keyframes, css } from "styled-components";

// --- Анімації ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const bonusAnim = keyframes`0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; }`;
const shake = keyframes`0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); }`;
const pulseRed = keyframes`0% { background: #1a1a1a; } 50% { background: #420000; } 100% { background: #1a1a1a; }`;

// --- Стилі ---
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: ${fadeIn} 0.5s ease-in-out;
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  transform: scale(0.85);
  ${(props) =>
    props.$isHit &&
    css`
      animation: ${shake} 0.2s ease-in-out;
    `}
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 1px;
  width: 80vw;
  max-width: 340px;
  aspect-ratio: 1 / 1;
  background: #222;
  border: 3px solid #444;
  padding: 2px;
  position: relative;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => {
    if (props.$isPortal) return "#1a237e";
    if (props.$type === "wall") return "#444";
    if (props.$isEvacPoint) {
      if (props.$isHiddenPoint && !props.$isNear && !props.$activated)
        return "#1a1a1a";
      return props.$activated ? "#00e676" : "#003366";
    }
    return "#1a1a1a";
  }};
  ${(props) =>
    props.$isActiveTarget &&
    css`
      animation: ${pulseRed} 1s infinite;
    `}
  border: ${(props) => {
    if (props.$isPortal) return "2px solid #3f51b5";
    if (props.$isActiveTarget) return "1.5px dashed #ff4444";
    if (props.$isEvacPoint) {
      if (props.$isHiddenPoint && !props.$isNear && !props.$activated)
        return "none";
      return "2px solid #00e5ff";
    }
    return "none";
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "${(props) =>
      props.$isPortal
        ? "🌀"
        : props.$isActiveTarget
          ? "⚡"
          : props.$isEvacPoint &&
              (props.$isNear || !props.$isHiddenPoint || props.$activated)
            ? "📍"
            : ""}";
    font-size: 14px;
  }
`;

const MovingObject = styled.div.attrs((props) => ({
  style: {
    transform: `translate(${props.$x * 100}%, ${props.$y * 100}%)`,
    opacity: props.$invisible
      ? props.$isNear
        ? 0.3
        : 0
      : props.$isTransparent
        ? 0.3
        : 1,
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
  transition:
    transform 0.2s ease-out,
    opacity 0.3s;
  z-index: 10;
`;

const PlayerIcon = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: #ffb36c;
  box-shadow: 0 0 15px #ffb36c;
  position: relative;
  z-index: 25;
`;

const NavArrow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: #ffb36c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
  text-shadow: 0 0 8px black;
  z-index: 30;
  ${(props) => props.$dir === "up" && "top: -135%;"}
  ${(props) => props.$dir === "down" && "bottom: -135%;"}
  ${(props) => props.$dir === "left" && "left: -135%;"}
  ${(props) => props.$dir === "right" && "right: -135%;"}
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 320px;
  background: #1a1a1a;
  border: 2px solid #ffb36c;
  padding: 20px;
  color: #eee;
  z-index: 200;
  text-align: center;
`;

const BoxIcon = styled.div`
  width: 75%;
  height: 75%;
  border-radius: 4px;
  position: relative;
  background: ${(props) => (props.$locked ? "#4caf50" : "#795548")};
  border: 2px solid ${(props) => (props.$locked ? "#1b5e20" : "#3e2723")};
  &::after {
    content: "${(props) => (props.$locked ? "🔒" : "")}";
    font-size: 10px;
    position: absolute;
  }
`;

const SawIcon = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$isOrange ? "#ff9800" : props.$safe ? "#4caf50" : "#f44336"};
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
  color: #ffb36c;
  font-weight: bold;
  font-size: 22px;
  pointer-events: none;
  animation: ${bonusAnim} 1.2s forwards;
  z-index: 100;
`;

const BottomPanel = styled.div`
  background-color: #3e2723;
  color: #ffb36c;
  border: 2px solid #ffb36c;
  padding: 8px 12px;
  width: 90vw;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const StatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
  flex: 1;
  font-size: 12px;
  font-weight: bold;
`;

const GameButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #ffb36c;
  background: transparent;
  color: #ffb36c;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    background: #ffb36c;
    color: #222;
  }
`;

const PuzzleFour = ({ onExit }) => {
  const portalA = { x: 0, y: 7 },
    portalB = { x: 7, y: 0 };
  const levelMap = useMemo(
    () => [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
    ],
    [],
  );

  const targets = useMemo(
    () => [
      { x: 6, y: 0 },
      { x: 5, y: 3 },
      { x: 4, y: 6 },
      { x: 5, y: 7 },
    ],
    [],
  );

  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState([
    { x: 4, y: 1, locked: false },
    { x: 1, y: 3, locked: false },
    { x: 3, y: 5, locked: false },
    { x: 2, y: 6, locked: false },
  ]);
  const [saws, setSaws] = useState([
    { x: 7, y: 2 },
    { x: 4, y: 3 },
    { x: 6, y: 5 },
    { x: 3, y: 7 },
  ]);
  const [portalCooldown, setPortalCooldown] = useState(0);
  const [activeTargetIdx, setActiveTargetIdx] = useState(0);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(4);
  const [timeLeft, setTimeLeft] = useState(240);
  const [bonusTime, setBonusTime] = useState(0);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isHit, setIsHit] = useState(false);
  const [evacPoints, setEvacPoints] = useState([]);
  const [isEvacuating, setIsEvacuating] = useState(false);
  const [sawsVisibleFlash, setSawsVisibleFlash] = useState(false);
  const [finalWin, setFinalWin] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  const playerRef = useRef(player);
  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  const resetGame = useCallback(() => {
    setPlayer({ x: 0, y: 0 });
    playerRef.current = { x: 0, y: 0 };
    setBoxes([
      { x: 4, y: 1, locked: false },
      { x: 1, y: 3, locked: false },
      { x: 3, y: 5, locked: false },
      { x: 2, y: 6, locked: false },
    ]);
    setSaws([
      { x: 7, y: 2 },
      { x: 4, y: 3 },
      { x: 6, y: 5 },
      { x: 3, y: 7 },
    ]);
    setActiveTargetIdx(0);
    setMoves(0);
    setLives(4);
    setTimeLeft(240);
    setPortalCooldown(0);
    setIsEvacuating(false);
    setFinalWin(false);
    setStatusMsg(null);
    setEvacPoints([]);
    setBonusTime(0);
  }, []);

  const handleHit = useCallback(() => {
    if (bonusTime > 0) return;
    setIsHit(true);
    setTimeout(() => setIsHit(false), 300);
    setLives((l) => {
      if (l <= 1) {
        alert("СИСТЕМУ ЗНИЩЕНО");
        resetGame();
        return 4;
      }
      setPlayer({ x: 0, y: 0 });
      playerRef.current = { x: 0, y: 0 };
      return l - 1;
    });
  }, [resetGame, bonusTime]);

  const moveSaws = useCallback(() => {
    // Пили іноді стоять на місці (ймовірність 30%)
    if (Math.random() < 0.3) return;

    setSaws((prevSaws) => {
      const nextSaws = prevSaws.map((saw) => {
        const dirs = [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: -1, y: 1 },
        ];
        const valid = dirs.filter((d) => {
          let nx = saw.x + d.x,
            ny = saw.y + d.y;
          if (nx <= 1 && ny <= 1) return false;
          if (nx < 0 || nx > 7 || ny < 0 || ny > 7 || levelMap[ny][nx] === 1)
            return false;
          return !boxes.some((b) => b.x === nx && b.y === ny);
        });
        const move = valid[Math.floor(Math.random() * valid.length)];
        if (!move) return saw;
        let fx = saw.x + move.x,
          fy = saw.y + move.y;
        if (fx === portalA.x && fy === portalA.y) return portalB;
        if (fx === portalB.x && fy === portalB.y) return portalA;
        return { x: fx, y: fy };
      });
      if (
        nextSaws.some(
          (s) => s.x === playerRef.current.x && s.y === playerRef.current.y,
        )
      ) {
        setTimeout(() => handleHit(), 10);
      }
      return nextSaws;
    });
  }, [boxes, levelMap, handleHit, portalA, portalB]);

  const completeStep = useCallback(
    (nx, ny, newBoxes) => {
      let finalX = nx,
        finalY = ny;
      let usedPortal = false;
      if (portalCooldown === 0) {
        if (nx === portalA.x && ny === portalA.y) {
          finalX = portalB.x;
          finalY = portalB.y;
          usedPortal = true;
        } else if (nx === portalB.x && ny === portalB.y) {
          finalX = portalA.x;
          finalY = portalA.y;
          usedPortal = true;
        }
      }
      setPlayer({ x: finalX, y: finalY });
      playerRef.current = { x: finalX, y: finalY };
      if (usedPortal) setPortalCooldown(6);
      setPortalCooldown((prev) => Math.max(0, prev - 1));

      if (isEvacuating) {
        const atEvac = evacPoints.findIndex(
          (p) => p.x === finalX && p.y === finalY && !p.active,
        );
        if (atEvac !== -1) {
          const updated = [...evacPoints];
          updated[atEvac].active = true;
          setEvacPoints(updated);
          setSawsVisibleFlash(true);
          setTimeout(() => setSawsVisibleFlash(false), 400);
          if (updated.every((p) => p.active)) {
            setFinalWin(true);
            setStatusMsg("WIN!");
          }
        }
      }

      const boxIdx = newBoxes.findIndex(
        (b) =>
          b.x === targets[activeTargetIdx].x &&
          b.y === targets[activeTargetIdx].y &&
          !b.locked,
      );
      if (boxIdx !== -1 && !isEvacuating) {
        const updated = [...newBoxes];
        updated[boxIdx].locked = true;
        setBoxes(updated);
        const lockedCount = updated.filter((b) => b.locked).length;

        if (lockedCount <= 2) {
          setLives((l) => Math.min(4, l + 1));
          setTimeLeft((t) => t + 10);
          setMoves((m) => Math.max(0, m - 20));
          setStatusMsg("BONUS!");
          setTimeout(() => setStatusMsg(null), 1200);
        }

        if (lockedCount === 4) {
          // Бонус після 4-го ящика: 8 секунд безпеки
          setBonusTime(8);
          setIsEvacuating(true);
          // 8 контрольних точок (2 видимі, 6 прихованих)
          setEvacPoints([
            { x: 1, y: 1, active: false, hidden: false },
            { x: 6, y: 6, active: false, hidden: false },
            { x: 6, y: 1, active: false, hidden: true },
            { x: 1, y: 6, active: false, hidden: true },
            { x: 3, y: 4, active: false, hidden: true },
            { x: 4, y: 3, active: false, hidden: true },
            { x: 0, y: 4, active: false, hidden: true },
            { x: 7, y: 3, active: false, hidden: true },
          ]);
        } else setActiveTargetIdx((prev) => (prev + 1) % targets.length);
      }
      setMoves((m) => {
        if (m >= 99) {
          alert("ЕНЕРГІЯ 0%");
          resetGame();
          return 0;
        }
        return m + 1;
      });
      moveSaws();
    },
    [
      portalCooldown,
      isEvacuating,
      evacPoints,
      targets,
      activeTargetIdx,
      moveSaws,
      resetGame,
      portalA,
      portalB,
    ],
  );

  const canMove = useCallback(
    (dir) => {
      const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
      const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
      const nx = player.x + dx,
        ny = player.y + dy;
      if (nx < 0 || nx > 7 || ny < 0 || ny > 7 || levelMap[ny][nx] === 1)
        return false;
      const boxIdx = boxes.findIndex((b) => b.x === nx && b.y === ny);
      if (boxIdx !== -1) {
        if (boxes[boxIdx].locked) return false;
        const bnx = nx + dx,
          bny = ny + dy;
        if (
          bnx < 0 ||
          bnx > 7 ||
          bny < 0 ||
          bny > 7 ||
          levelMap[bny][bnx] === 1 ||
          boxes.some((b) => b.x === bnx && b.y === bny)
        )
          return false;
      }
      return true;
    },
    [player, levelMap, boxes],
  );

  const moveAction = useCallback(
    (dir) => {
      if (finalWin || showHelp) return;
      if (!canMove(dir)) return;
      const dx = dir === "left" ? -1 : dir === "right" ? 1 : 0;
      const dy = dir === "up" ? -1 : dir === "down" ? 1 : 0;
      const nx = player.x + dx,
        ny = player.y + dy;
      if (saws.some((s) => s.x === nx && s.y === ny)) {
        handleHit();
        return;
      }
      const boxIdx = boxes.findIndex((b) => b.x === nx && b.y === ny);
      if (boxIdx !== -1) {
        const bnx = nx + dx,
          bny = ny + dy;
        const nextBoxes = [...boxes];
        nextBoxes[boxIdx] = { ...nextBoxes[boxIdx], x: bnx, y: bny };
        setBoxes(nextBoxes);
        completeStep(nx, ny, nextBoxes);
      } else completeStep(nx, ny, boxes);
    },
    [finalWin, showHelp, canMove, player, boxes, saws, handleHit, completeStep],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") moveAction("up");
      if (e.key === "ArrowDown") moveAction("down");
      if (e.key === "ArrowLeft") moveAction("left");
      if (e.key === "ArrowRight") moveAction("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moveAction]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!showHelp && !finalWin) {
        setTimeLeft((p) => {
          if (p <= 1) {
            alert("ЧАС ВИЙШОВ");
            resetGame();
            return 240;
          }
          return p - 1;
        });
      }
      if (bonusTime > 0) setBonusTime((p) => p - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [resetGame, bonusTime, showHelp, finalWin]);

  return (
    <GameWrapper $isHit={isHit}>
      <h4 style={{ margin: 0, color: "#ffb36c" }}>
        {isEvacuating ? "ФАЗА РАДАРУ" : "ЗБІР МОДУЛІВ"}
      </h4>
      <GameBoard>
        {levelMap.map((row, y) =>
          row.map((cell, x) => {
            const evac = evacPoints.find((p) => p.x === x && p.y === y);
            const dist = Math.sqrt(
              Math.pow(x - player.x, 2) + Math.pow(y - player.y, 2),
            );
            return (
              <Cell
                key={`${x}-${y}`}
                $type={cell === 1 ? "wall" : "empty"}
                $isPortal={
                  (x === portalA.x && y === portalA.y) ||
                  (x === portalB.x && y === portalB.y)
                }
                $isActiveTarget={
                  !isEvacuating &&
                  targets[activeTargetIdx].x === x &&
                  targets[activeTargetIdx].y === y
                }
                $isEvacPoint={!!evac}
                $activated={evac?.active}
                $isHiddenPoint={evac?.hidden}
                $isNear={dist < 1.6}
              />
            );
          }),
        )}
        <MovingObject $x={player.x} $y={player.y} style={{ zIndex: 25 }}>
          <PlayerIcon>
            {!finalWin && !showHelp && (
              <>
                {canMove("up") && (
                  <NavArrow $dir="up" onClick={() => moveAction("up")}>
                    ▲
                  </NavArrow>
                )}
                {canMove("down") && (
                  <NavArrow $dir="down" onClick={() => moveAction("down")}>
                    ▼
                  </NavArrow>
                )}
                {canMove("left") && (
                  <NavArrow $dir="left" onClick={() => moveAction("left")}>
                    ◀
                  </NavArrow>
                )}
                {canMove("right") && (
                  <NavArrow $dir="right" onClick={() => moveAction("right")}>
                    ▶
                  </NavArrow>
                )}
              </>
            )}
          </PlayerIcon>
        </MovingObject>
        {boxes.map((b, i) => (
          <MovingObject
            key={`b-${i}`}
            $x={b.x}
            $y={b.y}
            $invisible={isEvacuating}
            $isNear={
              Math.sqrt(
                Math.pow(b.x - player.x, 2) + Math.pow(b.y - player.y, 2),
              ) < 1.6
            }
          >
            <BoxIcon $locked={b.locked} />
          </MovingObject>
        ))}

        {saws.map((s, i) => {
          const isTransparent = bonusTime > 0;
          const isInvisible =
            isEvacuating && !sawsVisibleFlash && bonusTime <= 0;
          return (
            <MovingObject
              key={`s-${i}`}
              $x={s.x}
              $y={s.y}
              $invisible={isInvisible}
              $isTransparent={isTransparent}
              $isNear={
                Math.sqrt(
                  Math.pow(s.x - player.x, 2) + Math.pow(s.y - player.y, 2),
                ) < 1.6
              }
            >
              <SawIcon
                $safe={bonusTime > 0}
                $isOrange={bonusTime > 0 && bonusTime <= 2}
              />
            </MovingObject>
          );
        })}

        {statusMsg && (
          <FloatingText key={statusMsg + moves}>{statusMsg}</FloatingText>
        )}
        {showHelp && (
          <Modal>
            <h3>Рішення головоломки</h3>
            <p style={{ fontSize: "11px", textAlign: "left" }}>
               <b>Рух</b>: По горизонталі та діагоналі. Карта: 8х8.<br/>
               <b>Пили</b>: Забирають 1життя, після вашого руху їхній рух у випадковому напрямку! Можуть по діагоналі, вертикалі, горизонталі або не переміститися. 4шт.<br/>
              <b>БОНУС</b>: Ящики: +життя, +10с, -20 ходів! При втановлені блоку у потрібне місце.
              <br /><b>Фаза 2</b>: Коли ви встановите всі ящики на місце, пили стануть безпечними(зеленими, щоправда блокуватимуть вам шлях) на 8с(в останні 2с оранжеві), після цього вони забиратимуть 2 життя у вас! Та ще й будуть невидимими, вони видимі лише на відстані 1блок!
              <br /><b>Як вижити в ІІетапі?</b> Є 8 точок (6 прихованих). Знайдіть для перемоги. При наступанні на неї пили видимі 1с.
              • <b>Портал:</b> Має дуже малу перезарядку! Пили проходять без обмежень!
            </p>
            <GameButton
              style={{ width: "auto", padding: "0 20px", marginTop: "10px" }}
              onClick={() => setShowHelp(false)}
            >
              ПОЧАТИ
            </GameButton>
          </Modal>
        )}
      </GameBoard>
      <BottomPanel>
        <StatsGrid>
          <span>❤️ {lives}/4</span>
          <span>
            ⏳ {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
          <span>👣 {moves}/100</span>
          <span style={{ color: "#3f51b5" }}>
            🌀 {portalCooldown > 0 ? portalCooldown : "OK"}
          </span>
          {bonusTime > 0 && (
            <span style={{ color: "#4caf50" }}>🛡️ {bonusTime}s</span>
          )}
        </StatsGrid>
        <div style={{ display: "flex", gap: "5px" }}>
          <GameButton onClick={() => setShowHelp(true)}>?</GameButton>
          <GameButton onClick={resetGame}>⏭</GameButton>
          <GameButton onClick={onExit} style={{ color: "#f44336" }}>
            ✖
          </GameButton>
        </div>
      </BottomPanel>
    </GameWrapper>
  );
};

export default PuzzleFour;
