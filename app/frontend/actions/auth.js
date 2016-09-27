/*
   HANDLE SERVER FAIL OR INTERNET DISCONNECT
*/
export const fetchDataFail = () => {
    return {
        type: 'FETCH_DATA_FAIL',
    };
};
export const fetchDataReset = () => {
    return {
        type: 'FETCH_DATA_RESET',
    };
};
