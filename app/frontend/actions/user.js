import axios from 'axios';
import { get, post, update } from '../helpers/api';
import { getTokenFromCookie } from '../helpers/auth';
export const logInRequest = (loginInfo) => {
    const loginUrl = `${ROOT}/auth/login`;
    const request = post(loginUrl, loginInfo);
    return {
        type: 'LOGIN_REQUEST',
        payload: request,
    };
};
export const logInSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user,
    };
};
export const logInFail = (error) => {
    return {
        type: 'LOGIN_FAIL',
        payload: error,
    };
};
export const registerRequest = (user) => {
    const loginUrl = `${ROOT}/auth/register`;
    const request = post(loginUrl, user);
    return {
        type: 'REGISTER_REQUEST',
        payload: request,
    };
};
export const registerSuccess = (clientSecret) => {
    return {
        type: 'REGISTER_SUCCESS',
        payload: clientSecret,
    };
};
export const registerFail = (error) => {
    return {
        type: 'REGISTER_FAIL',
        payload: error,
    };
};
export const registerReset = () => {
    return {
        type: 'REGISTER_RESET',
    };
};
export const getUserRequest = () => {
    const token = getTokenFromCookie();
    const userUrl = `${ROOT}/auth/user`;
    const request = get(userUrl, token);
    return {
        type: 'GET_USER_REQUEST',
        payload: request,
    };
};
export const getUserSuccess = (user) => {
    return {
        type: 'GET_USER_SUCCESS',
        payload: user,
    };
};
export const getUserFail = (error) => {
    return {
        type: 'GET_USER_FAIL',
        payload: error,
    };
};
export const getUserReset = () => {
    return {
        type: 'GET_USER_RESET',
    };
};