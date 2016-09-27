const auth = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_DATA_FAIL':
            console.log('fetch failed');
            return {
                ...state,
                fetchingDataFail: true,
            };
        case 'FETCH_DATA_RESET':
            return {
                ...state,
                fetchingDataFail: false,
            };
        default:
            return state;
    }
};
export default auth;
