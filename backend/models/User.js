const mongoose = require('mongoose');

// Schema defines the structure of a document in the database
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // No two users can have the same email
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Compiling the schema into a Model
module.exports = mongoose.model('User', userSchema);
