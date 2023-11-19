import { Router } from 'express';
import { list } from '../controllers/users';
import { ensureAuthenticated } from '../../middlewares/auth';

const router = Router();

router.get('/', ensureAuthenticated, list);

export default router;
