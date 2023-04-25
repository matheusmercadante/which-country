import 'reflect-metadata';
import './ioc';

import { serverConfig } from './configs';
import { Server } from './server';

const server = Server.createServer(serverConfig);

server.start();
