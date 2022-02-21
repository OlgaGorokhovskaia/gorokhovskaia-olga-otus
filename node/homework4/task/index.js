const { myEmitter } = require('./emitter');
const { eventName } = require('./event');
const { myListener } = require('./strategy');

myEmitter.on(eventName, myListener);
myEmitter.emit(eventName, process.argv[2]);