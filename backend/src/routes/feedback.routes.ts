import { Router } from 'express';

import { feedbackController } from '../controllers/feedback.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/error.middleware';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(feedbackController.getMine));
router.post('/', asyncHandler(feedbackController.castVote));

export { router as feedbackRoutes };
