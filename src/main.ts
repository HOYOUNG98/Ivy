import * as express from 'express';

export const app: express.Application = express();

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
