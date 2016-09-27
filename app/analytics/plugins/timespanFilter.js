var timespanFilters = require('./helpers/timespanFilterFunctions')

module.exports = function (options) {
    var seneca = this;
    seneca.add({service: "analytics", action: "last-hour"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        timespanFilters.getUser(users, args.userId)
            .then(function (user) {
              return timespanFilters.getLastHour(exchange, user);
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
    seneca.add({service: "analytics", action: "last-day"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        timespanFilters.getUser(users, args.userId)
            .then(function (user) {
                return timespanFilters.getLastDay(exchange, user);
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
    seneca.add({service: "analytics", action: "last-month"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        timespanFilters.getUser(users, args.userId)
            .then(function (user) {
                return timespanFilters.getLastMonth(exchange, user);
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
    seneca.add({service: "analytics", action: "last-quarter"}, function (args, done) {
        var users = this.make("sys_user");
        var exchange = this.make("exchange");
        timespanFilters.getUser(users, args.userId)
            .then(function (user) {
                return timespanFilters.getLastQuarter(exchange, user);
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