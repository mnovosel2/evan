var eve = require('evejs');
var babble = require('babble');
var queueAgent = require('./QueueAgent');

function DelegateAgent(agentId) {
    eve.Agent.call(this, agentId);
    this.extend('babble');
    this.connect(eve.system.transports.getAll());
}
DelegateAgent.prototype = Object.create(eve.Agent.prototype);
DelegateAgent.prototype.constructor = DelegateAgent;

DelegateAgent.prototype.dispatch = function (action, payload) {
    switch (action) {
        case 'ADD_TO_QUEUE':
            this.tell('queueAgent', 'addToQueue').tell(function () {
                return payload;
            });
            break;
    }
}
var delegateAgent = new DelegateAgent('delegateAgent');
module.exports = delegateAgent;