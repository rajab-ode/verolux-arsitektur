import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router = Router();
const healthController = new HealthController();

router.get('/health', healthController.health.bind(healthController));
router.get('/ready', healthController.ready.bind(healthController));

export { router as healthRoutes };
