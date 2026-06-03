import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IBrandProfile extends Document {
  userId: mongoose.Types.ObjectId;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  brandDescription?: string;
  website?: string;
  industry?: string[];
  budgetMin?: number;
  budgetMax?: number;
}

const brandProfileSchema =
  new Schema<IBrandProfile>({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    firstName: String,

    lastName: String,

    contactNumber: String,

    brandDescription: String,

    website: String,

    industry: [String],

    budgetMin: Number,

    budgetMax: Number

  });

const BrandProfile = mongoose.model<IBrandProfile>(
  'BrandProfile',
  brandProfileSchema
);

export default BrandProfile;