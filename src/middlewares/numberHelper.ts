import { Number } from '../types';

export const parseNumberReq = (value: string): Number => {
  const splitValue = value.split(' ');

  var number_req: Number = {
    min: parseInt(splitValue[1]),
    max: parseInt(splitValue[2]),
  };

  return number_req;
};

export const generateNumbers = (
  name: string,
  req: Number,
  result: Array<object>,
) => {
  for (var i = 0; i < result.length; i++) {
    // The maximum is exclusive and the minimum is inclusive
    var tempNumber =
      Math.floor(Math.random() * (req.max - req.min + 1)) + req.min;
    Object.defineProperty(result[i], name, { value: tempNumber });
  }

  return result;
};
