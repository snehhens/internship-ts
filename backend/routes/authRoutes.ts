import express from 'express';

import {
    body
} from 'express-validator';

import authMiddleware from '../middleware/authMiddleware';
import {
    createPassword,
    getProfile,
    login,
    register,
    resendOtp,
    verifyOtp
} from '../controllers/authController';

const router = express.Router();

router.post(
    '/register',
    [
        body('email')
            .notEmpty()
            .withMessage('Email required')
            .isEmail()
            .withMessage('Invalid email'),
        body('role')
            .notEmpty()
            .withMessage('Role required')
    ],
    register
);

router.post('/verify-otp', verifyOtp);
router.post('/create-password', createPassword);
router.post('/login', login);
router.post('/resend-otp', resendOtp);
router.get('/profile', authMiddleware, getProfile);

export default router;