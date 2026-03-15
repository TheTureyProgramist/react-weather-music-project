import React, { useEffect } from "react"; // Додано useEffect
import styled from "styled-components";
import loadimage from "../../photos/hero-header/start-image.jpg";

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
  padding: 20px;
  box-sizing: border-box;
  opacity: ${(props) => (props.$isFadingOut ? 0 : 1)};
  visibility: ${(props) => (props.$isFadingOut ? "hidden" : "visible")};
  transition:
    opacity 1s ease-in-out,
    visibility 1s ease-in-out;
`;

const LoaderContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  align-items: center;
  @media screen and (min-width: 769px) {
    align-items: center;
  }
  @media (min-width: 1920px) {
    max-width: 1400px;
  }
`;

const LoaderImage = styled.img`
  width: 122%;
  height: auto;
  margin-right: 1%;
  border-radius: 20px;
  animation: pulse 3s infinite ease-in-out;
  display: block;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.015);
      opacity: 0.9;
    }
  }
`;

const LoaderOverlay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 600px) {
    position: static;
    background: none;
    margin-top: 20px;
    padding: 0;
  }
  @media (min-width: 601px) {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 40px 20px 20px 20px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      transparent 100%
    );
    border-radius: 0 0 20px 20px;
    margin-top: 0;
    box-sizing: border-box;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 450px;
  height: 12px;
  background: #2a2a2a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 198, 255, 0.3);
  @media (max-width: 600px) {
    position: static;
    margin: 0 auto 3px auto;
    max-width: 95vw;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 50%, #ff8c00 100%);
  width: 0%;
  animation: load 2.5s forwards ease-in-out;
  @keyframes load {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const LoaderText = styled.p`
  color: #fff;
  margin-top: 13px;
  letter-spacing: 3px;
  font-size: 13px;
  font-weight: bold;
  opacity: 0.8;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  text-align: center;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
  @media (min-width: 1920px) {
    font-size: 20px;
    margin-top: 20px;
  }
`;

export default function Loader({ isLoading, isFadingOut, randomPhrase }) {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <LoaderWrapper $isFadingOut={isFadingOut}>
      <LoaderContent>
        <LoaderImage src={loadimage} alt="Loading..." />
        <div className="mobile-loader-bar" style={{ width: "100%" }}>
          <ProgressContainer>
            <ProgressBar />
          </ProgressContainer>
          <LoaderText>Версія 1.9.8. Конотоп-Україна</LoaderText>
          <LoaderText
            style={{
              fontSize: "11px",
              marginTop: "5px",
              color: "#00c6ff",
              textTransform: "none",
              letterSpacing: "1px",
            }}
          >
            {randomPhrase}
          </LoaderText>
        </div>
        <LoaderOverlay className="desktop-loader-bar">
          <ProgressContainer>
            <ProgressBar />
          </ProgressContainer>
          <LoaderText>Версія 1.9.8. Конотоп-Україна</LoaderText>
          <LoaderText
            style={{
              fontSize: "13px",
              marginTop: "5px",
              color: "#00c6ff",
              textTransform: "none",
              letterSpacing: "1px",
            }}
          >
            {randomPhrase}
          </LoaderText>
        </LoaderOverlay>
      </LoaderContent>

      <style>{`
        @media (max-width: 600px) {
          .desktop-loader-bar { display: none !important; }
          .mobile-loader-bar { display: block !important; }
        }
        @media (min-width: 601px) {
          .desktop-loader-bar { display: flex !important; }
          .mobile-loader-bar { display: none !important; }
        }
      `}</style>
    </LoaderWrapper>
  );
}