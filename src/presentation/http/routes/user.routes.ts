import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  CreateUserDtoSchema,
  UpdateUserDtoSchema,
} from '../../../application/dtos/user.dto';
import { IdParamDtoSchema, PaginationDtoSchema } from '../../../application/dtos/common.dto';

const router = Router();
const userController = new UserController();

// Public routes
router.post(
  '/',
  validate(CreateUserDtoSchema),
  userController.createUser.bind(userController)
);

// Protected routes
router.get(
  '/',
  authMiddleware,
  validate(PaginationDtoSchema, 'query'),
  userController.listUsers.bind(userController)
);

router.get(
  '/:id',
  authMiddleware,
  validate(IdParamDtoSchema, 'params'),
  userController.getUser.bind(userController)
);

router.put(
  '/:id',
  authMiddleware,
  validate(IdParamDtoSchema, 'params'),
  validate(UpdateUserDtoSchema),
  userController.updateUser.bind(userController)
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  validate(IdParamDtoSchema, 'params'),
  userController.deleteUser.bind(userController)
);

export { router as userRoutes };
