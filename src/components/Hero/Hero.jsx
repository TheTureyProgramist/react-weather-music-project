import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import hills from "../../photos/hero-header/hiils.jpg";

const slideUpHero = keyframes`
  0% { transform: translateY(120px) scale(1.4); }
  100% { transform: translateY(0) scale(1); }
`;

const fadeInContent = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const HeroDiv = styled.div`
  position: relative;
  width: 100%;
  min-height: 360px;
  gap: 40px;
  margin-top: 50px;
  margin-bottom: 35px;
  display: flex;
  background-size: cover;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${hills});
  background-repeat: no-repeat;
  background-position: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;

  @media (min-width: 768px) {
    gap: 35px;
    margin-bottom: 50px;
    margin-top: 70px;
  }
  @media (min-width: 1200px) {
    gap: 80px;
    min-height: 620px;
    margin-bottom: 80px;
    margin-top: 80px;
  }
  @media (min-width: 1920px) {
    min-height: 1200px;
    margin-top: 133px;
    margin-bottom: 120px;
    gap: 120px;
  }
`;

const HeroDecors = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(120px) scale(1.4);
  animation: ${(props) =>
    props.$start ? css`${slideUpHero} 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards` : "none"};
`;

const LogoText = styled.div`
  display: flex;
`;

const CollectorText = styled.div`
  font-family: var(--font-family);
  color: #ffb36c;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  margin-top: 5px;
  font-size: 8px;
  opacity: 0;
  animation: ${(props) =>
    props.$start ? css`${fadeInContent} 1s ease-out forwards` : "none"};
  animation-delay: ${(props) => (props.$start ? "2.5s" : "0s")};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    font-size: 12px;
    letter-spacing: 4px;
    margin-top: 8px;
  }
  @media (min-width: 1200px) {
    font-size: 16px;
    letter-spacing: 6px;
    margin-top: 12px;
  }
  @media (min-width: 1920px) {
    font-size: 24px;
    letter-spacing: 10px;
    margin-top: 20px;
  }
`;

const DelayedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  opacity: 0;
  animation: ${(props) =>
    props.$start ? css`${fadeInContent} 1s ease-out forwards` : "none"};
  animation-delay: ${(props) => (props.$start ? "3s" : "0s")};

  @media (min-width: 768px) {
    gap: 25px;
  }
  @media (min-width: 1200px) {
    gap: 50px;
  }
  @media (min-width: 1920px) {
    gap: 80px;
  }
`;

const HeroBlue = styled.div`
  color: skyblue;
  font-weight: 600;
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 40px;
  }
  @media (min-width: 1920px) {
    font-size: 90px;
  }
`;

const HeroYellow = styled.div`
  color: gold;
  font-weight: 600;
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 40px;
  }
  @media (min-width: 1920px) {
    font-size: 90px;
  }
`;

const HeroTitle = styled.h1`
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 10px;
  color: #fff;
  width: 250px;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 15px;
    width: 450px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
    width: 650px;
  }
  @media (min-width: 1920px) {
    font-size: 42px;
    width: 1400px;
    line-height: 1.3;
  }
`;
const HeroDecor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const HeroFix = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

const HeroTextLink = styled.a`
  color: #fff;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  text-align: center;
  width: auto;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 11px;
    flex: 1; 
    text-align: right;
    padding-right: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
    padding-right: 30px;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
    padding-right: 50px;
  }
`;
const HeroDate = styled.div`
  color: #fff;
  font-size: 10px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 11px;
    flex: 1; 
    text-align: left;
    padding-left: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
    padding-left: 30px;
  }
  @media (min-width: 1920px) {
    font-size: 34px;
    padding-left: 50px;
  }
`;

const DownloadAppsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5px;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const DownloadAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 179, 108, 0.5);
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 179, 108, 0.2);
    transform: translateY(-2px);
    border-color: #ffb36c;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
`;

const HeroFormater = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
`;

const HeroInput = styled.input`
  width: 173px;
  height: 20px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 9px;
  color: #222;
  padding-left: 30px;
  background: #d9d9d9;
  border-radius: 10px 0 0 10px;
  border: none;
  outline: none;
  @media (min-width: 768px) {
    width: 402px;
    height: 25px;
    font-size: 14px;
  }
  @media (min-width: 1200px) {
    width: 629px;
    height: 42px;
  }
  @media (min-width: 1920px) {
    width: 1000px;
    height: 90px;
    font-size: 32px;
    padding-left: 60px;
    border-radius: 20px 0 0 20px;
  }
`;
const HeroButton = styled.button`
  position: relative;
  border-radius: 0 10px 10px 0;
  width: 20px;
  height: 22px;
  background: ${(props) => (props.disabled ? "#ccc" : "yellow")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  line-height: 1;
  font-size: 20px;
  color: black;
  transition: all 0.7s ease-in-out;
  overflow: hidden; 
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "skyblue")};
    color: ${(props) => (props.disabled ? "black" : "transparent")};
  }
  ${(props) =>
    !props.disabled &&
    css`
      &:hover::after {
        content: "+";
        position: absolute;
        color: black;
        font-size: 22px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}

  @media (min-width: 768px) {
    width: 28px;
    height: 26px;
    font-size: 22px;
    &:hover::after { font-size: 24px; }
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 43px;
    font-size: 30px;
    &:hover::after { font-size: 34px; }
  }
  @media (min-width: 1920px) {
    width: 95px;
    height: 94px;
    border-radius: 0 20px 20px 0;
    border-width: 4px;
    font-size: 60px;
    &:hover::after { font-size: 70px; }
  }
`;
const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: calc(100% - 2px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 0 0 15px 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: skyblue;
    border-radius: 10px;
  }
  @media (min-width: 1920px) {
    padding: 20px;
    gap: 15px;
    max-height: 500px;
  }
`;

const SuggestionItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 15px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
  &:hover {
    background: skyblue;
    color: white;
    transform: translateX(5px);
  }
  @media (min-width: 1920px) {
    font-size: 26px;
    padding: 20px 30px;
    border-radius: 15px;
  }
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => (props.disabled ? "#eee" : "gold")};
  color: ${(props) => (props.disabled ? "#999" : "black")};
  border: 2px solid ${(props) => (props.disabled ? "#ccc" : "#b8860b")};
  border-radius: 8px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin-top: 5px;
  font-size: 13px;
  &:hover {
    background: ${(props) => (props.disabled ? "#eee" : "#ffcc00")};
  }
  @media (min-width: 1920px) {
    font-size: 24px;
    padding: 25px;
    border-width: 4px;
  }
`;
const Hero = ({ heroDateString, onAddCity, startAnimation, user }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [limit, setLimit] = useState(5);
  const [showList, setShowList] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const searchRef = useRef(null);
  const API_KEY = "5104647d3e574f4a3f23c0aa092eb2b9";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (currentLimit, value) => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${currentLimit}&appid=${API_KEY}`,
      );
      const data = await response.json();
      if (data.length < currentLimit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setSuggestions(data);
      setShowList(true);
    } catch (error) {
      console.error("Помилка API:", error);
    }
  };

  useEffect(() => {
    setLimit(5);
    setHasMore(true);
    const timeoutId = setTimeout(() => {
      if (inputValue) fetchSuggestions(5, inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newLimit = limit + 5;
    setLimit(newLimit);
    fetchSuggestions(newLimit, inputValue);
  };

  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSelect = (city) => {
    if (cooldown > 0) return;

    const cityObj = {
      name: city.name,
      fullName: `${city.name}${city.state ? `, ${city.state}` : ""} (${
        city.country
      })`,
      lat: city.lat,
      lon: city.lon,
    };
    onAddCity(cityObj);
    setInputValue("");
    setSuggestions([]);
    setShowList(false);
    setCooldown(40);
  };
  return (
    <HeroDiv>
      <HeroDecors $start={startAnimation}>
        <LogoText>
          <HeroBlue>Сти</HeroBlue>
          <HeroYellow>хія</HeroYellow>
        </LogoText>
        <CollectorText $start={startAnimation}>Видання дракона</CollectorText>
      </HeroDecors>

      <DelayedContent $start={startAnimation}>
        <HeroTitle>
          Погода, музика, фан-арти, ШІ, системи: 🧧, 🏆.
        </HeroTitle>

        <HeroDecor>
          <HeroFix>
            <HeroTextLink
              href="https://www.facebook.com/groups/33984901414490236/?notif_id=1770630384341499&notif_t=group_milestone&ref=notif"
              target="_blank"
            >
              Мій фейсбук канал. Натисніть.
            </HeroTextLink>
            <HeroDate>{heroDateString}</HeroDate>
          </HeroFix>
        </HeroDecor>

        <DownloadAppsContainer>
        </DownloadAppsContainer>
        {user && (
          <DownloadAppsContainer>
            <DownloadAppButton href="/downloads/stykhiya-pc.exe" download="stykhiya-pc.exe" title="Завантажити для Windows">
              💻 Скачати для ПК
            </DownloadAppButton>
            <DownloadAppButton href="/downloads/stykhiya-mobile.apk" download="stykhiya-mobile.apk" title="Завантажити для Android">
              📱 Мобільний додаток
            </DownloadAppButton>
          </DownloadAppsContainer>
        )}

        <SearchWrapper ref={searchRef}>
          <HeroFormater>
            <SearchContainer>
              <HeroInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowList(true)}
                placeholder={cooldown > 0 ? `Зачекайте ${cooldown}с` : "Уведіть місто, село."}
                disabled={cooldown > 0}
              />
              {showList && suggestions.length > 0 && (
                <SuggestionsList>
                  {suggestions.map((city, index) => (
                    <SuggestionItem
                      key={`${city.lat}-${city.lon}-${index}`}
                      onClick={() => handleSelect(city)}
                    >
                      📍 {city.name}
                      {city.state ? `, ${city.state}` : ""} ({city.country})
                    </SuggestionItem>
                  ))}

                  {hasMore ? (
                    <LoadMoreButton onClick={handleLoadMore}>
                      ⬇ Завантажити ще варіанти
                    </LoadMoreButton>
                  ) : (
                    <LoadMoreButton disabled>Кінець списку</LoadMoreButton>
                  )}
                </SuggestionsList>
              )}
            </SearchContainer>
            <HeroButton
              onClick={() => suggestions[0] && handleSelect(suggestions[0])}
            disabled={cooldown > 0}
            >
            {cooldown > 0 ? cooldown : "⌕"}
            </HeroButton>
          </HeroFormater>
        </SearchWrapper>
      </DelayedContent>
    </HeroDiv>
  );
};

export default Hero;
