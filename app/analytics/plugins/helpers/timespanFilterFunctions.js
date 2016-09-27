var Q = require('q');
var moment = require('moment');

module.exports = {
    getUser: function getUser(users, userId) {
        var deffered = Q.defer();
        users.list$({id: userId, fields$: ['clientSecret']}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                deffered.resolve(result[0]);
            }
        });
        return deffered.promise;
    },
    getLastHour: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return !moment(item.exchangeInfo.createdAt).add(1, 'hour').isBefore();
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
    getLastDay: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return !moment(item.exchangeInfo.createdAt).add(1, 'days').isBefore();
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
    getLastMonth: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return !moment(item.exchangeInfo.createdAt).add(1, 'months').isBefore();
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
    getLastQuarter: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return !moment(item.exchangeInfo.createdAt).add(3, 'months').isBefore();
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
}
