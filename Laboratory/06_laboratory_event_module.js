const EventEmitter = require('events');
const emitter = new EventEmitter();

const dynamicData = {name: 'John Doe', age: 25};

emitter.on('start', () => {
    console.log('Application Started!');
});

emitter.on('data', (data) => {
    console.log(`Data Received: , ${data.name}, ${data.age}`);
});

emitter.on('error', (error) => {
    console.error(`Error Occurred: , ${error}`);
});


const errorMessage = "Something went wrong!";

emitter.emit('start');
emitter.emit('data', dynamicData);
emitter.emit('error', errorMessage); 

