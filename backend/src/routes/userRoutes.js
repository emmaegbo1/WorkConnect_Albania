import express from 'express';
import { me } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/me', requireAuth, me);

export default router;
