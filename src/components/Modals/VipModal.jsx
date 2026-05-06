import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
// Імпорти фото
import turkeys from "../../photos/vip-images/collectors-edition.webp";
import dinofroz from "../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofrozVideo from "../../mp3/dinofroz.mp4";
import dragons from "../../photos/vip-images/dinofroz/vip-dragons.webp";
import vip from "../../photos/hero-header/vip.webp";
import music from "../../photos/vip-modal/music.webp";
import ultra from "../../photos/vip-modal/realultra.webp";
import clip from "../../photos/vip-images/clip.webp";
import stars from "../../photos/vip-images/stars.webp";
import lebid from "../../photos/vip-images/vip-lebid.webp";
import buton from "../../photos/vip-modal/buton.webp";
import texts from "../../photos/vip-modal/texts.webp";
import asium from "../../photos/vip-images/asium/asium.webp";
import rainbow from "../../photos/fan-art/rainbow.webp";
import documentImg from "../../photos/fan-art/document.webp";
import puzzle5 from "../../photos/fan-art/puzzle-5.webp";
import puzzle2 from "../../photos/fan-art/puzzle-2.webp";
import puzzle3 from "../../photos/fan-art/puzzle-3.webp";
import puzzle4 from "../../photos/fan-art/puzzle-4.webp";
import font from "../../photos/vip-images/flame.webp";
import puzzle1 from "../../photos/fan-art/puzzle-1.webp";
//Prewiew
import second from "../../photos/fan-art/theorytwo.webp";
import seconds from "../../mp3/theoty-of-everything-ll.mp3";
import tur from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
import turs from "../../mp3/turkeys.mp3";
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

const slideUpNav = keyframes`
  from {
    transform: translate(-50%, 120%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
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
  padding: 10px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 2px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: border-color 0.5s ease;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  @media (max-width: 768px) {
    padding-bottom: 90px; 
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 3px;
  width: 260px;
  border: 1px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  cursor: pointer;
  user-select: none;
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(50% - 3px);
  height: calc(100% - 6px);
  background: ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  border-radius: 7px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(
    ${(props) => (props.$cycle === "yearly" ? "100%" : "0")}
  );
  z-index: 1;
`;

const ToggleOption = styled.div`
  flex: 1;
  padding: 8px 0;
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  z-index: 2;
  color: ${(props) => (props.$active ? "#3e2723" : "#ffb36c")};
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ToggleDivider = styled.div`
  position: absolute;
  left: 50%;
  top: 20%;
  bottom: 20%;
  width: 1px;
  background: rgba(255, 179, 108, 0.2);
  z-index: 0;
`;

const SavingsBadge = styled.span`
  background: #ff4d4d;
  color: white;
  font-size: 8px;
  padding: 1px 4px;
  border-radius: 4px;
  margin-left: 2px;
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

const CacheButton = styled.button`
  position: absolute;
  top: 3px;
  right: 40px;
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 16px;
  cursor: pointer;
  z-index: 1010;
  opacity: 0.7;
  transition: all 0.3s ease;
  &:hover {
    color: #fff;
    opacity: 1;
  }
  @media (max-width: 768px) {
    top: 10px;
    font-size: 19px;
    right: 45px;
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
  margin-bottom: 3px;
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
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const VipBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
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
  border-radius: 8px;
  opacity: 0;
  animation: ${appearAndShrink} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  margin-bottom: 8px;
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
  font-size: 10.4px;
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
const ViWarning = styled.p`
  margin-top: 3px;
  @media (min-width: 768px) {
    display: none;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  width: 260px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0 1px 0;
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
  margin: 5px 0;
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
  @media (max-width: 768px) {
    display: none;
  }
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

const MobileStickyNav = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 400px;
    background: rgba(62, 39, 35, 0.95);
    border: 1px solid #ffb36c;
    border-radius: 16px;
    padding: 8px 5px;
    z-index: 3000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    animation: ${slideUpNav} 0.5s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      forwards;
  }
`;

const MobileNavBtn = styled.button`
  background: transparent;
  border: none;
  color: #ffb36c;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  span {
    font-size: 8px;
    font-weight: bold;
  }

  &:active {
    transform: scale(0.9);
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

  ${(props) =>
    props.$isFullscreen &&
    css`
      @media screen and (orientation: portrait) {
        width: 100vh;
        height: 100vw;
        transform: rotate(90deg);
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        translate: -50% -50%;
        z-index: 9999;
      }
    `}
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

const PausedOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  gap: 20px;
`;

const PauseIcon = styled.div`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const PausedButtonsRow = styled.div`
  display: flex;
  gap: 15px;
  pointer-events: auto;
`;

const PausedButton = styled.button`
  background: rgba(148, 255, 250, 0.2);
  backdrop-filter: blur(5px);
  color: #94fffa;
  border: 1px solid rgba(148, 255, 250, 0.5);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background: #94fffa;
    color: #000;
  }
  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 12px;
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
  font-size: 11px;
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

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: #94fffa;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px #94fffa;
`;

const ULTRA_CARDS_LIST = [
  {
    image: tur,
    audio: turs,
  },
  {
    image: second,
    audio: seconds,
  },
];

const SEQUENCE = [
  { type: "thematic", duration: 3000, text: "" },
  { type: "black", duration: 10000, text: "Стихія дає надійну погоду, красиву оселю, з вашим принтером із нашими, пошуковими або власними фанартами." },
  {
    type: "card",
    imgIdx: 1,
    duration: 10000,
    text: "Налаштуйте сайт, фільтрами, та налаштуванням стилю і часу. З нашими власними валютами. Безкоштовно: Скачуйте музику, зображення, відео. Фоновий режим + картинка в картинці.",
  },
  {
    type: "video",
    start: 10,
    end: 20,
    text: "Різноманітна та захоплива музика, яку можна додавати, шукати. Спец режим відео (динофроз), плавне перегортання зображень або фільтри під час програвання деяких музичних файлів.",
  },
  {
    type: "video",
    start: 20,
    end: 30,
    text: "Секрети, головоломки, історії, власні рівні, різні рівні складності.",
  },
  {
    type: "video",
    start: 30,
    end: 45,
    text: "Пишіть, підказуйте, що зробити для вас :)",
  },
  { type: "video", start: 45, end:50, text: "Досягнення різного смаку. " },
   { type: "video", start: 50, end:65, text: "Присутне навчання." },
  {
    type: "video",
    start: 65,
    end: 83,
    text: "Усе це добре, але багато чого можна поліпшити, з Стихія Ультра та Стихія+",
  },
];

const UltraPlayer = ({ volume, setVolume, onPlayerClose }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const step = SEQUENCE[stepIndex];
  const [timeLeft, setTimeLeft] = useState(0);
  const volumeRef = useRef(volume);
  const isPausedRef = useRef(isPaused);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const checkWatched = async () => {
      const val = await localforage.getItem("katSceneWatched");
      if (val === "true") setIsWatched(true);
    };
    checkWatched();
  }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      const urlsToLoad = new Set();

      // Додаємо основні ресурси
      urlsToLoad.add(ultra);
      urlsToLoad.add(dinofrozVideo);

      // Додаємо ресурси карток
      ULTRA_CARDS_LIST.forEach((item) => {
        if (item.image) urlsToLoad.add(item.image);
        if (item.audio) urlsToLoad.add(item.audio);
      });

      const urlsArray = Array.from(urlsToLoad);
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / urlsArray.length) * 100);
        setLoadingProgress(progress);
      };

      const promises = urlsArray.map((url) =>
        fetch(url)
          .then((response) => {
            updateProgress();
            return response.blob();
          })
          .catch((err) => {
            console.error(`Failed to load ${url}`, err);
            updateProgress();
          }),
      );

      await Promise.all(promises);

      setTimeout(() => {
        setIsAssetsLoaded(true);
      }, 500);
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
    if (videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else if (step.type === "video" || step.type === "black")
        videoRef.current.play().catch(() => {});
    }
    if (audioRef.current) {
      if (isPaused) audioRef.current.pause();
      else if (step.type === "card") audioRef.current.play().catch(() => {});
    }
  }, [isPaused, step.type]);

  const togglePause = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT" ||
      e.target.closest("label")
    )
      return;
    setIsPaused((prev) => !prev);
  };

  const handleScreenshot = (e) => {
    e.stopPropagation();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let source = null;
    if (step.type === "video" || step.type === "black") {
      source = videoRef.current;
    }

    if (source && source.videoWidth) {
      canvas.width = source.videoWidth;
      canvas.height = source.videoHeight;
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = `stykhiya-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else {
      alert("Скріншот збережено! (Емуляція для статичних кадрів)");
    }
  };

  useEffect(() => {
    if (!isAssetsLoaded || isPaused) return;

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
        if (!isPausedRef.current) setTimeLeft((prev) => Math.max(0, prev - 1));
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
    isPaused,
    isAssetsLoaded,
  ]);

  useEffect(() => {
    volumeRef.current = volume;
    if (videoRef.current) videoRef.current.volume = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: 'Стихія Ultra Player',
        artist: 'TurkeyStudio',
        artwork: [{ src: ultra, sizes: '512x512', type: 'image/webp' }]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (videoRef.current && (step.type === 'video' || step.type === 'black')) videoRef.current.play();
        if (audioRef.current && step.type === 'card') audioRef.current.play();
        setIsPaused(false);
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        videoRef.current?.pause();
        audioRef.current?.pause();
        setIsPaused(true);
      });
    }
  }, [step.type]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPaused ? 'paused' : 'playing';
    }
  }, [isPaused]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const handleVideoEnded = () => {
    if (step.type === "video" && step.end === "end" && !isPaused) {
      setStepIndex((prev) => (prev + 1) % SEQUENCE.length);
    }
  };

  const handleTimeUpdate = () => {
    if (step.type === "video" && videoRef.current && !isPaused) {
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
    <UltraPlayerContainer
      ref={containerRef}
      $isFullscreen={isFullscreen}
      onClick={togglePause}
    >
      {!isAssetsLoaded && (
        <LoadingContainer>
          <div
            style={{ color: "#94fffa", fontSize: "14px", marginBottom: "5px" }}
          >
            Завантаження... {loadingProgress}%
          </div>
          <ProgressBar>
            <ProgressBarFill $progress={loadingProgress} />
          </ProgressBar>
        </LoadingContainer>
      )}

      {!isPaused && (
        <>
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
        </>
      )}

      <AnimatePresence>
        {isPaused && (
          <PausedOverlay
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PauseIcon>Ⅱ</PauseIcon>
            <PausedButtonsRow>
              <PausedButton onClick={handleScreenshot}>
                📸 Скріншот
              </PausedButton>
              {isWatched && (
                <PausedButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayerClose();
                  }}
                >
                  Закрити
                </PausedButton>
              )}
            </PausedButtonsRow>
          </PausedOverlay>
        )}
      </AnimatePresence>

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
      <OverlayText $show={showText} $isFullscreen={isFullscreen}>
        {text}
      </OverlayText>
    </UltraPlayerContainer>
  );
};

const PlusPlayer = ({ volume, setVolume }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <VipImage src={turkeys} $isUltra={false} />
      <audio ref={audioRef} src={turs} autoPlay loop />
      <VolumeControlContainer style={{ opacity: 1, left: "10px" }}>
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
            accentColor: "#ffb36c",
            cursor: "pointer",
            height: "4px",
          }}
        />
      </VolumeControlContainer>
    </div>
  );
};

const VipModal = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [tier, setTier] = useState("plus");
  const [showContent, setShowContent] = useState(true);
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
  const [volume, setVolume] = useState(0.5);
  const [isCaching, setIsCaching] = useState(false);

  const aiRef = useRef(null);
  const musicRef = useRef(null);
  const economicsRef = useRef(null);
  const interfaceRef = useRef(null);
  const cacheBtnRef = useRef(null);
  const bottomRef = useRef(null);
  const topRef = useRef(null);

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
        text: "Пам'ять на 15днів, не на 7днів! Ліміт історії запитів 70, не 50. Ліміт паралельних чатів спілкування 5, не 3.",
      },
    ],
    music: [
      {
        src: asium,
        text: "Ви отримуєте 250балів, не 100. Назавжди(вони необхідні, щоб музика, декор головного фону, питання у начанні та гри головоломок, підтягувалися вище інших)",
      },
      {
        src: dinofroz,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-30🧧, не 20-40🧧.",
      },
      {
        src: font,
        text: "Станьте творцем! Розміщуйте індивідуальні плейлист, з лімітом у 20пісень(на ваш альбом, не 10), з обкладиками. Можете прив'язати відео з ютубу. До 3хв, не 2. Назавжди!",
      },
    ],
    economics: [
      {
        src: dragons,
        text: "Знижка 5грн у магазині Доміно, 🏆 дають додатково до 20🧧, якщо їх к-сть у 🏆 < 40. У сумі вийде 40. Навіть, якщо ви вже виконали 🏆 вони будуть після оплати автоматично відправлені. Можна зберігати 5000🧧, замість 2500(Після кінця зайві не анулюються, але ви не зможете отримувати наступну партію, доти доки к-сть буде >= ліміту). Шанс 25%(не 20%) на джекпот(Ціна збільшена на 10🧧).",
      },
      {
        src: puzzle5,
        text: "Перезарядка деяких 🏆 у випадку невдачі 33год, не 42год. Перезарядка деяких 🏆 в плані 🧧 у випадку успішного виконнання 12дн., а не 21дн.",
      },
      {
        src: puzzle1,
        text: "Баффі(х2, не 1,5х конверти(з досягнень, головоломок). В наступні 3хв(не 1) після активації(в магазині в розділі наборів).",
      },
    ],
    interface: [
      {
        src: vip,
        text: "Доступ до безкоштовних функцій, які мали стати доступними у версії 1.1",
      },
      {
        src: stars,
        text: "Реклама, при переході на інший сайт через наш(розділ новини, Deezer - і безкоштовно без реклами) не кожний перехід, а через раз.",
      },
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
         text: "Прив'язуйте до акаунту 3пристрої, не 2. Назавжди!"
       },
    ],
  };

  const ultraBenefits = {
    ai: [
      {
        src: texts,
        text: "За 🧧 7 спроб. Далі за 0,07грн + 🧧(лише за обширні відповіді). Ви маєте пріоритет у черзі при генерації. Лімітована акція!",
      },
      {
        src: lebid,
        text: "3 зображення/міс по 3,99грн, далі 5,99грн. Лімітована акція!",
      },
      { src: clip, text: "Відео 45грн/с. Лімітована акція!" },
      { src: music, text: "mp3 2грн/хв. Лімітована акція!" },
      {
        src: puzzle2,
        text: "Пам'ять доки діє підписка(якщо на телефоні є місце)! Пам'ять запитів 100. Ліміт паралельних чатів 7. Лімітована акція!",
      },
    ],
    music: [
      {
        src: asium,
        text: "Отримайте500 балів. Назавжди!",
      },
      {
        src: dinofroz,
        text: "Ціни на аватари, рамки та райдужний текст менш спонтанні 20-25🧧. Та за 50🧧 поставити ваш аватар.",
      },
      {
        src: font,
        text: "Розміщуйте у вашому плейлисті, з лімітом у 8пісень, з обкладиками(в сумі не може бути більше 50мб. Можете додавати фільтри(в інтервалах мелодії) та прив'язати відео з ютубу(до 4хв). Назавжди!",
      },
    ],
    economics: [
      {
        src: dragons,
        text: "Знижка 10грн у магазині Доміно. Можна зберігати 10000🧧. Шанс 50% на джекпот(Ціна збільшена на 20🧧).",
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
        src: stars,
        text: "Реклама, при переході на інший сайт через наш(розділ новини, Deezer - безкоштовно без реклами) буде раз/год(у перервах, за бажанням).",
      },
      {
        src: vip,
        text: "Доступ до функцій, якій стануть доступними лише у версії 1.3 Назавжди!",
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

  const handleCacheAll = async (e) => {
    e.stopPropagation();
    if (isCaching) return;
    setIsCaching(true);

    try {
      const urlsToCache = new Set();
      urlsToCache.add(turkeys); // Plus image
      urlsToCache.add(dinofrozVideo);
      ULTRA_CARDS_LIST.forEach((item) => {
        if (item.image) urlsToCache.add(item.image);
        if (item.audio) urlsToCache.add(item.audio);
      });
      [plusBenefits, ultraBenefits].forEach((benefitsObj) => {
        Object.values(benefitsObj).forEach((categoryList) => {
          categoryList.forEach((benefit) => {
            if (benefit.src) urlsToCache.add(benefit.src);
          });
        });
      });
      const promises = Array.from(urlsToCache).map((url) => fetch(url));
      await Promise.all(promises);

      alert("Успішно! Всі зображення, музика та відео закешовані.");
    } catch (err) {
      console.error("Помилка кешування:", err);
      alert("Виникла помилка при спробі закешувати файли.");
    } finally {
      setIsCaching(false);
    }
  };

  const current = tier === "plus" ? plusBenefits : ultraBenefits;

  return (
    <Overlay onClick={handleClose}>
      <VipModalDiv
        $isClosing={isClosing}
        $isUltra={tier === "ultra"}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={topRef} style={{ position: "absolute", top: 0, left: 0 }} />
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <CacheButton
          ref={cacheBtnRef}
          onClick={handleCacheAll}
          title="Закешувати всі ресурси (відео, аудіо, фото)"
          disabled={isCaching}
        >
          {isCaching ? "⏳" : "📥"}
        </CacheButton>

        <HeaderToggle
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          <AnimatedText $variant={tier} key={`title-${tier}`}>
            {tier === "plus" ? "Стихія+" : "Стихія Ultra"}
          </AnimatedText>
        </HeaderToggle>

        <SwitchBackText
          onClick={() => handleTierSwitch(tier === "plus" ? "ultra" : "plus")}
        >
          {tier === "plus"
            ? "Переглянути переваги Стихія Ultra"
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
                <PlusPlayer volume={volume} setVolume={setVolume} />
              ) : (
                <UltraPlayer
                  volume={volume}
                  setVolume={setVolume}
                  onPlayerClose={handleClose}
                />
              )}
            </ImageContainer>

            <ToggleContainer
              $isUltra={tier === "ultra"}
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
            >
              <ToggleSlider $isUltra={tier === "ultra"} $cycle={billingCycle} />
              <ToggleDivider />
              <ToggleOption $active={billingCycle === "monthly"}>
                щомісячна
              </ToggleOption>
              <ToggleOption $active={billingCycle === "yearly"}>
                річна
                <SavingsBadge>
                  -{tier === "plus" ? "59.98" : "49.98"}грн
                </SavingsBadge>
              </ToggleOption>
            </ToggleContainer>

            <VipButton>
              {tier === "plus"
                ? billingCycle === "monthly"
                  ? "29,99грн / 30 днів"
                  : "299,99грн / 360днів"
                : billingCycle === "monthly"
                  ? "49,99грн / 30 днів"
                  : "549,99грн / 360 днів"}
            </VipButton>
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
                <div ref={bottomRef} style={{ height: "40px" }} />
              </>
            )}
          </VipFixScroll>
        </VipBlock>
        <RedLine />
        <VipWarning>
         Усі примітки, розміщені в навчанні, кнопка ? вгорі.
        </VipWarning>
        <ViWarning>.</ViWarning>
      </VipModalDiv>

      <MobileStickyNav onClick={(e) => e.stopPropagation()}>
        <MobileNavBtn onClick={() => scrollToSection(aiRef)}>
          <span>🤖</span>
          <span>ШІ</span>
        </MobileNavBtn>
        <MobileNavBtn onClick={() => scrollToSection(musicRef)}>
          <span>🎨</span>
          <span>Музика</span>
        </MobileNavBtn>
        <MobileNavBtn onClick={() => scrollToSection(economicsRef)}>
          <span>🧧</span>
          <span>Економіка</span>
        </MobileNavBtn>
        <MobileNavBtn onClick={() => scrollToSection(interfaceRef)}>
          <span>📱</span>
          <span>Інтерфейс</span>
        </MobileNavBtn>
        <MobileNavBtn onClick={() => scrollToSection(bottomRef)}>
          <span>⬇️</span>
          <span>Дно</span>
        </MobileNavBtn>
        <MobileNavBtn onClick={() => scrollToSection(topRef)}>
          <span>🔝</span>
          <span>Набори</span>
        </MobileNavBtn>
      </MobileStickyNav>
    </Overlay>
  );
};

export default VipModal;
