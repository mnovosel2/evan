import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { authHelper, loginProtect } from '../helpers/auth';

import RootContainer from '../containers/Root';
import LoginContainer from '../containers/Login';
import RegisterContainer from '../containers/Register';
import TransactionsContainer from '../containers/Transactions';
import TransactionsDetails from '../containers/TransactionDetails';
import NotFound from '../components/NotFound';

export default (
    <Route path="/" component={RootContainer}>
        <IndexRoute component={TransactionsContainer} onEnter={authHelper}/>
        <Route path="/login" component={LoginContainer} onEnter={loginProtect}/>
        <Route path="/register" component={RegisterContainer} />
        <Route path="/transactions" component={TransactionsContainer} onEnter={authHelper}/>
        <Route path="/transactions/details(/:uid)" component={TransactionsDetails} onEnter={authHelper}/>
        <Route path="*" component={NotFound}/>
    </Route>
);
