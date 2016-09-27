var cors = require('cors');
var uid = require('uid-safe');
var seneca = require('seneca')();
var customAuth = require('./auth/app');
var config = require('./config/config.prod.js');
var exchange = require('./exchange-data');
var analytics = require('./analytics');


seneca.use("mongo-store", {
    uri: config.mongoUri,
});
seneca.use('entity');
seneca.use('user');
seneca.use('auth', {
        secure: true,
        restrict: '/api',
        default_plugins: {authTokenCookie: false}
    })
    .use('auth-token-header');
seneca.use(customAuth);
seneca.ready(() => {
    seneca.use(exchange);
    seneca.use(analytics);
    var express = require('express');
    var app = express();
    app.use(cors());
    app.use(express.static(__dirname + '/frontend'));
    app.use(require("body-parser").json());
    app.use(seneca.export('web'));
    app.get('/', function(request, response) {
        response.sendFile(__dirname + '/frontend/index.html')
    });
    app.listen(3020);
});
