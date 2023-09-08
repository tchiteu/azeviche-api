import { Router } from 'express';
import { signIn } from '../controllers/auth';

const router = Router();

router.use('/signin', signIn);

export default router;
