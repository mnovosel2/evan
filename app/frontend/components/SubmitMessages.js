import React, { PropTypes } from 'react';
import Alert from './Alert';


const SubmitMessages = (props) => {
    return (
        <div className="component-wrapper">
            {props.submitting && <Alert text={props.submittingMsg} />}
            {(props.success && !props.submitting) && <Alert text={props.successMsg} />}
            {props.fail && <Alert text={props.failMsg} />}
        </div>
    );
};

SubmitMessages.propTypes = {
    submitting: PropTypes.bool,
    success: PropTypes.bool,
    fail: PropTypes.bool,
    submittingMsg: PropTypes.string,
    successMsg: PropTypes.string,
    failMsg: PropTypes.string,
};


export default SubmitMessages;
