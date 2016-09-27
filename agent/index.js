var helpers = require('./helpers');
var delegateAgent = require('./DelegateAgent');
var loggerAgent = require('./LoggerAgent');
var uuid = require('uuid');

module.exports = function MiddlewareAgent(clientSecret) {
    if (!clientSecret) {
        loggerAgent.log({
            context: 'CLIENT_SECRET_CONTEXT',
            message: 'Client secret not provided. Please register and get your clientSecret information',
        });
        return function (req, res, next) {};
    }
    return function (req, res, next) {
        var startTime = new Date();
        var exchangeTransferBytes = {
            req: 0,
            res: 0
        };
        var func = {
            end: res.end,
            write: res.write
        };
        var chunkedRes = [];
        var exchangeInfo = {
            method: '',
            statusCode: 0,
            url: '',
            host: '',
            reqLength: 0,
            resLength: 0,
            latency: 0,
            uid: ''
        };

        req.on('data', function (chunk) {
            exchangeTransferBytes.req += chunk.length;
        });
        req.on('end', function () {
            if (exchangeTransferBytes.req > 0) {
                var buffer = Buffer.concat(exchangeTransferBytes.req);
                exchangeTransferBytes.req = buffer.length;
            }
        });
        res.on('error', function (error) {
            loggerAgent.log({
                context: 'RESPONSE_ERROR_CONTEXT',
                message: error.message,
            });
        });
        res.write = function (chunk, encoding) {
            func.write.call(res, chunk, encoding);
            exchangeTransferBytes.res += chunk.length;
        };

        res.end = function (data, encoding) {
            var endTime = new Date();
            var latency = endTime.getTime() - startTime.getTime();
            func.end.call(res, data, encoding);
            if (chunkedRes.length) {
                chunkedRes = chunkedRes.map(function (chunk) {
                    if (chunk instanceof Buffer) {
                        return chunk
                    }
                    return new Buffer(chunk)
                });
                data = Buffer.concat(chunked.res)
            };
            exchangeInfo.method = req.method;
            exchangeInfo.statusCode = res.statusCode;
            exchangeInfo.url = req.url;
            exchangeInfo.host = req.headers.host;
            exchangeInfo.latency = latency;
            exchangeInfo.reqLength = parseInt(exchangeTransferBytes.req.length, 10) > 0 ? parseInt(exchangeTransferBytes.req.length, 10) : (parseInt(req.headers['content-length'], 10) || 0);
            tempResLength = helpers.parseResponseHeaders(res._header, 'Content-Length');
            tempResLength = parseInt(tempResLength, 10);
            exchangeInfo.resLength =  data && data.length > 0 ? data.length : 0;
            exchangeInfo.createdAt = Date.now();
            exchangeInfo.uid = uuid.v4();
            delegateAgent.dispatch('ADD_TO_QUEUE', {
                clientSecret,
                exchangeInfo,
            });
        }
        next();
    }
}