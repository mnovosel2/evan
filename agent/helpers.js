var async = require('async');
var request = require('request');
var loggerAgent = require('./LoggerAgent');

module.exports = {
    parseResponseHeaders: function (headers, key) {
        if (headers) {
            var headerItems = headers.split('\n');
            var headerValue = '';
            headerItems.forEach(function (item) {
                var headerItem = item.split(':');
                if (headerItem[0] == key) {
                    headerValue = headerItem[1];
                }
            })
            return headerValue;
        }
        return {};
    },
    dataQueue: function () {
        return async.queue(function (data, callback) {
            request.post({
                url: 'http://localhost:3020/raw/insert',
                body: data,
                json: true,
            }, function (error) {
                if (error) {
                    loggerAgent.log({
                        context: 'QUEUE_REQUEST_FAIL',
                        message: `${error.toString()}`,
                    });
                }
                callback();
            });
        }, 20);
    }
}