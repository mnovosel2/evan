const babies = (state = {}, action) => {
    switch (action.type) {
        case 'TRANSACTIONS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'TRANSACTIONS_SUCCESS':
            return {
                ...state,
                transactions: action.payload.data,
                loading: false,
            };
        case 'TRANSACTIONS_FAIL':
        {
            const errorMsg = action.payload.data ? action.payload.data.why : '';
            return {
                ...state,
                errorMsg,
                loading: false,
            };
        }
        case 'TRANSACTIONS_RESET':
        {
            return {
                ...state,
                loading: false,
                transactions: null,
            };
        }
        default:
            return {
                ...state,
            };
    }
};
export default babies;
