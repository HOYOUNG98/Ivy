import { String } from '../types';

export const parseStringReq = (value: string): String => {
  const splitValue = value.split(' ');

  splitValue[1]; // field for string length
  var string_req: String = {
    length: parseInt(splitValue[1]),
    typeCase: splitValue[2],
  };

  return string_req;
};

export const generateStrings = (
  name: string,
  req: String,
  result: Array<object>,
) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < result.length; i++) {
    var tempString = '';
    for (var j = 0; j < req.length; j++) {
      tempString += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    Object.defineProperty(result[i], name, { value: tempString });
  }

  return result;
};
