import { Component } from 'react';
import './App.css';
import styled from 'styled-components'
const Header = styled.div``
const Hero = styled.div``
const Main = styled.div``
const Graphic = styled.div``
const MusicPhoto = styled.div``
const Slider = styled.div``
const Footer = styled.div``
const Modal = styled.div``
class App extends Component {
  state = {}
  render () {
  return (
    <div className="App">
     <Header></Header>
     <Hero></Hero>
     <Main></Main>
     <Graphic></Graphic>
     <MusicPhoto></MusicPhoto>
     <Slider></Slider>
     <Footer></Footer>
     <Modal></Modal>
    </div>
  );
}
}
export default App;