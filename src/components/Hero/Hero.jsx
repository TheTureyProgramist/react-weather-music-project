import styled from 'styled-components';
import byesun from '../../photos/hero-header/byesun.webp';
import search from '../../photos/hero-header/search.webp';
const HeroDiv = styled.div`
  position: relative;
  width: 100%;
  min-height: 620px;
  gap: 80px;
  margin-bottom: 80px;
  display: flex;
  background-size: cover;
  background-image: linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)), url(${byesun});
  background-color: #2f303a;
  background-repeat: no-repeat;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeroText = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  width: 136px;
  display: block;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 14px;
    width: 172px;
  }
    @media (min-width: 1200px) {
    font-size: 24px;
    width: 345px;
  }  
`;

const HeroFix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 52px;
  flex-wrap: wrap;
`;

const HeroDate = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 8px;
  display: block;
  width: 155px;
  font-family: var(--font-family);
  font-size: 10px;
  font-weight: 500;
  
  @media (min-width: 768px) {
    font-size: 14px;
    width: 172px;
  }
    @media (min-width: 1200px) {
    font-size: 24px;
    width: 355px;
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
  height: 95px;
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
height: 31px;
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
const HeroDecor = styled.div`
display: flex;
`;
const HeroButton = styled.button`
  border-left: 2px solid #000;
  border-radius: 0 10px 10px 0;
  width: 45px;
  height: 50px;
  padding: 0;
  background: #ffb36c url(${search}) center/60% no-repeat;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: inline-block;
  cursor: pointer;
`;

const Hero = ({ heroDateString }) => {
  return (
    <HeroDiv>
      <HeroTitle>Приладова панель погоди</HeroTitle>
      <HeroDecor>
       <HeroLineMobile/>
      <HeroFix>
        <HeroText>Створіть свій особистий список улюблених міст і завжди будьте в курсі погоди.</HeroText>
        <HeroLine/>
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
