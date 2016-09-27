import { get } from './api';
import { history } from '../store';

export const setTokenCookie = (token) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    document.cookie = `token=${token};expires=${expirationDate.toGMTString()};`;
};
const escape = (s) => {
    return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
};
export const getTokenFromCookie = () => {
    const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape('token') + '=([^;]*)'));
    return match ? match[1] : null;
};

export const deleteTokenCookie = () => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;Max-Age=0';
};
export const logout = () => {
    deleteTokenCookie();
    history.push('/login');
}
export const authHelper = (nextState, replace, next) => {
    const token = getTokenFromCookie();
    const action = nextState.location.query.action;
    if (!token && !action) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname,
            },
        });
        next();
    } else {
        next();
    }
};
export const loginProtect = (nextState, replace, next) => {
    const token = getTokenFromCookie();
    if (token) {
        replace({
            pathname: '/',
            state: {
                nextPathname: nextState.location.pathname,
            },
        });
        next();
    } else {
        next();
    }
};
