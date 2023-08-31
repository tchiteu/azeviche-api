import { Router } from 'express';
import { create } from '../controllers/users';
import authRoutes from './auth';
import usersRoutes from './users';

const router = Router();

router.post('/signup', create);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;
