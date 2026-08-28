const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: [1, 'Le montant minimum est de 1.']
    },
    message: {
        type: String,
        trim: true,
        maxlength: 200
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'COMPLETED'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);