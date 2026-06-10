import express from 'express';



import {
  createCampaign,
  applyToCampaign,
  getAllCampaigns,
  getBrandCampaigns,
  updateCampaignStatus
} from '../controllers/campaignController';

const router = express.Router();

router.post(
  '/create',
  createCampaign
);

router.post(
  '/apply',
  applyToCampaign
);

router.get(
  '/',
  getAllCampaigns
);

router.get(
  '/brand/:brandId',
  getBrandCampaigns
);   

router.patch(
  '/:campaignId/status',
  updateCampaignStatus
);

export default router;