import React, { Component } from "react";
import $ from 'jquery';

export default class Resume extends Component {
    componentDidMount() {
        $(function () {
            //variable that will hold the href attr of the links in the menu
            var sections = [];
            //variable that stores the id of the section
            var id = false;
            //variable for the selection of the anchors in the navbar
            var $navbara = $('#navi a');

            $navbara.on('click', function (e) {
                //prevent the page from refreshing
                e.preventDefault();
                //set the top offset animation and speed
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 180
                }, 500);
            });

            //select all the anchors in the navbar one after another
            $navbara.each(function () {
                // and adds them in the sections variable
                sections.push($($(this).attr('href')));
            })
            $(window).on('scroll', function (e) {
                // scrollTop retains the value of the scroll top with the reference at the middle of the page
                var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
                //cycle through the values in sections array
                for (var i in sections) {
                    var section = sections[i];
                    //if scrollTop variable is bigger than the top offset of a section in the sections array then 
                    if (scrollTop > section.offset().top) {
                        var scrolled_id = section.attr('id');
                    }
                }
                if (scrolled_id !== id) {
                    id = scrolled_id;
                    $($navbara).removeClass('current');
                    $('#navi a[href="#' + id + '"]').addClass('current');
                }
            })
        });
    }

    render() {
        return (
            <section className="ftco-section ftco-no-pb goto-here" id="resume-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <nav id="navi">
                                <ul>
                                    <li><a href="#page-1">Experience</a></li>
                                    <li><a href="#page-2">Education</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-9">
                            <div id="page-1" className="page one">
                                <h2 className="heading">Experience</h2>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">Feb 2016 - Present</span>
                                        <h2>Sr. Software Development Engineer</h2>
                                        <span className="position">Amazon Web Services</span>
                                        <p>Currently working with high volume core AWS services like AWS CloudTrail and S3.</p>
                                    </div>
                                </div>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">Aug 2015 - Dec 2015</span>
                                        <h2>Graduate Teaching Assistant</h2>
                                        <span className="position">The Ohio State University</span>
                                        <p>Taught Introduction to Database Systems to undergraduate students.</p>
                                    </div>
                                </div>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">May 2015 - July 2015</span>
                                        <h2>SDE Intern</h2>
                                        <span className="position">Amazon Web Services</span>
                                        <p>Added new customer facing APIs which impacted millions of customers worldwide and was launched to production before the end of the internship.</p>
                                    </div>
                                </div>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">May 2013 - July 2013</span>
                                        <h2>Intern</h2>
                                        <span className="position">Compro Technologies</span>
                                        <p>Made a hybrid mobile application for Salesforce CRM.</p>
                                    </div>
                                </div>
                            </div>
                            <div id="page-2" className="page two">
                                <h2 className="heading">Education</h2>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">2014 - 2015</span>
                                        <h2>Master of Science in Computer Science &amp; Engineering</h2>
                                        <span className="position">The Ohio State University</span>
                                        <p>Columbus, USA</p>
                                    </div>
                                </div>
                                <div className="resume-wrap d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="icon d-flex align-items-center justify-content-center" data-aos="fade-up">
                                        <span className="flaticon-ideas" />
                                    </div>
                                    <div className="text pl-3" data-aos="fade-up">
                                        <span className="date">2010 - 2014</span>
                                        <h2>Bachelor of Science in Computer Science &amp; Engineering</h2>
                                        <span className="position">Amity University</span>
                                        <p>Noida, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}