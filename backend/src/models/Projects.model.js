const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    collectedAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['BROUILLON', 'EN_COURS', 'FINANCE', 'TERMINE', 'ANNULE'],
        default: 'BROUILLON'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

projectSchema.virtual('progress').get(function() {
    if (this.goalAmount === 0) return 0;
    return ((this.collectedAmount / this.goalAmount) * 100).toFixed(2);
});

module.exports = mongoose.model('Project', projectSchema);
