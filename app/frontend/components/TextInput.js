import React, { PropTypes } from 'react';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalVisible: false,
        };
        this.toggleAdditionalBox = this.toggleAdditionalBox.bind(this);
    }

    toggleAdditionalBox(e) {
        e.preventDefault();
        this.setState({
            additionalVisible: !this.state.additionalVisible,
        });
    }

    render() {
        const { additionalInfo, label, errorMsg, type, placeholder, hasError } = this.props;
        const wrapperClassName = hasError ? 'form-item form-error' : 'form-item';
        const { additionalVisible } = this.state;
        return (
            <div className={wrapperClassName}>
                <label htmlFor="form-input" className="form-label">
                    {label}{additionalInfo && <a href="#" className="info-anchor" onClick={this.toggleAdditionalBox}>?</a>}
                </label>
                <input
                    type={type || 'text'} className="form-input"
                    autocapitalize="off"
                    placeholder={placeholder || ''}
                    {...this.props}
                />
                {hasError && <span className="form-error__message">{errorMsg}</span>}
                {additionalVisible && <div className="form-additional">
                    {additionalInfo.title && <p className="subparagraph form-additional__title">{additionalInfo.title}</p>}
                    <p className="subparagraph form-additional__text">{additionalInfo.text}</p>
                    {additionalInfo.anchor &&
                    <a
                        href="https://www.nanit.com/safety-and-security"
                        target="_blank"
                        className="anchor form-additional__anchor">{additionalInfo.anchor}
                    </a>
                    }
                </div>}
            </div>
        );
    }
};

TextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
    type: PropTypes.string,
    hasError: PropTypes.bool,
    additionalInfo: PropTypes.object,
};

export default TextInput;
