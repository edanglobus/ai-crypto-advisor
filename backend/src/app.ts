import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { env } from './config/env';
import { authRoutes } from './routes/auth.routes';
import { preferenceRoutes } from './routes/preference.routes';
import { dashboardRoutes } from './routes/dashboard.routes';
import { feedbackRoutes } from './routes/feedback.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/preferences', preferenceRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/feedback', feedbackRoutes);

  // 404 + centralized error handling (must be registered last).
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
