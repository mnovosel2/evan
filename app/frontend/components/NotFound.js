import React from 'react';
import { Link } from 'react-router';
import Footer from '../containers/Footer';

const NotFound = (props) => {
    const { query } = props.location;
    const isError = Boolean(query && query.error);
    const title = (query && query.error) ? 'Something went wrong :(' : '404 Page Not Found';

    return (
        <div className="component-wrapper">
            <div className="p-notfound b-grey sticky-footer">
                <div className="element element--offset">
                    <div className="container element__heading">
                        <h1>{title}</h1>
                    </div>
                    <div className="element__inner">
                        <div className="container">
                            <div className="message">
                                <p>We apologize, but it seems an unexpected error has occurred.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NotFound;
