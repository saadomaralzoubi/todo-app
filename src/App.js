import "./App.css";
import React from "react";

import ToDo from "./components/todo/todo";

import Header from "./components/header/header.js";
import StateProvider from "./context/context";
export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <StateProvider>
          <ToDo />
        </StateProvider>
      </>
    );
  }
}
