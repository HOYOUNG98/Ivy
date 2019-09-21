import { Handler, Message } from '../types';
import { parseStringReq, generateStrings } from '../middlewares/stringHelper';

export class StringHandler {
  next: Handler | null;

  protected constructor() {
    this.next = null;
  }

  setNext = (handler: Handler) => {
    this.next = handler;
  };

  process = (message: Message) => {
    // loop through the template find the line where we should handle string
    // process the line and output the string
    // add the property name and value to message.result
    const entries = Object.entries(message.template);
    for (const [name, value] of entries) {
      if (value.split(' ')[0] === 'string') {
        // process the string (Should make a function - middleware? So should this file be in different folder)
        const requirements = parseStringReq(value);
        message.result = generateStrings(name, requirements, message.result);
      }
    }

    // Since I want to process in every handler have next() here
    if (this.next) {
      return this.next.process(message);
    } else {
      return message;
    }
  };
}
