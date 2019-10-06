import { Message, Number } from '../types';
import { Handler } from '../models/Handler';

/*
  Number Format: number [min] [max]
*/

export class NumberHandler extends Handler {
  constructor() {
    super();
  }
  protected parseNumberReq = (value: string): Number => {
    const splitValue = value.split(' ');

    var number_req: Number = {
      min: parseInt(splitValue[1]),
      max: parseInt(splitValue[2]),
    };

    return number_req;
  };

  protected generateNumbers = (
    name: string,
    req: Number,
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
    for (const [name, value] of entries) {
      if (value.split(' ')[0] === 'number') {
        const requirements = this.parseNumberReq(value);
        const result = this.generateNumbers(
          name,
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
