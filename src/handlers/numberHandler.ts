import { Message, Number } from '../types';
import { Handler } from '../models/Handler';

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
    result: Array<object>,
  ): Array<object> => {
    for (var i = 0; i < result.length; i++) {
      // The maximum is exclusive and the minimum is inclusive
      var tempNumber =
        Math.floor(Math.random() * (req.max - req.min + 1)) + req.min;
      Object.defineProperty(result[i], name, { value: tempNumber });
    }

    return result;
  };

  processor = (message: Message): Message => {
    const entries = Object.entries(message.template);
    for (const [name, value] of entries) {
      if (value.split(' ')[0] === 'number') {
        const requirements = this.parseNumberReq(value);
        message.result = this.generateNumbers(
          name,
          requirements,
          message.result,
        );
      }
    }
    return message;
  };
}
