const mongoose = require('mongoose')
const { pick } = require('lodash')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 12

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
        }],
        provider: {
            gitHub: {
                id: String,
            },
            traditional: {
                password: {
                    type: String,
                    requird: true,
                },
            },
        },
    },
    { timestamps: true }
)

schema.methods.toPublic = function () {
    return pick(this, ['name', 'email'])
}

schema.methods.hasProvider = function (type) {
    const obj = this.toObject()
    return obj.provider && obj.provider[type]
}

schema.pre('save', async function () {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('provider.traditional.password')) return

    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

    // hash the password using our new salt
    const hash = await bcrypt.hash(this.provider.traditional.password, salt)

    // override the cleartext password with the hashed one
    this.provider.traditional.password = hash
})

schema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.provider.traditional.password)
}

module.exports = mongoose.model('user', schema)