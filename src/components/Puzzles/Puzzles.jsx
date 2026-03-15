import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import PuzzleOne from "./PuzzleCollection/PuzzleOne";
import PuzzleTwo from "./PuzzleCollection/PuzzleTwo";
import PuzzleThree from "./PuzzleCollection/PuzzleThree";
import PuzzleFour from "./PuzzleCollection/PuzzleFour";
import PuzzleSix from "./PuzzleCollection/PuzzleSix";
import PuzzleFive from "./PuzzleCollection/PuzzleFive";
import PuzzleSeven from "./PuzzleCollection/PuzzleSeven";
import PuzzleEight from "./PuzzleCollection/PuzzleEight";

// Імпорти картинок...
import puzzl from "../../photos/vip-modal/puzzle.jpeg";
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

const PuzzlesGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const PuzzleCard = styled(motion.div)`
  cursor: pointer;
  text-align: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  border: 3px solid #ffb36c;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  ${PuzzleCard}:hover & {
    transform: scale(1.1);
  }
`;
const SearchInput = styled.input`
  display: block;
  margin: 0 auto 30px;
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #ffb36c;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  &::placeholder { color: rgba(255, 255, 255, 0.6); }
  &:focus {
    box-shadow: 0 0 15px rgba(255, 179, 108, 0.3);
    border-color: #ffb36c;
  }
`;

const LoadMoreBtn = styled.button`
  display: block;
  margin: 40px auto;
  padding: 12px 30px;
  background: transparent;
  border: 2px solid #ffb36c;
  color: #ffb36c;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover {
    background: #ffb36c;
    color: black;
  }
`;

const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Puzzles = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const puzzleData = [
    { id: 1, title: "Пазл І", img: puzzl, type: "puzzle" },
    { id: 2, title: "Пам'ять", img: pluta, type: "memory" },
    { id: 3, title: "Код", img: cod, type: "code" },
    { id: 4, title: "Лабіринт", img: laby, type: "move" },
    { id: 5, title: "Квантові цикли", img: puz, type: "rotate" },
    { id: 6, title: "Оптична лінза", img: disk, type: "lens" },
    { id: 7, title: "Лабіринт ІІ", img: labytwo, type: "line" },
    { id: 8, title: "Сапер", img: labytwo, type: "hex" },
  ];

  const filteredPuzzles = puzzleData.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedPuzzles = filteredPuzzles.slice(0, visibleCount);
  const showLoadMore = filteredPuzzles.length > visibleCount;
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const renderGame = () => {
    if (!activeGame) return null;
    switch (activeGame.type) {
      case "puzzle": return <PuzzleOne onExit={() => setActiveGame(null)} />;
      case "memory": return <PuzzleTwo onExit={() => setActiveGame(null)} />;
      case "code": return <PuzzleThree onExit={() => setActiveGame(null)} />;
      case "move": return <PuzzleFour onExit={() => setActiveGame(null)} />;
      case "rotate": return <PuzzleFive onExit={() => setActiveGame(null)} />;
      case "lens": return <PuzzleSix onExit={() => setActiveGame(null)} />;
      case "line": return <PuzzleSeven onExit={() => setActiveGame(null)} />;
      case "hex": return <PuzzleEight onExit={() => setActiveGame(null)} />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: "40px 20px", minHeight: "100vh", background: "#111" }}>
      <MainTitle>ОБЕРІТЬ ГОЛОВОЛОМКУ</MainTitle>
      
      <SearchInput
        type="text"
        placeholder="Пошук головоломки..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <PuzzlesGrid layout>
        <AnimatePresence>
          {displayedPuzzles.map((p) => (
            <PuzzleCard
              key={p.id}
              onClick={() => setActiveGame(p)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
            >
              <ImageWrapper>
                <PreviewImage src={p.img} alt={p.title} />
              </ImageWrapper>
              <h3 style={{ color: "#ffb36c", marginTop: "10px" }}>{p.title}</h3>
            </PuzzleCard>
          ))}
        </AnimatePresence>
      </PuzzlesGrid>

      {showLoadMore && (
        <LoadMoreBtn onClick={handleLoadMore}>
          ЗАВАНТАЖИТИ ЩЕ
        </LoadMoreBtn>
      )}

      {activeGame && (
        <FullscreenOverlay>
          {renderGame()}
        </FullscreenOverlay>
      )}
    </div>
  );
};

export default Puzzles;
