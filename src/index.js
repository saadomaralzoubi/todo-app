import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const Main = () => <App />;

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
