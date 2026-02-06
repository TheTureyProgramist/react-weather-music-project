import { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import byesun from './photos/hero-header/byesun.webp';
const Header = styled.div`
height: 80px;
`

//------------------------------
const Hero = styled.div`
  position: relative;
  width: 100%;
  min-height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const HeroText = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-family);
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`
const HeroFix = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
`
const HeroDate = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 8px;
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 500;
`
const HeroLine = styled.div`
`
const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.6);
`
const HeroTitle = styled.h1`
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 32px;
  color: #fff;
  margin: 0;
  z-index: 2;
`

//-------------------------------
const Main = styled.div``

//--------------------------------
const Graphic = styled.div``

//-------------------------------
const MusicPhoto = styled.div``

//------------------------------
const Slider = styled.div``

//-----------------------------
const Footer = styled.div``

//-----------------------------
const Modal = styled.div``

class App extends Component {
  state = {}
  render () {
  const now = new Date();
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const month = capitalize(new Intl.DateTimeFormat('uk', { month: 'long' }).format(now));
  const weekday = capitalize(new Intl.DateTimeFormat('uk', { weekday: 'long' }).format(now));
  const year = now.getFullYear();
  const day = now.getDate();
  const heroDateString = `${weekday}, ${day} ${month} ${year}`;
  return (
    <div className="App">
     <div className="container">
      <Header></Header>
      <Hero>
       <HeroImage src={byesun} />
       <HeroTitle>Приладова панель погоди</HeroTitle>
       <HeroFix>
       <HeroText>Створіть свій особистий список улюблених міст і завжди будьте в курсі погоди.</HeroText>
       <HeroLine></HeroLine>
       <HeroDate>{heroDateString}</HeroDate>
       </HeroFix>
      </Hero>
      <Main></Main>
      <Graphic></Graphic>
      <MusicPhoto></MusicPhoto>
      <Slider></Slider>
      <Footer></Footer>
      <Modal></Modal>
     </div>
    </div>
  );
}
}
export default App;