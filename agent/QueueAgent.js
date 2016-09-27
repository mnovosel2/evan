var eve = require('evejs');
var babble = require('babble');
var helpers = require('./helpers');
var path = require('path');
var loggerAgent = require('./LoggerAgent');

function QueueAgent(agentId) {
    eve.Agent.call(this, agentId);
    this.queue = helpers.dataQueue();
    this.extend('babble');
    this.addToQueue();
    this.connect(eve.system.transports.getAll());
}
QueueAgent.prototype = Object.create(eve.Agent.prototype);
QueueAgent.prototype.constructor = QueueAgent;

QueueAgent.prototype.addToQueue = function () {
    var agent = this;
    agent.listen('addToQueue').listen(function (payload) {
        agent.queue.push(payload);
    });
    agent.queue.drain = function (drain) {
        var drainDate = new Date();
        loggerAgent.log({
            context: 'QUEUE_FINISHED_CONTEXT',
            message: `Queue drain time ${drainDate.toLocaleString()}`,
        });
    }
};
var queueAgent = new QueueAgent('queueAgent');
module.exports = queueAgent;



