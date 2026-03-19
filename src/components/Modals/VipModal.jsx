import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
// Імпорти фото
import turkeys from "../../photos/vip-images/collectors-edition.jpg";
import dinofroz from "../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofrozVideo from "../../mp3/dinofroz.mp4";
// import monody from "../../photos/vip-images/vip-forest.webp";
import dragons from "../../photos/vip-images/dinofroz/vip-dragons.jpg";
import vip from "../../photos/hero-header/vip.jpg";
import music from "../../photos/vip-modal/music.jpg";
import ultra from "../../photos/vip-modal/realultra.jpg";
import clip from "../../photos/vip-images/clip.png";
import stars from "../../photos/vip-images/stars.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import buton from "../../photos/vip-modal/buton.jpg";
import texts from "../../photos/vip-modal/texts.jpg";
import horrordog from "../../photos/vip-images/horror/horror.jpg";
import asium from "../../photos/vip-images/asium/asium.jpg";
import rainbow from "../../photos/fan-art/rainbow.webp";
import letters from "../../photos/fan-art/letters.webp";
import documentImg from "../../photos/fan-art/document.webp";
import puzzle5 from "../../photos/fan-art/puzzle-5.webp";
import puzzle2 from "../../photos/fan-art/puzzle-2.webp";
import puzzle3 from "../../photos/fan-art/puzzle-3.webp";
import puzzle4 from "../../photos/fan-art/puzzle-4.webp";
import font from "../../photos/vip-images/flame.jpg";
import puzzle1 from "../../photos/fan-art/puzzle-1.webp";
// import fototwo from "../../photos/vip-images/vip-dragons.jpg";
const appearAndShrink = keyframes`
  0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
  50% { opacity: 0.5; transform: scale(1.1); filter: blur(2px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
`;

const slideIn = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  100% { transform: translateY(0%) scale(1); opacity: 1; }
`;

const slideInUltraLarge = keyframes`
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  70% { transform: translateY(-5%) scale(2.3); opacity: 1; }
  100% { transform: translateY(0%) scale(2.2); opacity: 1; }
`;

const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;
const slideOutUltraLarge = keyframes`
  0% { transform: translateY(0%) scale(2.2); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;

const flowPlus = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const rotateRays = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateRaysReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 5px;
`;

const VipModalDiv = styled.div`
  background-color: #3e2723;
  color: #fff;
  width: 98%;
  max-width: 950px;
  max-height: 95vh;
  padding: 15px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: border-color 0.5s ease;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 35px;
  }

  @media (min-width: 1900px) {
    max-width: 430px;
    max-height: 40vh;
    animation: ${(props) =>
        props.$isClosing ? slideOutUltraLarge : slideInUltraLarge}
      0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 7px;
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 16px;
  cursor: pointer;
  z-index: 1010;
  &:hover {
    color: #fff;
  }
  @media (max-width: 768px) {
    top: 10px;
    font-size: 19px;
    right: 10px;
  }
`;

const HeaderToggle = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  display: block;
  width: fit-content;
  outline: none;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const AnimatedText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${(props) =>
    props.$variant === "ultra"
      ? css`
          background-image: linear-gradient(
            270deg,
            #ff7eb3,
            #ff758c,
            #7afcff,
            #feffb7,
            #58e2c2
          );
          background-size: 400% 400%;
          animation:
            ${flowPlus} 5s ease infinite,
            ${appearAndShrink} 0.8s ease-out forwards;
        `
      : css`
          background-image: linear-gradient(
            45deg,
            #ff0000,
            #ff7f00,
            #ffff00,
            #00ff00,
            #0000ff,
            #8b00ff
          );
          background-size: 100% 100%;
          animation: none !important;
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: blur(0) !important;
        `}

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SwitchBackText = styled.div`
  font-size: 10px;
  color: #7afcff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: -5px;
  margin-bottom: 10px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const VipBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const VipFixScroll = styled.div`
  flex: 1;
  height: 420px;
  min-width: 280px;
  overflow-y: auto;
  padding-right: 8px;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const BenefitCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 179, 108, 0.05);
  border: 1px solid rgba(255, 179, 108, 0.15);
  border-radius: 8px;
  padding: 6px;
  opacity: 0;
  animation: ${appearAndShrink} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  margin-bottom: 6px;
  transition: transform 1s;
  ${({ $index }) => css`
    animation-delay: ${0.1 + $index * 0.05}s;
  `}
  &:hover {
    border-color: #ffb36c;
    transform: translateX(3px);
  }
`;

const BenefitImage = styled.img`
  width: 45px;
  height: 35px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
`;

const VipBonus = styled.div`
  font-size: 11.4px;
  line-height: 1.3;
  color: #ffb36c;
  flex: 1;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  color: #ffb36c;
  margin: 10px 0 6px 0;
  text-transform: uppercase;
  font-size: 12px;
  border-left: 2px solid #ffb36c;
  padding-left: 8px;
  opacity: 0;
  animation: ${appearAndShrink} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay || "0.2s"};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 260px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  z-index: 5;

  @media (max-width: 768px) {
    width: 100%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: conic-gradient(
      from 0deg,
      transparent 0deg 8deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        8deg 18deg,
      transparent 18deg 30deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        38deg 48deg,
      transparent 48deg 60deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        68deg 78deg,
      transparent 78deg 90deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        98deg 108deg,
      transparent 108deg 120deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        128deg 138deg,
      transparent 138deg 150deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        158deg 168deg,
      transparent 168deg 180deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        188deg 198deg,
      transparent 198deg 210deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        218deg 228deg,
      transparent 228deg 240deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        248deg 258deg,
      transparent 258deg 270deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        278deg 288deg,
      transparent 288deg 300deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        308deg 318deg,
      transparent 318deg 330deg,
      ${(props) =>
          props.$isUltra
            ? "rgba(122, 252, 255, 0.75)"
            : "rgba(255, 179, 108, 0.5)"}
        338deg 348deg,
      transparent 348deg 360deg
    );
    animation: ${rotateRays} 20s linear infinite;
    z-index: -1;
    pointer-events: none;
    mask-image: radial-gradient(circle, black 20%, transparent 70%);
  }
  ${(props) =>
    props.$isUltra &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 400px;
        height: 400px;
        background: conic-gradient(
          from 0deg,
          transparent 0deg 8deg,
          rgba(139, 0, 255, 0.8) 8deg 18deg,
          transparent 20deg 28deg,
          rgba(139, 0, 255, 0.8) 28deg 37deg,
          transparent 37deg 50deg,
          rgba(139, 0, 255, 0.8) 58deg 67deg,
          transparent 67deg 80deg,
          rgba(139, 0, 255, 0.8) 88deg 97deg,
          transparent 97deg 110deg,
          rgba(139, 0, 255, 0.8) 118deg 127deg,
          transparent 127deg 140deg,
          rgba(139, 0, 255, 0.8) 148deg 157deg,
          transparent 157deg 170deg,
          rgba(139, 0, 255, 0.8) 178deg 187deg,
          transparent 187deg 200deg,
          rgba(139, 0, 255, 0.8) 208deg 217deg,
          transparent 217deg 230deg,
          rgba(139, 0, 255, 0.8) 238deg 247deg,
          transparent 247deg 260deg,
          rgba(139, 0, 255, 0.8) 268deg 277deg,
          transparent 277deg 290deg,
          rgba(139, 0, 255, 0.8) 298deg 307deg,
          transparent 307deg 320deg,
          rgba(139, 0, 255, 0.8) 328deg 337deg,
          transparent 337deg 350deg
        );
        animation: ${rotateRaysReverse} 25s linear infinite;
        z-index: -1;
        pointer-events: none;
        mask-image: radial-gradient(circle, black 20%, transparent 70%);
      }
    `}
`;

const VipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  position: relative;
  z-index: 2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
`;

const VipButton = styled.button`
  width: 260px;
  border: 1px solid #ffb36c;
  cursor: pointer;
  padding: 8px;
  background: transparent;
  color: #ffb36c;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  z-index: 10;
  &:hover {
    background: #ffb36c;
    color: #3e2723;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VipText = styled.p`
  width: 100%;
  max-width: 300px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  color: #ffb36c;
`;

const RedLine = styled.div`
  background: #ff8a80;
  width: 100%;
  height: 1px;
  margin: 10px 0;
`;

const VipWarning = styled.p`
  color: #ff8a80;
  font-size: 12px;
  word-wrap: break-word;
  margin-bottom: 2px;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 100%;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  background: rgba(255, 179, 108, 0.1);
  border: 1px solid #ffb36c;
  color: #ffb36c;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffb36c;
    color: #3e2723;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 179, 108, 0.3);
  }

  @media (min-width: 1900px) {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }
`;

const UltraPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: black;

  &:hover button {
    opacity: 1;
  }
`;

const FullscreenBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #fff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  z-index: 40;
  padding: 5px;
  font-size: 12px;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    opacity: 1;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  transform: scale(1.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.$show ? "block" : "none")};
  transform: scale(1.1);
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: ${(props) => (props.$isFullscreen ? "60px" : "20px")};
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  font-size: 14px;
  text-align: center;
  width: 90%;
  transition: opacity 0.35s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  z-index: 30;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 10px;
  border-radius: 8px;
  pointer-events: none;
`;

const TimeIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 40;
  pointer-events: none;
`;

const VolumeControlContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50px; /* Right of fullscreen button */
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s;

  ${UltraPlayerContainer}:hover & {
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 1;
  }
`;

const ULTRA_CARDS_LIST = [
  {
    image: require("../../photos/vip-images/turkeys/ultra-vip-turkeys.webp"),
    audio: require("../../mp3/turkeys.mp3"),
  },
  {
    image: require("../../photos/vip-images/dinofroz/vip-dinofroz.webp"),
    audio: require("../../mp3/dinofroz.mp3"),
  },
  {
    image: require("../../photos/vip-images/horse/horse.jpg"),
    audio: require("../../mp3/horse.mp3"),
  },
  {
    image: require("../../photos/vip-images/vip-soloveyko.jpg"),
    audio: require("../../mp3/soloveyko.mp3"),
  },
  {
    image: require("../../photos/fan-art/monody.jpg"),
    audio: require("../../mp3/thefatrat-monody.mp3"),
  },
  {
    image: require("../../photos/vip-images/asium/asium.jpg"),
    audio: require("../../mp3/harmonic-japan.mp3"),
  },
  {
    image: require("../../photos/fan-art/theorytwo.jpg"),
    audio: require("../../mp3/theoty-of-everything-ll.mp3"),
  },
  {
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
  },
];

const SEQUENCE = [
  { type: "thematic", duration: 2000, text: "" },
  { type: "black", duration: 10000, text: "У нас надійна погода" },
  {
    type: "card",
    imgIdx: 0,
    duration: 6000,
    text: "Банальна і цікава музика, яку можна додавати, шукати",
  },
  {
    type: "video",
    start: 10,
    end: 20,
    text: "Спец режим відео (динофроз) або плавне перегортання +-9 зображень під час програвання деяких музичних файлів",
  },
  {
    type: "card",
    imgIdx: 2,
    duration: 4000,
    text: "Зробіть красиву оселю, з принтером і нашими, пошуковими або власними фанартами!",
  },
  {
    type: "video",
    start: 20,
    end: 30,
    text: "Секрети, головоломки, історії, власні рівні, різні важкості, тексти.",
  },
  { type: "card", imgIdx: 6, duration: 12000, text: "Налаштуйте сайт під себе" },
  {
    type: "video",
    start: 30,
    end: 45,
    text: "Пишіть, підказуйте, що зробити для вас :)",
  },
  { type: "video", start: 45, end: 65, text: "Досягнення різного смаку. " },
  {
    type: "card",
    imgIdx: 4,
    duration: 10000,
    text: "Власна валюта. Скачуйте музику, зображення, відео.",
  },
  {
    type: "video",
    start: 65,
    end: 81,
    text: "Усе це добре, але все можна поліпшити, з Стихія Ультра та Стихія+",
  },
];

const UltraPlayer = ({ volume, setVolume }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const step = SEQUENCE[stepIndex];
  const [timeLeft, setTimeLeft] = useState(0);
  const volumeRef = useRef(volume);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let nextStepTimer;
    let textOutTimer;
    let textInTimer;
    let countdownInterval;
    setShowText(false);
    textOutTimer = setTimeout(() => {
      setText(step.text);
      if (step.text) {
        textInTimer = setTimeout(() => setShowText(true), 50);
      }
    }, 350);

    if (step.type !== "video") {
      setTimeLeft(Math.ceil(step.duration / 1000));
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    if (step.type === "thematic") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) audioRef.current.pause();
      nextStepTimer = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }, step.duration);
    } else if (step.type === "card") {
      if (videoRef.current) videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.volume = volumeRef.current;
        audioRef.current.src = ULTRA_CARDS_LIST[step.imgIdx].audio;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      nextStepTimer = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
      }, step.duration);
    } else if (step.type === "video" || step.type === "black") {
      if (audioRef.current) audioRef.current.pause();
      if (videoRef.current) {
        const start = step.type === "black" ? 0 : step.start;
        if (Math.abs(videoRef.current.currentTime - start) > 0.2) {
          videoRef.current.currentTime = start;
        }
        videoRef.current.play().catch(() => {});
      }

      if (step.type === "video" && step.end !== "end") {
        const duration = (step.end - step.start) * 1000;
        nextStepTimer = setTimeout(() => {
          setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
        }, duration);
      } else if (step.type === "black") {
        nextStepTimer = setTimeout(() => {
          setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
        }, step.duration);
      }
    }

    return () => {
      clearTimeout(nextStepTimer);
      clearTimeout(textOutTimer);
      clearTimeout(textInTimer);
      clearInterval(countdownInterval);
    };
  }, [
    stepIndex,
    step.duration,
    step.text,
    step.type,
    step.imgIdx,
    step.start,
    step.end,
  ]);

  useEffect(() => {
    volumeRef.current = volume;
    if (videoRef.current) videoRef.current.volume = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const handleVideoEnded = () => {
    if (step.type === "video" && step.end === "end") {
      setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
    }
  };

  const handleTimeUpdate = () => {
    if (step.type === "video" && videoRef.current) {
      const end = step.end === "end" ? videoRef.current.duration : step.end;
      const remaining = Math.max(0, end - videoRef.current.currentTime);
      setTimeLeft(Math.ceil(remaining));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <UltraPlayerContainer ref={containerRef}>
      <FullscreenBtn onClick={toggleFullscreen}>
        {isFullscreen ? "❌" : "⛶"}
      </FullscreenBtn>

      <VolumeControlContainer>
        <span style={{ fontSize: "14px" }}>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{
            width: "80px",
            accentColor: "#710097",
            cursor: "pointer",
            height: "4px",
          }}
        />
      </VolumeControlContainer>
      <StyledImage src={ultra} $show={step.type === "thematic"} />
      <TimeIndicator>{timeLeft}</TimeIndicator>
      <StyledVideo
        ref={videoRef}
        src={dinofrozVideo}
        $show={step.type === "video"} 
        onEnded={handleVideoEnded}
        onTimeUpdate={handleTimeUpdate}
        playsInline
      />
      {step.type === "card" && (
        <>
          <StyledImage src={ULTRA_CARDS_LIST[step.imgIdx].image} $show={true} />
          <audio ref={audioRef} />
        </>
      )}
      <OverlayText $show={showText} $isFullscreen={isFullscreen}>{text}</OverlayText>
    </UltraPlayerContainer>
  );
};

const VipModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [tier, setTier] = useState("plus");
  const [showContent, setShowContent] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const aiRef = useRef(null);
  const musicRef = useRef(null);
  const economicsRef = useRef(null);
  const interfaceRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleTierSwitch = (newTier) => {
    if (tier === newTier) return;
    setShowContent(false);
    setTimeout(() => {
      setTier(newTier);
      setShowContent(true);
    }, 100);
  };

  const plusBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 5 спроб, замість за 🧧 3. Після вичерпування ліміту ціна повідомлення 0,12грн, не 0,21грн + 🧧. Ліміт 🧧 спроб може змінюватися залежно від навантаження на систему.",
      },
      { src: lebid, text: "2 (не 1) зображення/міс по 4,99грн, далі 6,99грн." },
      { src: clip, text: "Відео 65грн/с (замість 75грн/с)." },
      { src: music, text: "mp3 4грн/хв, не 6грн/хв." },
      {
        src: puzzle2,
        text: "Пам'ять на 33дні, не на 21добу! Ліміт історії запитів 70, не 50. Ліміт паралельних чатів спілкування 5, не 3.",
      },
    ],
    music: [
      {
        src: asium,
        text: "Можна взяти в обране 7 пісень, а не 3! А також поділ 1-4, не 1-3. Назавжди!",
      },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧.",
      },
      {
        src: dinofroz,
        text: "Діапазон цін екслюзивних аватарів дешевший: 20-30🧧, замість 20-40🧧.",
      },
      {
        src: font,
        text: "Станьте творцем! Розміщуйте індивідуальні плейлист, з лімітом у 4пісні(на ваш альбом, не 4), з обкладиками(в сумі не може бути більше 12мб(не 7мб).). Можете прив'язати відео з ютубу(до 3хв). Без монетизації(реклами), якщо ютуб. Назавжди!",
      },
    ],
    economics: [
      {
        src: dragons,
        text: "Знижка 5грн у магазині 🧧, 🏆 дають додатково до 20🧧, якщо їх к-сть у 🏆 < 40. У сумі вийде 40. Навіть, якщо ви вже виконали 🏆 вони будуть після оплати автоматично відправлені. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 50🧧. Ліміт покупок наборів 🧧*2. Можна зберігати 5000🧧, замість 2500(Після кінця зайві не анулюються, але ви не зможете отримувати наступну партію, доти доки к-сть буде >= ліміту). Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧). Отримуйте 600🧧 при сплаті тарифу.",
      },
      {
        src: puzzle4,
        text: "Передавайте до 250🧧/добу, не 125. Втрата конвертів піля передачі 30%, не 50%.",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 у випадку невдачі 33год, не 42год. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 12дн., а не 21дн.",
      },
      {
        src: puzzle1,
        text: "Баффі(х2 конверти(з досягнень, головоломок). В наступні 3хв(не 1) після активації(в магазині в розділі наборів).",
      },
    ],
    interface: [
      {
        src: vip,
        text: "Оновлений стиль сайту (з перемикачем лого вгорі, в лівому кутку). Назавжди!",
      },
      { src: stars, text: "0 реклами, при переходу на інший сайт через наш(розділ новини, Deezer - і безкоштовно без реклами)" },
      {
        src: buton,
        text: "Кнопки: Додавання/Оновлення міста, фанарту, пошуку музики, плейлисту має перезарядку 20с замість 40c. Ліміт додаткових карток 4. Зайві картки видаляються коли підписка сплине в терміні.",
      },
      {
        src: rainbow,
        text: "Райдужне(Неанімовані) ім'я та рамка доступні! Назавжди!",
      },
      {
        src: documentImg,
        text: "Доступно 10 останніх новин, а не 5.",
      },
      {
        src: puzzle3,
        text: "Прив'язуйте до акаунту 3пристрої, не 2. Назавжди!",
      },
    ],
  };

  const ultraBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 7 спроб. Далі за 0,7грн + 🧧(лише за обширні відповіді). Ви маєте пріоритет у черзі при генерації. Лімітована акція!",
      },
      {
        src: lebid,
        text: "3 зображення/міс по 3,99грн, далі 5,99грн. Лімітована акція!",
      },
      { src: clip, text: "Відео 45грн/с. Лімітована акція!" },
      { src: music, text: "mp3 2грн/хв. Лімітована акція!" },
      {
        src: puzzle2,
        text: "Пам'ять на 42доби! Пам'ять запитів 100. Ліміт паралельних чатів 7. Лімітована акція!",
      },
    ],
    music: [
      {
        src: asium,
        text: "Можна взяти в обране 10 пісень. Поділ від 1-5 по оцінці. Назавжди!",
      },
      {
        src: horrordog,
        text: "Текст пісні підсвічується під час програвання(не всі пісні мають цю механіку)! Назавжди!",
      },
      {
        src: letters,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-25🧧. Та за 50🧧 поставити ваш аватар.",
      },
      {
        src: font,
        text: "Розміщуйте у вашому плейлисті, з лімітом у 8пісень, з обкладиками(в сумі не може бути більше 50мб. Можете додавати фільтри(в інтервалах мелодії) та прив'язати відео з ютубу(до 4хв). Назавжди!",
      },
    ],
    economics: [
      {
        src: documentImg,
        text: "Знижка на Стихію+ 5грн, після придбання Ultrа. Лімітована акція!",
      },
      {
        src: dragons,
        text: "Знижка 15грн у магазині 🧧. Сплата тарифу переодоплатою(разово) та місячним тарифом дає 750🧧. Ліміт покупок наборів 🧧*3. Можна зберігати 10000🧧. Шанс 50% на джекпот(Ціна збільшена на 20🧧). Отримуйте 800🧧 при сплаті тарифу.",
      },
      {
        src: puzzle4,
        text: "Передавайте до 250🧧/добу, не 125. Втрата конвертів піля передачі 10%. Лімітована акція!",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 21год у разі невдачі. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 7дн. Лімітована акція!",
      },
      {
        src: puzzle1,
        text: "Баффі(х2 конверти(з досягнень, головоломок). В наступні 6хв після активації(в магазині в розділі наборів). Лімітована акція!",
      },
    ],
    interface: [
      {
        src: vip,
        text: "Оновлений стиль сайту (з перемикачем лого). Назавжди!",
      },
      {
        src: buton,
        text: "Кнопки Додавання/Оновлення міста, фанарту, пошуку музики, плейлисту має перезарядку 4с. Ліміт додаткових карток 8. Лімітована акція!",
      },
      {
        src: rainbow,
        text: "Райдужне(анімоване) ім'я та рамка доступні. Назавжди!",
      },
      {
        src: documentImg,
        text: "Доступ до 20 останніх новин. Лімітована акція!",
      },
      {
        src: puzzle3,
        text: "Прив'язуйте до акаунту 4пристрої. Назавжди!",
      },
    ],
  };

  const current = tier === "plus" ? plusBenefits : ultraBenefits;

  return (
    <Overlay onClick={handleClose}>
      <VipModalDiv
        $isClosing={isClosing}
        $isUltra={tier === "ultra"}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>

        <HeaderToggle
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          <AnimatedText $variant={tier} key={`title-${tier}`}>
            {tier === "plus" ? "Стихія+" : "Стихія+ Ultra"}
          </AnimatedText>
        </HeaderToggle>

        <SwitchBackText
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          {tier === "plus"
            ? "Переглянути переваги Стихія+ Ultra"
            : "Повернутись до переваг Стихія+"}
        </SwitchBackText>
        <VipBlock>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageContainer $isUltra={tier === "ultra"}>
              {tier === "plus" ? (
                <VipImage src={turkeys} key="img-plus" $isUltra={false} />
              ) : (
                <UltraPlayer volume={volume} setVolume={setVolume} />
              )}
            </ImageContainer>

            {tier === "plus" ? (
              <>
                <VipButton>19,99грн/30днів</VipButton>
              </>
            ) : (
              <>
                <VipButton>39,99грн/30днів</VipButton>
              </>
            )}
            <NavContainer>
              <NavButton
                onClick={() => scrollToSection(aiRef)}
                title="Штучний Інтелект"
              >
                🤖
              </NavButton>
              <NavButton
                onClick={() => scrollToSection(musicRef)}
                title="Музика та Арт"
              >
                🎨
              </NavButton>
              <NavButton
                onClick={() => scrollToSection(economicsRef)}
                title="Економіка та ресурси"
              >
                🧧
              </NavButton>
              <NavButton
                onClick={() => scrollToSection(interfaceRef)}
                title="Інтерфейс і функціонал"
              >
                📱
              </NavButton>
            </NavContainer>
            <VipText>
              Підтримуючи проект підпискою або наборами 🧧, ви допомагаєте
              'Стихії' розвиватися. Ми тримаємо ціни доступними, щоб кожен міг
              отримати максимум можливостей, розвиваючи проект разом із нами.
            </VipText>
            <VipText>
              Лімітована акція! Стихія+ після покупки Ultra дешевша удвічі!
            </VipText>
          </div>
          <VipFixScroll key={`scroll-area-${tier}`}>
            {showContent && (
              <>
                <SectionTitle ref={aiRef} $delay="0.1s">
                 🤖 ШІ
                </SectionTitle>
                {current.ai.map((item, i) => (
                  <BenefitCard key={`ai-${tier}-${i}`} $index={i}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}

                <SectionTitle ref={musicRef} $delay="0.3s">
                 🎨 Музика та Арт
                </SectionTitle>
                {current.music.map((item, i) => (
                  <BenefitCard key={`mu-${tier}-${i}`} $index={i + 4}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
                <SectionTitle ref={economicsRef} $delay="0.5s">
                 🧧 Економіка та ресурси
                </SectionTitle>
                {current.economics.map((item, i) => (
                  <BenefitCard key={`eco-${tier}-${i}`} $index={i + 10}>
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
                <SectionTitle ref={interfaceRef} $delay="0.7s">
                 📱 Інтерфейс і функціонал
                </SectionTitle>
                {current.interface.map((item, i) => (
                  <BenefitCard
                    key={`int-${tier}-${i}`}
                    $index={i + 10 + current.economics.length}
                  >
                    <BenefitImage src={item.src} />
                    <VipBonus>{item.text}</VipBonus>
                  </BenefitCard>
                ))}
              </>
            )}
          </VipFixScroll>
        </VipBlock>
        <RedLine />
        <VipWarning>
          Примітка: 1.Mісячний тариф перемикається автоматично! При активній
          Стихія+ ви можете миттєво перейти на Ultra. Система дозволяє бронювати
          підписки до року вперед. Скасування броні повертає кошти на внутрішній
          баланс (або у 🧧). Деякі функції в розробці.
        </VipWarning>
        <VipWarning>
          2.Коли підписка закінчиться привілегії(не всі) зникнуть. Бонус
          лояльності: У тарифі Ultra діє лімітована акція, що активується після
          другої оплати поспіль. Якщо підписка Ultra буде перервана на термін
          понад 3 місяці, бонус анулюється(доступ лише при дії Ultra, при Plus
          таймер заморожується.), і для його відновлення знадобиться повторна
          серія оплат. Також доступна послуга «Швидкий старт» за 4,99 грн для
          миттєвої активації 1 акції.
        </VipWarning>
        <VipWarning>
          3.Переваги Стихії+ оптимізовані в Стихія+ Ultrа, ті що не були вказані
          в Стихія+ Ultra(присутні, але ті самі як в Стихія+.).
        </VipWarning>
      </VipModalDiv>
    </Overlay>
  );
};

export default VipModal;
