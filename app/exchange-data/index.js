var exchangeDataClient = require('./clients/exchangeData');

module.exports = function () {
    var seneca = this;
    seneca.use(exchangeDataClient);
};

