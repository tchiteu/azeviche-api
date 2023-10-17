import { Router } from 'express';
import { list } from '../controllers/users';

const router = Router();

router.get('/', list);

export default router;
