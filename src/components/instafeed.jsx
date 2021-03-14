import React, { Component } from "react";
import Feed from "react-instagram-authless-feed"

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                </div>
            );
        }
        return this.props.children;
    }
}

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
                    <div className="row no-gutters justify-content-center">
                        <ErrorBoundary>
                            <Feed userName="roka_fella" className="Feed row justify-content-center pb-5" classNameLoading="Loading" limit="3" />
                        </ErrorBoundary>
                    </div>
                </div>
            </section>
        );
    }
}