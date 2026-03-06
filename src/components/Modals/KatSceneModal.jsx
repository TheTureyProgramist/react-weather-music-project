import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import katscene from "../../mp3/registrationscene.mp4";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
`;

const FullScreenVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 2010;
  background: rgba(82, 249, 255, 0.2);
  backdrop-filter: blur(5px); 
  color: #94fffa;
  border: 1px solid rgba(0, 255, 255, 0.33);
  border-radius: 50px;
  font-size: 16px;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
    transform: scale(1.05);
  }
`;

const KatSceneModal = ({ onClose }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Автоплей заблоковано браузером:", error);
      });
    }
  }, []);

  const handleSkip = () => {
    onClose();
  };

  return (
    <Overlay>
      <SkipButton onClick={handleSkip}>Skip</SkipButton>
      <FullScreenVideo
        ref={videoRef}
        src={katscene}
        muted 
        playsInline 
        autoPlay
        onEnded={onClose}
      />
    </Overlay>
  );
};

export default KatSceneModal;