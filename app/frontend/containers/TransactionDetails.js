import React, { PropTypes } from 'react';
import * as transactionsActionCreators from '../actions/transactions';
import * as authActionCreators from '../actions/auth';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import TextInput from '../components/TextInput';
import { logout } from '../helpers/auth';
import PreviousPageLink from '../components/PreviousPageLink';
import moment from 'moment';

class TransactionDetails extends React.Component {
    componentWillMount() {
        this.props.getTransactions();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fetchingDataFail) {
            logout();
        }
    }

    componentWillUnmount() {
        this.props.resetTransactions();
    }

    render() {
        const { currentTransaction } = this.props;
        const exchangeInfo = currentTransaction && currentTransaction.exchangeInfo;
        const createdAt = exchangeInfo && moment(exchangeInfo.createdAt).format('YYYY-MM-DD HH:mm:ss');

        return (
            <div className="component-wrapper">
                {exchangeInfo ? <div className="form b-grey invite-form">
                    <div className="form__content container">
                        <div className="form__heading">
                            <h2 className="form__title">Details</h2>
                            <PreviousPageLink />
                        </div>
                        <div className="form__wrapper element">
                            <TextInput
                                disabled="disabled"
                                label="Endpoint"
                                value={exchangeInfo.url}
                            />
                            <TextInput
                                disabled="disabled"
                                label="Created at"
                                value={createdAt}
                            />
                            <TextInput
                                disabled="disabled"
                                label="UID"
                                value={exchangeInfo.uid}
                            />
                            <TextInput
                                disabled="disabled"
                                label="Host"
                                value={exchangeInfo.host}
                            />
                            <TextInput
                                disabled="disabled"
                                label="Response size (bytes)"
                                value={exchangeInfo.resLength}
                            />
                            <TextInput
                                disabled="disabled"
                                label="Request size (bytes)"
                                value={exchangeInfo.reqLength}
                            />
                            <TextInput
                                disabled="disabled"
                                label="Latency (milliseconds)"
                                value={exchangeInfo.latency}
                            />
                        </div>
                    </div>
                </div> : <Loader />}
            </div>
        );
    }
}
const filterCurrentTransaction = (transactions, transactionUID) => {
    if (transactions) {
       return transactions.filter((transaction) => {
            return transaction.id === transactionUID;
        })[0];
    }
    return null;
}
const mapStateToProps = (state, props) => {
    return {
        transactions: state.transactions.transactions,
        currentTransaction: filterCurrentTransaction(state.transactions.transactions, props.params.uid),
        fetchingDataFail: state.auth.fetchingDataFail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: () => {
            dispatch(transactionsActionCreators.getTransactionsRequest())
                .then((response) => {
                    if (!response.error) {
                        dispatch(transactionsActionCreators.getTransactionsSuccess(response.payload));
                    } else {
                        dispatch(transactionsActionCreators.getTransactionsFail(response.payload));
                        dispatch(authActionCreators.fetchDataFail());
                    }
                });
        },
        resetTransactions: () => {
            dispatch(transactionsActionCreators.getTransactionsReset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
