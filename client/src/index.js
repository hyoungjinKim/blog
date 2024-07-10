import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadUser from "./components/auth/loadUser";

loadUser();
const rootNode = document.getElementById("root");

ReactDOM.render(<App />, rootNode);
