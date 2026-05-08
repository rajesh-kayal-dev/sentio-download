import express from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { githubRedirect, githubCallback } from '../controllers/github.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

router.get('/github', githubRedirect);
router.get('/github/callback', githubCallback);

export default router;
