import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as userActionCreators from '../actions/user';
import * as authActionCreators from '../actions/auth';
import { reduxForm } from 'redux-form';
import { history } from '../store/';
import is from 'is_js';
import TextInput from '../components/TextInput';
import { setTokenCookie, getTokenFromCookie } from '../helpers/auth';
import SubmitMessages from '../components/SubmitMessages';
import Alert from '../components/Alert';

class Login extends React.Component {
    componentWillUnmount() {
        this.props.resetFetchDataFail();
    }

    render() {
        const { handleSubmit, fields: { email, password, submitMsg }, submitting, signIn, fetchingDataFail, location, confirmEmailSuccess } = this.props;
        const isError = submitMsg.touched && submitMsg.error && !submitting;
        const action = location.query.action;
        const renderLogin = !action || action !== 'progress' || confirmEmailSuccess;

        return (
            <div className="component-wrapper">
                <SubmitMessages
                    submitting={submitting}
                    submittingMsg="Signing you in"
                    fail={isError}
                    failMsg={"Login failed"}
                />
                {renderLogin && <div className="p-login">
                    <div className="p-login__container container">
                        <div className="p-login__inner">
                            {(fetchingDataFail && !confirmEmailSuccess) &&
                            <Alert
                                isModal={true}
                                text="Something went wrong. Login and try again."
                            />}
                            <p className="subparagraph">
                                Hello. Sign in with to manage APIs</p>
                            <div className="p-login__container">
                                <form onSubmit={handleSubmit(signIn)} className="p-login__form">
                                    <TextInput
                                        placeholder="Email"
                                        hasError={email.touched && email.error}
                                        errorMsg={email.error}
                                        {...email}
                                    />
                                    <TextInput
                                        type="password"
                                        placeholder="Password"
                                        hasError={password.touched && password.error}
                                        errorMsg={password.error}
                                        {...password}
                                    />
                                    <div className="form-item">
                                        <input
                                            disabled={submitting}
                                            type="submit"
                                            className="btn btn--primary"
                                            value="Log in"
                                        />
                                    </div>
                                </form>
                                <p>or <Link to="/register" className="anchor">Create an account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingDataFail: state.auth.fetchingDataFail,
        confirmEmailSuccess: state.user.confirmEmailSuccess,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (values) => {
            return new Promise((resolve, reject) => {
                dispatch(userActionCreators.logInRequest(values))
                    .then((response) => {
                        if (response.payload.data.ok) {
                            let token = response.payload.data.login.token;
                            if (token) {
                                setTokenCookie(token);
                                dispatch(userActionCreators.logInSuccess(response.payload));
                                history.push('/');
                            } else {
                                reject({
                                    submitMsg: 'Login failed. Try again',
                                    _error: 'Login failed',
                                });
                            }
                        } else {
                            dispatch(userActionCreators.logInFail(response.payload));
                            reject({
                                submitMsg: 'Login failed. Try again',
                                _error: 'Login failed',
                            });
                        }
                    });
            });
        },
        resetFetchDataFail: () => {
            dispatch(authActionCreators.fetchDataReset());
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

Login.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    resetFetchDataFail: PropTypes.func.isRequired,
    fetchingDataFail: PropTypes.bool,
};
export default reduxForm({
    form: 'login',
    fields: ['email', 'password', 'submitMsg'],
    validate,
}, mapStateToProps, mapDispatchToProps)(Login);
