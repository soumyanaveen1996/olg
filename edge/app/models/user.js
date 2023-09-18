const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const SALT_FACTOR = 5;

const UserSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        userName: { type: String, required: true},
        pin: { type: String, required: true},
        dateOfBirth: { type: Number, required: true},
        domains: {type: Array, required: true}
    },
    {
        collection: 'users',
        versionKey: false,
        timestamps: true
    }
);

async function encryptPassword(user) {
    let salt = await bcrypt.genSalt(SALT_FACTOR);
    user.pin = await bcrypt.hash(user.pin, salt);
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('pin')) {
        return next();
    }
    return await encryptPassword(this);
});

UserSchema.methods.comparePin = async function (inputPin) {
    return await bcrypt.compare(inputPin, this.pin);
}

UserSchema.methods.compareDOB = function (inputDOB) {
    let dbDate = moment(this.dateOfBirth).format('YYYY-MM-DD');
    return moment(inputDOB).isSame(dbDate);
}

module.exports = mongoose.model('User', UserSchema);
