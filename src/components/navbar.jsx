import React, { Component } from "react";
import $ from 'jquery';

export default class Navbar extends Component {
    componentDidMount() {
        $(function () {
            $('body').on('click', '.js-fh5co-nav-toggle', function (event) {
                event.preventDefault();

                if ($('#ftco-nav').is(':visible')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 70
                }, 500);
            });

            $(window).on('scroll', function () {
                var $w = $(this),
                    st = $w.scrollTop(),
                    navbar = $('.ftco_navbar'),
                    sd = $('.js-scroll-wrap');

                if (st > 150) {
                    if (!navbar.hasClass('scrolled')) {
                        navbar.addClass('scrolled');
                    }
                }
                if (st < 150) {
                    if (navbar.hasClass('scrolled')) {
                        navbar.removeClass('scrolled sleep');
                    }
                }
                if (st > 350) {
                    if (!navbar.hasClass('awake')) {
                        navbar.addClass('awake');
                    }

                    if (sd.length > 0) {
                        sd.addClass('sleep');
                    }
                }
                if (st < 350) {
                    if (navbar.hasClass('awake')) {
                        navbar.removeClass('awake');
                        navbar.addClass('sleep');
                    }
                    if (sd.length > 0) {
                        sd.removeClass('sleep');
                    }
                }
            });
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="index.html"><span>R</span>ohit</a>
                    <button className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu" /> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav nav ml-auto">
                            <li className="nav-item"><a href="#home-section" className="nav-link"><span>Home</span></a></li>
                            <li className="nav-item"><a href="#about-section" className="nav-link"><span>About</span></a></li>
                            <li className="nav-item"><a href="#resume-section" className="nav-link"><span>Resume</span></a></li>
                            <li className="nav-item"><a href="#contact-section" className="nav-link"><span>Contact</span></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}