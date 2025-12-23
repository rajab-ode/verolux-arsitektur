import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';
import { healthRoutes } from './health.routes';

const router = Router();

// Health check routes (no prefix)
router.use('/', healthRoutes);

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export { router as apiRoutes };
