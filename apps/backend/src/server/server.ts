import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import routes from './routes';
import AppError from '../shared/errors/app.error';

export interface ServerOptions {
  dev?: boolean;
  port?: number;
  prefix?: string;
  environment: 'development' | 'production' | 'test' | 'local';
}

export class Server {
  public static createServer(opts: ServerOptions) {
    const port = opts.port ?? 3000;
    const prefix = opts.prefix ?? '/api';

    const server = express();

    server.use(
      // cors({
      //   origin: '*',
      //   methods: '*',
      // })
      cors()
    );

    server.use(express.json());

    server.use(prefix, routes);

    server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError)
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      }
    );

    const start = async () => {
      try {
        server.listen({ port }, () => {
          console.info(`Listening at ${port}${prefix}`);
        });
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    };

    return { server, start };
  }
}
