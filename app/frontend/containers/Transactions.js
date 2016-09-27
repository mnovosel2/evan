import React, { PropTypes } from 'react';
import * as transactionsActionCreators from '../actions/transactions';
import * as authActionCreators from '../actions/auth';
import { connect } from 'react-redux';
import Transactions from '../components/Transactions';
import Loader from '../components/Loader';
import Footer from '../containers/Footer';
import { logout } from '../helpers/auth';

class TransactionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.filterValue = this.filterValue.bind(this);
    }

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

    filterValue(e) {
        const value = parseInt(e.target.value, 10);
        const { getTransactions, resetTransactions } = this.props;
        resetTransactions();
        switch (value) {
            case 0:
                getTransactions('success');
                break;
            case 1:
                getTransactions('fail');
                break;
            case 2:
                getTransactions('last-hour');
                break;
            case 3:
                getTransactions('last-day');
                break;
            case 4:
                getTransactions('last-month');
                break;
            case 6:
                getTransactions('last-quarter');
                break;
            case -1:
                getTransactions('all');
                break;
        }
    }

    render() {
        const { transactions } = this.props;

        return (
            <div className="component-wrapper">
                {transactions ? <div className="p-transactions b-grey transactions sticky-footer">
                    <div className="component-wrapper">
                        <div className="element element--offset">
                            <div className="element__heading container">
                                <h1>Transaction history</h1>
                            </div>
                        </div>
                        <div className="container">
                            <div className="select">
                                <div className="select__inner">
                                    <select
                                        type="text"
                                        onChange={this.filterValue}
                                    >
                                        <option value="-1">Select filter</option>
                                        <option value="0">
                                            Successful
                                        </option>
                                        <option value="1">
                                            Failed
                                        </option>
                                        <option value="2">
                                            Last hour
                                        </option>
                                        <option value="3">
                                            Last Day
                                        </option>
                                        <option value="4">
                                            Last Month
                                        </option>
                                        <option value="5">
                                            Last Quarter
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {transactions.length > 0 && <div className="transactions__inner">
                            <Transactions transactions={transactions}/>
                        </div>}
                    </div>
                    {(transactions.length === 0) &&
                    <div className="component-wrapper transactions-empty">
                        <div className="element element--offset">
                            <div className="element__inner">
                                <div className="element__info container">
                                    <div className="element__details">
                                        <div className="empty">
                                            <p>You don’t have any requests.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div> : <Loader />}
                <Footer />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        transactions: state.transactions.transactions,
        fetchingDataFail: state.auth.fetchingDataFail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: (filter) => {
            dispatch(transactionsActionCreators.getTransactionsRequest(filter))
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


TransactionsContainer.propTypes = {
    transactions: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer);
