// Міста для тесту: Дубай (>30°C), Якутськ (<-30°C), Кейптаун (вітер >10 м/с). Графік have погодинну перевірку вітру та деталізовані причини небезпеки в підказках.
import {
  useState,
  useEffect,
  useCallback,
  memo,
  Suspense,
  useMemo,
  useRef,
  lazy,
} from "react";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";

import localforage from "localforage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader.jsx";
import WeatherCardComponent from "./components/Weather/Weather.jsx";
import NotFound from "./components/NotFound.jsx";
import fogBackground from "./photos/hero-header/fogtwo.webp";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import userDefault from "./photos/hero-header/user.webp";
import turkeys from "./photos/vip-images/turkeys/ultra-vip-turkeys.webp";
import dragons from "./photos/vip-images/dinofroz/vip-dragons.webp";
import horrordog from "./photos/vip-images/horror/horror.webp";
import horse from "./photos/vip-images/horse/horse.webp";
import lebid from "./photos/vip-images/vip-lebid.webp";
import rooster from "./photos/vip-images/vip-rooster.webp";
import nicerone from "./photos/vip-images/dinofroz/vip-dinofroz.webp";
import soloveyko from "./photos/vip-images/vip-soloveyko.webp";
import monody from "./photos/vip-images/asium/vip-forest.webp";
import dizel from "./photos/vip-images/dizel.webp";
import flame from "./photos/vip-images/flame.webp";
import finances from "./photos/fan-art/finance.webp";
import parol from "./photos/fan-art/parol.webp";
import vovk from "./photos/fan-art/kolada.webp";
// Ресурси для фонового завантаження кат-сцени
import dinofrozVideo from "./mp3/dinofroz.mp4";
import startImage from "./photos/hero-header/start-image.webp";
import turkeysAudio from "./mp3/turkeys.mp3";
import ultraImage from "./photos/vip-modal/realultra.webp";
import { assetMap, songAiKnowledge } from "./components/MusicPhoto/MusicPhoto.assets";
import { DEFAULT_SITE_SECTIONS } from "./components/Header/Menu.jsx";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import { DecoratorProvider } from "./components/Decorator/DecoratorContext.jsx";
import DecoratorOverlay from "./components/Decorator/DecoratorOverlay.jsx";

const Prison = lazy(() => import("./components/Prison/Prison.jsx"));
const Aihelp = lazy(() => import("./components/Aihelp/Aihelp.jsx"));
const FanArt = lazy(() => import("./components/FanArt/FanArt.jsx"));
const ShopModal = lazy(() => import("./components/Modals/ShopModal.jsx"));
const News = lazy(() => import("./components/News/News.jsx"));
const AchivmentsModal = lazy(
  () => import("./components/Modals/AchivmentsModal.jsx"),
);
//const Puzzles = lazy(() => import("./components/Puzzles/Puzzles.jsx"));
const ClimateMap = lazy(() => import("./components/ClimateMap/ClimateMap.jsx"));
const MusicPhoto = lazy(() => import("./components/MusicPhoto/MusicPhoto.jsx"));
const Modal = lazy(() => import("./components/Modals/Modal.jsx"));
const LoginModal = lazy(() => import("./components/Modals/LoginModal.jsx"));
const UserSettingsModal = lazy(
  () => import("./components/Modals/UserSettingsModal.jsx"),
);
const VipModal = lazy(() => import("./components/Modals/VipModal.jsx"));
const WeatherDetailsModal = lazy(
  () => import("./components/Modals/WeatherDetailsModal.jsx"),
);
const TermsModal = lazy(
  () => import("./components/Modals/UserSearchModal.jsx"),
);
const OtherOptionsModal = lazy(
  () => import("./components/Header/OtherOptionsModal.jsx"),
);

const GlobalFilterLock = createGlobalStyle`
  ${(props) =>
    props.$locked &&
    css`
      html,
      body,
      #root,
      .App {
        filter: none !important;
        backdrop-filter: none !important;
      }
    `}
`;

const StyledSectionContainer = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#000000" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
  transition: all 0.3s ease;
  border-radius: 20px;
  margin: 10px 0;
  display: ${(props) => (props.$isHidden ? "none" : "block")};
`;

const AVAILABLE_AVATARS = [
  monody,
  turkeys,
  nicerone,
  horrordog,
  vovk,
  finances,
  parol,
  horse,
  lebid,
  dragons,
  rooster,
  soloveyko,
  dizel,
  flame,
];



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "🌤️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 55) return "🌧️";
  if (code >= 61 && code <= 65) return "☔";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95 && code <= 99) return "⚡";
  return "☁️";
};

const ThemeWrapper = styled.div`
  background-color: ${(props) =>
    props.$isDarkMode ? "#000000" : "transparent"};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "inherit")};
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const WeatherCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;
const LOADING_PHRASES = [
  "Підпішіться на мій фейсбук і ютуб, щоб знати, що буде в наступній версії! TheTurkeyStudio.",
  "Доміно, хоче вже продавати!",
  "Далі буде...",
  "Зворотній зв'язок: фейсбук, ютуб або акаунт theturkeystudio@gmail.com, на випадок помилок, розміщення реклами або якщо ви правовласник, і хочете обговорити умови розміщення треку на сайті.",
  "ШІ вже готовий відповідати✨",
  "Фан-арти безкоштовні, для роздрукування! 🎨",
  "Розблокуйте переваги з Стихія+ та Стихія Ультра!",
  "Ви знаєте, що за рандомний текст, можна отримати досягнення? Треба побачити кожний :)",
  "Скиньте мені в фейсбук, картинки до треків деяких",
  "СлівкіШоу та Дизель шоу(2015-2020), це легенди.",
  "Лише по секрету, 5bn games, одні з накращих, у створення сюжетів і загадок(Спадщина і Темрява та Полум'я найвдаліше!)",
  "Ми вас здивуємо, багато чим :)",
  "Морально підтримайте підписою, рекламою і побажаннями.",
  "Навчання, оцінювання та коментування",
  "Тут написано, про випуск, нової детективної гри.",
  "Помилка 404, це жарт :)",
  "Джомолунгма: .... ...... 6 і 8",
  "Якщо буде багато підписніків, Стихія буде доступна айфонам!",
  "Код по першій букві: уміння, Ніцерон, альпінізми, місце, увага, Транс, аварія, Ніжин, обмеження, Загадки.",
  "Любите малювати? Любите танцювати?",
  "Теорія неймовірності(Макс Кіндрук) має одну частину :(",
  "Режим відео: Динофроз. Рандомні фільтри: Clubstep",
  "Хто ваш кумир? Зібров чи Вінник?",
  "Багато змін клімату, мультиплікації, моди, життя. І мене теж. Не знаю який обрати :( чи :)",
  "Хто знає, той у нас шукає",
  "Місія неможлива, ніде не помилитись",
  "Досягнення 99: Хто я, якщо нас менше 30?. ",
  "Давайте поради щодо дизайну, Стихії",
  "Правило 20: Дивіться на все під різними кутами.",
  "A new day! A new adventure! A new update!",
  "A new day! A new adventure! A new update!",
  "Ви: Цей сайт дивний, тут погода, і відсилки, і старі хіти, зате прикольний індик в магазині.",
  "Оксану Самойлову, з 'Україна має талант' хто пам'ятає?",
  "Страху немає, упевненим робиться рух!",
  "У мене, важкі дні, а у вас?",
  "#Індики #Стихія #Погода #Ностальгія #Динофроз #Ніцерон",
  "Новини - для біологів та акторів, погода - для географів, індики - для музики любителів,",
  "Mondo TV - Thanks for legendary cartoons.",
  "Раз два, раз два, три. Погоду нам скажи!",
  "Це початок початку, чи початок кінця відсилкам.",
];

const phraseFlyOut = keyframes`
  0% { opacity: 0; transform: translate(calc(var(--x) * 0.1), calc(var(--y) * 0.1)) scale(0.5); }
  20% { opacity: 1; }
  80% { opacity: 0.8; }
  100% { opacity: 0; transform: translate(var(--x), var(--y)) scale(1.2); }
`;

const ParticleSymbol = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  color: ${(props) => (props.$isNew ? "#94fffa" : "#ffb36c")};
  font-size: 14px;
  z-index: 10001;
  animation: ${phraseFlyOut} 3s ease-out infinite;
  animation-delay: ${(props) => props.$delay}s;
  --x: ${(props) => props.$x}px;
  --y: ${(props) => props.$y}px;
`;

const UpdateTimerBadge = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: ${(props) => (props.$isDarkMode ? "rgba(30, 30, 30, 0.85)" : "rgba(255, 255, 255, 0.85)")};
  color: ${(props) => (props.$isDarkMode ? "#00eaff" : "#004cff")};
  padding: 4px 7px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 800;
  z-index: 499;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(6px);
  border: 1px solid
    ${(props) => (props.$isDarkMode ? "rgba(0, 234, 255, 0.4)" : "rgba(0, 76, 255, 0.4)")};
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    font-size: 11px;
  }
  &:hover {
    transform: scale(1.05);
    background: ${(props) => (props.$isDarkMode ? "rgba(45, 45, 45, 0.95)" : "rgba(240, 240, 240, 0.95)")};
  }
  &:active {
    transform: scale(0.95);
  }
`;

const LoadingPhraseWrapper = styled.div`
  position: relative;
  display: inline-block;
  transition: all 0.5s ease;
  ${(props) =>
    props.$isNew &&
    css`
      color: #94fffa;
      text-shadow: 0 0 12px rgba(148, 255, 250, 0.9);
      font-weight: bold;
      &::before {
        content: "Нове: ";
        font-size: 0.8em;
        color: orange;
      }
    `}
`;

const SECTION_ORDER_STORAGE_KEY = "siteSectionsOrder";

const SectionContent = memo(
  ({
    section,
    isDarkMode,
    isLocationEnabled,
    handleRefreshCard,
    handleDeleteCard,
    handleRenameCard,
    moveWeatherCard,
    setIsLocationEnabled,
    user,
    handleOpenRegister,
    onUpdateUser,
    setHeroBg,
    customHeroBgs,
    setCustomHeroBgs,
    setCustomHolidayName,
    customHolidayName,
    weatherCards,
    weatherCardLayout,
    isAnyModalOpen,
    heroDateString,
    isWeatherDetailsOpen,
    setIsWeatherDetailsOpen,
    selectedWeatherCard,
    setSelectedWeatherCard,
    setIsFsActive,
  }) => {
    if (!section) return null;

    if (section.key === "weather") {
      return (
        <div id="weather">
          <WeatherCardsContainer>
            {weatherCards.map((card, index) => {
              const isExtremeTemp =
                card.current.tempNum > 30 || card.current.tempNum < -30;
              const isExtremeWind = card.current.windNum > 10;
              const isExtremeUV = card.current.uv_index > 7;

              return (
                <WeatherCardComponent
                  key={card.id}
                  user={user}
                  card={card}
                  isDarkMode={isDarkMode}
                  isLocationEnabled={isLocationEnabled}
                  isExtremeTemp={isExtremeTemp}
                  isExtremeWind={isExtremeWind}
                  isExtremeUV={isExtremeUV}
                  index={index}
                  totalCards={weatherCards.length}
                  handleRefreshCard={handleRefreshCard}
                  handleDeleteCard={handleDeleteCard}
                  handleRenameCard={handleRenameCard}
                  moveWeatherCard={moveWeatherCard}
                  setIsLocationEnabled={setIsLocationEnabled}
                  customHolidayName={customHolidayName}
                  layout={weatherCardLayout}
                  onOpenDetails={() => {
                    setSelectedWeatherCard(card);
                    setIsWeatherDetailsOpen(true);
                  }}
                  currentTimeString={heroDateString}
                />
              );
            })}
          </WeatherCardsContainer>
        </div>
      );
    }
    //{section.key === "puzzles" && <Puzzles />}
    return (
      <div id={section.key}>
        {section.key === "map" && <ClimateMap />}
        {section.key === "aihelp" && <Aihelp isDarkMode={isDarkMode} />}
        {section.key === "news" && <News />}
        {section.key === "music" && (
          <MusicPhoto
            user={user}
            onFsToggle={setIsFsActive}
            isAnyModalOpen={isAnyModalOpen}
            onUpdateUser={onUpdateUser}
            isDarkMode={isDarkMode}
          />
        )}
        {section.key === "fanart" && (
          <FanArt
            isDarkMode={isDarkMode}
            user={user}
            setHeroBg={setHeroBg}
            customHeroBgs={customHeroBgs}
            setCustomHeroBgs={setCustomHeroBgs}
          />
        )}
        {section.key === "prison" && <Prison />}
      </div>
    );
  },
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [phraseData, setPhraseData] = useState({ text: "", isNew: false });
  const [now, setNow] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [sectionThemes, setSectionThemes] = useState({}); // { weather: false, aihelp: true, ... }
  const [user, setUser] = useState(null);

  const [heroBg, setHeroBg] = useState(null);
  const [customHeroBgs, setCustomHeroBgs] = useState([]);
  const [heroBg2, setHeroBg2] = useState(null);
  const [heroBg3, setHeroBg3] = useState(null);
  const [heroBg4, setHeroBg4] = useState(null);
  const [heroBgMode, setHeroBgMode] = useState("static"); // "static", "slideshow-2", "slideshow-4"
  const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(0.2);
  const [bgRatings, setBgRatings] = useState({});
  const [slideshowInterval, setSlideshowInterval] = useState(5);
  const [slideshowTransition, setSlideshowTransition] = useState(0.8);
  const [heroBgFilterCategory, setHeroBgFilterCategory] = useState("all");
  const [heroBgZoom, setHeroBgZoom] = useState(1);
  const [heroBgBlur, setHeroBgBlur] = useState(0);
  const [heroBgPixelation, setHeroBgPixelation] = useState(0);
  const [heroBgBlurType, setHeroBgBlurType] = useState("smooth"); // "smooth" або "pixelated"
  const [heroBgRotation, setHeroBgRotation] = useState(0);
  const [heroBgFocal1, setHeroBgFocal1] = useState({ x: 50, y: 50 });
  const [heroBgFocal2, setHeroBgFocal2] = useState({ x: 50, y: 50 });
  const [heroBgFocal3, setHeroBgFocal3] = useState({ x: 50, y: 50 });
  const [heroBgFocal4, setHeroBgFocal4] = useState({ x: 50, y: 50 });
  const [heroBgPanEnabled, setHeroBgPanEnabled] = useState(false);
  const [heroBgPanSpeed, setHeroBgPanSpeed] = useState(6);

  const [weatherCardLayout, setWeatherCardLayout] = useState([
    { key: "current", visible: true },
    { key: "details", visible: true },
    { key: "ai", visible: true },
    { key: "hourly", visible: true },
    { key: "daily", visible: true },
  ]);

  const [customHolidayName, setCustomHolidayName] = useState("");

  const [currentAvatar, setCurrentAvatar] = useState(userDefault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAchivmentsOpen, setIsAchivmentsOpen] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showUpdateTimer, setShowUpdateTimer] = useState(true); // New state for update timer visibility
  const [isOtherOptionsOpen, setIsOtherOptionsOpen] = useState(false);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(false);
  const [autoMuteBgMusic, setAutoMuteBgMusic] = useState(true);
  const [bgMusicSource, setBgMusicSource] = useState(turkeysAudio);
  const [bgMusicMode, setBgMusicMode] = useState("loop"); // 'loop' або 'order'
  const [bgMusicShuffle, setBgMusicShuffle] = useState(false);
  const [activeBgTrackId, setActiveBgTrackId] = useState(23); // ID для індиків за замовчуванням
  const [, setTrackRepeatCounter] = useState(0);
  const [bgMusicVolume, setBgMusicVolume] = useState(0.2);
  const [loadingStrategy, setLoadingStrategy] = useState("eager"); // eager, lazy, delayed
  const [bgMusicSpeed, setBgMusicSpeed] = useState(1);
  const [customBgTracks, setCustomBgTracks] = useState([]); // [{name, file}]
  const [libraryBgSettings, setLibraryBgSettings] = useState({}); // {trackId: {repeats, enabled}}
  const [lockFiltersInFs, setLockFiltersInFs] = useState(false);
  const [isFsActive, setIsFsActive] = useState(false);
  const [isWeatherDetailsOpen, setIsWeatherDetailsOpen] = useState(false);
  const [selectedWeatherCard, setSelectedWeatherCard] = useState(null);

  // Функція для розрахунку секунд до початку наступної години
  const calculateSecondsUntilNextHour = useCallback(() => {
    const now = new Date();
    const secondsRemaining = 3600 - (now.getMinutes() * 60 + now.getSeconds());
    return secondsRemaining <= 0 ? 3600 : secondsRemaining;
  }, []);

  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(
    calculateSecondsUntilNextHour(),
  );
  const weatherCardsRef = useRef([]);
  const bgAudioRef = useRef(null);
  const bgAudioRef2 = useRef(null); // Для Crossfade
  const [initialBgPosition, setInitialBgPosition] = useState(0);
  const bgPositionApplied = useRef(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isUpdatePending, setIsUpdatePending] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [isFirstTimeHelpOpen, setIsFirstTimeHelpOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [isHydrated, setIsHydrated] = useState(false);

  // Гідратація даних з localforage
  useEffect(() => {
    const hydrate = async () => {
      try {
        const savedDarkMode = await localforage.getItem("isDarkMode");
        if (savedDarkMode !== null) setIsDarkMode(savedDarkMode);

        const savedSectionThemes = await localforage.getItem("sectionThemes");
        if (savedSectionThemes) setSectionThemes(savedSectionThemes);

        const savedHidden = await localforage.getItem("hiddenSections");
        if (savedHidden) setHiddenSections(savedHidden);

        const savedUser = await localforage.getItem("active_user");
        if (savedUser) setUser(savedUser);

        const savedAvatar = await localforage.getItem("currentAvatar");
        if (savedAvatar) setCurrentAvatar(savedAvatar);

        const savedRoutingMode = await localforage.getItem("isRoutingMode");
        if (savedRoutingMode !== null) setIsRoutingMode(savedRoutingMode);

        const savedTimezone = await localforage.getItem("selected_timezone");
        if (savedTimezone) setSelectedTimezone(savedTimezone);

        const savedBgMusic = await localforage.getItem("bg_music_enabled");
        if (savedBgMusic !== null) setBgMusicEnabled(savedBgMusic);
        const savedAutoMute = await localforage.getItem("auto_mute_bg_music");
        if (savedAutoMute !== null) setAutoMuteBgMusic(savedAutoMute);
        const savedLockFilters =
          await localforage.getItem("lock_filters_in_fs");
        if (savedLockFilters !== null) setLockFiltersInFs(savedLockFilters);
        const savedBgSource = await localforage.getItem("bg_music_source");
        if (savedBgSource) setBgMusicSource(savedBgSource);
        const savedCustomBg = await localforage.getItem("custom_bg_tracks");
        if (savedCustomBg) setCustomBgTracks(savedCustomBg);
        const savedBgVolume = await localforage.getItem("bg_music_volume");
        if (savedBgVolume !== null) setBgMusicVolume(savedBgVolume);
        const savedBgSpeed = await localforage.getItem("bg_music_speed");
        if (savedBgSpeed !== null) setBgMusicSpeed(savedBgSpeed);
        const savedPos = await localforage.getItem("bg_music_position");
        if (savedPos !== null) setInitialBgPosition(savedPos);
        const savedBgMode = await localforage.getItem("bg_music_mode");
        if (savedBgMode) setBgMusicMode(savedBgMode);
        const savedShuffle = await localforage.getItem("bg_music_shuffle");
        if (savedShuffle !== null) setBgMusicShuffle(savedShuffle);
        const savedActiveId = await localforage.getItem("active_bg_track_id");
        if (savedActiveId) setActiveBgTrackId(savedActiveId);
        const savedLibSettings = await localforage.getItem(
          "library_bg_settings",
        );
        if (savedLibSettings) setLibraryBgSettings(savedLibSettings);

        const savedCards = await localforage.getItem("weather_cards");
        if (savedCards) setWeatherCards(savedCards);

        const savedHideUntil = await localforage.getItem(
          "hideDeleteModalUntil",
        );
        if (savedHideUntil) setHideDeleteModalUntil(parseInt(savedHideUntil));

        const savedOrder = await localforage.getItem(SECTION_ORDER_STORAGE_KEY);
        if (savedOrder) setSiteSections(savedOrder);

        const savedHeroBg = await localforage.getItem("hero_background");
        if (savedHeroBg) setHeroBg(savedHeroBg);
        const savedHeroBg2 = await localforage.getItem("hero_background_2");
        if (savedHeroBg2) setHeroBg2(savedHeroBg2);
        const savedHeroBg3 = await localforage.getItem("hero_background_3");
        if (savedHeroBg3) setHeroBg3(savedHeroBg3);
        const savedHeroBg4 = await localforage.getItem("hero_background_4");
        if (savedHeroBg4) setHeroBg4(savedHeroBg4);
        const savedCustomBgs = await localforage.getItem(
          "custom_hero_backgrounds",
        );
        if (savedCustomBgs) setCustomHeroBgs(savedCustomBgs);
        const savedMode = await localforage.getItem("hero_bg_mode");
        if (savedMode) setHeroBgMode(savedMode);
        const savedInterval = await localforage.getItem(
          "hero_slideshow_interval",
        );
        if (savedInterval !== null) setSlideshowInterval(savedInterval);
        const savedTransition = await localforage.getItem(
          "hero_slideshow_transition",
        );
        if (savedTransition !== null) setSlideshowTransition(savedTransition);
        const savedHeroFilter = await localforage.getItem(
          "hero_bg_filter_category",
        );
        if (savedHeroFilter) setHeroBgFilterCategory(savedHeroFilter);
        const savedZoom = await localforage.getItem("hero_bg_zoom");
        if (savedZoom !== null) setHeroBgZoom(savedZoom);
        const savedRotation = await localforage.getItem("hero_bg_rotation");
        if (savedRotation !== null) setHeroBgRotation(savedRotation);
        const savedBlur = await localforage.getItem("hero_bg_blur");
        if (savedBlur !== null) setHeroBgBlur(savedBlur);
        const savedBlurType = await localforage.getItem("hero_bg_blur_type");
        if (savedBlurType) setHeroBgBlurType(savedBlurType);
        const savedPixelation = await localforage.getItem("hero_bg_pixelation");
        if (savedPixelation !== null) setHeroBgPixelation(savedPixelation);

        const savedFocal1 = await localforage.getItem("hero_bg_focal1");
        if (savedFocal1) setHeroBgFocal1(savedFocal1);
        const savedFocal2 = await localforage.getItem("hero_bg_focal2");
        if (savedFocal2) setHeroBgFocal2(savedFocal2);
        const savedFocal3 = await localforage.getItem("hero_bg_focal3");
        if (savedFocal3) setHeroBgFocal3(savedFocal3);
        const savedFocal4 = await localforage.getItem("hero_bg_focal4");
        if (savedFocal4) setHeroBgFocal4(savedFocal4);

        const savedPanEnabled = await localforage.getItem(
          "hero_bg_pan_enabled",
        );
        if (savedPanEnabled !== null) setHeroBgPanEnabled(savedPanEnabled);
        const savedPanSpeed = await localforage.getItem("hero_bg_pan_speed");
        if (savedPanSpeed !== null) setHeroBgPanSpeed(savedPanSpeed);

        const savedCustomHolidayName = await localforage.getItem(
          "custom_holiday_name",
        );
        if (savedCustomHolidayName)
          setCustomHolidayName(savedCustomHolidayName);

        const savedScreenshots = await localforage.getItem(
          "dinofroz_screenshots",
        );
        if (savedScreenshots) setScreenshots(savedScreenshots);

        const lastSeenVersion = await localforage.getItem(
          "last_deployed_version",
        );
        const savedLayout = await localforage.getItem("weather_card_layout");
        if (savedLayout) setWeatherCardLayout(savedLayout);

        const savedShowUpdateTimer =
          await localforage.getItem("show_update_timer");
        if (savedShowUpdateTimer !== null)
          setShowUpdateTimer(savedShowUpdateTimer);

        const savedStrategy = await localforage.getItem(
          "modal_loading_strategy",
        );
        if (savedStrategy) setLoadingStrategy(savedStrategy);

        const deployId = process.env.REACT_APP_DEPLOY_ID;
        if (deployId && lastSeenVersion !== deployId) {
          setIsUpdatePending(true);
        }

        setIsHydrated(true);
      } catch (err) {
        console.error("Помилка завантаження з localforage:", err);
        setIsHydrated(true);
      }
    };
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localforage.setItem("bg_music_enabled", bgMusicEnabled);
      localforage.setItem("auto_mute_bg_music", autoMuteBgMusic);
      localforage.setItem("lock_filters_in_fs", lockFiltersInFs);
      if (bgMusicSource instanceof Blob || typeof bgMusicSource === "string") {
        localforage.setItem("bg_music_source", bgMusicSource);
      }
      localforage.setItem("custom_bg_tracks", customBgTracks);
      localforage.setItem("bg_music_volume", bgMusicVolume);
      localforage.setItem("bg_music_speed", bgMusicSpeed);
      localforage.setItem("bg_music_mode", bgMusicMode);
      localforage.setItem("bg_music_shuffle", bgMusicShuffle);
      localforage.setItem("active_bg_track_id", activeBgTrackId); // This should be activeBgTrackId, not bgMusicSource
      localforage.setItem("library_bg_settings", libraryBgSettings);
    }
  }, [
    bgMusicEnabled,
    autoMuteBgMusic,
    lockFiltersInFs,
    bgMusicSource,
    customBgTracks,
    libraryBgSettings,
    bgMusicVolume,
    bgMusicSpeed,
    bgMusicMode,
    bgMusicShuffle,
    activeBgTrackId,
    isHydrated,
  ]);

  // Логіка вибору фрази та перевірки на новизну
  useEffect(() => {
    const initPhrase = async () => {
      const seen = (await localforage.getItem("seen_loading_phrases")) || [];
      const randomIndex = Math.floor(Math.random() * LOADING_PHRASES.length);
      const selectedText = LOADING_PHRASES[randomIndex];
      const isNew = !seen.includes(selectedText);

      if (isNew) {
        const updatedSeen = [...seen, selectedText];
        // Зберігаємо історію останніх 100 фраз
        await localforage.setItem(
          "seen_loading_phrases",
          updatedSeen.slice(-100),
        );
      }

      setPhraseData({ text: selectedText, isNew });
    };
    initPhrase();
  }, []);

  const preloadComponents = useCallback(() => {
    // Ручний виклик динамічного імпорту для кешування
    import("./components/Prison/Prison.jsx");
    import("./components/Aihelp/Aihelp.jsx");
    import("./components/FanArt/FanArt.jsx");
    import("./components/Modals/ShopModal.jsx");
    import("./components/News/News.jsx");
    import("./components/Modals/AchivmentsModal.jsx");
    // import("./components/Puzzles/Puzzles.jsx");
    import("./components/ClimateMap/ClimateMap.jsx");
    import("./components/MusicPhoto/MusicPhoto.jsx");
    import("./components/Modals/Modal.jsx");
    import("./components/Modals/LoginModal.jsx");
    import("./components/Modals/UserSettingsModal.jsx");
    import("./components/Modals/VipModal.jsx");
    import("./components/Modals/WeatherDetailsModal.jsx");
    import("./components/Modals/UserSearchModal.jsx");
    import("./components/Header/OtherOptionsModal.jsx");
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (loadingStrategy === "eager") {
      preloadComponents();
    } else if (loadingStrategy === "delayed") {
      const timer = setTimeout(preloadComponents, 8000);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, loadingStrategy, preloadComponents]);

  const phraseParticles = useMemo(() => {
    const count = phraseData.isNew ? 12 : 6;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 140,
      delay: Math.random() * 2,
    }));
  }, [phraseData]);

  // Таймер на 8 секунд після старту
  useEffect(() => {
    const timer = setTimeout(() => setTimerFinished(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Відстеження взаємодії (клік або скрол)
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);
  const [isRoutingMode, setIsRoutingMode] = useState(false);

  useEffect(() => {
    if (
      isUpdatePending &&
      timerFinished &&
      hasInteracted &&
      !isFirstTimeHelpOpen
    ) {
      setIsInfoOpen(true);
      setIsUpdatePending(false);
      setIsFirstTimeHelpOpen(true);
      localforage.setItem(
        "last_deployed_version",
        process.env.REACT_APP_DEPLOY_ID,
      );
    }
  }, [isUpdatePending, timerFinished, hasInteracted, isFirstTimeHelpOpen]);

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [weatherCards, setWeatherCards] = useState([]);
  const [screenshots, setScreenshots] = useState([]);

  const isAnyModalOpen =
    isModalOpen ||
    isLoginOpen ||
    isSettingsModalOpen ||
    isVipModalOpen ||
    isShopOpen ||
    isAchivmentsOpen ||
    isUserSearchOpen ||
    isInfoOpen ||
    isFirstTimeHelpOpen;

  const [hideDeleteModalUntil, setHideDeleteModalUntil] = useState(0);

  // Фонове завантаження ресурсів кат-сцени
  useEffect(() => {
    const preloadKatScene = async () => {
      const assets = [
        dinofrozVideo,
        startImage,
        fogBackground,
        turkeys, // Вже імпортовано вище
        turkeysAudio,
        ultraImage,
      ];

      try {
        // Fetch запити додадуть ресурси у кеш браузера
        await Promise.all(assets.map((url) => fetch(url)));
        console.log("KatScene assets preloaded in background");
      } catch (err) {
        console.warn("Failed to preload KatScene assets:", err);
      }
    };

    // Запускаємо через 4 секунди після старту, щоб не навантажувати ініціалізацію
    const timer = setTimeout(preloadKatScene, 4000);
    return () => clearTimeout(timer);
  }, []);

  const [siteSections, setSiteSections] = useState([...DEFAULT_SITE_SECTIONS]);

  useEffect(() => {
    if (isHydrated) {
      localforage.setItem("weather_cards", weatherCards);
    }
  }, [weatherCards, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localforage.setItem("isRoutingMode", isRoutingMode);
      localforage.setItem(SECTION_ORDER_STORAGE_KEY, siteSections);
    }
  }, [siteSections, isRoutingMode, isHydrated]);

  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  
  useEffect(() => {
    let url = bgMusicSource;
    if (bgMusicSource instanceof Blob) {
      url = URL.createObjectURL(bgMusicSource);
    }
    setCurrentAudioUrl(url);
    return () => {
      if (bgMusicSource instanceof Blob && url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [bgMusicSource]);

  const prevSourceRef = useRef(null);

  // Реалізація Crossfade
  useEffect(() => {
    const a1 = bgAudioRef.current;
    const a2 = bgAudioRef2.current;
    if (!a1 || !a2) return;

    if (prevSourceRef.current !== currentAudioUrl) {
      setTrackRepeatCounter(0);
      prevSourceRef.current = currentAudioUrl;
    }

    const shouldPlay = bgMusicEnabled && (!isFsActive || !autoMuteBgMusic);
    const targetVolume = shouldPlay ? bgMusicVolume : 0;
    const fadeStep = 0.02;

    let activeAudio = a1;
    let inactiveAudio = a2;

    if (a1.src && currentAudioUrl && a1.src.includes(currentAudioUrl)) {
      activeAudio = a1;
      inactiveAudio = a2;
    } else if (a2.src && currentAudioUrl && a2.src.includes(currentAudioUrl)) {
      activeAudio = a2;
      inactiveAudio = a1;
    } else {
      activeAudio = a1.paused || a1.volume === 0 ? a1 : a2;
      inactiveAudio = activeAudio === a1 ? a2 : a1;
    }

    if (shouldPlay) {
      if (
        activeAudio.paused ||
        activeAudio.src === "" ||
        !activeAudio.src.includes(currentAudioUrl)
      ) {
        activeAudio.src = currentAudioUrl;
        
        if (!bgPositionApplied.current && initialBgPosition > 0) {
          activeAudio.currentTime = initialBgPosition;
          bgPositionApplied.current = true;
        } else {
          activeAudio.currentTime = 0;
        }
        
        activeAudio.volume = 0;
        activeAudio.playbackRate = bgMusicSpeed;
        activeAudio.play().catch(() => {});
      } else if (activeAudio.paused) {
        activeAudio.play().catch(() => {});
      }
    } else if (!shouldPlay) {
      if (!a1.paused) a1.pause();
      if (!a2.paused) a2.pause();
    }

    const crossfadeInterval = setInterval(() => {
      if (activeAudio.volume < targetVolume) {
        activeAudio.volume = Math.min(
          targetVolume,
          activeAudio.volume + fadeStep,
        );
      } else {
        activeAudio.volume = targetVolume;
      }

      if (inactiveAudio.volume > 0) {
        inactiveAudio.volume = Math.max(0, inactiveAudio.volume - fadeStep);
      } else {
        inactiveAudio.pause();
      }

      if (activeAudio.volume === targetVolume && inactiveAudio.volume === 0) {
        clearInterval(crossfadeInterval);
      }
    }, 50);

    return () => clearInterval(crossfadeInterval);
  }, [
    bgMusicEnabled,
    isFsActive,
    autoMuteBgMusic,
    currentAudioUrl,
    bgMusicVolume,
    bgMusicSpeed,
    initialBgPosition,
  ]);

  // Збереження позиції фонової музики
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const a1 = bgAudioRef.current;
      const a2 = bgAudioRef2.current;
      if (!a1 || !a2) return;

      const active = a1 && !a1.paused ? a1 : a2 && !a2.paused ? a2 : null;
      if (active && active.currentTime > 0) {
        localforage.setItem("bg_music_position", active.currentTime);
      }
    }, 5000); // зберігаємо кожні 5 секунд

    return () => clearInterval(saveInterval);
  }, []);

  const handleResetBgPosition = useCallback(async () => {
    setInitialBgPosition(0);
    await localforage.setItem("bg_music_position", 0);
    // Також миттєво перемотуємо активні плеєри
    if (bgAudioRef.current) bgAudioRef.current.currentTime = 0;
    if (bgAudioRef2.current) bgAudioRef2.current.currentTime = 0;
    // Дозволяємо логіці відновлення спрацювати знову, якщо це потрібно
    bgPositionApplied.current = false;
  }, []);



  const handleBgMusicEnded = useCallback(() => {
    const a1 = bgAudioRef.current;
    const a2 = bgAudioRef2.current;
    if (!a1 || !a2) return;

    // Визначаємо активний плеєр - той, що насправді грав
    let activeAudio = a1;
    if (a2.src && currentAudioUrl && a2.src.includes(currentAudioUrl)) {
      activeAudio = a2;
    }

    if (bgMusicMode === "loop") {
      // В режимі автоповтору просто перемотуємо музику і продовжуємо відтворення
      activeAudio.currentTime = 0;
      activeAudio.play().catch(() => {});
      return;
    }

    // Знаходимо кількість повторів: спочатку в кастомних, потім у бібліотеці сайту
    const currentTrack = (customBgTracks || []).find(
      (t) => t && t.file === bgMusicSource,
    );
    let maxRepeats = 1;
    if (currentTrack) {
      maxRepeats = currentTrack.repeats || 1;
    } else if (activeBgTrackId) {
      maxRepeats = libraryBgSettings[activeBgTrackId]?.repeats || 1;
    }

    setTrackRepeatCounter((prev) => {
      const nextCount = prev + 1;
      if (nextCount < maxRepeats) {
        activeAudio.currentTime = 0;
        activeAudio.play().catch(() => {});
        return nextCount;
      } else {
        // Шукаємо наступний доступний трек (enabled: true) в режимі "order"
        if (bgMusicMode === "order") {
          const libPool = songAiKnowledge
            .map((s) => ({
              id: s.id,
              file: assetMap[s.audio] || turkeysAudio,
              enabled: libraryBgSettings[s.id]?.enabled !== false,
            }))
            .filter((t) => t.enabled);

          const customPool = (customBgTracks || []).filter(
            (t) => t && t.enabled !== false,
          );

          const fullPool = [
            ...libPool.map((t) => ({
              id: t.id,
              file: t.file,
              isCustom: false,
            })),
            ...customPool.map((t) => ({
              id: t.id,
              file: t.file,
              isCustom: true,
            })),
          ];

          if (fullPool.length > 0) {
            const currentIndex = fullPool.findIndex(
              (t) => t.file === bgMusicSource,
            );

            if (bgMusicShuffle) {
              const otherTracks = fullPool.filter(
                (t) => t.file !== bgMusicSource,
              );
              const next =
                otherTracks.length > 0
                  ? otherTracks[Math.floor(Math.random() * otherTracks.length)]
                  : fullPool[0];
              setBgMusicSource(next.file);
              setActiveBgTrackId(next.isCustom ? null : next.id);
            } else {
              const nextIdx = (currentIndex + 1) % fullPool.length;
              const next = fullPool[nextIdx];
              setBgMusicSource(next.file);
              setActiveBgTrackId(next.isCustom ? null : next.id);
            }
          }
        }
        return 0;
      }
    });
  }, [
    bgMusicMode,
    bgMusicSource,
    customBgTracks,
    bgMusicShuffle,
    activeBgTrackId,
    libraryBgSettings,
    currentAudioUrl,
  ]);

  // При зміні режиму перезапускаємо трек, щоб новий режим застосувався відразу
  useEffect(() => {
    if (bgMusicEnabled) {
      if (bgAudioRef.current && !bgAudioRef.current.paused) {
        bgAudioRef.current.currentTime = 0;
      } else if (bgAudioRef2.current && !bgAudioRef2.current.paused) {
        bgAudioRef2.current.currentTime = 0;
      }
    }
  }, [bgMusicMode, bgMusicEnabled]);

  useEffect(() => {
    if (isHydrated) {
      localforage.setItem("isDarkMode", isDarkMode);
      localforage.setItem("sectionThemes", sectionThemes);
      localforage.setItem("hiddenSections", hiddenSections);
      localforage.setItem("hero_background", heroBg);
      localforage.setItem("custom_hero_backgrounds", customHeroBgs);
      localforage.setItem("hero_background_2", heroBg2);
      localforage.setItem("hero_background_3", heroBg3);
      localforage.setItem("hero_background_4", heroBg4);
      localforage.setItem("hero_bg_ratings", bgRatings);
      localforage.setItem("hero_bg_mode", heroBgMode);
      localforage.setItem("hero_overlay_opacity", heroOverlayOpacity);
      localforage.setItem("hero_slideshow_interval", slideshowInterval);
      localforage.setItem("hero_slideshow_transition", slideshowTransition);
      localforage.setItem("hero_bg_filter_category", heroBgFilterCategory);
      localforage.setItem("hero_bg_zoom", heroBgZoom);
      localforage.setItem("hero_bg_rotation", heroBgRotation);
      localforage.setItem("hero_bg_blur", heroBgBlur);
      localforage.setItem("hero_bg_blur_type", heroBgBlurType);
      localforage.setItem("hero_bg_pixelation", heroBgPixelation);
      localforage.setItem("hero_bg_focal1", heroBgFocal1);
      localforage.setItem("hero_bg_focal2", heroBgFocal2);
      localforage.setItem("hero_bg_focal3", heroBgFocal3);
      localforage.setItem("hero_bg_focal4", heroBgFocal4);
      localforage.setItem("hero_bg_pan_enabled", heroBgPanEnabled);
      localforage.setItem("hero_bg_pan_speed", heroBgPanSpeed);
      localforage.setItem("custom_holiday_name", customHolidayName);
      localforage.setItem("selected_timezone", selectedTimezone);
      localforage.setItem("weather_card_layout", weatherCardLayout);
      localforage.setItem("show_update_timer", showUpdateTimer);
      localforage.setItem("modal_loading_strategy", loadingStrategy);
    }
  }, [
    heroBg,
    heroBg2,
    heroBg3,
    heroBg4,
    customHeroBgs,
    bgRatings,
    heroBgMode,
    heroOverlayOpacity,
    slideshowInterval,
    slideshowTransition,
    heroBgFilterCategory,
    heroBgZoom,
    heroBgRotation,
    heroBgBlur,
    heroBgBlurType,
    heroBgPixelation,
    heroBgFocal1,
    heroBgFocal2,
    heroBgFocal3,
    heroBgFocal4,
    heroBgPanEnabled,
    heroBgPanSpeed,
    isHydrated,
    isDarkMode,
    sectionThemes,
    hiddenSections,
    customHolidayName,
    selectedTimezone,
    weatherCardLayout,
    showUpdateTimer, // Save new setting
    loadingStrategy,
  ]);

  useEffect(() => {
    if (isHydrated) {
      if (user) {
        localforage.setItem("active_user", user);
        if (user.avatar) {
          setCurrentAvatar(user.avatar);
          localforage.setItem("currentAvatar", user.avatar);
        }
      } else {
        localforage.removeItem("active_user");
      }
    }
  }, [user, isHydrated]);

  // Запит дозволу на системні сповіщення
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    weatherCardsRef.current = weatherCards;
  }, [weatherCards]);

  const fetchWeather = useCallback(
    async (cityData, isMain, lat = null, lon = null) => {
      try {
        let targetLat = lat;
        let targetLon = lon;
        let displayName =
          typeof cityData === "string"
            ? cityData
            : cityData?.fullName || "Ваша локація";

        if (cityData && typeof cityData === "object" && cityData.lat) {
          targetLat = cityData.lat;
          targetLon = cityData.lon;
          displayName = cityData.fullName;
        } else if (typeof cityData === "string") {
          const geo = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityData}&count=1&language=uk`,
          );
          if (geo.data.results && geo.data.results[0]) {
            targetLat = geo.data.results[0].latitude;
            targetLon = geo.data.results[0].longitude;
            displayName = geo.data.results[0].name;
            cityData = { id: Date.now() }; // Створюємо об'єкт для нової картки
          } else {
            alert("Місто не знайдено в базі Open-Meteo");
            return;
          }
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,cloud_cover,visibility,dew_point_2m,temperature_80m&hourly=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,dew_point_2m,precipitation,rain,pressure_msl,cloud_cover,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,precipitation_probability_max,rain_sum,precipitation_sum&timezone=auto&past_days=1&forecast_days=16`;
        console.log("Fetching weather from URL:", url);
        const res = await axios.get(url);
        const d = res.data;

        // СИРИЙ лог для перевірки що повертає API
        console.log("💾 RAW API RESPONSE for", displayName, d);

        // Детальне логування для діагностики
        console.log("API Response raw data:", {
          hasResponse: !!d,
          currentData: d.current,
          hourlyData: d.hourly
            ? {
                time: d.hourly.time?.slice(0, 2),
                wind: d.hourly.wind_speed_10m?.slice(0, 2),
              }
            : null,
          dailyData: d.daily
            ? {
                time: d.daily.time?.slice(0, 2),
                uv_index_max: d.daily.uv_index_max?.slice(0, 2),
                wind_speed_10m_max: d.daily.wind_speed_10m_max?.slice(0, 2),
              }
            : null,
        });

        // Попередження за відсутність даних
        if (!d.current || d.current.wind_speed_10m === undefined) {
          console.error("❌ Wind speed data missing from current!", {
            hasCurrentData: !!d.current,
            currentKeys: d.current ? Object.keys(d.current) : [],
            windSpeed: d.current?.wind_speed_10m,
          });
        }
        if (!d.daily?.uv_index_max || d.daily.uv_index_max.length === 0) {
          console.error("❌ UV index data missing from daily!", {
            hasDailyData: !!d.daily,
            dailyKeys: d.daily ? Object.keys(d.daily) : [],
            uvIndex: d.daily?.uv_index_max,
            uvLength: d.daily?.uv_index_max?.length,
          });
        }
        if (!d.hourly?.wind_speed_10m) {
          console.error("❌ Hourly wind data missing!", {
            hasHourlyData: !!d.hourly,
            hourlyKeys: d.hourly ? Object.keys(d.hourly) : [],
            wind: d.hourly?.wind_speed_10m,
          });
        }

        // Логіка сповіщень про небезпечну погоду
        if ("Notification" in window && Notification.permission === "granted") {
          const temp = Math.round(d.current.temperature_2m);
          const wind = d.current.wind_speed_10m ?? 0;
          const uv = d.daily?.uv_index_max?.[0] ?? 0;
          const extremeConditions = [];

          if (temp > 30) extremeConditions.push(`Спека ${temp}°C`);
          if (temp < -30) extremeConditions.push(`Мороз ${temp}°C`);
          if (wind > 10) extremeConditions.push(`Сильний вітер ${wind} м/с`);
          if (uv > 7) extremeConditions.push(`Високий УФ-індекс ${uv}`);

          if (extremeConditions.length > 0) {
            new Notification(`⚠️ Погода: ${displayName}`, {
              body: `Виявлено небезпечні умови: ${extremeConditions.join(", ")}. Будьте обережні!`,
              icon: "/favicon.ico",
            });
          }
        }

        // Обчислюємо hStartIndex, щоб годинний графік починався з поточної години
        const nowLocal = new Date();
        const localHourStr = `${nowLocal.getFullYear()}-${String(nowLocal.getMonth() + 1).padStart(2, "0")}-${String(nowLocal.getDate()).padStart(2, "0")}T${String(nowLocal.getHours()).padStart(2, "0")}:00`;
        let hStartIndex = (d.hourly?.time || []).findIndex((t) =>
          t.startsWith(localHourStr),
        );
        if (hStartIndex === -1) hStartIndex = 0;

        setWeatherCards((prev) => {
          const id = isMain ? "main-card" : cityData?.id || Date.now();
          const existingCard = prev.find((c) => c.id === id);

          // Логування перед створенням карти
          console.log(`Creating weather card for ${displayName}`, {
            windSpeedCurrent: d.current?.wind_speed_10m,
            windSpeedHourly: d.hourly?.wind_speed_10m?.slice(0, 3),
            uvIndexDaily: d.daily?.uv_index_max?.slice(0, 3),
          });

          const newCardData = {
            id: id,
            isMain: isMain,
            locationName:
              isMain && !cityData?.fullName
                ? "Ваша локація"
                : existingCard
                  ? existingCard.locationName
                  : displayName,
            lat: targetLat,
            lon: targetLon,
            current: {
              temp: `${Math.round(d.current.temperature_2m)}°C`,
              tempNum: Math.round(d.current.temperature_2m),
              feels_like: `${Math.round(d.current.apparent_temperature)}°C`,
              humidity: `${d.current.relative_humidity_2m}%`,
              pressure: `${Math.round(d.current.surface_pressure)} hPa`,
              wind_speed: `${d.current.wind_speed_10m ?? 0} м/с`,
              windNum: d.current.wind_speed_10m ?? 0,
              wind_direction_10m: d.current.wind_direction_10m ?? 0,
              wind_gusts_10m: d.current.wind_gusts_10m ?? 0,
              uv_index: d.daily?.uv_index_max?.[0] ?? 0,
              cloud_cover: d.current.cloud_cover ?? 0,
              visibility: d.current.visibility ?? 0,
              dew_point_2m: d.current.dew_point_2m ?? 0,
              temperature_80m: d.current.temperature_80m ?? 0,
              description: "За кодом: " + d.current.weather_code,
              iconPlaceholder: getWeatherIcon(d.current.weather_code),
            },
            hourly: (d.hourly?.time || [])
              .slice(hStartIndex, hStartIndex + 24)
              .map((t, i) => {
                const dataIdx = hStartIndex + i;
                return {
                  time: new Date(t).getHours() + ":00",
                  temp: `${Math.round(d.hourly?.temperature_2m?.[dataIdx] ?? 0)}°C`,
                  tempNum: Math.round(d.hourly?.temperature_2m?.[dataIdx] ?? 0),
                  feels_like: `${Math.round(d.hourly?.apparent_temperature?.[dataIdx] ?? 0)}°C`,
                  windNum: d.hourly?.wind_speed_10m?.[dataIdx] ?? 0,
                  wind_direction_10m:
                    d.hourly?.wind_direction_10m?.[dataIdx] ?? 0,
                  relative_humidity_2m:
                    d.hourly?.relative_humidity_2m?.[dataIdx] ?? null,
                  dew_point_2m: d.hourly?.dew_point_2m?.[dataIdx] ?? 0,
                  precipitation: d.hourly?.precipitation?.[dataIdx] ?? null,
                  rain: d.hourly?.rain?.[dataIdx] ?? null,
                  pressure_msl: d.hourly?.pressure_msl?.[dataIdx] ?? null,
                  cloud_cover: d.hourly?.cloud_cover?.[dataIdx] ?? null,
                  visibility: d.hourly?.visibility?.[dataIdx] ?? 0,
                  iconPlaceholder: getWeatherIcon(
                    d.hourly?.weather_code?.[dataIdx] ?? 0,
                  ),
                };
              }),
            daily16: (d.daily?.time || []).map((t, i) => ({
              date: new Date(t).toLocaleDateString("uk", {
                day: "numeric",
                month: "2-digit",
              }),
              fullDate: t,
              day: new Date(t).toLocaleDateString("uk", { weekday: "short" }),
              temp_day: `${Math.round(d.daily.temperature_2m_max[i] ?? 0)}°C`,
              temp_night: `${Math.round(d.daily.temperature_2m_min[i] ?? 0)}°C`,
              uv_index: d.daily.uv_index_max?.[i] ?? 0,
              wind_speed: `${d.daily.wind_speed_10m_max?.[i] ?? 0} м/с`,
              precipitation_probability_max:
                d.daily.precipitation_probability_max?.[i] ?? 0,
              rain_sum: d.daily.rain_sum?.[i] ?? 0,
              precipitation_sum: d.daily.precipitation_sum?.[i] ?? 0,
              iconPlaceholder: getWeatherIcon(d.daily.weather_code[i] ?? 0),
            })),
          };

          console.log(`Card data created for ${displayName}:`, {
            windSpeedStored: newCardData.current.windNum,
            uvIndexStored: newCardData.current.uv_index,
            hourlyWindSample: newCardData.hourly
              ?.slice(0, 2)
              .map((h) => h.windNum),
            dailyWindSample: newCardData.daily16
              ?.slice(0, 2)
              .map((d) => d.wind_speed),
          });

          if (isMain) {
            const hasMain = prev.some((c) => c.isMain);
            if (hasMain) return prev.map((c) => (c.isMain ? newCardData : c));
            return [newCardData, ...prev];
          } else {
            return existingCard
              ? prev.map((c) => (c.id === id ? newCardData : c))
              : prev.length >= 4
                ? prev
                : [...prev, newCardData];
          }
        });
      } catch (error) {
        console.error("Помилка завантаження погоди", error);
      }
    },
    [],
  );

  const checkWeatherDanger = useCallback(async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&timezone=auto&forecast_days=3`,
      );
      const { current, daily } = res.data || {};
      if (!current || !daily) {
        console.warn("Weather danger check: Missing data", {
          hasCurrent: !!current,
          hasDaily: !!daily,
        });
        return null;
      }

      const windSpeed = current.wind_speed_10m ?? 0;
      const currentTemp = current.temperature_2m ?? 0;
      const uvIndex = daily?.uv_index_max?.[0] ?? 0;

      // Логування для діагностики
      console.log("Weather danger check data:", {
        windSpeed,
        currentTemp,
        uvIndex,
        hasUvData: !!daily.uv_index_max,
      });

      const isExtreme = (tMax, tMin, wind, uv) =>
        tMax > 30 || tMin < -30 || wind > 10 || uv > 7;

      // Пріоритет червоному: небезпечно прямо зараз
      const tMax = daily?.temperature_2m_max?.[0] ?? currentTemp;
      const tMin = daily?.temperature_2m_min?.[0] ?? currentTemp;

      if (isExtreme(tMax, tMin, windSpeed, uvIndex)) {
        return "red";
      }

      // Оранжевий: небезпека протягом найближчих 3-х днів
      const futureDanger = daily?.time?.some((_, i) =>
        isExtreme(
          daily.temperature_2m_max?.[i],
          daily.temperature_2m_min?.[i],
          daily.wind_speed_10m_max?.[i] || 0,
          daily.uv_index_max?.[i] || 0,
        ),
      );

      return futureDanger ? "orange" : null;
    } catch (error) {
      console.error("Weather danger check error:", error);
      return null;
    }
  }, []);

  const getInitialLocation = useCallback(() => {
    if (!isLocationEnabled) {
      fetchWeather({ fullName: "Київ", id: "main-card" }, true, 50.45, 30.52);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(
            { id: "main-card" },
            true,
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        () =>
          fetchWeather(
            { fullName: "Київ", id: "main-card" },
            true,
            50.45,
            30.52,
          ),
      );
    } else {
      fetchWeather({ fullName: "Київ", id: "main-card" }, true, 50.45, 30.52);
    }
  }, [fetchWeather, isLocationEnabled]);

  const handleRefreshCard = useCallback(
    (card) => {
      card.isMain ? getInitialLocation() : fetchWeather(card, false);
    },
    [getInitialLocation, fetchWeather],
  );

  // Функція для миттєвого оновлення всіх карток та скидання таймера
  const handleManualBulkRefresh = useCallback(() => {
    console.log("Manual bulk refresh triggered...");
    if (weatherCardsRef.current.length > 0) {
      weatherCardsRef.current.forEach((card) => handleRefreshCard(card));
    }
    setSecondsUntilUpdate(calculateSecondsUntilNextHour());
  }, [handleRefreshCard, calculateSecondsUntilNextHour]);

  // 1. Початкове завантаження локації
  useEffect(() => {
    getInitialLocation();
  }, [getInitialLocation]);

  // 2. Перевірка актуальності даних при завантаженні (якщо сьогодні 30-те, а дані за 25-те)
  useEffect(() => {
    if (!isHydrated) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    weatherCards.forEach((card) => {
      const firstDayDate = card.daily16?.[0]?.fullDate;
      if (firstDayDate !== yesterdayStr) {
        handleRefreshCard(card);
      }
    });
  }, [isHydrated, weatherCards, handleRefreshCard]);

  // 3. Автоматичне оновлення кожну годину (тільки якщо вкладка активна)
  useEffect(() => {
    if (!isHydrated) return;

    const timerId = setInterval(() => {
      if (document.visibilityState === "visible") {
        const remaining = calculateSecondsUntilNextHour();
        setSecondsUntilUpdate((prev) => {
          // Якщо ми перетнули межу години (було мало секунд, а стало знову близько 3600)
          if (prev <= 5 && remaining > 3590) {
            console.log("Auto-updating weather cards at start of hour...");
            weatherCardsRef.current.forEach((card) => handleRefreshCard(card));
          }
          return remaining;
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isHydrated, handleRefreshCard, calculateSecondsUntilNextHour]);

  const handleDeleteCard = useCallback(
    (id) => {
      const nowTimestamp = Date.now();
      if (hideDeleteModalUntil > nowTimestamp) {
        setWeatherCards((prev) => prev.filter((card) => card.id !== id));
        return;
      }

      const ask = window.confirm(
        "Ви дійсно хочете видалити картку погоди?\n\nВи можете приховати це підтвердження на певний час.",
      );

      if (ask) {
        let input = window.prompt(
          "Скільки годин не показувати це підтвердження? (1-72)",
          "1",
        );
        if (input !== null) {
          const num = Math.max(1, Math.min(72, parseInt(input)));
          const hours = isNaN(num) ? 1 : num;
          const until = nowTimestamp + hours * 3600 * 1000;
          localforage.setItem("hideDeleteModalUntil", until.toString());
          setHideDeleteModalUntil(until);
        }
        setWeatherCards((prev) => prev.filter((card) => card.id !== id));
      }
    },
    [hideDeleteModalUntil],
  );

  const handleAddCityFromHero = useCallback(
    (cityObj) => {
      if (!user) {
        alert(
          "Створювати картки погоди можуть лише зареєстровані користувачі!",
        );
        return;
      }
      fetchWeather(cityObj, false);
    },
    [user, fetchWeather],
  );

  const handleRenameCard = useCallback((id, newName) => {
    setWeatherCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, locationName: newName } : card,
      ),
    );
  }, []);

  const moveWeatherCard = useCallback((id, dir) => {
    setWeatherCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3500);
    const removeTimer = setTimeout(() => setIsLoading(false), 5300);
    const clockTimer = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearInterval(clockTimer);
    };
  }, []);
  const handleLogout = () => {
    setUser(null);
    setCurrentAvatar(userDefault);
    localforage.removeItem("currentAvatar");
    setIsSettingsModalOpen(false);
  };

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const nextMode = !prevMode;
      // При зміні глобальної теми скидаємо індивідуальні налаштування секцій,
      // щоб вони всі перейшли в новий глобальний режим
      setSectionThemes({});
      return nextMode;
    });
  }, []);

  const toggleSectionTheme = useCallback((key) => {
    setSectionThemes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const resetSectionThemes = useCallback(() => {
    setSectionThemes({});
  }, []);

  const toggleSectionVisibility = useCallback((key) => {
    setHiddenSections((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (DEFAULT_SITE_SECTIONS.length - prev.length <= 2) return prev; // Мінімум 2 видимі
      return [...prev, key];
    });
  }, []);

  const heroDateString = (() => {
    const showSeconds = user?.showSeconds !== false;
    const mode = user?.dateDisplayMode || "both";
    const hour12 = user?.hour12 === true;

    try {
      const options = {
        timeZone: selectedTimezone,
        hour12: hour12,
      };

      if (mode === "time" || mode === "both") {
        options.hour = "2-digit";
        options.minute = "2-digit";
        if (showSeconds) options.second = "2-digit";
      }

      if (mode === "date" || mode === "both") {
        options.weekday = "long";
        options.day = "numeric";
        options.month = "2-digit";
        options.year = "numeric";
      }

      const fmt = new Intl.DateTimeFormat("uk", options);
      const parts = fmt.formatToParts(now);
      const p = (type) => parts.find((x) => x.type === type)?.value || "";

      const timePart =
        mode === "time" || mode === "both"
          ? `${p("hour")}:${p("minute")}${showSeconds ? ":" + p("second") : ""}`
          : "";
      const datePart =
        mode === "date" || mode === "both"
          ? `${p("weekday") ? p("weekday").charAt(0).toUpperCase() + p("weekday").slice(1) : ""}${p("day") ? `, ${p("day")}.${p("month")}.${p("year")}` : ""}`
          : "";

      if (mode === "both") return `${timePart} ${datePart}`.trim();
      return timePart || datePart;
    } catch (e) {
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s =
        user?.showSeconds !== false
          ? `:${String(now.getSeconds()).padStart(2, "0")}`
          : "";
      const d = now.toLocaleDateString("uk");
      return `${h}:${m}${s} ${d}`;
    }
  })();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isRoutingMode && location.pathname !== "/") {
      navigate("/");
    }
  }, [isRoutingMode, navigate, location.pathname]);

  const moveSiteSection = (idx, dir) => {
    setSiteSections((prev) => {
      const arr = [...prev];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const handleOpenRegister = useCallback(() => setIsModalOpen(true), []);

  const HeroAndWeather = (
    <>
      <div id="hero">
        <Hero
          heroDateString={heroDateString}
          onAddCity={handleAddCityFromHero}
          startAnimation={!isLoading}
          user={user}
          checkWeatherDanger={checkWeatherDanger}
          heroBg={heroBg}
          setHeroBg={setHeroBg}
          heroBg2={heroBg2}
          setHeroBg2={setHeroBg2}
          heroBg3={heroBg3}
          setHeroBg3={setHeroBg3}
          heroBg4={heroBg4}
          setHeroBg4={setHeroBg4}
          customHeroBgs={customHeroBgs}
          setCustomHeroBgs={setCustomHeroBgs}
          heroBgMode={heroBgMode}
          setHeroBgMode={setHeroBgMode}
          heroOverlayOpacity={heroOverlayOpacity}
          setHeroOverlayOpacity={setHeroOverlayOpacity}
          bgRatings={bgRatings}
          setBgRatings={setBgRatings}
          slideshowInterval={slideshowInterval}
          setSlideshowInterval={setSlideshowInterval}
          slideshowTransition={slideshowTransition}
          setSlideshowTransition={setSlideshowTransition}
          filterCategory={heroBgFilterCategory}
          setFilterCategory={setHeroBgFilterCategory}
          heroBgZoom={heroBgZoom}
          setHeroBgZoom={setHeroBgZoom}
          heroBgRotation={heroBgRotation}
          setHeroBgRotation={setHeroBgRotation}
          heroBgBlur={heroBgBlur}
          setHeroBgBlur={setHeroBgBlur}
          heroBgBlurType={heroBgBlurType}
          heroBgPixelation={heroBgPixelation}
          setHeroBgPixelation={setHeroBgPixelation}
          setHeroBgBlurType={setHeroBgBlurType}
          heroBgFocal1={heroBgFocal1}
          setHeroBgFocal1={setHeroBgFocal1}
          heroBgFocal2={heroBgFocal2}
          setHeroBgFocal2={setHeroBgFocal2}
          heroBgFocal3={heroBgFocal3}
          setHeroBgFocal3={setHeroBgFocal3}
          heroBgFocal4={heroBgFocal4}
          setHeroBgFocal4={setHeroBgFocal4}
          heroBgPanEnabled={heroBgPanEnabled}
          setHeroBgPanEnabled={setHeroBgPanEnabled}
          heroBgPanSpeed={heroBgPanSpeed}
          setHeroBgPanSpeed={setHeroBgPanSpeed}
          screenshots={screenshots}
          selectedTimezone={selectedTimezone}
          setSelectedTimezone={setSelectedTimezone}
          customHolidayName={customHolidayName}
          setCustomHolidayName={setCustomHolidayName}
        />
      </div>
      <StyledSectionContainer
        $isDarkMode={sectionThemes["weather"] ?? isDarkMode}
        $isHidden={hiddenSections.includes("weather")}
      >
        <SectionContent
          section={siteSections.find((s) => s.key === "weather")}
          weatherCards={weatherCards}
          heroDateString={heroDateString}
          isDarkMode={sectionThemes["weather"] ?? isDarkMode}
          isLocationEnabled={isLocationEnabled}
          handleRefreshCard={handleRefreshCard}
          handleDeleteCard={handleDeleteCard}
          handleRenameCard={handleRenameCard}
          moveWeatherCard={moveWeatherCard}
          setIsLocationEnabled={setIsLocationEnabled}
          user={user}
          isAnyModalOpen={isAnyModalOpen}
          onUpdateUser={setUser}
          setHeroBg={setHeroBg}
          customHeroBgs={customHeroBgs}
          setCustomHeroBgs={setCustomHeroBgs}
          handleOpenRegister={handleOpenRegister}
          customHolidayName={customHolidayName}
          setCustomHolidayName={setCustomHolidayName}
          weatherCardLayout={weatherCardLayout}
          isWeatherDetailsOpen={isWeatherDetailsOpen}
          setIsWeatherDetailsOpen={setIsWeatherDetailsOpen}
          selectedWeatherCard={selectedWeatherCard}
          setSelectedWeatherCard={setSelectedWeatherCard}
          setIsFsActive={setIsFsActive}
        />
      </StyledSectionContainer>
    </>
  );

  const LandingPage = (
    <>
      <div id="hero">
        <Hero
          heroDateString={heroDateString}
          onAddCity={handleAddCityFromHero}
          startAnimation={!isLoading}
          user={user}
          checkWeatherDanger={checkWeatherDanger}
          heroBg={heroBg}
          setHeroBg={setHeroBg}
          heroBg2={heroBg2}
          setHeroBg2={setHeroBg2}
          heroBg3={heroBg3}
          setHeroBg3={setHeroBg3}
          heroBg4={heroBg4}
          setHeroBg4={setHeroBg4}
          customHeroBgs={customHeroBgs}
          setCustomHeroBgs={setCustomHeroBgs}
          heroBgMode={heroBgMode}
          setHeroBgMode={setHeroBgMode}
          heroOverlayOpacity={heroOverlayOpacity}
          setHeroOverlayOpacity={setHeroOverlayOpacity}
          bgRatings={bgRatings}
          setBgRatings={setBgRatings}
          slideshowInterval={slideshowInterval}
          setSlideshowInterval={setSlideshowInterval}
          slideshowTransition={slideshowTransition}
          setSlideshowTransition={setSlideshowTransition}
          filterCategory={heroBgFilterCategory}
          setFilterCategory={setHeroBgFilterCategory}
          heroBgZoom={heroBgZoom}
          setHeroBgZoom={setHeroBgZoom}
          heroBgRotation={heroBgRotation}
          setHeroBgRotation={setHeroBgRotation}
          heroBgBlur={heroBgBlur}
          setHeroBgBlur={setHeroBgBlur}
          heroBgBlurType={heroBgBlurType}
          heroBgPixelation={heroBgPixelation}
          setHeroBgPixelation={setHeroBgPixelation}
          setHeroBgBlurType={setHeroBgBlurType}
          heroBgFocal1={heroBgFocal1}
          setHeroBgFocal1={setHeroBgFocal1}
          heroBgFocal2={heroBgFocal2}
          setHeroBgFocal2={setHeroBgFocal2}
          heroBgFocal3={heroBgFocal3}
          setHeroBgFocal3={setHeroBgFocal3}
          heroBgFocal4={heroBgFocal4}
          setHeroBgFocal4={setHeroBgFocal4}
          heroBgPanEnabled={heroBgPanEnabled}
          setHeroBgPanEnabled={setHeroBgPanEnabled}
          heroBgPanSpeed={heroBgPanSpeed}
          setHeroBgPanSpeed={setHeroBgPanSpeed}
          screenshots={screenshots}
          selectedTimezone={selectedTimezone}
          setSelectedTimezone={setSelectedTimezone}
          customHolidayName={customHolidayName}
          setCustomHolidayName={setCustomHolidayName}
        />
      </div>
      <div className="container">
        {siteSections.map(
          (section) =>
            section.key !== "hero" && (
              <StyledSectionContainer
                $isDarkMode={sectionThemes[section.key] ?? isDarkMode}
                $isHidden={hiddenSections.includes(section.key)}
                key={section.key}
              >
                <SectionContent
                  section={section}
                  weatherCards={weatherCards}
                  isDarkMode={sectionThemes[section.key] ?? isDarkMode}
                  isLocationEnabled={isLocationEnabled}
                  handleRefreshCard={handleRefreshCard}
                  handleDeleteCard={handleDeleteCard}
                  handleRenameCard={handleRenameCard}
                  moveWeatherCard={moveWeatherCard}
                  setIsLocationEnabled={setIsLocationEnabled}
                  user={user}
                  isAnyModalOpen={isAnyModalOpen}
                  onUpdateUser={setUser}
                  setHeroBg={setHeroBg}
                  customHeroBgs={customHeroBgs}
                  setCustomHeroBgs={setCustomHeroBgs}
                  handleOpenRegister={handleOpenRegister}
                  customHolidayName={customHolidayName}
                  setCustomHolidayName={setCustomHolidayName}
                  weatherCardLayout={weatherCardLayout}
                  isWeatherDetailsOpen={isWeatherDetailsOpen}
                  setIsWeatherDetailsOpen={setIsWeatherDetailsOpen}
                  selectedWeatherCard={selectedWeatherCard}
                  setSelectedWeatherCard={setSelectedWeatherCard}
                  heroDateString={heroDateString}
                  setIsFsActive={setIsFsActive}
                />
              </StyledSectionContainer>
            ),
        )}
      </div>
    </>
  );

  return (
    <DecoratorProvider isDarkMode={isDarkMode}>
      <GlobalFilterLock $locked={isFsActive && lockFiltersInFs} />
      <Loader
        isLoading={isLoading}
        isFadingOut={isFadingOut}
        randomPhrase={
          phraseData.text && (
            <LoadingPhraseWrapper $isNew={phraseData.isNew}>
              {phraseData.text}
              {phraseParticles.map((p) => (
                <ParticleSymbol
                  key={p.id}
                  $x={p.x}
                  $y={p.y}
                  $delay={p.delay}
                  $isNew={phraseData.isNew}
                >
                  ✧
                </ParticleSymbol>
              ))}
            </LoadingPhraseWrapper>
          )
        }
      />

      <ThemeWrapper $isDarkMode={isDarkMode}>
        <div className="App">
          <audio ref={bgAudioRef} onEnded={handleBgMusicEnded} preload="auto" />
          <audio
            ref={bgAudioRef2}
            onEnded={handleBgMusicEnded}
            preload="auto"
          />
          <div className="container">
            <Header
              onOpenRegister={() => setIsModalOpen(true)}
              onOpenLogin={() => setIsLoginOpen(true)}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onOpenVip={() => setIsVipModalOpen(true)}
              onOpenShop={() => setIsShopOpen(true)}
              onOpenAchievements={() => setIsAchivmentsOpen(true)}
              onOpenHelp={() => setIsUserSearchOpen(true)}
              onOpenInfo={() => setIsInfoOpen(true)}
              onOpenOtherOptions={() => setIsOtherOptionsOpen(true)}
              onCloseInfo={() => setIsInfoOpen(false)}
              isInfoOpen={isInfoOpen}
              user={user}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              sectionThemes={sectionThemes}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={toggleSectionVisibility}
              onToggleSectionTheme={toggleSectionTheme}
              onResetSectionThemes={resetSectionThemes}
              currentAvatar={currentAvatar}
              onLogout={handleLogout}
              siteSections={siteSections}
              moveSiteSection={moveSiteSection}
              resetSiteSections={() =>
                setSiteSections([...DEFAULT_SITE_SECTIONS])
              }
              isRoutingMode={isRoutingMode}
              setIsRoutingMode={setIsRoutingMode}
              currentPath={location.pathname.substring(1)}
              loadingStrategy={loadingStrategy}
              onSetLoadingStrategy={setLoadingStrategy}
              setIsFsActive={setIsFsActive}
            />
          </div>
          <main>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={LandingPage} />
                {siteSections.map((section) => (
                  <Route
                    key={section.key}
                    path={`/${section.path}`}
                    element={
                      section.key === "weather" ? (
                        HeroAndWeather
                      ) : (
                        <div
                          className="container"
                          style={{ paddingTop: "40px", minHeight: "80vh" }}
                        >
                          {section.key === "hero" ? (
                            <Hero
                              heroDateString={heroDateString}
                              onAddCity={handleAddCityFromHero}
                              startAnimation={!isLoading}
                              user={user}
                              checkWeatherDanger={checkWeatherDanger}
                              heroBg={heroBg}
                              setHeroBg={setHeroBg}
                              heroBg2={heroBg2}
                              setHeroBg2={setHeroBg2}
                              heroBg3={heroBg3}
                              setHeroBg3={setHeroBg3}
                              heroBg4={heroBg4}
                              setHeroBg4={setHeroBg4}
                              customHeroBgs={customHeroBgs}
                              setCustomHeroBgs={setCustomHeroBgs}
                              heroBgMode={heroBgMode}
                              setHeroBgMode={setHeroBgMode}
                              heroOverlayOpacity={heroOverlayOpacity}
                              setHeroOverlayOpacity={setHeroOverlayOpacity}
                              bgRatings={bgRatings}
                              setBgRatings={setBgRatings}
                              slideshowInterval={slideshowInterval}
                              setSlideshowInterval={setSlideshowInterval}
                              slideshowTransition={slideshowTransition}
                              setSlideshowTransition={setSlideshowTransition}
                              filterCategory={heroBgFilterCategory}
                              setFilterCategory={setHeroBgFilterCategory}
                              heroBgZoom={heroBgZoom}
                              setHeroBgZoom={setHeroBgZoom}
                              heroBgRotation={heroBgRotation}
                              setHeroBgRotation={setHeroBgRotation}
                              heroBgBlur={heroBgBlur}
                              setHeroBgBlur={setHeroBgBlur}
                              heroBgBlurType={heroBgBlurType}
                              heroBgPixelation={heroBgPixelation}
                              setHeroBgPixelation={setHeroBgPixelation}
                              heroBgFocal1={heroBgFocal1}
                              setHeroBgFocal1={setHeroBgFocal1}
                              heroBgFocal2={heroBgFocal2}
                              setHeroBgFocal2={setHeroBgFocal2}
                              heroBgFocal3={heroBgFocal3}
                              setHeroBgFocal3={setHeroBgFocal3}
                              heroBgFocal4={heroBgFocal4}
                              setHeroBgFocal4={setHeroBgFocal4}
                              heroBgPanEnabled={heroBgPanEnabled}
                              setHeroBgPanEnabled={setHeroBgPanEnabled}
                              heroBgPanSpeed={heroBgPanSpeed}
                              setHeroBgPanSpeed={setHeroBgPanSpeed}
                              screenshots={screenshots}
                              selectedTimezone={selectedTimezone}
                              setSelectedTimezone={setSelectedTimezone}
                              customHolidayName={customHolidayName}
                              setCustomHolidayName={setCustomHolidayName}
                            />
                          ) : (
                            <StyledSectionContainer
                              $isDarkMode={
                                sectionThemes[section.key] ?? isDarkMode
                              }
                              $isHidden={false} // Завжди показуємо в роутингу
                            >
                              <SectionContent
                                section={section}
                                weatherCards={weatherCards}
                                isDarkMode={
                                  sectionThemes[section.key] ?? isDarkMode
                                }
                                isLocationEnabled={isLocationEnabled}
                                handleRefreshCard={handleRefreshCard}
                                handleDeleteCard={handleDeleteCard}
                                handleRenameCard={handleRenameCard}
                                moveWeatherCard={moveWeatherCard}
                                setIsLocationEnabled={setIsLocationEnabled}
                                user={user}
                                isAnyModalOpen={isAnyModalOpen}
                                onUpdateUser={setUser}
                                setHeroBg={setHeroBg}
                                customHeroBgs={customHeroBgs}
                                setCustomHeroBgs={setCustomHeroBgs}
                                handleOpenRegister={handleOpenRegister}
                                customHolidayName={customHolidayName}
                                setCustomHolidayName={setCustomHolidayName}
                                isWeatherDetailsOpen={isWeatherDetailsOpen}
                                setIsWeatherDetailsOpen={
                                  setIsWeatherDetailsOpen
                                }
                                selectedWeatherCard={selectedWeatherCard}
                                setSelectedWeatherCard={setSelectedWeatherCard}
                                setIsFsActive={setIsFsActive}
                              />
                            </StyledSectionContainer>
                          )}
                        </div>
                      )
                    }
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Suspense fallback={null}>
            {isModalOpen && (
              <Modal
                onClose={() => setIsModalOpen(false)}
                onRegister={(data) => {
                  setUser(data);
                  setIsModalOpen(false);
                }}
                availableAvatars={AVAILABLE_AVATARS}
                isDarkMode={isDarkMode}
              />
            )}
            {isLoginOpen && (
              <LoginModal
                onClose={() => setIsLoginOpen(false)}
                onLogin={(data) => {
                  setUser(data);
                  setIsLoginOpen(false);
                }}
              />
            )}
            {isSettingsModalOpen && user && (
              <UserSettingsModal
                onClose={() => setIsSettingsModalOpen(false)}
                user={user}
                availableAvatars={AVAILABLE_AVATARS}
                onUpdate={setUser}
                weatherCardLayout={weatherCardLayout}
                onUpdateLayout={setWeatherCardLayout}
                showUpdateTimer={showUpdateTimer}
                setShowUpdateTimer={setShowUpdateTimer}
                isDarkMode={isDarkMode}
              />
            )}
            {isVipModalOpen && (
              <VipModal onClose={() => setIsVipModalOpen(false)} />
            )}
            {isShopOpen && (
              <ShopModal onClose={() => setIsShopOpen(false)} hasVip={!!user} />
            )}
            {isAchivmentsOpen && (
              <AchivmentsModal
                onClose={() => setIsAchivmentsOpen(false)}
                isDarkMode={isDarkMode}
              />
            )}
            {isUserSearchOpen && (
              <TermsModal
                isOpen={isUserSearchOpen}
                onClose={() => setIsUserSearchOpen(false)}
              />
            )}
            {isFirstTimeHelpOpen && (
              <TermsModal
                isOpen={isFirstTimeHelpOpen}
                onClose={() => setIsFirstTimeHelpOpen(false)}
              />
            )}
            {isInfoOpen && <TermsModal onClose={() => setIsInfoOpen(false)} />}

            <WeatherDetailsModal
              isOpen={isWeatherDetailsOpen}
              onClose={() => setIsWeatherDetailsOpen(false)}
              card={selectedWeatherCard}
              isDarkMode={isDarkMode}
            />

            {isOtherOptionsOpen && (
              <OtherOptionsModal
                bgAudioRef={bgAudioRef}
                bgAudioRef2={bgAudioRef2}
                onClose={() => setIsOtherOptionsOpen(false)}
                bgMusicEnabled={bgMusicEnabled}
                setBgMusicEnabled={setBgMusicEnabled}
                autoMuteBgMusic={autoMuteBgMusic}
                setAutoMuteBgMusic={setAutoMuteBgMusic}
                lockFiltersInFs={lockFiltersInFs}
                setLockFiltersInFs={setLockFiltersInFs}
                bgMusicSource={bgMusicSource}
                setBgMusicSource={setBgMusicSource}
                customBgTracks={customBgTracks}
                setCustomBgTracks={setCustomBgTracks}
                bgMusicVolume={bgMusicVolume}
                setBgMusicVolume={setBgMusicVolume}
                bgMusicSpeed={bgMusicSpeed}
                setBgMusicSpeed={setBgMusicSpeed}
                bgMusicMode={bgMusicMode}
                setBgMusicMode={setBgMusicMode}
                bgMusicShuffle={bgMusicShuffle}
                setBgMusicShuffle={setBgMusicShuffle}
                libraryBgSettings={libraryBgSettings}
                setLibraryBgSettings={setLibraryBgSettings}
                activeBgTrackId={activeBgTrackId}
                setActiveBgTrackId={setActiveBgTrackId}
                onResetBgPosition={handleResetBgPosition}
                isDarkMode={isDarkMode}
              />
            )}
          </Suspense>

          {showUpdateTimer && ( // Conditionally render the badge
            <UpdateTimerBadge
              $isDarkMode={isDarkMode}
              onClick={handleManualBulkRefresh}
              title="Натисніть, щоб оновити всі картки зараз"
            >
              Оновлення погоди через: {Math.floor(secondsUntilUpdate / 60)}:
              {(secondsUntilUpdate % 60).toString().padStart(2, "0")}
            </UpdateTimerBadge>
          )}
          <DecoratorOverlay />
        </div>
      </ThemeWrapper>
    </DecoratorProvider>
  );
};

export default App;
