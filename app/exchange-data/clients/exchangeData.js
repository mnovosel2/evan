var insertData = require('../plugins/insertData');
var config = require('../../config/config.prod.js');

var senecaClient = require("seneca")().client({
        host: "localhost",
        port: "3025",
    })
    .use("mongo-store", {
        uri: config.mongoUri,
    })
    .use('user')
    .use('entity')
    .use(insertData);

module.exports = function exchangeData(options) {
    var seneca = this;
    seneca.add({service: "exchange-raw", action: "insert"}, function (args, done) {
        senecaClient.act({
            service: "exchange",
            action: "insert",
            clientSecret: args.clientSecret,
            exchangeInfo: args.exchangeInfo
        }, function (err, result) {
            if (err) {
                return done(err, result);
            }
            done(null, result);
        });
    });
    this.add("init:exchangeData", function (msg, respond) {
        seneca.act('role:web', {
            use: {
                prefix: '/raw',
                pin: {service: "exchange-raw", action: "*"},
                map: {
                    insert: {POST: true},
                }
            }
        }, respond)
    });
};