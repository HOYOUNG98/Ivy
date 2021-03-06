import { Message, StringReq } from '../types';
import { Handler } from '../models/Handler';

/*
  String Format: string [length] [typeCase]
*/

export class StringHandler extends Handler {
  constructor() {
    super();
  }

  protected generateStrings = (
    name: string,
    req: StringReq,
    quantity: number,
    result: Array<object>,
  ): Array<object> => {
    // DEFAULT VALUES
    const typeCase = req.typeCase ? req.typeCase : 'lower';
    const length = req.length ? req.length : 10;
    let characters: string;

    // Generate Strings
    for (var i = 0; i < quantity; i++) {
      // Check typeCases
      if (typeCase === 'upper') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      } else {
        characters = 'abcdefghijklmnopqrstuvwxyz';
      }

      // Build the string
      var tempString = '';
      for (var j = 0; j < length; j++) {
        tempString += characters.charAt(
          Math.floor(Math.random() * characters.length),
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
    for (const [fieldName, requirements] of entries) {
      if (requirements.type === 'string') {
        // process the string (Should make a function - middleware? So should this file be in different folder)
        message.result = this.generateStrings(
          fieldName,
          requirements,
          message.quantity,
          message.result,
        );
      }
    }
    return message;
  };
}
