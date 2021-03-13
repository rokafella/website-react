import React, { Component } from "react";
import $ from 'jquery';

export default class Home extends Component {
    componentDidMount() {
        $(function () {
            $('.js-fullheight').css('height', $(window).height());
            $(window).on('resize', function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        });
    }

    handleClick(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('.goto-here').offset().top
        }, 500, "swing");
        return false;
    }

    render() {
        return (
            <section className="hero-wrap js-fullheight" style={{ height: '1129px' }}>
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight justify-content-center align-items-center" style={{ height: '1129px' }}>
                        <div className="col-lg-8 col-md-6 d-flex align-items-center">
                            <div className="text text-center">
                                <span className="subheading">Hey! I am</span>
                                <h1>Rohit Kapoor</h1>
                                <h2>I'm a <span className="txt-rotate" data-period={2000} data-rotate="[ &quot;Software Engineer.&quot;, &quot;Photographer.&quot;, &quot;Gamer.&quot;, &quot;Tech Enthusiast.&quot;, &quot;Traveler.&quot; ]"><span className="wrap" /></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mouse">
                    <button onClick={this.handleClick} className="mouse-icon"><div className="mouse-wheel"><span className="ion-ios-arrow-round-down" /></div></button>
                </div>
            </section>
        )
    }
}