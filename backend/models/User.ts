import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: 'influencer' | 'brand';
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  password?: string;
  profileCompleted: boolean;
  contactNumber?: string;
  username?: string;
  bio?: string;
  instagram?: string;
  followers?: number;
}

const userSchema = new Schema<IUser>({

  email: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    enum: ['influencer', 'brand'],
    required: true
  },

  otp: String,

  otpExpires: Date,

  isVerified: {
    type: Boolean,
    default: false
  },

  password: String,

  profileCompleted: {
    type: Boolean,
    default: false
  },

  contactNumber: String,

  username: String,

  bio: String,

  instagram: String,

  followers: Number,

});

const User = mongoose.model<IUser>("User", userSchema);

export default User;