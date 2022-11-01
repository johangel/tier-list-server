import express, { Express } from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { TLSocketServer } from './socket';
dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const tlSocketServer = new TLSocketServer(httpServer);
httpServer.listen(3000);
