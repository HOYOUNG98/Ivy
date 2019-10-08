// library imports
import { Request, Response } from 'express';
import axios, { AxiosResponse, AxiosError } from 'axios';

// local imports
import { Message } from '../types';
import { NumberHandler } from '../handlers/numberHandler';
import { StringHandler } from '../handlers/stringHandler';
import { Chain } from './Chain';

// TODO: Work on error handling

export const process = (req: Request, res: Response) => {
  const receivedMessage = receiveMessage(req);
  const processedMessage = processMessage(receivedMessage);

  sendMessage(processedMessage, res);
};

export const receiveMessage = (req: Request): Message => {
  console.log('Receiving Message');
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

  console.log('Received Message');
  return message;
};

export const processMessage = (message: Message): Message => {
  console.log('Processing Message');
  const chain = new Chain([new NumberHandler(), new StringHandler()], message);
  const processedMessage = chain.execute();

  console.log('Processed Message', message);
  return processedMessage;
};

export const sendMessage = (message: Message, res: Response) => {
  const { url, quantity, result } = message;
  for (var i = 0; i < quantity; i++) {
    axios
      .post(url, result[i])
      .then((response: AxiosResponse) => {
        console.log(result[i], i, response);
        res
          .status(200)
          .json({ success: true, ...result[i] })
          .send();
      })
      .catch((error: AxiosError) => {
        console.log(error);
        res
          .status(500)
          .json({ success: false, error, data: null })
          .send();
      });
  }
};
