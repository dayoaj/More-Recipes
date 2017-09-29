import express from 'express';
import recipes from './recipes';

const router = express.Router();

router.use('/api', recipes);
export default router;
