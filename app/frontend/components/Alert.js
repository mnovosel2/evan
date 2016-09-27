import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Alert extends React.Component {
    componentDidMount() {
        TweenLite.to(window, 0.8, {scrollTo: 0, ease: Power4.easeOut});
    }

    render() {
        const { isModal, text, button } = this.props;
        return (
            <div className={isModal ? 'alert alert--modal' : 'alert'}>
                <div className="alert__inner">
                    <p className="alert__text">{text}
                        {button && <span><Link className="btn btn--secondary" to="/">{button}</Link></span>}
                    </p>
                    <div className="alert__options">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}


Alert.propTypes = {
    isModal: PropTypes.bool,
    text: PropTypes.string.isRequired,
    button: PropTypes.string,
};

export default Alert;
