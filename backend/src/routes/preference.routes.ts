import { Router } from 'express';

import { preferenceController } from '../controllers/preference.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/error.middleware';

const router = Router();

router.get('/', requireAuth, asyncHandler(preferenceController.getMine));
router.put('/', requireAuth, asyncHandler(preferenceController.upsertMine));

export { router as preferenceRoutes };
