import React from 'react';
import { connect } from 'react-redux';
import is from 'is_js';


class Footer extends React.Component {
    render() {
        return (
            <div className="footer-wrap">
                <footer id="footer">
                    <div className="copyright">
                        <span>Example project for graduate thesis. Feel free to use and modify.</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;
