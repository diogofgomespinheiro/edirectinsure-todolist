//Library imports
import React from "react";
import { BrowserRouter } from "react-router-dom";

//Component imports
import Header from "./components/Header";
import Routes from "./routes";

//Style imports
import "./App.scss";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
