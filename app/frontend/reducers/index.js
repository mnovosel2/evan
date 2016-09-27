import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import transactions from './transactions';
import user from './user';

const rootReducer = combineReducers({
    auth,
    transactions,
    user,
    form: formReducer,
    routing: routerReducer,
});
export default rootReducer;
