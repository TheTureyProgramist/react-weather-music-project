import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Main from "./components/Main/Main.jsx";
import GraphicDaily from "./components/Graphics/GraphicDaily.jsx";
import GraphicWeekly from "./components/Graphics/GraphicWeekly.jsx";
import GraphicAtTheMoment from "./components/Graphics/GraphicAtTheMoment.jsx";
import MusicPhoto from "./components/MusicPhoto/MusicPhoto.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Modal from "./components/Modals/Modal.jsx";
import LoginModal from "./components/Modals/LoginModal.jsx";
import InfoModal from "./components/Modals/InfoModal.jsx";
import UserSettingsModal from "./components/Modals/UserSettingsModal.jsx";
import userDefault from "./photos/hero-header/user.webp";
// import VipModal from "./components/Modals/VipModal.jsx";
const AVAILABLE_AVATARS = [
  userDefault, userDefault, userDefault, 
  userDefault, userDefault, userDefault, userDefault 
];
const ThemeWrapper = styled.div`
  background-color: ${props => props.$isDarkMode ? '#121212' : 'transparent'};
  color: ${props => props.$isDarkMode ? '#ffffff' : 'inherit'};
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding-bottom: 20px;
`;
const App = () => {
  const [now, setNow] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('registered_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentAvatar, setCurrentAvatar] = useState(() => {
    const saved = localStorage.getItem('currentAvatar');
    return saved || userDefault;
  });
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('registered_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  useEffect(() => {
    localStorage.setItem('currentAvatar', currentAvatar);
  }, [currentAvatar]);
  const handleRegister = (userData) => {
    const newUser = {
      account: userData.account,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      avatar: userData.avatar
    };
    setUser(newUser);
    setCurrentAvatar(userData.avatar);
    localStorage.setItem('registered_user', JSON.stringify(newUser));
  };
  const handleLogin = (savedUser) => {
    setUser(savedUser);
    setCurrentAvatar(savedUser.avatar);
    setIsLoginOpen(false);
  };
  const handleUpdateUser = (userData) => {
    const updated = { ...user, ...userData };
    setUser(updated);
    setCurrentAvatar(userData.avatar);
    localStorage.setItem('registered_user', JSON.stringify(updated));
  };
  const handleLogout = () => {
    setUser(null);
    setCurrentAvatar(userDefault);
    localStorage.removeItem('user');
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
            user={user}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            currentAvatar={currentAvatar}
            onLogout={handleLogout}
          />
        </div>
        <Hero heroDateString={heroDateString} toggleTheme={toggleTheme}/>
        <div className="container">
          <Main />
          <GraphicAtTheMoment />
          <GraphicDaily />
          <GraphicWeekly />
          <MusicPhoto />
        </div>
        <Footer toggleTheme={toggleTheme}/>
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
            currentAvatar={currentAvatar}
            availableAvatars={AVAILABLE_AVATARS}
            onUpdate={handleUpdateUser}
          />
        )}
        <InfoModal />
      </div>
    </ThemeWrapper>
  );
};
export default App;