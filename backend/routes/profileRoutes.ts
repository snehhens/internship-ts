import express from 'express';

import {
  completeProfile,
  getMyProfileDetails
} from '../controllers/profileController';

import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/complete-profile',
  completeProfile
);

router.get(
  '/details',
  authMiddleware,
  getMyProfileDetails
);

export default router;