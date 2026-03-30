import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import decor from "../../../photos/fan-art/modaldecor.webp";
//desert
import desert from "../../../photos/vip-images/desert/vip-desert.webp";
// import soloveyko from "../../../photos/vip-images/vip-soloveyko.webp";
// import desert from "../../../photos/vip-images/vip-desert.webp";
// import harmony from "../../../photos/vip-images/asium/asium.webp";
 import horse from "../../../photos/vip-images/horse/horse.webp";
// import theorytwo from "../../../photos/fan-art/theorytwo.webp";

 import unity from "../../../photos/fan-art/unity.webp";
import mecha from "../../../photos/vip-images/mechannic.webp";
import monody from "../../../photos/fan-art/monody.webp";
import christmas from "../../../photos/vip-images/christmas.webp";
//import clubstep from "../../../photos/fan-art/clubstep.webp";
import turkeys from "../../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
// //Horses
 import horsethree from "../../../photos/vip-images/horse/horsethree.webp";
 import horsetwo from "../../../photos/vip-images/horse/horsetwo.webp";
 import chess from "../../../photos/vip-images/horse/chess.webp";
//Turkeys
import turkeytwo from "../../../photos/vip-images/turkeys/turkeytwo.webp";
import turkeythree from "../../../photos/vip-images/turkeys/turkeysthree.webp";
import turkeyfour from "../../../photos/vip-images/turkeys/turkeysfour.webp";
import turkeyfive from "../../../photos/vip-images/turkeys/turkeysfive.webp";
import turkeysix from "../../../photos/vip-images/turkeys/turkeyssix.webp";
import turkeysone from "../../../photos/vip-images/turkeys/turkeysone.webp";
import turkeyseven from "../../../photos/vip-images/turkeys/turkeysseven.webp";
//Asium
import asiumnine from "../../../photos/vip-images/asium/vip-forest.webp";
import asiumone from "../../../photos/vip-images/asium/asiumone.webp";
import asiumtwo from "../../../photos/vip-images/asium/asiuntwo.webp";
import asiumthree from "../../../photos/vip-images/asium/asiumthree.webp";
import asiumfour from "../../../photos/vip-images/asium/asiumfour.webp";
import asiumfive from "../../../photos/vip-images/asium/asiumfive.webp";
import asiumsix from "../../../photos/vip-images/asium/asiumsix.webp";
import asiumseven from "../../../photos/vip-images/asium/asiumseven.webp";
//Swamp
import swamptwo from "../../../photos/vip-images/swamp/swamptwo.webp";
import swampthree from "../../../photos/vip-images/swamp/swampthree.webp";
import swampfour from "../../../photos/vip-images/swamp/swampfour.webp";
import swampfive from "../../../photos/vip-images/swamp/swampfive.webp";
import swampsix from "../../../photos/vip-images/swamp/swampsix.webp";
import swampseven from "../../../photos/vip-images/swamp/seampseven.webp";
import swampeight from "../../../photos/vip-images/swamp/swampeight.webp";
import swampnine from "../../../photos/vip-images/swamp/swampnine.webp";
import theory from "../../../photos/fan-art/theory.webp";
import deadlocked from "../../../photos/vip-images/swamp/deadlocked.webp";
//Horror
import horrortwo from "../../../photos/vip-images/horror/horrortwo.webp";
import horrorthree from "../../../photos/vip-images/horror/horrorthree.webp";
import horrorfour from "../../../photos/vip-images/horror/horrorfour.webp";
import horrorfive from "../../../photos/vip-images/horror/horrorfive.webp";
import horror from "../../../photos/vip-images/horror/horror.webp";
import horrorsix from "../../../photos/vip-images/horror/horrorsix.webp";
import horrorseven from "../../../photos/vip-images/horror/horrorseven.webp";
import horroreight from "../../../photos/vip-images/horror/horroreight.webp";
//Динофроз
import dinofrozone from "../../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofroztwo from "../../../photos/vip-images/dinofroz/vip-dragons.webp";
//Mia and me
import mia from "../../../photos/vip-images/mia/miaandme.webp";
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const Im = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
const heartPop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4) rotate(-15deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const HeartButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: ${(props) => (props.$isFavorite ? "#ff5252" : "white")};
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.7);
  }
  &.popping {
    animation: ${heartPop} 0.3s ease-out;
  }
`;
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRev = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const boardFadeIn = keyframes`
  from { opacity: 0.4; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
  color: #ffb36c;
  font-family: var(--font-family);
`;

const ProgressBar = styled.div`
  width: 250px;
  height: 8px;
  background: #333;
  border: 1px solid #ffb36c;
  border-radius: 4px;
  margin-top: 15px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #ffb36c;
  width: ${(props) => props.$percent}%;
  transition: width 0.2s;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(255, 179, 108, 0.3);

  input {
    width: 80px;
    accent-color: #ffb36c;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    min-width: 20px;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-image:
  //   linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${decor});
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
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
  grid-template-columns: repeat(${(props) => props.$cols}, 1fr);
  grid-template-rows: repeat(${(props) => props.$rows}, 1fr);
  gap: 2px;
  height: 60vh;
  max-height: 500px;
  aspect-ratio: 3 / 2;
  background: #222;
  border: 4px solid #444;
  padding: 2px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${boardFadeIn} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const TileContent = styled.div`
  width: ${(props) => props.$cols * 100}%;
  height: ${(props) => props.$rows * 100}%;
  position: absolute;
  top: ${(props) => -props.$row * 100}%;
  left: ${(props) => -props.$col * 100}%;
  background-image: ${(props) => `url("${props.$image}")`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;
`;

const Tile = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: ${(props) => (props.$isCorrect ? "default" : "pointer")};
  filter: ${(props) =>
    props.$isSelected
      ? "brightness(1.4) contrast(1.2)"
      : props.$isCorrect
        ? "none"
        : "brightness(0.7) grayscale(0.3)"};
  border: ${(props) =>
    props.$isSelected
      ? "2px solid #ffb36c"
      : "1px solid rgba(255,255,255,0.05)"};
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
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

  &:hover {
    background: rgba(255, 179, 108, 0.1);
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GearContainer = styled(GameButton)`
  position: relative;
  overflow: hidden;
  .g {
    position: absolute;
    font-size: 16px;
    transition: 0.3s;
  }
  .g1 {
    top: 4px;
    left: 14px;
  }
  .g2 {
    bottom: 6px;
    left: 6px;
  }
  .g3 {
    bottom: 6px;
    right: 6px;
  }

  &:hover .g1 {
    animation: ${rotate} 3s linear infinite;
  }
  &:hover .g2 {
    animation: ${rotateRev} 3s linear infinite;
  }
  &:hover .g3 {
    animation: ${rotate} 3s linear infinite;
  }
`;
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
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
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
`;
const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 3px;
  }
`;

const ThemeItem = styled.div`
  cursor: pointer;
  border: 3px solid ${(props) => (props.$isActive ? "#4caf50" : "transparent")};
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3/2;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  &:hover {
    border-color: #ffb36c;
    transform: scale(1.02);
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 15px;
`;

const CategoryCard = styled.div`
  cursor: pointer;
  border: 2px solid #ffb36c;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/2;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
    border-color: white;
  }
`;

const CategoryLabel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PuzzleOne = ({ onExit }) => {
  const puzzleImages = useMemo(
    () => [
      {
        image: dinofrozone,
        audio: require("../../../mp3/dinofroz.mp3"),
        category: "dinofroz",
      },
      {
        image: dinofroztwo,
        audio: require("../../../mp3/dinofroz.mp3"),
        category: "dinofroz",
      },
      {
        image: monody,
        audio: require("../../../mp3/thefatrat-monody.mp3"),
        category: "other",
      },
      {
        image: asiumone,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumtwo,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumthree,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumfour,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumnine,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumfive,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumsix,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: asiumseven,
        audio: require("../../../mp3/harmonic-japan.mp3"),
        category: "other",
      },
      {
        image: mecha,
        audio: require("../../../mp3/mechanik-kindom.mp3"),
        category: "other",
      },
      {
        image: christmas,
        audio: require("../../../mp3/kolada.mp3"),
        category: "other",
      },
      {
        image: turkeysone,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeytwo,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeythree,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeyfour,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeyfive,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeysix,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeyseven,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeys,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: turkeysone,
        audio: require("../../../mp3/turkeys.mp3"),
        category: "turkeys",
      },
      {
        image: monody,
        audio: require("../../../mp3/thefatrat-monody.mp3"),
        category: "other",
      },
      {
        image: desert,
        audio: require("../../../mp3/wind.mp3"),
        category: "desert",
      },
      {
        image: horse,
        audio: require("../../../mp3/horse.mp3"),
        category: "horses",
      },
            {
        image: horsetwo,
        audio: require("../../../mp3/horse.mp3"),
        category: "horses",
      },
            {
        image: horsethree,
        audio: require("../../../mp3/horse.mp3"),
        category: "horses",
      },
            {
        image: chess,
        audio: require("../../../mp3/horse.mp3"),
        category: "horses",
      },
      {
        image: require("../../../photos/vip-images/dinofroz/vip-dragons.jpg"),
        audio: require("../../../mp3/dragon.mp3"),
        category: "dinofroz",
      },
      {
        image: require("../../../photos/vip-images/vip-soloveyko.jpg"),
        audio: require("../../../mp3/soloveyko.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/mechanik-kindom.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/zootopia.mp3"),
        category: "other",
      },
      {
        image: mia,
        audio: require("../../../mp3/mia-and-me.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/electrodynamix.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/fan-art/clubstep.jpg"),
        audio: require("../../../mp3/clubstep.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/vip-images/mechannic.jpg"),
        audio: require("../../../mp3/fingerdash.mp3"),
        category: "other",
      },
      {
        image: require("../../../photos/fan-art/theorytwo.jpg"),
        audio: require("../../../mp3/theoty-of-everything-ll.mp3"),
        category: "other",
      },
      {
        image: horror,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrortwo,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrorthree,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrorfour,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrorfive,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrorsix,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horrorseven,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: horroreight,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: deadlocked,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampnine,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swamptwo,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampthree,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampfour,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampfive,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampsix,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampseven,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampeight,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: swampnine,
        audio: require("../../../mp3/deadlocked.mp3"),
        category: "swamp_horror",
      },
      {
        image: theory,
        audio: require("../../../mp3/theory-of-everyting.mp3"),
        category: "other",
      },
      {
        image: unity,
        audio: require("../../../mp3/unity.mp3"),
        category: "other",
      },
    ],
    [],
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [config, setConfig] = useState({
    cols: 6,
    rows: 4,
    maxMoves: 150,
    maxTime: 180,
    rotationChance: 0.35,
    label: "Нормальна",
  });

  const [tiles, setTiles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.maxTime);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("puzzle_one_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const audioRef = useRef(null);
  const previewAudioRef = useRef(new Audio());
  const previewTimeoutRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("puzzle_one_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, imageSrc) => {
    e.stopPropagation();
    const button = e.currentTarget;
    button.classList.add("popping");
    setTimeout(() => {
      if (button) {
        button.classList.remove("popping");
      }
    }, 300);
    setFavorites((prev) => {
      if (prev.includes(imageSrc)) {
        return prev.filter((fav) => fav !== imageSrc);
      } else {
        return [...prev, imageSrc];
      }
    });
  };

  const sortedPuzzleImages = useMemo(() => {
    return [...puzzleImages].sort((a, b) => {
      const aIsFavorite = favorites.includes(a.image);
      const bIsFavorite = favorites.includes(b.image);
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      const aIndex = puzzleImages.findIndex((p) => p.image === a.image);
      const bIndex = puzzleImages.findIndex((p) => p.image === b.image);
      return aIndex - bIndex;
    });
  }, [puzzleImages, favorites]);

  const handleThemeHover = (audioSrc) => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);

    previewAudioRef.current.src = audioSrc;
    previewAudioRef.current.volume = volume;
    previewAudioRef.current.currentTime = 0;
    previewAudioRef.current.play().catch(() => {});

    previewTimeoutRef.current = setTimeout(() => {
      let vol = previewAudioRef.current.volume;
      const stepTime = 100;
      const steps = 3000 / stepTime;
      const volStep = vol / steps;

      fadeIntervalRef.current = setInterval(() => {
        if (previewAudioRef.current.volume > volStep) {
          previewAudioRef.current.volume -= volStep;
        } else {
          previewAudioRef.current.volume = 0;
          previewAudioRef.current.pause();
          clearInterval(fadeIntervalRef.current);
        }
      }, stepTime);
    }, 12000);
  };

  const handleThemeLeave = (resumeMain = true) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);

    previewAudioRef.current.pause();
    previewAudioRef.current.currentTime = 0;
    previewAudioRef.current.volume = volume;

    if (resumeMain && audioRef.current && volume > 0 && !isWon) {
      audioRef.current.play().catch(() => {});
    }
  };

  // On mount and unmount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    const audioEl = audioRef.current;
    return () => {
      audioEl.pause();
    };
  }, []);

  // On media change - with Loading Logic
  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      setLoadProgress(0);

      const currentItem = puzzleImages[currentMediaIndex];

      // Load Audio
      if (audioRef.current) {
        audioRef.current.src = currentItem.audio;
        audioRef.current.load();
      }

      // Load Image
      const img = new Image();
      img.src = currentItem.image;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // proceed anyway
      });
      setLoadProgress(100);

      setIsLoading(false);

      // Try playing audio after load
      audioRef.current.play().catch(() => {});
    };

    loadMedia();
  }, [currentMediaIndex, puzzleImages]);

  // On volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const initGame = useCallback(() => {
    const total = config.cols * config.rows;
    const rotations = [90, 180, 270];
    const initial = Array.from({ length: total }, (_, i) => ({
      id: i,
      rotation:
        Math.random() < config.rotationChance
          ? rotations[Math.floor(Math.random() * rotations.length)]
          : 0,
    }));
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
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!isWon && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      alert("Час вичерпано!");
      initGame();
    }
  }, [timeLeft, isWon, initGame]);

  const checkAutoRestart = useCallback(
    (currentTiles, currentMoves) => {
      const incorrectCount = currentTiles.reduce(
        (acc, tile, idx) => (tile.id !== idx ? acc + 1 : acc),
        0,
      );
      const movesLeft = config.maxMoves - currentMoves;

      if (incorrectCount > movesLeft && !isWon) {
        alert("Недостатньо ходів для завершення! Перезапуск...");
        initGame();
        return true;
      }
      return false;
    },
    [config.maxMoves, isWon, initGame],
  );

  const handleTileClick = (index) => {
    if (isWon) return;
    if (selectedIdx === null) {
      if (tiles[index].id === index) return;
      setSelectedIdx(index);
    } else {
      if (selectedIdx === index) {
        setSelectedIdx(null);
        return;
      }
      const newTiles = [...tiles];
      const idx1 = selectedIdx;
      const idx2 = index;

      // 1. Swap
      [newTiles[idx1], newTiles[idx2]] = [newTiles[idx2], newTiles[idx1]];

      // 2. Chaos Shuffle (except swapped & correct ones)
      const lockedIndices = new Set([idx1, idx2]);
      newTiles.forEach((t, i) => {
        if (t.id === i) lockedIndices.add(i);
      });

      const indicesToShuffle = [];
      const tilesToShuffle = [];
      newTiles.forEach((t, i) => {
        if (!lockedIndices.has(i)) {
          indicesToShuffle.push(i);
          tilesToShuffle.push(t);
        }
      });

      if (tilesToShuffle.length > 0) {
        for (let i = tilesToShuffle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tilesToShuffle[i], tilesToShuffle[j]] = [
            tilesToShuffle[j],
            tilesToShuffle[i],
          ];
        }
        indicesToShuffle.forEach((pos, i) => {
          newTiles[pos] = tilesToShuffle[i];
        });
      }

      // 3. Fix rotation if tile is in correct place
      const updatedTiles = newTiles.map((t, i) =>
        t.id === i ? { ...t, rotation: 0 } : t,
      );

      const newMoves = moves + 1;
      setTiles(updatedTiles);
      setMoves(newMoves);
      setSelectedIdx(null);

      if (updatedTiles.every((t, i) => t.id === i)) {
        setIsWon(true);
      } else if (newMoves >= config.maxMoves) {
        alert("Ходи закінчились!");
        initGame();
      } else {
        checkAutoRestart(updatedTiles, newMoves);
      }
    }
  };
  const setDifficulty = (type, customParams = null) => {
    let newConfig;
    if (customParams) {
      newConfig = { ...customParams, label: "Власна" };
    } else {
      const presets = {
        easy: {
          cols: 5,
          rows: 3,
          maxMoves: 200,
          maxTime: 240,
          rotationChance: 0,
          label: "Легка",
        },
        normal: {
          cols: 6,
          rows: 4,
          maxMoves: 150,
          maxTime: 180,
          rotationChance: 0.35,
          label: "Нормальна",
        },
        hard: {
          cols: 8,
          rows: 5,
          maxMoves: 100,
          maxTime: 120,
          rotationChance: 0.6,
          label: "Екстремальна",
        },
      };
      newConfig = presets[type];
    }

    setConfig(newConfig);
    setShowSettings(false);
    setSelectedIdx(null); // Важливо: скидаємо вибір при зміні сітки
  };

  const handleSelectTheme = (selectedItem) => {
    handleThemeLeave(false);
    const originalIndex = puzzleImages.findIndex(
      (p) => p.image === selectedItem.image,
    );
    if (originalIndex !== -1) {
      setCurrentMediaIndex(originalIndex);
    }
    setShowThemeModal(false);
    setSelectedCategory(null);
    setTimeout(() => initGame(), 100);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const CATEGORIES = useMemo(() => [
    { id: "dinofroz", label: "Динофроз", icon: dinofrozone },
    { id: "horses", label: "Коні", icon: horse },
    { id: "desert", label: "Пустеля", icon: desert },
    { id: "turkeys", label: "Індики", icon: turkeys },
    { id: "swamp_horror", label: "Болото і Хоррор", icon: deadlocked },
    { id: "other", label: "Інше", icon: mecha },
  ], []);

  const currentMedia = puzzleImages[currentMediaIndex];

  return (
    <GameWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowSettings(false)}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${decor})`,
      }}
    >
      {isLoading && (
        <LoadingOverlay>
          <div>Завантаження медіа... {loadProgress}%</div>
          <ProgressBar>
            <ProgressFill $percent={loadProgress} />
          </ProgressBar>
        </LoadingOverlay>
      )}
      <Board $cols={config.cols} $rows={config.rows} key={currentMediaIndex}>
        {tiles.map((tile, index) => {
          const row = Math.floor(tile.id / config.cols);
          const col = tile.id % config.cols;

          return (
            <Tile
              key={tile.id}
              layout
              animate={{ rotate: tile.rotation }}
              $cols={config.cols}
              $rows={config.rows}
              $isCorrect={tile.id === index}
              $isSelected={selectedIdx === index}
              onClick={() => handleTileClick(index)}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <TileContent
                $cols={config.cols}
                $rows={config.rows}
                $col={col}
                $row={row}
                $image={currentMedia.image}
              />
            </Tile>
          );
        })}
      </Board>
      <div style={{ height: "30px" }}>
        {isWon && <h2 style={{ color: "#4caf50", margin: 0 }}>Перемога! 🏆</h2>}
      </div>

      <BottomPanel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "13px",
            lineHeight: "1.4",
          }}
        >
          <span>
            <strong>Рівень:</strong> {config.label} ({config.cols}x{config.rows}
            )
          </span>
          <span>
            <strong>Час:</strong>{" "}
            <span style={{ color: timeLeft < 30 ? "#ff5252" : "#ffb36c" }}>
              {formatTime(timeLeft)}
            </span>{" "}
            | <strong>Ходи:</strong> {moves}/{config.maxMoves}
          </span>
        </div>

        <Controls>
          <VolumeControl title="Гучність музики">
            <span>{volume === 0 ? "🔇" : "🎵"}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </VolumeControl>
          <GearContainer
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings(true);
            }}
            title="Налаштування"
          >
            <span className="g g1">⚙</span>
            <span className="g g2">⚙</span>
            <span className="g g3">⚙</span>
          </GearContainer>
          <GameButton onClick={initGame} title="Перезапустити">
            ⏭
          </GameButton>
          <GameButton
            onClick={() => { setSelectedCategory(null); setShowThemeModal(true); }}
            style={{ width: "auto", padding: "0 20px", borderRadius: "5px" }}
          >
            Стиль гри
          </GameButton>
          <GameButton onClick={onExit} title="Вийти">
            ✖
          </GameButton>
        </Controls>
      </BottomPanel>
      <AnimatePresence>
        {showSettings && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <Modal onClick={(e) => e.stopPropagation()}>
              <h3
                style={{ margin: "0", color: "#ffb36c", textAlign: "center" }}
              >
                Налаштування
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <DifficultyBtn onClick={() => setDifficulty("easy")}>
                  Легка (5x3, 0% оберту)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("normal")}>
                  Нормальна (6x4, 35% оберту)
                </DifficultyBtn>
                <DifficultyBtn onClick={() => setDifficulty("hard")}>
                  Екстремальна (8x5, 60% оберту)
                </DifficultyBtn>
              </div>

              <hr
                style={{
                  borderColor: "#ffb36c",
                  width: "100%",
                  margin: "5px 0",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#ffb36c",
                }}
              >
                Власні параметри:
              </span>

              <CustomRow>
                <span>Стовпці: {config.cols}</span>
                <input
                  type="range"
                  min="5"
                  max="8"
                  value={config.cols}
                  onChange={(e) =>
                    setConfig({ ...config, cols: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <CustomRow>
                <span>Ряди: {config.rows}</span>
                <input
                  type="range"
                  min="3"
                  max="5"
                  value={config.rows}
                  onChange={(e) =>
                    setConfig({ ...config, rows: parseInt(e.target.value) })
                  }
                />
              </CustomRow>
              <CustomRow>
                <span>
                  Шанс повороту: {Math.round(config.rotationChance * 100)}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.rotationChance}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      rotationChance: parseFloat(e.target.value),
                    })
                  }
                />
              </CustomRow>
              <CustomRow>
                <span>Макс. ходів: {config.maxMoves}</span>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={config.maxMoves}
                  onChange={(e) =>
                    setConfig({ ...config, maxMoves: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <CustomRow>
                <span>Час: {formatTime(config.maxTime)}</span>
                <input
                  type="range"
                  min="60"
                  max="600"
                  step="10"
                  value={config.maxTime}
                  onChange={(e) =>
                    setConfig({ ...config, maxTime: parseInt(e.target.value) })
                  }
                />
              </CustomRow>

              <DifficultyBtn
                onClick={() => setDifficulty("custom", config)}
                style={{ background: "#4e342e", marginTop: "10px" }}
              >
                Застосувати власні
              </DifficultyBtn>

              <DifficultyBtn
                onClick={() => setShowSettings(false)}
                style={{ background: "#1b110f" }}
              >
                Закрити
              </DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
        {showThemeModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowThemeModal(false)}
          >
            <Modal
              onClick={(e) => e.stopPropagation()}
              style={{ width: "800px", maxWidth: "95vw" }}
            >
              <h3
                style={{ margin: "0", color: "#ffb36c", textAlign: "center" }}
              >
                {selectedCategory ? `Тема: ${CATEGORIES.find(c => c.id === selectedCategory)?.label}` : "Оберіть тематику"}
              </h3>
              {!selectedCategory ? (
                <CategoryGrid>
                  {CATEGORIES.map((cat) => (
                    <CategoryCard key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
                      <Im src={cat.icon} alt={cat.label} />
                      <CategoryLabel>{cat.label}</CategoryLabel>
                    </CategoryCard>
                  ))}
                </CategoryGrid>
              ) : (
                <>
                  <ThemeGrid>
                    {sortedPuzzleImages
                      .filter(item => item.category === selectedCategory)
                      .map((item) => (
                      <ThemeItem
                        key={item.image}
                        $isActive={
                          puzzleImages[currentMediaIndex].image === item.image
                        }
                        onClick={() => handleSelectTheme(item)}
                        onMouseEnter={() => handleThemeHover(item.audio)}
                        onMouseLeave={() => handleThemeLeave(true)}
                      >
                        <HeartButton
                          $isFavorite={favorites.includes(item.image)}
                          onClick={(e) => toggleFavorite(e, item.image)}
                        >
                          ♥
                        </HeartButton>
                        <Im src={item.image} alt={`theme-${item.image}`} />
                      </ThemeItem>
                    ))}
                  </ThemeGrid>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <DifficultyBtn 
                      onClick={() => setSelectedCategory(null)}
                      style={{ background: "#4e342e" }}
                    >
                      Назад до категорій
                    </DifficultyBtn>
                  </div>
                </>
              )}
              <DifficultyBtn onClick={() => { setShowThemeModal(false); setSelectedCategory(null); }}>
                Закрити
              </DifficultyBtn>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </GameWrapper>
  );
};

export default PuzzleOne;
