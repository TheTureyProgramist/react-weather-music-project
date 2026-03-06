import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import hills from "../../photos/hero-header/hiils.jpg";
import search from "../../photos/hero-header/search.webp";

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
    linear-gradient(to right, rgba(47, 48, 58, 0), rgba(47, 48, 58, 0)),
    url(${hills});
  background-repeat: no-repeat;
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

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
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
  font-family: var(--font-family);

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

const HeroTextLink = styled.a`
  color: #fff;
  text-align: center;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  width: 206px;
  display: block;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 11px;
    width: 229px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
    width: 395px;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
    width: 800px;
    margin-top: 20px;
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
  background: yellow url(${search}) center/60% no-repeat;
  border: 2px solid black;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 28px;
    height: 26px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 43px;
  }
  @media (min-width: 1920px) {
    width: 95px;
    height: 94px;
    border-radius: 0 20px 20px 0;
    border-width: 4px;
  }
`;

const HeroDecors = styled.div`
  display: flex;
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

const HeroDecor = styled.div`
  display: flex;
  gap: 23px;
`;

const HeroLineMobile = styled.div`
  width: 2px;
  height: 100px;
  background: rgba(255, 255, 255, 0.95);
  @media (min-width: 768px) {
    display: none;
  }
`;

const HeroFix = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (min-width: 1920px) {
    gap: 100px;
  }
`;

const HeroDecorsFix = styled.div``;

const HeroText = styled.h2`
  color: #fff;
  font-size: 10px;
  width: 206px;
  text-align: center;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 11px;
    width: 229px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
    width: 395px;
  }
  @media (min-width: 1920px) {
    font-size: 34px;
    width: 800px;
  }
`;

const HeroLine = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 2px;
    height: 105px;
    background: white;
  }
  @media (min-width: 1920px) {
    height: 150px;
    width: 4px;
  }
`;

const HeroDate = styled.div`
  color: #fff;
  font-size: 10px;
  @media (min-width: 768px) {
    font-size: 11px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
  }
  @media (min-width: 1920px) {
    font-size: 34px;
  }
`;

const HeroFormater = styled.div`
  display: flex;
`;

const Hero = ({ heroDateString, onAddCity }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [limit, setLimit] = useState(5);
  const [showList, setShowList] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=${currentLimit}&appid=${API_KEY}`
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
const handleSelect = (city) => {
  const cityObj = {
    name: city.name,
    fullName: `${city.name}${city.state ? `, ${city.state}` : ""} (${city.country})`,
    lat: city.lat,
    lon: city.lon
  };
  onAddCity(cityObj); 
  setInputValue("");
  setSuggestions([]);
  setShowList(false);
};
  return (
    <HeroDiv>
      <HeroDecors>
        <HeroBlue>Сти</HeroBlue>
        <HeroYellow>хія</HeroYellow>
      </HeroDecors>

      <HeroTitle>
        Безкоштовна панель погоди, музики, фан-артів, технологіями ШІ та
        системою 🧧 та 🏆.
      </HeroTitle>

      <HeroDecor>
        <HeroLineMobile />
        <HeroFix>
          <HeroDecorsFix>
            <HeroText>
              Створіть особистий список погодних карток у 3 точках світу.
            </HeroText>
            <HeroTextLink
              href="https://www.facebook.com/share/g/15cVdicVtGc/"
              target="_blank"
            >
              Мій фейсбук канал. Долучайтесь.
            </HeroTextLink>
          </HeroDecorsFix>
          <HeroLine />
          <HeroDate>{heroDateString}</HeroDate>
        </HeroFix>
      </HeroDecor>

      <SearchWrapper ref={searchRef}>
        <HeroFormater>
          <SearchContainer>
            <HeroInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowList(true)}
              placeholder="Уведіть місто (напр. Попівка)"
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
          ></HeroButton>
        </HeroFormater>
      </SearchWrapper>
    </HeroDiv>
  );
};

export default Hero;