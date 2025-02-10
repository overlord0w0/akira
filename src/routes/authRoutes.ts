import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { AuthRequest } from '../types/express-session.d';

const router = Router();

router.post('/register', (req: AuthRequest, res) => register(req, res));
router.post('/login', (req: AuthRequest, res) => login(req, res));
router.post('/logout', (req: AuthRequest, res) => logout(req, res));

export default router;
