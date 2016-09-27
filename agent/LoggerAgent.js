var request = require('request');
var eve = require('evejs');
var babble = require('babble');
var fs = require('fs');
var path = require('path');
var logger = require('simple-node-logger');

function LoggerAgent(agentId) {
    eve.Agent.call(this, agentId);
    this.extend('babble');
    this.connect(eve.system.transports.getAll());
    this.logFilePath = path.resolve(__dirname, './log.log');
}
LoggerAgent.prototype = Object.create(eve.Agent.prototype);
LoggerAgent.prototype.constructor = LoggerAgent;

LoggerAgent.prototype.log = function (payload) {
    var agent = this;
    var log = logger.createSimpleLogger(agent.logFilePath);
    var logContext = `${payload.context.toUpperCase()} `;
    var logMessage = `${payload.message.toString()} `;
    log.info(logContext, logMessage);
}
var loggerAgent = new LoggerAgent('loggerAgent');
module.exports = loggerAgent;