import React, { PropTypes } from 'react';
import Table from './Table';
import Loader from '../components/Loader';

class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            transactionsSubset: [],
            currentPage: 1,
            numbersPerPage: 10,
        };
        this.previousTransactions = this.previousTransactions.bind(this);
        this.nextTransactions = this.nextTransactions.bind(this);
        this.loadTransactions = this.loadTransactions.bind(this);
    }

    componentWillMount() {
        const transactionsList = this.props.transactions;
        const transactionsFormatted = transactionsList.map((transaction) => {
            const exchangeInfo = transaction.exchangeInfo;
            return [{
                label: 'Url',
                data: exchangeInfo.url,
                type: 'td',
            }, {
                label: 'Status code',
                data: exchangeInfo.statusCode,
                type: 'td',
            }, {
                label: 'Method',
                data: exchangeInfo.method,
                type: 'td',
            }, {
                label: 'Latency',
                data: exchangeInfo.latency,
                type: 'td',
            },{
                label: '',
                data: 'Details',
                type: 'anchor',
                id: transaction.id,
            }];
        });
        this.setState({
            transactions: transactionsFormatted,
        });
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions(currentPage) {
        const currentPageIndex = currentPage || this.state.currentPage;
        const begin = ((currentPageIndex - 1) * this.state.numbersPerPage);
        const end = begin + this.state.numbersPerPage;
        const transactionsSubset = this.state.transactions.slice(begin, end);
        this.setState({
            transactionsSubset,
            currentPage: currentPageIndex,
        });
    }

    nextTransactions(e) {
        e.preventDefault();
        this.loadTransactions(this.state.currentPage + 1);
    }

    previousTransactions(e) {
        e.preventDefault();
        this.loadTransactions(this.state.currentPage - 1);
    }

    render() {
        const { transactions, numbersPerPage, currentPage } = this.state;
        const numberOfPages = (Math.ceil(transactions.length / numbersPerPage));
        const previousDisabled = (currentPage === 1) || numberOfPages === 1;
        const nextDisabled = (currentPage === numberOfPages) || numberOfPages === 1;
        const controlsDisabled = transactions && transactions.length <= 10;
        console.log(transactions);

        return (
            <div className="transactions-wrapper">
                {this.props.transactions ? <div className="container">

                    <div className="transactions__controls controls">
                        {!controlsDisabled &&
                        <div className="controls__inner">
                            <a
                                className="btn btn--previous" href="/"
                                onClick={this.previousTransactions}>
                                <svg>
                                    <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
                                </svg>
                                <span>Previous</span>
                            </a>
                            <a
                                className="btn btn--next" href="/"
                                onClick={this.nextTransactions}>
                                <span>Next</span>
                                <svg>
                                    <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
                                </svg>
                            </a>
                        </div>}
                    </div>
                    <Table
                        headers={['Url', 'Status code','Method', 'Latency']}
                        content={this.state.transactionsSubset}
                    />
                    <div className="transactions__controls controls">
                        {!controlsDisabled &&
                        <div className="controls__inner">
                            <a
                                className="btn btn--previous" href="/"
                                onClick={this.previousTransactions}>
                                <svg>
                                    <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
                                </svg>
                                <span>Previous</span>
                            </a>
                            <a
                                className="btn btn--next" href="/"
                                onClick={this.nextTransactions}>
                                <span>Next</span>
                                <svg>
                                    <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
                                </svg>
                            </a>
                        </div>}
                    </div>
                </div> : <Loader />}
            </div>
        );
    }
}

Transactions.propTypes = {
    transactions: PropTypes.array.isRequired,
};

export default Transactions;

