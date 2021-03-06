import React, { Component } from 'react';
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about"

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Home />
        <About />
      </>
    )
  }
}

export default App;
