import express from 'express';

import {
  completeProfile
} from '../controllers/profileController';

const router = express.Router();

router.post(
  '/complete-profile',
  completeProfile
);

export default router;