import React, { useEffect, useState, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import rainbow from "../../photos/vip-images/stars.webp";
import NewsAiModal from "./NewsAiModal";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SOURCES = [
  { url: "https://phys.org/rss-feed/biology-news/animals-news/", name: "Phys.org", flag: "🇬🇧", home: "https://phys.org" },
];

const STOP_WORDS = [
  "війна",
  "політика",
  "кримінал",
  "суд",
  "затримано",
  "казино",
  "ставки",
  "корупція",
];

const translateText = async (text) => {
  if (!text || text.length < 3) return text;
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uk&dt=t&q=${encodeURIComponent(text)}`,
    );
    const data = await res.json();
    return data[0].map((s) => s[0]).join("");
  } catch {
    return text;
  }
};

const NewsDiv = styled.div`  
  position: relative;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 5px;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.a`
  background: ${(props) => (props.$isDarkMode ? "#ffffff" : "#1a1a1a")};
  color: ${(props) => (props.$isDarkMode ? "#000000" : "#ffffff")};
  text-decoration: none;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NewsImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  display: block;
  z-index: 1;
`;

const SourceFlag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  z-index: 5;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    color: #ffb36c;
  }
  backdrop-filter: blur(4px);
`;

const PaginationSide = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 135px;
  background: ${(props) => (props.$isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.4)")};
  padding: 4px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid #ffb36c;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
`;

const PageArrow = styled.button`
  background: none;
  border: none;
  color: #ffb36c;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

const NewBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4d;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  z-index: 6;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease;
`;

const AiSummaryBtn = styled.button`
  position: absolute;
  top: 10px;
  right: ${(props) => (props.$hasNewBadge ? '60px' : '10px')};
  background: rgba(255, 179, 108, 0.9);
  color: black;
  border: none;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  z-index: 6;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  transition: all 0.2s;
  &:hover {
    background: #ffb36c;
    transform: scale(1.05);
  }
`;

const NewsCard = ({ item, $isDarkMode, showImage, showTitle, showDescription, onAiSummaryClick }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(item.isNew);

  useEffect(() => {
    if (!item.isNew) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Коли новина потрапила на очі, запускаємо таймер на 1 хвилину
          const timer = setTimeout(async () => {
            setIsVisible(false);
            // Оновлюємо список побачених в localforage
            const seenLinks = (await localforage.getItem("seen_news_links")) || [];
            if (!seenLinks.includes(item.link)) {
              await localforage.setItem("seen_news_links", [...seenLinks, item.link]);
            }
          }, 60000); // 60000мс = 1 хвилина

          observer.unobserve(entry.target);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 } // Мінімум 50% картки має бути видно
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [item.isNew, item.link]);

  return (
    <Card
      ref={cardRef}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      $isDarkMode={$isDarkMode}
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", flexGrow: 1, minHeight: showImage ? "260px" : "auto" }}>
        {isVisible && <NewBadge>Нове</NewBadge>}
        <SourceFlag 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            window.open(item.sourceHome, "_blank");
          }}
          title={`Перейти на головну сторінку ${item.sourceName}`}
        >
          {item.sourceFlag} {item.sourceName}
        </SourceFlag>
        <AiSummaryBtn 
          $hasNewBadge={isVisible}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onAiSummaryClick) onAiSummaryClick(item);
          }}
          title="Отримати ШІ виклад новини"
        >
          ✨ ШІ Виклад
        </AiSummaryBtn>
        {showImage && (
          <NewsImg
            src={item.displayImage}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = rainbow;
            }}
          />
        )}
        {(showTitle || showDescription) && (
          <CardContent $overlay={showImage}>
            {showTitle && (
              <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "700", lineHeight: "1.3" }}>
                {item.title}
              </h4>
            )}
            {showDescription && (
              <p style={{ fontSize: "13px", opacity: 0.9, margin: 0, lineHeight: "1.4" }}>
                {item.description}
              </p>
            )}
          </CardContent>
        )}
      </div>
    </Card>
  );
};

const CardContent = styled.div`
  padding: 20px;
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  z-index: 2;
  ${(props) => props.$overlay ? `
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  ` : `
    color: inherit;
  `}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) => (props.$active ? "#000" : props.$isDarkMode ? "#666" : "#ccc")};
  border: 1px solid #ffb36c;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  &:hover {
    background: rgba(255, 179, 108, 0.3);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const RefreshBtn = styled.button`
  background: none;
  border: 1px solid ${(props) => (props.$isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)")};
  color: ${(props) => (props.$isDarkMode ? "#666" : "#ccc")};
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 11px;
  margin-left: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  vertical-align: middle;
  &:hover:not(:disabled) {
    background: #ffb36c;
    color: #000;
    border-color: #ffb36c;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: ${(props) => (props.$isDarkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)")};
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: ${(props) => (props.$isError ? "#ff4d4d" : "#ffb36c")};
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 0 10px ${(props) => (props.$isError ? "rgba(255, 77, 77, 0.7)" : "rgba(255, 179, 108, 0.5)")};
`;

const News = ({ $isDarkMode, user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [filterSource, setFilterSource] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const [customSources, setCustomSources] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [isAddingSource, setIsAddingSource] = useState(false);
  
  // 1. Стан розмонтування для Memory Leak Protection
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const loadCustomSources = async () => {
      const saved = await localforage.getItem("custom_news_sources");
      if (saved) setCustomSources(saved);
    };
    loadCustomSources();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getData = useCallback(async (showLoader = false) => {
    if (showLoader && isMounted.current) {
      setLoading(true);
      setLoadProgress(5);
      setHasError(false);
    }
    try {
      let allItems = [];
      const savedCustom = (await localforage.getItem("custom_news_sources")) || [];
      const allSources = [...SOURCES, ...savedCustom];
      for (const source of allSources) {
        try {
          const res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`,
          );
          const data = await res.json();
          if (data.status === "ok" && data.items.length > 0) {
            // Додаємо інформацію про джерело до кожного елемента
            const itemsWithSource = data.items.map(item => ({
              ...item,
              sourceName: source.name,
              sourceFlag: source.flag,
              sourceHome: source.home
            }));
            allItems = [...allItems, ...itemsWithSource];
          }
        } catch (e) {
          continue;
        }
      }

      // 1. Якщо жодне джерело не повернуло дані — викликаємо помилку для UI
      if (allItems.length === 0) {
        throw new Error("Не вдалося завантажити жодне джерело новин");
      }

      if (showLoader && isMounted.current) setLoadProgress(25);

      // 1. Сортування об'єднаного списку новин за датою (найсвіжіші зверху)
      allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      const clean = allItems.filter((i) => {
        const content = (i.title + (i.description || "")).toLowerCase();
        return !STOP_WORDS.some((word) => content.includes(word));
      });

      // Збільшуємо кількість новин до 15
      const limited = clean.slice(0, 15);
      const results = new Array(limited.length);
      const toTranslateIndices = [];
      const stringsToTranslate = [];

      // 1. Перевіряємо кеш та збираємо тексти для пакетного перекладу
      const seenLinks = (await localforage.getItem("seen_news_links")) || [];

      for (let i = 0; i < limited.length; i++) {
        const item = limited[i];
        const cacheKey = `news_trans_${item.link}`;
        const cached = await localforage.getItem(cacheKey);
        const isNew = !seenLinks.includes(item.link);

        if (cached) {
          results[i] = { ...cached, sourceName: item.sourceName, sourceFlag: item.sourceFlag, sourceHome: item.sourceHome, isNew };
        } else {
          const cleanDesc = (item.description || "")
            .replace(/<[^>]*>?/gm, "")
            .trim()
            .substring(0, 290);

          toTranslateIndices.push(i);
          stringsToTranslate.push(item.title);
          stringsToTranslate.push(cleanDesc);
        }
      }

      // 2. Пакетний переклад з безпечним роздільником ___ та перевіркою довжини
      if (stringsToTranslate.length > 0) {
        if (showLoader && isMounted.current) setLoadProgress(40);
        
        let currentBatchStrings = [];
        let currentBatchIndices = [];
        let currentLen = 0;
        const batches = [];

        for (let i = 0; i < toTranslateIndices.length; i++) {
          const title = stringsToTranslate[i * 2];
          const desc = stringsToTranslate[i * 2 + 1];
          const pairLen = title.length + desc.length + 10; // Довжина тексту + роздільники

          if (currentLen + pairLen > 4500 && currentBatchStrings.length > 0) {
            batches.push({ strings: currentBatchStrings, indices: currentBatchIndices });
            currentBatchStrings = [];
            currentBatchIndices = [];
            currentLen = 0;
          }
          currentBatchStrings.push(title, desc);
          currentBatchIndices.push(toTranslateIndices[i]);
          currentLen += pairLen;
        }
        if (currentBatchStrings.length > 0) {
          batches.push({ strings: currentBatchStrings, indices: currentBatchIndices });
        }

        // Виконуємо запити для кожного батча
        for (const batch of batches) {
          const combinedText = batch.strings.join(" ___ ");
          const translatedCombined = await translateText(combinedText);
          // Використовуємо регулярний вираз для обробки можливих пробілів від Google
          const splitResults = translatedCombined.split(/\s*___\s*/);

          for (let j = 0; j < batch.indices.length; j++) {
            const idx = batch.indices[j];
            const item = limited[idx];
            const bestImg = (item.enclosure && item.enclosure.link) || item.thumbnail || rainbow;

            const translatedItem = {
              title: splitResults[j * 2]?.trim() || item.title,
              description: (splitResults[j * 2 + 1]?.trim() || "") + "...",
              link: item.link,
              displayImage: bestImg,
              sourceName: item.sourceName,
              sourceFlag: item.sourceFlag,
              sourceHome: item.sourceHome,
              isNew: !seenLinks.includes(item.link)
            };

            await localforage.setItem(`news_trans_${item.link}`, translatedItem);
            results[idx] = translatedItem;
          }
        }
      }

      if (showLoader && isMounted.current) setLoadProgress(100);

      // 3. Авто-видалення: очищуємо старі записи, щоб не засмічувати пам'ять
      const allKeys = await localforage.keys();
      const newsCacheKeys = allKeys.filter((k) => k.startsWith("news_trans_"));
      const currentActiveKeys = limited.map((i) => `news_trans_${i.link}`);

      for (const key of newsCacheKeys) {
        if (!currentActiveKeys.includes(key)) {
          await localforage.removeItem(key);
        }
      }

      if (isMounted.current) {
        setItems(results);
        setLastUpdated(new Date());
      }
    } catch (e) {
      console.error("Помилка завантаження новин:", e);
      if (showLoader && isMounted.current) {
        setHasError(true);
        setLoadProgress(100);
        // Даємо користувачу 2.5 секунди побачити червоний прогрес-бар
        await new Promise((resolve) => setTimeout(resolve, 2500));
      }
    } finally {
      if (showLoader && isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      // Перевірка збереженого таймера обмеження в localforage
      const endTime = await localforage.getItem("news_refresh_cooldown_end");
      if (endTime) {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);
        if (remaining > 0) setCooldown(remaining);
      }
      // Перший запуск із показом лоадера
      getData(true);
    };

    init();

    // Налаштування інтервалу оновлення (60 хвилин = 3600000 мс)
    const interval = setInterval(() => getData(false), 60 * 60 * 1000);

    // Очищення інтервалу при видаленні компонента
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // getData стабільна (useCallback []), тому ми можемо безпечно прибрати її звідси

  // Скидаємо кількість видимих новин при зміні джерела
  useEffect(() => {
    setCurrentPage(1);
  }, [filterSource]);

  // Таймер для cooldown кнопки оновлення
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Видаляємо запис, коли час вийшов
      localforage.removeItem("news_refresh_cooldown_end");
    }
  }, [cooldown]);

  const handleManualRefresh = async () => {
    if (cooldown > 0) return;
    getData(true);
    // Зберігаємо час закінчення (зараз + 60 секунд)
    await localforage.setItem("news_refresh_cooldown_end", Date.now() + 60000);
    setCooldown(60); // Встановлюємо 60 секунд обмеження
  };

  const handleAddSource = async () => {
    if (!newUrl) return;
    if (customSources.length >= 2) {
      alert("Ви досягли ліміту! Можна додати не більше 2 власних джерел.");
      return;
    }
    try {
      const urlObj = new URL(newUrl);
      const domain = urlObj.hostname.replace('www.', '');
      const newSource = {
        url: newUrl,
        name: domain,
        flag: "🌐",
        home: urlObj.origin
      };

      const saved = (await localforage.getItem("custom_news_sources")) || [];
      if (!saved.find(s => s.url === newUrl)) {
        if (saved.length >= 2) {
          alert("Ви досягли ліміту! Можна додати не більше 2 власних джерел.");
          return;
        }
        const updated = [...saved, newSource];
        await localforage.setItem("custom_news_sources", updated);
        setCustomSources(updated);
        setNewUrl("");
        setIsAddingSource(false);
        getData(true);
      } else {
        alert("Це джерело вже додано.");
      }
    } catch (e) {
      alert("Невірний формат URL. Введіть правильне посилання (наприклад, https://example.com/rss)");
    }
  };

  const handleRemoveSource = async (urlToRemove) => {
    if (!window.confirm("Видалити це джерело новин?")) return;
    const saved = (await localforage.getItem("custom_news_sources")) || [];
    const updated = saved.filter(s => s.url !== urlToRemove);
    await localforage.setItem("custom_news_sources", updated);
    setCustomSources(updated);
    if (filterSource === saved.find(s => s.url === urlToRemove)?.name) {
      setFilterSource("all");
    }
    getData(true);
  };

  const filteredItems = items.filter((item) => {
    return filterSource === "all" || item.sourceName === filterSource;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const displayedItems = filteredItems.slice((currentPage - 1) * 3, currentPage * 3);

  // Отримуємо налаштування видимості з об'єкта користувача
  const layout = user?.newsLayout || [];
  const isVisible = (key) => layout.find(item => item.key === key)?.visible !== false;
  const showImage = isVisible("image");
  const showTitle = isVisible("title");
  const showDescription = isVisible("description");

  return (
    <NewsDiv>
      <AihelpTitle $isDarkMode={$isDarkMode}>
        Новини та реклама
        {lastUpdated && (
          <span style={{ fontSize: '0.55em', opacity: 0.6, marginLeft: '12px', fontWeight: '400', verticalAlign: 'middle' }}>
            (Оновлено: {lastUpdated.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })})
          </span>
        )}
        <RefreshBtn 
          $isDarkMode={$isDarkMode} 
          onClick={handleManualRefresh}
          disabled={loading || cooldown > 0}
          title={cooldown > 0 ? `Повторне оновлення буде доступне через ${cooldown} сек.` : "Оновити новини"}
        >
          {loading ? "⌛ Оновлення..." : cooldown > 0 ? `⏳ ${cooldown}с` : "🔄 Оновити"}
        </RefreshBtn>
      </AihelpTitle>
      <FilterContainer>
        <FilterBtn 
          $isDarkMode={$isDarkMode} 
          $active={filterSource === "all"} 
          onClick={() => setFilterSource("all")}
        >Усі</FilterBtn>
        {SOURCES.map(s => (
          <FilterBtn 
            key={s.name}
            $isDarkMode={$isDarkMode} 
            $active={filterSource === s.name} 
            onClick={() => setFilterSource(s.name)}
          >{s.name}</FilterBtn>
        ))}
        {customSources.map(s => (
          <FilterBtn 
            key={s.url}
            $isDarkMode={$isDarkMode} 
            $active={filterSource === s.name} 
            onClick={() => setFilterSource(s.name)}
          >
            {s.name} 
            <span 
              onClick={(e) => { e.stopPropagation(); handleRemoveSource(s.url); }} 
              style={{ marginLeft: '6px', color: '#ff4d4d', fontWeight: 'bold' }}
              title="Видалити джерело"
            >
              ×
            </span>
          </FilterBtn>
        ))}
        {customSources.length < 2 && (
          <FilterBtn 
            $isDarkMode={$isDarkMode} 
            onClick={() => setIsAddingSource(!isAddingSource)}
            style={{ borderStyle: 'dashed' }}
          >
            {isAddingSource ? 'Скасувати' : '+ Додати джерело'}
          </FilterBtn>
        )}
          <PaginationSide $isDarkMode={$isDarkMode}>
              <PageArrow 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => p - 1)}
              >◄</PageArrow>
            {[1, 2, 3].map(num => (
              <FilterBtn
                key={num}
                $active={currentPage === num}
                $isDarkMode={$isDarkMode}
                onClick={() => setCurrentPage(num)}
                style={{ padding: '5px', minWidth: '25px', borderRadius: '50%' }}
                disabled={filteredItems.length < (num - 1) * 3 + 1}
              >
                {num}
              </FilterBtn>
            ))}
                          <PageArrow 
                disabled={currentPage === 3 || filteredItems.length <= currentPage * 3} 
                onClick={() => setCurrentPage(p => p + 1)}
              >► </PageArrow>
          </PaginationSide>
      </FilterContainer>

      <AnimatePresence>
        {isAddingSource && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                value={newUrl} 
                onChange={e => setNewUrl(e.target.value)}
                placeholder="Введіть URL RSS (напр. https://rss.com/feed)"
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  border: `1px solid ${$isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`, 
                  background: $isDarkMode ? '#f5f5f5' : '#1a1a1a', 
                  color: $isDarkMode ? '#000' : '#fff', 
                  outline: 'none',
                  minWidth: '250px',
                  fontFamily: 'var(--font-family)',
                  fontSize: '14px'
                }}
              />
              <FilterBtn $isDarkMode={$isDarkMode} onClick={handleAddSource} style={{ background: '#ffb36c', color: '#000' }}>
                Зберегти
              </FilterBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div style={{ textAlign: "center", color: "gray", padding: "60px 20px" }}>
          <div style={{ marginBottom: "15px", fontSize: "14px", fontWeight: "500" }}>
            {hasError ? "⚠️ Помилка завантаження!" : `Шукаємо цікавинки... ${loadProgress}%`}
          </div>
          <ProgressBar $isDarkMode={$isDarkMode}>
            <ProgressBarFill $progress={loadProgress} $isError={hasError} />
          </ProgressBar>
        </div>
      ) : filteredItems.length > 0 ? (
        <div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + filterSource}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Grid>
                {displayedItems.map((item) => (
                  <NewsCard
                    key={item.link}
                    item={item}
                    $isDarkMode={$isDarkMode}
                    showImage={showImage}
                    showTitle={showTitle}
                    showDescription={showDescription}
                    onAiSummaryClick={(news) => {
                      setSelectedNews(news);
                      setIsAiModalOpen(true);
                    }}
                  />
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "gray", padding: "20px" }}>
          Новини тимчасово відпочивають. Зазирніть за хвилину!
        </div>
      )}

      {selectedNews && (
        <NewsAiModal 
          isOpen={isAiModalOpen} 
          onClose={() => setIsAiModalOpen(false)} 
          newsItem={selectedNews} 
          isDarkMode={$isDarkMode} 
        />
      )}
    </NewsDiv>
  );
};

export default News;