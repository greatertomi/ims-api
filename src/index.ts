import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import { Request, Response } from 'express';
import handleWrongRoute from './utils/handleWrongRoute';
require('dotenv').config();

const main = async () => {
  try {
    await createConnection();
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/', routes);

    app.use((req: Request, res: Response) => handleWrongRoute(req, res));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
