import { get } from '../helpers/api';
import { getTokenFromCookie } from '../helpers/auth';

export const getTransactionsRequest = (filterState) => {
    const token = getTokenFromCookie();
    const transactionsUrl = filterState ? `${ROOT}/api/${filterState}` : `${ROOT}/api/all`;
    const request = get(transactionsUrl, token);
    return {
        type: 'TRANSACTIONS_REQUEST',
        payload: request,
    };
};
export const getTransactionsSuccess = (babies) => {
    return {
        type: 'TRANSACTIONS_SUCCESS',
        payload: babies,
    };
};
export const getTransactionsFail = (error) => {
    return {
        type: 'TRANSACTIONS_FAIL',
        payload: error,
    };
};
export const getTransactionsReset= () => {
    return {
        type: 'TRANSACTIONS_RESET',
    };
};
