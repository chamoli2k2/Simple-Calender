import { Router } from 'express';
import { register, login, logout, refreshAccessToken } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();


// Regsiter a new user
router.post('/register', register);

// Login a user
router.post('/login',login);

// Logout a user
router.post('/logout', logout);

// Refresh access token
router.post('/refresh-token', refreshAccessToken);

export default router;