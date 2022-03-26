import * as bodyParser from 'body-parser';
import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import 'reflect-metadata';
import supertest from 'supertest';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { testDatabaseCredential } from '../config/db';
import routes from '../routes';

process.env.NODE_ENV = 'test';
require('dotenv').config();

export class TestFactory {
  private _app: express.Application;

  private _connection: Connection;

  private _server: HttpServer;

  private options: ConnectionOptions = testDatabaseCredential;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app);
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    this._server.close();
    await this._connection.close();
  }

  private async startup(): Promise<void> {
    try {
      this._connection = await createConnection(this.options);
      this._app = express();
      this._app.use(bodyParser.json());
      this._app.use('/', routes);
      this._server = createServer(this._app).listen(3010);
    } catch (err) {
      console.error('testing error', err);
    }
  }
}
