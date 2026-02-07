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
  font-size: 24px;
  font-weight: 500;
  width: 345px;
  display: block;
  margin: 0;
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
  width: 355px;
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 500;
`;

const HeroLine = styled.div`
  width: 2px;
  height: 95px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1px;
  flex-shrink: 0;
`;

const HeroTitle = styled.h1`
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 40px;
  color: #fff;
  margin: 0;
`;

const HeroInput = styled.input`
  width: 629px;
  height: 42px;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 14px;
  color: #878787;
  padding-left: 30px;
  background: #d9d9d9;
  border-radius: 10px 0 0 10px;
`;

const HeroFormater = styled.div`
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
      <HeroFix>
        <HeroText>Створіть свій особистий список улюблених міст і завжди будьте в курсі погоди.</HeroText>
        <HeroLine></HeroLine>
        <HeroDate>{heroDateString}</HeroDate>
      </HeroFix>
      <HeroFormater>
        <HeroInput placeholder="Уведіть місто, яке вам треба" />
        <HeroButton></HeroButton>
      </HeroFormater>
    </HeroDiv>
  );
};

export default Hero;
