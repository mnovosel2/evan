var timespanFilter = require('../plugins/timespanFilter');
var config = require('../../config/config.prod');
var authHelpers = require('../../helpers/auth');

var senecaClient = require("seneca")().client({
        host: "localhost",
        port: "3026",
    })
    .use("mongo-store", {
        uri: config.mongoUri,
    })
    .use('user')
    .use('entity')
    .use(timespanFilter);

module.exports = function timespanFilter(options) {
    var seneca = this;
    seneca.add({service: "filter-date", action: "last-hour"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "last-hour",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    seneca.add({service: "filter-date", action: "last-day"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "last-day",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    seneca.add({service: "filter-date", action: "last-month"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "last-month",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    seneca.add({service: "filter-date", action: "last-quarter"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "last-quarter",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    this.add("init:timespanFilter", function (msg, respond) {
        seneca.act('role:web', {
            use: {
                prefix: '/api',
                pin: {service: "filter-date", action: "*"},
                map: {
                    'last-hour': {GET: true},
                    'last-day': {GET: true},
                    'last-month': {GET: true},
                    'last-quarter': {GET: true},
                }
            }
        }, respond)
    });
};