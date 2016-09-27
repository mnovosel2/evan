var statusFilter = require('../plugins/statusFilter');
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
    .use(statusFilter);

module.exports = function statusFilter(options) {
    var seneca = this;
    seneca.add({service: "filter-status", action: "all"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "all",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    seneca.add({service: "filter-status", action: "success"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "success",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    seneca.add({service: "filter-status", action: "fail"}, function (args, done) {
        var userId = authHelpers.getUserIdFromReq(args.req$);
        senecaClient.act({
            service: "analytics",
            action: "fail",
            userId,
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    this.add("init:statusFilter", function (msg, respond) {
        seneca.act('role:web', {
            use: {
                prefix: '/api',
                pin: {service: "filter-status", action: "*"},
                map: {
                    'success': {GET: true},
                    'fail': {GET: true},
                    'all': {GET: true},
                }
            }
        }, respond)
    });
};