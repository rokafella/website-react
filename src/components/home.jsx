import React, { Component } from "react";
import $ from 'jquery';

export default class Home extends Component {
    componentDidMount() {
        $(function () {
            $('.js-fullheight').css('height', $(window).height());
            $(window).on('resize', function () {
                $('.js-fullheight').css('height', $(window).height());
            });

            class TxtRotate {
                constructor(el, toRotate, period) {
                    this.toRotate = toRotate;
                    this.el = el;
                    this.loopNum = 0;
                    this.period = parseInt(period, 10) || 2000;
                    this.txt = '';
                    this.tick();
                    this.isDeleting = false;
                }
                tick() {
                    var i = this.loopNum % this.toRotate.length;
                    var fullTxt = this.toRotate[i];

                    if (this.isDeleting) {
                        this.txt = fullTxt.substring(0, this.txt.length - 1);
                    } else {
                        this.txt = fullTxt.substring(0, this.txt.length + 1);
                    }

                    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

                    var that = this;
                    var delta = 300 - Math.random() * 100;

                    if (this.isDeleting) { delta /= 2; }

                    if (!this.isDeleting && this.txt === fullTxt) {
                        delta = this.period;
                        this.isDeleting = true;
                    } else if (this.isDeleting && this.txt === '') {
                        this.isDeleting = false;
                        this.loopNum++;
                        delta = 500;
                    }

                    setTimeout(function () {
                        that.tick();
                    }, delta);
                }
            }


            var elements = document.getElementsByClassName('txt-rotate');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }

            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
            document.body.appendChild(css);
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