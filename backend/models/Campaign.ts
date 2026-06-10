import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
    brandName: string;
    campaignTitle: string;
    description: string;
    category: string;
    platform: string;
    budgetPerInfluencer: number;
    totalSlots: number;
    filledSlots: number;
    startDate: Date;
    endDate: Date;
    brandId: mongoose.Types.ObjectId;
    status: 'active' | 'closed' | 'draft';
    applicationCount: number;
    applications: {
        influencerId: mongoose.Types.ObjectId;
        appliedAt: Date;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

const campaignSchema = new Schema<ICampaign>({

    brandName: {
        type: String,
        required: true
    },

    campaignTitle: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true
    },

    platform: {
        type: String,
        required: true
    },

    budgetPerInfluencer: {
        type: Number,
        required: true
    },

    totalSlots: {
        type: Number,
        required: true
    },

    filledSlots: {
        type: Number,
        default: 0
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active'
    },

    applicationCount: {
        type: Number,
        default: 0
    },

    applications: [
        {
            influencerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            appliedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, {

    timestamps: true

});

const Campaign = mongoose.model<ICampaign>('Campaign', campaignSchema);

export default Campaign;
    