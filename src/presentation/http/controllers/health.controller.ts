import { Request, Response } from 'express';
import { env } from '../../../infrastructure/config/env.config';

export class HealthController {
  health(_req: Request, res: Response): void {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: process.env.npm_package_version ?? '1.0.0',
    });
  }

  ready(_req: Request, res: Response): void {
    // Add checks for database, cache, external services, etc.
    const checks = {
      database: true, // Replace with actual database check
      cache: true, // Replace with actual cache check
    };

    const isReady = Object.values(checks).every((check) => check);

    res.status(isReady ? 200 : 503).json({
      status: isReady ? 'ready' : 'not_ready',
      checks,
      timestamp: new Date().toISOString(),
    });
  }
}
