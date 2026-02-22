import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import MusicPhoto from "./components/MusicPhoto/MusicPhoto.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Modal from "./components/Modals/Modal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import UserSettingsModal from "./components/Modals/UserSettingsModal.jsx";
import userDefault from "./photos/hero-header/user.webp";
import VipModal from "./components/Modals/VipModal.jsx";
import Aihelp from "./components/Aihelp.jsx/Aihelp.jsx";
import FanArt from "./components/FanArt/FanArt.jsx";
import ShopModal from "./components/Modals/ShopModal.jsx";
import AchivmentsModal from "./components/Modals/AchivmentsModal.jsx";
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
  monody, turkeys, nicerone, horrordog, vovk, finances,
  parol, horse, lebid, dragons, rooster, soloveyko, dizel, flame,
];

const CITY_PLAYLIST = [
  "Берлін",
  "Варшава",
  "Київ",
  "Лондон",
  "Нью-Йорк",
  "Париж",
  "Токіо"
];
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
`;

const LoaderImage = styled.img`
  width: 122%;
  height: auto;
  margin-right: 1%;
  border-radius: 20px;
  animation: pulse 3s infinite ease-in-out;
  display: block;

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.015); opacity: 0.9; }
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
    background: linear-gradient(to end, rgba(0,0,0,0.85) 0%, transparent 100%);
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
    0% { width: 0%; }
    100% { width: 100%; }
  }
`;

const LoaderText = styled.p`
  color: #fff;
  margin-top: 15px;
  letter-spacing: 3px;
  font-size: 15px;
  font-weight: bold;
  opacity: 0.8;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  text-align: center;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

const ThemeWrapper = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#121212" : "transparent")};
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
    &:hover { background: #555; }
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
`;

const ForecastRow = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  &::-webkit-scrollbar { height: 5px; }
  &::-webkit-scrollbar-thumb { background: #888; border-radius: 5px; }
`;

const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  min-width: 60px;
  font-size: 12px;
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAchivmentsOpen, setIsAchivmentsOpen] = useState(false);
  
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

  const fetchWeather = useCallback(async (city, isMain, lat = null, lon = null) => {
    try {
      let targetLat = lat;
      let targetLon = lon;
      let displayName = city || "Ваша локація";

      if (city) {
        const geo = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=uk`);
        if (geo.data.results && geo.data.results[0]) {
          targetLat = geo.data.results[0].latitude;
          targetLon = geo.data.results[0].longitude;
          displayName = geo.data.results[0].name;
        } else {
          alert("Місто не знайдено");
          return;
        }
      }
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto&forecast_days=16`;
      const res = await axios.get(url);
      const d = res.data;
      const newCardData = {
        id: isMain ? "main-card" : Date.now(),
        isMain: isMain,
        locationName: displayName,
        current: {
          temp: `${Math.round(d.current.temperature_2m)}°C`,
          feels_like: `${Math.round(d.current.apparent_temperature)}°C`,
          humidity: `${d.current.relative_humidity_2m}%`,
          pressure: `${Math.round(d.current.surface_pressure)} hPa`,
          wind_speed: `${d.current.wind_speed_10m} м/с`,
          uv_index: d.daily.uv_index_max[0],
          description: "За кодом: " + d.current.weather_code,
          iconPlaceholder: getWeatherIcon(d.current.weather_code)
        },
        hourly: d.hourly.time.slice(0, 12).map((t, i) => ({
          time: new Date(t).getHours() + ":00",
          temp: `${Math.round(d.hourly.temperature_2m[i])}°C`,
          iconPlaceholder: getWeatherIcon(d.hourly.weather_code[i]) 
        })),
        daily16: d.daily.time.map((t, i) => ({
          date: new Date(t).toLocaleDateString("uk", { day: "numeric", month: "2-digit" }),
          day: new Date(t).toLocaleDateString("uk", { weekday: "short" }),
          temp_day: `${Math.round(d.daily.temperature_2m_max[i])}°C`,
          temp_night: `${Math.round(d.daily.temperature_2m_min[i])}°C`,
          description: "Код " + d.daily.weather_code[i],
          iconPlaceholder: getWeatherIcon(d.daily.weather_code[i]) 
        }))
      };
      setWeatherCards((prev) => {
        if (isMain) {
          const filtered = prev.filter(c => !c.isMain);
          return [newCardData, ...filtered];
        } else {
          if (prev.find(c => c.locationName === displayName)) return prev;
          if (prev.length >= 4) return prev;
          return [...prev, newCardData];
        }
      });
    } catch (error) {
      console.error("Помилка завантаження погоди", error);
    }
  }, []);

  const getInitialLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(null, true, position.coords.latitude, position.coords.longitude);
        },
        () => fetchWeather("Київ", true, 50.45, 30.52)
      );
    } else {
      fetchWeather("Київ", true, 50.45, 30.52);
    }
  }, [fetchWeather]);
  useEffect(() => {
    getInitialLocation();
  }, [getInitialLocation]);

  const handleAddCityFromHero = (cityName) => {
    const cityInPlaylist = CITY_PLAYLIST.find(
      (c) => c.toLowerCase() === cityName.toLowerCase()
    );
    fetchWeather(cityInPlaylist || cityName, false);
  };

  const handleDeleteCard = (id) => {
    setWeatherCards((prev) => prev.filter(card => card.id !== id));
  };

  const handleRefreshCard = (card) => {
    if (card.isMain) {
      getInitialLocation();
    } else {
      fetchWeather(card.locationName, false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
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

  const handleRegister = (userData) => { setUser(userData); setIsModalOpen(false); };
  const handleLogin = (savedUser) => { setUser(savedUser); setIsLoginOpen(false); };
  const handleUpdateUser = (userData) => { setUser(userData); };
  const handleLogout = () => {
    setUser(null);
    setCurrentAvatar(userDefault);
    localStorage.removeItem("currentAvatar");
    setIsSettingsModalOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const month = new Intl.DateTimeFormat("uk", { month: "2-digit" }).format(now);
  const weekday = capitalize(new Intl.DateTimeFormat("uk", { weekday: "long" }).format(now));
  const heroDateString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${weekday}, ${now.getDate()}.${month}.${now.getFullYear()}`;

  if (isLoading) {
    return (
      <LoaderWrapper>
        <LoaderContent>
          <LoaderImage src={loadimage} alt="Loading..." />
          <div className="mobile-loader-bar" style={{ width: '100%' }}>
            <ProgressContainer><ProgressBar /></ProgressContainer>
            <LoaderText>TurkeyStudio Presents...</LoaderText>
          </div>
          <LoaderOverlay className="desktop-loader-bar">
            <ProgressContainer><ProgressBar /></ProgressContainer>
            <LoaderText>TheTurkeyStudio Presents...</LoaderText>
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

  return (
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
          <WeatherCardsContainer>
            {weatherCards.map((card) => (
              <WeatherCard key={card.id} $isMain={card.isMain} $isDarkMode={isDarkMode}>
                <CardHeader $isMain={card.isMain}>
                  <h3>{card.locationName} {card.isMain && "📍"}</h3>
                  <ActionButtons>
                    <button onClick={() => handleRefreshCard(card)}>↺</button>
                    {!card.isMain && (
                      <button onClick={() => handleDeleteCard(card.id)}>🗑</button>
                    )}
                  </ActionButtons>
                </CardHeader>

                <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                  <ImagePlaceholder size="80px">{card.current.iconPlaceholder}</ImagePlaceholder>
                  <div>
                    <h1 style={{ margin: "0 0 5px 0" }}>{card.current.temp}</h1>
                    <p style={{ margin: "0", fontSize: "12px" }}>Відчувається: {card.current.feels_like}</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px", marginBottom: "20px" }}>
                  <div>Вологість: <b>{card.current.humidity}</b></div>
                  <div>Вітер: <b>{card.current.wind_speed}</b></div>
                  <div>Тиск: <b>{card.current.pressure}</b></div>
                  <div>УФ-індекс: <b>{card.current.uv_index}</b></div>
                </div>

                <h4 style={{ margin: "0 0 10px 0" }}>Годинний прогноз:</h4>
                <ForecastRow>
                  {card.hourly.map((hour, idx) => (
                    <ForecastItem key={idx}>
                      <span>{hour.time}</span>
                      <ImagePlaceholder size="40px" fontSize="18px">{hour.iconPlaceholder}</ImagePlaceholder>
                      <span>{hour.temp}</span>
                    </ForecastItem>
                  ))}
                </ForecastRow>

                <h4 style={{ margin: "15px 0 10px 0" }}>Прогноз на 16 днів:</h4>
                <div style={{ maxHeight: "150px", overflowY: "auto", paddingRight: "10px" }}>
                  {card.daily16.map((day, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", fontSize: "12px", borderBottom: "1px solid #444", paddingBottom: "5px" }}>
                      <span style={{ width: "40px" }}>{day.date}</span>
                      <span style={{ width: "30px", fontWeight: "bold" }}>{day.day}</span>
                      <ImagePlaceholder size="30px" margin="0 10px" fontSize="14px">{day.iconPlaceholder}</ImagePlaceholder>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span>Д: {day.temp_day}</span>
                        <span style={{ color: "#aaa" }}>Н: {day.temp_night}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </WeatherCard>
            ))}
          </WeatherCardsContainer>

          <Aihelp isDarkMode={isDarkMode} />
          <MusicPhoto user={user} onOpenRegister={() => setIsModalOpen(true)} />
          <FanArt isDarkMode={isDarkMode} user={user} onOpenRegister={() => setIsModalOpen(true)} />
        </div>

        <Footer toggleTheme={toggleTheme} />

        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onRegister={handleRegister} availableAvatars={AVAILABLE_AVATARS} />}
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />}
        {isSettingsModalOpen && user && <UserSettingsModal onClose={() => setIsSettingsModalOpen(false)} user={user} availableAvatars={AVAILABLE_AVATARS} onUpdate={handleUpdateUser} />}
        {isVipModalOpen && <VipModal onClose={() => setIsVipModalOpen(false)} />}
        {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} hasVip={!!user} />}
        {isAchivmentsOpen && <AchivmentsModal onClose={() => setIsAchivmentsOpen(false)} isDarkMode={isDarkMode} />}
      </div>
    </ThemeWrapper>
  );
};

export default App;