import { createApp } from './app';
import { env } from './infrastructure/config/env.config';
import { ConsoleLoggerService } from './infrastructure/services/logger.service';

const logger = new ConsoleLoggerService('Server');

async function bootstrap(): Promise<void> {
  try {
    const app = createApp();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server is running on port ${env.PORT}`);
      logger.info(`📚 Environment: ${env.NODE_ENV}`);
      logger.info(`🔗 Health check: http://localhost:${env.PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', reason as Error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

bootstrap();
