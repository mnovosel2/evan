var filterByDateClient = require('./clients/dateAnalytics');
var filterStatusClient = require('./clients/statusAnalytics');

module.exports = function () {
    var seneca = this;
    seneca.use(filterByDateClient);
    seneca.use(filterStatusClient);
};