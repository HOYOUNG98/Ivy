import { Message, NumberReq, Req } from '../types';
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
      // DEFAULT VALUES
      const minVal = req.min ? req.min : 0;
      const maxVal = req.max ? req.max : 10;

      // Generate Numbers
      var tempNumber =
        Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
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
