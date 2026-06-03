import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IInfluencerProfile extends Document {
  userId: mongoose.Types.ObjectId;
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

const influencerProfileSchema =
  new Schema<IInfluencerProfile>({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    contactNumber: String,

    username: String,

    bio: String,

    category: String,

    country: String,

    instagramFollowers: Number,

    youtube: String,

    youtubeFollowers: Number,

    twitter: String,

    twitterFollowers: Number

  });

const InfluencerProfile = mongoose.model<IInfluencerProfile>(
  'InfluencerProfile',
  influencerProfileSchema
);

export default InfluencerProfile;