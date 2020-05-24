import express, { Request, Response, NextFunction, Router } from 'express';
import 'reflect-metadata';
import AppError from '../errors/AppError';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use(express.json());
routes.use('/transactions', transactionsRouter);

routes.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default routes;
