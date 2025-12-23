import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { LoginDtoSchema } from '../../../application/dtos/user.dto';

const router = Router();
const authController = new AuthController();

router.post('/login', validate(LoginDtoSchema), authController.login.bind(authController));

router.get('/me', authMiddleware, authController.me.bind(authController));

export { router as authRoutes };
