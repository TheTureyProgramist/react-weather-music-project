import { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Main from "./components/Main/Main.jsx";
import GraphicDaily from "./components/Graphics/GraphicWeekly.jsx";
import GraphicWeekly from "./components/Graphics/GraphicWeekly.jsx";
import GraphicAtTheMoment from "./components/Graphics/GraphicAtTheMoment.jsx";
import MusicPhoto from "./components/MusicPhoto/MusicPhoto.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Modal from "./components/Modals/Modal.jsx";
import InfoModal from "./components/Modals/InfoModal.jsx";
class App extends Component {
  state = { now: new Date() };

  componentDidMount() {
    this._timer = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    const now = this.state.now;
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const month = capitalize(
      new Intl.DateTimeFormat("uk", { month: "2-digit" }).format(now),
    );
    const weekday = capitalize(
      new Intl.DateTimeFormat("uk", { weekday: "long" }).format(now),
    );
    const year = now.getFullYear();
    const day = now.getDate();
    const pad = (n) => String(n).padStart(2, "0");
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    const heroDateString = `${hour}:${minute}:${second} ${weekday}, ${day}.${month}.${year}`;
    return (
      <div className="App">
        <div className="container">
          <Header />
        </div>
        <Hero heroDateString={heroDateString} />
        <div className="container">
          <Main />
          <GraphicAtTheMoment></GraphicAtTheMoment>
          <GraphicDaily />
          <GraphicWeekly />
          <MusicPhoto />
        </div>
        <Footer />
        <Modal />
        <InfoModal />
      </div>
    );
  }
}
export default App;
