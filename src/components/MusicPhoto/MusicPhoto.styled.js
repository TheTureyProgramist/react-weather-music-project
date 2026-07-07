import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

export const slideIn = keyframes`
  0% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
  100% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
`;

export const slideOut = keyframes`
  0% { 
    transform: translateY(0%) scale(1);
    opacity: 1; 
  }
  100% { 
    transform: translateY(100%) scale(0.5);
    opacity: 0; 
  }
`;

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const pulseRedBorder = keyframes`
  0% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
  50% { border-color: #ff4d4d; box-shadow: 0 0 15px #ff0000; }
  100% { border-color: #ff0000; box-shadow: 0 0 5px #ff0000; }
`;

export const flickerAnimation = keyframes`
  0% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export const chaosAnimation = keyframes`
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

export const ultrachaosAnimation = keyframes`
  0% { background-position: 0% 0%; filter: hue-rotate(0deg) contrast(1.2); }
  25% { background-position: 100% 0%; filter: hue-rotate(90deg) contrast(1.4); }
  50% { background-position: 100% 100%; filter: hue-rotate(180deg) contrast(1.2); }
  75% { background-position: 0% 100%; filter: hue-rotate(270deg) contrast(1.4); }
  100% { background-position: 0% 0%; filter: hue-rotate(360deg) contrast(1.2); }
`;

export const oldFilmNoise = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

export const oldFilmShake = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0, 0); }
`;

export const cinemascopeTop = keyframes`
  from { height: 0; }
  to { height: 12%; }
`;

export const cinemascopeBottom = keyframes`
  from { height: 0; }
  to { height: 12%; }
`;

export const symbolAnimation = keyframes`
  0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
  20% { opacity: 0.5; }
  50% { transform: translate(calc(-50% + var(--end-x, 0px)), calc(-50% + var(--end-y, 0px))) scale(var(--pulse-scale, 1)); }
  80% { opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
`;

export const fireworkAnimation = keyframes`
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

export const seekAnimation = keyframes`
  0% { opacity: 0; background-color: rgba(255, 255, 255, 0); }
  30% { opacity: 1; background-color: rgba(255, 255, 255, 0.1); }
  100% { opacity: 0; background-color: rgba(255, 255, 255, 0); }
`;

export const SeekIndicator = styled.div`
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

export const LongPressBadge = styled.div`
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

export const blinkAnimation = keyframes`
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

export const MusicPhotoDiv = styled.div`
  background: ${(props) => (props.$isDarkMode ? "white" : "black")};
  border-radius: 20px;
  margin-top: 5px;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${(props) =>
    props.$isAudioBarActive &&
    css`
      height: 55vh;
      max-height: 420px;
      overflow-y: auto;
      width: 98%;
      margin: 10px auto 10px auto;
      border: 3px solid orange;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb { /* Changed for dark mode */
        background: ${props.$isDarkMode ? '#ffb36c' : 'orange'};
        border-radius: 10px;
        border: 2px solid ${props.$isDarkMode ? '#1a1a1a' : 'transparent'};
        background-clip: content-box;
      }
    `}
`;

export const MusicPhotoFix = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
  padding: 0 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 250px;
  padding: 6px 10px;
  border-radius: 25px; /* Changed for dark mode */
  border: 2px solid ${props => props.$isDarkMode ? '#555' : '#ccc'};
  font-size: 13px;
  outline: none;
  transition: border-color 0.3s;
  background: ${props => props.$isDarkMode ? '#333' : '#fff'};
  color: ${props => props.$isDarkMode ? '#fff' : '#333'};
  &:focus {
    border-color: ${props => props.$isDarkMode ? '#ffb36c' : 'orange'};
  }
`;

export const SortSelect = styled.select`
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid #ccc;
  font-size: 13px;
  background: ${props => props.$isDarkMode ? '#333' : '#fff'};
  color: ${props => props.$isDarkMode ? '#fff' : '#333'};
  font-family: var(--font-family);
  outline: none;
  cursor: pointer; /* Changed for dark mode */
  transition: border-color 0.3s;
  &:focus {
    border-color: orange;
  }
`;

export const AuthorCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 305px;
  height: 156px;
  border-radius: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
`;

export const AuthorInfoOverlay = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  width: 100%;
  color: white;

  h3 {
    margin: 0;
    font-size: 15px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    margin: 5px 0 0 0;
    font-size: 13px;
    opacity: 0.9;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 308px;
  height: 220px;
  background: #000;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: ${(props) => (props.$rating === -1 ? 0.6 : 1)};
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
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  &:hover .card-overlay-buttons {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover .card-checkpoint-badge {
    opacity: 1;
    transform: scale(1);
  }
`;

export const LyricsModalImage = styled.img`
  width: calc(100% + 20px);
  margin: -10px -10px 15px -10px;
  border-radius: 15px 15px 0 0;
  position: sticky;
  top: -10px;
  z-index: 10;
  background: white;
  display: block; /* Changed for dark mode */
  object-fit: cover;
  max-height: 250px;
`;

export const MusicImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: ${props => props.$isDarkMode ? '#444' : '#a5a5a5'};
  overflow: hidden;
`;

export const MusicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px; /* Changed for dark mode */
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
  color: ${(props) => {
    if (props.$rating === 2) return "gold";
    if (props.$rating === 1) return "red";
    if (props.$rating === -1) return "#555";
    return "#ccc";
  }};
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
    background: white;
  }
`;

export const MusicText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  text-align: left;
  font-family: var(--font-family);
  font-size: 13px;
  font-weight: 600;
  padding: 30px 12px 10px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
  line-height: 1.4;
  z-index: 5;
  pointer-events: none;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SliderRow = styled.div`
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

export const VolumeSlider = styled.input`
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

export const LoadMoreButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px; /* Changed for dark mode */
  padding: 10px 110px;
  font-size: 19px;
  cursor: pointer;
  margin-top: 5px;
`;

export const FilterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  transition: /* Changed for dark mode */
    background-color ${(props) => (props.$type === "flash" ? "0.05s" : "0.5s")}
      ease,
    opacity 0.5s ease,
    backdrop-filter 0.5s ease,
    -webkit-backdrop-filter 0.5s ease;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  opacity: 1;
   backdrop-filter: none;
  -webkit-backdrop-filter: none;

  ${(props) =>
    props.$active &&
    css`
      ${props.$type === "red" && `background: linear-gradient(to right, rgba(255, 0, 0, ${props.$opacity}), rgba(255, 69, 0, ${props.$opacity}));`}
      ${props.$type === "purple" && `background: linear-gradient(to right, rgba(128, 0, 128, ${props.$opacity}), rgba(218, 112, 214, ${props.$opacity}));`}
      ${props.$type === "green" && `background: linear-gradient(to right, rgba(0, 255, 0, ${props.$opacity}), rgba(50, 205, 50, ${props.$opacity}));`}
      ${props.$type === "blue" && `background: linear-gradient(to right, rgba(0, 0, 255, ${props.$opacity}), rgba(65, 105, 225, ${props.$opacity}));`}
      ${props.$type === "black" && `background: linear-gradient(to right, rgba(0, 0, 0, ${props.$opacity}), rgba(50, 50, 50, ${props.$opacity}));`}
      ${props.$type === "orange" && `background: linear-gradient(to right, rgba(230, 149, 0, ${props.$opacity}), rgba(255, 165, 0, ${props.$opacity}));`}
      ${props.$type === "cyan" && `background: linear-gradient(to right, rgba(0, 255, 255, ${props.$opacity}), rgba(0, 206, 209, ${props.$opacity}));`}
      ${props.$type === "brown" && `background: linear-gradient(to right, rgba(139, 69, 19, ${props.$opacity}), rgba(160, 82, 45, ${props.$opacity}));`}
      ${props.$type === "white" && `background: linear-gradient(to right, rgba(255, 255, 255, ${props.$opacity}), rgba(240, 240, 240, ${props.$opacity}));`}
      ${props.$type === "image" &&
      css`
        background-image: url(${props.$imageUrl});
        background-size: cover;
        background-position: center;
        background: transparent;
        opacity: ${props.$opacity || 1};
      `}
      ${(props.$type === "flash" ||
        props.$type === "flicker" ||
        props.$flicker) &&
      css`
        background: rgba(255, 255, 255, ${props.$opacity});
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
        background: rgba(119, 119, 119, ${props.$opacity * 0.2});
      `}
      ${props.$type === "flicker" &&
      css`
        animation: ${flickerAnimation} 0.1s infinite alternate;
      `}
    `}
`;

export const StyledSymbol = styled.span`
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

export const SeekBar = styled.input`
  flex-grow: 1;
  height: 5px;
  -webkit-appearance: none;
  background: linear-gradient(
    to right, /* Changed for dark mode */
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

export const StereoSeekBar = styled.div`
  flex-grow: 1;
  height: 40px;
  background: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)'};
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

export const StereoChannel = styled.div`
  flex: 1;
  height: ${(props) => Math.max(15, props.$height * 100)}%;
  background: ${(props) => /* Changed for dark mode */
    props.$active ? "orange" : "rgba(255, 255, 255, 0.25)"};
  border-radius: 1px;
  transition: background 0.2s ease;
`;

export const SpeedSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient( /* Changed for dark mode */
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
    width: 10px; /* Changed for dark mode */
    height: 10px;
    border-radius: 50%;
    background: #333;
    cursor: pointer;
  }
`;

export const UnlockContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 9px;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 14px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  transition: all 0.2s ease;
  &:hover { background: rgba(0, 0, 0, 0.8); transform: scale(1.02); }
`;

export const SeekAmountSlider = styled.input`
  flex-grow: 1;
  height: 3px;
  -webkit-appearance: none;
  background: linear-gradient( /* Changed for dark mode */
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

export const LoopButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.$active ? "skyblue" : 'orange')};
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 5px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 16%;
  transform: translate(-50%, -50%) translateY(8px);
  display: flex;
  gap: 6px;
  z-index: 8;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

export const ActionButton = styled.button`
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  width: 38px;
  height: 38px;
  padding: 0;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 165, 0, 0.8);
    border-color: rgba(255, 165, 0, 0.6);
    transform: scale(1.12);
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #fff;
  }
`;

export const AihelpTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "black" : "white")};
  margin-bottom: 10px;
  @media (min-width: 768px) {
    font-size: 25px;
  }
`;
export const ActButton = styled.button`
  background: rgba(0, 0, 0, 0.43);
  backdrop-filter: blur(6px);
  border: none;
  border-radius: 50%;
  color: rgb(0, 204, 255);
  width: 38px;
  height: 38px;
  padding: 0;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    color: rgba(255, 165, 0, 0.8);
    transform: scale(1.12);
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #fff;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  width: 100vw; /* Changed for z-index */
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  z-index: 2005; /* Increased z-index to be above FullScreenOverlay */
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} forwards; /* Changed for z-index */
`;

export const LyricsModalContent = styled.div`
  background: ${props => props.$isDarkMode ? '#1a1a1a' : 'white'};
  padding: 10px;
  width: 100%;
  max-width: 320px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar { /* Changed for dark mode */
    width: 6px;
  }
  &::-webkit-scrollbar-thumb { /* Changed for dark mode */
    background: ${props => props.$isDarkMode ? '#ffb36c' : '#ffb36c'};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track { /* Changed for dark mode */
    background: ${props => props.$isDarkMode ? '#333' : '#f0f0f0'};
  }
`;

export const PlaylistModalContent = styled.div`
  background: #e8e8e8;
  padding: 10px;
  border-radius: 15px;
  width: 95%; /* Changed for dark mode */
  max-width: 1800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar { /* Changed for dark mode */
    width: 8px;
  }
  &::-webkit-scrollbar-thumb { /* Changed for dark mode */
    background: ${props => props.$isDarkMode ? '#ffb36c' : '#ffb36c'};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track { /* Changed for dark mode */
    background: ${props => props.$isDarkMode ? '#333' : '#dcdcdc'};
  }
`;

export const LyricsCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${props => props.$isDarkMode ? '#fff' : '#333'};
  &:hover {
    color: #ffb36c;
  }
`;

export const FullScreenOverlay = styled.div`
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

export const MiniPlayerContainer = styled.div`
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
  user-select: none;
`;

export const MiniPlayerHeader = styled.div`
  height: 24px;
  background: #1a1a1a;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  gap: 8px;
`;

export const MiniControlBtn = styled.button`
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

export const MiniResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, orange 50%);
  z-index: 3010;
`;

export const AudioBarContainer = styled(motion.div)`
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

export const AudioBarBtn = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
    color: orange;
  }
`;

export const FSHeader = styled.div`
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

export const FSContent = styled.div`
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

export const FSVisualWrapper = styled.div`
  width: 100%;
  position: relative; /* Establish stacking context for FilterOverlay */
  z-index: 1; /* Ensure it's below controls but above media */
  height: 100%;
  overflow: hidden;
`;

export const FSVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
`;

export const FSImage = styled.img`
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

export const appearKeyframe = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

export const FSControls = styled.div`
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

export const FSSliderContainer = styled.div`
  display: flex;
  gap: 7px;
  overflow-x: auto;
  padding: 5px 11px;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: orange;
  }
`;

export const FSSliderImage = styled.img`
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

export const FSTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 14px;
  max-width: 60vw;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

export const GearModal = styled.div`
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

export const SubtitleOverlay = styled.div`
  position: absolute;
  bottom: ${(props) =>
    props.$show ? (props.$controlsVisible ? "22%" : "0.5%") : "22%"};
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

export const DownloadModal = styled.div`
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

export const PlaylistCloseButton = styled.button`
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

export const LyricsContainer = styled.div`
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

export const LyricsLine = styled.p`
  margin: 5px 0;
  transition:
    color 0.3s,
    font-weight 0.3s;
  color: ${(props) => (props.$active ? "orange" : (props.$isDarkMode ? '#eee' : '#333'))};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

export const InputGroup = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-weight: bold;
    font-size: 12px; /* Changed for dark mode */
    color: ${props => props.$isDarkMode ? '#eee' : 'black'};
  }
  input { /* Changed for dark mode */
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: black;
  }
`;

export const StorageIndicatorContainer = styled.div`
  margin: 10px 0 20px 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px; /* Changed for dark mode */
  font-size: 11px;
  color: ${props => props.$isDarkMode ? '#aaa' : '#555'};
  text-align: left; /* Changed for dark mode */
`;

export const StorageBar = styled.div`
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  margin-top: 5px; /* Changed for dark mode */
  overflow: hidden;
`;

export const StorageBarFill = styled.div`
  height: 100%;
  background: ${(props) => (props.$percent > 80 ? "#ff4d4d" : "#00bdb3")};
  width: ${(props) => props.$percent}%;
  transition: width 0.5s ease; /* Changed for dark mode */
`;

export const SliderItemWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  &:hover .slider-overlay {
    opacity: 1;
  }
`;

export const CheckpointBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  color: #ffb36c;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: bold;
  z-index: 10;
  border: 1px solid rgba(255, 179, 108, 0.4);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;
  opacity: 0.8;
  transform: scale(0.9);

  &::before {
    content: "Ви зупинилися тут";
    position: absolute;
    bottom: -170%;
    right: -10%;
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

export const CheckpointMarker = styled.div`
  position: absolute;
  bottom: 100%;
  left: ${(props) => props.$left}%;
  transform: translateX(-50%);
  font-size: 14px;
  z-index: 10;
  pointer-events: none;
  /* Styles for better visibility in stereogram */
  background: rgba(255, 255, 255, 0.7); /* Semi-transparent white background */
  border-radius: 3px;
  padding: 2px 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

export const SliderOverlay = styled.div`
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

export const SliderBtn = styled.button`
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

export const PlaylistOverlay = styled.div`
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

export const SeekBarWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  &:hover .seek-tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

export const SeekTooltip = styled.div`
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

export const LoadingContainer = styled.div`
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

export const ProgressBar = styled.div`
  width: 200px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: #94fffa;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px #94fffa;
`;

export const AiChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  color: ${props => props.$isDarkMode ? 'white' : '#333'};
  background: ${props => props.$isDarkMode ? '#1e1e1e' : '#fff'};
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${props => props.$isDarkMode ? '#121212' : '#f7f7f7'};
`;

export const Message = styled.div`
  max-width: 80%;
  padding: 8px 14px;
  border-radius: 15px;
  font-size: 13.5px;
  background: ${(props) => (props.$isUser ? "orange" : (props.$isDarkMode ? "#333" : "#e0e0e0"))};
  color: ${(props) => (props.$isUser ? "white" : (props.$isDarkMode ? "#ddd" : "#222"))};
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

export const ChatInputRow = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${props => props.$isDarkMode ? '#333' : '#eee'};
  gap: 8px;
  input {
    flex: 1;
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid ${props => props.$isDarkMode ? '#444' : '#ccc'};
    background: ${props => props.$isDarkMode ? '#2c2c2c' : '#fff'};
    color: ${props => props.$isDarkMode ? '#fff' : '#000'};
    outline: none;
  }
  button {
    background: orange;
    border: none;
    border-radius: 20px;
    padding: 0 15px;
    color: white;
    cursor: pointer;
  }
`;
export const AuthorPreviewCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #0f3460;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${slideIn} 0.5s ease-out;
  
  /* Робимо картку flex-контейнером */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 240px; /* Збільшили висоту, щоб контент гарно влізав */

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const AuthorPreviewImage = styled.div`
  position: absolute; /* Картинка стає фоном на всю ширину і висоту */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Ховаємо під контент */

  @media (max-width: 768px) {
    position: relative;
    height: 300px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35; /* Трохи зменшили яскравість, щоб текст добре читався */
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Градієнт тепер затемнює картинку зліва направо, створюючи плашку під контент */
    background: linear-gradient(to right, rgba(26, 26, 46, 0.4) 0%, rgba(22, 33, 62, 0.9) 100%);
    pointer-events: none;
    
    @media (max-width: 768px) {
      background: linear-gradient(to top, #1a1a2e 0%, transparent 100%);
    }
  }
`;

export const AuthorPreviewName = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 24px;
  margin: 0;
  font-size: 24px; /* Трішки збільшено для виразності */
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  z-index: 3; /* Поверх фону */
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    bottom: 12px;
    left: 16px;
    font-size: 20px;
  }
`;

export const AuthorPreviewBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  
  /* Зсуваємо блок інформації вправо */
  margin-left: auto; 
  width: 50%; /* Займає рівно половину банера справа */
  max-width: 550px;
  z-index: 2; /* Стає поверх картинки-фону */

  @media (max-width: 900px) {
    width: 60%; /* На середніх екранах даємо більше простору */
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-left: 0;
    padding: 16px;
    background: #1a1a2e; /* Повертаємо суцільний фон на мобільних */
  }
`;
export const AuthorPreviewSection = styled.div`
  background: rgba(15, 34, 96, 0.6); /* Темніший підклад, щоб текст не губився на картинці */
  backdrop-filter: blur(4px); /* Ефект матового скла */
  border-radius: 10px;
  padding: 10px 14px;
  border-left: 3px solid ${props => props.$accent || '#667eea'};
  cursor: pointer;
  transition: all 0.2s;
  
  /* Перетворюємо контейнер на flex-рядок */
  display: flex;
  flex-direction: row;
  align-items: center; /* Вирівнювання по центру вертикалі */
  overflow: hidden; /* Обов'язково для обрізання тексту */

  &:hover {
    background: rgba(15, 34, 96, 0.85);
    transform: translateX(3px); /* Легкий ефект при наведенні */
  }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: ${props => props.$accent || '#667eea'};
    margin-right: 6px;
    white-space: nowrap; /* Щоб заголовок НІКОЛИ не переносився */
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .section-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    
    /* Стандартне надійне обрізання тексту в 1 рядок */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1; /* Займає весь доступний простір, що залишився */
  }
`;
export const AuthorPreviewActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const AuthorPreviewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  line-height: 1;

  ${props => props.$variant === 'back' ? css`
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.15);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(-2px);
    }
  ` : css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

    &:hover {
      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.5);
      transform: translateY(-1px);
    }
  `}
`;


