import React, { Component } from "react";
import InstagramFeed from 'react-ig-feed'
import 'react-ig-feed/dist/index.css'

export default class InstaFeed extends Component {
    render() {
        return (
            <section className="ftco-section ftco-no-pb" id="feed-section">
                <div className="container-fluid px-md-0" data-aos="fade-up">
                    <div className="row no-gutters justify-content-center pb-5">
                        <div className="col-md-12 heading-section text-center">
                            <h2 className="mb-4">Some recent 📸</h2>
                            <p>Follow on instagram for more!</p>
                        </div>
                    </div>
                    <div className="row justify-content-center" data-aos="fade-zoom-in">
                        <InstagramFeed token="IGQVJVbC01NVF3TnloSVZACUlJvd3BHYno2YzNqdlNGT0EtaDkyV3UxcFBPRThXMjZAwQS1EaE5SLWlNOEpGYVN0ZAGo0WGNNREVickw5aDhDTEp5VDJ0MWZAsU0UxcG1Ka295Vkt2YjM0d09aV3hjR0hRegZDZD" counter="6" />
                    </div>
                </div>
            </section>
        );
    }
}