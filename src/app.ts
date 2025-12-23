import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRoutes } from './presentation/http/routes';
import { errorHandler } from './presentation/http/middlewares/error-handler.middleware';
import { ConsoleLoggerService } from './infrastructure/services/logger.service';

const logger = new ConsoleLoggerService('App');

export function createApp(): Application {
  const app = express();

  // Security middlewares
  app.use(helmet());
  app.use(cors());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`, {
      query: req.query,
      ip: req.ip,
    });
    next();
  });

  // API routes
  app.use('/api', apiRoutes);

  // Root route
  app.get('/', (_req, res) => {
    res.json({
      name: 'Verolux API',
      version: '1.0.0',
      description: 'Clean Architecture API Template',
      docs: '/api/health',
    });
  });

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
}
