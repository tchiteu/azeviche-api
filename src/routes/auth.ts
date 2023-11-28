import { Router } from 'express';
import { generateNewToken, signIn } from '../controllers/auth';

const router = Router();

router.use('/signin', signIn);
router.use('/refresh-token', generateNewToken);

export default router;
