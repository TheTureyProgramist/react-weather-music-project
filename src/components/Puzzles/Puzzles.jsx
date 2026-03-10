import React, { useState } from "react";
import styled from "styled-components";
import PuzzleOne from "./PuzzleCollection/PuzzleOne";
import puzzl from "../../photos/vip-modal/puzzle.jpeg";
import PuzzleTwo from "./PuzzleCollection/PuzzleTwo";
import PuzzleThree from "./PuzzleCollection/PuzzleThree";
import PuzzleFour from "./PuzzleCollection/PuzzleFour";
import PuzzleSix from "./PuzzleCollection/PuzzleSix";
import PuzzleFive from "./PuzzleCollection/PuzzleFive";
import PuzzleSeven from "./PuzzleCollection/PuzzleSeven";
import PuzzleEight from "./PuzzleCollection/PuzzleEight";
import pluta from "../../photos/vip-modal/brain.jpeg";
import cod from "../../photos/vip-modal/cod.jpeg";
import laby from "../../photos/vip-modal/laby.jpeg";
import labytwo from "../../photos/vip-modal/labytwo.jpeg";
import puz from "../../photos/vip-modal/puz.jpeg";
import disk from "../../photos/vip-modal/disk.jpeg";
const MainTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  color: white;
  margin-bottom: 30px;
  font-family: "Montserrat", sans-serif;
`;

const PuzzlesGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const PuzzleCard = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  text-align: center;
  &:hover {
    transform: translateY(-10px);
  }
`;

const PreviewImage = styled.img`
  width: 320px;
  height: 200px;
  border-radius: 12px;
  border: 3px solid #ffb36c;
`;
const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Puzzles = () => {
  const [activeGame, setActiveGame] = useState(null);

  const puzzleData = [
    { id: 1, title: "Галерея 1", img: puzzl, type: "puzzle" },
    { id: 2, title: "Пам'ять", img: pluta, type: "memory" },
    { id: 3, title: "Код", img: cod, type: "code" },
    { id: 4, title: "Лабіринт", img: laby, type: "move" },
    { id: 5, title: "Квантові цикли", img: puz, type: "rotate" },
    { id: 6, title: "Оптична лінза", img: disk, type: "lens" },
    { id: 7, title: "Лабіринт ІІ", img: labytwo, type: "line" },
    { id: 8, title: "Сапер", img: labytwo, type: "hex" },
  ];

  const renderGame = () => {
    if (!activeGame) return null;

    switch (activeGame.type) {
      case "puzzle":
        return (
          <PuzzleOne
            imageUrl={activeGame.img}
            onExit={() => setActiveGame(null)}
          />
        );
      case "memory":
        return <PuzzleTwo onExit={() => setActiveGame(null)} />;
      case "code":
        return <PuzzleThree onExit={() => setActiveGame(null)} />;
      case "move":
        return <PuzzleFour onExit={() => setActiveGame(null)} />;
      case "rotate":
        return <PuzzleFive onExit={() => setActiveGame(null)} />;
      case "lens":
        return (
          <PuzzleSix
            imageUrl={activeGame.img}
            onExit={() => setActiveGame(null)}
          />
        );
      case "line":
        return <PuzzleSeven onExit={() => setActiveGame(null)} />;
        case "hex":
         return <PuzzleEight onExit={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };
  return (
    <div style={{ padding: "40px 20px" }}>
      <MainTitle>ОБЕРІТЬ ГОЛОВОЛОМКУ</MainTitle>
      <PuzzlesGrid>
        {puzzleData.map((p) => (
          <PuzzleCard key={p.id} onClick={() => setActiveGame(p)}>
            <PreviewImage src={p.img} alt={p.title} />
          </PuzzleCard>
        ))}
      </PuzzlesGrid>
      {activeGame && <FullscreenOverlay>{renderGame()}</FullscreenOverlay>}
    </div>
  );
};
export default Puzzles;
