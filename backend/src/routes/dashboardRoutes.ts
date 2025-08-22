import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { clerkAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/stats', clerkAuth, getDashboardStats);

export default router;