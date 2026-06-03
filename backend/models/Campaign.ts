import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({


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
        enum: [
            'active',
            'closed',
            'draft'
        ],
        default: 'active'
    },

    applicationCount: {
        type: Number,
        default: 0
    }

}, {

    timestamps: true

});

const Campaign = mongoose.model(
    'Campaign',
    campaignSchema
);

export default Campaign;

export { };