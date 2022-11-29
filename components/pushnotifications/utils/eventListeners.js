import { EventEmitter } from 'events';

const noop = () => {};

const notificationEventEmitter = new EventEmitter();
/** Pre-defined events by name, implemented later */
notificationEventEmitter.addListener('scheduled', noop);

export { notificationEventEmitter };
