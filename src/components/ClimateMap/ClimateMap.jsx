import React, { useState, useMemo, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GoogleGenerativeAI } from "@google/generative-ai";
import localforage from "localforage";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AihelpTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "black" : "white")};
  margin-bottom: 15px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const OuterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16 / 8;
  min-height: 360px;
  margin: 0 auto;
  border-radius: ${(props) => (props.$isFullscreen ? "0" : "20px")};
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: ${(props) => (props.$isFullscreen ? "none" : "2px solid rgba(255, 255, 255, 0.1)")};
  background: #1a1a1a;
`;

const Controls = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledIframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  pointer-events: ${(props) => (props.$isReady ? "auto" : "none")};
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.$isLoading ? "0" : "1")};
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 1;
  pointer-events: none;

  .spinner {
    display: inline-block;
    animation: ${spin} 2s linear infinite;
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.$active ? "skyblue" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  text-align: left;
  white-space: nowrap;

  &:hover {
    background: skyblue;
    color: #000;
  }
`;

const MapLink = styled.a`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  padding: 4px 6px;
  transition: color 0.3s;
  text-align: center;
  margin-top: 4px;

  &:hover {
    color: skyblue;
  }
`;

const SearchContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SearchInput = styled.input`
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  outline: none;
  &::placeholder { color: rgba(255, 255, 255, 0.5); }
`;


const MiniPlayerWindow = styled.div`
  position: fixed;
  z-index: 2200;
  display: flex;
  flex-direction: column;
  background: rgba(10, 15, 24, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  user-select: none;
`;

const MiniPlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: move;
`;

const MiniHeaderTitle = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const MiniHeaderButtons = styled.div`
  display: flex;
  gap: 6px;
`;

const MiniPlayerBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 220px;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.35) 50%);
`;

const ClimateMap = () => {
  const [lat, setLat] = useState(48.379);
  const [lon, setLon] = useState(31.165);
  const [zoom, setZoom] = useState(5);
  const [isAiSearchOpen, setIsAiSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [overlay, setOverlay] = useState("wind");
  const [isMapActive, setIsMapActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [miniPlayerPosition, setMiniPlayerPosition] = useState(() => {
    if (typeof window === "undefined") return { x: 24, y: 24 };
    return {
      x: Math.max(16, window.innerWidth - 360),
      y: Math.max(16, window.innerHeight - 260),
    };
  });
  const [miniPlayerSize, setMiniPlayerSize] = useState({ width: 320, height: 220 });
  const mapWrapperRef = useRef(null);
  const miniPlayerRef = useRef(null);
  const dragStateRef = useRef(null);
  const resizeStateRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedKey = await localforage.getItem("gemini_api_key");
        if (savedKey) setGeminiKey(savedKey);
        
        const pinnedLoc = await localforage.getItem("pinned_map_location");
        if (pinnedLoc) {
          setLat(pinnedLoc.lat);
          setLon(pinnedLoc.lon);
          setZoom(pinnedLoc.zoom);
          if (pinnedLoc.overlay) setOverlay(pinnedLoc.overlay);
        }
      } catch (error) {
        console.error("Error loading map data:", error);
      }
    };
    loadData();
  }, []);

  const handlePinLocation = async (e) => {
    e.stopPropagation();
    try {
      await localforage.setItem("pinned_map_location", { lat, lon, zoom, overlay });
      alert("Локацію закріплено! Вона завантажиться при наступному вході.");
    } catch (error) {
      console.error("Error pinning location:", error);
    }
  };

  const handleAiSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim() || isAiLoading) return;
    if (!geminiKey) {
      alert("API-ключ Gemini не знайдено. Будь ласка, додайте його в налаштуваннях ШІ.");
      return;
    }
    
    setIsAiLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Ти помічник з географії. Користувач шукає локацію. Твоя задача: знайти координати цього місця. 
      Поверни ВИНЯТКОВО валідний JSON без markdown форматування, приклад: {"lat": 48.8566, "lon": 2.3522, "zoom": 6}.
      Запит: ${searchQuery}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();
      if (text.startsWith("```json")) {
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      } else if (text.startsWith("```")) {
        text = text.replace(/```/g, "").trim();
      }
      
      const data = JSON.parse(text);
      if (Number.isFinite(data.lat) && Number.isFinite(data.lon)) {
        setLat(data.lat);
        setLon(data.lon);
        setSearchQuery("");
        setIsAiSearchOpen(false);
        setIsMapActive(true);
      }
    } catch (error) {
      console.error("AI Search error:", error);
      alert("Не вдалося знайти локацію. Спробуйте змінити запит.");
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragStateRef.current) {
        const { startX, startY, originX, originY } = dragStateRef.current;
        const nextX = Math.max(8, Math.min(window.innerWidth - 120, originX + event.clientX - startX));
        const nextY = Math.max(8, Math.min(window.innerHeight - 80, originY + event.clientY - startY));
        setMiniPlayerPosition({ x: nextX, y: nextY });
      }

      if (resizeStateRef.current) {
        const { startX, startY, width, height } = resizeStateRef.current;
        const nextWidth = Math.max(260, Math.min(window.innerWidth - 24, width + event.clientX - startX));
        const nextHeight = Math.max(200, Math.min(window.innerHeight - 24, height + event.clientY - startY));
        setMiniPlayerSize({ width: nextWidth, height: nextHeight });
      }
    };

    const handleMouseUp = () => {
      dragStateRef.current = null;
      resizeStateRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleFullscreen = (targetRef = mapWrapperRef) => {
    if (!document.fullscreenElement) {
      if (targetRef.current?.requestFullscreen) {
        targetRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleMiniPlayerDragStart = (event) => {
    if (event.target.closest("button")) return;
    event.preventDefault();
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: miniPlayerPosition.x,
      originY: miniPlayerPosition.y,
    };
  };

  const handleMiniPlayerResizeStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    resizeStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      width: miniPlayerSize.width,
      height: miniPlayerSize.height,
    };
  };

  const embedUrl = useMemo(() => {
    return `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&level=surface&overlay=${overlay}&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;
  }, [lat, lon, zoom, overlay]);

  return (
    <OuterContainer>
      <AihelpTitle>Кліматична мапа</AihelpTitle>

      {!isMiniPlayerOpen && (
        <MapWrapper
          ref={mapWrapperRef}
          $isFullscreen={isFullscreen}
          onClick={() => !isMapActive && setIsMapActive(true)}
        >
          <Controls>
            {isAiSearchOpen && (
              <SearchContainer onSubmit={handleAiSearch}>
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Місто, село..."
                  autoFocus
                />
                <ActionButton type="submit" $active={true} disabled={isAiLoading} onClick={(e) => e.stopPropagation()}>
                  {isAiLoading ? "Шукаю..." : "Знайти"}
                </ActionButton>
              </SearchContainer>
            )}


            <ActionButton onClick={(e) => { e.stopPropagation(); setIsAiSearchOpen(!isAiSearchOpen); }}>
              ✨ ШІ Пошук
            </ActionButton>

            <ActionButton onClick={handlePinLocation}>
              📌 Закріпити
            </ActionButton>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", margin: "4px 0" }} />

            <ActionButton
              onClick={(e) => { e.stopPropagation(); setIsMapActive(!isMapActive); }}
              style={{ border: isMapActive ? "1px solid #ff4d4d" : "1px solid skyblue" }}
            >
              {isMapActive ? "Деактивувати" : "Активувати"}
            </ActionButton>
            <ActionButton onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}>
              {isFullscreen ? "Згорнути" : "На весь екран"}
            </ActionButton>
            <ActionButton onClick={(e) => { e.stopPropagation(); setIsMiniPlayerOpen(true); }}>
              Міні-плеєр
            </ActionButton>
            <MapLink href="https://www.windy.com/" target="_blank" rel="noopener noreferrer">
              Windy.com
            </MapLink>
          </Controls>

          {isLoading && (
            <Loader>
              <div className="spinner">🌀</div>
              <p>Завантаження...</p>
            </Loader>
          )}

          <StyledIframe
            title="Windy Live Weather Map"
            src={embedUrl}
            $isLoading={isLoading}
            $isReady={isMapActive}
            onLoad={() => setIsLoading(false)}
            allowFullScreen
          />
        </MapWrapper>
      )}

      {isMiniPlayerOpen && (
        <MiniPlayerWindow
          ref={miniPlayerRef}
          onDoubleClick={() => setIsMiniPlayerOpen(false)}
          style={{
            left: miniPlayerPosition.x,
            top: miniPlayerPosition.y,
            width: miniPlayerSize.width,
            height: miniPlayerSize.height,
          }}
        >
          <MiniPlayerHeader onMouseDown={handleMiniPlayerDragStart}>
            <MiniHeaderTitle>Міні-карта • подвійний клік — назад</MiniHeaderTitle>
            <MiniHeaderButtons>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen(miniPlayerRef);
                }}
              >
                {isFullscreen ? "Згорнути" : "⛶"}
              </ActionButton>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMiniPlayerOpen(false);
                }}
              >
                ✕
              </ActionButton>
            </MiniHeaderButtons>
          </MiniPlayerHeader>

          <MiniPlayerBody>
            {isLoading && (
              <Loader>
                <div className="spinner">🌀</div>
                <p>Завантаження...</p>
              </Loader>
            )}

            <StyledIframe
              title="Windy Live Weather Map"
              src={embedUrl}
              $isLoading={isLoading}
              $isReady={isMapActive}
              onLoad={() => setIsLoading(false)}
              allowFullScreen
            />
            <ResizeHandle onMouseDown={handleMiniPlayerResizeStart} />
          </MiniPlayerBody>
        </MiniPlayerWindow>
      )}
    </OuterContainer>
  );
};

export default ClimateMap;