import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import * as fabric from "fabric";
import monody from "../../photos/vip-images/asium/vip-forest.webp";
import { DEFAULT_BGS } from "../Hero/Hero";

const isVideoSource = (src) => {
  if (typeof src !== "string") return false;
  return src.includes(".mp4") || src.startsWith("data:video/");
};

const FanArtDiv = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FanArtTitle = styled.div`
  font-size: 15px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  margin-bottom: 35px;
  @media (min-width: 768px) {
    font-size: 25px;
  }
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
  width: 100%;
  overflow-x: auto;
`;

const PlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex: 0 0 auto;
  &:hover {
    transform: scale(1.05);
  }
`;

const PlaylistImageWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 100px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const PlaylistImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const PlaylistTextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  font-size: 10px;
  padding: 5px 0;
  font-weight: 600;
  text-transform: capitalize;
  z-index: 2;
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  padding: 5px;
  border-radius: 20px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 30px;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  cursor: pointer;
  &:hover {
    color: #ffb36c;
  }
`;

const ModalTitle = styled.h2`
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  text-align: center;
  font-size: 20px;
  margin-bottom:5px;
  text-transform: capitalize;
`;

const FanBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  width: 100%;
  max-width: 100%;
`;

const FanArtCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
`;

const BenefitImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const FanArtImageContainer = styled.div`
  position: relative;
  width: 270px;
  height: 170px;
  border-radius: 15px;
  overflow: hidden;

  &:hover .image-overlay {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover img {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const ImageTitleStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  font-size: 12px;
  padding: 8px 5px;
  font-weight: bold;
  z-index: 2;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtonsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  gap: 2px;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
`;

const ActionButton = styled.button`
  background: #000000;
  border: none;
  border-radius: 8px;
  padding: 4px 5px;
  width: 50px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.2s;
  &:hover {
    background: #00539b;
  }
`;

const SearchStatusText = styled.p`
  color: ${(props) => (props.$isDarkMode ? "#ccc" : "#555")};
  margin-top: 10px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 6px 13px;
  border-radius: 25px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  background: ${(props) => (props.$isDarkMode ? "#333" : "#fff")};
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  width: 100%;
  max-width: 900px;
  flex: 1;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #ffb36c;
  }
`;

const SearchButton = styled(ActionButton)`
  padding: 6px 12px;
  width: auto;
    background: "#ffffff00";
`;

const SearchResultsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const SearchResultItem = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.1);
  }
`;

const SourceSelector = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SourceButton = styled.button`
  padding: 5px 15px;
  border-radius: 15px;
  border: 1px solid #ffb36c;
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) =>
    props.$active ? "black" : props.$isDarkMode ? "white" : "black"};
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  font-weight: 600;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 20px;
`;

const CanvasWrapper = styled.div`
  border: 2px solid #ffb36c;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
  canvas {
    max-width: 100%;
  }
  position: relative;
`;

const FullscreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const NavArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  font-size: 40px;
  padding: 20px;
  cursor: pointer;
  z-index: 2010;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  ${(props) => (props.$left ? "left: 20px;" : "right: 20px;")}
`;

const Toolbar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border: 1px solid rgba(255, 179, 108, 0.3);
  border-radius: 5px;
`;

// --- IndexedDB Logic ---
const DB_NAME = "FanArtDB";
const STORE_NAME = "Drafts";
const saveDraft = async (json) => {
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = (e) =>
    e.target.result.createObjectStore(STORE_NAME);
  request.onsuccess = (e) => {
    const db = e.target.result;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(json, "currentDraft");
  };
};

const loadDraft = () => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) =>
      e.target.result.createObjectStore(STORE_NAME);
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction(STORE_NAME, "readonly");
      const getReq = tx.objectStore(STORE_NAME).get("currentDraft");
      getReq.onsuccess = () => resolve(getReq.result);
    };
  });
};

const ShowInfo = styled.div`
  font-size: 11px;
  color: ${(props) => (props.$isDarkMode ? "#ddd" : "#444")};
  text-align: left;
  width: 100%;
`;

const FabricEditor = ({
  onAddImage,
  isDarkMode,
  startCooldown,
  isCooldown,
  cooldownTime,
}) => {
  const canvasElementRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [brushColor, setBrushColor] = useState("#ffb36c");
  const [brushWidth, setBrushWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(true);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [rgba, setRgba] = useState({ r: 1, g: 1, b: 1, a: 1 });

  useEffect(() => {
    if (!canvasElementRef.current) return;

    const initCanvas = new fabric.Canvas(canvasElementRef.current, {
      width: window.innerWidth < 768 ? 300 : 600,
      height: 400,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    // Відновлення чернетки
    loadDraft().then((json) => {
      if (json)
        initCanvas.loadFromJSON(json).then(() => initCanvas.renderAll());
    });

    // Автозбереження кожні 5 секунд
    const saveInterval = setInterval(() => {
      saveDraft(initCanvas.toJSON());
    }, 5000);

    setCanvas(initCanvas);

    return () => {
      clearInterval(saveInterval);
      initCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = parseInt(brushWidth, 10);
    canvas.isDrawingMode = isDrawing;
  }, [canvas, brushColor, brushWidth, isDrawing]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Ваш текст", {
      left: 100,
      top: 100,
      fontFamily: fontFamily,
      fill: brushColor,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const handleCrop = () => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject)
      return alert("Спочатку виберіть об'єкт (фото) для обрізки");

    const bound = activeObject.getBoundingRect();
    const data = canvas.toDataURL({
      left: bound.left,
      top: bound.top,
      width: bound.width,
      height: bound.height,
      format: "png",
    });

    fabric.FabricImage.fromURL(data).then((img) => {
      canvas.clear();
      canvas.setDimensions({ width: bound.width, height: bound.height });
      canvas.setBackgroundColor("#fff");
      canvas.add(img);
      canvas.renderAll();
    });
  };

  const applyFilter = (filterType) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "image") return;

    activeObject.filters = [];
    if (filterType === "grayscale")
      activeObject.filters.push(new fabric.filters.Grayscale());
    if (filterType === "invert")
      activeObject.filters.push(new fabric.filters.Invert());
    if (filterType === "contrast")
      activeObject.filters.push(new fabric.filters.Contrast({ contrast: 0.5 }));
    if (filterType === "rgba") {
      const matrix = [
        rgba.r,
        0,
        0,
        0,
        0,
        0,
        rgba.g,
        0,
        0,
        0,
        0,
        0,
        rgba.b,
        0,
        0,
        0,
        0,
        0,
        rgba.a,
        0,
      ];
      activeObject.filters.push(new fabric.filters.ColorMatrix({ matrix }));
    }

    activeObject.applyFilters();
    canvas.renderAll();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      fabric.FabricImage.fromURL(f.target.result).then((img) => {
        img.scaleToWidth(canvas.width * 0.8);
        canvas.add(img);
        canvas.centerObject(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!canvas) return;
    // Стиснення: jpeg з якістю 0.6 для економії місця
    const dataUrl = canvas.toDataURL({ format: "jpeg", quality: 0.6 });
    onAddImage({
      id: "local-" + Date.now(),
      previewURL: dataUrl,
      largeImageURL: dataUrl,
      tags: "Власний арт",
      name: "Власний малюнок",
      source: "local",
    });
    startCooldown();
  };

  return (
    <EditorContainer>
      <Toolbar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "11px", color: isDarkMode ? "white" : "black" }}
          >
            📁 Файл:
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ fontSize: "10px", width: "150px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "11px", color: isDarkMode ? "white" : "black" }}
          >
            🎨 Колір:
          </span>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "11px", color: isDarkMode ? "white" : "black" }}
          >
            📏 Товщина: {brushWidth}
          </span>
          <input
            type="range"
            min="1"
            max="50"
            value={brushWidth}
            onChange={(e) => setBrushWidth(e.target.value)}
          />
        </div>
        <FilterGroup>
          <span
            style={{ fontSize: "10px", color: isDarkMode ? "white" : "black" }}
          >
            Шрифт:
          </span>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>
          <ActionButton
            onClick={addText}
            style={{ padding: "3px 10px", fontSize: "10px" }}
          >
            ➕ Текст
          </ActionButton>
        </FilterGroup>
        <FilterGroup>
          <span
            style={{ fontSize: "10px", color: isDarkMode ? "white" : "black" }}
          >
            Фільтри:
          </span>
          <div style={{ display: "flex", gap: "3px" }}>
            <ActionButton
              onClick={() => applyFilter("grayscale")}
              style={{ padding: "3px", fontSize: "10px" }}
            >
              B&W
            </ActionButton>
            <ActionButton
              onClick={() => applyFilter("invert")}
              style={{ padding: "3px", fontSize: "10px" }}
            >
              Neg
            </ActionButton>
            <ActionButton
              onClick={() => applyFilter("rgba")}
              style={{ padding: "3px", fontSize: "10px" }}
            >
              RGBA
            </ActionButton>
          </div>
          <input
            type="number"
            step="0.1"
            value={rgba.r}
            onChange={(e) =>
              setRgba({ ...rgba, r: parseFloat(e.target.value) })
            }
            style={{ width: "40px", fontSize: "10px" }}
            title="R"
          />
        </FilterGroup>
        <div style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}>
          <ActionButton
            onClick={() => setIsDrawing(!isDrawing)}
            style={{ padding: "8px 15px", fontSize: "12px" }}
          >
            {isDrawing ? "🖐️ Вибір" : "✏️ Малювати"}
          </ActionButton>
          <ActionButton
            onClick={handleCrop}
            style={{
              padding: "8px 15px",
              fontSize: "12px",
              background: "#2196f3",
              color: "#fff",
            }}
          >
            ✂️ Обрізати
          </ActionButton>
          <ActionButton
            onClick={() =>
              canvas.clear().set("backgroundColor", "#fff").renderAll()
            }
            style={{ padding: "8px 15px", fontSize: "12px" }}
          >
            🗑️ Очистити
          </ActionButton>
          <ActionButton
            onClick={() => window.open("https://jspaint.app", "_blank")}
            style={{
              padding: "8px 15px",
              fontSize: "12px",
              background: "#4caf50",
            }}
          >
            🚀 JSPaint
          </ActionButton>
          <ActionButton
            onClick={handleSave}
            disabled={isCooldown}
            style={{ padding: "8px 15px", fontSize: "12px" }}
          >
            {isCooldown ? `${cooldownTime}с` : "💾 Зберегти"}
          </ActionButton>
        </div>
      </Toolbar>
      <CanvasWrapper>
        <canvas ref={canvasElementRef} />
      </CanvasWrapper>
    </EditorContainer>
  );
};

const FanArt = ({
  isDarkMode,
  user,
  onOpenRegister,
  setHeroBg,
  setCustomHeroBgs,
}) => {
  const [customImages, setCustomImages] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [searchPage, setSearchPage] = useState(1);
  const [searchSource, setSearchSource] = useState("pixabay"); // 'pixabay' or 'tvmaze'
  const [creationMode, setCreationMode] = useState("search"); // 'search' or 'editor'
  const [visibleCount, setVisibleCount] = useState(12);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  const allImagesData = DEFAULT_BGS;
  const combinedImages = [...allImagesData, ...customImages];

  useEffect(() => {
    const hydrate = async () => {
      try {
        const saved = await localforage.getItem("fanart_custom_images");
        if (saved) setCustomImages(saved);
      } catch (error) {
        console.error("Failed to load custom images:", error);
      } finally {
        setIsHydrated(true);
      }
    };
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localforage.setItem("fanart_custom_images", customImages);
    }
  }, [customImages, isHydrated]);

  const [playlistTick, setPlaylistTick] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const playlists = [
    "Динофроз",
    "Тварини",
    "Локації",
    "Фентезі",
    "Хоррор",
    "Аркада",
    "ваші картинки",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaylistTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const imagesForPlaylist = selectedPlaylist
    ? combinedImages.filter((img) => img.category === selectedPlaylist)
    : [];

  const handleKeyDown = useCallback(
    (e) => {
      if (fullscreenIndex === null) return;
      if (e.key === "Escape") setFullscreenIndex(null);
      if (e.key === "ArrowRight") {
        setFullscreenIndex((prev) => (prev + 1) % imagesForPlaylist.length);
      }
      if (e.key === "ArrowLeft") {
        setFullscreenIndex(
          (prev) =>
            (prev - 1 + imagesForPlaylist.length) % imagesForPlaylist.length,
        );
      }
    },
    [fullscreenIndex, imagesForPlaylist.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleLoadMoreImages = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleDownload = (imgSrc) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const a = document.createElement("a");
    a.href = imgSrc;
    a.download = "fanart.jpg";
    a.click();
  };

  const handlePrint = (imgSrc) => {
    if (!user) {
      onOpenRegister();
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Print Fan Art</title></head><body style="text-align:center;"><img src="${imgSrc}" style="max-width:100%;" onload="window.print();window.close()" /></body></html>`,
    );
    printWindow.document.close();
  };

  useEffect(() => {
    const cooldownEndTime = localStorage.getItem("fanart_cooldown_end");
    if (cooldownEndTime) {
      const remainingTime = cooldownEndTime - Date.now();
      if (remainingTime > 0) {
        setIsCooldown(true);
        setCooldownTime(Math.ceil(remainingTime / 1000));
      } else {
        localStorage.removeItem("fanart_cooldown_end");
      }
    }
  }, []);

  useEffect(() => {
    if (!isCooldown) return;

    let timer;
    if (cooldownTime > 0) {
      timer = setTimeout(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    } else {
      setIsCooldown(false);
      localforage.removeItem("fanart_cooldown_end");
    }

    return () => clearTimeout(timer);
  }, [isCooldown, cooldownTime]);

  const startCooldown = async () => {
    const endTime = Date.now() + 40 * 1000;
    await localforage.setItem("fanart_cooldown_end", endTime);
    setIsCooldown(true);
    setCooldownTime(40);
  };

  const translateToEn = async (text) => {
    if (!text || text.length < 3) return text;
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=en&dt=t&q=${encodeURIComponent(text)}`,
      );
      const data = await response.json();
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchStatus("loading");
    setSearchResults([]);
    try {
      if (searchSource === "pixabay") {
        const API_KEY = "50977795-feb18de71b048a02e0c824e54";
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            searchQuery,
          )}&image_type=photo&per_page=12&lang=ru&page=1`,
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
          setSearchResults(
            data.hits.map((hit) => ({
              id: hit.id,
              previewURL: hit.previewURL,
              largeImageURL: hit.largeImageURL,
              tags: hit.tags,
              name: hit.tags,
              source: "pixabay",
            })),
          );
          setSearchPage(1);
          setSearchStatus("idle");
        } else {
          setSearchStatus("no-results");
        }
      } else {
        // TVMaze search
        const translatedQuery = await translateToEn(searchQuery);
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(translatedQuery)}`,
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Фільтруємо лише ті, де є зображення
        const validResults = data.filter(
          (item) => item.show && item.show.image,
        );

        if (validResults.length === 0) {
          setSearchStatus("no-results");
          return;
        }

        // Отримуємо акторів для кожного результату
        const resultsWithCast = await Promise.all(
          validResults.slice(0, 10).map(async (item) => {
            const castRes = await fetch(
              `https://api.tvmaze.com/shows/${item.show.id}/cast`,
            );
            const castData = castRes.ok ? await castRes.json() : [];
            return {
              id: item.show.id,
              name: item.show.name,
              previewURL: item.show.image.medium,
              largeImageURL: item.show.image.original,
              summary: item.show.summary?.replace(/<[^>]*>?/gm, ""), // Видаляємо HTML теги
              cast: castData
                .slice(0, 4)
                .map((c) => c.person.name)
                .join(", "),
              url: item.show.url,
              source: "tvmaze",
            };
          }),
        );

        setSearchResults(resultsWithCast);
        setSearchStatus("idle");
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchStatus("error");
    } finally {
      await startCooldown();
    }
  };

  const handleLoadMore = async () => {
    if (searchSource !== "pixabay" || !searchQuery.trim() || isCooldown) return;

    setSearchStatus("loading");
    const nextPage = searchPage + 1;

    try {
      const API_KEY = "50977795-feb18de71b048a02e0c824e54";
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery,
        )}&image_type=photo&per_page=12&lang=ru&page=${nextPage}`,
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        const mapped = data.hits.map((hit) => ({
          id: hit.id,
          previewURL: hit.previewURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
          source: "pixabay",
        }));
        setSearchResults((prev) => [...prev, ...mapped]);
        setSearchPage(nextPage);
        setSearchStatus("idle");
      } else {
        alert("Більше зображень не знайдено.");
        setSearchStatus("idle");
      }
    } catch (error) {
      console.error("Error loading more from Pixabay:", error);
      setSearchStatus("error");
    } finally {
      await startCooldown();
    }
  };

  const handleAddCustomImage = (hit) => {
    if (customImages.length >= 3)
      return alert("Можна додати не більше 3 картинок.");
    if (customImages.some((img) => img.id === hit.id))
      return alert("Це зображення вже додано.");

    const newImage = {
      id: hit.id,
      src: hit.previewURL,
      largeSrc: hit.largeImageURL || hit.previewURL,
      category: "ваші картинки",
      summary: hit.summary,
      cast: hit.cast,
      title: hit.name,
      url: hit.url,
    };
    setCustomImages([...customImages, newImage]);
  };

  const openPlaylistModal = (category) => {
    setSelectedPlaylist(category);
    setVisibleCount(12);
  };

  const closePlaylistModal = () => {
    setSelectedPlaylist(null);
  };

  const handleRemoveCustomImage = (idToRemove) => {
    setCustomImages((prev) => prev.filter((img) => img.id !== idToRemove));
  };

  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>
        Друкарня
      </FanArtTitle>
      <PlaylistContainer>
        {playlists.map((category) => {
          const catImages = combinedImages.filter(
            (img) => img.category === category,
          );
          if (catImages.length === 0 && category !== "ваші картинки")
            return null;
          const displayImages =
            catImages.length > 0
              ? catImages
              : [{ src: monody, category: "ваші картинки" }];

          const thumbnailImages = displayImages.filter(img => !isVideoSource(img.src));
          const finalThumbnails = thumbnailImages.length > 0 ? thumbnailImages : displayImages;

          return (
            <PlaylistItem
              key={category}
              onClick={() => openPlaylistModal(category)}
            >
              <PlaylistImageWrapper>
                {finalThumbnails.map((img, index) => {
                  const isActive =
                    index === playlistTick % finalThumbnails.length;
                  return (
                    <PlaylistImage
                      key={index}
                      src={img.src}
                      alt={category}
                      $isActive={isActive}
                    />
                  );
                })}
                <PlaylistTextOverlay>{category}</PlaylistTextOverlay>
              </PlaylistImageWrapper>
            </PlaylistItem>
          );
        })}
      </PlaylistContainer>

      {selectedPlaylist && (
        <ModalOverlay onClick={closePlaylistModal}>
          <ModalContent
            $isDarkMode={isDarkMode}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton $isDarkMode={isDarkMode} onClick={closePlaylistModal}>
              &times;
            </CloseButton>
            <ModalTitle $isDarkMode={isDarkMode}>
              Плейлист: {selectedPlaylist}
            </ModalTitle>

            {selectedPlaylist === "ваші картинки" && (
              <SearchContainer>
                <p
                  style={{
                    color: isDarkMode ? "#ccc" : "#555",
                    marginBottom: "10px",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  Створіть свій шедевр або знайдіть готовий (макс. 3)
                </p>

                <SourceSelector>
                  <SourceButton
                    $isDarkMode={isDarkMode}
                    $active={creationMode === "search"}
                    onClick={() => setCreationMode("search")}
                  >
                    🔍 Пошук
                  </SourceButton>
                  <SourceButton
                    $isDarkMode={isDarkMode}
                    $active={creationMode === "editor"}
                    onClick={() => setCreationMode("editor")}
                  >
                    🎨 Редактор та Файли
                  </SourceButton>
                </SourceSelector>

                {creationMode === "search" ? (
                  <>
                    <SourceSelector>
                      <SourceButton
                        $isDarkMode={isDarkMode}
                        $active={searchSource === "pixabay"}
                        onClick={() => setSearchSource("pixabay")}
                      >
                        🖼 Pixabay
                      </SourceButton>
                      <SourceButton
                        $isDarkMode={isDarkMode}
                        $active={searchSource === "tvmaze"}
                        onClick={() => setSearchSource("tvmaze")}
                      >
                        🎬 TVMaze (Кіно)
                      </SourceButton>
                    </SourceSelector>
<SourceSelector>
                    <SearchInput
                      $isDarkMode={isDarkMode}
                      type="text"
                      placeholder="Пошук зображень. Англійською вводьте."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <SearchButton
                      type="button"
                      onClick={handleSearch}
                      disabled={isCooldown}
                    >
                      {isCooldown ? `Зачекайте ${cooldownTime}с` : "Знайти"}
                    </SearchButton>
</SourceSelector>
                    {searchStatus === "loading" && (
                      <SearchStatusText $isDarkMode={isDarkMode}>
                        Завантаження...
                      </SearchStatusText>
                    )}
                    {searchStatus === "no-results" && (
                      <SearchStatusText $isDarkMode={isDarkMode}>
                        Зображень за вашим запитом не знайдено.
                      </SearchStatusText>
                    )}
                    {searchStatus === "error" && (
                      <SearchStatusText $isDarkMode={isDarkMode}>
                        Помилка пошуку. Спробуйте пізніше.
                      </SearchStatusText>
                    )}

                    {searchResults.length > 0 && searchSource === "pixabay" && (
                      <SearchButton
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isCooldown}
                        style={{ marginTop: "10px" }}
                      >
                        {isCooldown
                          ? `Зачекайте ${cooldownTime}с`
                          : "Завантажити ще"}
                      </SearchButton>
                    )}

                    {searchResults.length > 0 && (
                      <SearchResultsGrid>
                        {searchResults.map((hit) => (
                          <SearchResultItem
                            key={hit.id}
                            onClick={() => handleAddCustomImage(hit)}
                          >
                            <BenefitImage
                              src={hit.previewURL}
                              alt={hit.name || hit.tags}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "2px",
                              }}
                            >
                              + Додати
                            </div>
                          </SearchResultItem>
                        ))}
                      </SearchResultsGrid>
                    )}
                  </>
                ) : (
                  <FabricEditor
                    onAddImage={handleAddCustomImage}
                    isDarkMode={isDarkMode}
                    startCooldown={startCooldown}
                    isCooldown={isCooldown}
                    cooldownTime={cooldownTime}
                  />
                )}
              </SearchContainer>
            )}

            <FanBlock>
              <AnimatePresence>
                {combinedImages
                  .filter((img) => img.category === selectedPlaylist)
                  .slice(0, visibleCount)
                  .map((imgData, idx) => (
                    <FanArtCard
                      key={imgData.id || imgData.src}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, y: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FanArtImageContainer>
                        <BenefitImage
                          src={imgData.src}
                          alt={`Fan art - ${imgData.category}`}
                          title={imgData.name || imgData.title || "Фанарт"}
                          onClick={() => setFullscreenIndex(idx)}
                          style={{ cursor: "zoom-in" }}
                        />
                        <ImageTitleStrip className="image-overlay">
                          {imgData.name || imgData.title || "Фанарт"}
                        </ImageTitleStrip>
                        <ActionButtonsContainer className="image-overlay">
                          <ActionButton
                            onClick={() => handleDownload(imgData.src)}
                            title="Скачати"
                          >
                            ⇩
                          </ActionButton>
                          <ActionButton
                            onClick={() => handlePrint(imgData.src)}
                            title="Роздрукувати"
                          >
                            ⎙
                          </ActionButton>
                          <ActionButton
                            onClick={() => {
                              setHeroBg(imgData.src);
                              setCustomHeroBgs((prev) => {
                                if (prev.some((bg) => bg.src === imgData.src))
                                  return prev;
                                return [
                                  {
                                    src: imgData.src,
                                    name: imgData.title || "Фанарт",
                                  },
                                  ...prev,
                                ];
                              });
                            }}
                            title="Встановити на шпалери"
                            style={{ background: "#4caf50", color: "white" }}
                          >
                            🖼️
                          </ActionButton>
                          {selectedPlaylist === "ваші картинки" && (
                            <ActionButton
                              onClick={() => handleRemoveCustomImage(imgData.id)}
                              title="Видалити"
                              style={{ background: "#ff6961" }}
                            >
                              🗑️
                            </ActionButton>
                          )}
                        </ActionButtonsContainer>
                      </FanArtImageContainer>
                      {imgData.summary && (
                        <ShowInfo $isDarkMode={isDarkMode}>
                          <p
                            style={{ fontWeight: "bold", margin: "0 0 5px 0" }}
                          >
                            {imgData.title}
                          </p>
                          <p
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              margin: 0,
                            }}
                          >
                            <b>Сюжет:</b> {imgData.summary}
                          </p>
                          <p style={{ margin: "5px 0 0 0" }}>
                            <b>Актори:</b> {imgData.cast || "Не вказано"}
                          </p>
                          {imgData.url && (
                            <a
                              href={imgData.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#ffb36c",
                                fontSize: "10px",
                                textDecoration: "underline",
                                display: "block",
                                marginTop: "5px",
                              }}
                            >
                              Оригінальний сайт
                            </a>
                          )}
                        </ShowInfo>
                      )}
                    </FanArtCard>
                  ))}
              </AnimatePresence>
            </FanBlock>
            {imagesForPlaylist.length > visibleCount && (
              <ActionButton
                onClick={handleLoadMoreImages}
                style={{ marginTop: "20px", width: "auto" }}
              >
                Завантажити ще
              </ActionButton>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <FullscreenOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenIndex(null)}
          >
            <CloseButton
              style={{ color: "white", zIndex: 2020 }}
              onClick={() => setFullscreenIndex(null)}
            >
              &times;
            </CloseButton>
            <NavArrow
              $left
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIndex(
                  (prev) =>
                    (prev - 1 + imagesForPlaylist.length) %
                    imagesForPlaylist.length,
                );
              }}
            >
              ❮
            </NavArrow>
            <motion.img
              key={fullscreenIndex}
              src={
                imagesForPlaylist[fullscreenIndex].largeSrc ||
                imagesForPlaylist[fullscreenIndex].src
              }
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <NavArrow
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIndex(
                  (prev) => (prev + 1) % imagesForPlaylist.length,
                );
              }}
            >
              ❯
            </NavArrow>
          </FullscreenOverlay>
        )}
      </AnimatePresence>
    </FanArtDiv>
  );
};

export default FanArt;
