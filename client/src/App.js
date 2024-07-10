import React from "react";
import { Provider } from "react-redux";
import store, { history } from "./store";
import MyRouter from "./routes/Router";
import { Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MyRouter />
      </Router>
    </Provider>
  );
};

export default App;
