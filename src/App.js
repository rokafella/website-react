import React, { Component } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about"

class App extends Component {
  componentDidMount() {
    AOS.init({
      duration: 800,
      easing: 'slide'
    });
  }

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
