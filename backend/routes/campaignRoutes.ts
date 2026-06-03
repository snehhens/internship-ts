import express from 'express';


import {
  createCampaign,
  getAllCampaigns
} from '../controllers/campaignController';

const router = express.Router();

router.post(
  '/create',
  createCampaign
);

router.get(
  '/',
  getAllCampaigns
);

export default router;