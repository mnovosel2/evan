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
    all: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                deffered.resolve(result);
            }
        });
        return deffered.promise;
    },
    success: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({
            clientSecret: user.clientSecret,
        }, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return Number(item.exchangeInfo.statusCode) >= 200 &&
                        Number(item.exchangeInfo.statusCode) < 400;
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
    fail: function (exchange, user) {
        var deffered = Q.defer();
        exchange.list$({clientSecret: user.clientSecret}, function (err, result) {
            if (err) {
                deffered.reject(new Error(err));
            } else {
                var filteredResult = result.filter((item) => {
                    return Number(item.exchangeInfo.statusCode) >= 400 &&
                        Number(item.exchangeInfo.statusCode) < 600;
                });
                deffered.resolve(filteredResult);
            }
        });
        return deffered.promise;
    },
};
