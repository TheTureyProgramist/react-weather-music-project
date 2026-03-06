import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import WeatherCardComponent from "./components/Weather/Weather.jsx";
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
import { Line } from "react-chartjs-2";
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
import ClimateMap from "./components/ClimateMap/ClimateMap.jsx";
// Імпорт аватарів
import loadimage from "./photos/hero-header/start-image.jpg";
import turkeys from "./photos/vip-images/ultra-vip-turkeys.webp";
import dragons from "./photos/vip-images/vip-dragons.jpg";
import horrordog from "./photos/vip-images/horror.jpg";
import horse from "./photos/vip-images/horse.jpg";
import lebid from "./photos/vip-images/vip-lebid.jpg";
import rooster from "./photos/vip-images/vip-rooster.jpg";
import nicerone from "./photos/vip-images/vip-dinofroz.webp";
import soloveyko from "./photos/vip-images/vip-soloveyko.jpg";
import monody from "./photos/vip-images/vip-forest.webp";
import dizel from "./photos/vip-images/dizel.webp";
import flame from "./photos/vip-images/flame.jpg";
import finances from "./photos/fan-art/finance.jpg";
import parol from "./photos/fan-art/parol.jpg";
import vovk from "./photos/fan-art/kolada.webp";

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
  z-index: 994;
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
      to end,
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

const WeatherCard = styled.div`
  background: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f5f5f5")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: ${(props) => (props.$isMain ? "2px solid gold" : "1px solid #444")};
  @media (min-width: 1920px) {
    max-width: 460px;
    padding: 30px;
    h1 {
      font-size: 3rem !important;
    }
    p,
    div,
    span {
      font-size: 16px !important;
    }
    h3 {
      font-size: 1.5rem !important;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 15px;

  h3 {
    margin: 0;
    color: ${(props) => (props.$isMain ? "gold" : "skyblue")};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: #333;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background: #555;
    }
  }
  @media (min-width: 1920px) {
    button {
      font-size: 16px;
      padding: 8px 16px;
    }
  }
`;

const ImagePlaceholder = styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  background: #3a3a3a;
  border: 1px dashed #888;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: ${(props) => props.fontSize || "24px"};
  color: #fff;
  text-align: center;
  margin: ${(props) => props.margin || "0"};
  @media (min-width: 1920px) {
    transform: scale(1.3);
    margin: 10px;
    font-size: 36px !important;
  }
`;

const LOADING_PHRASES = [
  ".",
  "Підпішіться на мій фейсбук, щоб знати, що буде в наступній версії! Проект погода.",
  "Інструкція з використання і отримування 🧧, розміщеннна у магазині конвертів!",
  "Головоломки та кат-сцени в розробці🧩",
  "Зворотній зв'язок: фейсбук або акаунт theturkeystudio@gmail.com, на випадок помилок або якщо ви правовласник, і хочете обговорити умови розміщення треку на сайті.",
  "Питання по навігації можете задати до нашого ШІ✨",
  "Фан-арти безкоштовні, для роздрукування! 🎨",
  "Розблокуйте переваги з Стихія+ та Стихія+ Ультра!",
  "Ви знаєте, що за рандомний текст, можна отримати досягнення?",
  "Скиньте мені в фейсбук, картинку до треків деяких, а також моторошнішу історію, бо моя не дуже :)",
  "У вас характер Ніцерона, індика, чи кого?",
  "СлівкіШоу та Дизель шоу, це легенди.",
  "0 казино, 0 реклами, 0 політики.",
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

const SectionOrderContainer = styled.div`
  margin: 20px 0 30px 0;
  background: #ff005d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px #0001;
  @media (min-width: 1920px) {
    padding: 24px;
    h4 {
      font-size: 22px !important;
    }
    span,
    button {
      font-size: 18px !important;
    }
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [randomPhrase] = useState(
    () => LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)],
  );
  const [now, setNow] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAchivmentsOpen, setIsAchivmentsOpen] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

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
  const [weatherCards, setWeatherCards] = useState(() => {
    const savedCards = localStorage.getItem("weather_cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem("weather_cards", JSON.stringify(weatherCards));
  }, [weatherCards]);

  const fetchWeather = useCallback(
    async (cityData, isMain, lat = null, lon = null) => {
      try {
        let targetLat = lat;
        let targetLon = lon;
        let displayName = typeof cityData === "string" ? cityData : (cityData?.fullName || "Ваша локація");

        // Якщо передано об'єкт з Hero (з координатами)
        if (cityData && typeof cityData === "object" && cityData.lat) {
          targetLat = cityData.lat;
          targetLon = cityData.lon;
          displayName = cityData.fullName;
        } 
        // Якщо передано просто назву (старий метод або автозапуск)
        else if (typeof cityData === "string") {
          const geo = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityData}&count=1&language=uk`,
          );
          if (geo.data.results && geo.data.results[0]) {
            targetLat = geo.data.results[0].latitude;
            targetLon = geo.data.results[0].longitude;
            displayName = geo.data.results[0].name;
          } else {
            alert("Місто не знайдено в базі Open-Meteo");
            return;
          }
        }

        // Сам запит до погоди (залишається як був)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto&forecast_days=16`;
        const res = await axios.get(url);
        const d = res.data;

        const newCardData = {
          id: isMain ? "main-card" : Date.now(),
          isMain: isMain,
          locationName: displayName,
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
            date: new Date(t).toLocaleDateString("uk", { day: "numeric", month: "2-digit" }),
            day: new Date(t).toLocaleDateString("uk", { weekday: "short" }),
            temp_day: `${Math.round(d.daily.temperature_2m_max[i])}°C`,
            temp_night: `${Math.round(d.daily.temperature_2m_min[i])}°C`,
            iconPlaceholder: getWeatherIcon(d.daily.weather_code[i]),
          })),
        };

        setWeatherCards((prev) => {
          if (isMain) {
            const filtered = prev.filter((c) => !c.isMain);
            return [newCardData, ...filtered];
          } else {
            // Запобігаємо дублікатам
            const exists = prev.find(c => c.lat === targetLat && c.lon === targetLon);
            if (exists) return prev;
            if (prev.length >= 4) return prev;
            return [...prev, newCardData];
          }
        });
      } catch (error) {
        console.error("Помилка завантаження погоди", error);
      }
    },
    [getWeatherIcon] 
  );

  const getInitialLocation = useCallback(() => {
    if (!isLocationEnabled) {
      fetchWeather("Київ", true, 50.45, 30.52);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(
            null,
            true,
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        () => fetchWeather("Київ", true, 50.45, 30.52),
      );
    } else {
      fetchWeather("Київ", true, 50.45, 30.52);
    }
  }, [fetchWeather, isLocationEnabled]);

  useEffect(() => {
    getInitialLocation();
  }, [getInitialLocation]);

  useEffect(() => {
    weatherCards.forEach((card) => {
      if (!card.isMain && (!card.hourly || card.hourly.length === 0)) {
        fetchWeather(card.locationName, false);
      }
    });
  }, [weatherCards, fetchWeather]);
  const handleAddCityFromHero = (cityObj) => {
    if (!user) {
      alert("Створювати картки погоди можуть лише зареєстровані користувачі!");
      return;
    }
    fetchWeather(cityObj, false);
  };

  const [hideDeleteModalUntil, setHideDeleteModalUntil] = useState(() => {
    const val = localStorage.getItem("hideDeleteModalUntil");
    return val ? parseInt(val) : 0;
  });

  const handleDeleteCard = (id) => {
    const now = Date.now();
    if (hideDeleteModalUntil > now) {
      setWeatherCards((prev) => prev.filter((card) => card.id !== id));
      return;
    }
    let hours = 1;
    const ask = window.confirm(
      "Ви дійсно хочете видалити картку погоди?\n\nВи можете приховати це підтвердження на певний час.\n\nНатисніть ОК для видалення, або Скасувати для відміни.",
    );
    if (ask) {
      let input = window.prompt(
        "Скільки годин не показувати це підтвердження? (1-72)",
        "1",
      );
      if (input !== null) {
        const num = Math.max(1, Math.min(72, parseInt(input)));
        hours = isNaN(num) ? 1 : num;
        localStorage.setItem(
          "hideDeleteModalUntil",
          (now + hours * 3600 * 1000).toString(),
        );
        setHideDeleteModalUntil(now + hours * 3600 * 1000);
      }
      setWeatherCards((prev) => prev.filter((card) => card.id !== id));
    }
  };

  const handleRefreshCard = (card) => {
    if (card.isMain) {
      getInitialLocation();
    } else {
      fetchWeather(card.locationName, false);
    }
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3500);
    const removeTimer = setTimeout(() => setIsLoading(false), 5300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleRegister = (userData) => {
    setUser(userData);
    setIsModalOpen(false);
  };
  const handleLogin = (savedUser) => {
    setUser(savedUser);
    setIsLoginOpen(false);
  };
  const handleUpdateUser = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
    setCurrentAvatar(userDefault);
    localStorage.removeItem("currentAvatar");
    setIsSettingsModalOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const month = new Intl.DateTimeFormat("uk", { month: "2-digit" }).format(now);
  const weekday = capitalize(
    new Intl.DateTimeFormat("uk", { weekday: "long" }).format(now),
  );
  const heroDateString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${weekday}, ${now.getDate()}.${month}.${now.getFullYear()}`;
  const DEFAULT_SITE_SECTIONS = [
    { key: "weather", label: "Погода" },
    { key: "map", label: "Кліматична мапа" },
    { key: "puzzles", label: "Пазли" },
    { key: "aihelp", label: "AI-допомога" },
    { key: "news", label: "Новини" },
    { key: "music", label: "Музика" },
    { key: "fanart", label: "FanArt" },
  ];
  const [siteSections, setSiteSections] = useState([...DEFAULT_SITE_SECTIONS]);
  const moveSiteSection = (idx, dir) => {
    setSiteSections((prev) => {
      const arr = [...prev];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };
  const resetSiteSections = () => setSiteSections([...DEFAULT_SITE_SECTIONS]);

  return (
    <>
      {isLoading && (
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
      )}

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
              user={user}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              currentAvatar={currentAvatar}
              onLogout={handleLogout}
            />
          </div>

          <Hero
            heroDateString={heroDateString}
            onAddCity={handleAddCityFromHero}
          />

          <div className="container">
            <SettingsContainer>
              <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
                Налаштування підтвердження видалення картки погоди
              </h4>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <label
                  htmlFor="hideDeleteModalHours"
                  style={{ fontWeight: 500 }}
                >
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
                      Math.min(72, parseInt(e.target.value)),
                    );
                    const newUntil = Date.now() + val * 3600 * 1000;
                    localStorage.setItem(
                      "hideDeleteModalUntil",
                      newUntil.toString(),
                    );
                    setHideDeleteModalUntil(newUntil);
                  }}
                  style={{
                    width: 60,
                    fontSize: 16,
                    borderRadius: 6,
                    border: "1px solid #aaa",
                    padding: "2px 8px",
                  }}
                />
                <button
                  style={{
                    marginLeft: 10,
                    padding: "4px 12px",
                    borderRadius: 8,
                    border: "1px solid #aaa",
                    background: "#ffe0b2",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    localStorage.removeItem("hideDeleteModalUntil");
                    setHideDeleteModalUntil(0);
                  }}
                >
                  Показувати завжди
                </button>
                {hideDeleteModalUntil > Date.now() && (
                  <span
                    style={{
                      color: "#ff7b00",
                      fontWeight: 500,
                      marginLeft: 10,
                    }}
                  >
                    Активно ще{" "}
                    {Math.ceil((hideDeleteModalUntil - Date.now()) / 3600000)}{" "}
                    год.
                  </span>
                )}
              </div>
            </SettingsContainer>
            <SectionOrderContainer>
              <h4 style={{ fontWeight: 700, fontSize: 16, margin: "15px" }}>
                Порядок секцій сайту:
              </h4>
              {siteSections.map((section, idx) => (
                <div
                  key={section.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ minWidth: 120, fontWeight: 500 }}>
                    {section.label}
                  </span>
                  <button
                    style={{
                      fontSize: "16px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      border: "1px solid #aaa",
                      background: "#eee",
                      marginLeft: 8,
                      cursor: idx === 0 ? "not-allowed" : "pointer",
                    }}
                    disabled={idx === 0}
                    onClick={() => moveSiteSection(idx, -1)}
                    title="Вище"
                  >
                    ↑
                  </button>
                  <button
                    style={{
                      fontSize: "16px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      border: "1px solid #aaa",
                      background: "#eee",
                      marginLeft: 4,
                      cursor:
                        idx === siteSections.length - 1
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={idx === siteSections.length - 1}
                    onClick={() => moveSiteSection(idx, 1)}
                    title="Нижче"
                  >
                    ↓
                  </button>
                </div>
              ))}
              <button
                style={{
                  marginTop: 10,
                  padding: "6px 18px",
                  borderRadius: "8px",
                  border: "1px solid #aaa",
                  background: "#ffe0b2",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={resetSiteSections}
              >
                Скинути порядок
              </button>
            </SectionOrderContainer>
            {siteSections.map((section) => {
              if (section.key === "weather") {
                return (
                  <WeatherCardsContainer key="weather">
                    {weatherCards.map((card) => {
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
                            pointBackgroundColor: "rgba(255, 179, 108, 1)",
                            pointBorderColor: "#fff",
                          },
                        ],
                      };
                      const chartOptions = {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          x: { display: true, grid: { display: false } },
                          y: { display: true, grid: { display: false } },
                        },
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
                          chartOptions={chartOptions}
                          chartData={chartData}
                          handleRefreshCard={handleRefreshCard}
                          handleDeleteCard={handleDeleteCard}
                          setIsLocationEnabled={setIsLocationEnabled}
                        />
                      );
                    })}
                  </WeatherCardsContainer>
                );
              }
              if (section.key === "map") return <ClimateMap key="map" />;
              if (section.key === "puzzles") return <Puzzles key="puzzles" />;
              if (section.key === "aihelp")
                return <Aihelp key="aihelp" isDarkMode={isDarkMode} />;
              if (section.key === "news") return <News key="news" />;
              if (section.key === "music")
                return (
                  <MusicPhoto
                    key="music"
                    user={user}
                    onOpenRegister={() => setIsModalOpen(true)}
                  />
                );
              if (section.key === "fanart")
                return (
                  <FanArt
                    key="fanart"
                    isDarkMode={isDarkMode}
                    user={user}
                    onOpenRegister={() => setIsModalOpen(true)}
                  />
                );
              return null;
            })}
          </div>
          {isModalOpen && (
            <Modal
              onClose={() => setIsModalOpen(false)}
              onRegister={handleRegister}
              availableAvatars={AVAILABLE_AVATARS}
            />
          )}
          {isLoginOpen && (
            <LoginModal
              onClose={() => setIsLoginOpen(false)}
              onLogin={handleLogin}
            />
          )}
          {isSettingsModalOpen && user && (
            <UserSettingsModal
              onClose={() => setIsSettingsModalOpen(false)}
              user={user}
              availableAvatars={AVAILABLE_AVATARS}
              onUpdate={handleUpdateUser}
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
        </div>
      </ThemeWrapper>
    </>
  );
};
export default App;