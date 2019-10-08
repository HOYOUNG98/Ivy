// library imports
import express, { Request, Response } from 'express';
import bp from 'body-parser';

// local imports
import { process } from './models/connectionControl';

export const app: express.Application = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/process', process);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
