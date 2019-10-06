import { Handler, Message } from '../types';

export class Helper {
  next: Handler | null;

  constructor() {
    this.next = null;
  }

  setNext = (handler: Handler) => {
    this.next = handler;
  };

  process = (message: Message, processor: (message: Message) => Message) => {
    const processedValue = processor(message); // process the value

    // Process the next helper in chain
    if (this.next) {
      return this.next.process(message);
      // No helper is next in chain, return the result
    } else {
      return processedValue;
    }
  };
}
