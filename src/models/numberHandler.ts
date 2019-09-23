import { Handler, Message } from '../types';
import { parseNumberReq, generateNumbers } from '../middlewares/numberHelper';

export class NumberHandler {
  next: Handler | null;

  protected constructor() {
    this.next = null;
  }

  setNext = (handler: Handler) => {
    this.next = handler;
  };

  process = (message: Message) => {
    const entries = Object.entries(message.template);
    for (const [name, value] of entries) {
      if (value.split(' ')[0] === 'string') {
        const requirements = parseNumberReq(value);
        message.result = generateNumbers(name, requirements, message.result);
      }
    }

    if (this.next) {
      return this.next.process(message);
    } else {
      return message;
    }
  };
}
