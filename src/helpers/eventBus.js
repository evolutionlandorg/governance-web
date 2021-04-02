import mitt from 'mitt';

const emitter = mitt();

console.log('event bus: init');

export default emitter;