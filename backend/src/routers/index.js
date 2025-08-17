import { Router } from 'express';
import ideasRouter from './ideas.js';

const router = Router();

router.use('/ideas', ideasRouter);

export default router;
