import express from 'express';
import emailCtrl from '../controllers/email.controller';

const router = express.Router();

router.route('/send')
    .post(emailCtrl.sendEmail)

export default router;