import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

const routerAuth = Router();

routerAuth.post('/auth/register', celebrate(registerUserSchema), registerUser);

routerAuth.post('/auth/login', celebrate(loginUserSchema), loginUser);

routerAuth.post('/auth/logout', logoutUser);

routerAuth.post('/auth/refresh', refreshUserSession);

export default routerAuth;
