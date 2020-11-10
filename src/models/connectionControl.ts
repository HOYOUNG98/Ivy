// library imports
import { Request, Response } from 'express';
import axios, { AxiosResponse, AxiosError } from 'axios';

// local imports
import { Message } from '../types';
import { NumberHandler } from '../handlers/numberHandler';
import { StringHandler } from '../handlers/stringHandler';
import { Chain } from './Chain';
import { successResponse, errorResponse } from '../services/restful.service';

// TODO: Work on error handling

export const process = (req: Request, res: Response) => {
  const receivedMessage = receiveMessage(req);
  const processedMessage = processMessage(receivedMessage);

  // sendMessage(processedMessage, res);
  res.send({ data: processedMessage });
};

export const receiveMessage = (req: Request): Message => {
  const { url, quantity, template } = req.body;
  var result = new Array();

  for (var i = 0; i < quantity; i++) {
    result.push(new Object());
  }

  const message: Message = {
    url,
    quantity,
    template,
    result,
  };
  return message;
};

export const processMessage = (message: Message): Message => {
  const chain = new Chain([new NumberHandler(), new StringHandler()], message);
  const processedMessage = chain.execute();

  return processedMessage;
};

export const sendMessage = (message: Message, res: Response) => {
  const { url, quantity, result } = message;
  for (var i = 0; i < quantity; i++) {
    axios
      .post(url, result[i])
      .then((response: AxiosResponse) => {
        successResponse(res, {
          success: true,
          AxiosResponse: response,
          data: { ...result[i] },
        });
      })
      .catch((error: AxiosError) => {
        errorResponse(res, error);
      });
  }
};
