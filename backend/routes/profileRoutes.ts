import express from 'express';

import {
  completeProfile,
  getMyProfileDetails,
  updateProfileImage
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

router.put(
  '/image',
  updateProfileImage
);

export default router;