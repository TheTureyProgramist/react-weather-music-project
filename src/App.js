import { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import byesun from './photos/hero-header/byesun.webp';
import search from './photos/hero-header/search.webp'
const Header = styled.div`
height: 80px;
`

//------------------------------
const Hero = styled.div`
  position: relative;
  width: 100%;
  min-height: 620px;
  gap: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const HeroText = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 500;
  width: 345px;
  display: block;
  margin: 0;
`
const HeroFix = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 52px;
  padding: 18px 12px;
  flex-wrap: wrap;
`
const HeroDate = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 8px;
  display: block;
  width: 340px;
  font-family: var(--font-family);
  font-size: 24px;
  font-weight: 500;
`
const HeroLine = styled.div`
  width: 2px;
  height: 98px;
  background: rgba(255,255,255,0.95);
  border-radius: 1px;
  flex-shrink: 0;
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
  font-size: 40px;
  color: #fff;
  margin: 0;
  z-index: 2;
`
const HeroInput = styled.input`
width: 625px;
height: 42px;
font-family: var(--font-family);
font-weight: 500;
font-size: 14px;
color: #878787;
padding-left: 30px;
background: #d9d9d9;
z-index: 2;
border-radius: 10px;
`
const HeroFormater = styled.div`
display: flex;`
const HeroSvg = styled.img``
const HeroButton = styled.button``
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
//----------------------------------------
const InfoModal = styled.div``
class App extends Component {
  state = { now: new Date() }

  componentDidMount() {
    this._timer = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render () {
  const now = this.state.now;
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const month = capitalize(new Intl.DateTimeFormat('uk', { month: 'long' }).format(now));
  const weekday = capitalize(new Intl.DateTimeFormat('uk', { weekday: 'long' }).format(now));
  const year = now.getFullYear();
  const day = now.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());
  const heroDateString = `${hour}:${minute}:${second} ${weekday}, ${day} ${month} ${year}`;
  return (
    <div className="App">
     <div className="container">
      <Header></Header>
      {/* ----------------------------------------- */}
      <Hero>
       <HeroImage src={byesun} />
       <HeroTitle>Приладова панель погоди</HeroTitle>
       <HeroFix>
       <HeroText>Створіть свій особистий список улюблених міст і завжди будьте в курсі погоди.</HeroText>
       <HeroLine></HeroLine>
       <HeroDate>{heroDateString}</HeroDate>
       </HeroFix>
       <HeroFormater>
       <HeroInput placeholder='Уведіть місто, яке вам треба'/>
       <HeroButton style={{backgroundImage: `url(${search})`}}></HeroButton>
       </HeroFormater>
      </Hero>
    {/* ------------------------ */}
      <Main></Main>
      {/* ----------------------- */}
      <Graphic></Graphic>
      {/* --------------------- */}
      <MusicPhoto></MusicPhoto>
      {/* ---------------------------- */}
      <Slider></Slider>
      {/* --------------------- */}
      <Footer></Footer>
      {/* //----------------------------------------------- */}
      <Modal></Modal>
      {/* //---------------------------------------- */}
      <InfoModal></InfoModal>
     </div>
    </div>
  );
}
}
export default App;