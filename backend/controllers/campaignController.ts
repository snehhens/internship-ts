import Campaign from '../models/Campaign';
import { Request, Response } from 'express';

export const createCampaign = async (
    req: Request,
    res: Response
) => {


    console.log('Campaign API Hit');
console.log(req.body);
    try {

        const {

            campaignTitle,
            description,
            category,
            platform,
            budgetPerInfluencer,
            totalSlots,
            startDate,
            endDate,
            brandId,
            brandName

        } = req.body;

        const campaign = new Campaign({

            campaignTitle,
            description,
            category,
            platform,
            budgetPerInfluencer,
            totalSlots,

            filledSlots: 0,

            startDate,
            endDate,

            brandId,
            brandName,
            applications: [],
            applicationCount: 0

        });

        await campaign.save();

        return res.status(201).json({

            message:
                'Campaign created successfully',

            campaign

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message:
                'Server Error'

        });

    }

};

export const getAllCampaigns = async (
  req: Request,
  res: Response
) => {

  try {

    const campaigns =
      await Campaign.find().sort({ createdAt: -1 });

    return res.json(campaigns);

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message: 'Server Error'

    });

  }

};


export const getBrandCampaigns = async (
  req: Request,
  res: Response
) => {

  try {

    const { brandId } = req.params;

    const campaigns =
      await Campaign.find({
        brandId
      }).sort({ createdAt: -1 });

    return res.json(
      campaigns
    );

  }

  catch(error) {

    console.log(error);

    return res.status(500).json({

      message: 'Server Error'

    });

  }

};

export const applyToCampaign = async (
  req: Request,
  res: Response
) => {

  try {

    const { campaignId, influencerId } = req.body;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        message: 'Campaign not found'
      });
    }

    const alreadyApplied = campaign.applications.some((application: any) =>
      String(application.influencerId) === String(influencerId)
    );

    if (alreadyApplied) {
      return res.status(400).json({
        message: 'Already applied'
      });
    }

    campaign.applications.push({
      influencerId,
      appliedAt: new Date()
    } as any);

    campaign.applicationCount = campaign.applications.length;

    await campaign.save();

    return res.json({
      message: 'Applied successfully',
      campaign
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: 'Server Error'
    });

  }

};

export const updateCampaignStatus = async (
  req: Request,
  res: Response
) => {

  try {

    const { campaignId } = req.params;
    const { status } = req.body;

    const campaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { status },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({
        message: 'Campaign not found'
      });
    }

    return res.json({
      message: 'Status updated',
      campaign
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: 'Server Error'
    });

  }

};

export { };