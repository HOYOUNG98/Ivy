import { Message, NumberReq } from '../types';
import { Handler } from '../models/Handler';

/*
  Number Format: number [min] [max]
*/

export class NumberHandler extends Handler {
  constructor() {
    super();
  }

  protected generateNumbers = (
    name: string,
    req: NumberReq,
    quantity: number,
    result: Array<object>,
  ): Array<object> => {
    for (var i = 0; i < quantity; i++) {
      // The maximum is exclusive and the minimum is inclusive
      var tempNumber =
        Math.floor(Math.random() * (req.max - req.min + 1)) + req.min;
      Object.defineProperty(result[i], name, {
        value: tempNumber,
        enumerable: true,
        writable: false,
      });
    }

    return result;
  };

  processor = (message: Message): Message => {
    const entries = Object.entries(message.template);
    for (const [fieldName, requirements] of entries) {
      if (requirements.type === 'number') {
        const result = this.generateNumbers(
          fieldName,
          requirements,
          message.quantity,
          message.result,
        );
        message.result = result;
      }
    }
    return message;
  };
}
