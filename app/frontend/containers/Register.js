import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as userActionCreators from '../actions/user';
import * as authActionCreators from '../actions/auth';
import { reduxForm } from 'redux-form';
import is from 'is_js';
import TextInput from '../components/TextInput';
import SubmitMessages from '../components/SubmitMessages';
import PreviousPageLink from '../components/PreviousPageLink';

class Register extends React.Component {
    componentWillUnmount() {
        this.props.resetFetchDataFail();
        this.props.resetRegister();
    }

    render() {
        const { handleSubmit, fields: { email, password, firstName, lastName, submitMsg }, submitting, register, registerSuccess, clientSecret } = this.props;
        const isError = submitMsg.touched && submitMsg.error && !submitting;

        return (
            <div className="component-wrapper">
                <SubmitMessages
                    submitting={submitting}
                    submittingMsg="Creating account..."
                    fail={isError}
                    failMsg={"Register failed"}
                />
                <div className="form b-grey invite-form p-register">
                    <div className="form__content container">
                        <div className="form__heading">
                            <h2 className="form__title">Register</h2>
                            <PreviousPageLink />
                        </div>
                        {!registerSuccess && <form className="form__wrapper element" onSubmit={handleSubmit(register)}>
                            <TextInput
                                label="Email"
                                {...email}
                            />
                            <TextInput
                                label="Password"
                                type="password"
                                {...password}
                            />
                            <TextInput
                                label="First name"
                                {...firstName}
                            />
                            <TextInput
                                label="Last name"
                                {...lastName}
                            />
                            <input
                                disabled={submitting}
                                type="submit"
                                className="btn btn--primary"
                                value="Register"
                            />
                        </form>}
                        {(registerSuccess && clientSecret) &&
                            <div className="form__wrapper element client-secret">
                                <h2>This is your client secret</h2>
                                <p>Copy client secret code and use it as only argument when initializing <em>evan-agent</em></p>
                                <p className="p-bold">{clientSecret}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        fetchingDataFail: state.auth.fetchingDataFail,
        registerSuccess: state.user.registerSuccess,
        clientSecret: state.user.clientSecret,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        register: (values) => {
            return new Promise((resolve, reject) => {
                dispatch(userActionCreators.registerRequest(values))
                    .then((response) => {
                        if (response.payload.data.ok) {
                                dispatch(userActionCreators.registerSuccess(response.payload));
                                resolve();
                        } else {
                            dispatch(userActionCreators.registerFail(response.payload));
                            reject({
                                submitMsg: 'Register failed. Try again',
                                _error: 'Register failed',
                            });
                        }
                    });
            });
        },
        resetFetchDataFail: () => {
            dispatch(authActionCreators.fetchDataReset());
        },
        resetRegister: () => {
            dispatch(userActionCreators.registerReset());
        },
    };
};

const validate = (values) => {
    const errors = {};
    if ((is.undefined(values.email) || !is.email(values.email) || values.email.trim() === '') && (is.undefined(values.name) || values.name.trim() === '')) {
        errors.email = 'Entered email is not valid';
        errors.password = 'Enter a valid password';
    } else if (is.undefined(values.email) || !is.email(values.email) || values.email.trim() === '') {
        errors.email = 'Entered email is not valid';
    } else if (is.undefined(values.password) || values.password.trim() === '') {
        errors.password = 'Enter a valid password';
    }
    return errors;
};

Register.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    resetFetchDataFail: PropTypes.func.isRequired,
    fetchingDataFail: PropTypes.bool,
};
export default reduxForm({
    form: 'register',
    fields: ['email', 'password','firstName', 'lastName', 'submitMsg'],
    validate,
}, mapStateToProps, mapDispatchToProps)(Register);
