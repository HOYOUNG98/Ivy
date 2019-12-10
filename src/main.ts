import express, { Request, Response } from 'express';
import bp from 'body-parser';

import { Chain } from './models/Chain';
import { NumberHandler } from './handlers/numberHandler';
import { StringHandler } from './handlers/stringHandler';
import { Message } from './types';

export const app: express.Application = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.get('/process', (req: Request, res: Response) => {
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

  const chain = new Chain([new NumberHandler(), new StringHandler()], message);
  const processedMessage = chain.execute();

  res.send(processedMessage);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
