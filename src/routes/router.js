import { Router } from 'express';

import noteRoutes from './noteRoutes.js';

const router = Router();

router.use(noteRoutes);

export default router;
