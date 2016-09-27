import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as userActionCreators from '../actions/user';
import { redirect } from '../helpers/misc';
import { history } from '../store/';
import { getTokenFromCookie, deleteTokenCookie } from '../helpers/auth';

class Root extends React.Component {
    componentWillMount() {
        const token = getTokenFromCookie();
        if (token) {
            this.props.getUserFromToken();
        } else {
            redirect('/');
        }
    }

    componentWillUpdate(nextProps) {
        const token = getTokenFromCookie();
        const { pathname } = this.props.location;
        const isErrorPage = pathname.indexOf('404') !== -1;
        const isSuccessPage = pathname.indexOf('/invitation/success') !== -1;
        if ((nextProps.invitationAcceptFail || nextProps.confirmEmailFail) && !isErrorPage) {
            this.props.resetAcceptInvitation();
            this.props.resetConfirmEmail();
            redirect('404/?error=true');
        }
        if (nextProps.invitationAcceptSuccess && !isSuccessPage && !token) {
            this.props.resetAcceptInvitation();
            redirect('/invitation/success');
        }
    }

    componentWillUnmount() {
        this.props.resetGetUser();
    }

    render() {
        return (
            <div className="app">
                {this.props.children ? React.cloneElement(this.props.children, {...this.props}) : this.props.children}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        confirmEmailSuccess: state.user.confirmEmailSuccess,
        confirmEmailFail: state.user.confirmEmailFail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserFromToken: () => {
            dispatch(userActionCreators.getUserRequest())
                .then((response) => {
                    if (!response.error) {
                        dispatch(userActionCreators.getUserSuccess(response.payload));
                    } else {
                        deleteTokenCookie();
                        dispatch(userActionCreators.getUserFail(response.payload));
                        history.push('/login');
                    }
                });
        },
        resetGetUser: () => {
            dispatch(userActionCreators.getUserReset());
        },
        resetAcceptInvitation: () => {
            dispatch(invitationActionCreators.acceptInvitationReset());
        },
        resetConfirmEmail: () => {
            dispatch(userActionCreators.confirmEmailReset());
        },
    };
};

Root.propTypes = {
    children: PropTypes.node,
    getUserFromToken: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Root);

