const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                user: {},
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.data.user,
                loading: false,
            };
        case 'LOGIN_FAIL':
        {
            const errorMsg = action.payload.data ? action.payload.data.message : '';
            return {
                ...state,
                errorMsg,
                loading: false,
            };
        }
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                clientSecret: action.payload.data.user.clientSecret,
                registerSuccess: true,
                loading: false,
            };
        case 'REGISTER_FAIL':
        {
            const errorMsg = action.payload.data ? action.payload.data.why : '';
            return {
                ...state,
                errorMsg,
                registerFail: true,
                loading: false,
            };
        }
        case 'REGISTER_RESET':
        {
            return {
                ...state,
                registerFail: false,
                registerSuccess: false,
                clientSecret: null,
                loading: false,
            };
        }
        case 'GET_USER_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: action.payload.data.user,
                getUserSuccess: true,
                loading: false,
            };
        case 'GET_USER_FAIL':
        {
            const errorMsg = action.payload.data ? action.payload.data.why : '';
            return {
                ...state,
                errorMsg,
                getUserFail: true,
                loading: false,
            };
        }
        case 'GET_USER_RESET':
        {
            return {
                ...state,
                getUserFail: false,
                getUserSuccess: false,
                loading: false,
            };
        }
    }
    return state;
};
export default user;
