import React, { Component } from "react";
import $ from 'jquery';

export default class Loader extends Component {
    componentDidMount() {
        $(function () {
            setTimeout(function () {
                if ($('#ftco-loader').length > 0) {
                    $('#ftco-loader').removeClass('show');
                }
            }, 1);
        });
    }

    render() {
        return (
            <div id="ftco-loader" className="fullscreen">
                <svg className="circular" width="48px" height="48px">
                    <circle className="path-bg" cx={24} cy={24} r={22} fill="none" strokeWidth={4} stroke="#eeeeee" />
                    <circle className="path" cx={24} cy={24} r={22} fill="none" strokeWidth={4} strokeMiterlimit={10} stroke="#F96D00" />
                </svg>
            </div>
        )
    }
}