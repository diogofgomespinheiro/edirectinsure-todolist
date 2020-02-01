//Library imports
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//Component imports
import Header from "./components/Header";
import Routes from "./routes";
import Alert from "./components/Alert";

//Redux
import store from "./store/store";
import { getUser } from "./store/modules/auth/actions";

//Style imports
import "./App.scss";

function App() {
  useEffect(() => {
    store.dispatch(getUser(localStorage.getItem("token")));
  }, []);

  return (
    <Provider store={store}>
      <div className="main-container">
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
