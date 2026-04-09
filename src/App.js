import { useState, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import WeatherCardComponent from "./components/Weather/Weather.jsx";
import NotFound from "./components/NotFound.jsx";
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
// import { Line } from "react-chartjs-2";
import Menu, { DEFAULT_SITE_SECTIONS } from "./components/Header/Menu.jsx";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import MusicPhoto from "./components/MusicPhoto/MusicPhoto.jsx";
import Modal from "./components/Modals/Modal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import UserSettingsModal from "./components/Modals/UserSettingsModal.jsx";
import userDefault from "./photos/hero-header/user.webp";
import VipModal from "./components/Modals/VipModal.jsx";
import Aihelp from "./components/Aihelp/Aihelp.jsx";
import FanArt from "./components/FanArt/FanArt.jsx";
import ShopModal from "./components/Modals/ShopModal.jsx";
import News from "./components/News/News.jsx";
import AchivmentsModal from "./components/Modals/AchivmentsModal.jsx";
import Puzzles from "./components/Puzzles/Puzzles.jsx";
import LearningModal from "./components/Modals/UserSearchModal.jsx";
import TermsModal from "./components/Modals/InfoModal.jsx";
import ClimateMap from "./components/ClimateMap/ClimateMap.jsx";
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
    props.$isDarkMode ? "#121212" : "transparent"};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "inherit")};
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding-bottom: 20px;
`;

const WeatherCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 30px 0;
  @media (min-width: 1920px) {
    gap: 40px;
  }
`;

const LOADING_PHRASES = [
  "Підпішіться на мій фейсбук, щоб знати, що буде в наступній версії! Проект погода.",
  "Інструкція з використання і отримування 🧧, розміщена у магазині конвертів!",
  "Головоломки в розробці🧩",
  "Зворотній зв'язок: фейсбук або акаунт theturkeystudio@gmail.com, на випадок помилок або якщо ви правовласник, і хочете обговорити умови розміщення треку на сайті.",
  "Питання по навігації можете задати до нашого ШІ✨",
  "Фан-арти безкоштовні, для роздрукування! 🎨",
  "Розблокуйте переваги з Стихія+ та Стихія+ Ультра!",
  "Ви знаєте, що за рандомний текст, можна отримати досягнення? Треба побачити кожний :)",
  "Скиньте мені в фейсбук, картинку до треків деяких",
  "У вас характер Ніцерона, індика(в плані упертості птаха), чи кого?",
  "СлівкіШоу та Дизель шоу, це легенди.",
  "Лише по секрету, 5bn games, одні з накращих, у створення сюжетів і загадок(Спадщина і Темрява та Полум'я найвдаліше!)",
  "Ми вас здивуємо, багато чим :)",
  "Пробачте за рекламу, при переході на новини, я просто хочу, щоб ви мене морально підтримали.",
  "2 пісню Шакіри(Зоотрополіс) шукайте в Dezzer.com, ми швидко через кнопку Full вас перемістимо(розділ ваші пісні).",
  "Aurora hills 2: Доступна! NowaSoft Interative. Вітаю!",
  "Помилка 404, це жарт :)",
  "Джомолунгма: .... ...... 6 і 8",
  "Якщо буде багато підписніків, Стихія буде доступна айфонам!",
  "Код по першій букві: Україна, Ніцерон, Aurora hills, місце, увага, Трініті, аварія, Ніжин, обмеження, Загадки Нью-Йорка.",
  "Оновлення скоро",
  "Теорія неймовірності(Макс Кіндрук) має одну частину :(",
  "Режим відео: Динофроз.",
  "Текст коллекційне видання, під Стихія, лише для декору",
  "Багато змін клімату, мультиплікації, моди, життя. І нас теж. Не знаю який обрати :( чи :)",
  "Стихія, Спеціально тут индики хто зна, і моя фантазія.",
  "Місія неможлива, ніде не помилитись",
  "Досягнення 99: Хто я, якщо нас менше 70?. ",
  "Дасте пораду щодо дизайну, Стихії",
  "Правило 20: Дивіться на все під різними кутами.",
];

const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 20px auto;
  background: #00ffd5;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px #0001;
  @media (min-width: 1920px) {
    max-width: 1600px;
    padding: 24px;
    h4 {
      font-size: 22px !important;
    }
    label,
    input,
    button,
    span {
      font-size: 18px !important;
    }
  }
`;
const SECTION_ORDER_STORAGE_KEY = "siteSectionsOrder";

const SectionContent = memo(({
  section,
  weatherCards,
  isDarkMode,
  isLocationEnabled,
  handleRefreshCard,
  handleDeleteCard,
  handleRenameCard,
  moveWeatherCard,
  setIsLocationEnabled,
  user,
  handleOpenRegister,
  isAnyModalOpen
}) => {
  if (!section) return null;

  if (section.key === "weather") {
    return (
      <div id="weather">
        <WeatherCardsContainer>
          {weatherCards.map((card, index) => {
            const isExtremeTemp = card.current.tempNum > 30 || card.current.tempNum < -10;
            const isExtremeWind = card.current.windNum > 10;
            const isExtremeUV = card.current.uv_index > 7;

            const chartData = {
              labels: card.hourly?.map((h) => h.time) || [],
              datasets: [
                {
                  label: "Температура (°C)",
                  data: card.hourly?.map((h) => h.tempNum) || [],
                  fill: true,
                  backgroundColor: "rgba(255, 179, 108, 0.2)",
                  borderColor: "rgba(255, 179, 108, 1)",
                  tension: 0.4,
                },
              ],
            };

            return (
              <WeatherCardComponent
                key={card.id}
                card={card}
                isDarkMode={isDarkMode}
                isLocationEnabled={isLocationEnabled}
                isExtremeTemp={isExtremeTemp}
                isExtremeWind={isExtremeWind}
                isExtremeUV={isExtremeUV}
                chartData={chartData}
                index={index}
                totalCards={weatherCards.length}
                handleRefreshCard={handleRefreshCard}
                handleDeleteCard={handleDeleteCard}
                handleRenameCard={handleRenameCard}
                moveWeatherCard={moveWeatherCard}
                setIsLocationEnabled={setIsLocationEnabled}
              />
            );
          })}
        </WeatherCardsContainer>
      </div>
    );
  }
  return (
    <div id={section.key}>
      {section.key === "map" && <ClimateMap />}
      {section.key === "puzzles" && <Puzzles />}
      {section.key === "aihelp" && <Aihelp isDarkMode={isDarkMode} />}
      {section.key === "news" && <News />}
      {section.key === "music" && (
        <MusicPhoto user={user} onOpenRegister={handleOpenRegister} isAnyModalOpen={isAnyModalOpen} />
      )}
      {section.key === "fanart" && (
        <FanArt
          isDarkMode={isDarkMode}
          user={user}
          onOpenRegister={handleOpenRegister}
        />
      )}
    </div>
  );
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [randomPhrase] = useState(
    () => LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)],
  );
  const [now, setNow] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("isDarkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("active_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentAvatar, setCurrentAvatar] = useState(() => {
    const saved = localStorage.getItem("currentAvatar");
    return saved || userDefault;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAchivmentsOpen, setIsAchivmentsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [isRoutingMode, setIsRoutingMode] = useState(() => {
    const saved = localStorage.getItem("isRoutingMode");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const deployId = process.env.REACT_APP_DEPLOY_ID;
    const lastSeenVersion = localStorage.getItem("last_deployed_version");

    if (deployId && lastSeenVersion !== deployId) {
      setIsUserSearchOpen(true);
      localStorage.setItem("last_deployed_version", deployId);
    }
  }, []);

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [weatherCards, setWeatherCards] = useState(() => {
    const savedCards = localStorage.getItem("weather_cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const isAnyModalOpen = isModalOpen || isLoginOpen || isSettingsModalOpen || isVipModalOpen || isShopOpen || isAchivmentsOpen || isUserSearchOpen || isInfoOpen;

  const [hideDeleteModalUntil, setHideDeleteModalUntil] = useState(() => {
    const val = localStorage.getItem("hideDeleteModalUntil");
    return val ? parseInt(val) : 0;
  });

  // Фонове завантаження ресурсів кат-сцени
  useEffect(() => {
    const preloadKatScene = async () => {
      const assets = [
        dinofrozVideo,
        startImage,
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

  const [siteSections, setSiteSections] = useState(() => {
    const savedOrder = localStorage.getItem(SECTION_ORDER_STORAGE_KEY);
    return savedOrder ? JSON.parse(savedOrder) : [...DEFAULT_SITE_SECTIONS];
  });
  useEffect(() => {
    setIsMenuOpen(false);
    localStorage.setItem("weather_cards", JSON.stringify(weatherCards));
  }, [weatherCards]);

  useEffect(() => {
    localStorage.setItem("isRoutingMode", JSON.stringify(isRoutingMode));
    localStorage.setItem(
      SECTION_ORDER_STORAGE_KEY,
      JSON.stringify(siteSections),
    );
  }, [siteSections, isRoutingMode]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("active_user", JSON.stringify(user));
      if (user.avatar) {
        setCurrentAvatar(user.avatar);
        localStorage.setItem("currentAvatar", user.avatar);
      }
    } else {
      localStorage.removeItem("active_user");
    }
  }, [user]);
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

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto&forecast_days=16`;
        const res = await axios.get(url);
        const d = res.data;

        setWeatherCards((prev) => {
          const id = isMain ? "main-card" : (cityData?.id || Date.now());
          const existingCard = prev.find(c => c.id === id);

        const newCardData = {
          id: id,
          isMain: isMain,
          locationName: existingCard ? existingCard.locationName : displayName,
          lat: targetLat,
          lon: targetLon,
          current: {
            temp: `${Math.round(d.current.temperature_2m)}°C`,
            tempNum: Math.round(d.current.temperature_2m),
            feels_like: `${Math.round(d.current.apparent_temperature)}°C`,
            humidity: `${d.current.relative_humidity_2m}%`,
            pressure: `${Math.round(d.current.surface_pressure)} hPa`,
            wind_speed: `${d.current.wind_speed_10m} м/с`,
            windNum: d.current.wind_speed_10m,
            uv_index: d.daily.uv_index_max[0],
            description: "За кодом: " + d.current.weather_code,
            iconPlaceholder: getWeatherIcon(d.current.weather_code),
          },
          hourly: d.hourly.time.slice(0, 24).map((t, i) => ({
            time: new Date(t).getHours() + ":00",
            temp: `${Math.round(d.hourly.temperature_2m[i])}°C`,
            tempNum: Math.round(d.hourly.temperature_2m[i]),
            iconPlaceholder: getWeatherIcon(d.hourly.weather_code[i]),
          })),
          daily16: d.daily.time.map((t, i) => ({
            date: new Date(t).toLocaleDateString("uk", {
              day: "numeric",
              month: "2-digit",
            }),
            day: new Date(t).toLocaleDateString("uk", { weekday: "short" }),
            temp_day: `${Math.round(d.daily.temperature_2m_max[i])}°C`,
            temp_night: `${Math.round(d.daily.temperature_2m_min[i])}°C`,
            iconPlaceholder: getWeatherIcon(d.daily.weather_code[i]),
          })),
        };

          if (isMain) {
            const hasMain = prev.some(c => c.isMain);
            if (hasMain) return prev.map(c => c.isMain ? newCardData : c);
            return [newCardData, ...prev];
          } else {
            return existingCard ? prev.map(c => c.id === id ? newCardData : c) : (prev.length >= 4 ? prev : [...prev, newCardData]);
          }
        });
      } catch (error) {
        console.error("Помилка завантаження погоди", error);
      }
    },
    [],
  );
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
        () => fetchWeather({ fullName: "Київ", id: "main-card" }, true, 50.45, 30.52),
      );
    } else {
      fetchWeather({ fullName: "Київ", id: "main-card" }, true, 50.45, 30.52);
    }
  }, [fetchWeather, isLocationEnabled]);

  useEffect(() => {
    getInitialLocation();
  }, [getInitialLocation]);

  useEffect(() => {
    weatherCards.forEach((card) => {
      if (!card.isMain && (!card.hourly || card.hourly.length === 0)) {
        fetchWeather(card, false);
      }
    });
  }, [weatherCards, fetchWeather]);

  const handleAddCityFromHero = useCallback((cityObj) => {
    if (!user) {
      alert("Створювати картки погоди можуть лише зареєстровані користувачі!");
      return;
    }
    fetchWeather(cityObj, false);
  }, [user, fetchWeather]);

  const handleDeleteCard = useCallback((id) => {
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
        localStorage.setItem("hideDeleteModalUntil", until.toString());
        setHideDeleteModalUntil(until);
      }
      setWeatherCards((prev) => prev.filter((card) => card.id !== id));
    }
  }, [hideDeleteModalUntil]);

  const handleRefreshCard = useCallback((card) => {
    card.isMain ? getInitialLocation() : fetchWeather(card, false);
  }, [getInitialLocation, fetchWeather]);

  const handleRenameCard = useCallback((id, newName) => {
    setWeatherCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, locationName: newName } : card
      )
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
    localStorage.removeItem("currentAvatar");
    setIsSettingsModalOpen(false);
  };

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const heroDateString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${
    new Intl.DateTimeFormat("uk", { weekday: "long" })
      .format(now)
      .charAt(0)
      .toUpperCase() +
    new Intl.DateTimeFormat("uk", { weekday: "long" }).format(now).slice(1)
  }, ${now.getDate()}.${new Intl.DateTimeFormat("uk", { month: "2-digit" }).format(now)}.${now.getFullYear()}`;

  const handleOpenMenu = useCallback(() => setIsMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), []);

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
        />
      </div>
      <SectionContent
        section={siteSections.find((s) => s.key === "weather")}
        weatherCards={weatherCards}
        isDarkMode={isDarkMode}
        isLocationEnabled={isLocationEnabled}
        handleRefreshCard={handleRefreshCard}
        handleDeleteCard={handleDeleteCard}
        handleRenameCard={handleRenameCard}
        moveWeatherCard={moveWeatherCard}
        setIsLocationEnabled={setIsLocationEnabled}
        user={user}
        isAnyModalOpen={isAnyModalOpen}
        handleOpenRegister={handleOpenRegister}
      />
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
        />
      </div>
      <div className="container">
        <SettingsContainer>
          <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
            Налаштування підтвердження видалення картки
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label htmlFor="hideDeleteModalHours">
              Час приховування (1-72 год):
            </label>
            <input
              id="hideDeleteModalHours"
              type="number"
              min={1}
              max={72}
              value={
                hideDeleteModalUntil > Date.now()
                  ? Math.ceil((hideDeleteModalUntil - Date.now()) / 3600000)
                  : 1
              }
              onChange={(e) => {
                let val = Math.max(
                  1,
                  Math.min(72, parseInt(e.target.value) || 1),
                );
                const newUntil = Date.now() + val * 3600 * 1000;
                localStorage.setItem(
                  "hideDeleteModalUntil",
                  newUntil.toString(),
                );
                setHideDeleteModalUntil(newUntil);
              }}
              style={{ width: 60, padding: "2px 8px" }}
            />
            <button
              onClick={() => {
                localStorage.removeItem("hideDeleteModalUntil");
                setHideDeleteModalUntil(0);
              }}
            >
              Показувати завжди
            </button>
          </div>
        </SettingsContainer>
        {siteSections.map(
          (section) => section.key !== "hero" && (
            <SectionContent
              key={section.key}
              section={section}
              weatherCards={weatherCards}
              isDarkMode={isDarkMode}
              isLocationEnabled={isLocationEnabled}
              handleRefreshCard={handleRefreshCard}
              handleDeleteCard={handleDeleteCard}
              handleRenameCard={handleRenameCard}
              moveWeatherCard={moveWeatherCard}
              setIsLocationEnabled={setIsLocationEnabled}
              user={user}
              isAnyModalOpen={isAnyModalOpen}
              handleOpenRegister={handleOpenRegister}
            />
          ),
        )}
      </div>
    </>
  );

  return (
    <>
      <Loader
        isLoading={isLoading}
        isFadingOut={isFadingOut}
        randomPhrase={randomPhrase}
      />

      <ThemeWrapper $isDarkMode={isDarkMode}>
        <div className="App">
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
              user={user}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              onOpenMenu={handleOpenMenu}
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
            />
          </div>
          <main>
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
                        />
                      ) : (
                        <SectionContent
                          section={section}
                          weatherCards={weatherCards}
                          isDarkMode={isDarkMode}
                          isLocationEnabled={isLocationEnabled}
                          handleRefreshCard={handleRefreshCard}
                          handleDeleteCard={handleDeleteCard}
                          handleRenameCard={handleRenameCard}
                          moveWeatherCard={moveWeatherCard}
                          setIsLocationEnabled={setIsLocationEnabled}
                          user={user}
                          isAnyModalOpen={isAnyModalOpen}
                          handleOpenRegister={handleOpenRegister}
                        />
                      )}
                    </div>
                  )
                }
              />
            ))}
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
          {isModalOpen && (
            <Modal
              onClose={() => setIsModalOpen(false)}
              onRegister={(data) => {
                setUser(data);
                setIsModalOpen(false);
              }}
              availableAvatars={AVAILABLE_AVATARS}
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
            <LearningModal onClose={() => setIsUserSearchOpen(false)} />
          )}
          {isInfoOpen && (
            <TermsModal onClose={() => setIsInfoOpen(false)} />
          )}

          <Menu
            isOpen={isMenuOpen}
            onClose={handleCloseMenu}
            isDarkMode={isDarkMode}
            siteSections={siteSections}
            moveSiteSection={moveSiteSection}
            resetSiteSections={() =>
              setSiteSections([...DEFAULT_SITE_SECTIONS])
            }
            onToggleTheme={toggleTheme}
            onOpenShop={() => {
              setIsShopOpen(true);
              handleCloseMenu();
            }}
            onOpenAchievements={() => {
              setIsAchivmentsOpen(true);
              handleCloseMenu();
            }}
            onOpenSettings={() => {
              setIsSettingsModalOpen(true);
              handleCloseMenu();
            }}
            onOpenHelp={() => {
              setIsUserSearchOpen(true);
              handleCloseMenu();
            }}
            onOpenInfo={() => {
              setIsInfoOpen(true);
              handleCloseMenu();
            }}
            onLogout={handleLogout}
            isRoutingMode={isRoutingMode}
            setIsRoutingMode={setIsRoutingMode}
            currentPath={location.pathname.substring(1)}
          />
        </div>
      </ThemeWrapper>
    </>
  );
};
export default App;
