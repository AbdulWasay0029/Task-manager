const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            // Not required, description can be optional
        },
        status: {
            type: String,
            enum: ['pending', 'completed'], // Can ONLY be one of these two values
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // Links to a specific User ID
            required: true,
            ref: 'User', // References the 'User' model
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Optional: Assign to another user
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
