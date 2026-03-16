import { Router } from 'express';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { updateUserAvatarController } from '../controllers/userController.js';

const userRouters = Router();

userRouters.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatarController
);

export default userRouters;
