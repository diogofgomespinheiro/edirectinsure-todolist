//Library imports
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//Component imports
import Header from "./components/Header";
import Routes from "./routes";
import Alert from "./components/Alert";

//Redux
import store from "./store/store";

//Style imports
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <BrowserRouter>
          <Header />
          <div className="content">
            <Alert />
            <Routes />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
