import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const routerAuth = Router();

routerAuth.post('/auth/register', celebrate(registerUserSchema), registerUser);

routerAuth.post('/auth/login', celebrate(loginUserSchema), loginUser);

routerAuth.post('/auth/logout', logoutUser);

routerAuth.post('/auth/refresh', refreshUserSession);

routerAuth.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail
);

routerAuth.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword
);

export default routerAuth;
