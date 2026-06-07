import { Router } from 'express';

import { dashboardController } from '../controllers/dashboard.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../middlewares/error.middleware';

const router = Router();

router.use(requireAuth);

router.get('/market', asyncHandler(dashboardController.getMarket));
router.get('/prices', asyncHandler(dashboardController.getPrices));
router.get('/news', asyncHandler(dashboardController.getNews));
router.get('/insight', asyncHandler(dashboardController.getInsight));
router.get('/meme', asyncHandler(dashboardController.getMeme));

export { router as dashboardRoutes };
