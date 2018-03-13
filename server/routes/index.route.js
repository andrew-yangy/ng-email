import express from 'express';
import emailRoutes from './email.route';

const router = express.Router();

router.use('/email', emailRoutes);

export default router;