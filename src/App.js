import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Main from "./components/Main/Main.jsx";
import GraphicDaily from "./components/Graphics/GraphicDaily.jsx";
import GraphicWeekly from "./components/Graphics/GraphicWeekly.jsx";
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

const ThemeWrapper = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#121212" : "transparent")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "inherit")};
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding-bottom: 20px;
`;

const App = () => {
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
  const weekday = capitalize(new Intl.DateTimeFormat("uk", { weekday: "long" }).format(now));
  const heroDateString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} ${weekday}, ${now.getDate()}.${month}.${now.getFullYear()}`;
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
        <Hero heroDateString={heroDateString} toggleTheme={toggleTheme} />
        <div className="container">
          <Main />
          <GraphicDaily />
          <GraphicWeekly />
          <Aihelp isDarkMode={isDarkMode} />
          <MusicPhoto user={user} onOpenRegister={() => setIsModalOpen(true)} />
          <FanArt isDarkMode={isDarkMode} user={user} onOpenRegister={() => setIsModalOpen(true)} />
        </div>
        <Footer toggleTheme={toggleTheme} />

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

        {isVipModalOpen && <VipModal onClose={() => setIsVipModalOpen(false)} />}
        
        {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} hasVip={!!user} />}
        
        {isAchivmentsOpen && (
          <AchivmentsModal onClose={() => setIsAchivmentsOpen(false)} isDarkMode={isDarkMode} />
        )}
      </div>
    </ThemeWrapper>
  );
};

export default App;