import axios from 'axios';
export const get = (url, token)=> {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['X-Auth-Token'] = token;
    }
    return axios({
        url,
        method: 'get',
        headers,
    });
};
export const post = (url, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['X-Auth-Token'] = token;
    }
    return axios({
        url,
        method: 'post',
        data,
        headers,
    });
};
export const update = (url, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['X-Auth-Token'] = token;
    }
    return axios({
        url,
        method: 'put',
        data,
        headers,
    });
};
export const remove = (url, token) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['X-Auth-Token'] = token;
    }
    return axios({
        url,
        method: 'delete',
        headers,
    });
};
