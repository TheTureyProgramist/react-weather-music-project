import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import loadimage from "../../photos/hero-header/start-image.webp";
import loadtwo from "../../photos/hero-header/fogtwo.webp";

const expandEntrance = keyframes`
  0% { transform: scale(1.1); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const dotFade = keyframes`
  0% { opacity: 1; }
  12.5% { opacity: 0; }
  62.5% { opacity: 0.25; }
  75% { opacity: 0.5; }
  87.5% { opacity: 0.75; }
  100% { opacity: 1; }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1994;
  opacity: ${(props) => (props.$isFadingOut ? 0 : 1)};
  visibility: ${(props) => (props.$isFadingOut ? "hidden" : "visible")};
  transition:
    opacity 0.8s ease-in-out,
    visibility 0.8s ease-in-out;
  overflow: hidden;
`;

const LoaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  animation: ${expandEntrance} 0.8s ease-out forwards;
`;

const LoaderImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center;
  transition: opacity 0.8s ease-in-out;
  opacity: ${(props) => (props.$active ? 1 : 0)};
`;

const UIOverlay = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0.5vh;
  text-align: center;
`;
const InfoText = styled.div`
  margin-top: 14px;
  color: #fff;
  font-family: "Inter", sans-serif;
`;

const TopLeftInfo = styled.div`
  position: absolute;
  top: -9px;
  left: -7px;
  z-index: 3;
  color: #fff;
  text-align: left;
`;

const VersionText = styled.p`
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 20px;
  opacity: 0.9;
  margin: 0;
  font-family: "Inter", sans-serif;
`;

const PhraseText = styled.p`
  font-size: 13px;
  color: #00c6ff;
  line-height: 1.5;
  max-width: 1200px;
  font-style: italic;
    border-radius: 20px;
  background: rgba(0, 0, 0, 0.61);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const TopRightContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 15px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(0, 0, 0, 0.5);
  padding: 12px 20px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.03);
`;

const StatusText = styled.span`
  font-size: 12px;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: right;
  min-width: 170px; 
`;

const DotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 10px);
  grid-template-rows: repeat(3, 10px);
  gap: 5px;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  animation: ${dotFade} 0.8s infinite linear;
  &:nth-child(1) { grid-row: 1; grid-column: 1; animation-delay: 0s; }
  &:nth-child(2) { grid-row: 1; grid-column: 2; animation-delay: 0.1s; }
  &:nth-child(3) { grid-row: 1; grid-column: 3; animation-delay: 0.2s; }
  &:nth-child(4) { grid-row: 2; grid-column: 3; animation-delay: 0.3s; }
  &:nth-child(5) { grid-row: 3; grid-column: 3; animation-delay: 0.4s; }
  &:nth-child(6) { grid-row: 3; grid-column: 2; animation-delay: 0.5s; }
  &:nth-child(7) { grid-row: 3; grid-column: 1; animation-delay: 0.6s; }
  &:nth-child(8) { grid-row: 2; grid-column: 1; animation-delay: 0.7s; }
`;

export default function Loader({ isLoading, isFadingOut, randomPhrase }) {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [statusText, setStatusText] = useState("Готую новини");
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSecondImage(true), 2000);
      const phase1Phrases = [
        "Готую новини",
        "Цей сайт це реальна містика :)",
        "Древніус і Даркніс",
        "Що це було?",
        "Доміно у мене питання.",
        "Індики схожі?",
        "На кого?",
        "Індики схожі?",
        "Аякже, на когось",
        "Ніцеронівські правила",
        "Темрява та полум'я",
        "Решта підвантажень",
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < phase1Phrases.length - 1) {
          currentStep++;
          setStatusText(phase1Phrases[currentStep]);
        }
      }, 100);
      const phase2Phrases = [
        "Доміно бажає гарної погоди :)",
        "??? - Я знаю його",
        "Він скоро повернеться" 
      ];
      const randomFinalPhrase = phase2Phrases[Math.floor(Math.random() * phase2Phrases.length)];

      const finalTimeout = setTimeout(() => {
        clearInterval(interval);
        setStatusText(randomFinalPhrase);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        clearTimeout(finalTimeout);
      };
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <LoaderWrapper $isFadingOut={isFadingOut}>
      <TopLeftInfo>
        <VersionText>Версія 0.9.9 Конотоп-Україна</VersionText>
      </TopLeftInfo>
      <TopRightContainer>
        <StatusText>{statusText}</StatusText>
        <DotGrid>
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
          <Dot />
        </DotGrid>
      </TopRightContainer>

      <LoaderContent>
        <ImageContainer>
          <LoaderImage
            src={loadimage}
            $active={!showSecondImage}
            alt="Loading..."
          />
          <LoaderImage
            src={loadtwo}
            $active={showSecondImage}
            alt="Loading..."
          />
        </ImageContainer>

        <UIOverlay>
          <InfoText>
            <PhraseText>{randomPhrase}</PhraseText>
          </InfoText>
        </UIOverlay>
      </LoaderContent>
    </LoaderWrapper>
  );
}