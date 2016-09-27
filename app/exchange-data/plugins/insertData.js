var Q = require("q");

function getUser(users, args) {
    var deffered = Q.defer();
    users.list$({clientSecret: args.clientSecret}, function (err, result) {
        if (err) {
            deffered.reject(new Error(err));
        } else {
            deffered.resolve(result);
        }
    });
    return deffered.promise;
}

function checkUserExistence(result) {
    var deffered = Q.defer();
    if (result.length === 0) {
        deffered.reject(new Error("User not found"));
    } else {
        deffered.resolve(result);
    }
    return deffered.promise;
}

function saveExchangeData(exchange, exchangeData) {
    var deffered = Q.defer();
    exchange.save$(exchangeData, function (err, result) {
        if (err) {
            deffered.reject(new Error(err));
        } else {
            deffered.resolve(result);
        }
    });
    return deffered.promise;
}

module.exports = function (options) {
    var seneca = this;
    seneca.add({service: "exchange", action: "insert"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        getUser(users, args)
            .then(checkUserExistence)
            .then(function () {
               return saveExchangeData(exchange, {
                   clientSecret: args.clientSecret,
                   exchangeInfo: args.exchangeInfo,
               });
            })
            .then(function(result){
                done(null, result);
            })
            .catch(function (error) {
                done(error, {
                    message: error.message,
                })
            })
            .done();
    });
};
