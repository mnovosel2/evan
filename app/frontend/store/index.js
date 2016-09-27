import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import promise from 'redux-promise';

import rootReducer from '../reducers';

const initialState = {};

const finalCreateStore = compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers');
        store.replaceReducer(nextReducer);
    });
}

export const store = finalCreateStore(rootReducer, initialState);
export const history = syncHistoryWithStore(hashHistory, store);
