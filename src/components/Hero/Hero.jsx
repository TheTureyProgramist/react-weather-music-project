import { useState } from "react";
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
  background-image: linear-gradient(
      to right,
      rgba(47, 48, 58, 0),
      rgba(47, 48, 58, 0)
    ),
    url(${hills});
  background-repeat: no-repeat;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
`;

const HeroText = styled.h2`
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
`;

const HeroFix = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const HeroDate = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 8px;
  display: block;
  width: 175px;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 11px;
    width: 262px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
    width: 395px;
  }
`;

const HeroLine = styled.div`
  display: none;
  @media (min-width: 768px) {
    width: 2px;
    height: 75px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1px;
    display: flex;
    flex-shrink: 0;
  }
`;

const HeroLineMobile = styled.div`
  width: 2px;
  @media (min-width: 768px) {
    display: none;
  }
  height: 100px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1px;
  flex-shrink: 0;
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
`;

const HeroInput = styled.input`
  width: 173px;
  height: 20px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 9px;
  color: #878787;
  padding-left: 30px;
  background: #d9d9d9;
  border-radius: 10px 0 0 10px;
  @media (min-width: 768px) {
    width: 402px;
    height: 25px;
    font-size: 14px;
  }
  @media (min-width: 1200px) {
    width: 629px;
    height: 42px;
  }
`;

const HeroFormater = styled.div`
  display: flex;
`;
const HeroDecors = styled.div`
  display: flex;
`;
const HeroDecor = styled.div`
  display: flex;
  gap: 23px;
`;
const HeroBlue = styled.div`
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  color: skyblue;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 40px;
  }
`;
const HeroYellow = styled.div`
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  color: gold;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 40px;
  }
`;
const HeroButton = styled.button`
  position: relative;
  border-radius: 0 10px 10px 0;
  width: 20px;
  height: 22px;
  padding: 0;
  background: yellow url(${search}) center/60% no-repeat;
  border: 2px solid black;
  transition: all 0.5s cubic-bezier(1, -1.84, 0.31, 1.84);
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
  &::after {
    content: "+";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
    transition: opacity 200ms ease, transform 200ms ease;
    pointer-events: none;
    z-index: 2;
    font-size: 18px;
    font-weight: bold;
    color: #000;
  }

  &:hover {
    background-image: none;
    background-color: skyblue;
  }
  &:hover::after {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  @media (min-width: 768px) {
    width: 28px;
    height: 26px;
    &::after {
      font-size: 20px;
    }
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 43px;
    &::after {
      font-size: 24px;
    }
  }
`;

const Hero = ({ heroDateString, onAddCity }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      if (onAddCity) {
        onAddCity(inputValue.trim());
      }
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <HeroDiv>
      <HeroDecors>
        <HeroBlue>Сти</HeroBlue>
        <HeroYellow>хія</HeroYellow>
      </HeroDecors>
      <HeroTitle>
        Безкоштовна панель погоди, музики, фан-артів, технологіями ШІ та системою 🧧 та 🏆.
      </HeroTitle>
      <HeroDecor>
        <HeroLineMobile />
        <HeroFix>
          <HeroText>
            Створіть свій особистий список погодних умов у 3 точках світу.
          </HeroText>
          <HeroLine />
          <HeroDate>{heroDateString}</HeroDate>
        </HeroFix>
      </HeroDecor>
      <HeroFormater>
        <HeroInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Уведіть місто, яке вам треба"
        />
        <HeroButton onClick={handleSearch}></HeroButton>
      </HeroFormater>
    </HeroDiv>
  );
};
export default Hero;