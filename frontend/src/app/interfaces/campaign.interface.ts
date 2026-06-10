export interface CampaignForm {
  campaignTitle: string;
  description: string;
  category: string;
  platform: string;
  budgetPerInfluencer: number;
  totalSlots: number;
  startDate: string;
  endDate: string;
}

export interface CampaignPayload extends CampaignForm {
  brandId: string;
  brandName: string;
}

export interface CampaignItem {
  _id?: string;
  campaignTitle?: string;
  description?: string;
  category?: string;
  platform?: string;
  budgetPerInfluencer?: number;
  totalSlots?: number;
  filledSlots?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  brandName?: string;
  applicationCount?: number;
  applications?: {
    influencerId?: string;
    appliedAt?: string;
  }[];
}