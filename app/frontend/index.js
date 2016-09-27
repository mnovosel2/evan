import 'babel-polyfill';
import React from 'react';
import {Router,browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';
import {store,history} from './store';
import {Provider} from 'react-redux';

const ctn=document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    ctn
);