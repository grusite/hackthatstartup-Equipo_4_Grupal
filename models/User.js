const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        education: [{
            title: String,
            description: String,
            startYear: Number,
            endYear: Number,

        }],
        experience: [{
            jobTitle: String,
            jobDescription: String,
            jobStartYear: Number,
            jobEndYear: Number,
        }]
    },
    { timestamps: true }
)

module.exports = mongoose.model('user', schema)