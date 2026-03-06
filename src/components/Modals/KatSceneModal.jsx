import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import katscene from "../../mp3/registrationscene.mp4";
import music from "../../mp3/katscene.mp3";

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

const ControlButton = styled.button`
  position: absolute;
  top: 30px;
  z-index: 2010;
  background: rgba(82, 249, 255, 0.2);
  backdrop-filter: blur(5px); 
  color: #94fffa;
  border: 1px solid rgba(0, 255, 255, 0.33);
  font-size: 16px;
  padding: 6px 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
    transform: scale(1.05);
  }
`;

const SkipButton = styled(ControlButton)`
  right: 30px;
`;

const MuteButton = styled(ControlButton)`
  left: 30px;
`;

const KatSceneModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      
      videoRef.current.play().catch(error => {
        console.log("Автоплей відео заблоковано:", error);
      });
    }

    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Автоплей музики заблоковано (потрібна взаємодія користувача):", error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Overlay>
      <SkipButton onClick={handleSkip}>Skip</SkipButton>
      <MuteButton onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </MuteButton>

      <audio ref={audioRef} src={music} loop />
      
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