import { Message, String } from '../types';
import { Handler } from '../models/Handler';

/*
  String Format: string [length] [typeCase]
*/

export class StringHandler extends Handler {
  constructor() {
    super();
  }

  protected parseStringReq = (value: string): String => {
    const splitValue = value.split(' ');

    var string_req: String = {
      length: parseInt(splitValue[1]),
      typeCase: splitValue[2],
    };

    return string_req;
  };

  protected generateStrings = (
    name: string,
    req: String,
    quantity: number,
    result: Array<object>,
  ): Array<object> => {
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < quantity; i++) {
      // Check typeCases
      if (req.typeCase === 'upper') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      } else {
        characters = 'abcdefghijklmnopqrstuvwxyz';
      }

      // Build the string
      const charactersLength = characters.length;
      var tempString = '';
      for (var j = 0; j < req.length; j++) {
        tempString += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      Object.defineProperty(result[i], name, {
        value: tempString,
        enumerable: true,
        writable: false,
      });
    }

    return result;
  };

  processor = (message: Message): Message => {
    const entries = Object.entries(message.template);
    for (const [name, value] of entries) {
      if (value.split(' ')[0] === 'string') {
        // process the string (Should make a function - middleware? So should this file be in different folder)
        const requirements = this.parseStringReq(value);
        message.result = this.generateStrings(
          name,
          requirements,
          message.quantity,
          message.result,
        );
      }
    }
    console.log(message.result);
    return message;
  };
}
