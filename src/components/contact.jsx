import React, { Component } from "react";

export default class Contact extends Component {
    render() {
        return (
            <section className="ftco-section contact-section ftco-no-pb" id="contact-section">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3" data-aos="fade-up">
                        <div className="col-md-7 heading-section text-center">
                            <h1 className="big big-2">Contact</h1>
                            <h2 className="mb-4">Contact Me</h2>
                            <p>Let's connect!</p>
                        </div>
                    </div>
                    <div className="row d-flex contact-info mb-5">
                        <div className="col-md-6 col-lg-3 d-flex" data-aos="zoom-in">
                            <div className="align-self-stretch box text-center p-4 shadow">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="icon-map-signs" />
                                </div>
                                <div>
                                    <h3 className="mb-4">Location</h3>
                                    <p>Cambridge, UK</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 d-flex" data-aos="zoom-in">
                            <div className="align-self-stretch box text-center p-4 shadow">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="icon-linkedin" />
                                </div>
                                <div>
                                    <h3 className="mb-4">LinkedIn</h3>
                                    <p><a href="https://www.linkedin.com/in/rohitkapoor13/" target="_blank" rel="noreferrer">rohitkapoor13</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 d-flex" data-aos="zoom-in">
                            <div className="align-self-stretch box text-center p-4 shadow">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="icon-paper-plane" />
                                </div>
                                <div>
                                    <h3 className="mb-4">Email Address</h3>
                                    <p><a href="mailto:info@rohitkapoor.dev">info@rohitkapoor.dev</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 d-flex" data-aos="zoom-in">
                            <div className="align-self-stretch box text-center p-4 shadow">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="icon-globe" />
                                </div>
                                <div>
                                    <h3 className="mb-4">Website</h3>
                                    <p><a href="https://rohitkapoor.dev" target="_blank" rel="noreferrer">rohitkapoor.dev</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}