import styled, { keyframes, css } from "styled-components";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import dinofrozVideo from "../../mp3/dinofroz.mp4";
import soloveyko from "../../photos/vip-images/vip-soloveyko.jpg";
import desert from "../../photos/vip-images/vip-desert.webp";
import harmony from "../../photos/vip-images/asium/asium.jpg";
import horse from "../../photos/vip-images/horse/horse.jpg";
import theorytwo from "../../photos/fan-art/theorytwo.jpg";

import unity from "../../photos/fan-art/unity.jpg";
import mecha from "../../photos/vip-images/mechannic.jpg"; 
import monody from "../../photos/fan-art/monody.jpg";
import christmas from "../../photos/vip-images/christmas.jpg";
import clubstep from "../../photos/fan-art/clubstep.jpg";
import turkeys from "../../photos/vip-images/turkeys/ultra-vip-turkeys.webp";
//Horses
import horsethree from "../../photos/vip-images/horse/horsethree.jpg";
import horsetwo from "../../photos/vip-images/horse/horsetwo.jpg";
import chess from "../../photos/vip-images/horse/chess.jpg";
//Turkeys
import turkeytwo from "../../photos/vip-images/turkeys/turkeytwo.jpg";
import turkeythree from "../../photos/vip-images/turkeys/turkeysthree.jpg";
import turkeyfour from "../../photos/vip-images/turkeys/turkeysfour.jpg";
import turkeyfive from "../../photos/vip-images/turkeys/turkeysfive.jpg";
import turkeysix from "../../photos/vip-images/turkeys/turkeyssix.jpg";
import turkeysone from "../../photos/vip-images/turkeys/turkeysone.jpg";
import turkeyseven from "../../photos/vip-images/turkeys/turkeysseven.jpg";
//Asium
import asiumnine from "../../photos/vip-images/asium/vip-forest.webp";
import asiumone from "../../photos/vip-images/asium/asiumone.jpg";
import asiumtwo from "../../photos/vip-images/asium/asiuntwo.jpg";
import asiumthree from "../../photos/vip-images/asium/asiumthree.jpg";
import asiumfour from "../../photos/vip-images/asium/asiumfour.jpg";
import asiumfive from "../../photos/vip-images/asium/asiumfive.jpg";
import asiumsix from "../../photos/vip-images/asium/asiumsix.jpg";
import asiumseven from "../../photos/vip-images/asium/asiumseven.jpg";
//Swamp
import swamptwo from "../../photos/vip-images/swamp/swamptwo.jpg";
import swampthree from "../../photos/vip-images/swamp/swampthree.jpg";
import swampfour from "../../photos/vip-images/swamp/swampfour.jpg";
import swampfive from "../../photos/vip-images/swamp/swampfive.jpg";
import swampsix from "../../photos/vip-images/swamp/swampsix.jpg";
import swampseven from "../../photos/vip-images/swamp/seampseven.jpg";
import swampeight from "../../photos/vip-images/swamp/swampeight.jpg";
import swampnine from "../../photos/vip-images/swamp/swampnine.jpg";
import theory from "../../photos/fan-art/theory.jpg";
import deadlocked from "../../photos/vip-images/swamp/deadlocked.jpg";
//Horror
import horrortwo from "../../photos/vip-images/horror/horrortwo.jpg";
import horrorthree from "../../photos/vip-images/horror/horrorthree.jpg";
import horrorfour from "../../photos/vip-images/horror/horrorfour.jpg";
import horrorfive from "../../photos/vip-images/horror/horrorfive.jpg";
import horror from "../../photos/vip-images/horror/horror.jpg"
import horrorsix from "../../photos/vip-images/horror/horrorsix.jpg";
import horrorseven from "../../photos/vip-images/horror/horrorseven.jpg";
import horroreight from "../../photos/vip-images/horror/horroreight.jpg";
//Динофроз
import dinofrozone from "../../photos/vip-images/dinofroz/vip-dinofroz.webp";
import dinofroztwo from "../../photos/vip-images/dinofroz/vip-dragons.jpg";
//Mia and me 
import mia from "../../photos/vip-images/mia/miaandme.webp";
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

const MusicPhotoDiv = styled.div`
  background: #e8e8e8;
  border-radius: 20px;
  margin-top: 35px;
  padding: 5px;
  text-align: center;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
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
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
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
  max-width: 300px;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;

const SortSelect = styled.select`
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 16px;
  font-family: var(--font-family);
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;

const PlayAllButton = styled.button`
  background: orange;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
  &:hover {
    background: #e69500;
    transform: scale(1.05);
  }
`;

const ShuffleButton = styled.button`
  background: ${(props) => (props.$active ? "orange" : "white")};
  color: ${(props) => (props.$active ? "white" : "black")};
  border: 2px solid ${(props) => (props.$active ? "orange" : "#ccc")};
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: ${(props) => (props.$active ? "#e69500" : "#f0f0f0")};
    border-color: ${(props) => (props.$active ? "#e69500" : "#bbb")};
    transform: scale(1.05);
  }
`;

const PlaylistGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
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
  height: 456px;
  background: #fff;
  border-radius: 15px;
  padding-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  border: ${(props) => (props.$rating === 2 ? "2px solid #ff0000" : props.$rating === 1 ? "2px solid orange" : "none")};
  animation: ${(props) => (props.$rating === 2 ? css`${pulseRedBorder} 2s infinite` : "none")};
  &:hover {
    transform: translateY(-5px);
  }
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
    content: '▶';
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
  color: ${(props) => (props.$rating === 2 ? "gold" : props.$rating === 1 ? "red" : "#ccc")};
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
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
  line-height: 1.4;
  height: 108px;
  overflow: hidden;
  box-sizing: border-box;
`;

const AuthorText = styled.div`
  color: #666;
  font-size: 11px;
  margin-top: 4px;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 5px;
  span {
    font-size: 10px;
    color: #777;
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
    ${props => props.$activeColor || 'orange'} 0%,
    ${props => props.$activeColor || 'orange'} ${(props) => props.value * 100 || 0}%,
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

// --- New/Updated FullScreen Player Components ---

const SeekBar = styled.input`
  flex-grow: 1;
  height: 5px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    orange 0%,
    orange ${(props) => (props.value / props.max) * 100 || 0}%,
    rgba(255, 255, 255, 0.3) ${(props) => (props.value / props.max) * 100 || 0}%,
    rgba(255, 255, 255, 0.3) ${(props) => ((props.$buffered || 0) / props.max) * 100}%,
    rgba(255, 255, 255, 0.1) ${(props) => ((props.$buffered || 0) / props.max) * 100}%,
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
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
  &:hover {
    height: 8px;
  }
`;

const SpeedSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right,
    ${props => props.$activeColor || 'orange'} 0%,
    ${props => props.$activeColor || 'orange'} ${(props) => ((props.value - 0.2) / 1.8) * 100 || 0}%,
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
    r
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
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    transform: scale(1.2);
  }
`;

const LoopButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "orange" : "white")};
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
  padding: 0 10px;
`;

const ActionButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 37px;
  padding: 3px 9px;
  font-size: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #e0e0e0;
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
  max-width: 310px;
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
  display: ${(props) => (props.$closing ? 'none' : 'flex')};
  flex-direction: column;
  animation: ${(props) => (props.$closing ? slideOut : slideIn)} 0.3s ease-out forwards;

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

const FSHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2010;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
`;

const FSCloseButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.4); }
`;

const FSContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #000;
  width: 100%;
  height: 100%;
`;

const FSVisualWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const FSVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
`;

const FSImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${props => props.$animate ? css`${appearKeyframe} 1s ease` : 'none'};
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
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  padding: 20px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2010;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? 0 : '20px')});
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const FSSliderContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 5px 20px;
  margin-bottom: 10px;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: orange; }
`;

const FSSliderImage = styled.img`
  height: 60px;
  width: 120px;
  object-fit: cover;
  border-radius: 6px;
  opacity: ${props => props.$active ? 1 : 0.5};
  border: ${props => props.$active ? '2px solid orange' : 'none'};
  cursor: pointer;
  transition: all 0.3s;
  &:hover { opacity: 1; }
`;

const FSTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 20px;
  max-width: 60vw;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
`;

const GearModal = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: rgba(30,30,30,0.95);
  padding: 15px;
  border-radius: 12px;
  color: white;
  width: 250px;
  z-index: 2020;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubtitleOverlay = styled.div`
  position: absolute;
  bottom: ${props => props.$show ? (props.$controlsVisible ? '32%' : '15%') : '32%'}; 
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0,0,0,0.5);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 80%;
  z-index: 2005;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 20px;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s, bottom 0.3s ease;
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
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
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
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #e0e0e0;
  text-align: left;
  color: #333;
  max-height: 300px;
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

const SliderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s;
`;

const SliderBtn = styled.button`
  background: orange;
  color: white;
  border: none;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 90%;
  &:hover { background: #ffaa00; }
`;

const PlaylistOverlay = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: rgba(30,30,30,0.95);
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
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: orange; border-radius: 3px; }
  &::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
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
  left: ${props => props.$left}%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #444;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
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

const LyricsViewer = ({ lyrics, currentTime }) => {
  const activeLineIndex = useMemo(() => {
    if (!Array.isArray(lyrics)) return -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return -1;
  }, [lyrics, currentTime]);

  if (!Array.isArray(lyrics)) {
    return <>{lyrics || "Текст відсутній."}</>;
  }

  return (
    <div>
      {lyrics.map((line, index) => (
        <LyricsLine key={index} $active={index === activeLineIndex}>
          {line.text}
        </LyricsLine>
      ))}
    </div>
  );
};

const FullScreenPlayer = ({ track, onClose, onNext, onPrev, rating, onRate, isShuffle, onSetShuffle, playlist, onSelectTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [seekAmount, setSeekAmount] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showScreenshotMenu, setShowScreenshotMenu] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [loop, setLoop] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [downloadRange, setDownloadRange] = useState({ start: 0, end: 0 });
  const [showControls, setShowControls] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [playMode, setPlayMode] = useState(isShuffle ? 1 : 0); // 0: Order, 1: Random, 2: Loop
  const [hoverTime, setHoverTime] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  const mediaRef = useRef(null);
  const previewVideoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const overlayRef = useRef(null);

  const isDinofroz =
    (track.category === "мультфільми" && track.video) ||
    (track.text.toLowerCase().includes("динофроз") && track.category === "мультфільми");

  const sliderImages = useMemo(() => {
    if (track.images && track.images.length > 0) return track.images;
    return [track.image, track.image, track.image];
  }, [track]);

  const handleClose = useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
          onClose();
      }, 300); 
  }, [onClose]);

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
         sliderImages.forEach(img => urlsToLoad.add(img));
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
          })
      );

      await Promise.all(promises);
      
      setTimeout(() => {
        setIsAssetsLoaded(true);
      }, 500);
    };

    preloadAssets();
  }, [track, isDinofroz, sliderImages]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return; 

    const updateTime = () => setProgress(media.currentTime);
    const updateDur = () => {
      setDuration(media.duration);
      setDownloadRange((prev) => ({ ...prev, end: Math.floor(media.duration) }));
    };
    const updateProgress = () => {
        if (media.buffered.length > 0) {
            setBuffered(media.buffered.end(media.buffered.length - 1));
        }
    };

    const handleEnded = () => {
      if (!loop) setIsPlaying(false);
    };

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("progress", updateProgress);
    media.addEventListener("loadedmetadata", updateDur);
    media.addEventListener("ended", handleEnded);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("loadedmetadata", updateDur);
      media.removeEventListener("ended", handleEnded);
      media.removeEventListener("progress", updateProgress);
    };
  }, [track, loop]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      mediaRef.current.playbackRate = speed;
    }
  }, [volume, speed]);
  
  const handleWheel = useCallback((e) => {
    const delta = Math.sign(e.deltaY) * -1;

    if (e.shiftKey) {
        // Speed (0.2 - 2.0)
        setSpeed(prev => Math.max(0.2, Math.min(2.0, +(prev + delta * 0.1).toFixed(1))));
    } else if (e.ctrlKey || e.altKey) {
        // Seek Amount (5 - 30)
        setSeekAmount(prev => Math.max(5, Math.min(30, prev + delta * 5)));
    } else {
        // Volume (0 - 1)
        setVolume(prev => Math.max(0, Math.min(1, +(prev + delta * 0.05).toFixed(2))));
    }
  }, []);

  // Playback mode logic
  const togglePlayMode = () => {
    const nextMode = (playMode + 1) % 3;
    setPlayMode(nextMode);
    
    if (nextMode === 0) { // Order
        setLoop(false);
        if (onSetShuffle) onSetShuffle(false);
    } else if (nextMode === 1) { // Random
        setLoop(false);
        if (onSetShuffle) onSetShuffle(true);
    } else if (nextMode === 2) { // Loop
        setLoop(true);
        // Shuffle state technically doesn't matter for single loop, but keeping previous shuffle state is fine or turn off.
        // Usually single loop overrides playlist navigation.
    }
  };

  useEffect(() => {
      // Sync initial shuffle state if needed, but local state takes precedence after mount
      if (playMode === 1 && !isShuffle && onSetShuffle) onSetShuffle(true);
  }, [playMode, isShuffle, onSetShuffle]);
  
  // Disappearing controls
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
      window.addEventListener('mousemove', resetControlsTimeout);
      window.addEventListener('touchstart', resetControlsTimeout);
      window.addEventListener('touchmove', resetControlsTimeout);
      return () => {
        window.removeEventListener('mousemove', resetControlsTimeout);
        window.removeEventListener('touchstart', resetControlsTimeout);
        window.removeEventListener('touchmove', resetControlsTimeout);
      };
  }, [resetControlsTimeout]); // Added dependency

  const currentLyric = useMemo(() => {
      if (!Array.isArray(track.lyrics)) return null;
      let active = null;
      for (let i = 0; i < track.lyrics.length; i++) {
          if (progress >= track.lyrics[i].time) {
              active = track.lyrics[i].text;
          } else {
              break; 
          }
      }
      return active;
  }, [track.lyrics, progress]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      resetControlsTimeout();
      if (e.code === "Escape") handleClose();
      if (!mediaRef.current) return;
      if (e.code === "Space") {
        togglePlay();
      } else if (e.code === "ArrowRight") {
        mediaRef.current.currentTime = Math.min(
          mediaRef.current.duration,
          mediaRef.current.currentTime + 5,
        );
      } else if (e.code === "ArrowLeft") {
        mediaRef.current.currentTime = Math.max(
          0,
          mediaRef.current.currentTime - 5,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, togglePlay, resetControlsTimeout]);

  useEffect(() => {
    if (isDinofroz || !duration || sliderImages.length === 0) return;
    
    const segmentDuration = duration / sliderImages.length;
    if (segmentDuration <= 0) return;

    const idx = Math.min(Math.floor(progress / segmentDuration), sliderImages.length - 1);
    if (idx !== currentImgIdx) setCurrentImgIdx(idx);
  }, [progress, duration, sliderImages.length, isDinofroz, currentImgIdx]);

  const getCroppedDataUrl = (source) => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const process = (img) => {
            const w = img.videoWidth || img.naturalWidth || img.width;
            const h = img.videoHeight || img.naturalHeight || img.height;
            
            // Crop 5% from each side (10% total reduction in dimension, approx 19% area reduction, or interpreting "10% area" loosely as margins)
            // "обрізають 10% площі" -> 10% of area. sqrt(0.9) = 0.948. So ~2.5% from each side.
            // But "10% площі" usually colloquially means "crop 10%". Let's do 5% margins (10% total dimension crop).
            const cropX = w * 0.05;
            const cropY = h * 0.05;
            const cropW = w * 0.9;
            const cropH = h * 0.9;
            
            canvas.width = cropW;
            canvas.height = cropH;
            
            ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            resolve(canvas.toDataURL("image/jpeg"));
        };

        if (typeof source === 'string') {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => process(img);
            img.src = source;
        } else {
            process(source);
        }
    });
  };

  const downloadScreenshot = async () => {
      const source = (isDinofroz && mediaRef.current) ? mediaRef.current : sliderImages[currentImgIdx];
      const dataUrl = await getCroppedDataUrl(source);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `screenshot-${Date.now()}.jpg`;
      a.click();
      setShowScreenshotMenu(false);
  };
  
  const printScreenshot = async () => {
      const source = (isDinofroz && mediaRef.current) ? mediaRef.current : sliderImages[currentImgIdx];
      const dataUrl = await getCroppedDataUrl(source);
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `<html><head><title>Print</title></head><body style="text-align:center;"><img src="${dataUrl}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
      );
      printWindow.document.close();
      setShowScreenshotMenu(false);
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

  // Cache logic
  const checkCache = useCallback(async () => {
      if ('caches' in window) {
          const cache = await caches.open('audio-cache');
          const match = await cache.match(isDinofroz ? track.video : track.audio);
          setIsCached(!!match);
      }
  }, [track, isDinofroz]);

  useEffect(() => { checkCache(); }, [checkCache]); // Added dependency

  const toggleCache = async () => {
      if (!('caches' in window)) return;
      const cache = await caches.open('audio-cache');
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

  const startHoldSeek = (direction) => {
      if(holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = setInterval(() => {
          if(mediaRef.current) {
              const delta = direction === 'left' ? -2 : 2;
              mediaRef.current.currentTime = Math.max(0, Math.min(mediaRef.current.duration, mediaRef.current.currentTime + delta));
              setProgress(mediaRef.current.currentTime);
          }
      }, 100);
  };
  const stopHoldSeek = () => {
      if(holdIntervalRef.current) clearInterval(holdIntervalRef.current);
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60) || 0;
    const s = Math.floor(t % 60) || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <FullScreenOverlay ref={overlayRef} onMouseMove={resetControlsTimeout} onClick={(e) => { e.stopPropagation(); resetControlsTimeout(); }} $closing={isClosing} onWheel={handleWheel}>
      <FSHeader style={{ opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FSCloseButton onClick={handleClose}>&times;</FSCloseButton>
          <div style={{display:'flex', flexDirection:'column'}}>
             <FSTitle>{track.text}</FSTitle>
             {track.category !== 'мультфільми' && <span style={{color:'#ccc', fontSize:'12px'}}>Музика • {track.category}</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <ActionButton onClick={() => onRate(track.id)} title={`Оцінка: ${rating} балів. (Макс 4 пісні з оцінками)`}>
            {rating === 2 ? "💛" : rating === 1 ? "❤️" : "🤍"}
          </ActionButton>
          <ActionButton onClick={() => setShowScreenshotMenu(!showScreenshotMenu)} title="Скріншот">📸</ActionButton>
          <ActionButton onClick={handlePrint} title="Друк">🖨️</ActionButton>
          <ActionButton onClick={() => setShowDownload(true)} title="Завантажити">⇩</ActionButton>
          <ActionButton onClick={() => setShowPlaylist(!showPlaylist)} title="Список відтворення">📑</ActionButton>
          <ActionButton onClick={() => setShowHelp(true)} title="Довідка">?</ActionButton>
          <ActionButton onClick={() => setShowSettings(!showSettings)} title="Налаштування">⚙️</ActionButton>
        </div>
      </FSHeader>

      {!isAssetsLoaded && (
        <LoadingContainer>
          <div style={{ color: "#94fffa", fontSize: "14px", marginBottom: "5px" }}>Завантаження... {loadingProgress}%</div>
          <ProgressBar>
            <ProgressBarFill $progress={loadingProgress} />
          </ProgressBar>
        </LoadingContainer>
      )}

      <FSContent 
        ref={containerRef}
        onMouseDown={(e) => {
            // Simple check for clicking sides vs center
            const width = containerRef.current.clientWidth;
            const x = e.clientX;
            if (x < width * 0.2) startHoldSeek('left');
            else if (x > width * 0.8) startHoldSeek('right');
            else togglePlay();
        }}
        onMouseUp={stopHoldSeek}
        onMouseLeave={stopHoldSeek}
        onTouchStart={(e) => {
            const width = containerRef.current.clientWidth;
            const x = e.touches[0].clientX;
            if (x < width * 0.2) startHoldSeek('left');
            else if (x > width * 0.8) startHoldSeek('right');
        }}
        onTouchEnd={stopHoldSeek}
      >
        <FSVisualWrapper style={{position: 'relative'}}>
            {isDinofroz ? (
              <>
                <FSVideo
                  ref={mediaRef}
                  src={track.video || dinofrozVideo}
                  playsInline
                  loop={loop}
                  style={{ opacity: (progress === 0 && !isPlaying) ? 0 : 1 }}
                />
                {(progress === 0 && !isPlaying) && (
                   <FSImage 
                      src={track.image} 
                      style={{position:'absolute', top:0, left:0, zIndex: 1}} 
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
                />
              </>
            )}
        </FSVisualWrapper>

        {!isPlaying && (
          <div
            style={{
              position: "absolute",
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              fontSize: "60px",
              color: "rgba(255,255,255,0.8)",
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
              width: '100px', height: '100px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            ▶
          </div>
        )}
      </FSContent>

      {/* Lyrics Overlay with dynamic position */}
      <SubtitleOverlay $show={!!currentLyric} $controlsVisible={showControls}>
         {currentLyric}
      </SubtitleOverlay>
      {/* Audio Element for non-video tracks (Dinofroz uses FSVideo which is a video tag) */}
      {!isDinofroz && <audio ref={mediaRef} src={track.audio} loop={loop} />}

      <FSControls $visible={showControls} onClick={(e) => e.stopPropagation()}>
        {/* Seek Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "white", fontSize: "12px" }}>
          <span>{formatTime(progress)}</span>
          <SeekBarWrapper onMouseMove={handleSeekHover} onMouseLeave={() => setHoverTime(null)}>
            {hoverTime !== null && duration > 0 && (
                <SeekTooltip $left={(hoverTime / duration) * 100} className="seek-tooltip">
                    {isDinofroz ? (
                        <video ref={previewVideoRef} src={track.video || dinofrozVideo} muted preload="auto" />
                    ) : (sliderImages.length > 0 && (
                        <img src={sliderImages[Math.min(Math.floor(hoverTime / (duration / sliderImages.length)), sliderImages.length - 1)]} alt="preview" />
                    ))}
                    <span>{formatTime(hoverTime)}</span>
                </SeekTooltip>
            )}
            <SeekBar
                type="range"
                min="0"
                max={duration || 0}
                $buffered={isDinofroz ? buffered : 0}
                value={progress}
                onChange={(e) => (mediaRef.current.currentTime = e.target.value)}
            />
          </SeekBarWrapper>
          <span>{formatTime(duration)}</span>
          {isDinofroz && <span style={{fontSize: '10px', color: '#aaa'}}>({formatTime(buffered)})</span>}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}>
           {/* Slider for images if not video */}
          {!isDinofroz && (
            <FSSliderContainer>
              {sliderImages.map((img, i) => (
                <SliderItemWrapper key={i}>
                  <FSSliderImage
                    src={img}
                    $active={i === currentImgIdx}
                    style={{cursor: 'default'}}
                    onClick={(e) => e.stopPropagation()} 
                  />
                  <SliderOverlay className="slider-overlay">
                    <SliderBtn onClick={(e) => { e.stopPropagation(); handleDownloadImage(img); }}>Скачати</SliderBtn>
                    <SliderBtn onClick={(e) => { e.stopPropagation(); handlePrintImage(img); }}>Друкувати</SliderBtn>
                  </SliderOverlay>
                </SliderItemWrapper>
              ))}
            </FSSliderContainer>
          )}
        </div>
        
        {/* Main Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: '0 10px' }}>
          <div style={{display:'flex', gap:'10px'}}>
            <ActionButton onClick={onPrev}>⏮</ActionButton>
            <ActionButton onClick={togglePlay}>
                {isPlaying ? "⏸" : "▶"}
            </ActionButton>
            <ActionButton onClick={onNext}>⏭</ActionButton>
          </div>

          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
             <ActionButton onClick={() => (mediaRef.current.currentTime -= seekAmount)}>-{seekAmount}s</ActionButton>
             <div style={{display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '20px'}}>
                <span style={{color:'white', fontSize:'12px'}}>⚡</span>
                <SpeedSlider
                    type="range"
                    min="0.2"
                    max="2.1"
                    step="0.1"
                    $activeColor="#7afcff"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    style={{width: '60px'}}
                />
                <span style={{color:'white', fontSize:'10px', width: '25px', textAlign: 'right'}}>{speed.toFixed(1)}x</span>
             </div>
             <ActionButton onClick={() => (mediaRef.current.currentTime += seekAmount)}>+{seekAmount}s</ActionButton>
          </div>

          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <LoopButton $active={isCached} onClick={toggleCache} title={isCached ? "Збережено" : "Кешувати"}>
                {isCached ? "✓" : "⇩"}
            </LoopButton>
            <div style={{display:'flex', alignItems:'center', gap: '5px'}}>
               <span style={{color:'white', fontSize:'12px'}}>🔊</span>
               <VolumeSlider 
                  type="range" min="0" max="1" step="0.05" 
                  value={volume} 
                  onChange={e => setVolume(parseFloat(e.target.value))} 
                  style={{width: '60px'}}
               />
            </div>
          <LoopButton $active={true} onClick={togglePlayMode} title={playMode === 0 ? "По порядку" : playMode === 1 ? "Випадково" : "Автоповтор"}>
             {playMode === 0 ? "➡" : playMode === 1 ? "🔀" : "🔁"}
          </LoopButton>
          </div>
        </div>
      </FSControls>

      {showSettings && (
        <GearModal>
          <h4>Налаштування</h4>
          <SliderRow>
            <span style={{ color: "white" }}>Гучність</span>
            <VolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.05"
              $activeColor="#7afcff"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </SliderRow>
          <SliderRow>
            <span style={{ color: "white" }}>Швидкість ({speed}x)</span>
            <SpeedSlider
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              $activeColor="#7afcff"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
            />
          </SliderRow>
          <SliderRow>
            <span style={{ color: "white" }}>Промотка ({seekAmount}с)</span>
            <SeekAmountSlider
              type="range"
              min="5" 
              max="20"
              step="5"
              $activeColor="#7afcff"
              value={seekAmount}
              onChange={(e) => setSeekAmount(parseInt(e.target.value, 10))}
            />
          </SliderRow>
          <button onClick={() => setShowSettings(false)} style={{marginTop:'10px', width:'100%', background:'transparent', border:'1px solid white', color:'white'}}>Закрити</button>
        </GearModal>
      )}
      
      {showScreenshotMenu && (
        <GearModal style={{bottom: 'auto', top: '70px', right: '80px', width: '150px'}}>
            <button onClick={downloadScreenshot} style={{background:'transparent', border:'none', color:'white', textAlign:'left', cursor:'pointer', padding:'5px'}}>📥 Скачати</button>
            <button onClick={printScreenshot} style={{background:'transparent', border:'none', color:'white', textAlign:'left', cursor:'pointer', padding:'5px'}}>🖨️ Друкувати</button>
        </GearModal>
      )}
      
      {showPlaylist && (
        <PlaylistOverlay>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom: '1px solid #555', paddingBottom:'5px'}}>
                <h4 style={{margin:0}}>Черга відтворення</h4>
                <button onClick={() => setShowPlaylist(false)} style={{background:'transparent', border:'none', color:'white', cursor:'pointer'}}>✕</button>
            </div>
            {playlist && playlist.map((t, i) => (
                <div 
                    key={t.id} 
                    style={{
                        padding: '8px', 
                        background: t.id === track.id ? 'rgba(255, 165, 0, 0.3)' : 'transparent', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                    onClick={() => { onSelectTrack(t); }}
                >
                    <img src={t.image} alt="art" style={{width: '30px', height: '30px', borderRadius: '4px', objectFit:'cover'}} />
                    <div style={{flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{t.text}</div>
                    <span style={{fontSize: '11px', color: '#ccc'}}>{formatTime(t.duration)}</span>
                </div>
            ))}
        </PlaylistOverlay>
      )}
      
      {showHelp && (
        <DownloadModal style={{width: '380px', textAlign: 'left', background: '#222', color: '#eee', border: '1px solid #444'}}>
            <h3 style={{textAlign: 'center', color: '#ffb36c'}}>Довідка</h3>
            <ul style={{fontSize: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
                <li><b>Свайп/Стрілки:</b> Перемикання треків</li>
                <li><b>Пробіл:</b> Пауза/Старт</li>
                <li><b>Клік зліва/справа (20% екрану):</b> Промотка -2с/+2с</li>
                <li><b>Центр екрану:</b> Пауза/Старт</li>
                <li><b>Шестерня:</b> Налаштування швидкості, гучності, інтервалу промотки</li>
                <li><b>Динофроз:</b> Навідміну від інших відео, замість свайпу картинок</li>
                <li><b>Прев'ю:</b> Наведення на шкалу показує кадр (відео) або фото</li>
                <li><b>Регулятор:</b> Справа від звукового джойстика, натискайте для зміни: Автоповтор, наступна пісня по черзі, чи випадково</li>
                <li><b>Кешування:</b> Зберігає пісню/відео (Доступ без інтернету). Зліва від звукового джойстика</li>
                <li><b>Скрін:</b> Знак камери, вибір: скачати, сфотографувати.</li>
                <li><b>Обрізка:</b> Скріншоти та завантаження фото автоматично обрізають 10% площі (по 5% з країв).</li>
            </ul>
            <button onClick={() => setShowHelp(false)} style={{width: '100%', marginTop: '10px', background: '#444', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer'}}>Зрозуміло</button>
        </DownloadModal>
      )}

      {showDownload && (
        <DownloadModal>
          <h3>Завантаження</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = isDinofroz ? track.video || dinofrozVideo : track.audio;
                a.download = `full_track.${isDinofroz ? "mp4" : "mp3"}`;
                a.click();
              }}
              style={{ padding: "10px", background: "orange", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              Скачати повністю
            </button>
            <hr style={{ width: "100%" }} />
            <label>Вибрати проміжок (сек):</label>
            <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
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
                alert(`Завантаження відрізку ${downloadRange.start}с - ${downloadRange.end}с розпочато! (Емуляція)`);
                setShowDownload(false);
              }}
              style={{ padding: "8px", background: "#444", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
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
                style={{ marginTop: "5px", padding: "8px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Скачати поточне фото
              </button>
            )}
          </div>
          <button
            onClick={() => setShowDownload(false)}
            style={{ background: "transparent", border: "1px solid #333", padding: "5px 15px", borderRadius: "5px" }}
          >
            Закрити
          </button>
        </DownloadModal>
      )}
    </FullScreenOverlay>
  );
};

const MusicCard = ({
  cardData,
  onOpenModal,
  rating,
  onOpenPlayer,
  onRate,
}) => {
  const { id, image, text, deezerLink } = cardData;

  const handleDownloadTrack = (e) => {
      e.stopPropagation();
      // Note: This assumes cardData.audio is accessible/downloadable
      const a = document.createElement("a");
      a.href = cardData.audio;
      a.download = `${text || 'track'}.mp3`;
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
        <HeartButton
          $rating={rating}
          title={
            rating === 2 ? "2 бали (макс)" : rating === 1 ? "1 бал" : "Оцінити"
          }
          onClick={(e) => { e.stopPropagation(); onRate && onRate(id); }}
        >
          {rating === 2 ? "💛" : rating === 1 ? "❤️" : "🤍"}
        </HeartButton>
        <MusicImage src={image} alt="Music" onClick={() => onOpenPlayer(id)} />
      </MusicImageContainer>

      {text && <MusicText title={text}>{text}</MusicText>}
      <AuthorText>{cardData.author || "Невідомий автор"}</AuthorText>

      <ActionButtonsContainer>
        <ActionButton
          title="Текст пісні"
          onClick={() => onOpenModal({ ...cardData })}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </ActionButton>
        <ActionButton title="Відкрити плеєр" onClick={() => onOpenPlayer(id)}>
            <svg viewBox="0 0 24 24">
               <path d="M8 5v14l11-7z" />
            </svg>
        </ActionButton>
        <ActionButton title="Завантажити" onClick={handleDownloadTrack}>
            ⇩
        </ActionButton>
        <ActionButton title="Роздрукувати обкладинку" onClick={handlePrintCover}>
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
  {
    id: 1,
    image: require("../../photos/vip-images/christmas.jpg"),
    audio: require("../../mp3/kolada.mp3"),
    text: "Україна колядує",
    lyrics: "Текст в розробці.",
    category: "хіти",
    duration: 180,
    images: [christmas],
    author: "'Україна колядує' Озвучка Ірини Федишин",
  },
  {
    id: 2,
    image: require("../../photos/vip-images/dinofroz/vip-dinofroz.webp"),
    audio: require("../../mp3/dinofroz.mp3"),
    category: "мультфільми",
    video: dinofrozVideo,
    text: "Динофроз - Mondo TV. Легендарний мультфільм на малятко ТВ(нажаль закритий). Зображено Імператора дрaконів Ніцерона.",
       lyrics: [
      { time: 8, text: "Динофроз...Динофроз!" },
      { time: 15, text: "Світять яскраві зірки. Пригод крізь віки." },
      { time: 21, text: "В доісторичний світ потрапили ми." },
      { time: 26, text: "Тут динозаври б'ються в парі з людьми." },
      { time: 33, text: "В битвах з ворогом твердий гартується дух!" },
      { time: 38, text: "Страху немає, упевненим робиться рух!" },
      { time: 44, text: "Бачимемо ціль і до бою рушаєм! Ми батьківшину свою захищаєм!" },
      { time: 50, text: "Динофроз! Воїни світла і воїни миру!" },
      { time: 56, text: "Динофроз! Лиш в боротьбі здобувам довіру!" },
      { time: 62, text: "Динофроз! Готуємось до бою завзято!" },
      { time: 66, text: "Будь сміливим друже! Переможе дужий!" },
      { time: 72, text: "Чистимо зброю! Готові до бою!" },
      { time: 75, text: "В битві за волю! Пірна з головою!" },
      { time: 77, text: "Пекло за дух. І мороз усе це динофроз!" },
      { time: 800, text: "Динофроз...Динофроз!" },
      { time: 1500, text: "Четверо друзів знайшли дивну гру. В доісторичну пішли давнину." },
      { time: 2100, text: "Там динозаврами стали вони" },
      { time: 2600, text: "Тут динозаври б'ються в парі з людьми." },
      { time: 3300, text: "В цьому карти їм допомогли. " },
      { time: 3800, text: "У давнині небезпечні дракони. Та з ними впорались наші герої." },
      { time: 4400, text: "До бою готові всюди і завжди. І утілюють мрiї свої в боротьбі." },
      { time: 5000, text: "Динофроз! Дружні, завзяті, зброя в руках. " },
      { time: 5600, text: "Динофроз! Вони Ніцерону не по зубах." },
      { time: 6200, text: "Динофроз! Дружні, завзяті, зброя в руках. Вони Ніцерону не по зубах." },
      { time: 6600, text: "Друзі б'ються завзято. Дракони тікають!" },
      { time: 7200, text: "Четверо друзів майбутнє спасають!" },
      { time: 7500, text: "До бою завжди готові вони." },
      { time: 7700, text: "Ховайтеся, вороги! " },
    ],
    
      duration: 120,
    images: [dinofrozone],
  },
  {
    id: 3,
    image: require("../../photos/vip-images/turkeys/ultra-vip-turkeys.webp"),
    audio: require("../../mp3/turkeys.mp3"),
    text: "Індики. Насолоджуйтеся звуками індиків. Авторське спостереження.",
    category: "природа",
    lyrics: "Лише звуки індиків.",
    duration: 60,
    images: [turkeysone, turkeytwo, turkeythree, turkeyfour, turkeyfive, turkeysix, turkeyseven, turkeys],
  },
  {
    id: 4,
    image: require("../../photos/fan-art/monody.jpg"),
    category: "хіти",
    audio: require("../../mp3/thefatrat-monody.mp3"),
    text: "Monody -  TheFatRat.",
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
  },
  {
    id: 5,
    image: require("../../photos/vip-images/vip-desert.webp"),
    audio: require("../../mp3/wind.mp3"),
    category: "природа",
    text: "Звук дощу. Пустеля розділенна вічно грозовою і сонячною зоною. Невідомий автор.",
    lyrics: "Звуки дощу, допомагають заснути",
    duration: 300,
    images: [desert],
  },
  {
    id: 7,
    image: require("../../photos/vip-images/horse/horse.jpg"),
    audio: require("../../mp3/horse.mp3"),
    category: "природа",
    text: "Кінь друг людини. Телеканал мега(автор звуку). Природа.",
    lyrics: "Звуки коня.",
    duration: 45,
    images: [horsethree, horsetwo, horse, chess],
  },
  {
    id: 8,
    image: require("../../photos/vip-images/dinofroz/vip-dragons.jpg"),
    audio: require("../../mp3/dragon.mp3"),
    category: "ігри",
    text: "Dragonora - MyLittleUniverse(Estoty). І знову дракони, музика доісторичного світу. Картина взята з мультфільму Динофроз. Звучить при комбінації.",
    lyrics: "Атмосферна доісторична музика.",
    duration: 180,
    images: [dinofrozone, dinofroztwo],
  },
  {
    id: 9,
    image: require("../../photos/vip-images/vip-soloveyko.jpg"),
    audio: require("../../mp3/soloveyko.mp3"),
    category: "природа",
    text: "Соловейко. Голосування хто кращий по звукам соловеко чи індик. Зроблено за ідеї сім'ї.",
    lyrics: "Спів соловейка.",
    duration: 90,
    images: [soloveyko],
  },
  {
    id: 10,
    image: require("../../photos/vip-images/asium/asium.jpg"),
    audio: require("../../mp3/harmonic-japan.mp3"),
    category: "ігри",
    text: "Asium - My little universe(Estoty). Спокійна і прекрасна музика в японському стилі.",
    lyrics: "Текст відсутній.",
    duration: 160,
    images: [asiumone, asiumtwo, asiumthree, asiumfour, asiumfive, asiumsix, asiumseven, harmony, asiumnine, ],
  },
  {
    id: 11,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/mechanik-kindom.mp3"),
    category: "ігри",
    text: "Factorium - My little universe(Estoty). Спокійна і прекрасна музика в механічному стилі.",
    lyrics: "Текст відсутній, для любителів стімпанку.",
    duration: 160,
    images: [mecha],
  },
  {
    id: 12,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/zootopia.mp3"),
    category: "мультфільми",
    text: "Зоотрополіс(Disney)-рекомендую. Shakira-Try Everything.",
    lyrics: "Текст в розробці",
    duration: 200,
    images: [mecha],
  },
  {
    id: 13,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/zootopiatwo.mp3"),
    category: "мультфільми",
    text: "Продовження історої Зоотрополісу(Disney). Чекатиму, через 5років продовження. Skakira, Ed Sheeran - Zoo.",
    lyrics: "Текст в розробці.",
    duration: 200,
    images: [swampeight, swampnine, swamptwo],
  },
  {
    id: 14,
    image: require("../../photos/vip-images/mia/miaandme.webp"),
    audio: require("../../mp3/mia-and-me.mp3"),
    category: "мультфільми",
    text: "Мія та я. Не пожалкуєте.",
    lyrics: "Текст в розробці.",
    duration: 180,
    images: [mia],
  },
  {
    id: 15,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chapterone.mp3"),
    category: "мультфільми",
    text: "Динофроз, показували, з кількома, ще мульфільмами: Якарі, Анна з зелених дахів, Хайді, Острів іпаток, Пригоди в качиному порту, Марко, Лис Микита.",
    lyrics: "Не скоро.",
    duration: 180,
    images: [dinofrozone, dinofroztwo],
  },
  {
    id: 16,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chaptertwo.mp3"),
    category: "мультфільми",
    text: "Друга частина. Пісні розміщені в 3 частинах. Четверта під питанням.",
    lyrics: "Не скоро.",
    duration: 180,
    images: [dinofroztwo, dinofrozone],
  },
  {
    id: 17,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/malatkotv-chapterthree.mp3"),
    category: "мультфільми",
    text: "Третя частина",
    lyrics: "Не скоро.",
    duration: 180,
    images: [dinofrozone, dinofroztwo],
  },
  {
    id: 18,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/electrodynamix.mp3"),
    text: "Electrodynamix - DJ-Nate (GeometryDash).",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 160,
    images: [turkeys, turkeytwo],
  },
  {
    id: 19,
    image: require("../../photos/fan-art/clubstep.jpg"),
    audio: require("../../mp3/clubstep.mp3"),
    text: "Clubstep - DJ-Nate(GeometryDash).",
    category: "ігри",
              lyrics: [
      { time: 0, text: "Текст хаотичний, лише для атмосфери" },
      { time: 25, text: "" },
    ],
    duration: 160,
    images: [clubstep],
  },
  {
    id: 20,
    image: require("../../photos/vip-images/mechannic.jpg"),
    audio: require("../../mp3/fingerdash.mp3"),
    text: "Fingerdash-MDK(GeometryDash) Гаряча мелодія I-ша в режимі анімованості. Ласково просимо в хаос!",
    category: "ігри",
    lyrics: [
      { time: 0, text: "Текст хаотичний, лише для атмосфери" },
      { time: 25, text: "" },
    ],
    duration: 140,
    images: [horrortwo, horrorthree],
  },
  {
    id: 21,
    image: require("../../photos/fan-art/theorytwo.jpg"),
    audio: require("../../mp3/theoty-of-everything-ll.mp3"),
    text: "Theory of everything II - DJ-Nate(GeometryDash). Ця пісня варта уваги!",
    category: "ігри",
       lyrics: [
      { time: 200, text: "Кінець, виконаний піаніно." },
    ],
    duration: 140,
    images: [theorytwo],
  },
  {
    id: 22,
    image: require("../../photos/vip-images/swamp/deadlocked.jpg"),
    audio: require("../../mp3/deadlocked.mp3"),
    text: "Deadlocked - F77(GeometryDash). Моторошна, але епічна пісня. Друг фанат цього рівня :).",
    category: "ігри",
    lyrics: "Текст відсутній.",
    duration: 140,
    images: [deadlocked, swamptwo, swampthree, swampfour, swampfive, swampsix, swampseven, swampeight, horror, horrortwo, horrorthree, horrorfour, horrorfive, horrorsix, horrorseven, horroreight],
  },
  {
    id: 23,
    image: require("../../photos/fan-art/theory.jpg"),
    audio: require("../../mp3/theory-of-everyting.mp3"),
    text: "DJ-Nate - Theory of everything(GeometryDash). Ця пісня варта уваги!",
    category: "ігри",
          lyrics: [
      { time: 81, text: "Say Down" },
      { time: 83, text: "" },
      { time: 118, text: "Say Down" },
      { time: 120, text: "" },
      { time: 275, text: "Білий шум" },
    ],
    duration: 140,
    images: [theory],
  },
  {
    id: 24,
    image: require("../../photos/fan-art/unity.jpg"),
    audio: require("../../mp3/unity.mp3"),
    text: "Unity-TheFatRat. Класний комп'ютерний хіт, не розумію чого його не поставили у фільм Матриця?",
    lyrics: [
      { time: 0, text: "Текст хаотичний, лише для атмосфери" },
      { time: 15, text: "Відлуння атмосферного вигуку" },
      { time: 25, text: "" },
    ],
    category: "хіти",
    duration: 180,
    images: [unity],
  },
];

const PLAYLISTS = {
  хіти: {
    title: "Хіти",
    image: require("../../photos/vip-images/asium/vip-forest.webp"),
  },
  мультфільми: {
    title: "Мультфільми",
    image: require("../../photos/vip-images/dinofroz/vip-dinofroz.webp"),
  },
  природа: {
    title: "Природа",
    image: require("../../photos/vip-images/turkeys/ultra-vip-turkeys.webp"),
  },
  ігри: {
    title: "Ігри",
    image: require("../../photos/vip-images/mechannic.jpg"),
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

    const reader = new FileReader();

    if (progressId) {
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          setProgress(percent);
        }
      };
    }

    reader.onload = (ev) => {
      callback(ev.target.result);
      if (progressId) {
        setProgress(0);
        setActiveProgressId(null);
      }
    };
    reader.readAsDataURL(file);
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
      const reader = new FileReader();
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          setProgress(percent);
        }
      };
      reader.onload = (ev) => {
        const newTracks = [...tracks];
        newTracks[index].audio = ev.target.result;
        newTracks[index].duration = audio.duration;
        setTracks(newTracks);
        setActiveProgressId(null);
        setProgress(0);
      };
      reader.readAsDataURL(file);
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
    
    setActiveProgressId('playlist-cover');
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
          {activeProgressId === 'playlist-cover' && (
            <div style={{width: '100%', height: '5px', background: '#ddd', marginTop: '5px', borderRadius: '3px'}}>
              <div style={{height: '100%', background: 'orange', width: `${progress}%`, transition: 'width 0.2s'}}></div>
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
          <p style={{ fontSize: '11px', color: 'grey', margin: '-5px 0 10px 0' }}>
            Примітка: можна додати лише скорочену версію (30с), повна версія доступна на офіційному сайті Deezer.
          </p>
          <div
            style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: 'center' }}
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
                    onClick={() => window.open(track.link, '_blank')}
                    style={{
                      background: 'blue',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      fontSize: '10px',
                      marginLeft: '5px',
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
              {track.audio && (track.audio.startsWith('http') || track.audio.startsWith('data:')) ? (
                <div>
                  <audio controls src={track.audio} style={{width: '100%'}} />
                  <button type="button" onClick={() => updateTrack(i, 'audio', '')} style={{marginTop: '5px', cursor: 'pointer'}}>Видалити аудіо</button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleAudio(e, i)}
                />
              )}
              {activeProgressId === `track-audio-${i}` && (
                 <div style={{width: '100%', height: '5px', background: '#ddd', marginTop: '5px', borderRadius: '3px'}}>
                   <div style={{height: '100%', background: 'orange', width: `${progress}%`, transition: 'width 0.2s'}}></div>
                 </div>
              )}
            </InputGroup>
            <InputGroup>
              <label>Зображення пісні</label>
              {track.image && (track.image.startsWith('http') || track.image.startsWith('data:')) ? (
                <div>
                  <img src={track.image} alt="Обкладинка" style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px'}} />
                  <button type="button" onClick={() => updateTrack(i, 'image', '')} style={{display: 'block', marginTop: '5px', cursor: 'pointer'}}>Видалити обкладинку</button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFile(e, (res) => updateTrack(i, "image", res), `track-image-${i}`)
                  }
                />
              )}
              {activeProgressId === `track-image-${i}` && (
                 <div style={{width: '100%', height: '5px', background: '#ddd', marginTop: '5px', borderRadius: '3px'}}>
                   <div style={{height: '100%', background: 'orange', width: `${progress}%`, transition: 'width 0.2s'}}></div>
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
  onDeleteTrack,
  customPlaylistName,
}) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [lyricsModalData, setLyricsModalData] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isLyricsClosing, setIsLyricsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("favorites");
  const [isShuffle, setIsShuffle] = useState(false);
  const [fullScreenTrack, setFullScreenTrack] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    if (!user) return [];
    const saved = localStorage.getItem("music_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
      localStorage.setItem("music_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getRating = useCallback((id) => {
      if (Array.isArray(favorites)) return favorites.includes(id) ? 1 : 0; 
      return favorites[id] || 0;
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    if (!user) {
      onOpenRegister();
      return; 
    }
    const currentRating = getRating(id);
    const nextRating = (currentRating + 1) % 3;

    // Check limit if trying to rate (score 1 or 2)
    const ratedCount = Array.isArray(favorites) ? favorites.length : Object.values(favorites).filter(v => v > 0).length;
    if (nextRating > 0 && currentRating === 0 && ratedCount >= 4) {
        alert("Ліміт: можна оцінити лише 4 пісні!");
        return;
    }
    setFavorites((prev) => {
      let currentRating = getRating(id); // 0, 1, or 2
      let nextRating = (currentRating + 1) % 3; // 0->1->2->0
      
      // Check limit for non-zero ratings
      // const count = Array.isArray(prev) ? prev.length : Object.values(prev).filter(v => v > 0).length;
      // if (nextRating > 0 && count >= 3 && currentRating === 0) {
      //    alert("Ліміт 3 улюблених!"); 
      //    return prev; 
      // }
      
      if (Array.isArray(prev)) {
          // Convert to object
          const newObj = {};
          prev.forEach(p => newObj[p] = 1);
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

  const [lyricsCurrentTime, setLyricsCurrentTime] = useState(0);

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
        card.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else {
      filtered = musicCards.filter(
        (card) =>
          card.category === playlistKey &&
          card.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOption === "favorites") {
      return [...filtered].sort((a, b) => {
        const aR = getRating(a.id);
        const bR = getRating(b.id);
        return bR - aR;
      });
    } else if (sortOption === "name_asc") {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOption === "name_desc") {
      return [...filtered].sort((a, b) => b.text.localeCompare(a.text));
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

  const handleTrackEnd = (id) => {
    if (isShuffle) {
      const remaining = processedCards.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length);
        if (fullScreenTrack) setFullScreenTrack(remaining[randomIndex]);
      } else {
         // Loop logic handled in player, if not looping, stop.
         if (fullScreenTrack) setFullScreenTrack(null);
      }
      return;
    }
    const currentIndex = processedCards.findIndex((c) => c.id === id);
    if (currentIndex !== -1 && currentIndex < processedCards.length - 1) {
      // Also update fullscreen track if open
      if (fullScreenTrack) setFullScreenTrack(processedCards[currentIndex + 1]);
    } else {
      if (fullScreenTrack) setFullScreenTrack(null);
    }
  };

  const playNext = () => {
      if (!fullScreenTrack) return;
      handleTrackEnd(fullScreenTrack.id);
  };
  const playPrev = () => {
      if (!fullScreenTrack) return;
      const idx = processedCards.findIndex(c => c.id === fullScreenTrack.id);
      if (idx > 0) {
          setFullScreenTrack(processedCards[idx - 1]);
      }
  };

  const handlePlayAll = () => {
    if (processedCards.length > 0) {
      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * processedCards.length);
        setFullScreenTrack(processedCards[randomIndex]);
      } else {
        setFullScreenTrack(processedCards[0]);
      }
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const playlistTitle = playlistKey === "custom" ? customPlaylistName || "Мій Плейлист" : PLAYLISTS[playlistKey].title;
  const tracksToShow = playlistKey === 'custom' ? customTracks : processedCards;

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <PlaylistModalContent
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <PlaylistCloseButton onClick={handleClose}>&times;</PlaylistCloseButton>
        <h2 style={{ textAlign: "center", color: "#333" }}>
          {playlistTitle}
          {playlistKey === 'custom' && ` (${tracksToShow?.length || 0}/10)`}
        </h2>
        {onEdit && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              onClick={onEdit}
              style={{
                background: 'orange',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
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
          <ShuffleButton
            $active={isShuffle}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Випадковий порядок"
          >
            🔀
          </ShuffleButton>
          <PlayAllButton onClick={handlePlayAll}>Грати все</PlayAllButton>
        </ControlsContainer>

        <MusicPhotoFix>
          {processedCards.slice(0, visibleCount).map((card) => (
            <MusicCard
              key={card.id}
              cardData={card}
              user={user}
              rating={getRating(card.id)}
              onOpenModal={setLyricsModalData}
              onOpenPlayer={(id) => setFullScreenTrack(processedCards.find(c => c.id === id))}
              onRate={handleToggleFavorite}
            />
          ))}
        </MusicPhotoFix>

        {visibleCount < processedCards.length && (
          <LoadMoreButton
            onClick={() => {
              if (visibleCount === 8) {
                setVisibleCount(16);
              } else {
                setVisibleCount(processedCards.length);
              }
            }}
          >
            {visibleCount === 8 ? "︾" : "︾"}
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
              <img
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
            rating={getRating(fullScreenTrack.id)}
            onRate={handleToggleFavorite}
            isShuffle={isShuffle}
            onSetShuffle={setIsShuffle}
            playlist={processedCards}
            onSelectTrack={setFullScreenTrack}
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

const MusicPhoto = ({ user, onOpenRegister }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customPlaylist, setCustomPlaylist] = useState(() => {
    const saved = localStorage.getItem("custom_playlist");
    return saved ? JSON.parse(saved) : null;
  });

  const deleteTrackFromCustomPlaylist = (trackId) => {
    if (!customPlaylist) return;
    const updatedTracks = customPlaylist.tracks.filter((t) => t.id !== trackId);
    const updatedPlaylist = { ...customPlaylist, tracks: updatedTracks };
    setCustomPlaylist(updatedPlaylist);
    localStorage.setItem("custom_playlist", JSON.stringify(updatedPlaylist));
  };

  const handleEditCustomPlaylist = () => {
    setCurrentPlaylist(null);
    setShowCreateModal(true);
  };

  const handleClosePlaylist = () => {
    setCurrentPlaylist(null);
  };

  const saveCustomPlaylist = (data) => {
    try {
      setCustomPlaylist(data);
      localStorage.setItem("custom_playlist", JSON.stringify(data));
      setShowCreateModal(false);
    } catch (e) {
      alert("Помилка збереження! Можливо, файли занадто великі.");
    }
  };

  const openCustomPlaylist = () => {
    setCurrentPlaylist("custom");
  };

  return (
    <MusicPhotoDiv>
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
              defaultImage={require("../../photos/vip-images/mechannic.jpg")}
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
            <div style={{ fontSize: 50, color: "#ccc" }}>+</div>
            <div style={{ color: "#aaa" }}>Створити плейлист</div>
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
          onDeleteTrack={
            currentPlaylist === "custom" ? deleteTrackFromCustomPlaylist : null
          }
          customPlaylistName={currentPlaylist === "custom" ? customPlaylist?.name : null}
        />
      )}
    </MusicPhotoDiv>
  );
};
export default MusicPhoto;
