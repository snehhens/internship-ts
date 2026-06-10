export interface UserProfileDetails {
  _id?: string;
  email?: string;
  role?: string;
  profileCompleted?: boolean;
}

export interface BrandProfileDetails {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  brandDescription?: string;
  website?: string;
  industry?: string[];
  budgetMin?: number;
  budgetMax?: number;
}

export interface InfluencerProfileDetails {
  contactNumber?: string;
  username?: string;
  bio?: string;
  category?: string;
  country?: string;
  instagramFollowers?: number;
  youtube?: string;
  youtubeFollowers?: number;
  twitter?: string;
  twitterFollowers?: number;
}

export interface ProfileDetailsResponse {
  user: UserProfileDetails;
  profile: BrandProfileDetails | InfluencerProfileDetails | null;
}