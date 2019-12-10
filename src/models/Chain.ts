import { Handler } from './Handler';
import { Message } from '../types';

export class Chain {
  chain: Handler;
  message: Message;

  constructor(handlers: Array<Handler>, message: Message) {
    this.message = message;
    this.chain = handlers[0];

    var first = true; // boolean flag to skip the first value
    handlers.forEach(handler => {
      if (first) {
        first = false;
      } else {
        this.chain.setNext(handler);
      }
    });
  }

  execute = (): Message => {
    return this.chain.process(this.message);
  };
}
