import React, { Component, useState } from "react";
import { Waypoint } from 'react-waypoint';
import AnimatedNumber from "react-animated-numbers"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: 0
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    handleEnter() {
        this.setState({ years: new Date().getUTCFullYear() - 2016 })
    }

    handleExit() {
        this.setState({ years: 0 })
    }

    render() {
        return (
            <section className="ftco-about img ftco-section ftco-no-pt ftco-no-pb" id="about-section">
                <div className="container">
                    <div className="row d-flex no-gutters">
                        <div className="col-md-6 col-lg-6 d-flex">
                            <div className="img-about img d-flex align-items-stretch">
                                <div className="overlay" />
                                <div className="img d-flex align-self-stretch align-items-center" style={{ backgroundImage: 'url(./images/about.jpg)' }}>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 pl-md-5 py-5" data-aos="fade-up">
                            <div className="row justify-content-start pb-3">
                                <div className="col-md-12 heading-section ftco-animate fadeInUp ftco-animated">
                                    <h1 className="big">About</h1>
                                    <h2 className="mb-4">About Me</h2>
                                    <p>A random collection of atoms finding its way through stardust.</p>
                                    <ul className="about-info mt-4 px-md-0 px-2">
                                        <li className="d-flex"><span>Name:</span> <span>Rohit Kapoor</span></li>
                                        <li className="d-flex"><span>Location:</span> <span>Cambridge UK</span></li>
                                        <li className="d-flex"><span>Currently @:</span> <span>Amazon Web Services</span></li>
                                        <li className="d-flex"><span>Email:</span> <span>info@rohitkapoor.dev</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="counter-wrap ftco-animate d-flex mt-md-3 fadeInUp ftco-animated">
                                <Waypoint onEnter={this.handleEnter} onLeave={this.handleExit}>
                                    <div className="text" >
                                        <div className="mb-4">
                                            <span className="number"><AnimatedNumber animateToNumber={this.state.years} animationType={"calm"} delay={200} /> + </span>
                                            <span> Years of experience</span>
                                        </div>
                                    </div>
                                </Waypoint>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}