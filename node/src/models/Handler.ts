import { Message } from '../types';

export class Handler {
  next: Handler | null;

  protected constructor() {
    this.next = null;
  }

  setNext = (handler: Handler) => {
    this.next = handler;
  };

  processor = (message: Message): Message => {
    console.error('This handler does not have a processor..?');
    return message;
  };

  public process = (message: Message): Message => {
    const processedValue = this.processor(message); // process the value

    if (this.next) {
      // Process the next helper in chain
      return this.next.process(message);
    } else {
      // No helper is next in chain, return the result
      return processedValue;
    }
  };
}
