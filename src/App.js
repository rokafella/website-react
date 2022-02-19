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
import Privacy from './components/privacy';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
      <Router basename="/">
        <Routes>
          <Route exact path="/trackmyscore" element={<Privacy />} />
          <Route path="/" element={<><Navbar /><Home /><About /><Resume /><InstaFeed /><Contact /><Footer /><Loader /></>} />
        </Routes>
      </Router>
    )
  }
}

export default App;
