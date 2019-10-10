import { Response } from 'express';

export const errorResponse = (
  res: Response,
  err: Error | string,
  code = 400,
) => {
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    err = err.message;
    console.log(err);
  }

  return res
    .status(code)
    .json({ success: false, error: err, data: null })
    .end();
};

export const successResponse = (res: Response, data: {}, code = 200) => {
  let sendData = { success: true };

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData);
  }

  return res.status(code).json(sendData);
};
