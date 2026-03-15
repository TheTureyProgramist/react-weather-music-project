// import "modern-normalize/modern-normalize.css";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import "./index.css";
// import App from "./App.js";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter basename="/react-weather-music-project"> 
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
import "modern-normalize/modern-normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; 
import "./index.css";
import App from "./App.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter> 
      <App />
    </HashRouter>
  </React.StrictMode>
);