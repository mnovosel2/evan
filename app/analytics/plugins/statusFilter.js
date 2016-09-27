var statusFilters = require('./helpers/statusFilterFunctions');

module.exports = function (options) {
    var seneca = this;
    seneca.add({service: "analytics", action: "all"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        statusFilters.getUser(users, args.userId)
            .then(function (user) {
                return statusFilters.all(exchange, user);
            })
            .then(function (result) {
                done(null, result);
            })
            .catch(function (error) {
                done(error, {
                    message: error.message,
                })
            })
            .done();
    });
    seneca.add({service: "analytics", action: "success"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        statusFilters.getUser(users, args.userId)
            .then(function (user) {
              return statusFilters.success(exchange, user);
            })
            .then(function (result) {
                done(null, result);
            })
            .catch(function (error) {
                done(error, {
                    message: error.message,
                })
            })
            .done();
    });
    seneca.add({service: "analytics", action: "fail"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        statusFilters.getUser(users, args.userId)
            .then(function (user) {
                return statusFilters.fail(exchange, user);
            })
            .then(function (result) {
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