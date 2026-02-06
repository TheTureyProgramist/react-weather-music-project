import { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import byesun from './photos/hero-header/byesun.webp';
const Header = styled.div``

//------------------------------
const Hero = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`
const Image = styled.img`
 width: 100%;
  height: auto;
  display: block;
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
  return (
    <div className="App">
     <div className="container">
      <Header></Header>
      <Hero>
       <Image src={byesun} />
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