import { Router } from 'express';

import noteRoutes from './notesRoutes.js';

const router = Router();

router.use(noteRoutes);

export default router;
