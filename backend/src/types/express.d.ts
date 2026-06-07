// Augment Express' Request with the authenticated user attached by auth.middleware.
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export {};
