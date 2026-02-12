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
    linear-gradient(to right, rgba(47, 48, 58, 0), rgba(47, 48, 58, 0)), url(${hills});
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
  width: 166px;
  display: block;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 14px;
    width: 229px;
  }
  @media (min-width: 1200px) {
    font-size: 24px;
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
    font-size: 14px;
    width: 262px;
  }
  @media (min-width: 1200px) {
    font-size: 24px;
    width: 395px;
  }
`;

const HeroLine = styled.div`
  display: none;
  @media (min-width: 768px) {
    width: 2px;
    height: 95px;
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
  font-size: 14px;
  color: #fff;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 40px;
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
  width: 173px;
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
  border-radius: 0 10px 10px 0;
  width: 20px;
  height: 22px;
  padding: 0;
  background: #ffb36c url(${search}) center/20% no-repeat;
  border: 2px solid black;
  transition: background 0.5s cubic-bezier(1, -1.84, 0.31, 1.84);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: inline-block;
  cursor: pointer;

  &: hover {
    background: green url(${search}) center/50% no-repeat;
  }
  @media (min-width: 768px) {
    width: 28px;
    height: 26px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 43px;
  }
`;

const Hero = ({ heroDateString }) => {
  return (
    <HeroDiv>
      <HeroDecors>
      <HeroBlue>Сти</HeroBlue><HeroYellow>хія</HeroYellow>
      </HeroDecors>
      <HeroTitle>Приладова панель погоди</HeroTitle>
      <HeroDecor>
        <HeroLineMobile />
        <HeroFix>
          <HeroText>
            Створіть свій особистий список погодних умов у багатьох точках світу.
          </HeroText>
          <HeroLine />
          <HeroDate>{heroDateString}</HeroDate>
        </HeroFix>
      </HeroDecor>
      <HeroFormater>
        <HeroInput placeholder="Уведіть місто, яке вам треба" />
        <HeroButton></HeroButton>
      </HeroFormater>
    </HeroDiv>
  );
};

export default Hero;
