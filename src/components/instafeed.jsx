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
                        <InstagramFeed token="IGQVJVZAlc1cjZAYZAzc5SGl2QlVYQkR5ZAHN1X0tYMEEtSVBCcmhPLVNZAeUhDdXRxTkFaTnJheHNHaGVvLUV3b2k4RWxBOUdWMy1zQmh3UzZAabzRHQ29POU9Vc0lfV0doU0VncU1zTk53Y2hYbXYzOTVWOQZDZD" counter="6" />
                    </div>
                </div>
            </section>
        );
    }
}