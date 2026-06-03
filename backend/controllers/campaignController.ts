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
            brandName

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
      await Campaign.find();

    return res.json(campaigns);

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      message: 'Server Error'

    });

  }

};

export { };