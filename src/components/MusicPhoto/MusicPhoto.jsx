import styled, { keyframes, css } from "styled-components";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import localforage from "localforage";
import { motion, AnimatePresence} from "framer-motion"
import dinofrozVideo from "../../mp3/dinofroz.mp4";
import soloveyko from "../../photos/vip-images/vip-soloveyko.webp";
import harmony from "../../photos/vip-images/asium/asium.webp";
import horse from "../../photos/vip-images/horse/horse.webp";
import theorytwo from "../../photos/fan-art/theorytwo.webp";
import fingerdash from "../../photos/vip-images/dinofroz/fingerdash.webp";
import humorVideo from "../../mp3/humor.mp4"
import humorAudio from "../../mp3/humor.mp3"
import electrodynamix from "../../photos/vip-images/electrodynamix.webp";
//Desert
import desert from "../../photos/vip-images/desert/vip-desert.webp";
import deserttwo from "../../photos/vip-images/desert/deserttwo.webp";
import desertthree from "../../photos/vip-images/desert/desertthree.webp";
import desertfour from "../../photos/vip-images/desert/desertfour.webp";
import desertone from "../../photos/vip-images/desert/desertone.webp";
import unity from "../../photos/fan-art/unity.webp";
import mecha from "../../photos/vip-images/mechannic.webp";
import monody from "../../photos/fan-art/monody.webp";
// import christmas from "../../photos/vip-images/christmas.webp";
import clubstep from "../../photos/fan-art/clubstep.webp";
import turkeys from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
//Horses
import horsethree from "../../photos/vip-images/horse/horsethree.webp";
import horsetwo from "../../photos/vip-images/horse/horsetwo.webp";
import chess from "../../photos/vip-images/horse/chess.webp";
//Turkeys
import turkeytwo from "../../photos/vip-images/turkeys/turkeytwo.webp";
import turkeythree from "../../photos/vip-images/turkeys/turkeysthree.webp";
import turkeyfour from "../../photos/vip-images/turkeys/turkeysfour.webp";
import turkeyfive from "../../photos/vip-images/turkeys/turkeysfive.webp";
import turkeysix from "../../photos/vip-images/turkeys/turkeyssix.webp";
import turkeysone from "../../photos/vip-images/turkeys/turkeysone.webp";
import turkeyseven from "../../photos/vip-images/turkeys/turkeysseven.webp";
//Asium
import asiumnine from "../../photos/vip-images/asium/vip-forest.webp";
import asiumone from "../../photos/vip-images/asium/asiumone.webp";
import asiumtwo from "../../photos/vip-images/asium/asiuntwo.webp";
import asiumthree from "../../photos/vip-images/asium/asiumthree.webp";
import asiumfour from "../../photos/vip-images/asium/asiumfour.webp";
import asiumfive from "../../photos/vip-images/asium/asiumfive.webp";
import asiumsix from "../../photos/vip-images/asium/asiumsix.webp";
import asiumten from "../../photos/vip-images/asium/asiumeleven.webp";
import asiumeleven from "../../photos/vip-images/asium/asiumtwelve.webp";
import asiumseven from "../../photos/vip-images/asium/asiumseven.webp";
//Swamp
import swamptwo from "../../photos/vip-images/swamp/swamptwo.webp";
import swampthree from "../../photos/vip-images/swamp/swampthree.webp";
import swampfour from "../../photos/vip-images/swamp/swampfour.webp";
import swampfive from "../../photos/vip-images/swamp/swampfive.webp";
import swampsix from "../../photos/vip-images/swamp/swampsix.webp";
import swampseven from "../../photos/vip-images/swamp/seampseven.webp";
import swampeight from "../../photos/vip-images/swamp/swampeight.webp";
import swampnine from "../../photos/vip-images/swamp/swampnine.webp";
import theory from "../../photos/fan-art/theory.webp";
import deadlocked from "../../photos/vip-images/swamp/deadlocked.webp";
//Horror
import horrortwo from "../../photos/vip-images/horror/horrortwo.webp";
import horrorthree from "../../photos/vip-images/horror/horrorthree.webp";
import horrorfour from "../../photos/vip-images/horror/horrorfour.webp";
import horrorfive from "../../photos/vip-images/horror/horrorfive.webp";
import horror from "../../photos/vip-images/horror/horror.webp";
import horrorsix from "../../photos/vip-images/horror/horrorsix.webp";
import horrorseven from "../../photos/vip-images/horror/horrorseven.webp";
import horroreight from "../../photos/vip-images/horror/horroreight.webp";
//Динофроз
import dinofrozone from "../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofrozthree from "../../photos/vip-images/dinofroz/dinofrozthree.webp";
import dinofrozfour from "../../photos/vip-images/dinofroz/dinofrozfour.webp";
import dinofrozfive from "../../photos/vip-images/dinofroz/dinofrozfive.webp";
import dinofrozsix from "../../photos/vip-images/dinofroz/dinofrozsix.webp";
import dinofrozseven from "../../photos/vip-images/dinofroz/dinofrozseven.webp";
import dinofrozeight from "../../photos/vip-images/dinofroz/dinofrozeight.webp";
import dinofroztwo from "../../photos/vip-images/dinofroz/vip-dragons.webp";
import dinofroznine from "../../photos/vip-images/dinofroz/dinofroznine.webp";
//Mia and me
import domino from "../../mp3/dominos-shop.mp3"
import hunger from "../../photos/hero-header/hunger.webp";
import mia from "../../photos/vip-images/mia/miaandme.webp";
//import christmasAudio from "../../mp3/kolada.mp3";
import dinofrozAudio from "../../mp3/dinofroz.mp3";
import turkeyAudio from "../../mp3/turkeys.mp3";
import monodyAudio from "../../mp3/thefatrat-monody.mp3";
import windAudio from "../../mp3/kolada.mp3";
import unityAudio from "../../mp3/unity.mp3";
import horseAudio from "../../mp3/horse.mp3";
import hungerAudio from "../../mp3/thefatrat-hunger.mp3";
import dragonoraAudio from "../../mp3/dragon.mp3";
import soloveykoAudio from "../../mp3/soloveyko.mp3";
import harmonyAudio from "../../mp3/harmonic-japan.mp3";
import electrodynamixAudio from "../../mp3/electrodynamix.mp3";
import clubstepAudio from "../../mp3/clubstep.mp3";
import fingerbang from "../../mp3/mdk-fingerbang-full.mp3";
import theorytwoAudio from "../../mp3/theoty-of-everything-ll.mp3";
import theoryAudio from "../../mp3/theory-of-everyting.mp3";
import deadlockedAudio from "../../mp3/deadlocked.mp3";
import mechaAudio from "../../mp3/mechanik-kindom.mp3";
const slideIn = keyframes`
  0% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
  100% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
`;
const slideOut = keyframes`
  0% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
  100% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
`;
const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
const pulseRedBorder = keyframes`
  0% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
  50% { border-color: #ff4d4d; box-shadow: 0 0 15px #ff0000; }
  100% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
`;
const flickerAnimation = keyframes`
  0% { opacity: 0.4; }
  100% { opacity: 1; }
`;
const chaosAnimation = keyframes`
  0% { background-color: rgba(255, 0, 0, var(--chaos-opacity)); }      /* червоний */
  10% { background-color: rgba(255, 255, 0, var(--chaos-opacity)); }    /* жовтий */
  20% { background-color: rgba(255, 165, 0, var(--chaos-opacity)); }    /* оранжевий */
  30% { background-color: rgba(139, 69, 19, var(--chaos-opacity)); }    /* коричневий */
  40% { background-color: rgba(0, 255, 0, var(--chaos-opacity)); }      /* зелений */
  50% { background-color: rgba(0, 255, 255, var(--chaos-opacity)); }    /* голубий */
  60% { background-color: rgba(0, 0, 255, var(--chaos-opacity)); }      /* синій */
  70% { background-color: rgba(255, 255, 255, var(--chaos-opacity)); }    /* білий */
  80% { background-color: rgba(128, 0, 128, var(--chaos-opacity)); }    /* фіолетовий */
  90% { background-color: rgba(128, 128, 128, var(--chaos-opacity)); }  /* чорнобілий (сірий) */
  100% { background-color: rgba(255, 0, 0, var(--chaos-opacity)); }
`;
const ultrachaosAnimation = keyframes`
  0% { background-position: 0% 0%; filter: hue-rotate(0deg) contrast(1.2); }
  25% { background-position: 100% 0%; filter: hue-rotate(90deg) contrast(1.4); }
  50% { background-position: 100% 100%; filter: hue-rotate(180deg) contrast(1.2); }
  75% { background-position: 0% 100%; filter: hue-rotate(270deg) contrast(1.4); }
  100% { background-position: 0% 0%; filter: hue-rotate(360deg) contrast(1.2); }
`;
const oldFilmNoise = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;
const oldFilmShake = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0, 0); }
`;
const cinemascopeTop = keyframes`
  from { height: 0; }
  to { height: 12%; }
`;
const cinemascopeBottom = keyframes`
  from { height: 0; }
  to { height: 12%; }
`;
const symbolAnimation = keyframes`
  0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
  20% { opacity: 0.5; }
  50% { transform: translate(calc(-50% + var(--end-x, 0px)), calc(-50% + var(--end-y, 0px))) scale(var(--pulse-scale, 1)); }
  80% { opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
`;
const fireworkAnimation = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(0.1); 
    opacity: 1; 
  }
  40% { 
    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1); 
    opacity: 1;
  }
  70% {
    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y) + 30px)) scale(1);
    opacity: 1;
  }
  100% { 
    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y) + 120px)) scale(0); 
    opacity: 0;
  }
`;
const seekAnimation = keyframes`
  0% { opacity: 0; background-color: rgba(255, 255, 255, 0); }
  30% { opacity: 1; background-color: rgba(255, 255, 255, 0.1); }
  100% { opacity: 0; background-color: rgba(255, 255, 255, 0); }
`;
const SeekIndicator = styled.div`
  position: absolute;
  top: 0;
  ${(props) => (props.$side === "left" ? "left: 0;" : "right: 0;")}
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2015;
  pointer-events: none;
  animation: ${seekAnimation} 0.8s ease-out forwards;
  color: white;
  .icon {
    font-size: 36px;
    margin-bottom: 5px;
  }
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`;
const LongPressBadge = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  z-index: 2020;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const blinkAnimation = keyframes`
  0% { opacity: var(--initial-opacity); }
  10% { opacity: 0.05; }
  20% { opacity: var(--initial-opacity); }
  30% { opacity: 0.05; }
  40% { opacity: var(--initial-opacity); }
  50% { opacity: 0.05; }
  60% { opacity: var(--initial-opacity); }
  70% { opacity: 0.05; }
  80% { opacity: var(--initial-opacity); }
  90% { opacity: 0.05; }
  100% { opacity: var(--initial-opacity); }
`;
const MusicPhotoDiv = styled.div`
  background: #e8e8e8;
  border-radius: 20px;
  margin-top: 15px;
  padding: 5px;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${(props) =>
    props.$isAudioBarActive &&
    css`
      height: 55vh;
      max-height: 420px;
      overflow-y: auto;
      width: 98%;
      margin: 10px auto 90px auto;
      border: 3px solid orange;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: orange;
        border-radius: 3px;
      }
    `}

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;
const MusicPhotoFix = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;
const MusicPhotoText = styled.div`
  font-size: 17px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 25px;
  }
`;
const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
  padding: 0 10px;
`;
const SearchInput = styled.input`
  width: 100%;
  max-width: 250px;
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 13px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;
const SortSelect = styled.select`
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 13px;
  font-family: var(--font-family);
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;
const PlaylistGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 5px;
`;
const PlaylistCard = styled.div`
  width: 320px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  background: #fff;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
  }
`;
const PlaylistImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;
const PlaylistTitle = styled.div`
  color: #333;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 308px;
  height: 326px;
  background: #fff;
  border-radius: 15px;
  padding-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  border: ${(props) =>
    props.$rating === 2
      ? "2px solid #ff0000"
      : props.$rating === 1
        ? "2px solid orange"
        : "none"};
  animation: ${(props) =>
    props.$rating === 2
      ? css`
          ${pulseRedBorder} 2s infinite
        `
      : "none"};
  &:hover {
    transform: translateY(-5px);
  }
`;
const LyricsModalImage = styled.img`
  width: calc(100% + 20px);
  margin: -10px -10px 15px -10px;
  border-radius: 15px 15px 0 0;
  position: sticky;
  top: -10px;
  z-index: 10;
  background: white;
  display: block;
  object-fit: cover;
  max-height: 250px;
`;
const MusicImageContainer = styled.div`
  position: relative;
  width: 308px;
  height: 183px;
  border-radius: 15px 15px 0 0;
  background-color: #a5a5a5;
  overflow: hidden;
  flex-shrink: 0;
`;
const MusicImage = styled.img`
  width: 308px;
  height: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
  &::after {
    content: "▶";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.7;
  }
`;
const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  font-size: 20px;
  color: ${(props) =>
    props.$rating === 2 ? "gold" : props.$rating === 1 ? "red" : "#ccc"};
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
    background: white;
  }
`;

const MusicText = styled.div`
  color: #333;
  text-align: center;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  width: 100%;
  margin-top: 10px;
  padding: 0 8px;
  line-height: 1.4;
  height: 108px;
  overflow: hidden;
  box-sizing: border-box;
`;

const AuthorText = styled.div`
  color: rgb(37, 37, 37);
  font-size: 9.5px;
  margin-top: 4px;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 0px;
  span {
    font-size: 10px;
    color: rgb(119, 119, 119);
    display: inline-block;
  }
  .icon {
    min-width: 15px;
  }
  .value {
    min-width: 28px;
    text-align: right;
    font-weight: bold;
  }
`;

const VolumeSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    ${(props) => props.$activeColor || "orange"} 0%,
    ${(props) => props.$activeColor || "orange"}
      ${(props) => props.value * 100 || 0}%,
    #444 ${(props) => props.value * 100 || 0}%,
    #444 100%
  );
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    transition: transform 0.1s;
  }
  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
  }
`;

const LoadMoreButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 110px;
  font-size: 19px;
  cursor: pointer;
  margin-top: 15px;
`;
const FilterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  transition:
    background-color ${(props) => (props.$type === "flash" ? "0.05s" : "0.5s")}
      ease,
    opacity 0.5s ease,
    backdrop-filter 0.5s ease,
    -webkit-backdrop-filter 0.5s ease;

  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  opacity: 1;
  /* Для плавності переходу структура функцій у backdrop-filter має бути незмінною */
  backdrop-filter: none;
  -webkit-backdrop-filter: none;

  ${(props) =>
    props.$active &&
    css`
      /* Колірна складова та затемнення (Black) */
      ${props.$type === "red" &&
      `background-color: rgba(255, 0, 0, ${props.$opacity});`}
      ${props.$type === "purple" &&
      `background-color: rgba(128, 0, 128, ${props.$opacity});`}
      ${props.$type === "green" &&
      `background-color: rgba(0, 255, 0, ${props.$opacity});`}
      ${props.$type === "blue" &&
      `background-color: rgba(0, 0, 255, ${props.$opacity});`}
      ${props.$type === "black" &&
      `background-color: rgba(0, 0, 0, ${props.$opacity});`}
      ${props.$type === "orange" &&
      `background-color: rgba(230, 149, 0, ${props.$opacity});`}
      ${props.$type === "cyan" &&
      `background-color: rgba(0, 255, 255, ${props.$opacity});`}
      ${props.$type === "brown" &&
      `background-color: rgba(139, 69, 19, ${props.$opacity});`}
      ${props.$type === "white" &&
      `background-color: rgba(255, 255, 255, ${props.$opacity});`}
      ${props.$type === "image" &&
      css`
        background-image: url(${props.$imageUrl});
        background-size: cover;
        background-position: center;
        background-color: transparent;
        opacity: ${props.$opacity || 1};
      `}
      ${(props.$type === "flash" ||
        props.$type === "flicker" ||
        props.$flicker) &&
      css`
        background-color: rgba(255, 255, 255, ${props.$opacity});
      `}
      ${props.$type === "vignette" &&
      css`
        background: radial-gradient(
          circle,
          transparent 40%,
          rgba(0, 0, 0, ${props.$opacity || 0.8}) 100%
        );
      `}
      ${props.$type === "cinemascope" &&
      css`
        &::before,
        &::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          background: black;
          z-index: 100;
        }
        &::before {
          top: 0;
          animation: ${cinemascopeTop} 1s ease forwards;
        }
        &::after {
          bottom: 0;
          animation: ${cinemascopeBottom} 1s ease forwards;
        }
      `}
      ${props.$type === "vintage" &&
      css`
        animation: ${oldFilmShake} 0.15s infinite;

        /* Вертикальні лінії (шум) */
        &::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 150px,
            rgba(255, 255, 255, 0.05) 150px,
            rgba(255, 255, 255, 0.05) 151px,
            transparent 151px,
            transparent 300px,
            rgba(0, 0, 0, 0.05) 300px,
            rgba(0, 0, 0, 0.05) 301px
          );
          background-size: 200% 100%;
          animation: ${oldFilmNoise} 0.2s steps(5) infinite;
          pointer-events: none;
          z-index: 5;
        }
      `}
      ${props.$type === "chaos" &&
      css`
        --chaos-opacity: ${props.$opacity || 0.4};
        animation: ${chaosAnimation} 1.5s linear infinite;
      `}
      ${props.$type === "ultrachaos" &&
      css`
        background: radial-gradient(
          circle at center,
          rgba(255, 0, 150, ${props.$opacity || 0.5}),
          rgba(0, 204, 255, ${props.$opacity || 0.5}),
          rgba(255, 255, 0, ${props.$opacity || 0.5}),
          rgba(0, 255, 0, ${props.$opacity || 0.5})
        );
        background-size: 300% 300%;
        animation: ${ultrachaosAnimation} 6s ease-in-out infinite;
        backdrop-filter: blur(2px) saturate(1.5);
      `}
      ${props.$type === "grayscale" &&
      css`
        background-color: rgba(119, 119, 119, ${props.$opacity * 0.2});
      `}
      ${props.$type === "flicker" &&
      css`
        animation: ${flickerAnimation} 0.1s infinite alternate;
      `}

    `}
`;

const StyledSymbol = styled.span`
  position: absolute;
  color: rgba(255, 255, 255, 0.91);
  pointer-events: none;
  user-select: none;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
  animation: ${(props) =>
    props.$variation === "firework"
      ? css`
          ${fireworkAnimation} ${props.$duration}s ease-out forwards
        `
      : css`
          ${symbolAnimation} ${props.$duration}s ease-in-out infinite, ${blinkAnimation} 3s ease-in-out ${Math.max(
            0,
            props.$duration - 3,
          )}s infinite
        `};

  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  font-size: ${(props) => props.$size}px;
  opacity: ${(props) => props.$opacity};
  --initial-opacity: ${(props) => props.$opacity};

  --end-x: ${(props) => props.$moveX || 0}px;
  --end-y: ${(props) => props.$moveY || 0}px;
  --pulse-scale: ${(props) => 1 + props.$volume * 0.4};

  filter: blur(${(props) => props.$blur || 0}px);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.6); /* Стійкість до світлих фонів */
`;

const musicSymbols = ["♫"];

const SymbolOverlay = ({
  count = 50,
  volume = 1,
  speed = 0,
  blur = 0,
  isExiting = false,
  variation = "default",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const symbols = useMemo(() => {
    const isFirework = variation === "firework";
    let multiplier = 1;
    if (windowWidth < 480) {
      multiplier = 0.3; 
    } else if (windowWidth < 1024) {
      multiplier = 0.6; 
    }
    const realCount = isFirework ? 6 : Math.max(1, Math.floor(count * multiplier));
    return Array.from({ length: realCount }).map((_, i) => {
      const r1 = Math.random();
      const r2 = Math.random();
      let top = r2 * 100;
      let left = r1 * 100;
      let moveX = speed > 0 ? (r1 - 0.5) * 200 * speed : 0;
      let moveY = speed > 0 ? (r2 - 0.5) * 200 * speed : 0;
      let duration = 2 + Math.random() * 4;
      if (isFirework) {
        top = 50;
        left = 50;
        const angle = i * (360 / 6) * (Math.PI / 180);
        const dist = 120 + Math.random() * 60;
        moveX = Math.cos(angle) * dist;
        moveY = Math.sin(angle) * dist;
        duration = 1.8 + Math.random() * 0.4;
      }

      return {
        key: i,
        char: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
        top,
        left,
        size: isFirework ? 40 : 30 + Math.random() * 30,
        opacity: isFirework ? 1 : 0.2 + Math.random() * 0.3,
        duration,
        moveX,
        moveY,
        blur: blur > 0 ? Math.random() * blur : 0,
      };
    });
  }, [count, speed, blur, variation, windowWidth]);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: isExiting ? 0 : isMounted ? 1 : 0,
        transition: "opacity 1s ease-out",
        zIndex: 20 /* Вище за фільтри для стійкості */,
      }}
    >
      {symbols.map((s) => (
        <StyledSymbol
          key={s.key}
          $top={s.top}
          $left={s.left}
          $size={s.size}
          $opacity={s.opacity}
          $duration={s.duration}
          $moveX={s.moveX}
          $moveY={s.moveY}
          $volume={volume}
          $blur={blur}
          $variation={variation}
        >
          {s.char}
        </StyledSymbol>
      ))}
    </div>
  );
};
const SeekBar = styled.input`
  flex-grow: 1;
  height: 5px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => (props.value / props.max) * 100 || 0}%,
    rgba(255, 255, 255, 0.3) ${(props) => (props.value / props.max) * 100 || 0}%,
    rgba(255, 255, 255, 0.3)
      ${(props) => ((props.$buffered || 0) / props.max) * 100}%,
    rgba(255, 255, 255, 0.1)
      ${(props) => ((props.$buffered || 0) / props.max) * 100}%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  transition: height 0.1s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: red;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
  &:hover {
    height: 8px;
  }
`;

const StereoSeekBar = styled.div`
  flex-grow: 1;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5px;
  overflow: hidden;
  border-radius: 4px;
  padding: 0 4px;
`;

const StereoChannel = styled.div`
  flex: 1;
  height: ${(props) => Math.max(15, props.$height * 100)}%;
  background: ${(props) =>
    props.$active ? "orange" : "rgba(255, 255, 255, 0.25)"};
  border-radius: 1px;
  transition: background 0.2s ease;
`;

const SpeedSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    ${(props) => props.$activeColor || "orange"} 0%,
    ${(props) => props.$activeColor || "orange"}
      ${(props) => ((props.value - 0.2) / 1.8) * 100 || 0}%,
    #ccc ${(props) => ((props.value - 0.2) / 1.8) * 100 || 0}%,
    #ccc 100%
  );
  border-radius: 2px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }
`;

const SeekAmountSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => ((props.value - 5) / 15) * 100}%,
    #ccc ${(props) => ((props.value - 5) / 15) * 100}%,
    #ccc 100%
  );
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: orange;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transform: scale(1.2);
  }
`;

const LoopButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "skyblue" : "orange")};
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 5px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
  padding: 0 8px;
`;
const ActionButton = styled.button`
  background: transparent;
 border: none;
  border-radius: 5px;
  transition: color 0.6s;
   color: skyblue;
  width: 34px;
  padding: 3px 9px;
  font-size: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #ff4000;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #333;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} forwards;
`;

const LyricsModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  max-width: 320px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
`;

const PlaylistModalContent = styled.div`
  background: #e8e8e8;
  padding: 10px;
  border-radius: 15px;
  width: 95%;
  max-width: 1800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #dcdcdc;
  }
`;

const LyricsCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #ffb36c;
  }
`;

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 2000;
  display: ${(props) => (props.$closing ? "none" : "flex")};
  flex-direction: column;
  animation: ${(props) => (props.$closing ? slideOut : slideIn)} 0.3s ease-out
    forwards;

  @media screen and (orientation: portrait) {
    width: 100vh;
    height: 100vw;
    transform: rotate(90deg);
    top: 50%;
    left: 50%;
    transform-origin: center;
    translate: -50% -50%;
    animation: none;
  }
`;

const MiniPlayerContainer = styled.div`
  position: fixed;
  z-index: 3500;
  background: black;
  border: 2px solid orange;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
  min-width: 100px;
  min-height: 80px;
  touch-action: none;
`;

const MiniPlayerHeader = styled.div`
  height: 24px;
  background: #1a1a1a;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  gap: 8px;
`;

const MiniControlBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
  padding: 1px;
  display: flex;
  align-items: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    color: orange;
  }
`;

const MiniResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, orange 50%);
  z-index: 3010;
`;

const AudioBarContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #111;
  border-top: 2px solid orange;
  z-index: 5000;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 5px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.5);
  color: white;
  font-family: sans-serif;
  @media (max-width: 768px) {
    height: auto;
    flex-wrap: wrap;
  }
`;

const AudioBarBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: all 0.2s;
  &:hover { opacity: 1; color: orange; }
`;

const AudioBar = ({ track, initialTime, isPlaying: startPlaying, volume: startVolume, speed: startSpeed, onClose, onRestore, checkpoint, checkpointsEnabled, onSaveCheckpoint, onClearCheckpoint }) => {
  const [isPlaying, setIsPlaying] = useState(startPlaying);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(startVolume);
  const [speed, setSpeed] = useState(startSpeed);
  const [mode, setMode] = useState("linear"); // "linear" або "stereo"
  const [waveform, setWaveform] = useState([]);
  const [isGeneratingWave, setIsGeneratingWave] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pipWindow, setPipWindow] = useState(null);
  const mediaRef = useRef(null);
  const containerRef = useRef(null);

  const progRef = useRef(currentTime);
  const durRef = useRef(duration);
  useEffect(() => { progRef.current = currentTime; }, [currentTime]);
  useEffect(() => { durRef.current = duration; }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (onSaveCheckpoint && progRef.current > 5 && progRef.current < durRef.current - 5) {
        onSaveCheckpoint(track.id, progRef.current);
      }
    };

    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (checkpointsEnabled && checkpoint && Math.abs(currentTime - checkpoint) < 1.5) {
      onClearCheckpoint(track.id);
    }
  }, [currentTime, checkpoint, track.id, checkpointsEnabled, onClearCheckpoint]);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const toggleDocumentPiP = async () => {
    if (pipWindow) {
      pipWindow.close();
      return;
    }

    if ("documentPictureInPicture" in window) {
      try {
        const pip = await window.documentPictureInPicture.requestWindow({
          width: 800,
          height: 100,
        });

        // Копіюємо стилі з основного вікна
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
            const style = document.createElement("style");
            style.textContent = cssRules;
            pip.document.head.appendChild(style);
          } catch (e) {}
        });

        // Переносимо контент (React Portal або переміщення вузла)
        pip.document.body.appendChild(containerRef.current);
        setPipWindow(pip);
        
        pip.addEventListener("pagehide", () => {
          setPipWindow(null);
          document.body.appendChild(containerRef.current);
        });
      } catch (err) {
        console.error("PiP failed", err);
      }
    } else {
      alert("Ваш браузер не підтримує винесення інтерфейсу на робочий стіл.");
    }
  };

  const isVideo = !!track.video;

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = initialTime;
      mediaRef.current.volume = volume;
      mediaRef.current.playbackRate = speed;
    }
  }, [track.id, initialTime, volume, speed]);

  useEffect(() => {
    if (mode !== "stereo") return;
    let isCancelled = false;
    const generateWave = async () => {
      setIsGeneratingWave(true);
      try {
        const url = isVideo ? track.video : track.audio;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        if (isCancelled) return;
        const rawData = audioBuffer.getChannelData(0);
        const samples = 150;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        setWaveform(filteredData.map(n => n * multiplier));
      } catch (e) { console.error("Waveform error:", e); }
      finally { setIsGeneratingWave(false); }
    };
    generateWave();
    return () => { isCancelled = true; };
  }, [mode, track.audio, track.video, isVideo]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleStereoSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    if (mediaRef.current) {
      mediaRef.current.currentTime = p * duration;
    }
  };

  return (
    <AudioBarContainer
      ref={containerRef}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <span style={{ fontSize: "9.5px", fontWeight: "bold", color: "orange", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.author}</span>
        <span style={{ fontSize: "8px", color: "#888" }}>{track.text?.slice(0, 190)}.</span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <AudioBarBtn 
          onClick={() => { 
            if (mediaRef.current) mediaRef.current.currentTime = 0; 
          }} 
          title="На початок"
        >
          ⇤
        </AudioBarBtn>
        <AudioBarBtn onClick={() => mediaRef.current.currentTime -= 10} title="Назад 10с" style={{ fontSize: "8px" }}>◀◀</AudioBarBtn>
        <AudioBarBtn onClick={() => {
          if (isPlaying) { mediaRef.current.pause(); setIsPlaying(false); }
          else { mediaRef.current.play(); setIsPlaying(true); }
        }}>{isPlaying ? "⏸" : "▶"}</AudioBarBtn>
        <AudioBarBtn onClick={() => mediaRef.current.currentTime += 10} title="Вперед 10с" style={{ fontSize: "8px" }}>▶▶</AudioBarBtn>
        <AudioBarBtn 
          onClick={() => { 
            if (mediaRef.current) mediaRef.current.currentTime = duration - 1; 
          }} 
          title="В самий кінець"
        >
          ⇥
        </AudioBarBtn>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "10px" }}>
        <span style={{ fontSize: "10px" }}>⚡</span>
        <SpeedSlider type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: "40px" }} />
        <span style={{ fontSize: "10px", width: "22px" }}>{speed}x</span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {checkpointsEnabled && checkpoint > 0 && (
            <AudioBarBtn onClick={() => mediaRef.current.currentTime = checkpoint} title="До чекпоінту">🚩</AudioBarBtn>
          )}
        </div>
        <span style={{ fontSize: "11px", minWidth: "35px" }}>{formatTime(currentTime)}</span>
        {mode === "linear" ? (
          <SeekBarWrapper style={{ flex: 1 }}>
             {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
                <CheckpointMarker 
                  $left={(checkpoint / duration) * 100}
                  title="Ви тут зупинилися"
                  style={{ fontSize: '10px' }}
                >
                  🚩
                </CheckpointMarker>
              )}
            <SeekBar 
              type="range" min="0" max={duration || 0} value={currentTime} 
              onChange={(e) => mediaRef.current.currentTime = e.target.value} 
              style={{ width: '100%' }}
            />
          </SeekBarWrapper>
        ) : (
          <StereoSeekBar onClick={handleStereoSeek} style={{ height: "30px" }}>
            {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
              <CheckpointMarker 
                $left={(checkpoint / duration) * 100} 
                style={{ bottom: 'auto', top: '-10px', fontSize: '10px' }}
                title="Ви тут зупинилися"
              >
                🚩
              </CheckpointMarker>
            )}
            {isGeneratingWave ? (
              <span style={{ color: "white", fontSize: "10px", margin: "auto" }}>Обробка...</span>
            ) : (
              waveform.map((height, i) => (
                <StereoChannel key={i} $height={height} $active={(currentTime / duration) * 100 > (i / waveform.length) * 100} />
              ))
            )}
          </StereoSeekBar>
        )}
        <span style={{ fontSize: "11px", minWidth: "35px" }}>{formatTime(duration)}</span>
        <AudioBarBtn title="Перемикач на стереограму" onClick={() => setMode(mode === "linear" ? "stereo" : "linear")}>📊</AudioBarBtn>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ fontSize: "12px" }}>🔊</span>
        <VolumeSlider type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} style={{ width: "60px" }} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <AudioBarBtn onClick={() => onRestore(currentTime, isPlaying, volume, speed)} title="Розгорнути">⏶</AudioBarBtn>
        {!isMobile && "documentPictureInPicture" in window && (
          <AudioBarBtn onClick={toggleDocumentPiP} title="Винести на робочий стіл">🖼️</AudioBarBtn>
        )}
        <AudioBarBtn onClick={onClose} title="Закрити">✕</AudioBarBtn>
      </div>

      {track.video ? (
        <video 
          ref={mediaRef} 
          src={track.video} 
          autoPlay={isPlaying} 
          hidden 
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} 
          onLoadedMetadata={(e) => setDuration(e.target.duration)} 
          onEnded={() => setIsPlaying(false)}
        />
      ) : (
        <audio 
          ref={mediaRef} 
          src={track.audio} 
          autoPlay={isPlaying} 
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} 
          onLoadedMetadata={(e) => setDuration(e.target.duration)} 
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </AudioBarContainer>
  );
};

const MiniPlayer = ({
  track,
  initialTime,
  isPlaying: initialPlaying,
  speed: startSpeed,
  volume: startVolume,
  checkpoint,
  checkpointsEnabled,
  onSaveCheckpoint,
  onClearCheckpoint,
  onClose,
  onRestore,
}) => {
  const getDefaultPos = () => ({
    x: Math.max(0, window.innerWidth - 320),
    y: Math.max(0, window.innerHeight - 220),
  });
  const [pos, setPos] = useState(getDefaultPos());
  const [size, setSize] = useState({ width: 300, height: 180 });
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(startVolume);
  const [speed] = useState(startSpeed);
  const mediaRef = useRef(null);
  const isDinofroz = !!track.video;

  const progRef = useRef(currentTime);
  const durRef = useRef(duration);
  useEffect(() => { progRef.current = currentTime; }, [currentTime]);
  useEffect(() => { durRef.current = duration; }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (onSaveCheckpoint && progRef.current > 5 && progRef.current < durRef.current - 5) {
        onSaveCheckpoint(track.id, progRef.current);
      }
    };
    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (checkpointsEnabled && checkpoint && Math.abs(currentTime - checkpoint) < 1.5) {
      onClearCheckpoint(track.id);
    }
  }, [currentTime, checkpoint, track.id, checkpointsEnabled, onClearCheckpoint]);

  const handleError = useCallback(() => {
    alert("Помилка завантаження медіа в міні-плеєрі. Спробуйте ще раз.");
    setIsPlaying(false);
    mediaRef.current?.pause();
  }, []);

  useEffect(() => {
    setPos(getDefaultPos());
  }, [track.id]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "q" || e.key === "Q")) {
        e.preventDefault();
        setPos(getDefaultPos());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = initialTime;
      mediaRef.current.playbackRate = speed;
      mediaRef.current.volume = volume;
      if (isPlaying) {
        mediaRef.current.play().catch(() => {});
      } else {
        mediaRef.current.pause();
      }
    }
  }, [initialTime, isPlaying, speed, volume, track.id]);
  useEffect(() => {
    if ("mediaSession" in navigator && track) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: track.text || track.author || "Стихія",
        artist: track.author || "Stykhiya",
        album: track.category || "Music",
        artwork: [{ src: track.image, sizes: "512x512", type: "image/webp" }],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        mediaRef.current?.play();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        mediaRef.current?.pause();
        setIsPlaying(false);
      });
    }
  }, [track]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  const sliderImages = useMemo(() => {
    if (track.images && track.images.length > 0) {
      if (
        track.images[0] &&
        typeof track.images[0] === "object" &&
        "image" in track.images[0]
      ) {
        return track.images.map((item) => item.image);
      }
      return track.images;
    }
    return [track.image];
  }, [track]);

  const currentImgIdx = useMemo(() => {
    if (!sliderImages || sliderImages.length === 0) return 0;
    const segment = (duration || 1) / sliderImages.length;
    return Math.min(
      Math.floor(currentTime / segment),
      sliderImages.length - 1,
    );
  }, [sliderImages, currentTime, duration]);

  const getCurrentImageSrc = useCallback(
    (index) => {
      if (!sliderImages || !sliderImages[index]) return track.image;
      return sliderImages[index];
    },
    [sliderImages, track.image],
  );

  const canvasRef = useRef(null);
  const pipVideoRef = useRef(null);

  useEffect(() => {
    if (isDinofroz || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = getCurrentImageSrc(currentImgIdx);
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Inter, sans-serif";
      ctx.fillText(track.author || "Стихія", 15, canvas.height - 20);
    }; 
  }, [track, currentImgIdx, isDinofroz, getCurrentImageSrc, sliderImages]);
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const updateTime = () => setCurrentTime(media.currentTime);
    const updateDur = () => setDuration(media.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleErrorEvent = () => handleError();

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("loadedmetadata", updateDur);
    media.addEventListener("ended", handleEnded);
    media.addEventListener("error", handleErrorEvent);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("loadedmetadata", updateDur);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("error", handleErrorEvent);
    };
  }, [track, handleError]);

  const activeFilters = useMemo(() => {
    if (!track.filters) return [];
    return track.filters.filter(
      (f) => currentTime >= f.start && currentTime <= f.end,
    );
  }, [track.filters, currentTime]);
  const mainFilter = activeFilters.find(
    (f) => !["symbols", "flicker"].includes(f.type)
  ); 
  const handleDrag = (e) => {
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;
    const move = (me) => {
      let newX = me.clientX - startX;
      let newY = me.clientY - startY;
      const minX = -size.width + 50;
      const maxX = window.innerWidth - 50;
      const minY = 0;
      const maxY = window.innerHeight - 30;
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));
      setPos({ x: newX, y: newY });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const handleResize = (e) => {
    e.stopPropagation();
    const startW = size.width;
    const startH = size.height;
    const startX = e.clientX;
    const startY = e.clientY;
    const move = (me) => {
      setSize({
        width: Math.max(100, startW + (me.clientX - startX)),
        height: Math.max(80, startH + (me.clientY - startY)),
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const handlePiP = async () => {
    try {
      let elementToPip;
      if (isDinofroz && mediaRef.current) {
        elementToPip = mediaRef.current;
      } else if (canvasRef.current && pipVideoRef.current) {
        const stream = canvasRef.current.captureStream(30);
        pipVideoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          if (pipVideoRef.current.readyState >= 2) {
            resolve();
          } else {
            const handler = () => {
              if (pipVideoRef.current.readyState >= 2) {
                pipVideoRef.current.removeEventListener("canplay", handler);
                resolve();
              }
            };
            pipVideoRef.current.addEventListener("canplay", handler);
            setTimeout(resolve, 500);
          }
        });
        await pipVideoRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
        elementToPip = pipVideoRef.current; 
      }
      if (!elementToPip) {
        alert(
          "⚠️ Помилка: не можу знайти джерело для PiP. Переконайтеся, що медіа завантажено.",
        );
        return;
      }
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (elementToPip.requestPictureInPicture) {
        try {
          await elementToPip.requestPictureInPicture();
          console.log("✅ PiP активований успішно!");
        } catch (pipErr) {
          console.error("Помилка PiP:", pipErr);
          alert(`❌ Помилка PiP: ${pipErr.message || pipErr}`);
        }
      } else {
        alert(
          "⚠️ Ваш браузер не підтримує Picture-in-Picture режим. Спробуйте Chrome, Edge або Firefox.",
        );
      }
    } catch (err) {
      console.error("Загальна помилка режиму PiP:", err);
      alert(`❌ Помилка: ${err.message}`);
    }
  };

  return track ? (
    <MiniPlayerContainer
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      transition={{ duration: 0.3 }}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.width,
        height: size.height,
      }}
    >
      <MiniPlayerHeader onMouseDown={handleDrag}>
        <MiniControlBtn
          onClick={() => onRestore(currentTime, isPlaying, volume, speed)}
          title="Повернути у повний екран"
        >
          🔙 Відновити
        </MiniControlBtn>
        <MiniControlBtn
          onClick={handlePiP}
          title="Винести поверх усіх вікон (PiP)"
        >
          🖼️ PiP
        </MiniControlBtn>
        <MiniControlBtn onClick={onClose} title="Закрити">
          ✕
        </MiniControlBtn>
      </MiniPlayerHeader>
      <canvas
        ref={canvasRef}
        width="400"
        height="250"
        style={{ display: "none" }}
      />
      <video
        ref={pipVideoRef}
        muted
        playsInline
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "1px",
          height: "1px",
        }}
      />
      {/* Main content area for media */}
      <div
        style={{ flex: 1, position: "relative", overflow: "hidden" }}
        onClick={() => {
          setIsPlaying(!isPlaying);
          isPlaying ? mediaRef.current?.pause() : mediaRef.current?.play();
        }}
      >
        <FilterOverlay
          $active={!!mainFilter}
          $type={mainFilter?.type}
          $opacity={mainFilter?.opacity}
          $blur={mainFilter?.blur}
          $imageUrl={mainFilter?.imageUrl}
        />
        {isDinofroz ? (
          <video
            ref={mediaRef}
            src={track.video}
            autoPlay={isPlaying}
            muted={volume === 0}
            onError={handleError} 
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          />
        ) : (
          <>
            <img 
              src={getCurrentImageSrc(currentImgIdx)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
            <audio
              ref={mediaRef}
              src={track.audio}
              autoPlay={isPlaying}
              loop
              onError={handleError} // Pass handleError to audio
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            />
          </>
        )}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 17,
            color: "white",
            opacity: isPlaying ? 0 : 0.8,
          }}
        >
          ▶
        </div>
        {activeFilters.some((f) => f.type === "symbols") && (
          <SymbolOverlay
            count={9}
            volume={0.5}
            speed={1.5}
            variation={
              activeFilters.find((f) => f.type === "symbols")?.variation
            }
          />
        )}
      </div>
      <MiniResizeHandle onMouseDown={handleResize} />
    </MiniPlayerContainer>
  ) : null;
};

const FSHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2010;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
`;

const FSContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative; /* Ensure stacking context for children */
  align-items: center;
  position: relative;
  background: #000;
  width: 100%;
  height: 100%;
`;

const FSVisualWrapper = styled.div`
  width: 100%;
  position: relative; /* Establish stacking context for FilterOverlay */
  z-index: 1; /* Ensure it's below controls but above media */
  height: 100%;
  overflow: hidden;
`;

const FSVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
`;

const FSImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${(props) =>
    props.$animate
      ? css`
          ${appearKeyframe} 1s ease
        `
      : "none"};
`;

const appearKeyframe = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

const FSControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 0px 33px 3px 2px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2010;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? 0 : "20px")});
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
`;

const FSSliderContainer = styled.div`
  display: flex;
  gap: 7px;
  overflow-x: auto;
  padding: 5px 20px;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: orange;
  }
`;

const FSSliderImage = styled.img`
  height: 40px;
  width: 80px;
  object-fit: cover;
  border-radius: 6px;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
  border: ${(props) => (props.$active ? "2px solid orange" : "none")};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const FSTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 14px;
  max-width: 60vw;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

const GearModal = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: rgba(30, 30, 30, 0.95);
  padding: 2px;
  border-radius: 12px;
  color: white;
  width: 250px;
  z-index: 2020;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const SubtitleOverlay = styled.div`
  position: absolute;
  bottom: ${(props) =>
    props.$show ? (props.$controlsVisible ? "25%" : "1%") : "25%"};
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 13.5px;
  font-weight: bold;
  text-align: center;
  width: 80%;
  z-index: 2005;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 10px;
  border-radius: 20px;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition:
    opacity 0.3s,
    bottom 0.3s ease;
`;

const DownloadModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  z-index: 2030;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const PlaylistCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  z-index: 10;
  &:hover {
    color: #ffb36c;
  }
`;

const LyricsContainer = styled.div`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e0e0e0;
  text-align: left;
  color: #333;
  max-height: 900px;
  overflow-y: auto;
`;

const LyricsLine = styled.p`
  margin: 5px 0;
  transition:
    color 0.3s,
    font-weight 0.3s;
  color: ${(props) => (props.$active ? "orange" : "#333")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-weight: bold;
    font-size: 12px;
    color: black;
  }
  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: black;
  }
`;

const SliderItemWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  &:hover .slider-overlay {
    opacity: 1;
  }
`;

const CheckpointBadge = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffb36c;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: bold;
  z-index: 10;
  border: 1px solid #ffb36c;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;

  &::before {
    content: "Ви зупинилися тут";
    position: absolute;
    bottom: 130%;
    right: 50%;
    transform: translateX(50%) translateY(10px);
    background: #222;
    color: #ffb36c;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 9px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-out;
    border: 1px solid #ffb36c;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 179, 108, 0.2);
    box-shadow: 0 0 12px rgba(255, 179, 108, 0.6);
    color: #fff;

    &::before {
      opacity: 1;
      visibility: visible;
      transform: translateX(50%) translateY(0);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CheckpointMarker = styled.div`
  position: absolute;
  bottom: 100%;
  left: ${props => props.$left}%;
  transform: translateX(-50%);
  font-size: 14px;
  z-index: 10;
  pointer-events: none;
`;

const SliderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s;
`;

const SliderBtn = styled.button`
  background: #006eff;
  color: white;
  border: none;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
  &:hover {
    background: #d46000;
  }
`;

const PlaylistOverlay = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: rgba(30, 30, 30, 0.95);
  padding: 15px;
  border-radius: 12px;
  color: white;
  width: 300px;
  max-height: 60vh;
  overflow-y: auto;
  z-index: 2020;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: orange;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SeekBarWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  &:hover .seek-tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

const SeekTooltip = styled.div`
  position: absolute;
  bottom: 25px;
  left: ${(props) => props.$left}%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #444;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s,
    visibility 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2025;
  white-space: nowrap;

  img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    margin-bottom: 4px;
    border-radius: 4px;
    background: #000;
  }
  video {
    width: 100px;
    height: 60px;
    object-fit: cover;
    margin-bottom: 4px;
    border-radius: 4px;
    background: #000;
    display: block;
  }
  span {
    font-size: 12px;
    color: white;
    font-weight: bold;
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 2050;
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

const LyricsViewer = ({ lyrics, currentTime, voiceActingMode, trackText }) => {
  const activeLineIndex = useMemo(() => {
    if (!Array.isArray(lyrics)) return -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return -1;
  }, [lyrics, currentTime]);

  if (!Array.isArray(lyrics)) {
    return <>{lyrics || trackText || "Текст відсутній."}</>;
  }

  return (
    <div>
      {lyrics.map((line, index) => (
        <LyricsLine key={index} $active={index === activeLineIndex}>
          {voiceActingMode === "bbkids" && line.text_bbkids ? line.text_bbkids : line.text}
        </LyricsLine>
      ))}
    </div>
  );
};

const FullScreenPlayer = ({
  track,
  onClose,
  onNext,
  onPrev,
  rating,
  onRate,
  isShuffle,
  onSetShuffle,
  onAudioBar,
  onMiniPlayer,
  user,
  playlist,
  onSelectTrack,
  checkpoint,
  onSaveCheckpoint,
  onClearCheckpoint,
  checkpointsEnabled,
  onToggleCheckpoints,
  backgroundMode,
  onToggleBackgroundMode,
  onUpdateUser,
}) => {
  const isDinofroz = !!track.video;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(track.initialTime || 0);
  const [buffered, setBuffered] = useState(0);
  const [videoFrames, setVideoFrames] = useState([]);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [showFramesGallery, setShowFramesGallery] = useState(false);
  const [framesCount, setFramesCount] = useState(60);

  const [isFullscreenNative, setIsFullscreenNative] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [seekForwardAmount, setSeekForwardAmount] = useState(10);
  const [seekBackwardAmount, setSeekBackwardAmount] = useState(10);
  const [activeSeekIndicator, setActiveSeekIndicator] = useState(null);

  const handleError = useCallback(() => {
    alert("Помилка завантаження медіа. Спробуйте ще раз.");
    setIsPlaying(false);
    mediaRef.current?.pause();
  }, []);

  const updateProgress = useCallback(() => {
    const media = mediaRef.current;
    if (media && media.buffered.length > 0) {
      setBuffered(media.buffered.end(media.buffered.length - 1));
    }
  }, []);

  const [isSeekLoaded, setIsSeekLoaded] = useState(false);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadVolume = async () => {
      try {
        const savedVolume = await localforage.getItem("player_volume");
        if (savedVolume !== null) setVolume(savedVolume);
      } catch (e) {
        console.error("Error loading volume:", e);
      }
    };
    loadVolume();
  }, []);

  useEffect(() => {
    if (isAssetsLoaded) {
      localforage.setItem("player_volume", volume);
    }
  }, [volume, isAssetsLoaded]);

  // Функція для перемикання системного повноекранного режиму
  const toggleFullscreen = useCallback(() => {
    const elem = overlayRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }, []);

  // Слідкуємо за зміною стану повноекранного режиму (наприклад, при натисканні F11)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreenNative(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const [longPressSpeedIndicator, setLongPressSpeedIndicator] = useState(null); // Changed from dynamicSpeed to longPressSpeedIndicator
  const longPressTimerRef = useRef(null);
  const originalSpeedRef = useRef(null);
  const lastClickRef = useRef({ time: 0, side: null });

  useEffect(() => {
    const loadSeekSettings = async () => {
      try {
        const fwd = await localforage.getItem("seekForwardAmount");
        const bwd = await localforage.getItem("seekBackwardAmount");
        if (fwd !== null) setSeekForwardAmount(fwd);
        if (bwd !== null) setSeekBackwardAmount(bwd);
        setIsSeekLoaded(true);
      } catch (e) {
        console.error(e);
        setIsSeekLoaded(true);
      }
    };
    loadSeekSettings();
  }, []);

  useEffect(() => {
    if (isSeekLoaded) {
      localforage.setItem("seekForwardAmount", seekForwardAmount);
      localforage.setItem("seekBackwardAmount", seekBackwardAmount);
    }
  }, [seekForwardAmount, seekBackwardAmount, isSeekLoaded]);

  const triggerIndicator = useCallback((side, amount) => {
    setActiveSeekIndicator({ side, amount, key: Date.now() });
    setTimeout(() => setActiveSeekIndicator(null), 800);
  }, []);

  const [showSettings, setShowSettings] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showScreenshotMenu, setShowScreenshotMenu] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loop, setLoop] = useState(false);
  const [progressMode, setProgressMode] = useState("linear");
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [downloadRange, setDownloadRange] = useState({ start: 0, end: 0 });
  const [showControls, setShowControls] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [playMode, setPlayMode] = useState(0); // 0: Linear, 1: Shuffle, 2: Loop, 3: None
  const [hoverTime, setHoverTime] = useState(null);
  const [pendingScreenshotAction, setPendingScreenshotAction] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeFilterKey, setActiveFilterKey] = useState(null);
  const [filtersEnabled, setFiltersEnabled] = useState(true); // Режим вимкнення фільтрів
  const [dynamicOpacity, setDynamicOpacity] = useState(null);
  const [dynamicBlur, setDynamicBlur] = useState(null);
  const [dynamicColor, setDynamicColor] = useState(null);
  const [dynamicIntensity, setDynamicIntensity] = useState(null); // Changed from dynamicIntensity to dynamicSymbolIntensity
  const mediaRef = useRef(null);
  const [waveform, setWaveform] = useState([]);
  const [videoQuality, setVideoQuality] = useState("768з");

  useEffect(() => {
    const loadQuality = async () => {
      try {
        const q = await localforage.getItem("video_quality");
        if (q) setVideoQuality(q);
      } catch (e) { console.error(e); }
    };
    loadQuality();
  }, []);

  useEffect(() => {
    localforage.setItem("video_quality", videoQuality);
  }, [videoQuality]);

  const handleQualityChange = (q) => {
    const currentPos = mediaRef.current ? mediaRef.current.currentTime : progress;
    setVideoQuality(q);
    // Логіка для перемикання джерела, якщо воно з'явиться в об'єкті track
    if (mediaRef.current) {
      mediaRef.current.load();
      mediaRef.current.currentTime = currentPos;
      if (isPlaying) mediaRef.current.play().catch(() => {});
    }
  };

  const [isGeneratingWave, setIsGeneratingWave] = useState(false);
  const [isAutoSlideshow, setIsAutoSlideshow] = useState(false);
  const [autoSlideshowInterval, setAutoSlideshowInterval] = useState(3);
  //  const [selectedVoiceNarration, setSelectedVoiceNarration] = useState("off");
  const fsCanvasRef = useRef(null);
  const fsPipVideoRef = useRef(null);
  const lastActionRef = useRef(0);
  const ACTION_COOLDOWN = 300;
  const canPerformAction = useCallback(() => {
    const now = Date.now();
    if (now - lastActionRef.current < ACTION_COOLDOWN) return false;
    lastActionRef.current = now;
    return true;
  }, []);
  const togglePiP = useCallback(async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (mediaRef.current && isDinofroz) {
        await mediaRef.current.requestPictureInPicture();
        return;
      }

      let elementToPip;
      if (isDinofroz && mediaRef.current) {
        elementToPip = mediaRef.current;
      } else if (fsCanvasRef.current && fsPipVideoRef.current) {
        const stream = fsCanvasRef.current.captureStream(30);
        fsPipVideoRef.current.srcObject = stream;
        await fsPipVideoRef.current.play();
        elementToPip = fsPipVideoRef.current;
      }

      if (elementToPip && elementToPip.requestPictureInPicture) {
        await elementToPip.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP failed", error);
    }
  }, [isDinofroz]);
  const previewVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const activeFilters = useMemo(() => {
    if (!track.filters || !Array.isArray(track.filters)) return [];
    return track.filters.filter(
      (f) => progress >= f.start && progress <= f.end,
    );
  }, [track.filters, progress]);
  const mainFilter = useMemo(
    () => activeFilters.find((f) => !["symbols", "flicker"].includes(f.type)),
    [activeFilters],
  );
  const flickerFilter = useMemo(
    () => activeFilters.find((f) => f.type === "flicker"),
    [activeFilters],
  ); // Added filtersEnabled to dependencies
  const hasSymbols = useMemo(
    () => activeFilters.some((f) => f.type === "symbols"),
    [activeFilters],
  );
  useEffect(() => {
    if (filtersEnabled && mainFilter) {
      const key = `${mainFilter.start}-${mainFilter.end}`;
      if (key !== activeFilterKey) {
        setActiveFilterKey(key);
        if (mainFilter.isRandom) {
          const min = mainFilter.minOpacity || 0.15;
          const max = mainFilter.maxOpacity || 0.45;
          setDynamicOpacity(Math.random() * (max - min) + min);
        } else {
          setDynamicOpacity(null);
        }

        if (mainFilter.isRandomBlur) {
          const min = mainFilter.minBlur || 0;
          const max = mainFilter.maxBlur || 10;
          setDynamicBlur(Math.random() * (max - min) + min);
        } else {
          setDynamicBlur(null);
        }
        if (mainFilter.randomColor && mainFilter.colorOptions?.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * mainFilter.colorOptions.length,
          );
          setDynamicColor(mainFilter.colorOptions[randomIndex]);
        } else {
          setDynamicColor(null);
        }
      }
    } else {
      setActiveFilterKey(null);
      setDynamicOpacity(null);
      setDynamicBlur(null);
      setDynamicColor(null);
    }
  }, [mainFilter, activeFilterKey, filtersEnabled]);
  const [dynamicBlurSymbols] = useState(0);
  useEffect(() => {
    if (!filtersEnabled || progressMode !== "stereogram" || !isAssetsLoaded)
      return; // Added filtersEnabled
    if (!filtersEnabled || progressMode !== "stereogram" || !isAssetsLoaded)
      return; // Added filtersEnabled to dependencies
    let isCancelled = false;
    const generateWave = async () => {
      setIsGeneratingWave(true);
      try {
        const url = isDinofroz ? track.video || dinofrozVideo : track.audio;
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        if (isCancelled) return;
        const rawData = audioBuffer.getChannelData(0);
        const samples = 280;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];

        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }

        const multiplier = Math.pow(Math.max(...filteredData), -1);
        setWaveform(filteredData.map((n) => n * multiplier));
      } catch (err) {
        console.error("Waveform generation failed", err);
      } finally {
        setIsGeneratingWave(false);
      }
    };

    generateWave();
    return () => {
      isCancelled = true;
    };
  }, [
    track.id,
    track.audio,
    track.video,
    progressMode,
    isAssetsLoaded,
    isDinofroz,
    filtersEnabled,
  ]);

  // Обчислення фільтра (перенесено нижче оголошення mainFilter для уникнення ReferenceError)
  const mediaFilter = useMemo(() => {
    if (!filtersEnabled || !mainFilter) return "none";
    let filters = [];
    
    if (mainFilter.type === "grayscale" || mainFilter.grayscale) filters.push("grayscale(100%)");
    
    const blurVal = dynamicBlur !== null ? dynamicBlur : (mainFilter.type === "blur" ? mainFilter.opacity * 10 : (mainFilter.blur || 0));
    if (blurVal > 0) filters.push(`blur(${blurVal}px)`);
    
    if (mainFilter.type === "contrast") {
      const contrastVal = (dynamicOpacity !== null ? dynamicOpacity : mainFilter.opacity) * 2;
      filters.push(`contrast(${contrastVal})`);
    }
    
    if (mainFilter.type === "negative") filters.push("invert(100%)");
    if (mainFilter.type === "vintage") filters.push("sepia(0.8) contrast(1.2)");
    
    return filters.join(" ") || "none";
  }, [mainFilter, filtersEnabled, dynamicBlur, dynamicOpacity]);

  const lastSymbolFilter = useMemo(
    () =>
      filtersEnabled
        ? [...activeFilters].reverse().find((f) => f.type === "symbols")
        : null, // Added filtersEnabled
    [activeFilters, filtersEnabled],
  );
  const [activeSymbols, setActiveSymbols] = useState(null);
  const [shouldRenderSymbols, setShouldRenderSymbols] = useState(false);
  const [isSymbolsExiting, setIsSymbolsExiting] = useState(false);
  const [activeSymbolKey, setActiveSymbolKey] = useState(0);
  const [dynamicSpeed, setDynamicSpeed] = useState(5); // Changed from dynamicSpeed to dynamicSymbolSpeed
  useEffect(() => {
    // This useEffect will be modified to respect filtersEnabled
    if (filtersEnabled && lastSymbolFilter) {
      const key = `${lastSymbolFilter.start}-${lastSymbolFilter.end}`;
      if (key !== activeSymbolKey || isSymbolsExiting) {
        setActiveSymbolKey(key);
        setActiveSymbols(lastSymbolFilter);
        setShouldRenderSymbols(true);
        setIsSymbolsExiting(false);

        if (lastSymbolFilter.isRandomIntensity) {
          const min = lastSymbolFilter.minIntensity || 50;
          const max = lastSymbolFilter.maxIntensity || 200;
          setDynamicIntensity(
            Math.floor(Math.random() * (max - min + 1)) + min,
          );
        } else {
          setDynamicIntensity(null);
        } // Changed from dynamicIntensity to dynamicSymbolIntensity

        if (lastSymbolFilter.isRandomSpeed) {
          const min = lastSymbolFilter.minSpeed || 1;
          const max = lastSymbolFilter.maxSpeed || 5;
          setDynamicSpeed(Math.random() * (max - min) + min);
        } else {
          setDynamicSpeed(null);
        } // Changed from dynamicSpeed to dynamicSymbolSpeed
      }
    } else if (shouldRenderSymbols && !isSymbolsExiting) {
      setIsSymbolsExiting(true);
      const timer = setTimeout(() => {
        setShouldRenderSymbols(false);
        setIsSymbolsExiting(false);
        setActiveSymbols(null);
        setActiveSymbolKey(null);
        setDynamicIntensity(null); // Changed from dynamicIntensity to dynamicSymbolIntensity
        setDynamicSpeed(null);
      }, 1000);
      return () => clearTimeout(timer);
    } // Removed the activeSymbolKey check, filtersEnabled is the main gate
  }, [
    lastSymbolFilter,
    filtersEnabled,
    shouldRenderSymbols,
    isSymbolsExiting,
    activeSymbolKey,
  ]); // Added filtersEnabled to dependencies

  const sliderImages = useMemo(() => {
    // This useMemo will be modified to respect filtersEnabled
    if (track.images && track.images.length > 0) {
      if (
        track.images[0] &&
        typeof track.images[0] === "object" &&
        "image" in track.images[0]
      ) {
        return track.images.map((item) => item.image);
      }
      return track.images;
    }
    return [track.image, track.image, track.image];
  }, [track]); // No direct change needed here, but its usage will be conditional

  const handleClose = useCallback(() => {
    if (onSaveCheckpoint && progress > 5 && progress < duration - 5) {
      onSaveCheckpoint(track.id, progress);
    }
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, onSaveCheckpoint, track.id, progress, duration]);

  const progressRef = useRef(progress);
  const durationRef = useRef(duration);
  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { durationRef.current = duration; }, [duration]);

  useEffect(() => {
    const handleSave = () => {
      if (onSaveCheckpoint && progressRef.current > 5 && progressRef.current < durationRef.current - 5) {
        onSaveCheckpoint(track.id, progressRef.current);
      }
    };

    window.addEventListener("beforeunload", handleSave);
    return () => {
      handleSave();
      window.removeEventListener("beforeunload", handleSave);
    };
  }, [track.id, onSaveCheckpoint]);

  useEffect(() => {
    if (checkpointsEnabled && checkpoint && Math.abs(progress - checkpoint) < 1.5) {
      onClearCheckpoint(track.id);
    }
  }, [progress, checkpoint, track.id, checkpointsEnabled, onClearCheckpoint]);

  const togglePlay = useCallback(() => {
    if (!mediaRef.current) return;
    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setIsPlaying(true);
    } else {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    setIsAssetsLoaded(false);
    setLoadingProgress(0);
    setIsPlaying(false);

    const preloadAssets = async () => {
      const urlsToLoad = new Set();

      if (isDinofroz) {
        if (track.video) urlsToLoad.add(track.video);
        if (track.image) urlsToLoad.add(track.image);
      } else {
        if (track.audio) urlsToLoad.add(track.audio);
        sliderImages.forEach((img) => urlsToLoad.add(img));
      }

      const urlsArray = Array.from(urlsToLoad);
      if (urlsArray.length === 0) {
        setIsAssetsLoaded(true);
        return;
      }

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
  }, [track, isDinofroz, sliderImages, track.audio, track.video]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setProgress(media.currentTime);
    const updateDur = () => {
      setDuration(media.duration);
      setDownloadRange((prev) => ({
        ...prev,
        end: Math.floor(media.duration),
      }));
    };

    const handleEnded = () => {
      if (playMode === 2) return; // Браузер сам зациклить через атрибут loop
      if (playMode === 0 || playMode === 1) {
        if (canPerformAction()) onNext();
      } else {
        // Режим 3: "Без режиму" - зупиняємось
        setIsPlaying(false);
        if (mediaRef.current) mediaRef.current.currentTime = 0;
      }
    };
    const handleErrorEvent = () => handleError();

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("progress", updateProgress);
    media.addEventListener("loadedmetadata", updateDur);
    media.addEventListener("ended", handleEnded);
    media.addEventListener("error", handleErrorEvent);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("progress", updateProgress);
      media.removeEventListener("loadedmetadata", updateDur);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("error", handleErrorEvent);
    };
  }, [track, loop, handleError, updateProgress, playMode, onNext, canPerformAction]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      mediaRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  useEffect(() => {
    if ("mediaSession" in navigator && track) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: track.text || track.author || "Стихія",
        artist: track.author || "Stykhiya",
        album: track.category || "Music",
        artwork: [{ src: track.image, sizes: "512x512", type: "image/webp" }],
      });

      navigator.mediaSession.setActionHandler("play", togglePlay);
      navigator.mediaSession.setActionHandler("pause", togglePlay);
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (canPerformAction()) onPrev();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (canPerformAction()) onNext();
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        if (mediaRef.current) {
          mediaRef.current.currentTime = Math.max(
            0,
            mediaRef.current.currentTime - seekBackwardAmount,
          );
        }
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        if (mediaRef.current) {
          mediaRef.current.currentTime = Math.min(
            mediaRef.current.duration,
            mediaRef.current.currentTime + seekForwardAmount,
          );
        }
      });
    }
  }, [
    track,
    onNext,
    onPrev,
    togglePlay,
    seekForwardAmount,
    seekBackwardAmount,
    canPerformAction,
  ]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  const generateFrames = async () => {
    if (!track.video || isGeneratingFrames) return;
    setIsGeneratingFrames(true);
    setVideoFrames([]);
    const frames = [];
    const tempVideo = document.createElement("video");
    
    // Використовуємо той самий URL, що і в плеєрі
    tempVideo.src = track.video;
    tempVideo.muted = true;
    tempVideo.crossOrigin = "anonymous";
    tempVideo.preload = "auto";

    try {
      await new Promise((resolve, reject) => {
        tempVideo.onloadedmetadata = resolve;
        tempVideo.onerror = () => reject(new Error("Video load error"));
        setTimeout(() => reject(new Error("Timeout")), 15000);
      });

      const totalDuration = tempVideo.duration;
      const interval = totalDuration / framesCount;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      for (let i = 0; i < framesCount; i++) {
        tempVideo.currentTime = i * interval;
        await new Promise((resolve) => {
          tempVideo.onseeked = resolve;
        });
        
        canvas.width = tempVideo.videoWidth || 640;
        canvas.height = tempVideo.videoHeight || 360;
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL("image/jpeg", 0.7));
        setLoadingProgress(Math.round(((i + 1) / framesCount) * 100));
      }
      setVideoFrames(frames);
      setShowFramesGallery(true);
    } catch (err) {
      console.error("Frame generation failed", err);
      alert("Помилка при створенні кадрів. Перевірте з'єднання.");
    } finally {
      setIsGeneratingFrames(false);
      setLoadingProgress(0);
    }
  };

  const handleWheel = useCallback((e) => {
    const delta = Math.sign(e.deltaY) * -1;

    if (e.shiftKey) {
      setSpeed((prev) =>
        Math.max(0.2, Math.min(2.0, +(prev + delta * 0.1).toFixed(1))),
      );
    } else if (e.ctrlKey || e.altKey) {
      setSeekForwardAmount((prev) =>
        Math.max(5, Math.min(30, prev + delta * 5)),
      );
      setSeekBackwardAmount((prev) =>
        Math.max(5, Math.min(30, prev + delta * 5)),
      );
    } else {
      setVolume((prev) =>
        Math.max(0, Math.min(1, +(prev + delta * 0.05).toFixed(2))),
      );
    }
  }, []);
  const togglePlayMode = () => {
    const nextMode = (playMode + 1) % 4;
    setPlayMode(nextMode);
    if (nextMode === 0) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(false);
    } else if (nextMode === 1) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(true);
    } else if (nextMode === 2) {
      setLoop(true);
    } else if (nextMode === 3) {
      setLoop(false);
      if (onSetShuffle) onSetShuffle(false);
    }
  };
  useEffect(() => {
    if (playMode === 1 && !isShuffle && onSetShuffle) onSetShuffle(true);
  }, [playMode, isShuffle, onSetShuffle]);
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    window.addEventListener("mousemove", resetControlsTimeout);
    window.addEventListener("touchstart", resetControlsTimeout);
    window.addEventListener("touchmove", resetControlsTimeout);
    return () => {
      window.removeEventListener("mousemove", resetControlsTimeout);
      window.removeEventListener("touchstart", resetControlsTimeout);
      window.removeEventListener("touchmove", resetControlsTimeout);
    };
  }, [resetControlsTimeout]);
  const currentLyric = useMemo(() => {
    if (!Array.isArray(track.lyrics)) return null;
    let active = null;
    const mode = user?.voiceActingMode || "malyatko";
    if (mode === "off") return null;

    for (let i = 0; i < track.lyrics.length; i++) {
      if (progress >= track.lyrics[i].time) {
        const line = track.lyrics[i];
        active = mode === "bbkids" && line.text_bbkids ? line.text_bbkids : line.text;
      } else {
        break;
      }
    }
    return active;
  }, [track.lyrics, progress, user?.voiceActingMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      resetControlsTimeout();
      if (e.code === "Escape") handleClose();

      if (e.code === "Space") {
        e.preventDefault();
      }

      if (!mediaRef.current) return;
      if (e.code === "Space" && canPerformAction()) {
        togglePlay();
      } else if (e.code === "ArrowRight") {
        const amount = seekForwardAmount;
        mediaRef.current.currentTime = Math.min(
          mediaRef.current.duration,
          mediaRef.current.currentTime + amount,
        );
        triggerIndicator("right", amount);
      } else if (e.code === "ArrowLeft") {
        const amount = seekBackwardAmount;
        mediaRef.current.currentTime = Math.max(
          0,
          mediaRef.current.currentTime - amount,
        );
        triggerIndicator("left", amount);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleClose,
    togglePlay,
    resetControlsTimeout,
    canPerformAction,
    seekForwardAmount,
    seekBackwardAmount,
    triggerIndicator,
  ]);

  useEffect(() => {
    if (isDinofroz || !duration || sliderImages.length === 0) return;

    const segmentDuration = duration / sliderImages.length;
    if (segmentDuration <= 0) return;

    const idx = Math.min(
      Math.floor(progress / segmentDuration),
      sliderImages.length - 1,
    );
    if (idx !== currentImgIdx) setCurrentImgIdx(idx);
  }, [progress, duration, sliderImages.length, isDinofroz, currentImgIdx]);

  // Завантаження та збереження режиму слайд-шоу в localStorage
  useEffect(() => {
    const loadSlideshowMode = async () => {
      try {
        const saved = await localforage.getItem(`slideshow_${track.id}`);
        if (saved !== null) {
          setIsAutoSlideshow(saved.isEnabled || false);
          setAutoSlideshowInterval(saved.interval || 3);
        }
      } catch (e) {
        console.error("Помилка завантаження режиму слайд-шоу:", e);
      }
    };
    loadSlideshowMode();
  }, [track.id]);

  // Збереження режиму слайд-шоу в localStorage при зміні
  useEffect(() => {
    const saveSlideshowMode = async () => {
      try {
        await localforage.setItem(`slideshow_${track.id}`, {
          isEnabled: isAutoSlideshow,
          interval: autoSlideshowInterval,
        });
      } catch (e) {
        console.error("Помилка збереження режиму слайд-шоу:", e);
      }
    };
    saveSlideshowMode();
  }, [isAutoSlideshow, autoSlideshowInterval, track.id]);

  // Управління інтервалом для автоматичного переключення зображень
  useEffect(() => {
    if (!isAutoSlideshow || sliderImages.length === 0) return;

    const slideshowInterval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % sliderImages.length);
    }, autoSlideshowInterval * 1000);

    return () => clearInterval(slideshowInterval);
  }, [isAutoSlideshow, autoSlideshowInterval, sliderImages.length]);

  const getCroppedDataUrl = (source) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const process = (img) => {
        const w = img.videoWidth || img.naturalWidth || img.width;
        const h = img.videoHeight || img.naturalHeight || img.height;
        const cropX = w * 0.05;
        const cropY = h * 0.05;
        const cropW = w * 0.9;
        const cropH = h * 0.9;

        canvas.width = cropW;
        canvas.height = cropH;

        if (mainFilter) {
          let filterStr = "";
          if (mainFilter.type === "grayscale" || mainFilter.grayscale)
            filterStr += "grayscale(100%) ";
          if (mainFilter.type === "blur")
            filterStr += `blur(${dynamicBlur || mainFilter.opacity * 10}px) `;
          if (mainFilter.type === "contrast")
            filterStr += `contrast(${(dynamicOpacity || mainFilter.opacity) * 2}) `;
          if (mainFilter.type === "vintage")
            filterStr += "sepia(0.8) contrast(1.2) ";
          if (mainFilter.blur) filterStr += `blur(${mainFilter.blur}px) `;
          if (mainFilter.type === "negative") filterStr += "invert(100%) ";

          ctx.filter = filterStr.trim() || "none";
        }

        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        if (mainFilter) {
          const colors = {
            red: [255, 0, 0],
            purple: [128, 0, 128],
            green: [0, 255, 0],
            blue: [0, 0, 255],
            black: [0, 0, 0],
            orange: [230, 149, 0],
            cyan: [0, 255, 255],
            brown: [139, 69, 19],
            white: [255, 255, 255],
          };

          const colorType = dynamicColor || mainFilter.type;
          if (colors[colorType]) {
            const [r, g, b] = colors[colorType];
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dynamicOpacity ?? mainFilter.opacity ?? 0.5})`;
            ctx.fillRect(0, 0, cropW, cropH);
          }
        }

        resolve(canvas.toDataURL("image/jpeg"));
      };

      if (typeof source === "string") {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => process(img);
        img.src = source;
      } else {
        process(source);
      }
    });
  };

  const downloadScreenshot = async (applyFilter = false) => {
    const source =
      isDinofroz && mediaRef.current
        ? mediaRef.current
        : sliderImages[currentImgIdx];
    const dataUrl = await getCroppedDataUrl(source, applyFilter);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `screenshot-${track.text.replace(/\s+/g, "_")}-${Date.now()}.jpg`;
    a.click();
    setShowScreenshotMenu(false);
  };

  const printScreenshot = async (applyFilter = false) => {
    const source =
      isDinofroz && mediaRef.current
        ? mediaRef.current
        : sliderImages[currentImgIdx];
    const dataUrl = await getCroppedDataUrl(source, applyFilter);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${dataUrl}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
    setShowScreenshotMenu(false);
  };

  // Функція для збереження скріншоту в базу зображень
  const saveScreenshotToGallery = async () => {
    try {
      const source =
        isDinofroz && mediaRef.current
          ? mediaRef.current
          : sliderImages[currentImgIdx];
      const dataUrl = await getCroppedDataUrl(source, false);

      // Отримуємо поточну колекцію збережених скріншотів
      let savedScreenshots =
        (await localforage.getItem("dinofroz_screenshots")) || [];

      // Додаємо новий скріншот
      const newScreenshot = {
        id: `screenshot-${Date.now()}`,
        image: dataUrl,
        trackName: track.text || "Unknown",
        timestamp: new Date().toISOString(),
      };

      savedScreenshots.push(newScreenshot);

      // Якщо перевищен ліміт 20 скріншотів, видаляємо найстаріший
      const MAX_SCREENSHOTS = 20;
      if (savedScreenshots.length > MAX_SCREENSHOTS) {
        savedScreenshots = savedScreenshots.slice(-MAX_SCREENSHOTS);
      }

      // Зберігаємо обновлену колекцію в localforage
      await localforage.setItem("dinofroz_screenshots", savedScreenshots);

      alert(
        "✅ Скріншот успішно збережено в галерею! (" +
          savedScreenshots.length +
          "/" +
          MAX_SCREENSHOTS +
          ")",
      );
      setShowScreenshotMenu(false);
    } catch (error) {
      console.error("Помилка збереження скріншоту:", error);
      alert("❌ Помилка при збереженні скріншоту");
    }
  };

  const handleDownloadImage = async (imgSrc) => {
    const dataUrl = await getCroppedDataUrl(imgSrc);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "image.jpg";
    a.click();
  };

  const handlePrintImage = async (imgSrc) => {
    const dataUrl = await getCroppedDataUrl(imgSrc);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${dataUrl}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  const handleSeekHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    setHoverTime(p * duration);

    if (isDinofroz && previewVideoRef.current && duration > 0) {
      previewVideoRef.current.currentTime = p * duration;
    }
  };
  const checkCache = useCallback(async () => {
    if ("caches" in window) {
      const cache = await caches.open("audio-cache");
      const match = await cache.match(isDinofroz ? track.video : track.audio);
      setIsCached(!!match);
    }
  }, [track, isDinofroz]);

  useEffect(() => {
    checkCache();
  }, [checkCache]);

  const toggleCache = async () => {
    if (!("caches" in window)) return;
    const cache = await caches.open("audio-cache");
    const url = isDinofroz ? track.video : track.audio;
    if (isCached) {
      await cache.delete(url);
      setIsCached(false);
    } else {
      await cache.add(url);
      setIsCached(true);
    }
  };

  const handlePrint = () => {
    const imgSrc = isDinofroz ? track.image : sliderImages[currentImgIdx];
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  const handleStereoSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    if (mediaRef.current) {
      mediaRef.current.currentTime = p * duration;
    }
  };

  const handleInteractionStart = useCallback(
    (x, width) => {
      const side =
        x < width * 0.2 ? "left" : x > width * 0.8 ? "right" : "center";
      const now = Date.now();

      // 1. Логіка подвійного кліку для перемотування
      if (
        side !== "center" &&
        side === lastClickRef.current.side &&
        now - lastClickRef.current.time < 350
      ) {
        if (mediaRef.current) {
          const amount =
            side === "left" ? seekBackwardAmount : seekForwardAmount;
          if (side === "left") {
            mediaRef.current.currentTime = Math.max(
              0,
              mediaRef.current.currentTime - amount,
            );
          } else {
            mediaRef.current.currentTime = Math.min(
              mediaRef.current.duration,
              mediaRef.current.currentTime + amount,
            );
          }
          triggerIndicator(side, amount);
        }
        // Очищуємо таймер затиснення, щоб подвійний клік не активував швидкість
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        lastClickRef.current = { time: 0, side: null };
        return;
      }

      lastClickRef.current = { time: now, side };

      // 2. Логіка тривалого затиснення для зміни швидкості
      if (side !== "center") {
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = setTimeout(() => {
          if (!originalSpeedRef.current) {
            originalSpeedRef.current = speed;
          }
          const newSpeed = side === "right" ? 2 : 0.5;
          setSpeed(newSpeed);
          setLongPressSpeedIndicator(side === "right" ? "2x >>" : "<< 0.5x");
        }, 2000);
      }
    },
    [speed, seekBackwardAmount, seekForwardAmount, triggerIndicator],
  );

  const handleInteractionEnd = useCallback(
    (side) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      // Повертаємо оригінальну швидкість
      if (longPressSpeedIndicator) {
        if (originalSpeedRef.current !== null) {
          setSpeed(originalSpeedRef.current);
          originalSpeedRef.current = null;
        }
        setLongPressSpeedIndicator(null);
      } else if (side === "center" && !longPressSpeedIndicator) {
        // Якщо це був просто короткий клік по центру - toggle play
        togglePlay();
      }
    },
    [longPressSpeedIndicator, togglePlay],
  );

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  useEffect(() => {
    if (isDinofroz || !fsCanvasRef.current) return;
    const canvas = fsCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sliderImages[currentImgIdx];
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillText(track.author || "Стихія", 10, canvas.height - 15);
    };
  }, [sliderImages, currentImgIdx, isDinofroz, track.author]);

  return (
    <FullScreenOverlay
      ref={overlayRef}
      onMouseMove={resetControlsTimeout}
      onClick={(e) => {
        e.stopPropagation();
        resetControlsTimeout();
      }}
      $closing={isClosing}
      onWheel={handleWheel}
    >
      <canvas
        ref={fsCanvasRef}
        width="640"
        height="360"
        style={{ display: "none" }}
      />
      <video
        ref={fsPipVideoRef}
        muted
        playsInline
        style={{ display: "none" }}
      />

      <FSHeader
        style={{ opacity: showControls ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div style={{ display: "flex", gap: "0px", alignItems: "center" }}>
          <ActionButton style={{ fontSize: "26px" }}
            onClick={() => {
              if (canPerformAction()) handleClose();
            }}
          >
            &times;
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (canPerformAction())
                onMiniPlayer(progress, isPlaying, volume, speed);
            }}
            title="Згорнути в міні-плеєр"
          >
            🗗
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (canPerformAction())
                onAudioBar(progress, isPlaying, volume, speed);
            }}
            title="Згорнути в аудіосмугу"
          >
            ▬
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (canPerformAction()) togglePiP();
            }}
            title="Режим картинка в картинці"
          >
            🖼️
          </ActionButton>
          <ActionButton
            onClick={() => { if (canPerformAction()) toggleFullscreen(); }}
            title={isFullscreenNative ? "Вийти з повного екрану" : "На весь екран"}
          >
            {isFullscreenNative ? "⏹" : "⛶"}
          </ActionButton>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FSTitle>{track.author}</FSTitle>
            {track.category !== "мультфільми" && (
              <span
                style={{ color: "#ccc", fontSize: "12px", textAlign: "start" }}
              >
                Музика • {track.category}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <ActionButton
            onClick={() => {
              if (canPerformAction()) onRate(track.id);
            }}
            title={`Оцінка: ${rating} балів. (Макс 4 пісні з оцінками)`}
          >
            {rating === 2 ? "💛" : rating === 1 ? "❤️" : "🤍"}
          </ActionButton>
          <ActionButton
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("menu")
                : setShowScreenshotMenu(!showScreenshotMenu)
            }
            title="Скріншот"
          >
            📸
          </ActionButton>
          <ActionButton onClick={handlePrint} title="Друк">
            🖨️
          </ActionButton>
          <ActionButton
            onClick={() => setShowDownload(true)}
            title="Завантажити"
          >
            ⇩
          </ActionButton>
          <ActionButton
            onClick={() => setShowPlaylist(!showPlaylist)}
            title="Список відтворення"
          >
            📑
          </ActionButton>
          <ActionButton
            onClick={() => setShowSettings(!showSettings)}
            title="Налаштування"
          >
            ⚙️
          </ActionButton>
        </div>
      </FSHeader>

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

      <FSContent
        ref={containerRef}
        onMouseDown={(e) =>
          handleInteractionStart(e.clientX, containerRef.current.clientWidth)
        }
        onMouseUp={() => handleInteractionEnd()}
        onMouseLeave={() => handleInteractionEnd()}
        onTouchStart={(e) => {
          resetControlsTimeout();
          handleInteractionStart(
            e.touches[0].clientX,
            containerRef.current.clientWidth,
          );
        }}
        onTouchEnd={() => handleInteractionEnd()}
      >
        <FSVisualWrapper style={{ position: "relative" }}>
          {longPressSpeedIndicator && (
            <LongPressBadge>Швидкість {longPressSpeedIndicator}</LongPressBadge>
          )}
          {activeSeekIndicator && (
            <SeekIndicator
              $side={activeSeekIndicator.side}
              key={activeSeekIndicator.key}
            >
              <div className="icon">
                {activeSeekIndicator.side === "left" ? "◀◀◀" : "▶▶▶"}
              </div>
              <div className="text">
                {activeSeekIndicator.side === "left" ? "-" : "+"}
                {activeSeekIndicator.amount}с
              </div>
            </SeekIndicator>
          )}
          <FilterOverlay
            $active={filtersEnabled && !!mainFilter}
            $type={dynamicColor || mainFilter?.type}
            $opacity={
              dynamicOpacity !== null
                ? dynamicOpacity
                : mainFilter?.opacity || 0.5
            }
            $blur={dynamicBlur !== null ? dynamicBlur : mainFilter?.blur}
            $grayscale={mainFilter?.grayscale}
            $imageUrl={mainFilter?.imageUrl}
            style={{ zIndex: 10 }}
          />

          <FilterOverlay
            $active={filtersEnabled && !!flickerFilter}
            $type="flicker"
            $opacity={flickerFilter?.opacity || 0.1}
            style={{ zIndex: 11 }}
          />
          {isDinofroz ? (
            <>
              <FSVideo
                ref={mediaRef}
                src={track.video || dinofrozVideo}
                playsInline
                loop={loop}
                onError={handleError}
                style={{ 
                  opacity: progress === 0 && !isPlaying ? 0 : 1,
                  filter: mediaFilter
                }}
              />
              {progress === 0 && !isPlaying && (
                <FSImage
                  src={track.image}
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                />
              )}
            </>
          ) : (
            <>
              <FSImage
                key={currentImgIdx}
                src={sliderImages[currentImgIdx]}
                alt="Slide"
                $animate={true}
                onError={handleError}
                style={{ filter: mediaFilter }}
              />
            </>
          )}
          {shouldRenderSymbols && (
            <SymbolOverlay
              count={dynamicIntensity || activeSymbols?.intensity || 50}
              volume={volume}
              speed={dynamicSpeed || activeSymbols?.speed || 0} // Changed from dynamicSpeed to dynamicSymbolSpeed
              blur={dynamicBlurSymbols || activeSymbols?.blur || 0}
              isExiting={isSymbolsExiting}
              variation={activeSymbols?.variation}
            />
          )}
        </FSVisualWrapper>

        {!isPlaying && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 20,
              transform: "translate(-50%, -50%)",
              fontSize: "45px",
              color: "rgba(255,255,255,1)",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.7)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ▶
          </div>
        )}
      </FSContent>
      <SubtitleOverlay $show={!!currentLyric} $controlsVisible={showControls}>
        {currentLyric}
      </SubtitleOverlay>
      {!isDinofroz && <audio ref={mediaRef} src={track.audio} loop={loop} />}
      <FSControls
        $visible={showControls}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "white",
            fontSize: "12px",
          }}
        >
          <span>{formatTime(progress)}</span>
          {progressMode === "linear" ? (
            <SeekBarWrapper
              onMouseMove={handleSeekHover}
              onMouseLeave={() => setHoverTime(null)}
            >
            {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
              <CheckpointMarker 
                $left={(checkpoint / duration) * 100}
                title="Минулого разу ви зупинилися тут"
              >
                🚩
              </CheckpointMarker>
            )}
              {hoverTime !== null && duration > 0 && (
                <SeekTooltip
                  $left={(hoverTime / duration) * 100}
                  className="seek-tooltip"
                >
                  {isDinofroz ? (
                    <video
                      ref={previewVideoRef}
                      src={track.video || dinofrozVideo}
                      muted
                      preload="auto"
                    />
                  ) : (
                    sliderImages.length > 0 && (
                      <img
                        src={
                          sliderImages[
                            Math.min(
                              Math.floor(
                                hoverTime / (duration / sliderImages.length),
                              ),
                              sliderImages.length - 1,
                            )
                          ]
                        }
                        alt="preview"
                      />
                    )
                  )}
                  <span>{formatTime(hoverTime)}</span>
                  {checkpoint > 0 && Math.abs(hoverTime - checkpoint) < 5 && (
                    <span style={{ fontSize: '9px', color: 'orange', marginTop: '2px' }}>
                      Ви зупинилися тут
                    </span>
                  )}
                </SeekTooltip>
              )}
              <SeekBar
                type="range"
                min="0"
                max={duration || 0}
                $buffered={0}
                value={progress}
                onChange={(e) =>
                  (mediaRef.current.currentTime = e.target.value)
                }
              />
            </SeekBarWrapper>
          ) : (
            <StereoSeekBar 
              onClick={handleStereoSeek}
              onMouseMove={handleSeekHover}
              onMouseLeave={() => setHoverTime(null)}
            >
              {checkpointsEnabled && checkpoint > 0 && duration > 0 && (
                <CheckpointMarker 
                  $left={(checkpoint / duration) * 100} 
                  style={{ bottom: 'auto', top: '-15px' }}
                  title="Минулого разу ви зупинилися тут"
                >
                  🚩
                </CheckpointMarker>
              )}
              {hoverTime !== null && duration > 0 && (
                <SeekTooltip
                  $left={(hoverTime / duration) * 100}
                  className="seek-tooltip"
                >
                  {isDinofroz ? (
                    <video
                      ref={previewVideoRef}
                      src={track.video || dinofrozVideo}
                      muted
                      preload="auto"
                    />
                  ) : (
                    sliderImages.length > 0 && (
                      <img
                        src={
                          sliderImages[
                            Math.min(
                              Math.floor(
                                hoverTime / (duration / sliderImages.length),
                              ),
                              sliderImages.length - 1,
                            )
                          ]
                        }
                        alt="preview"
                      />
                    )
                  )}
                  <span>{formatTime(hoverTime)}</span>
                  {checkpoint > 0 && Math.abs(hoverTime - checkpoint) < 5 && (
                    <span style={{ fontSize: '9px', color: 'orange', marginTop: '2px' }}>
                      Ви зупинилися тут
                    </span>
                  )}
                </SeekTooltip>
              )}
              {isGeneratingWave ? (
                <span
                  style={{ color: "white", fontSize: "10px", margin: "auto" }}
                >
                  Обробка хвилі...
                </span>
              ) : (
                waveform.map((height, i) => (
                  <StereoChannel
                    key={i}
                    $height={height}
                    $active={
                      (progress / duration) * 100 > (i / waveform.length) * 100
                    }
                  />
                ))
              )}
            </StereoSeekBar>
          )}
          <span>{formatTime(duration)}</span>
          {isDinofroz && (
            <span style={{ fontSize: "10px", color: "#aaa" }}>
              ({formatTime(buffered)})
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {/* Slider for images if not video */}
          {!isDinofroz && (
            <FSSliderContainer>
              {sliderImages.map((img, i) => (
                <SliderItemWrapper key={i}>
                  <FSSliderImage
                    src={img}
                    $active={i === currentImgIdx}
                    style={{ cursor: "default" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <SliderOverlay className="slider-overlay">
                    <SliderBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadImage(img);
                      }}
                    >
                      Скачати
                    </SliderBtn>
                    <SliderBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrintImage(img);
                      }}
                    >
                      Друкувати
                    </SliderBtn>
                  </SliderOverlay>
                </SliderItemWrapper>
              ))}
            </FSSliderContainer>
          )}
        </div>

        {/* Main Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <div style={{ display: "flex", gap: "1px" }}>
            {checkpointsEnabled && checkpoint > 0 && (
              <ActionButton
                onClick={() => {
                  if (mediaRef.current && canPerformAction()) {
                    mediaRef.current.currentTime = checkpoint;
                  }
                }}
                title="Повернутись до чекпоінту"
              >
                🚩
              </ActionButton>
            )}
            <ActionButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  mediaRef.current.currentTime = 0;
                }
              }}
              title="На початок"
            >
              ⇤
            </ActionButton>
            <ActionButton
              onClick={() => {
                if (canPerformAction()) onPrev();
              }}
            >
              ⏮
            </ActionButton>
            <ActionButton onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </ActionButton>
            <ActionButton
              onClick={() => {
                if (canPerformAction()) onNext();
              }}
            title="Наступна пісня"
            >
              ⏭
            </ActionButton>
          <ActionButton
            onClick={() => {
              if (mediaRef.current && canPerformAction()) {
                mediaRef.current.currentTime = duration - 1.5;
              }
            }}
            title="В самий кінець (для перевірки зупинки)"
          >
            ⇥
          </ActionButton>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ActionButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  const amount = seekBackwardAmount;
                  mediaRef.current.currentTime = Math.max(
                    0,
                    mediaRef.current.currentTime - amount,
                  );
                  triggerIndicator("left", amount);
                }
              }}
            >
              -{seekBackwardAmount}s
            </ActionButton>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(255,255,255,0.1)",
                padding: "5px 10px",
                borderRadius: "20px",
              }}
            >
              <span style={{ color: "white", fontSize: "12px" }}>⚡</span>
              <SpeedSlider
                type="range"
                min="0.2"
                max="2.1"
                step="0.1"
                $activeColor="#7afcff"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: "10px",
                  width: "25px",
                  textAlign: "right",
                }}
              >
                {speed.toFixed(1)}x
              </span>
            </div>
            <ActionButton
              onClick={() => {
                if (mediaRef.current && canPerformAction()) {
                  const amount = seekForwardAmount;
                  mediaRef.current.currentTime = Math.min(
                    duration,
                    mediaRef.current.currentTime + amount,
                  );
                  triggerIndicator("right", amount);
                }
              }}
            >
              +{seekForwardAmount}s
            </ActionButton>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <LoopButton
              $active={isCached}
              onClick={() => {
                if (canPerformAction()) toggleCache();
              }}
              title={isCached ? "Збережено" : "Кешувати"}
            >
              {isCached ? "✓" : "⇩"}
            </LoopButton>
            {!isDinofroz && sliderImages.length > 1 && (
              <LoopButton
                $active={isAutoSlideshow}
                onClick={() => setIsAutoSlideshow(!isAutoSlideshow)}
                title={
                  isAutoSlideshow ? "Слайд-шоу ввімкнено" : "Слайд-шоу вимкнено"
                }
              >
                📽️
              </LoopButton>
            )}

            {/* Вибір інтервалу слайд-шоу */}
            {!isDinofroz && isAutoSlideshow && sliderImages.length > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(255,179,108,0.2)",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,179,108,0.5)",
                }}
              >
                <span
                  style={{ color: "#ffb36c", fontSize: "12px", width: "20px" }}
                >
                  ⏱️
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={autoSlideshowInterval}
                  onChange={(e) =>
                    setAutoSlideshowInterval(parseInt(e.target.value))
                  }
                  style={{
                    width: "60px",
                    cursor: "pointer",
                    accentColor: "#ffb36c",
                  }}
                />
                <span
                  style={{
                    color: "#ffb36c",
                    fontSize: "10px",
                    width: "25px",
                    textAlign: "right",
                  }}
                >
                  {autoSlideshowInterval}s
                </span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "white", fontSize: "12px" }}>🔊</span>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ width: "60px" }}
              />
            </div>
            <LoopButton
              $active={true}
              onClick={() => {
                if (canPerformAction()) togglePlayMode();
              }}
              title={
                playMode === 0
                  ? "По порядку"
                  : playMode === 1
                    ? "Випадково"
                    : playMode === 2
                      ? "Автоповтор"
                      : "Без режиму"
              }
            >
              {playMode === 0 ? "⏭" : playMode === 1 ? "⚄" : playMode === 2 ? "↩" : "⏵❘"}
            </LoopButton>
          </div>
        </div>
      </FSControls>

      {showSettings && (
        <GearModal>
          <h4>Налаштування</h4>
          <SliderRow>
            <span style={{ color: "white" }}>
              Промотка назад ({seekBackwardAmount}с)
            </span>
            <SeekAmountSlider
              type="range"
              min="5"
              max="20"
              step="5"
              $activeColor="#7afcff"
              value={seekBackwardAmount}
              onChange={(e) =>
                setSeekBackwardAmount(parseInt(e.target.value, 10))
              }
            />
          </SliderRow>
          <SliderRow>
            <span style={{ color: "white" }}>
              Промотка вперед ({seekForwardAmount}с)
            </span>
            <SeekAmountSlider
              type="range"
              min="5"
              max="20"
              step="5"
              $activeColor="#7afcff"
              value={seekForwardAmount}
              onChange={(e) =>
                setSeekForwardAmount(parseInt(e.target.value, 10))
              }
            />
          </SliderRow>
          {(track.lyrics || track.text) && (
            <SliderRow>
              <span style={{ color: "white" }}>Версія озвучки</span>
              {Array.isArray(track.lyrics) ? (
                <select
                  value={user?.voiceActingMode || "malyatko"}
                  onChange={(e) => {
                    if (onUpdateUser) {
                      onUpdateUser({ ...user, voiceActingMode: e.target.value });
                    }
                  }}
                  style={{
                    background: "#444",
                    color: "white",
                    border: "1px solid #666",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  <option value="malyatko">Малятко ТВ</option>
                  <option value="bbkids">BBKidsUA</option>
                  <option value="off">Вимкнути</option>
                </select>
              ) : (
                <button
                  onClick={() => {
                    const newMode = (user?.voiceActingMode === "off" ? "malyatko" : "off");
                    if (onUpdateUser) onUpdateUser({ ...user, voiceActingMode: newMode });
                  }}
                  style={{
                    background: (user?.voiceActingMode || "malyatko") === "off" ? "#444" : "orange",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  {(user?.voiceActingMode || "malyatko") === "off" ? "Вимкнено" : "Увімкнено"}
                </button>
              )}
            </SliderRow>
          )}
          {track.filters && track.filters.length > 0 && (
            <SliderRow>
              <span style={{ color: "white" }}>Ефекти</span>
              <button
                onClick={() => setFiltersEnabled(!filtersEnabled)}
                style={{
                  background: filtersEnabled ? "#b000cf" : "#444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                {filtersEnabled ? "Увімкнено" : "Вимкнено"}
              </button>
            </SliderRow>
          )}
          {isDinofroz && (
            <SliderRow>
              <span style={{ color: "white" }}>Якість відео</span>
              <select
                value={videoQuality}
                onChange={(e) => handleQualityChange(e.target.value)}
                style={{
                  background: "#444",
                  color: "white",
                  border: "1px solid #666",
                  borderRadius: "4px",
                  padding: "3px 6px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                <option value="1080з">1080з</option>
                <option value="768з">768з</option>
                <option value="480р">480р</option>
              </select>
            </SliderRow>
          )}
          {hasSymbols && (
            <SliderRow>
              <span style={{ color: "white" }}>
                Інтенсивність символів ({dynamicIntensity || 50})
              </span>
              <VolumeSlider
                type="range"
                min="10"
                max="200"
                step="10"
                $activeColor="#7afcff"
                value={dynamicIntensity || 50}
                onChange={(e) => setDynamicIntensity(parseInt(e.target.value))}
              />
            </SliderRow>
          )}
          <SliderRow>
            <span style={{ color: "white" }}>Чекпоінти</span>
            <button
              onClick={onToggleCheckpoints}
              style={{
                background: checkpointsEnabled ? "#b000cf" : "#444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {checkpointsEnabled ? "Увімкнено" : "Вимкнено"}
            </button>
          </SliderRow>
          <SliderRow>
            <span style={{ color: "white" }}>Фоновий режим</span>
            <button
              onClick={onToggleBackgroundMode}
              style={{
                background: backgroundMode ? "#00a405" : "#444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {backgroundMode ? "Увімкнено" : "Вимкнено"}
            </button>
          </SliderRow>
          <SliderRow>
            <span style={{ color: "white" }}>Режим шкали</span>
            <button
              onClick={() =>
                setProgressMode((prev) =>
                  prev === "linear" ? "stereogram" : "linear",
                )
              }
              style={{
                background: progressMode === "linear" ? "#7300ff" : "#b000cf",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              {progressMode === "linear" ? "Часова шкала" : "Стереограмa"}
            </button>
          </SliderRow>
          {isDinofroz && (
            <>
              <SliderRow>
                <span style={{ color: "white" }}>Кількість кадрів</span>
                <select
                  value={framesCount}
                  onChange={(e) => setFramesCount(parseInt(e.target.value))}
                  style={{
                    background: "#444",
                    color: "white",
                    border: "1px solid #666",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  <option value={30}>30 кадрів</option>
                  <option value={60}>60 кадрів</option>
                  <option value={120}>120 кадрів</option>
                </select>
              </SliderRow>
              <button
                onClick={generateFrames}
                disabled={isGeneratingFrames}
                style={{
                  marginTop: "2px",
                  width: "100%",
                   fontSize: "11px",
                  background: isGeneratingFrames ? "#3f3f3f" : "#b12c00",
                  color: "white",
                  border: "none",
                  padding: "2px",
                  borderRadius: "5px",
                  cursor: isGeneratingFrames ? "default" : "pointer",
                  fontWeight: "bold"
                }}
              >
                {isGeneratingFrames ? `Генерація ${loadingProgress}%...` : `🎞️ Розділити на ${framesCount} кадрів`}
              </button>
            </>
          )}
          <button
            onClick={async () => {
              for (const img of sliderImages) {
                const dataUrl = await getCroppedDataUrl(img);
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "image.jpg";
                a.click();
                await new Promise((res) => setTimeout(res, 200));
              }
            }}
            disabled={track.id === 2}
            style={{
              marginTop: "3px",
              width: "100%",
              background: track.id === 2 ? "#626262" : "#00ae0f",
              color: "white",
              border: "none",
              fontSize: "11px",
              padding: "2px",
              borderRadius: "5px",
              cursor: track.id === 2 ? "not-allowed" : "pointer",
              opacity: track.id === 2 ? 0.6 : 1,
            }}
          >
            Скачати всі зображення
          </button>
          <button
            onClick={async () => {
              try {
                const screenshots =
                  (await localforage.getItem("dinofroz_screenshots")) || [];
                if (screenshots.length === 0) {
                  alert("📸 Галерея скріншотів пуста");
                  return;
                }
                let html = `<div style="max-height:400px;overflow-y:auto;"><h3>Збережені скріншоти (${screenshots.length}/20)</h3>`;
                screenshots.forEach((shot, idx) => {
                  html += `<div style="margin:10px 0;padding:10px;border:1px solid #ccc;border-radius:5px;background:#f5f5f5;">
                    <small style="color:#666;">${shot.trackName} - ${new Date(shot.timestamp).toLocaleString()}</small>
                    <br/><img src="${shot.image}" style="max-width:150px;margin-top:5px;border-radius:3px;cursor:pointer;" onclick="this.style.maxWidth='100%'" />
                    <br/><button onclick="this.parentElement.innerHTML='Видалення...'" style="margin-top:5px;padding:5px 10px;background:#ff6b6b;color:white;border:none;border-radius:3px;cursor:pointer;">🗑️ Видалити</button>
                  </div>`;
                });
                html += "</div>";
                const win = window.open("", "_blank", "width=400,height=600");
                win.document.write(
                  `<html><head><title>Галерея скріншотів</title><style>body{font-family:Arial;padding:10px;background:#fff;}</style></head><body>${html}</body></html>`,
                );
                win.document.close();
              } catch (error) {
                console.error("Помилка відкриття галереї:", error);
                alert("❌ Помилка при відкритті галереї");
              }
            }}
            style={{
              marginTop: "4px",
              width: "100%",
              background: "#7afcff",
              color: "#333",
              border: "none",
              padding: "2px",
              fontSize: "11px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📸 Переглянути галерею скріншотів
          </button>
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "⚠️ Ви впевнені, що хочете очистити всі збережені скріншоти?",
                )
              ) {
                try {
                  await localforage.removeItem("dinofroz_screenshots");
                  alert("✅ Галерея скріншотів очищена");
                } catch (error) {
                  console.error("Помилка очищення галереї:", error);
                  alert("❌ Помилка при очищенні галереї");
                }
              }
            }}
            style={{
              marginTop: "3px",
               padding: "2px",
              width: "100%",
              background: "#ae0000",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "11px",
            }}
          >
            🗑️ Очистити галерею
          </button>
          <button
            onClick={() => setShowSettings(false)}
            style={{
              marginTop: "4px",
              width: "100%",
              background: "transparent",
               padding: "2px",
              border: "1px solid white",
              borderRadius: "5px",
              fontSize: "11px",
              color: "white",
            }}
          >
            Закрити
          </button>
        </GearModal>
      )}

      {showFramesGallery && (
        <ModalOverlay onClick={() => setShowFramesGallery(false)}>
          <PlaylistModalContent onClick={e => e.stopPropagation()} style={{ maxWidth: '1200px', background: '#1a1a1a', border: '1px solid orange' }}>
            <PlaylistCloseButton onClick={() => setShowFramesGallery(false)} style={{ color: 'white' }}>&times;</PlaylistCloseButton>
            <h3 style={{ color: 'orange', textAlign: 'center', marginBottom: '20px' }}>Кадри з відео ({videoFrames.length} зображень)</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
              gap: '5px', 
              padding: '10px',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}>
              {videoFrames.map((frame, idx) => (
                <div key={idx} style={{ 
                  background: '#333', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  border: '1px solid #444',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <img src={frame} alt={`Frame ${idx}`} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                  <div style={{ display: 'flex', gap: '2px', padding: '5px' }}>
                    <button 
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = frame;
                        a.download = `frame-${idx + 1}.jpg`;
                        a.click();
                      }}
                      style={{ flex: 1, padding: '4px', fontSize: '10px', background: 'orange', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Скачати
                    </button>
                    <button 
                      onClick={() => {
                        const printWindow = window.open("", "_blank");
                        printWindow.document.write(
                          `<html><head><title>Print Frame</title></head><body style="text-align:center;"><img src="${frame}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`
                        );
                        printWindow.document.close();
                      }}
                      style={{ flex: 1, padding: '4px', fontSize: '10px', background: '#555', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Друк
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => setShowFramesGallery(false)} style={{ padding: '10px 30px', borderRadius: '20px', background: 'orange', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Закрити галерею</button>
            </div>
          </PlaylistModalContent>
        </ModalOverlay>
      )}

      {showScreenshotMenu && (
        <GearModal
          style={{ bottom: "auto", top: "70px", right: "80px", width: "150px" }}
        >
          <button
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("download")
                : downloadScreenshot(false)
            }
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            📥 Скачати
          </button>
          <button
            onClick={saveScreenshotToGallery}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffb36c",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
              fontWeight: "bold",
            }}
            title="Зберегти скріншот у локальній галереї"
          >
            💾 У галерею
          </button>
          <button
            onClick={() =>
              mainFilter
                ? setPendingScreenshotAction("print")
                : printScreenshot(false)
            }
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            🖨️ Друкувати
          </button>
        </GearModal>
      )}

      {pendingScreenshotAction && (
        <DownloadModal>
          <h3 style={{ color: "black" }}>Фільтр виявлено</h3>
          <p style={{ color: "black", fontSize: "14px" }}>
            Бажаєте накласти активний візуальний ефект на скріншот?
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() => {
                const action = pendingScreenshotAction;
                setPendingScreenshotAction(null);
                if (action === "menu") setShowScreenshotMenu(true);
                else if (action === "download") downloadScreenshot(true);
                else if (action === "print") printScreenshot(true);
              }}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Так
            </button>
            <button
              onClick={() => {
                const action = pendingScreenshotAction;
                setPendingScreenshotAction(null);
                if (action === "menu") setShowScreenshotMenu(true);
                else if (action === "download") downloadScreenshot(false);
                else if (action === "print") printScreenshot(false);
              }}
              style={{
                background: "#ccc",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ні
            </button>
          </div>
        </DownloadModal>
      )}

      {showPlaylist && (
        <PlaylistOverlay>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #555",
              paddingBottom: "5px",
            }}
          >
            <h4 style={{ margin: 0 }}>Черга відтворення</h4>
            <button
              onClick={() => setShowPlaylist(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          {playlist &&
            playlist.map((t, i) => (
              <div
                key={t.id}
                style={{
                  padding: "8px",
                  background:
                    t.id === track.id
                      ? "rgba(255, 165, 0, 0.3)"
                      : "transparent",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  onSelectTrack(t);
                }}
              >
                <img
                  src={t.image}
                  alt="art"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.author}
                </div>
                <span style={{ fontSize: "11px", color: "#ccc" }}>
                  {formatTime(t.duration)}
                </span>
              </div>
            ))}
        </PlaylistOverlay>
      )}
      {showDownload && (
        <DownloadModal>
          <h3>Завантаження</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = isDinofroz
                  ? track.video || dinofrozVideo
                  : track.audio;
                a.download = `full_track.${isDinofroz ? "mp4" : "mp3"}`;
                a.click();
              }}
              style={{
                padding: "10px",
                background: "orange",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Скачати повністю
            </button>
            <hr style={{ width: "100%" }} />
            <label>Вибрати проміжок (сек):</label>
            <div
              style={{ display: "flex", gap: "5px", justifyContent: "center" }}
            >
              <input
                type="number"
                value={downloadRange.start}
                onChange={(e) =>
                  setDownloadRange({
                    ...downloadRange,
                    start: parseInt(e.target.value, 10) || 0,
                  })
                }
                style={{ width: "60px", padding: "5px" }}
              />
              <span>-</span>
              <input
                type="number"
                value={downloadRange.end}
                onChange={(e) =>
                  setDownloadRange({
                    ...downloadRange,
                    end: parseInt(e.target.value, 10) || 0,
                  })
                }
                style={{ width: "60px", padding: "5px" }}
              />
            </div>
            <button
              onClick={() => {
                alert(
                  `Завантаження відрізку ${downloadRange.start}с - ${downloadRange.end}с розпочато! (Емуляція)`,
                );
                setShowDownload(false);
              }}
              style={{
                padding: "8px",
                background: "#444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Скачати відрізок
            </button>
            {!isDinofroz && (
              <button
                onClick={async () => {
                  const src = sliderImages[currentImgIdx];
                  const dataUrl = await getCroppedDataUrl(src);
                  const a = document.createElement("a");
                  a.href = dataUrl;
                  a.download = "image.jpg";
                  a.click();
                }}
                style={{
                  marginTop: "5px",
                  padding: "8px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Скачати поточне фото
              </button>
            )}
          </div>
          <button
            onClick={() => setShowDownload(false)}
            style={{
              background: "transparent",
              border: "1px solid #333",
              padding: "5px 15px",
              borderRadius: "5px",
            }}
          >
            Закрити
          </button>
        </DownloadModal>
      )}
    </FullScreenOverlay>
  );
};

const MusicCard = ({ cardData, onOpenModal, rating, onOpenPlayer, onRate, checkpoint, checkpointsEnabled }) => {
  const { id, image, text, deezerLink } = cardData;

  const handleDownloadTrack = (e) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = cardData.audio;
    a.download = `${text || "track"}.mp3`;
    a.download = `${text || "track"}${cardData.author ? ` - ${cardData.author}` : ""}.mp3`;
    a.click();
  };
  const handlePrintCover = (e) => {
    e.stopPropagation();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Cover</title></head><body style="text-align:center;"><img src="${image}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };
  return (
    <CardWrapper $isFavorite={rating > 0} $rating={rating}>
      <MusicImageContainer>
        {checkpointsEnabled && checkpoint > 0 && (
          <CheckpointBadge 
            title="Ви зупинилися тут"
            onClick={(e) => { e.stopPropagation(); onOpenPlayer(id, checkpoint); }}
          >
            🚩 {Math.floor(checkpoint / 60)}:{(Math.floor(checkpoint % 60)).toString().padStart(2, '0')}
          </CheckpointBadge>
        )}
        <HeartButton
          $rating={rating}
          title={
            rating === 2 ? "2 бали (макс)" : rating === 1 ? "1 бал" : "Оцінити"
          }
          onClick={(e) => {
            e.stopPropagation();
            onRate && onRate(id);
          }}
        >
          {rating === 2 ? "💛" : rating === 1 ? "❤️" : "🤍"}
        </HeartButton>
        <MusicImage src={image} alt="Music" onClick={() => onOpenPlayer(id)} />
      </MusicImageContainer>

      {text && <MusicText title={text}>{text}</MusicText>}
      <AuthorText>{cardData.author || "Невідомий автор"}</AuthorText>

      <ActionButtonsContainer>
        {cardData.lyrics && (
          <ActionButton
            title="Текст пісні"
            onClick={() => onOpenModal({ ...cardData })}
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </ActionButton>
        )}
        <ActionButton title="Відкрити плеєр" onClick={() => onOpenPlayer(id)}>
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </ActionButton>
        <ActionButton title="Завантажити" onClick={handleDownloadTrack}>
          ⇩
        </ActionButton>
        <ActionButton
          title="Роздрукувати обкладинку"
          onClick={handlePrintCover}
        >
          🖨️
        </ActionButton>
        {deezerLink && (
          <ActionButton
            title="Слухати на Deezer"
            onClick={() => window.open(deezerLink, "_blank")}
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </ActionButton>
        )}
      </ActionButtonsContainer>
    </CardWrapper>
  );
};
const musicCards = [
  // {
  //   id: 1,
  //   image: christmas,
  //   audio: christmasAudio,
  //   text: "",
  //   lyrics: [
  //     { time: 226, text: "" },
  //   ],
  //   category: "хіти",
  //   duration: 180,
  //   images: [christmas],
  //   author: "'Україна колядує' Озвучка Ірини Федишин",
  // },
  {
    id: 1,
    image: dinofrozone,
    audio: dinofrozAudio,
    category: "хіти",
    author: "Динофроз - Mondo TV.",
    video: dinofrozVideo,
    text: "Легендарний мультфільм на Малятко ТВ(нажаль закритий). Зображено Імператора дрaконів Ніцерона.",
    lyrics: [
      {
        time: 8,
        text: "Динофроз...Динофроз!",
        voice: "voice1",
        text_bbkids: "Динофроз...Динофроз!",
      },
      {
        time: 15,
        text: "Світять яскраві зірки. Пригод крізь віки.",
        text_bbkids: "Четверо друзів знайшли дивну гру. В доісторичну пішли давнину.",
      },
      {
        time: 21,
        text: "В доісторичний світ потрапили ми.",
        voice: "voice1",
        text_bbkids: "Там динозаврами стали вони",
      },
      {
        time: 26,
        text: "Тут динозаври б'ються в парі з людьми.",
        text_bbkids: "Тут динозаври б'ються в парі з людьми.",
      },
      {
        time: 33,
        text: "В битвах з ворогом твердий гартується дух!",
        text_bbkids: "В цьому карти їм допомогли. ",
      },
      {
        time: 38,
        text: "Страху немає, упевненим робиться рух!",
        text_bbkids: "У давнині небезпечні дракони. Та з ними впорались наші герої.",
      },
      {
        time: 44,
        text: "Бачимемо ціль і до бою рушаєм! Ми батьківшину свою захищаєм!",
        text_bbkids: "До бою готові всюди і завжди. І утілюють мрiї свої в боротьбі.",
      },
      {
        time: 50,
        text: "Динофроз! Воїни світла і воїни миру!",
        text_bbkids: "Динофроз! Дружні, завзяті, зброя в руках. ",
      },
      {
        time: 56,
        text: "Динофроз! Лиш в боротьбі здобувам довіру!",
        text_bbkids: "Динофроз! Вони Ніцерону не по зубах.",
      },
      {
        time: 62,
        text: "Динофроз! Готуємось до бою завзято!",
        text_bbkids: "Динофроз! Дружні, завзяті, зброя в руках. Вони Ніцерону не по зубах.",
      },
      {
        time: 66,
        text: "Будь сміливим друже! Переможе дужий!",
        text_bbkids: "Друзі б'ються завзято. Дракони тікають!",
      },
      {
        time: 72,
        text: "Чистимо зброю! Готові до бою!",
        text_bbkids: "Четверо друзів майбутнє спасають!",
      },
      {
        time: 75,
        text: "В битві за волю! Пірна з головою!",
        text_bbkids: "До бою завжди готові вони.",
      },
      {
        time: 77,
        text: "Пекло за дух. І мороз усе це динофроз!",
        text_bbkids: "Ховайтеся, вороги!",
      },
    ],
    duration: 120,
    images: [dinofrozone],
  },
    {
    id: 2,
     image: turkeys,
   audio: humorAudio,
   video: humorVideo,
     text: "Найгірший(і найсмішніший) виступ у шоу 'Україна має талант'. Дивіться самі. (Я думав лише Динофроз матиме відео)",
     lyrics: [
       { time: 226, text: "" },
     ],
    category: "хіти",
     duration: 180,
     images: [turkeys],
    author: "'Нас немає' Оксана Самойлова(врахуйте вона переспівала, а не написала цю пісню)",
   },
  {
    id: 3,
    image: turkeys,
    audio: turkeyAudio,
    text: "",
    category: "природа",
    duration: 60,
    author: "Звуки індиків - Моя робота :)",
    lyrics: [
      {
        time: 25,
        text: "Дякую всім слухачам! Давно хотів сказати, що робота над піснями, була примною і важкою.",
      },
      {
        time: 40,
        text: "Динофроз, режимом відео, забрав багато часу, та деякі пісні, у плані фільтрів. Тим не менш, індики, попри скромність, заслужили, бути на рівні з іншими.",
      },
      {
        time: 55,
        text: "Друзі, у кожного, своя улюблена тема(спільне, відмінне), і ненавидна. Я розміщую захопливе і заспокійливе, окрім моїх захоплень, тільки скажіть і ваше улюблене може з'явитись. Я це кажу, до того, що Стихію, ми розвиватимемо разом. ",
      },
    ],
    images: [
      turkeysone,
      turkeytwo,
      turkeythree,
      turkeyfour,
      turkeyfive,
      turkeysix,
      turkeyseven,
      turkeys,
    ],
  },
  {
    id: 4,
    image: monody,
    category: "хіти",
    filters: [
      {
        start: 71,
        end: 89,
        type: "symbols",
        intensity: 110,
        speed: 0.4,
        blur: 1.3,
      },
      { start: 8, end: 16, type: "purple", opacity: 0.25 },
      { start: 16, end: 16.4, type: "flash", opacity: 1 },
      { start: 26, end: 45, type: "blue", opacity: 0.25 },
      { start: 45, end: 52, type: "flicker", opacity: 0.4 },
      { start: 52, end: 53, type: "flash", opacity: 1 },
      { start: 53, end: 71, type: "ultrachaos", opacity: 0.25 },
      { start: 89, end: 104, type: "chaos", opacity: 0.25 },
      { start: 104, end: 124, type: "orange", opacity: 0.25 },
      { start: 124, end: 143, type: "green", opacity: 0.25 },
      { start: 143, end: 158, type: "orange", opacity: 0.25 },
      { start: 158, end: 168, type: "grayscale", opacity: 1 },
      { start: 196, end: 208, type: "purple", opacity: 0.25 },
      { start: 208, end: 227, type: "cyan", opacity: 0.25 },
      { start: 227, end: 243, type: "ultrachaos", opacity: 0.25 },
      { start: 243, end: 262, type: "purple", opacity: 0.25 },
      { start: 262, end: 278, type: "orange", opacity: 0.25 },
      { start: 278, end: 300, type: "black", opacity: 0.85 },
    ],
    text: "",
    audio: monodyAudio,
    author: "Monody -  TheFatRat.",
    lyrics: [
      { time: 168, text: "Літо в пагорбах." },
      { time: 172, text: "Ті туманні дні у мене в спогадах." },
      { time: 175, text: "Ми все ще бігали." },
      { time: 179, text: "Весь світ був біля наших ніг." },
      { time: 182, text: "Бачачи зміни сезону." },
      { time: 182, text: "Наші дороги були вкриті пригодами." },
      { time: 185, text: "Гори на шляху." },
      { time: 189, text: "Від моря не могли втримати нас." },
      { time: 195, text: "Ось ми стоїмо з розпростертими обіймами." },
      { time: 199, text: "Це наш дім." },
      { time: 202, text: "Завжди сильні у світі, який ми створили." },
      { time: 209, text: "Я все ще чую тебе у вітрі." },
      { time: 212, text: "Бачу твої тіні на деревах." },
      { time: 216, text: "Тримаючись, спогади ніколи не змінюються." },
      { time: 226, text: "" },
    ],
    duration: 240,
    images: [monody],
    // Voice narrations can be added by creating mp3 files:
    // src/mp3/monody-narration-voice1.mp3
    // src/mp3/monody-narration-voice2.mp3
    // src/mp3/monody-narration-voice3.mp3
    // Then uncomment below:
    // voiceNarrations: {
    //   voice1: require("../../mp3/monody-narration-voice1.mp3"),
    //   voice2: require("../../mp3/monody-narration-voice2.mp3"),
    //   voice3: require("../../mp3/monody-narration-voice3.mp3"),
    // },
  },
  {
    id: 5,
    image: desert,
    author: "Звуки вітру - Моя робота :)",
    audio: windAudio,
    category: "природа",
    text: "Звук дощу. Пустеля розділенна вічно грозовою і сонячною зоною.",
    duration: 300,
    images: [desert, desertone, deserttwo, desertthree, desertfour],
  },
  {
    id: 6,
    image: horse,
    audio: horseAudio,
    category: "природа",
    text: "",
    author: "Звуки коня - Телеканал Мега.",
    duration: 45,
    images: [horsethree, horsetwo, horse, chess],
  },
  {
    id: 7,
    image: dinofrozone,
    audio: dragonoraAudio,
    category: "ігри",
    author: "Dragonora - MyLittleUniverse(Estoty)",
    text: "І знову дракони, музика доісторичного світу. Картини взяті з мультфільму Динофроз.",
    duration: 180,
    images: [
      dinofrozone,
      dinofroztwo,
      dinofrozthree,
      dinofrozfour,
      dinofrozfive,
      dinofrozsix,
      dinofrozseven,
      dinofrozeight,
      dinofroznine,
    ],
  },
  {
    id: 8,
    image: soloveyko,
    audio: soloveykoAudio,
    category: "природа",
    text: "Хто кращий по звукам соловеко чи індик? Зроблено за ідеї сім'ї.",
    author: "Звук Соловейка - Телеканал Мега",
    duration: 90,
    images: [soloveyko],
  },
  {
    id: 9,
    image: harmony,
    audio: harmonyAudio,
    category: "ігри",
    text: "Спокійна і прекрасна музика в японському стилі.",
    author: "Asium - My little universe(Estoty).",
    duration: 160,
    images: [
      asiumone,
      asiumtwo,
      asiumthree,
      asiumfour,
      asiumfive,
      asiumsix,
      asiumseven,
      harmony,
      asiumnine,
      asiumten,
      asiumeleven,
    ],
  },
  {
    id: 10,
    image: mecha,
    audio: mechaAudio,
    category: "ігри",
    text: "Спокійна і прекрасна музика в механічному стилі.",
    author: "Factorium - My little universe(Estoty).",
    duration: 160,
    images: [mecha],
  },
  {
    id: 12,
    image: mia,
    audio: require("../../mp3/mia-and-me.mp3"),
    category: "хіти",
    text: "",
    author: "Мія та я.",
    lyrics: "Текст в розробці.",
    duration: 180,
    images: [mia],
  },
  {
    id: 13,
    image: electrodynamix,
    audio: electrodynamixAudio,
    text: "",
    author: "Electrodynamix - DJ-Nate (GeometryDash).",
    category: "ігри",
    duration: 160,
    images: [electrodynamix],
    filters: [
      {
        start: 127,
        end: 134,
        type: "symbols",
        intensity: 105,
        speed: 0.1,
        blur: 1.7,
      },
      {
        start: 148,
        end: 154,
        type: "symbols",
        intensity: 115,
        speed: 0 / 3,
        blur: 1.7,
      },
      { start: 1, end: 4, type: "flicker", opacity: 0.4 },
      { start: 19, end: 22.5, type: "flicker", opacity: 0.05 },
      { start: 4, end: 7, type: "black", opacity: 1 },
      { start: 11, end: 15, type: "blue", opacity: 0.2 },
      { start: 19, end: 23, type: "black", opacity: 0.95 },
      { start: 23, end: 35, type: "ultrachaos", opacity: 0.15 },
      { start: 35, end: 37, type: "flash", opacity: 1 },
      { start: 37, end: 52, type: "chaos", opacity: 0.15 },
      { start: 37, end: 52, type: "flicker", opacity: 0.2 },
      { start: 52, end: 60, type: "grayscale", opacity: 1 },
      { start: 60, end: 75, type: "red", opacity: 0.2 },
      { start: 75, end: 77, type: "grayscale", opacity: 1 },
      { start: 77, end: 80, type: "red", opacity: 0.2 },
      { start: 80, end: 91, type: "black", opacity: 1 },
      { start: 91, end: 97, type: "black", opacity: 0.9 },
      { start: 97, end: 112, type: "ultrachaos", opacity: 0.2 },
      { start: 112, end: 127, type: "red", opacity: 0.2 },
      { start: 134, end: 148, type: "cyan", opacity: 0.14 },
      { start: 154, end: 170, type: "red", opacity: 0.2 },
      { start: 170, end: 188, type: "green", opacity: 0.12 },
      { start: 188, end: 199, type: "grayscale", opacity: 1 },
      { start: 199, end: 201, type: "white", opacity: 1 },
      { start: 201, end: 206, type: "black", opacity: 1 },
    ],
  },
  {
    id: 14,
    image: clubstep,
    text: "",
    audio: clubstepAudio,
    author: "Clubstep - DJ-Nate(GeometryDash).",
    filters: [
      {
        start: 37,
        end: 49,
        type: "symbols",
        isRandomIntensity: true,
        minIntensity: 100,
        maxIntensity: 160,
        isRandomSpeed: true,
        minSpeed: 0.8,
        maxSpeed: 2,
        isRandomBlurSymbols: true,
        minBlurSymbols: 0,
        maxBlurSymbols: 2.5,
      },
      { start: 0.1, end: 0.4, type: "flash", opacity: 1 },
      { start: 7, end: 20, type: "black", opacity: 1 },
      { start: 20, end: 23, type: "grayscale", opacity: 1 },
      {
        start: 21,
        end: 37,
        randomColor: true,
        colorOptions: ["red", "green"],
        isRandom: true,
        minOpacity: 0.1,
        maxOpacity: 0.25,
        isRandomBlur: true,
        minBlur: 0,
        maxBlur: 3,
      },
      { start: 49.7, end: 50, type: "flash", opacity: 1 },
      {
        start: 50,
        end: 55,
        randomColor: true,
        colorOptions: ["black", "grayscale"],
        isRandom: true,
        minOpacity: 0.4,
        maxOpacity: 0.8,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      {
        start: 59,
        end: 64,
        randomColor: true,
        colorOptions: ["black", "grayscale"],
        isRandom: true,
        minOpacity: 0.6,
        maxOpacity: 0.9,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      {
        start: 68,
        end: 72,
        randomColor: true,
        colorOptions: ["black", "grayscale"],
        isRandom: true,
        minOpacity: 0.7,
        maxOpacity: 0.8,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      {
        start: 72,
        end: 87,
        randomColor: true,
        colorOptions: ["purple", "blue"],
        isRandom: true,
        minOpacity: 0.1,
        maxOpacity: 0.25,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      {
        start: 87,
        end: 100,
        randomColor: true,
        colorOptions: ["brown", "orange"],
        isRandom: true,
        minOpacity: 0.1,
        maxOpacity: 0.25,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      { start: 100, end: 103, type: "grayscale", opacity: 1 },
      {
        start: 103,
        end: 133,
        randomColor: true,
        colorOptions: ["ultrachaos", "chaos"],
        isRandom: true,
        minOpacity: 0.1,
        maxOpacity: 0.25,
        isRandomBlur: true,
        minBlur: 1,
        maxBlur: 2,
      },
      { start: 133, end: 135, type: "grayscale", opacity: 1 },
      {
        start: 135,
        end: 166,
        type: "red",
        minOpacity: 0.15,
        isRandom: true,
        maxOpacity: 0.3,
      },
    ],
    category: "ігри",
    duration: 160,
    images: [clubstep],
  },
  {
    id: 15,
    image: fingerdash,
    audio: fingerbang,
    text: "Fingerdash, для додавання у GeometryDash, скоріше за все перемонтували і скоротили. Щоб рівень не був довгий.",
    author: "Fingerbang-MDK(Fingerdash - Full Version)",
    category: "ігри",
    duration: 140,
    images: [fingerdash],
    filters: [
      {
        start: 77,
        end: 85,
        type: "symbols",
        intensity: 120,
        speed: 1,
      },
      {
        start: 104,
        end: 128,
        type: "symbols",
        intensity: 120,
        speed: 1,
      },
      { start: 17, end: 34, type: "flicker", opacity: 1 },
      { start: 34, end: 41, type: "grayscale", opacity: 1 },
      { start: 41, end: 43, type: "black", opacity: 0.75 },
      { start: 43, end: 49, type: "grayscale", opacity: 1 },
      { start: 49, end: 51, type: "black", opacity: 0.75 },
      { start: 51, end: 68, type: "red", opacity: 0.25 },
      { start: 68, end: 77, type: "flicker", opacity: 0.95 },
      { start: 77, end: 85, type: "chaos", opacity: 0.25 },
      { start: 85, end: 87, type: "grayscale", opacity: 1 },
      { start: 87, end: 102, type: "ultrachaos", opacity: 0.25 },
      { start: 102, end: 104, type: "grayscale", opacity: 1 },
      { start: 110, end: 128, type: "grayscale", opacity: 1 },
      { start: 145, end: 156, type: "flicker", opacity: 1 },
      { start: 156, end: 170, type: "ultrachaos", opacity: 0.25 },
      { start: 170, end: 187, type: "grayscale", opacity: 1 },
      { start: 187, end: 206, type: "black", opacity: 0.67 },
      { start: 186, end: 223, type: "flicker", opacity: 0.95 },
      { start: 231, end: 246, type: "ultrachaos", opacity: 0.2 },
      { start: 246, end: 248, type: "grayscale", opacity: 1 },
      { start: 248, end: 253, type: "ultrachaos", opacity: 0.2 },
      { start: 253, end: 257, type: "grayscale", opacity: 1 },
      { start: 257, end: 264, type: "ultrachaos", opacity: 0.2 },
      { start: 264, end: 277, type: "grayscale", opacity: 1 },
    ],
  },
  {
    id: 16,
    image: theorytwo,
    audio: theorytwoAudio,
    author: "Theory of everything II - DJ-Nate(GeometryDash).",
    category: "ігри",
    duration: 140,
    text: "",
    images: [theorytwo],
    filters: [
      { start: 70, end: 90, type: "flicker", opacity: 0.3 },
      {
        start: 52,
        end: 66.5,
        type: "symbols",
        intensity: 160,
        speed: 1,
        blur: 1.3,
      },
      { start: 2, end: 3, type: "green", opacity: 0.1 },
      { start: 5, end: 7, type: "orange", opacity: 0.2 },
      { start: 7, end: 10, type: "red", opacity: 0.3 },
      { start: 10, end: 18, type: "purple", opacity: 0.4 },
      { start: 18, end: 23, type: "blue", opacity: 0.3 },
      { start: 23, end: 25, type: "grayscale", opacity: 1 },
      { start: 25, end: 32, type: "cyan", opacity: 0.3 },
      { start: 32, end: 37, type: "brown", opacity: 0.4 },
      { start: 37, end: 40, type: "grayscale", opacity: 1 },
      { start: 40, end: 40.2, type: "flash", opacity: 1 },
      { start: 40.3, end: 45, type: "purple", opacity: 0.4 },
      { start: 45, end: 47, type: "grayscale", opacity: 1 },
      { start: 47, end: 52, type: "chaos", opacity: 0.3 },
      { start: 52, end: 57, type: "black", opacity: 0.33, blur: 3.3 },
      { start: 57, end: 63, type: "black", opacity: 0.67, blur: 6.7 },
      { start: 63, end: 69, type: "black", opacity: 1, blur: 10 },
      { start: 69, end: 69.4, type: "flash", opacity: 1 },
      { start: 69.4, end: 72, type: "red", opacity: 0.5 },
      { start: 72, end: 78, type: "chaos", opacity: 0.3 },
      { start: 78, end: 90, type: "cyan", opacity: 0.3 },
      { start: 90, end: 92, type: "white", opacity: 0.6 },
      { start: 92, end: 120, type: "ultrachaos", opacity: 0.3 },
      { start: 120, end: 122, type: "white", opacity: 0.6 },
      { start: 122, end: 129, type: "green", opacity: 0.3 },
      { start: 129, end: 135, type: "black", opacity: 1 },
      { start: 135, end: 147, type: "black", opacity: 0.67, blur: 3.3 },
      { start: 147, end: 152, type: "black", opacity: 0.33, blur: 6.7 },
      { start: 152, end: 154, type: "blue", opacity: 0.3, blur: 10 },
      { start: 154, end: 164, type: "brown", opacity: 0.4 },
      { start: 164, end: 168, type: "cyan", opacity: 0.3 },
      { start: 168, end: 170, type: "grayscale", opacity: 1 },
      { start: 170, end: 182, type: "purple", opacity: 0.4 },
      { start: 182, end: 184, type: "grayscale", opacity: 1 },
      { start: 184, end: 190, type: "orange", opacity: 0.4 },
      { start: 190, end: 194, type: "white", opacity: 0.4 },
      { start: 194, end: 198, type: "red", opacity: 0.5 },
      { start: 198, end: 222, type: "grayscale", opacity: 1 },
    ],
  },
  {
    id: 17,
    image: deadlocked,
    audio: deadlockedAudio,
    lyrics: [
      { time: 1, text: "Діма: Кейт, де це ми?" },
      {
        time: 6,
        text: "Кейт: Ми на якомусь болоті. Тут лежить книга, можливо, вона нам допоможе.",
      },
      {
        time: 13,
        text: "Книга: Колись це прекрасне озеро було прихистком для людей і тварин. Але болотний дракон знищив нормальне життя, і всі втекли. Це місце стало останнім притулком для багатьох подорожніх, як і для мене. Існує легенда про скарб, що здолає дракона і поверне все назад.",
      },
      { time: 24, text: "Кейт: Тут якась свічка, погляньмо в неї." },
      {
        time: 27,
        text: "Діма: Шестерні... вони прояснюються у полум'ї. Може, це і є скарб?",
      },
      {
        time: 30,
        text: "Кейт: Точно! Це підказка сценотвору. Але є погана новина: це місце прискорює старіння шкіри. Треба поквапитись, бо тутешнє життя минає як одна доба.",
      },
      { time: 33, text: "Діма: Давай оглянемось. Підемо вправо." },
      { time: 37, text: "Діма: Давай через міст, бо тут гігантський павук!" },
      {
        time: 40,
        text: "Кейт: По-перше, це павучиха, а по-друге — тут шестерня!",
      },
      {
        time: 43,
        text: "Діма: Слухай, я сам вирушу у наступну пригоду, але благаю: йдемо по мосту.",
      },
      { time: 50, text: "Кейт: Діма, я згодна." },
      {
        time: 61,
        text: "Діма: Кейт, тут немає шестерні, але ці кристали ніби дивляться на нас.",
      },
      { time: 64, text: "Володар кристалів: Охороно, знищити їх!" },
      { time: 73, text: "Кейт: Стрибай у ліфт!" },
      { time: 75, text: "Кейт: Молодець, схопив шестерню під час підйому!" },
      { time: 83, text: "Кейт: Кидай у дракона!" },
      {
        time: 96,
        text: "Шестерня знищила дракона. І Болото Мук знову стало Озером Волі.",
      },
      { time: 100, text: "Діма: Переживаю за Влада." },
      {
        time: 103,
        text: "Кейт: Я теж. Під час переміщення у цей світ він залишився в реальності. Сказав, що зараз біля покинутого будинку, а навкруги — крижана пустеля.",
      },
      {
        time: 109,
        text: "Влад: Зараза, Кейт розвела руками... ну нічо, я сейчас осмотрю тут все.",
      },
      {
        time: 113,
        text: "Влад: О, цуцик! А де твій хазяїн? Чо ти на мене бросаєшся? Зараз геймер ФНАФу дасть тобі!",
      },
      {
        time: 116,
        text: "Класична помилка любителя фільмів жахів, спідранера по ФНАФу і Поппі Плейтайм. До того ж Влад згадав жарт Діми, в якому той порівняв його з драконом-генералом Владом з мультфільму «Динофроз». Замість спокійних і повільних кроків він зарядив ногою в бійцівську собаку. Вона з нелюдською силою переламала йому стопу. Влад ледь за допомогою рук доповз до дверей і скинув собаку з ноги.",
      },
      {
        time: 123,
        text: "Влад: Чого це у фільмі «Пила» сработало, а тут ні? А, пофіг. О, Фредді, дарова! Спати — так? А де твій друг Хагі? Бо на полу написано «час грати». Блін, Андрій Дебрін, чо сюда не їде з «Реальною містикою»? (Влад впав на підлогу).",
      },
      {
        time: 135,
        text: "Клоун: Зіграймо! Ти ховаєшся, а я шукаю. Ти ж так пишався, що в реальності нам вріжеш. Метра зробив нас реальними, так покажи, на що ти здатний. Чи твій друг тебе не вихваляв, а просто посміявся? До речі, Фредді сказав, що з ним у тебе нуль шансів, тому я тут. Ха-ха-ха! Я поки нагуляю апетит.",
      },
      { time: 155, text: "Клоун: Здавайся, я можу з'явитись будь-де." },
      {
        time: 170,
        text: "Влад: О, в маяку портал! Він у ньому не може з'явитись, але може залізти, розбивши вікно. Давай, працюй, працюй!",
      },
      { time: 175, text: "Клоун: Час вийшов!" },
      { time: 177, text: "Влад: Де я? Кругом темрява..." },
      { time: 187, text: "Далі буде..." },
    ],
    text: "Моторошна, але епічна пісня. Друг фанат цього рівня :).",
    author: "Deadlocked - F77(GeometryDash).",
    category: "ігри",
    duration: 140,
    images: [
      deadlocked,
      swamptwo,
      swampthree,
      swampfour,
      swampfive,
      swampsix,
      swampseven,
      swampeight,
      swampnine,
      horror,
      horrortwo,
      horrorthree,
      horrorfour,
      horrorfive,
      horrorsix,
      horrorseven,
      horroreight,
    ],
  },
  {
    id: 18,
    image: theory,
    audio: theoryAudio,
    text: "",
    author: "Theory of everything(GeometryDash) - DJ-Nate",
    category: "ігри",
    duration: 140,
    filters: [
      {
        start: 65,
        end: 81,
        type: "symbols",
        intensity: 150,
        speed: 0.6,
        blur: 1.3,
      },
      { start: 254, end: 274, type: "flicker", opacity: 0.15 },
      { start: 7, end: 15, type: "brown", opacity: 0.28 },
      { start: 15, end: 15.5, type: "flash", opacity: 1 },
      { start: 21, end: 33, type: "green", opacity: 0.15 },
      { start: 55, end: 65, type: "orange", opacity: 0.15 },
      { start: 81, end: 83, type: "grayscale", opacity: 1 },
      { start: 83, end: 88, type: "blue", opacity: 0.15 },
      { start: 88, end: 103, type: "chaos", opacity: 0.15 },
      { start: 103, end: 118, type: "red", opacity: 0.15 },
      { start: 118, end: 120, type: "grayscale", opacity: 1 },
      { start: 120, end: 132, type: "purple", opacity: 0.2 },
      { start: 132, end: 134, type: "grayscale", opacity: 1 },
      { start: 134, end: 146, type: "ultrachaos", opacity: 0.2 },
      { start: 146, end: 150, type: "chaos", opacity: 0.28 },
      { start: 150, end: 162, type: "black", opacity: 0.67 },
      { start: 162, end: 179, type: "purple", opacity: 0.2 },
      { start: 179, end: 191, type: "orange", opacity: 0.15 },
      { start: 191, end: 208, type: "blue", opacity: 0.15 },
      { start: 208, end: 218, type: "brown", opacity: 0.15 },
      { start: 218, end: 223, type: "black", opacity: 1 },
      { start: 223, end: 238, type: "purple", opacity: 0.2 },
      { start: 238, end: 260, type: "cyan", opacity: 0.18 },
      { start: 274, end: 275, type: "flash", opacity: 1 },
      { start: 275, end: 300, type: "black", opacity: 0.9 },
    ],
    images: [theory],
  },
  {
    id: 19,
    image: unity,
    audio: unityAudio,
    text: "Класний комп'ютерний хіт, не розумію чого його не поставили у фільм Матриця?",
    author: "Unity-TheFatRat.",
    lyrics: [
      { time: 119, text: "Текст хаотичний, лише для атмосфери" },
      { time: 154, text: "" },
      { time: 170, text: "Відлуння атмосферного вигуку" },
      { time: 180, text: "" },
    ],
    filters: [
      { start: 170, end: 191, type: "flicker", opacity: 0.3 },
      {
        start: 81,
        end: 100,
        type: "symbols",
        intensity: 140,
        speed: 1.4,
        blur: 0.5,
      },
      { start: 8, end: 27, type: "purple", opacity: 0.25 },
      { start: 27, end: 27.5, type: "flash", opacity: 1 },
      { start: 45, end: 63, type: "blue", opacity: 0.2 },
      { start: 100, end: 116, type: "orange", opacity: 0.2 },
      { start: 116, end: 119.6, type: "grayscale", opacity: 1 },
      { start: 119.6, end: 120, type: "flash", opacity: 1 },
      { start: 120, end: 136, type: "ultrachaos", opacity: 0.2 },
      { start: 136, end: 154, type: "cyan", opacity: 0.2 },
      { start: 154, end: 170, type: "brown", opacity: 0.2 },
      { start: 170, end: 191, type: "chaos", opacity: 0.2 },
      { start: 191, end: 210, type: "red", opacity: 0.2 },
      { start: 210, end: 240, type: "black", opacity: 0.8 },
    ],
    category: "хіти",
    duration: 180,
    images: [unity],
  },
  {
    id: 20,
    image: hunger,
    audio: hungerAudio,
    author: "Hunger-TheFatRat.",
    text: "",
    lyrics: [
      {
        time: 11,
        text: "Донечко, не лишай страх на згадку, я подбаю про те, щоб ти була у порядку",
      },
      { time: 16, text: "Донечко, не хвилюйся за мене, все погане мине" },
      { time: 22, text: "Віддам все, тобі моє" },
      { time: 27, text: "Сподіваюся, ти не помітиш страх голоду, в моїх очах" },
      { time: 34, text: "Все, про що ми мріяли" },
      { time: 39, text: "Брехню за хмарами нам повіяли" },
      { time: 44, text: "Зі страхами, з дощами, сльозами та болями" },
      {
        time: 49,
        text: "Донечко, не бійся за неньку, я подбаю про твою безпеконьку",
      },
      {
        time: 52,
        text: "Я продовжуватиму боротьбу, я продовжуватиму боротьбу",
      },
      { time: 66, text: "Ховайся тут на ходу, поки я йду" },
      { time: 69, text: "Ніхто не зашкодить, тобі хочу пообіцять" },
      {
        time: 72,
        text: "Все буде добре, тут залишайся і мовчи, завдання тобі таке",
      },
      { time: 75, text: "Не йди за мною, я повернуся завтра з тобою" },
      { time: 78, text: "Віддам все, тобі моє" },
      { time: 82, text: "Сподіваюся, ти не помітиш страх голоду, в моїх очах" },
      { time: 89, text: "Все, про що ми мріяли" },
      { time: 94, text: "Брехню за хмарами нам повіяли" },
      { time: 100, text: "Зі страхами, зі дощами, сльозами та болями" },
      {
        time: 104,
        text: "Донечко, не бійся за неньку, я подбаю про твою безпеконьку",
      },
      {
        time: 110,
        text: "Я продовжуватиму боротьбу, я продовжуватиму боротьбу",
      },
      {
        time: 133,
        text: "Не плач, моя айстра. Я повернуся завтра, коли прокинешся",
      },
      {
        time: 145,
        text: "Не плач. Я буду сьогодні ввечері та триматиму монстрів подалі",
      },
      { time: 155, text: "" },
      {
        time: 165,
        text: "(Come closer, пошепки) Підійди ближче, підійди ближче.",
      },
      { time: 175, text: "Я продовжуватиму боротьбу, бо я їх здолаю" },
    ],
    filters: [
      {
        start: 55,
        end: 66,
        type: "symbols",
        intensity: 140,
        speed: 1.4,
      },
      { start: 10, end: 22, type: "purple", opacity: 0.25 },
      { start: 22, end: 33, type: "cyan", opacity: 0.2 },
      { start: 33, end: 44, type: "green", opacity: 0.2 },
      { start: 44, end: 55, type: "orange", opacity: 0.2 },
      { start: 55, end: 66, type: "purple", opacity: 0.2 },
      { start: 77, end: 88, type: "green", opacity: 0.2 },
      { start: 88, end: 100, type: "cyan", opacity: 0.2 },
      { start: 100, end: 111, type: "orange", opacity: 0.2 },
      { start: 111, end: 133, type: "chaos", opacity: 0.2 },
      { start: 155, end: 174, type: "brown", opacity: 0.2 },
      { start: 174, end: 191, type: "chaos", opacity: 0.2 },
    ],
    category: "хіти",
    duration: 180,
    images: [hunger],
  },
    {
    id: 22,
    image: horror,
    text: "Друзі, хоррор зроблений мною (склеїв з різних джерел звуки). Я додаю сюжет у сайт, щоб зробити його більш атмосферним.",
    audio: domino,
    author: "Болотна крамниця",
    category: "природа",
    duration: 140,
    images: [horror, horrortwo, horrorthree],
    filters: [
      {
        start: 5,
        end: 15,
        type: "image",
        imageUrl: theorytwo,
        opacity: 0.4,
      },
    ],
  },
      {
    id: 22,
    image: horror,
    text: "Друзі, хоррор зроблений мною (склеїв з різних джерел звуки). Я додаю сюжет у сайт, щоб зробити його більш атмосферним.",
    audio: domino,
    author: "Болотна крамниця",
    category: "природа",
    duration: 140,
    images: [horror, horrortwo, horrorthree],
    filters: [
      {
        start: 5,
        end: 15,
        type: "image",
        imageUrl: theorytwo,
        opacity: 0.4,
      },
    ],
  },
    {
    id: 23,
    image: turkeys,
    audio: turkeyAudio,
    text: "",
    category: "природа",
    duration: 60,
    author: "Звуки індиків - Моя робота :)",
    lyrics: [
      {
        time: 25,
        text: "Дякую всім слухачам! Давно хотів сказати, що робота над піснями, була примною і важкою.",
      },
      {
        time: 40,
        text: "Динофроз, режимом відео, забрав багато часу, та деякі пісні, у плані фільтрів. Тим не менш, індики, попри скромність, заслужили, бути на рівні з іншими.",
      },
      {
        time: 55,
        text: "Друзі, у кожного, своя улюблена тема(спільне, відмінне), і ненавидна. Я розміщую захопливе і заспокійливе, окрім моїх захоплень, тільки скажіть і ваше улюблене може з'явитись. Я це кажу, до того, що Стихію, ми розвиватимемо разом. ",
      },
    ],
    images: [
      turkeysone,
      turkeytwo,
      turkeythree,
      turkeyfour,
      turkeyfive,
      turkeysix,
      turkeyseven,
      turkeys,
    ],
  },
];

const PLAYLISTS = {
  хіти: {
    title: "Хіти",
    monody,
  },
  // мультфільми: {
  //   title: "Українські",
  //   енеїда,
  // },
  природа: {
    title: "Моя робота",
    turkeys,
  },
  ігри: {
    title: "Ігри",
    mecha,
  },
};
const CreatePlaylistModal = ({ onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [cover, setCover] = useState(initialData?.cover || "");
  const [tracks, setTracks] = useState(initialData?.tracks || []);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCooldown, setSearchCooldown] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [deezerOffset, setDeezerOffset] = useState(0);
  const [addCooldown, setAddCooldown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeProgressId, setActiveProgressId] = useState(null);

  const handleFile = (e, callback, progressId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (progressId) {
      setActiveProgressId(progressId);
      setProgress(0);
    }
    
    // Замість FileReader просто повертаємо файл
    callback(file);
    if (progressId) {
      setProgress(0);
      setActiveProgressId(null);
    }
  };

  const handleAudio = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const progressId = `track-audio-${index}`;
    setActiveProgressId(progressId);
    setProgress(0);

    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = () => {
      if (audio.duration > 300) {
        alert("Тривалість пісні не може перевищувати 5 хвилин!");
        e.target.value = "";
        setActiveProgressId(null);
        setProgress(0);
        return;
      }
      const newTracks = [...tracks];
      newTracks[index].audio = file; // Зберігаємо Blob
      newTracks[index].duration = audio.duration;
      setTracks(newTracks);
      setActiveProgressId(null);
      setProgress(0);
      URL.revokeObjectURL(audio.src);
    };
  };

  const updateTrack = (index, field, value) => {
    const newTracks = [...tracks];
    newTracks[index][field] = value;
    setTracks(newTracks);
  };
  const calculateTotalSize = () => {
    return (
      tracks.reduce(
        (acc, track) => acc + (track.audioSize || 0) + (track.imageSize || 0),
        0,
      ) + (coverSize || 0)
    );
  };
  const addTrack = () => {
    if (tracks.length >= 10) return;
    setTracks([
      ...tracks,
      {
        id: Date.now(),
        text: "",
        audio: "",
        video: "",
        image: "",
        duration: 0,
      },
    ]);
  };
  useEffect(() => {
    let interval;
    if (searchCooldown > 0) {
      interval = setInterval(() => setSearchCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [searchCooldown]);

  useEffect(() => {
    let interval;
    if (addCooldown > 0) {
      interval = setInterval(() => setAddCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [addCooldown]);
  const [artistQuery, setArtistQuery] = useState("");
  const [titleQuery, setTitleQuery] = useState("");
  const handleSearch = () => {
    if ((!artistQuery && !titleQuery) || searchCooldown > 0) return;
    setIsSearching(true);
    setDeezerOffset(0);
    fetchDeezerResults(0);
  };

  const fetchDeezerResults = (offset) => {
    const callbackName = `deezerJsonp_${Date.now()}`;
    const script = document.createElement("script");
    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(
      `${artistQuery} ${titleQuery}`,
    )}&output=jsonp&callback=${callbackName}`;

    window[callbackName] = (data) => {
      setSearchResults(data.data || []);
      setIsSearching(false);
      setSearchCooldown(40);
      delete window[callbackName];
      document.body.removeChild(script);
    };
    script.onerror = () => {
      setIsSearching(false);
      setError("Помилка пошуку");
      delete window[callbackName];
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  };
  const handleLoadMore = () => {
    if (searchCooldown > 0 || isSearching) return;
    setIsSearching(true);
    setSearchCooldown(40);
    const newOffset = deezerOffset + 25;
    setDeezerOffset(newOffset);
    fetchDeezerResults(newOffset);
  };

  const [coverSize, setCoverSize] = useState(0);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Обкладинка не може бути більшою за 10мб!");
      e.target.value = null;
      return;
    }

    setCoverSize(file.size);

    setActiveProgressId("playlist-cover");
    setProgress(0);

    const reader = new FileReader();
    reader.onprogress = (ev) => {
      if (ev.lengthComputable) {
        const percent = Math.round((ev.loaded / ev.total) * 100);
        setProgress(percent);
      }
    };
    reader.onload = (ev) => {
      setCover(ev.target.result);
      setProgress(0);
      setActiveProgressId(null);
    };
    reader.readAsDataURL(file);
  };
  const addDeezerTrack = (track) => {
    if (tracks.length >= 10) return setError("Максимум 10 пісень!");
    if (addCooldown > 0)
      return setError(`Зачекайте ${addCooldown}с перед додаванням.`);

    const trackName = `${track.artist.name} - ${track.title}`;
    if (tracks.some((t) => t.text === trackName))
      return setError("Ця пісня вже є в плейлисті!");

    const newTrack = {
      id: Date.now() + Math.random(),
      text: trackName,
      audio: track.preview,
      video: "",
      image: track.album.cover_medium,
      duration: track.duration,
      deezerLink: track.link,
    };
    setTracks([...tracks, newTrack]);
    setAddCooldown(40);
  };

  const removeTrack = (index) => {
    const newTracks = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
  };

  const handleSave = () => {
    if (name.length > 12)
      return setError("Назва плейлисту максимум 12 символів");
    if (!name) return setError("Введіть назву плейлисту");
    if (tracks.length === 0) return setError("Додайте хоча б одну пісню");
    if (calculateTotalSize() > 100 * 1024 * 1024)
      return setError("Перевищено ліміт 100мб!");
    if (tracks.some((t) => !t.audio || !t.text))
      return setError("Заповніть дані пісень");
    onSave({ name, cover, tracks });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <LyricsModalContent
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "500px" }}
      >
        <h3 style={{ color: "black", textAlign: "center" }}>
          Створити плейлист
        </h3>
        <InputGroup>
          <label>Назва (макс 12)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={12}
          />
        </InputGroup>
        <InputGroup>
          <label>Обкладинка плейлисту (макс 10мб)</label>
          <input type="file" accept="image/*" onChange={handleCoverChange} />
          {activeProgressId === "playlist-cover" && (
            <div
              style={{
                width: "100%",
                height: "5px",
                background: "#ddd",
                marginTop: "5px",
                borderRadius: "3px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "orange",
                  width: `${progress}%`,
                  transition: "width 0.2s",
                }}
              ></div>
            </div>
          )}
        </InputGroup>
        {cover && (
          <img
            src={cover}
            alt="Cover"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}

        <div
          style={{
            margin: "15px 0",
            borderTop: "1px solid #ccc",
            paddingTop: "10px",
          }}
        >
          <h4 style={{ color: "black", margin: "0 0 10px 0" }}>
            Пошук пісень (Deezer)
          </h4>
          <p
            style={{ fontSize: "11px", color: "grey", margin: "-5px 0 10px 0" }}
          >
            Примітка: можна додати лише скорочену версію (30с), повна версія
            доступна на офіційному сайті Deezer.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <input
              value={artistQuery}
              onChange={(e) => setArtistQuery(e.target.value)}
              placeholder="Виконавець..."
              style={{
                flex: 1,
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
            />
            <input
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
              placeholder="Назва пісні..."
              style={{
                flex: 1,
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                color: "black",
              }}
            />
            <button
              onClick={handleSearch}
              disabled={searchCooldown > 0 || isSearching}
              style={{
                background: searchCooldown > 0 ? "grey" : "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: searchCooldown > 0 ? "default" : "pointer",
              }}
            >
              {isSearching
                ? "..."
                : searchCooldown > 0
                  ? `${searchCooldown}s`
                  : " ⌕"}
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}></div>
          {searchResults.length > 0 && (
            <div
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                marginTop: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px",
                    borderBottom: "1px solid #eee",
                    gap: "10px",
                  }}
                >
                  <img
                    src={track.album.cover_small}
                    alt="art"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "3px",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      fontSize: "12px",
                      color: "#333",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.artist.name} - {track.title}
                  </div>
                  <button
                    onClick={() => addDeezerTrack(track)}
                    style={{
                      background: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      fontSize: "10px",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => window.open(track.link, "_blank")}
                    style={{
                      background: "blue",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                    title="Повна версія"
                  >
                    Full
                  </button>
                </div>
              ))}
            </div>
          )}
          {searchResults.length > 0 && (
            <button
              onClick={handleLoadMore}
              disabled={searchCooldown > 0 || isSearching}
              style={{
                background: searchCooldown > 0 ? "grey" : "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: searchCooldown > 0 ? "default" : "pointer",
                marginTop: "10px",
              }}
            >
              {isSearching
                ? "..."
                : searchCooldown > 0
                  ? `${searchCooldown}s`
                  : "Завантажити ще"}
            </button>
          )}
        </div>

        <h4 style={{ color: "black", margin: "10px 0" }}>
          Пісні ({tracks.length}/10)
        </h4>
        {tracks.map((track, i) => (
          <div
            key={track.id}
            style={{
              background: "#f0f0f0",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <InputGroup>
              <label>Назва</label>
              <input
                value={track.text}
                onChange={(e) => updateTrack(i, "text", e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Аудіо (макс 5хв)</label>
              {track.audio &&
              (track.audio.startsWith("http") ||
                track.audio.startsWith("data:")) ? (
                <div>
                  <audio controls src={track.audio} style={{ width: "100%" }} />
                  <button
                    type="button"
                    onClick={() => updateTrack(i, "audio", "")}
                    style={{ marginTop: "5px", cursor: "pointer" }}
                  >
                    Видалити аудіо
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleAudio(e, i)}
                />
              )}
              {activeProgressId === `track-audio-${i}` && (
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "#ddd",
                    marginTop: "5px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "orange",
                      width: `${progress}%`,
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
              )}
            </InputGroup>
            <InputGroup>
              <label>Зображення пісні</label>
              {track.image &&
              (track.image.startsWith("http") ||
                track.image.startsWith("data:")) ? (
                <div>
                  <img
                    src={track.image}
                    alt="Обкладинка"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => updateTrack(i, "image", "")}
                    style={{
                      display: "block",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Видалити обкладинку
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFile(
                      e,
                      (res) => updateTrack(i, "image", res),
                      `track-image-${i}`,
                    )
                  }
                />
              )}
              {activeProgressId === `track-image-${i}` && (
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "#ddd",
                    marginTop: "5px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "orange",
                      width: `${progress}%`,
                      transition: "width 0.2s",
                    }}
                  ></div>
                </div>
              )}
            </InputGroup>
            <button
              onClick={() => removeTrack(i)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: 5,
              }}
            >
              Видалити
            </button>
          </div>
        ))}
        {tracks.length < 10 && (
          <button
            onClick={addTrack}
            disabled={addCooldown > 0}
            style={{
              background: addCooldown > 0 ? "grey" : "orange",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "5px 10px",
              marginBottom: 10,
            }}
          >
            {addCooldown > 0
              ? `Зачекайте ${addCooldown}s`
              : "+ Додати пісню вручну"}
          </button>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={handleSave}
            style={{
              background: "green",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "10px 20px",
            }}
          >
            Зберегти
          </button>
          <button
            onClick={onClose}
            style={{
              background: "grey",
              color: "white",
              border: "none",
              borderRadius: 5,
              padding: "10px 20px",
            }}
          >
            Скасувати
          </button>
        </div>
      </LyricsModalContent>
    </ModalOverlay>
  );
};
const PlaylistModal = ({
  playlistKey,
  onClose,
  user,
  onOpenRegister,
  customTracks,
  onEdit,
  onMiniPlayer,
  onAudioBar,
  onDeleteTrack,
  customPlaylistName,
  initialFullScreenTrack,
  onUpdateUser,
  checkpoints,
  checkpointsEnabled,
  onSaveCheckpoint,
  onClearCheckpoint,
  onToggleCheckpoints,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("favorites");
  const [isShuffle, setIsShuffle] = useState(false);
  const [playHistory, setPlayHistory] = useState([]); // Історія на 10 треків
  const [fullScreenTrack, setFullScreenTrack] = useState(null);
  const [isLyricsClosing, setIsLyricsClosing] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState(true);

  useEffect(() => {
    const loadCheckpoints = async () => {
      try {
        const bgMode = await localforage.getItem("background_mode_enabled");
        if (bgMode !== null) setBackgroundMode(bgMode);
      } catch (e) { console.error(e); }
    };
    loadCheckpoints();
  }, []);

  const handleToggleBackgroundMode = useCallback(async () => {
    const val = !backgroundMode;
    setBackgroundMode(val);
    await localforage.setItem("background_mode_enabled", val);
  }, [backgroundMode]);

  const voiceActingMode = user?.voiceActingMode || "malyatko";

  useEffect(() => {
    if (initialFullScreenTrack) {
      setFullScreenTrack(initialFullScreenTrack);
    }
  }, [initialFullScreenTrack]);

  const [lyricsModalData, setLyricsModalData] = useState(null);
  const [lyricsCurrentTime, setLyricsCurrentTime] = useState(0);
  const [levelEditorTrack, setLevelEditorTrack] = useState(null);
  const handleCloseLevelEditor = () => setLevelEditorTrack(null);

  const handleSaveLevelEditor = async (updatedTrack) => {
    if (!customTracks) return;
    const updatedTracks = customTracks.map((t) =>
      t.id === updatedTrack.id ? updatedTrack : t,
    );
    const currentCP = (await localforage.getItem("custom_playlist")) || {};

    const updatedPlaylist = { ...currentCP, tracks: updatedTracks };
    await localforage.setItem("custom_playlist", updatedPlaylist);
    setLevelEditorTrack(null);
    window.location.reload();
  };
  const [favorites, setFavorites] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setIsHydrated(true);
        return;
      }
      try {
        const saved = await localforage.getItem("music_favorites");
        if (saved) setFavorites(saved);
      } catch (e) {
        console.error("Помилка завантаження обраного:", e);
      } finally {
        setIsHydrated(true);
      }
    };
    loadFavorites();
  }, [user]);

  useEffect(() => {
    if (isHydrated && user) {
      localforage.setItem("music_favorites", favorites);
    }
  }, [favorites, isHydrated, user]);

  const getRating = useCallback(
    (id) => {
      if (Array.isArray(favorites)) return favorites.includes(id) ? 1 : 0;
      return favorites[id] || 0;
    },
    [favorites],
  );

  const handleToggleFavorite = (id) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const currentRating = getRating(id);
    const nextRating = (currentRating + 1) % 3;
    const ratedCount = Array.isArray(favorites)
      ? favorites.length
      : Object.values(favorites).filter((v) => v > 0).length;
    if (nextRating > 0 && currentRating === 0 && ratedCount >= 4) {
      alert("Ліміт: можна оцінити лише 4 пісні!");
      return;
    }
    setFavorites((prev) => {
      let currentRating = getRating(id);
      let nextRating = (currentRating + 1) % 3;
      if (Array.isArray(prev)) {
        const newObj = {};
        prev.forEach((p) => (newObj[p] = 1));
        newObj[id] = nextRating;
        if (nextRating === 0) delete newObj[id];
        return newObj;
      }

      const newObj = { ...prev };
      if (nextRating === 0) delete newObj[id];
      else newObj[id] = nextRating;
      return newObj;
    });
  };

  const handleCloseLyricsModal = (e) => {
    if (e) e.stopPropagation();
    setIsLyricsClosing(true);
    setTimeout(() => {
      setLyricsModalData(null);
      setIsLyricsClosing(false);
    }, 500);
  };
  useEffect(() => {
    if (
      lyricsModalData &&
      lyricsModalData.audioRef &&
      lyricsModalData.audioRef.current
    ) {
      const audioEl = lyricsModalData.audioRef.current;
      const handleTimeUpdate = () => {
        setLyricsCurrentTime(audioEl.currentTime);
      };
      audioEl.addEventListener("timeupdate", handleTimeUpdate);
      handleTimeUpdate();
      return () => {
        if (audioEl)
          audioEl.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [lyricsModalData]);

  const processedCards = useMemo(() => {
    let filtered;
    if (playlistKey === "custom" && customTracks) {
      filtered = customTracks.filter((card) =>
        (card.text || "").toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else {
      filtered = musicCards.filter(
        (card) =>
          card.category === playlistKey &&
          (card.text || "").toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOption === "favorites") {
      return [...filtered].sort((a, b) => {
        const aR = getRating(a.id);
        const bR = getRating(b.id);
        return bR - aR;
      });
    } else if (sortOption === "name_asc") {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.author));
    } else if (sortOption === "name_desc") {
      return [...filtered].sort((a, b) => b.text.localeCompare(a.author));
    } else if (sortOption === "duration_asc") {
      return [...filtered].sort(
        (a, b) => (a.duration || 0) - (b.duration || 0),
      );
    } else if (sortOption === "duration_desc") {
      return [...filtered].sort(
        (a, b) => (b.duration || 0) - (a.duration || 0),
      );
    }
    return filtered;
  }, [playlistKey, searchQuery, sortOption, customTracks, getRating]);

  // Зміна треку з додаванням у чергу історії
  const handleSetFullScreenTrack = useCallback((newTrack) => {
    if (fullScreenTrack && newTrack && fullScreenTrack.id !== newTrack.id) {
      setPlayHistory(prev => {
        const next = [...prev, fullScreenTrack];
        return next.slice(-10); // Лишаємо тільки 10 останніх
      });
    }
    setFullScreenTrack(newTrack);
  }, [fullScreenTrack]);

  const handleTrackEnd = (id) => {
    if (isShuffle) {
      const remaining = processedCards.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        if (fullScreenTrack) handleSetFullScreenTrack(remaining[randomIndex]);
      } else {
        if (fullScreenTrack) setFullScreenTrack(null);
      }
      return;
    }
    const currentIndex = processedCards.findIndex((c) => c.id === id);
    if (currentIndex !== -1 && currentIndex < processedCards.length - 1) {
      if (fullScreenTrack) handleSetFullScreenTrack(processedCards[currentIndex + 1]);
    } else {
      if (fullScreenTrack) setFullScreenTrack(null);
    }
  };
  const playNext = () => {
    if (!fullScreenTrack) return;
    handleTrackEnd(fullScreenTrack.id);
  };
  const playPrev = () => {
    if (playHistory.length > 0) {
      const prevTrack = playHistory[playHistory.length - 1];
      setPlayHistory(prev => prev.slice(0, -1));
      setFullScreenTrack(prevTrack); // Назад без handleSet, щоб не зациклити історію
      return;
    }
    const idx = processedCards.findIndex((c) => c.id === fullScreenTrack.id);
    if (idx > 0) {
      handleSetFullScreenTrack(processedCards[idx - 1]);
    }
  };
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };
  const playlistTitle =
    playlistKey === "custom"
      ? customPlaylistName || "Мій Плейлист"
      : PLAYLISTS[playlistKey].title;
  const tracksToShow = playlistKey === "custom" ? customTracks : processedCards;
  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <PlaylistModalContent
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <PlaylistCloseButton onClick={handleClose}>&times;</PlaylistCloseButton>
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          {playlistTitle}
          {playlistKey === "custom" && ` (${tracksToShow?.length || 0}/10)`}
        </h2>
        {onEdit && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={onEdit}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Редагувати
            </button>
          </div>
        )}
        <ControlsContainer>
          <SearchInput
            type="text"
            placeholder="Пошук пісні за описом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="favorites">Улюблені</option>
            <option value="name_asc">Назва (А-Я)</option>
            <option value="name_desc">Назва (Я-А)</option>
            <option value="duration_asc">Тривалість (мін-макс)</option>
            <option value="duration_desc">Тривалість (макс-мін)</option>
          </SortSelect>
        </ControlsContainer>

        <MusicPhotoFix>
          {processedCards.slice(0, visibleCount).map((card) => (
            <div
              key={card.id}
              style={{ position: "relative", marginBottom: 10 }}
            >
              <MusicCard
                cardData={card}
                user={user}
                rating={getRating(card.id)}
                onOpenModal={setLyricsModalData}
              onOpenPlayer={(id, startTime) => {
                const t = processedCards.find((c) => c.id === id);
                handleSetFullScreenTrack({ ...t, initialTime: startTime || 0 });
              }}
                onRate={handleToggleFavorite}
              checkpoint={checkpoints[card.id]}
              checkpointsEnabled={checkpointsEnabled}
              />
              {playlistKey === "custom" && (
                <button
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 2,
                    background: "#7afcff",
                    color: "#222",
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                  onClick={() => setLevelEditorTrack(card)}
                >
                  Налаштувати
                </button>
              )}
            </div>
          ))}
        </MusicPhotoFix>
        {levelEditorTrack && (
          <ModalOverlay onClick={handleCloseLevelEditor}>
            <PlaylistModalContent onClick={(e) => e.stopPropagation()}>
              <PlaylistCloseButton onClick={handleCloseLevelEditor}>
                &times;
              </PlaylistCloseButton>
              <h3>Level Editor</h3>
              <div style={{ marginBottom: 10 }}>
                <label>Текст для lyrics:</label>
                <input
                  type="text"
                  value={levelEditorTrack.lyrics?.[0]?.text || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      lyrics: [
                        {
                          time: levelEditorTrack.lyrics?.[0]?.time || 0,
                          text: val,
                        },
                      ],
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Час появи тексту (сек):</label>
                <input
                  type="number"
                  value={levelEditorTrack.lyrics?.[0]?.time || 0}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      lyrics: [
                        {
                          time: val,
                          text: levelEditorTrack.lyrics?.[0]?.text || "",
                        },
                      ],
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Фільтри (JSON):</label>
                <textarea
                  value={JSON.stringify(
                    levelEditorTrack.filters || [],
                    null,
                    2,
                  )}
                  onChange={(e) => {
                    let val = e.target.value;
                    try {
                      setLevelEditorTrack({
                        ...levelEditorTrack,
                        filters: JSON.parse(val),
                      });
                    } catch {}
                  }}
                  rows={8}
                  style={{ width: "100%", fontFamily: "monospace" }}
                />
                <button
                  style={{
                    marginTop: 5,
                    background: "#ffb36c",
                    border: "none",
                    borderRadius: 5,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setLevelEditorTrack({
                      ...levelEditorTrack,
                      filters: [
                        {
                          start: 22,
                          end: 49,
                          type: "symbols",
                          isRandomIntensity: true,
                          minIntensity: 130,
                          maxIntensity: 300,
                          isRandomSpeed: true,
                          minSpeed: 0.5,
                          maxSpeed: 5,
                          isRandomBlurSymbols: true,
                          minBlurSymbols: 0,
                          maxBlurSymbols: 2.5,
                        },
                        { start: 0.1, end: 0.4, type: "flash", opacity: 1 },
                        { start: 7, end: 20, type: "black", opacity: 1 },
                        { start: 20, end: 23, type: "grayscale", opacity: 1 },
                        {
                          start: 21,
                          end: 37,
                          randomColor: true,
                          colorOptions: ["red", "green"],
                          isRandom: true,
                          minOpacity: 0.15,
                          maxOpacity: 0.45,
                          isRandomBlur: true,
                          minBlur: 0,
                          maxBlur: 3,
                        },
                        {
                          start: 37,
                          end: 49.7,
                          randomColor: true,
                          colorOptions: ["orange", "cyan"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 49.7, end: 50, type: "flash", opacity: 1 },
                        {
                          start: 50,
                          end: 55,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.4,
                          maxOpacity: 0.8,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 59,
                          end: 64,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.6,
                          maxOpacity: 0.9,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 68,
                          end: 72,
                          randomColor: true,
                          colorOptions: ["black", "grayscale"],
                          isRandom: true,
                          minOpacity: 0.7,
                          maxOpacity: 0.8,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 72,
                          end: 87,
                          randomColor: true,
                          colorOptions: ["purple", "blue"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        {
                          start: 87,
                          end: 100,
                          randomColor: true,
                          colorOptions: ["brown", "orange"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 100, end: 103, type: "grayscale", opacity: 1 },
                        {
                          start: 103,
                          end: 133,
                          randomColor: true,
                          colorOptions: ["cyan", "chaos"],
                          isRandom: true,
                          minOpacity: 0.2,
                          maxOpacity: 0.4,
                          isRandomBlur: true,
                          minBlur: 1,
                          maxBlur: 2,
                        },
                        { start: 133, end: 135, type: "grayscale", opacity: 1 },
                        {
                          start: 135,
                          end: 166,
                          type: "red",
                          minOpacity: 0.15,
                          isRandom: true,
                          maxOpacity: 0.45,
                        },
                      ],
                    });
                  }}
                >
                  Додати рандомні фільтри з Clubstep
                </button>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Зображення (до 7):</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(levelEditorTrack.images || []).map((img, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 5,
                        }}
                      />
                      <button
                        onClick={() => {
                          setLevelEditorTrack({
                            ...levelEditorTrack,
                            images: levelEditorTrack.images.filter(
                              (_, i) => i !== idx,
                            ),
                          });
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {levelEditorTrack.images &&
                    levelEditorTrack.images.length < 7 && (
                      <input
                        type="text"
                        placeholder="URL..."
                        style={{ width: 100 }}
                        onBlur={(e) => {
                          const val = e.target.value.trim();
                          if (val) {
                            setLevelEditorTrack({
                              ...levelEditorTrack,
                              images: [...(levelEditorTrack.images || []), val],
                            });
                            e.target.value = "";
                          }
                        }}
                      />
                    )}
                </div>
              </div>
              <button
                style={{
                  background: "#7afcff",
                  color: "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
                onClick={() => handleSaveLevelEditor(levelEditorTrack)}
              >
                Зберегти
              </button>
            </PlaylistModalContent>
          </ModalOverlay>
        )}

        {visibleCount < processedCards.length && (
          <LoadMoreButton
            onClick={() => {
              if (visibleCount === 10) {
                setVisibleCount(20);
              } else {
                setVisibleCount(processedCards.length);
              }
            }}
          >
            {visibleCount === 10 ? "︾" : "︾"}
          </LoadMoreButton>
        )}

        {lyricsModalData && (
          <ModalOverlay
            $isClosing={isLyricsClosing}
            onClick={handleCloseLyricsModal}
          >
            <LyricsModalContent
              $isClosing={isLyricsClosing}
              onClick={handleCloseLyricsModal}
            >
              <LyricsCloseButton onClick={handleCloseLyricsModal}>
                &times;
              </LyricsCloseButton>
              <LyricsModalImage
                src={lyricsModalData.image}
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  marginBottom: "15px",
                }}
                alt="Music"
              />
              <h4
                style={{
                  textAlign: "center",
                  color: "#333",
                  marginBottom: "10px",
                  marginTop: 0,
                }}
              >
                Текст пісні:
              </h4>
              <LyricsContainer>
                <LyricsViewer
                  lyrics={lyricsModalData.lyrics}
                  currentTime={lyricsCurrentTime}
                  voiceActingMode={voiceActingMode}
                  trackText={lyricsModalData.text}
                />
              </LyricsContainer>
            </LyricsModalContent>
          </ModalOverlay>
        )}
      </PlaylistModalContent>
      {fullScreenTrack && (
        <FullScreenPlayer
          track={fullScreenTrack}
          onClose={() => setFullScreenTrack(null)}
          onNext={playNext}
          onPrev={playPrev}
          user={user}
          rating={getRating(fullScreenTrack.id)}
          onRate={handleToggleFavorite}
          isShuffle={isShuffle}
          onSetShuffle={setIsShuffle}
          onMiniPlayer={(time, isPlaying, vol, spd) => {
            setFullScreenTrack(null);
            onMiniPlayer(fullScreenTrack, time, isPlaying, vol, spd);
          }}
          onAudioBar={(time, isPlaying, vol, spd) => {
            setFullScreenTrack(null);
            onAudioBar(fullScreenTrack, time, isPlaying, vol, spd);
          }}
          playlist={processedCards}
          onSelectTrack={setFullScreenTrack}
          onUpdateUser={onUpdateUser}
          checkpoint={checkpoints[fullScreenTrack.id]}
          onSaveCheckpoint={onSaveCheckpoint}
          onClearCheckpoint={onClearCheckpoint}
          checkpointsEnabled={checkpointsEnabled}
          onToggleCheckpoints={onToggleCheckpoints}
          backgroundMode={backgroundMode}
          onToggleBackgroundMode={handleToggleBackgroundMode}
        />
      )}
    </ModalOverlay>
  );
};

const PlaylistCover = ({ playlistKey, defaultImage, customImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => {
    if (playlistKey === "custom") {
      return [customImage || defaultImage];
    }
    const cards = musicCards.filter((c) => c.category === playlistKey);
    return cards.length > 0 ? cards.map((c) => c.image) : [defaultImage];
  }, [playlistKey, defaultImage, customImage]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ position: "relative", width: "100%", height: "150px" }}>
      {images.map((src, index) => (
        <PlaylistImage
          key={index}
          src={src}
          alt={playlistKey}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

const MusicPhoto = ({ user, onOpenRegister, isAnyModalOpen, onUpdateUser }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [miniPlayerTrack, setMiniPlayerTrack] = useState(null);
  const [miniPlayerInitialTime, setMiniPlayerInitialTime] = useState(0);
  const [miniPlayerInitialIsPlaying, setMiniPlayerInitialIsPlaying] = useState(false);
  const [miniPlayerInitialVolume, setMiniPlayerInitialVolume] = useState(1);
  const [miniPlayerInitialSpeed, setMiniPlayerInitialSpeed] = useState(1);
  const [audioBarTrack, setAudioBarTrack] = useState(null);
  const [restoreTrack, setRestoreTrack] = useState(null);

  const [checkpoints, setCheckpoints] = useState({});
  const [checkpointsEnabled, setCheckpointsEnabled] = useState(true);

  useEffect(() => {
    const loadCheckpoints = async () => {
      try {
        const saved = await localforage.getItem("music_checkpoints");
        if (saved) setCheckpoints(saved);
        const enabled = await localforage.getItem("checkpoints_enabled");
        if (enabled !== null) setCheckpointsEnabled(enabled);
      } catch (e) { console.error(e); }
    };
    loadCheckpoints();
  }, []);

  const handleSaveCheckpoint = useCallback(async (id, time) => {
    if (!checkpointsEnabled) return;
    setCheckpoints(prev => {
      const next = { ...prev, [id]: time };
      localforage.setItem("music_checkpoints", next);
      return next;
    });
  }, [checkpointsEnabled]);

  const handleClearCheckpoint = useCallback(async (id) => {
    setCheckpoints(prev => {
      const next = { ...prev };
      delete next[id];
      localforage.setItem("music_checkpoints", next);
      return next;
    });
  }, []);

  const [customPlaylist, setCustomPlaylist] = useState(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const saved = await localforage.getItem("custom_playlist");
        if (saved) setCustomPlaylist(saved);
      } catch (e) {
        console.error("Помилка завантаження плейлиста:", e);
      }
    };
    loadPlaylist();
  }, []);

  useEffect(() => {
    if (isAnyModalOpen) {
        setMiniPlayerTrack(null);
        setAudioBarTrack(null);
    }
  }, [isAnyModalOpen, miniPlayerTrack]);

  const deleteTrackFromCustomPlaylist = async (trackId) => {
    if (!customPlaylist) {
      console.error("Custom playlist is null, cannot delete track.");
      return;
    }
    if (!Array.isArray(customPlaylist.tracks)) {
      console.error("Custom playlist tracks is not an array, cannot delete track.");
      return;
    }
    const updatedTracks = customPlaylist.tracks.filter((t) => t.id !== trackId);
    const updatedPlaylist = { ...customPlaylist, tracks: updatedTracks };
    setCustomPlaylist(updatedPlaylist);
    await localforage.setItem("custom_playlist", updatedPlaylist);
  };

  const handleEditCustomPlaylist = () => {
    setCurrentPlaylist(null);
    setShowCreateModal(true);
  };

  const handleClosePlaylist = () => {
    setCurrentPlaylist(null);
  };

  const saveCustomPlaylist = async (data) => {
    try {
      setCustomPlaylist(data);
      await localforage.setItem("custom_playlist", data);
      setShowCreateModal(false);
    } catch (e) {
      alert("Помилка збереження! Можливо, файли занадто великі.");
    }
  };

  const openCustomPlaylist = () => {
    setCurrentPlaylist("custom");
  };

  return (
    <MusicPhotoDiv $isAudioBarActive={!!audioBarTrack}>
      <MusicPhotoText>Оберіть плейлист</MusicPhotoText>
      <PlaylistGrid>
        {Object.keys(PLAYLISTS).map((key) => (
          <PlaylistCard key={key} onClick={() => setCurrentPlaylist(key)}>
            <PlaylistCover
              playlistKey={key}
              defaultImage={PLAYLISTS[key].image}
            />
            <PlaylistTitle>{PLAYLISTS[key].title}</PlaylistTitle>
          </PlaylistCard>
        ))}
        {customPlaylist ? (
          <PlaylistCard onClick={openCustomPlaylist}>
            <PlaylistCover
              playlistKey="custom"
              customImage={customPlaylist.cover}
              defaultImage={require("../../photos/vip-images/mechannic.webp")}
            />
            <PlaylistTitle>{customPlaylist.name}</PlaylistTitle>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCreateModal(true);
              }}
              style={{
                background: "orange",
                border: "none",
                padding: 5,
                borderRadius: 5,
                cursor: "pointer",
                marginBottom: 5,
              }}
            >
              Редагувати
            </button>
          </PlaylistCard>
        ) : (
          <PlaylistCard
            onClick={() => setShowCreateModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f0f0f0",
            }}
          >
            <div style={{ color: "#00bdb3", fontSize: "56px" }}>+</div>
            <div
              style={{ color: "#00baad", fontWeight: 600, fontSize: "26px" }}
            >
              Створити плейлист
            </div>
          </PlaylistCard>
        )}
      </PlaylistGrid>

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSave={saveCustomPlaylist}
          initialData={customPlaylist}
        />
      )}

      {currentPlaylist && (
        <PlaylistModal
          playlistKey={currentPlaylist}
          onClose={handleClosePlaylist}
          user={user}
          onOpenRegister={onOpenRegister}
          customTracks={
            currentPlaylist === "custom" ? customPlaylist?.tracks : null
          }
          onEdit={
            currentPlaylist === "custom" ? handleEditCustomPlaylist : null
          }
          onMiniPlayer={(track, time, isPlaying, volume, speed) => {
            setMiniPlayerTrack(track);
            setMiniPlayerInitialTime(time);
            setMiniPlayerInitialIsPlaying(isPlaying);
            setMiniPlayerInitialVolume(volume);
            setMiniPlayerInitialSpeed(speed);
            setCurrentPlaylist(null);
            setAudioBarTrack(null);
            setRestoreTrack(null);
          }}
          onAudioBar={(track, time, isPlaying, volume, speed) => {
            setAudioBarTrack(track);
            setMiniPlayerInitialTime(time);
            setMiniPlayerInitialIsPlaying(isPlaying);
            setMiniPlayerInitialVolume(volume);
            setMiniPlayerInitialSpeed(speed);
            setCurrentPlaylist(null);
            setMiniPlayerTrack(null);
            setRestoreTrack(null);
          }}
          onDeleteTrack={
            currentPlaylist === "custom" ? deleteTrackFromCustomPlaylist : null
          }
          customPlaylistName={
            currentPlaylist === "custom" ? customPlaylist?.name : null
          }
          initialFullScreenTrack={restoreTrack}
          onUpdateUser={onUpdateUser}
          checkpoints={checkpoints}
          checkpointsEnabled={checkpointsEnabled}
          onSaveCheckpoint={handleSaveCheckpoint}
          onClearCheckpoint={handleClearCheckpoint}
          onToggleCheckpoints={async () => {
            const val = !checkpointsEnabled;
            setCheckpointsEnabled(val);
            await localforage.setItem("checkpoints_enabled", val);
          }}
        />
      )}

      <AnimatePresence>
        {miniPlayerTrack && (
          <MiniPlayer
            track={miniPlayerTrack}
            initialTime={miniPlayerInitialTime}
            isPlaying={miniPlayerInitialIsPlaying}
            speed={miniPlayerInitialSpeed}
            volume={miniPlayerInitialVolume}
            checkpoint={checkpoints[miniPlayerTrack.id]}
            checkpointsEnabled={checkpointsEnabled}
            onSaveCheckpoint={handleSaveCheckpoint}
            onClearCheckpoint={handleClearCheckpoint}
            onClose={() => setMiniPlayerTrack(null)}
            onRestore={(time, isPlaying, volume, speed) => {
              const track = miniPlayerTrack;
              setMiniPlayerInitialTime(time);
              setMiniPlayerInitialIsPlaying(isPlaying);
              setMiniPlayerInitialVolume(volume);
              setMiniPlayerInitialSpeed(speed);
              setRestoreTrack(track);
              setMiniPlayerTrack(null);
              setCurrentPlaylist(
                track.category === "custom" ? "custom" : track.category,
              );
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {audioBarTrack && (
          <AudioBar
            track={audioBarTrack}
            initialTime={miniPlayerInitialTime}
            isPlaying={miniPlayerInitialIsPlaying}
            speed={miniPlayerInitialSpeed}
            volume={miniPlayerInitialVolume}
            onClose={() => setAudioBarTrack(null)}
            onRestore={(time, isPlaying, volume, speed) => {
              const track = audioBarTrack;
              setMiniPlayerInitialTime(time);
              setMiniPlayerInitialIsPlaying(isPlaying);
              setMiniPlayerInitialVolume(volume);
              setMiniPlayerInitialSpeed(speed);
              setRestoreTrack(track);
              setAudioBarTrack(null);
              setCurrentPlaylist(track.category === "custom" ? "custom" : track.category);
            }}
            checkpoint={checkpoints[audioBarTrack.id]}
            checkpointsEnabled={checkpointsEnabled}
            onSaveCheckpoint={handleSaveCheckpoint}
            onClearCheckpoint={handleClearCheckpoint}
          />
        )}
      </AnimatePresence>
    </MusicPhotoDiv>
  );
};

export default MusicPhoto;