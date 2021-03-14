import React, { Component } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import $ from 'jquery';
import "scrollax";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Resume from "./components/resume";
import InstaFeed from "./components/instafeed";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Loader from "./components/loader";

class App extends Component {
  componentDidMount() {
    AOS.init({
      duration: 800,
      easing: 'slide'
    });
    // Scrollax
    $.Scrollax();
  }

  render() {
    return (
      <>
        <Navbar />
        <Home />
        <About />
        <Resume />
        <InstaFeed />
        <Contact />
        <Footer />
        <Loader />
      </>
    )
  }
}

export default App;
