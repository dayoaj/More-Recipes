import express from 'express';
import routes from './route';

const router = express.Router();

router.use('/api', routes);
export default router;
